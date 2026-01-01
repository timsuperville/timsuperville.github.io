# Project Plan

## Objective
Enhance the maintainability, scalability, and quality of the portfolio site.

## 1. Documentation
- [x] Create this Plan.
- [x] Add `CONTRIBUTING.md` for development guidelines.

## 2. Refactoring
- [x] Breakdown `src/App.jsx` into smaller, reusable components in `src/components/`.
- [x] Ensure imports and dependencies are correct after moving.
- [x] Extract data to `src/data/`.
- [x] Centralize config in `src/config.js`.

## 3. Testing
- [x] Set up Vitest and React Testing Library.
- [x] Create unit tests for components.
- [x] Ensure `npm run smoke` still passes.

## 4. Improvements
- [x] Accessibility: Fix duplicate `main` tags.
- [x] SEO: Implement dynamic document title updates.
- [x] Design: Add `framer-motion` animations.
- [x] Performance: Add `loading="lazy"` to images.
- [x] Navigation: Add responsive mobile menu.
- [x] Design: Improve contrast for Hero secondary button.
- [x] Assets: Move static assets (images, favicon, robots) to `public/` to ensure they are built correctly.
- [ ] Performance: Optimize images.
