# Stage Hop · 春日之声

Unofficial fan guide for Primavera Sound Barcelona 2026.

**Live site: [stagehop.live](https://stagehop.live/)**  
Also available at [max7770101.github.io/stagehop.live](https://max7770101.github.io/stagehop.live/)

## Features

- Full lineup schedule with time, stage, and conflict detection
- Interactive venue map with stage hotspots
- Favorites / personal lineup builder
- Practical info (transport, tips, weather)
- Chinese / Spanish / English UI
- PWA — installable on iOS and Android

## Stack

Pure vanilla HTML / CSS / JS. No build step, no dependencies.

- `index.html` — app shell and navigation
- `src/data.js` — festival data (stages, shows)
- `src/localization.js` — UI strings and translations
- `src/scripts.js` — all UI logic
- `styles.css` — theming via CSS custom properties
- `assets/` — map image and PWA icons

## Running locally

Open `index.html` directly in a browser.
