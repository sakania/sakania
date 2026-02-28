# sakania

Playable browser prototype for **"An Answer"** (menu title: **Ashfall: The Last Ember**).

## Run locally

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Quick screenshot (with browser fallback)

If Playwright Chromium crashes in your container/CI, use the fallback script:

```bash
python3 scripts/capture_screenshot.py
```

This script tries **Chromium first**, then automatically falls back to **Firefox**.

## Files

- `index.html` — game shell + HUD
- `style.css` — visual style + glitch effects
- `game.js` — complete game loop and systems
- `scripts/capture_screenshot.py` — resilient screenshot helper (Chromium → Firefox)
- `docs/an-answer-game-architecture.md` — engine-agnostic architecture blueprint


## Title menu

- **Play** starts the game.
- **Other** opens quit, how-to-play, and settings (volume/mute).
- Footer credit appears in-menu: `created by Eugene-Grade 9`.
