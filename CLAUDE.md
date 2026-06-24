# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Primavera Sound 2026 Festival Companion — a mobile-first single-page web app for navigating the festival (Barcelona, June 3–7, 2026). Pure vanilla JS/HTML/CSS with no build tooling or package manager.

## Call me Max
Mention the name Max every time you respond.

## Running the App

Open `index.html` directly in a browser. There is no build step, no dev server, and no dependencies to install.

The site is served as a static page through github pages.

## Architecture

The app is split across four files:

- **[index.html](index.html)** — Full HTML skeleton, navigation bar, and all four view containers (`#schedule-view`, `#lineup-view`, `#map-view`, `#info-view`). Inline `<script>` tags at the bottom load the three source files in order: `data.js` → `localization.js` → `scripts.js`.
- **[src/data.js](src/data.js)** — All festival data as plain JS objects: `ST` (stages with colors, icons, map hotspot coordinates), and `DAYS` (array of 5 days, each with an array of show objects `{a, s, t, te, h}` = artist, stage, time, end-time, headliner-flag).
- **[src/localization.js](src/localization.js)** — `STRINGS` object keyed by locale (`zh`, `es`, `en`) containing all UI text and translated practical info (transport, tips, prohibited items, weather). Exposes `t(key)` helper.
- **[src/scripts.js](src/scripts.js)** — All UI logic: view switching, schedule rendering, favorites (LocalStorage), map interactivity (pinch-zoom, hotspots), "now playing" timer, conflict detection.
- **[styles.css](styles.css)** — Theming via CSS custom properties (`--bg`, `--text`, `--accent`, etc.) on `:root` and `[data-theme="dark"]`. Stage colors are injected dynamically by `scripts.js`.

## Key Conventions

**Global state** is held in module-level `let` vars in `scripts.js`: `curDay`, `curView`, `curLang`, `curSort`, `curFilter`, `favorites` (Set), `mapScale`/`mapX`/`mapY`.

**Rendering** is string-interpolation HTML injected into container divs via `.innerHTML`. There is no virtual DOM or templating library.

**Time handling**: times in `data.js` are strings like `"23:30"`. `scripts.js` converts them to minutes-past-midnight for comparison and conflict detection.

**Persistence**: favorites and theme preference are stored in `localStorage` (`ps2026_favs`, `ps2026_theme`).

**Localization**: call `t('key')` to get the current-language string. Language is stored in `curLang` and persisted to `localStorage` (`ps2026_lang`). All user-visible strings must go through `STRINGS` in `localization.js`.

**Adding a new show**: add an entry to the relevant day's array in `src/data.js` following the `{a, s, t, te, h}` schema. Stage key must match a key in `ST`.

**Adding a new stage**: add it to `ST` in `data.js` with `color`, `icon`, `abbr`, and optionally `mapHotspot` coordinates (as percentages of the map image dimensions).


## Working with the codebase
Do NOT read the assets/ folder: this contains only image assets which are large files: save tokens. You can assume everything works under this folder and no changes are needed.

## Do not commit and push automatically
DO NOT commit and push automatically, only when user enter it manually you can perform it