# React Migration Guide

> Complete guide for understanding the React + Vite implementation of Tim Superville's portfolio

## Table of Contents

- [Overview](#overview)
- [Migration Rationale](#migration-rationale)
- [Technical Architecture](#technical-architecture)
- [Build Process](#build-process)
- [Component Structure](#component-structure)
- [State Management](#state-management)
- [Analytics Implementation](#analytics-implementation)
- [Form Handling](#form-handling)
- [Styling Approach](#styling-approach)
- [Development Workflow](#development-workflow)
- [Deployment Strategy](#deployment-strategy)
- [Migration Checklist](#migration-checklist)
- [Legacy Code](#legacy-code)

## Overview

This portfolio has been migrated from static HTML/CSS/JavaScript to a modern React application built with Vite. This migration provides:

- **Component-Based Architecture**: Reusable, maintainable UI components
- **Modern Development Experience**: Fast HMR, excellent debugging, and developer tools
- **Optimized Production Builds**: Smaller bundle sizes, code splitting, and tree-shaking
- **Enhanced Maintainability**: Easier to update, extend, and refactor
- **Better State Management**: React hooks for form handling and user preferences
- **Improved Performance**: Optimized rendering and asset loading

## Migration Rationale

### Why Migrate to React?

1. **Component Reusability**
   - Before: Duplicate HTML across multiple pages
   - After: Single-source-of-truth components (Header, Footer, etc.)
   - Benefit: Update once, change everywhere

2. **State Management**
   - Before: Manual DOM manipulation and event handlers
   - After: React hooks (useState, useEffect) for declarative state
   - Benefit: Predictable, testable state updates

3. **Developer Experience**
   - Before: Manual file watching, browser refresh, no module system
   - After: Vite HMR, instant updates, ES modules
   - Benefit: Faster development cycle

4. **Build Optimization**
   - Before: Manual asset optimization
   - After: Automatic bundling, minification, tree-shaking
   - Benefit: Better performance, smaller files

5. **Modern JavaScript**
   - Before: Limited ES6+ features, manual transpilation
   - After: Full ES6+ support, JSX, automatic transpilation
   - Benefit: Cleaner, more expressive code

6. **Scalability**
   - Before: Difficult to add complex features
   - After: Easy to add routing, lazy loading, code splitting
   - Benefit: Room for growth

### Trade-offs Considered

**Pros:**
- ✅ Better code organization
- ✅ Improved maintainability
- ✅ Enhanced developer experience
- ✅ Optimized production builds
- ✅ Modern tooling and ecosystem

**Cons:**
- ❌ Build step required (no longer "open and view")
- ❌ Increased complexity for simple changes
- ❌ Node.js dependency required
- ❌ Learning curve for non-React developers

**Decision**: The benefits outweigh the trade-offs for a portfolio that needs frequent updates and potential feature additions.

## Technical Architecture

### Tech Stack

```
┌─────────────────────────────────────┐
│         React 18.2.0                │  UI Library
├─────────────────────────────────────┤
│         Vite 5.x                    │  Build Tool
├─────────────────────────────────────┤
│    TailwindCSS 3.x + Custom CSS    │  Styling
├─────────────────────────────────────┤
│      PostCSS + Autoprefixer        │  CSS Processing
├─────────────────────────────────────┤
│    Analytics (GA4 + Plausible)     │  Tracking
├─────────────────────────────────────┤
│         Formspree                   │  Form Backend
└─────────────────────────────────────┘
```

### Why Vite?

Vite was chosen over Create React App (CRA) or other bundlers for:

1. **Speed**: Instant server start, lightning-fast HMR
2. **Modern**: Native ES modules, no webpack complexity
3. **Optimized Output**: Better production builds than CRA
4. **Simplicity**: Minimal configuration required
5. **Future-Proof**: Active development, growing ecosystem

### Project Architecture

```
┌──────────────────────────────────────────────────┐
│                   index.html                     │  Entry Point
│              (Vite injects scripts)              │
└────────────────────┬─────────────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────────────┐
│                src/main.jsx                      │  React Entry
│           - Mount React app                      │
│           - Initialize analytics (if consent)    │
│           - Render CookieBanner                  │
└────────────────────┬─────────────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────────────┐
│                 src/App.jsx                      │  Main Component
│  ┌────────────────────────────────────────────┐ │
│  │  Header          (Navigation)              │ │
│  │  Hero            (Landing)                 │ │
│  │  Services        (Service Cards)           │ │
│  │  Portfolio       (Projects)                │ │
│  │  About           (Bio & Links)             │ │
│  │  Contact         (Form)                    │ │
│  │  Footer          (Copyright & Links)       │ │
│  └────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────┘
         │                              │
         ▼                              ▼
┌────────────────┐          ┌──────────────────────┐
│ src/styles.css │          │ src/CookieBanner.jsx │
│  - Global CSS  │          │   - Consent UI       │
│  - Variables   │          │   - Analytics Toggle │
│  - Tailwind    │          └──────────────────────┘
└────────────────┘
         │
         ▼
┌────────────────────────────────────────────────┐
│             src/analytics.js                   │
│  - hasConsent(): Check user preference        │
│  - initAnalytics(): Load GA4/Plausible        │
│  - trackEvent(): Custom event tracking        │
│  - optIn/optOut(): Manage consent             │
└────────────────────────────────────────────────┘
```

## Build Process

### Development Build

```bash
npm run dev
```

**What Happens:**
1. Vite starts development server on port 5173
2. Serves files directly from `/src` with ES modules
3. Transforms JSX to JavaScript on-the-fly
4. Processes CSS with PostCSS and Tailwind
5. Provides HMR for instant updates
6. No bundling - files served individually

**Output:** Nothing written to disk, all in-memory

### Production Build

```bash
npm run build
```

**What Happens:**
1. Vite reads `vite.config.js` for build settings
2. Processes all source files:
   - Transpiles JSX → JavaScript (ES5 compatible)
   - Bundles all JS into optimized chunks
   - Processes CSS (Tailwind → PostCSS → Autoprefixer)
   - Minifies HTML, CSS, and JavaScript
   - Optimizes and copies images to `docs/images/`
   - Generates source maps (for debugging)
3. Tree-shakes unused code
4. Code-splits for optimal loading
5. Outputs to `/docs` directory

**Output Structure:**
```
docs/
├── index.html                      # Entry HTML
├── assets/
│   ├── index-[hash].js            # Main JS bundle
│   ├── index-[hash].css           # Main CSS bundle
│   └── [chunk]-[hash].js          # Code-split chunks
└── images/                         # Copied images
    └── *.jpg, *.png, *.svg
```

**File Hashing:** Files include content hash in filename for cache busting:
- `index-CNHYMxIj.js` changes to `index-DFJ82hsk.js` when content changes
- Ensures users always get latest version
- Enables aggressive browser caching

### Build Configuration

**`vite.config.js` Explained:**

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './',              // Relative paths (GitHub Pages compatible)
  plugins: [react()],      // Enable JSX and Fast Refresh
  build: {
    outDir: 'docs'        // Build to /docs for GitHub Pages
  }
})
```

**Key Settings:**
- `base: './'`: Use relative paths so site works at any URL
- `outDir: 'docs'`: GitHub Pages can serve from `/docs` folder
- `react()` plugin: Handles JSX transformation and Fast Refresh

### PostCSS Configuration

**`postcss.config.cjs` Explained:**

```javascript
module.exports = {
  plugins: {
    tailwindcss: {},      // Process Tailwind utilities
    autoprefixer: {},     // Add vendor prefixes
  }
}
```

**What It Does:**
1. **TailwindCSS**: Scans HTML/JSX for class names, generates minimal CSS
2. **Autoprefixer**: Adds `-webkit-`, `-moz-` prefixes for browser compatibility

### TailwindCSS Configuration

**`tailwind.config.cjs` Explained:**

```javascript
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

**Content Scanning:**
- Tailwind scans these files for class names (e.g., `className="flex items-center"`)
- Only generates CSS for classes actually used
- Results in tiny CSS bundle

## Component Structure

### Main App Component

All sections are defined as functions in `src/App.jsx`:

```javascript
// Each section is a component function
function Header() { /* Navigation */ }
function Hero() { /* Landing section */ }
function Services() { /* Service cards */ }
function Portfolio() { /* Projects */ }
function About() { /* Bio */ }
function Contact() { /* Form */ }
function Footer() { /* Footer */ }

// Main component combines all sections
export default function App() {
  return (
    <>
      <Header />
      <Hero />
      <Services />
      <Portfolio />
      <About />
      <Contact />
      <Footer />
    </>
  )
}
```

**Why Single File?**
- Simple structure for small app
- Easy to see full page layout
- Minimal file navigation
- Can refactor to separate files when needed

**When to Split:**
- When a component exceeds 100 lines
- When a component is reused in multiple places
- When a component has complex state logic
- When a component could be published as a package

### Component Patterns

#### Presentational Components
Pure functions that render UI based on props:
```javascript
function Hero() {
  return (
    <section className="hero">
      <h1>Hi, I'm Tim</h1>
      <p>Web Developer</p>
    </section>
  )
}
```

#### Container Components
Components with state and logic:
```javascript
function Contact() {
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  
  const handleSubmit = async (e) => {
    // Handle form logic
  }
  
  return (
    <form onSubmit={handleSubmit}>
      {/* Form JSX */}
    </form>
  )
}
```

### Separate Components

#### CookieBanner Component
Location: `src/CookieBanner.jsx`

```javascript
export default function CookieBanner() {
  const [visible, setVisible] = useState(!hasConsent())
  
  return visible ? (
    <div className="cookie-banner">
      {/* Banner UI */}
    </div>
  ) : null
}
```

**Why Separate?**
- Self-contained functionality
- Can be easily removed or replaced
- Clear separation of concerns

## State Management

### React Hooks Used

#### useState
Manages component-local state:

```javascript
// Form fields
const [firstName, setFirstName] = useState('')
const [email, setEmail] = useState('')

// UI state
const [submitting, setSubmitting] = useState(false)
const [status, setStatus] = useState(null)
```

**Pattern:**
- Create state variable + setter function
- Update via setter: `setEmail(e.target.value)`
- React re-renders component when state changes

#### useEffect
Runs side effects after render:

```javascript
useEffect(() => {
  // Initialize analytics when consent given
  if (hasConsent()) {
    initAnalytics()
  }
}, []) // Empty array = run once on mount
```

**Use Cases:**
- Initializing analytics
- Setting up event listeners
- Fetching data (future feature)
- Syncing with localStorage

### LocalStorage Integration

**Storing Consent:**
```javascript
// In analytics.js
export function optIn() {
  localStorage.setItem('analytics_consent', 'true')
}

export function hasConsent() {
  return localStorage.getItem('analytics_consent') === 'true'
}
```

**Why LocalStorage?**
- Persists across page reloads
- No server required
- Simple key-value storage
- Survives browser close

### Form State Management

**Controlled Components:**
Every form input is controlled by React state:

```javascript
<input
  type="email"
  value={email}                        // State value
  onChange={(e) => setEmail(e.target.value)}  // Update state
/>
```

**Benefits:**
- Single source of truth (state)
- Easy validation
- Can manipulate value programmatically
- Predictable behavior

## Analytics Implementation

### Architecture

```
User Action
    │
    ▼
hasConsent()?  ──No──> Show Banner
    │                       │
   Yes                      │
    │                  User Accepts
    │                       │
    ▼                       ▼
initAnalytics()  <──────────┘
    │
    ├─> Load GA4 (if VITE_GA_ID set)
    └─> Load Plausible (if VITE_PLAUSIBLE_DOMAIN set)
```

### Analytics Module (`src/analytics.js`)

**Key Functions:**

```javascript
// Check if user has given consent
export function hasConsent() {
  return localStorage.getItem('analytics_consent') === 'true'
}

// Initialize analytics (called after consent)
export function initAnalytics() {
  // Load GA4
  if (import.meta.env.VITE_GA_ID) {
    // Inject gtag script
  }
  
  // Load Plausible
  if (import.meta.env.VITE_PLAUSIBLE_DOMAIN) {
    // Inject Plausible script
  }
}

// Track custom events
export function trackEvent(eventName, params) {
  if (!hasConsent()) return
  
  // Send to GA4
  if (window.gtag) {
    window.gtag('event', eventName, params)
  }
  
  // Send to Plausible
  if (window.plausible) {
    window.plausible(eventName)
  }
}

// User consent management
export function optIn() {
  localStorage.setItem('analytics_consent', 'true')
}

export function optOut() {
  localStorage.removeItem('analytics_consent')
}
```

### Environment Variables

**`.env.example`:**
```env
VITE_GA_ID=G-XXXXXXXXXX
VITE_PLAUSIBLE_DOMAIN=yourdomain.com
```

**Accessing in Code:**
```javascript
const gaId = import.meta.env.VITE_GA_ID
const plausibleDomain = import.meta.env.VITE_PLAUSIBLE_DOMAIN
```

**Important:**
- Prefix with `VITE_` to expose to client-side code
- Values baked into bundle at build time
- Different `.env` files for dev/production

### GDPR Compliance

**Requirements Met:**
1. ✅ No tracking without consent
2. ✅ Clear explanation of what's tracked
3. ✅ Easy opt-out mechanism
4. ✅ Consent persisted and respected
5. ✅ Privacy-friendly alternatives (Plausible)

## Form Handling

### Form Architecture

```
User Types
    │
    ▼
Controlled Input → State Update → Re-render
    │
User Submits
    │
    ▼
Client Validation ──Fail──> Show Error
    │
   Pass
    │
    ▼
Spam Checks ──Fail──> Silent Success
    │              (honeypot, timing)
   Pass
    │
    ▼
Submit to Formspree
    │
    ├─> Success → Show Success Message
    └─> Error → Show Error Message
```

### Validation

**Client-Side Validation:**
```javascript
const validate = () => {
  if (!firstName.trim() || !lastName.trim()) 
    return 'Please provide your name.'
  
  if (!email.trim()) 
    return 'Please provide an email address.'
  
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) 
    return 'Please enter a valid email.'
  
  if (message.trim().length < 10) 
    return 'Please provide a short description (10+ characters).'
  
  return ''  // No errors
}
```

### Spam Protection

#### Honeypot Field
Invisible field that bots often fill:
```javascript
const [website, setWebsite] = useState('')  // Hidden field

// In form JSX (display: none)
<input 
  type="text" 
  name="website" 
  value={website}
  onChange={(e) => setWebsite(e.target.value)}
  style={{ display: 'none' }}
/>

// Check on submit
if (website && website.trim().length > 0) {
  // Bot detected, fake success
  setStatus('success')
  return
}
```

#### Timing Check
Bots submit too quickly:
```javascript
const [startTime] = useState(() => Date.now())

// On submit
if (Date.now() - startTime < 2000) {
  // Submitted in < 2 seconds, likely a bot
  setStatus('success')
  return
}
```

### Formspree Integration

**Setup:**
1. Create account at [formspree.io](https://formspree.io)
2. Create new form
3. Get endpoint: `https://formspree.io/f/your-form-id`
4. Update in `src/App.jsx`:
   ```javascript
   const FORMSPREE_ENDPOINT = 'https://formspree.io/f/your-form-id'
   ```

**Submission:**
```javascript
const handleSubmit = async (e) => {
  e.preventDefault()
  
  // Validate
  const error = validate()
  if (error) {
    setErrorMessage(error)
    return
  }
  
  // Submit
  setSubmitting(true)
  try {
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        email: email,
        message: message,
        project_type: projectType
      })
    })
    
    if (response.ok) {
      setStatus('success')
      trackEvent('contact_submit', { result: 'success' })
      // Clear form
    } else {
      setStatus('error')
      setErrorMessage('Submission failed')
    }
  } catch (err) {
    setStatus('error')
    setErrorMessage('Network error')
  } finally {
    setSubmitting(false)
  }
}
```

## Styling Approach

### Hybrid Strategy

The site uses a **hybrid styling approach**:

1. **TailwindCSS Utilities**: For common patterns
2. **Custom CSS**: For complex layouts and animations
3. **CSS Variables**: For theming and consistency

**Why Hybrid?**
- Tailwind: Fast prototyping, consistency
- Custom CSS: Full control for unique designs
- CSS Variables: Easy theming and maintenance

### CSS Variables

Defined in `src/styles.css`:

```css
:root {
  /* Colors */
  --color-primary: #4f46e5;
  --color-primary-dark: #4338ca;
  --color-accent: #06b6d4;
  --color-bg: #ffffff;
  --color-text: #111827;
  
  /* Spacing */
  --spacing-unit: 8px;
  --container-width: 1200px;
  
  /* Typography */
  --font-body: system-ui, -apple-system, sans-serif;
  --font-heading: inherit;
}
```

**Benefits:**
- Single place to update colors/spacing
- Easy to create dark mode (add `.dark` class, override vars)
- Better than Sass variables (CSS variables are reactive)

### Responsive Design

**Mobile-First Approach:**
```css
/* Base styles for mobile */
.container {
  padding: 1rem;
}

/* Tablet and up */
@media (min-width: 768px) {
  .container {
    padding: 2rem;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .container {
    padding: 3rem;
  }
}
```

**Tailwind Breakpoints:**
```jsx
<div className="flex flex-col md:flex-row lg:gap-8">
  {/* Stacks on mobile, row on tablet+ */}
</div>
```

## Development Workflow

### Day-to-Day Development

**1. Start Dev Server**
```bash
npm run dev
```
- Opens browser to `localhost:5173`
- Make changes in `src/`
- See updates instantly (HMR)

**2. Edit Components**
Edit `src/App.jsx`:
```javascript
function Hero() {
  return (
    <section>
      <h1>New Heading</h1>  {/* Change reflects immediately */}
    </section>
  )
}
```

**3. Update Styles**
Edit `src/styles.css`:
```css
.hero {
  background: blue;  /* Updates live in browser */
}
```

**4. Test Changes**
- View in browser
- Test responsive design (DevTools device mode)
- Test form submission
- Check console for errors

**5. Build and Preview**
```bash
npm run build      # Build production version
npm run preview    # Preview at localhost:4173
```

**6. Commit and Deploy**
```bash
git add .
git commit -m "Update hero section"
git push origin main
```

### Hot Module Replacement (HMR)

**What is HMR?**
- Updates modules in browser without full page reload
- Preserves component state during edits
- Near-instant feedback

**Example:**
1. Fill out contact form
2. Edit form label in code
3. Label updates in browser
4. Form data still filled in (state preserved)

### Browser DevTools

**React DevTools:**
- Install: [React DevTools Extension](https://react.dev/learn/react-developer-tools)
- Inspect component tree
- View props and state
- Profile performance

**Vite DevTools:**
- View HMR updates
- Check module graph
- Debug build issues

## Deployment Strategy

### GitHub Pages Configuration

**Repository Settings:**
1. Go to Settings → Pages
2. Source: "Deploy from a branch"
3. Branch: `main`
4. Folder: `/docs`
5. Save

**Why `/docs`?**
- GitHub Pages can serve from `/docs` on any branch
- Alternative: Create `gh-pages` branch (more complex)
- Root folder requires main/master branch

### Deployment Process

**Manual Deployment:**
```bash
# 1. Build
npm run build

# 2. Verify build
npm run preview

# 3. Commit
git add docs/
git commit -m "Build for deployment"

# 4. Push
git push origin main

# 5. Wait 2-5 minutes for GitHub Pages to update
```

**Automated Deployment** (optional):

Create `.github/workflows/deploy.yml`:
```yaml
name: Build and Deploy

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
        env:
          VITE_GA_ID: ${{ secrets.VITE_GA_ID }}
          VITE_PLAUSIBLE_DOMAIN: ${{ secrets.VITE_PLAUSIBLE_DOMAIN }}
      
      - name: Deploy
        run: |
          git config user.name github-actions
          git config user.email github-actions@github.com
          git add docs/
          git commit -m "Deploy from GitHub Actions"
          git push
```

**Benefits:**
- Automatic builds on every push
- Consistent build environment
- Can run tests before deployment
- Secrets management for env vars

### Environment Management

**Development:**
- Use `.env` file locally
- Values not committed to Git
- Analytics disabled by default

**Production:**
- Set env vars in GitHub Actions secrets
- Or build locally with production `.env`
- Analytics enabled with real IDs

## Migration Checklist

### Pre-Migration
- [x] Audit existing HTML/CSS/JS
- [x] Identify components and sections
- [x] Plan component structure
- [x] Choose build tool (Vite)
- [x] Set up development environment

### Migration Steps
- [x] Install React and Vite
- [x] Create basic project structure
- [x] Convert HTML sections to React components
- [x] Migrate CSS to component styles
- [x] Implement form handling with React state
- [x] Add analytics integration
- [x] Implement cookie consent
- [x] Test all functionality
- [x] Build and deploy

### Post-Migration
- [x] Verify all features work
- [x] Test on multiple devices and browsers
- [x] Optimize images and assets
- [x] Set up analytics tracking
- [x] Update documentation
- [ ] Remove legacy files (when fully confident)
- [ ] Add tests (optional)
- [ ] Set up CI/CD (optional)

## Legacy Code

### Legacy Files (To Keep for Now)

These files remain for backward compatibility:

1. **`contact.html`**
   - Legacy contact page
   - Still functional
   - Can be removed once React version is proven stable
   - Currently not linked from anywhere

2. **`index.css`**
   - Legacy stylesheet
   - Not used by React app
   - Can be removed after cleanup

3. **`main.js`**
   - Legacy JavaScript
   - Mobile menu toggle
   - Smooth scrolling
   - Not used by React app

### When to Remove Legacy Files

**Keep if:**
- You might need to rollback
- External links point to these files
- You're not 100% confident in React version

**Remove when:**
- React version is stable and tested
- All external links updated
- No longer serving as backup/reference

**How to Remove:**
```bash
# After confirming React version works
git rm contact.html index.css main.js
git commit -m "Remove legacy HTML files"
git push
```

### Root `index.html`

**Purpose:**
- Redirects to `/docs/` (where React app is built)
- Ensures GitHub Pages serves the built React app
- Simple redirect page for repository root

**Content:**
```html
<!doctype html>
<html>
  <head>
    <meta http-equiv="refresh" content="0; url=/docs/" />
    <link rel="canonical" href="/docs/" />
  </head>
  <body>
    <p>Redirecting to the built site — 
       <a href="/docs/">click here</a> if you are not redirected.
    </p>
  </body>
</html>
```

**Why Needed:**
- GitHub Pages serves from repository root by default
- React app is built to `/docs`
- This redirect bridges the gap

## Advanced Topics

### Code Splitting (Future)

For larger apps, split code into chunks:

```javascript
import React, { lazy, Suspense } from 'react'

// Lazy load heavy components
const Portfolio = lazy(() => import('./Portfolio'))

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Portfolio />
    </Suspense>
  )
}
```

### Routing (Future)

Add React Router for multiple pages:

```bash
npm install react-router-dom
```

```javascript
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/blog" element={<BlogPage />} />
      </Routes>
    </BrowserRouter>
  )
}
```

### Testing (Future)

Add Vitest for unit tests:

```bash
npm install -D vitest @testing-library/react
```

```javascript
// Component.test.jsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Hero from './Hero'

describe('Hero', () => {
  it('renders heading', () => {
    render(<Hero />)
    expect(screen.getByText(/Tim/i)).toBeInTheDocument()
  })
})
```

### TypeScript Migration (Future)

Add TypeScript for type safety:

```bash
npm install -D typescript @types/react @types/react-dom
```

Rename `.jsx` → `.tsx` and add types:

```typescript
// App.tsx
interface ContactFormData {
  firstName: string
  lastName: string
  email: string
  message: string
}

function Contact() {
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  })
  
  // TypeScript ensures type safety
}
```

## Troubleshooting

### Build Fails

**Error: Cannot find module 'tailwindcss'**
```bash
# Solution
npm install -D tailwindcss autoprefixer
npm run build
```

**Error: EISDIR illegal operation**
- Check `index.html` is not a directory
- Verify Vite can read entry point

### HMR Not Working

**Changes not reflecting:**
1. Hard refresh: Ctrl+Shift+R
2. Check browser console for errors
3. Restart dev server: `npm run dev`

### Build Size Too Large

**Bundle > 500KB:**
1. Check for large images in src/
2. Add code splitting
3. Lazy load components
4. Use WebP images instead of JPG/PNG

## Resources

- **React Docs**: [react.dev](https://react.dev)
- **Vite Docs**: [vitejs.dev](https://vitejs.dev)
- **TailwindCSS Docs**: [tailwindcss.com](https://tailwindcss.com)
- **Formspree Docs**: [formspree.io/docs](https://formspree.io/docs)
- **GitHub Pages Docs**: [docs.github.com/pages](https://docs.github.com/pages)

---

**Last Updated**: January 2025  
**Maintained by**: Tim Superville
