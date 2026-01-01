# Contributing

## Setup
1. `npm ci`
2. `npm run dev`

## Testing
- `npm test` runs the test suite (Vitest).
- `npm run smoke` checks the production build output.

## Architecture
- `src/components`: React components
- `src/data`: Static data content
- `src/styles.css`: Global styles (Tailwind)

## Workflow
1. Make changes.
2. Ensure tests pass.
3. Build `npm run build` to update `docs/` (required for GitHub Pages).
