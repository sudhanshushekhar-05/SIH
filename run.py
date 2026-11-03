import sys
import os
import time
import webbrowser
import threading
import uvicorn

def open_browser():
    time.sleep(1.5)
    url = "http://127.0.0.1:8000/index.html"
    print(f"\n[MINDSET-NER] Opening portal in default browser: {url}")
    webbrowser.open(url)

if __name__ == "__main__":
    print("=" * 65)
    print("MINDSET-NER Portal Launcher (Government of India / MDoNER)")
    print("Smart India Hackathon 2026 | Problem ID: SIH26003")
    print("=" * 65)
    print("Server starting on: http://127.0.0.1:8000 (or http://localhost:8000)")
    print("Press CTRL+C anytime to stop the server.\n")

    threading.Thread(target=open_browser, daemon=True).start()
    uvicorn.run("backend.main:app", host="127.0.0.1", port=8000, reload=False)
