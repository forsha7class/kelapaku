"""Screenshot halaman penuh per viewport lewat CDP (untuk review visual)."""
import base64
import json
import sys
import time

import websocket

sys.path.insert(0, __file__.rsplit("/", 1)[0])
from responsive_audit import start_chrome, targets  # noqa: E402


def main():
    url = sys.argv[1]
    out = sys.argv[2]
    widths = [int(w) for w in (sys.argv[3].split(",") if len(sys.argv) > 3 else ["375", "1440"])]
    proc = start_chrome()
    try:
        page = targets()[0]
        ws = websocket.create_connection(page["webSocketDebuggerUrl"], timeout=60)
        ws.send(json.dumps({"id": 1, "method": "Page.enable"}))
        mid = 10
        for w in widths:
            ws.send(json.dumps({"id": mid, "method": "Emulation.setDeviceMetricsOverride",
                                "params": {"width": w, "height": 900, "deviceScaleFactor": 1,
                                           "mobile": w < 700}}))
            mid += 1
            ws.send(json.dumps({"id": mid, "method": "Page.navigate",
                                "params": {"url": url}}))
            mid += 1
            time.sleep(4.0)
            ws.send(json.dumps({"id": mid, "method": "Page.captureScreenshot",
                                "params": {"format": "jpeg", "quality": 70,
                                           "captureBeyondViewport": True}}))
            while True:
                msg = json.loads(ws.recv())
                if msg.get("id") == mid:
                    data = msg["result"]["data"]
                    path = f"{out}-{w}.jpg"
                    with open(path, "wb") as f:
                        f.write(base64.b64decode(data))
                    print(path)
                    break
            mid += 1
        ws.close()
    finally:
        proc.terminate()


if __name__ == "__main__":
    main()
