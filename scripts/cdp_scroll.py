"""Scroll seluruh halaman, tunggu lazy image, lalu laporkan hasil akhir."""
import json, sys, time, urllib.request
import websocket


def targets():
    for _ in range(40):
        try:
            with urllib.request.urlopen("http://127.0.0.1:9222/json") as r:
                return [t for t in json.load(r) if t.get("type") == "page"]
        except Exception:
            time.sleep(0.5)
    raise SystemExit("no CDP")


def send(ws, mid, method, params=None):
    ws.send(json.dumps({"id": mid, "method": method, "params": params or {}}))
    while True:
        m = json.loads(ws.recv())
        if m.get("id") == mid:
            r = m.get("result", {})
            if "exceptionDetails" in r:
                raise SystemExit(json.dumps(r["exceptionDetails"])[:500])
            return r.get("result", {}).get("value")


url, width = sys.argv[1], int(sys.argv[2])
ws = websocket.create_connection(targets()[0]["webSocketDebuggerUrl"], timeout=30)
send(ws, 0, "Page.enable")
send(ws, 1, "Emulation.setDeviceMetricsOverride",
     {"width": width, "height": 860, "deviceScaleFactor": 1, "mobile": width < 700})
send(ws, 2, "Page.navigate", {"url": url})
time.sleep(3)

# scroll sampai bawah, bertahap supaya lazy-load terpicu
send(ws, 3, "Runtime.evaluate", {"expression": """
(async () => {
  const step = Math.round(window.innerHeight * 0.8);
  for (let y = 0; y <= document.body.scrollHeight; y += step) {
    window.scrollTo(0, y);
    await new Promise(r => setTimeout(r, 220));
  }
  window.scrollTo(0, document.body.scrollHeight);
  await new Promise(r => setTimeout(r, 1200));
  return 'scrolled';
})()
""", "awaitPromise": True, "returnByValue": True})

REPORT = r"""
(() => {
  const imgs = [...document.images];
  const bad = imgs.filter(i => !(i.complete && i.naturalWidth > 0))
                  .map(i => ({src: i.currentSrc.slice(-40), alt: i.alt}));
  // overflow horizontal: cari elemen yang melewati viewport
  const vw = window.innerWidth;
  const over = [...document.querySelectorAll('body *')]
    .filter(e => e.getBoundingClientRect().right > vw + 2 && e.offsetWidth > 40)
    .slice(0, 6)
    .map(e => e.tagName + '.' + (e.className || '').toString().slice(0, 40) + ' r=' + Math.round(e.getBoundingClientRect().right));
  // tap target >= 24px untuk link nav/CTA
  const small = [...document.querySelectorAll('a[href], button')]
    .map(e => ({t: e.innerText.replace(/\s+/g,' ').slice(0,24), h: Math.round(e.getBoundingClientRect().height)}))
    .filter(x => x.h > 0 && x.h < 24);
  return JSON.stringify({
    vw, scrollW: document.documentElement.scrollWidth,
    imgs: imgs.length, loaded: imgs.filter(i => i.complete && i.naturalWidth > 0).length,
    broken: bad,
    overflowItems: over,
    smallTargets: small,
    h1Size: getComputedStyle(document.querySelector('h1')).fontSize,
    scrollHeight: document.body.scrollHeight,
  }, null, 1);
})()
"""

print(f"--- viewport {width}px ---")
print(send(ws, 9, "Runtime.evaluate", {"expression": REPORT, "returnByValue": True}))
ws.close()
