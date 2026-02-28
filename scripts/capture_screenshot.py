#!/usr/bin/env python3
"""Capture a screenshot of the local game page with Playwright.

Tries Chromium first, then falls back to Firefox when Chromium crashes in
containerized environments.
"""

from pathlib import Path
from playwright.sync_api import sync_playwright

URL = "http://127.0.0.1:8000"
OUT = Path("artifacts/an-answer-gameplay.png")
OUT.parent.mkdir(parents=True, exist_ok=True)


def capture_with(browser_name: str) -> bool:
    with sync_playwright() as p:
        browser_type = getattr(p, browser_name)
        browser = browser_type.launch()
        page = browser.new_page(viewport={"width": 1400, "height": 1000})
        page.goto(URL, wait_until="networkidle")
        page.wait_for_timeout(1200)
        page.screenshot(path=str(OUT), full_page=True)
        browser.close()
    return True


def main() -> int:
    errors = []
    for name in ("chromium", "firefox"):
        try:
            capture_with(name)
            print(f"screenshot captured with {name}: {OUT}")
            return 0
        except Exception as exc:  # fallback behavior by design
            errors.append(f"{name}: {exc}")
            print(f"{name} failed, trying fallback...", flush=True)

    print("all browsers failed:\n" + "\n".join(errors))
    return 1


if __name__ == "__main__":
    raise SystemExit(main())
