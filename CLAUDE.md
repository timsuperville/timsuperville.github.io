# timsuperville.github.io — tsuperville.com

Portfolio and agency site (Vite + React + Tailwind), now hosted on **Cloudflare Pages** (`timsuperville-portfolio`) at `tsuperville.com` despite the repo name. See `CONTRIBUTING.md`.

Relevant workspace rule: `../.claude/rules/web-seo-and-cloudflare.md`.

## Commands
- Dev: `npm run dev`. Build: `npm run build`. Tests: `npm test`. Lint: `npm run lint`. Smoke: `npm run smoke`.
- Deploy: `npm run deploy:cloudflare` (confirm first). SPA deep links need `public/_redirects` → `/* /index.html 200`.
- `npm run billing:highwater` creates **real** Stripe checkout sessions for a client — run it only on Shawn's explicit request.

## Notes
- The committed `.env` holds only public `VITE_*` values; Stripe secret keys belong in `.env.local`.
