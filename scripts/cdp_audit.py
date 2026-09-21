"""Audit rendered page over raw CDP: layout, images, focus, a11y basics."""
import json, subprocess, sys, time, urllib.request

import websocket  # type: ignore


def cdp_targets():
    for _ in range(40):
        try:
            with urllib.request.urlopen("http://127.0.0.1:9222/json") as r:
                return json.load(r)
        except Exception:
            time.sleep(0.5)
    raise SystemExit("CDP not reachable on 9222")


def evaluate(ws, expr, mid=1):
    ws.send(json.dumps({
        "id": mid, "method": "Runtime.evaluate",
        "params": {"expression": expr, "returnByValue": True, "awaitPromise": True},
    }))
    while True:
        msg = json.loads(ws.recv())
        if msg.get("id") == mid:
            res = msg.get("result", {})
            if "exceptionDetails" in res:
                raise SystemExit("JS error: " + json.dumps(res["exceptionDetails"])[:600])
            return res.get("result", {}).get("value")


AUDIT = r"""
(() => {
  const imgs = [...document.images].map(i => ({
    alt: i.alt, ok: i.complete && i.naturalWidth > 0,
    w: i.naturalWidth, h: i.naturalHeight,
    lazy: i.getAttribute('loading') || 'eager',
  }));
  const links = [...document.querySelectorAll('a')].map(a => a.getAttribute('href'));
  const heads = [...document.querySelectorAll('h1,h2,h3')].map(h => h.tagName + ':' + h.innerText.replace(/\s+/g,' ').slice(0,48));
  const focusables = document.querySelectorAll('a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])').length;
  const imgNoAlt = [...document.images].filter(i => !i.hasAttribute('alt')).length;
  return JSON.stringify({
    title: document.title,
    lang: document.documentElement.lang,
    h1: document.querySelector('h1')?.innerText.replace(/\s+/g,' '),
    imgsTotal: imgs.length,
    imgsLoaded: imgs.filter(i => i.ok).length,
    imgsLazy: imgs.filter(i => i.lazy === 'lazy').length,
    imgNoAlt,
    heads,
    anchors: [...new Set(links)],
    focusables,
    scrollW: document.documentElement.scrollWidth,
    innerW: window.innerWidth,
    bodyBG: getComputedStyle(document.body).backgroundColor,
    h1Font: getComputedStyle(document.querySelector('h1')).fontFamily,
    h1Size: getComputedStyle(document.querySelector('h1')).fontSize,
    hasSkipLink: !!document.querySelector('a[href="#main"]'),
    jsonLd: document.querySelectorAll('script[type="application/ld+json"]').length,
    jsonLdTypes: [...document.querySelectorAll('script[type="application/ld+json"]')]
      .flatMap(s => { try { const j = JSON.parse(s.textContent); return (j['@graph']||[j]).map(x=>x['@type']); } catch(e){ return ['PARSE_ERROR']; } }),
  }, null, 1);
})()
"""


def main():
    url = sys.argv[1] if len(sys.argv) > 1 else "http://127.0.0.1:4173/"
    width = int(sys.argv[2]) if len(sys.argv) > 2 else 1440
    targets = [t for t in cdp_targets() if t.get("type") == "page"]
    ws = websocket.create_connection(targets[0]["webSocketDebuggerUrl"], timeout=25)
    ws.send(json.dumps({"id": 0, "method": "Page.enable"}))
    ws.send(json.dumps({"id": 99, "method": "Emulation.setDeviceMetricsOverride",
                        "params": {"width": width, "height": 900, "deviceScaleFactor": 1, "mobile": width < 700}}))
    ws.send(json.dumps({"id": 100, "method": "Page.navigate", "params": {"url": url}}))
    time.sleep(4.5)
    print(evaluate(ws, AUDIT))
    # 200% zoom / small viewport overflow check
    ws.send(json.dumps({"id": 101, "method": "Emulation.setPageScaleFactor", "params": {"pageScaleFactor": 1}}))
    ws.close()


if __name__ == "__main__":
    main()
