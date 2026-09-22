"""Cek console error, request gagal, dan heading/alt di halaman yang sudah dibuild."""
import json
import sys
import time

import websocket

sys.path.insert(0, __file__.rsplit("/", 1)[0])
from responsive_audit import start_chrome, targets  # noqa: E402


def main():
    url = sys.argv[1] if len(sys.argv) > 1 else "http://127.0.0.1:8099/"
    proc = start_chrome()
    try:
        page = targets()[0]
        ws = websocket.create_connection(page["webSocketDebuggerUrl"], timeout=30)
        for mid, method in [(1, "Page.enable"), (2, "Log.enable"), (3, "Network.enable"),
                            (4, "Runtime.enable")]:
            ws.send(json.dumps({"id": mid, "method": method}))
        ws.send(json.dumps({"id": 9, "method": "Page.navigate", "params": {"url": url}}))
        errors, failed, deadline = [], [], time.time() + 12
        while time.time() < deadline:
            try:
                msg = json.loads(ws.recv())
            except Exception:
                break
            m = msg.get("method")
            if m == "Log.entryAdded" and msg["params"]["entry"]["level"] == "error":
                errors.append(msg["params"]["entry"]["text"][:200])
            if m == "Runtime.exceptionThrown":
                errors.append("EXC " + msg["params"]["exceptionDetails"].get("text", "")[:200])
            if m == "Network.loadingFailed":
                failed.append(msg["params"].get("errorText", "") + " " +
                              str(msg["params"].get("requestId"))[:12])
        print("console errors:", errors or "none")
        print("request gagal :", failed or "none")
        ws.close()
    finally:
        proc.terminate()


if __name__ == "__main__":
    main()
