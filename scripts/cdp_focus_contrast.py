"""Tab nyata -> ukur outline ring; sampel piksel hero utk kontras teks."""
import base64, io, json, sys, time, urllib.request
import websocket

try:
    from PIL import Image
except ImportError:
    raise SystemExit("need pillow: pip install --break-system-packages pillow")


def targets():
    with urllib.request.urlopen("http://127.0.0.1:9222/json") as r:
        return [t for t in json.load(r) if t.get("type") == "page"]


def send(ws, mid, method, params=None):
    ws.send(json.dumps({"id": mid, "method": method, "params": params or {}}))
    while True:
        m = json.loads(ws.recv())
        if m.get("id") == mid:
            r = m.get("result", {})
            if "exceptionDetails" in r:
                raise SystemExit(json.dumps(r["exceptionDetails"])[:600])
            return r.get("result", {})


def key(ws, mid, k):
    for t in ("keyDown", "keyUp"):
        send(ws, mid, "Input.dispatchKeyEvent",
             {"type": t, "key": k, "code": k, "windowsVirtualKeyCode": 9})
        mid += 1
    return mid


ws = websocket.create_connection(targets()[0]["webSocketDebuggerUrl"], timeout=40)
send(ws, 0, "Page.enable")
send(ws, 1, "Emulation.setDeviceMetricsOverride",
     {"width": 1440, "height": 900, "deviceScaleFactor": 1, "mobile": False})
send(ws, 2, "Emulation.setEmulatedMedia", {"features": []})
send(ws, 3, "Page.navigate", {"url": "http://127.0.0.1:4173/"})
time.sleep(4)

mid = 100
seen = []
for _ in range(4):
    mid = key(ws, mid, "Tab")
    res = send(ws, mid, "Runtime.evaluate", {"returnByValue": True, "expression": """
    (() => {
      const e = document.activeElement;
      const s = getComputedStyle(e);
      return JSON.stringify({
        tag: e.tagName,
        text: (e.innerText||e.getAttribute('aria-label')||'').replace(/\\s+/g,' ').slice(0,30),
        outline: s.outlineStyle + ' ' + s.outlineWidth + ' ' + s.outlineColor,
        offset: s.outlineOffset
      });
    })()
    """})
    v = res.get("result", {}).get("value")
    if v is None:
        seen.append({"ERROR": json.dumps(res)[:200]})
    else:
        seen.append(json.loads(v))

print("TAB ORDER / FOCUS RING:")
for s in seen:
    print(" ", s)

# sampel piksel hero di dalam kotak h1
res_box = send(ws, 300, "Runtime.evaluate", {"returnByValue": True, "expression": """
(() => { const r = document.querySelector('h1').getBoundingClientRect();
  return JSON.stringify({x:r.x, y:r.y, w:r.width, h:r.height}); })()
"""})
box = json.loads(res_box.get("result", {}).get("value") or "null")
res_shot = send(ws, 301, "Page.captureScreenshot", {"format": "png"})
data = res_shot.get("result", {}).get("data")
if not data:
    raise SystemExit("screenshot gagal: " + json.dumps(res_shot)[:300])
png = base64.b64decode(data)
im = Image.open(io.BytesIO(png)).convert("RGB")
print("viewport img:", im.size, "h1 box:", {k: round(v) for k, v in box.items()})

REGION = (int(box["x"]) + 6, int(box["y"]) + 6, int(box["x"] + box["w"]) - 6, int(box["y"] + box["h"]) - 6)
crop = im.crop(REGION)
cols = crop.getcolors(maxcolors=100000)
cols.sort(reverse=True)
print("WARNA DOMINAN area h1 (top 6):")
def lum(c):
    def f(v):
        v /= 255
        return v / 12.92 if v <= 0.03928 else ((v + 0.055) / 1.055) ** 2.4
    return 0.2126 * f(c[0]) + 0.7152 * f(c[1]) + 0.0722 * f(c[2])
def ratio(a, b):
    la, lb = lum(a), lum(b)
    hi, lo = max(la, lb), min(la, lb)
    return (hi + 0.05) / (lo + 0.05)
bg, fg = cols[0][1], cols[1][1]
print("  bg  ", bg, f"#{bg[0]:02x}{bg[1]:02x}{bg[2]:02x}")
print("  teks", fg, f"#{fg[0]:02x}{fg[1]:02x}{fg[2]:02x}")
print("  kontras: %.2f:1" % ratio(bg, fg))
ws.close()
