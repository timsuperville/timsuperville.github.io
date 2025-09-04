This folder contains a Vite + React scaffold for Tim Superville's portfolio.

Build & deploy

1. Install dependencies:

```bash
npm install
```

2. Build to `docs/` folder (GitHub Pages friendly):

```bash
npm run build
```

3. Commit and push; GitHub Pages serving from `docs/` will publish the site.

Notes
- The existing `contact.html` remains and will continue to work. You can later convert it to a React route/component.
- `vite.config.js` uses `base: './'` and `build.outDir: 'docs'` so the built site is suitable for GitHub Pages.
