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
- [x] Create unit tests for components (Header, Hero, Services, Portfolio, CaseStudies, CaseStudyDetail, Testimonials).
- [ ] Create unit test for Contact (currently skipped due to environment issues).
- [x] Ensure `npm run smoke` still passes (build verification).

## 4. Improvements
- [x] Accessibility: Fix duplicate `main` tags.
- [x] SEO: Implement dynamic document title updates for case studies.
- [x] Design: Add `framer-motion` for scroll animations and interactions.
- [x] Performance: Add `loading="lazy"` to below-fold images.
- [x] Navigation: Add responsive mobile menu logic to Header.
- [x] Design: Improve contrast for Hero secondary button by removing conflicting classes.
- [x] Navigation: Fix SPA routing for anchor links in App.jsx.
- [ ] Performance: Optimize images (currently loading from /images/, check sizes).
