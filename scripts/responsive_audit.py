"""Audit layout over raw CDP di 4 viewport: overflow, text terpotong, alt, target sentuh.

Pakai: python3 scripts/responsive_audit.py http://127.0.0.1:8099/ [--cdp 9222]
"""
import json
import subprocess
import sys
import time
import urllib.request

import websocket

CHROME = "/root/.cache/ms-playwright/chromium-1234/chrome-linux64/chrome"
PORT = 9222

PROBE = r"""
(() => {
  const w = innerWidth, de = document.documentElement;
  const box = (el) => el.getBoundingClientRect();
  const overflow = [...document.querySelectorAll('body *')]
    .filter(el => { const r = box(el); return r.width > 0 && (r.right > w + 1 || r.left < -1); })
    .slice(0, 8)
    .map(el => el.tagName + '[' + String(el.className).slice(0, 40) + '] right=' + Math.round(box(el).right));
  const clipped = [...document.querySelectorAll('h1,h2,h3,p,a,li,span,dd,dt')]
    .filter(el => el.scrollWidth > el.clientWidth + 2 &&
                  ['hidden', 'clip'].includes(getComputedStyle(el).overflow))
    .slice(0, 8)
    .map(el => el.tagName + ':' + el.textContent.replace(/\s+/g, ' ').trim().slice(0, 34));
  const tiny = [...document.querySelectorAll('a,button')]
    .filter(el => { const r = box(el); return r.height > 0 && r.width > 0 && (r.height < 32 || r.width < 32); })
    .slice(0, 8)
    .map(el => el.textContent.trim().slice(0, 18) + ' ' + Math.round(box(el).width) + 'x' + Math.round(box(el).height));
  const imgs = [...document.images].map(i => ({
    src: i.currentSrc || i.src,
    ok: i.complete && i.naturalWidth > 0,
    nat: i.naturalWidth + 'x' + i.naturalHeight,
    disp: Math.round(box(i).width) + 'x' + Math.round(box(i).height),
    alt: i.getAttribute('alt') === null ? null : i.alt.slice(0, 44),
    lazy: i.getAttribute('loading') || 'eager',
  }));
  const h1s = [...document.querySelectorAll('h1')].map(h => h.textContent.replace(/\s+/g, ' ').trim());
  return JSON.stringify({
    w, docScrollW: de.scrollWidth, docScrollH: de.scrollHeight,
    overflow, clipped, tiny,
    imgsTotal: imgs.length, imgsBroken: imgs.filter(i => !i.ok).map(i => i.src.slice(0, 80)),
    imgsNoAlt: imgs.filter(i => i.alt === null).length,
    imgsLazy: imgs.filter(i => i.lazy === 'lazy').length,
    imgs,
    h1Count: h1s.length, h1: h1s,
    anchors: [...new Set([...document.querySelectorAll('a')].map(a => a.getAttribute('href')))],
  }, null, 1);
})()
"""


def start_chrome(port=PORT):
    try:
        urllib.request.urlopen(f"http://127.0.0.1:{port}/json/version", timeout=1).read()
        return None
    except Exception:
        pass
    return subprocess.Popen(
        [CHROME, "--headless=new", f"--remote-debugging-port={port}",
         "--remote-allow-origins=*",
         "--no-sandbox", "--disable-gpu", "--hide-scrollbars", "about:blank"],
        stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
    )


def targets(port=PORT):
    for _ in range(40):
        try:
            with urllib.request.urlopen(f"http://127.0.0.1:{port}/json") as r:
                ts = json.load(r)
            pages = [t for t in ts if t.get("type") == "page"]
            if pages:
                return pages
        except Exception:
            pass
        time.sleep(0.5)
    raise SystemExit("CDP tidak terjangkau")


def evaluate(ws, expr, mid):
    ws.send(json.dumps({"id": mid, "method": "Runtime.evaluate",
                        "params": {"expression": expr, "returnByValue": True, "awaitPromise": True}}))
    while True:
        msg = json.loads(ws.recv())
        if msg.get("id") == mid:
            res = msg.get("result", {})
            if "exceptionDetails" in res:
                raise SystemExit("JS error: " + json.dumps(res["exceptionDetails"])[:500])
            return res.get("result", {}).get("value")


def scroll_through(ws, mid):
    """Lazy-load semua gambar lalu tunggu sampai selesai (atau 8s)."""
    ws.send(json.dumps({"id": mid, "method": "Runtime.evaluate", "params": {
        "expression": "(async()=>{const H=document.documentElement.scrollHeight;"
                      "for(let y=0;y<H;y+=600){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,120));}"
                      "window.scrollTo(0,H);await new Promise(r=>setTimeout(r,600));"
                      "window.scrollTo(0,0);return 'ok';})()",
        "returnByValue": True, "awaitPromise": True}}))
    while True:
        msg = json.loads(ws.recv())
        if msg.get("id") == mid:
            return


def main():
    url = sys.argv[1] if len(sys.argv) > 1 else "http://127.0.0.1:8099/"
    widths = [375, 414, 768, 1024, 1280, 1920]
    proc = start_chrome()
    page = targets()[0]
    ws = websocket.create_connection(page["webSocketDebuggerUrl"], timeout=30)
    ws.send(json.dumps({"id": 0, "method": "Page.enable"}))
    ws.send(json.dumps({"id": 1, "method": "Log.enable"}))
    ws.send(json.dumps({"id": 2, "method": "Runtime.enable"}))
    mid = 10
    for w in widths:
        ws.send(json.dumps({"id": mid, "method": "Emulation.setDeviceMetricsOverride",
                            "params": {"width": w, "height": 900, "deviceScaleFactor": 1, "mobile": w < 700}}))
        mid += 1
        ws.send(json.dumps({"id": mid, "method": "Page.navigate", "params": {"url": url}}))
        mid += 1
        time.sleep(3.0)
        scroll_through(ws, mid)
        mid += 1
        data = json.loads(evaluate(ws, PROBE, mid))
        mid += 1
        print(f"\n=== {w}px  scrollW={data['docScrollW']} (innerW={data['w']}) halaman={data['docScrollH']}px")
        print("  overflow :", data["overflow"] or "none")
        print("  clipped  :", data["clipped"] or "none")
        print("  <32px tap:", data["tiny"] or "none")
        print("  img rusak:", data["imgsBroken"] or "none", "| no-alt:", data["imgsNoAlt"], "| lazy:", data["imgsLazy"], "/", data["imgsTotal"])
        if w == 375:
            print("  h1:", data["h1"], "| h1Count:", data["h1Count"])
            for i in data["imgs"]:
                print("   img", i["ok"], i["nat"], "->", i["disp"], i["lazy"], "|", i["alt"])
            print("  anchors:", data["anchors"])
    ws.close()
    if proc:
        proc.terminate()


if __name__ == "__main__":
    main()
