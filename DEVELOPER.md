# Developer Blueprint

> Complete developer guide for understanding, maintaining, and extending Tim Superville's portfolio website

## Table of Contents

- [Introduction](#introduction)
- [System Requirements](#system-requirements)
- [Development Environment Setup](#development-environment-setup)
- [Code Organization](#code-organization)
- [Development Best Practices](#development-best-practices)
- [Component Development](#component-development)
- [State Management Patterns](#state-management-patterns)
- [Styling Guidelines](#styling-guidelines)
- [Form Development](#form-development)
- [Analytics Integration](#analytics-integration)
- [Performance Optimization](#performance-optimization)
- [Testing Strategy](#testing-strategy)
- [Debugging Guide](#debugging-guide)
- [Code Review Checklist](#code-review-checklist)
- [Common Patterns](#common-patterns)
- [Extending the Portfolio](#extending-the-portfolio)

## Introduction

This document serves as a **complete blueprint** for developers working on or forking this portfolio. Whether you're maintaining the current site or adapting it for your own use, this guide provides the knowledge and patterns you need.

### Who This Guide Is For

- **Current Maintainer**: Tim Superville (primary user)
- **Future Maintainers**: Developers taking over the project
- **Contributors**: Open source contributors
- **Learners**: Developers studying the codebase
- **Forkers**: Developers adapting this for their own portfolios

### What You'll Learn

- Complete architecture and design decisions
- How to add new features safely
- Best practices for React development
- Performance optimization techniques
- Testing and debugging strategies
- Common pitfalls and how to avoid them

## System Requirements

### Required Software

| Tool | Minimum Version | Recommended | Purpose |
|------|----------------|-------------|---------|
| **Node.js** | 14.x | 18.x LTS | JavaScript runtime |
| **npm** | 6.x | 8.x | Package manager |
| **Git** | 2.x | Latest | Version control |
| **Modern Browser** | - | Chrome/Firefox | Testing |

### Optional Tools

- **VS Code**: Recommended editor with extensions
- **React DevTools**: Browser extension for debugging
- **Git GUI**: GitKraken, Sourcetree, or GitHub Desktop
- **Image Optimization**: TinyPNG, Sharp, or ImageOptim

### VS Code Extensions (Recommended)

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",          // ESLint
    "esbenp.prettier-vscode",          // Prettier
    "bradlc.vscode-tailwindcss",       // Tailwind IntelliSense
    "formulahendry.auto-rename-tag",   // Auto rename paired tags
    "dsznajder.es7-react-js-snippets", // React snippets
    "christian-kohler.path-intellisense" // Path autocomplete
  ]
}
```

## Development Environment Setup

### Initial Setup

```bash
# 1. Clone repository
git clone https://github.com/timsuperville/timsuperville.github.io.git
cd timsuperville.github.io

# 2. Install dependencies
npm install

# 3. Copy environment template
cp .env.example .env

# 4. (Optional) Add your analytics IDs to .env
# VITE_GA_ID=G-XXXXXXXXXX
# VITE_PLAUSIBLE_DOMAIN=yourdomain.com

# 5. Start development server
npm run dev

# 6. Open browser to http://localhost:5173
```

### Verify Setup

After starting the dev server, verify:

- [ ] Site loads without errors
- [ ] All sections visible (Header, Hero, Services, Portfolio, About, Contact, Footer)
- [ ] Navigation links work (smooth scroll to sections)
- [ ] Cookie banner appears (if no consent stored)
- [ ] Form fields are interactive
- [ ] Hot Module Replacement works (edit a component, see instant update)

### Common Setup Issues

**Issue: npm install fails**
```bash
# Clear npm cache
npm cache clean --force
# Delete lock file and node_modules
rm -rf node_modules package-lock.json
# Reinstall
npm install
```

**Issue: Port 5173 already in use**
```bash
# Option 1: Kill process on port
lsof -ti:5173 | xargs kill -9  # Mac/Linux
# Option 2: Use different port
npm run dev -- --port 3000
```

**Issue: Module not found errors**
```bash
# Ensure all dependencies installed
npm install
# Check for missing peer dependencies
npm install --legacy-peer-deps
```

## Code Organization

### File Structure Philosophy

The project follows a **pragmatic organization** approach:

- **Flat structure**: Minimal nesting for simplicity
- **Colocated concerns**: Related files stay together
- **Single responsibility**: Each file has one clear purpose
- **Progressive enhancement**: Can refactor to more complex structure later

### Directory Breakdown

```
/
├── src/                    # Source code (what you edit)
│   ├── App.jsx            # Main app component (all sections)
│   ├── main.jsx           # React entry point
│   ├── analytics.js       # Analytics module
│   ├── CookieBanner.jsx   # Cookie consent component
│   └── styles.css         # Global styles
│
├── images/                 # Source images (originals)
│   ├── profile.jpg        # Your headshot
│   ├── writingCode.jpg    # Project image 1
│   ├── background2.jpg    # Project image 2
│   └── logoblank.png      # Favicon fallback
│
├── docs/                   # Built site (generated, don't edit directly)
│   ├── index.html         # Built HTML
│   ├── assets/            # Bundled CSS/JS
│   └── images/            # Copied images
│
├── .env                    # Environment variables (local, gitignored)
├── .env.example            # Template for .env
├── package.json            # Dependencies and scripts
├── vite.config.js          # Vite build config
├── postcss.config.cjs      # PostCSS plugins
├── tailwind.config.cjs     # Tailwind config
└── README.md               # Main documentation
```

### Import Patterns

**Always use relative imports from src:**
```javascript
// ✅ Good
import { trackEvent } from './analytics'
import CookieBanner from './CookieBanner'

// ❌ Avoid (requires additional config)
import { trackEvent } from '@/analytics'
```

**Image imports:**
```jsx
// ✅ Public images (from /images)
<img src="/images/profile.jpg" alt="Profile" />

// ✅ Imported images (bundled by Vite)
import profileImg from './assets/profile.jpg'
<img src={profileImg} alt="Profile" />
```

## Development Best Practices

### 1. Component Development

**Keep components small and focused:**
```javascript
// ✅ Good: Single responsibility
function ContactForm() {
  return <form>{/* form fields */}</form>
}

function ContactInfo() {
  return <div>{/* contact details */}</div>
}

// ❌ Avoid: Too many responsibilities
function Contact() {
  // 500 lines of form + validation + info + styling...
}
```

**Extract reusable components:**
```javascript
// ✅ Good: Reusable Button
function Button({ children, variant = 'primary', ...props }) {
  return (
    <button className={`btn ${variant}`} {...props}>
      {children}
    </button>
  )
}

// Usage
<Button variant="primary" onClick={handleClick}>Submit</Button>
<Button variant="secondary">Cancel</Button>
```

### 2. State Management

**Use local state for component-specific data:**
```javascript
function Contact() {
  // ✅ Good: Form state in the component that uses it
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  
  return <form>{/* ... */}</form>
}
```

**Lift state up when needed:**
```javascript
// ✅ Good: Shared state in parent
function App() {
  const [theme, setTheme] = useState('light')
  
  return (
    <>
      <Header theme={theme} />
      <Hero theme={theme} />
      <Footer theme={theme} onThemeChange={setTheme} />
    </>
  )
}
```

**Use localStorage for persistence:**
```javascript
// ✅ Good: Read from localStorage on mount
const [consent, setConsent] = useState(() => {
  return localStorage.getItem('analytics_consent') === 'true'
})

// Save to localStorage on change
useEffect(() => {
  localStorage.setItem('analytics_consent', consent)
}, [consent])
```

### 3. Props and PropTypes

**Document props with JSDoc comments:**
```javascript
/**
 * Button component
 * @param {Object} props
 * @param {React.ReactNode} props.children - Button content
 * @param {'primary'|'secondary'|'danger'} props.variant - Button style
 * @param {Function} props.onClick - Click handler
 */
function Button({ children, variant, onClick }) {
  return <button className={`btn btn-${variant}`} onClick={onClick}>
    {children}
  </button>
}
```

**Provide default props:**
```javascript
function Button({ variant = 'primary', disabled = false, children }) {
  return <button className={variant} disabled={disabled}>
    {children}
  </button>
}
```

### 4. Event Handlers

**Use descriptive handler names:**
```javascript
// ✅ Good: Clear intent
const handleSubmit = (e) => { /* ... */ }
const handleEmailChange = (e) => { /* ... */ }
const handleFormReset = () => { /* ... */ }

// ❌ Avoid: Generic names
const handle = (e) => { /* ... */ }
const onChange = (e) => { /* ... */ }
```

**Prevent default behavior explicitly:**
```javascript
// ✅ Good: Clear what you're preventing
const handleSubmit = (e) => {
  e.preventDefault()  // Prevent form submission
  // Handle submission
}

const handleLinkClick = (e) => {
  e.preventDefault()  // Prevent navigation
  // Custom navigation logic
}
```

### 5. Async Operations

**Always handle errors:**
```javascript
// ✅ Good: Comprehensive error handling
const handleSubmit = async (e) => {
  e.preventDefault()
  setSubmitting(true)
  
  try {
    const response = await fetch(endpoint, { /* ... */ })
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }
    
    const data = await response.json()
    setStatus('success')
  } catch (error) {
    console.error('Submission error:', error)
    setStatus('error')
    setErrorMessage(error.message)
  } finally {
    setSubmitting(false)  // Always runs
  }
}
```

**Use loading states:**
```javascript
const [submitting, setSubmitting] = useState(false)

return (
  <button disabled={submitting}>
    {submitting ? 'Submitting...' : 'Submit'}
  </button>
)
```

## Component Development

### Component Lifecycle

**Mounting:**
```javascript
function MyComponent() {
  useEffect(() => {
    console.log('Component mounted')
    
    // Cleanup on unmount
    return () => {
      console.log('Component unmounting')
    }
  }, [])  // Empty deps = run once on mount
  
  return <div>Content</div>
}
```

**Updating:**
```javascript
function MyComponent({ userId }) {
  const [userData, setUserData] = useState(null)
  
  useEffect(() => {
    console.log('userId changed:', userId)
    fetchUserData(userId).then(setUserData)
  }, [userId])  // Runs when userId changes
  
  return <div>{userData?.name}</div>
}
```

### Conditional Rendering

**Use ternary for simple conditions:**
```javascript
return (
  <div>
    {loading ? <Spinner /> : <Content />}
  </div>
)
```

**Use && for optional rendering:**
```javascript
return (
  <div>
    {error && <ErrorMessage>{error}</ErrorMessage>}
    {data && <DataDisplay data={data} />}
  </div>
)
```

**Use early returns for complex conditions:**
```javascript
function UserProfile({ user }) {
  if (!user) {
    return <div>Please log in</div>
  }
  
  if (!user.profileComplete) {
    return <CompleteProfilePrompt />
  }
  
  return (
    <div>
      <h1>{user.name}</h1>
      {/* Full profile */}
    </div>
  )
}
```

### Lists and Keys

**Always provide keys:**
```javascript
// ✅ Good: Unique, stable key
{projects.map(project => (
  <ProjectCard key={project.id} project={project} />
))}

// ❌ Avoid: Index as key (can cause issues)
{items.map((item, index) => (
  <div key={index}>{item}</div>
))}
```

## State Management Patterns

### Local Component State

**When to use:**
- Form inputs
- UI toggles (show/hide)
- Component-specific data

**Example:**
```javascript
function Accordion() {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>
        Toggle
      </button>
      {isOpen && <div>Content</div>}
    </div>
  )
}
```

### Lifting State Up

**When to use:**
- Data needed by multiple components
- Coordinating sibling components

**Example:**
```javascript
function Parent() {
  const [searchTerm, setSearchTerm] = useState('')
  
  return (
    <>
      <SearchInput value={searchTerm} onChange={setSearchTerm} />
      <SearchResults searchTerm={searchTerm} />
    </>
  )
}
```

### Derived State

**Don't store computed values:**
```javascript
// ❌ Avoid: Storing derived value
const [fullName, setFullName] = useState('')

useEffect(() => {
  setFullName(`${firstName} ${lastName}`)
}, [firstName, lastName])

// ✅ Good: Compute on render
const fullName = `${firstName} ${lastName}`
```

### Form State

**Controlled components:**
```javascript
function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  return (
    <form>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      {/* ... */}
    </form>
  )
}
```

## Styling Guidelines

### CSS Architecture

**Three-layer approach:**

1. **Global Styles** (`src/styles.css`)
   - CSS reset/normalize
   - CSS variables
   - Typography base styles
   - Utility classes

2. **Component Styles** (inline with Tailwind)
   - Component-specific classes
   - Responsive utilities

3. **Custom Component CSS** (if needed)
   - Complex animations
   - Unique layouts

### CSS Variables Usage

**Define in `:root`:**
```css
:root {
  --color-primary: #4f46e5;
  --color-text: #111827;
  --spacing-unit: 8px;
}
```

**Use in styles:**
```css
.button {
  background-color: var(--color-primary);
  padding: calc(var(--spacing-unit) * 2);
}
```

**Override for themes:**
```css
[data-theme="dark"] {
  --color-primary: #818cf8;
  --color-text: #f9fafb;
}
```

### Responsive Design

**Mobile-first breakpoints:**
```css
/* Base: Mobile */
.container {
  padding: 1rem;
}

/* Tablet: 768px and up */
@media (min-width: 768px) {
  .container {
    padding: 2rem;
  }
}

/* Desktop: 1024px and up */
@media (min-width: 1024px) {
  .container {
    padding: 3rem;
    max-width: 1200px;
    margin: 0 auto;
  }
}
```

**Tailwind responsive classes:**
```jsx
<div className="
  flex flex-col        /* Mobile: stack */
  md:flex-row          /* Tablet+: row */
  lg:gap-8             /* Desktop: larger gap */
">
  {/* Content */}
</div>
```

### Animation Guidelines

**Use CSS transitions for simple animations:**
```css
.button {
  transition: background-color 0.2s ease;
}

.button:hover {
  background-color: var(--color-primary-dark);
}
```

**Use keyframes for complex animations:**
```css
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero {
  animation: fadeIn 0.6s ease-out;
}
```

**Respect user preferences:**
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Form Development

### Form Validation

**Client-side validation pattern:**
```javascript
const validate = () => {
  const errors = {}
  
  if (!firstName.trim()) {
    errors.firstName = 'First name is required'
  }
  
  if (!email.trim()) {
    errors.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Invalid email format'
  }
  
  if (message.length < 10) {
    errors.message = 'Message must be at least 10 characters'
  }
  
  return errors
}

const handleSubmit = (e) => {
  e.preventDefault()
  
  const errors = validate()
  if (Object.keys(errors).length > 0) {
    setErrors(errors)
    return
  }
  
  // Submit form
}
```

### Error Display

**Show errors near inputs:**
```jsx
<div className="form-group">
  <label htmlFor="email">Email</label>
  <input
    id="email"
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    className={errors.email ? 'error' : ''}
  />
  {errors.email && (
    <span className="error-message">{errors.email}</span>
  )}
</div>
```

### Success Feedback

**Show success state:**
```javascript
const [status, setStatus] = useState(null)  // 'success' | 'error' | null

return (
  <>
    {status === 'success' && (
      <div className="alert success">
        Thank you! Your message has been sent.
      </div>
    )}
    
    {status === 'error' && (
      <div className="alert error">
        {errorMessage || 'Something went wrong. Please try again.'}
      </div>
    )}
    
    <form onSubmit={handleSubmit}>
      {/* form fields */}
    </form>
  </>
)
```

## Analytics Integration

### Event Tracking Pattern

**Track user interactions:**
```javascript
import { trackEvent } from './analytics'

function ContactForm() {
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      // Submit form
      await submitToFormspree(data)
      
      // Track success
      trackEvent('contact_submit', {
        result: 'success',
        project_type: formData.projectType
      })
      
      setStatus('success')
    } catch (error) {
      // Track error
      trackEvent('contact_submit', {
        result: 'error',
        error: error.message
      })
      
      setStatus('error')
    }
  }
  
  return <form onSubmit={handleSubmit}>{/* ... */}</form>
}
```

**Track navigation:**
```javascript
function Header() {
  const handleNavClick = (section) => {
    trackEvent('navigation_click', { section })
  }
  
  return (
    <nav>
      <a href="#home" onClick={() => handleNavClick('home')}>Home</a>
      <a href="#portfolio" onClick={() => handleNavClick('portfolio')}>Portfolio</a>
    </nav>
  )
}
```

### Privacy Considerations

**Always check consent before tracking:**
```javascript
import { hasConsent, trackEvent } from './analytics'

function trackUserAction(action) {
  if (!hasConsent()) {
    console.log('Analytics not enabled')
    return
  }
  
  trackEvent(action)
}
```

**Provide opt-out mechanism:**
```javascript
function Footer() {
  const [analyticsEnabled, setAnalyticsEnabled] = useState(hasConsent())
  
  const toggleAnalytics = () => {
    if (analyticsEnabled) {
      optOut()
      setAnalyticsEnabled(false)
    } else {
      optIn()
      initAnalytics()
      setAnalyticsEnabled(true)
    }
  }
  
  return (
    <footer>
      <button onClick={toggleAnalytics}>
        Analytics: {analyticsEnabled ? 'ON' : 'OFF'}
      </button>
    </footer>
  )
}
```

## Performance Optimization

### Image Optimization

**Use appropriate formats:**
- **WebP**: Best compression, modern browsers
- **JPEG**: Photos, complex images
- **PNG**: Logos, transparency needed
- **SVG**: Icons, logos, simple graphics

**Compress before adding:**
```bash
# Using sharp-cli
npm install -g sharp-cli
sharp -i image.jpg -o image-optimized.jpg --mozjpeg

# Or use online tools
# - tinypng.com
# - squoosh.app
```

**Lazy load images:**
```jsx
<img src="/images/project.jpg" loading="lazy" alt="Project" />
```

### Bundle Size

**Check bundle size:**
```bash
npm run build
# Check docs/assets/*.js file sizes
```

**Analyze bundle:**
```bash
npm install -D rollup-plugin-visualizer
```

Add to `vite.config.js`:
```javascript
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    react(),
    visualizer({ open: true })
  ]
})
```

### Code Splitting

**Lazy load heavy components:**
```javascript
import React, { lazy, Suspense } from 'react'

const Portfolio = lazy(() => import('./Portfolio'))

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Portfolio />
    </Suspense>
  )
}
```

### Memoization

**Memoize expensive computations:**
```javascript
import { useMemo } from 'react'

function ProjectList({ projects }) {
  const sortedProjects = useMemo(() => {
    return projects.sort((a, b) => b.date - a.date)
  }, [projects])
  
  return <div>{sortedProjects.map(/* ... */)}</div>
}
```

**Memoize callbacks:**
```javascript
import { useCallback } from 'react'

function Parent() {
  const [count, setCount] = useState(0)
  
  const handleClick = useCallback(() => {
    setCount(c => c + 1)
  }, [])  // Stable reference
  
  return <Child onClick={handleClick} />
}
```

## Testing Strategy

### Manual Testing Checklist

**Before each deployment:**
- [ ] All sections render correctly
- [ ] Navigation links work
- [ ] Form validation works
- [ ] Form submission succeeds
- [ ] Analytics consent banner appears (clear localStorage first)
- [ ] Analytics opt-in/opt-out works
- [ ] Responsive design works on mobile/tablet/desktop
- [ ] Images load correctly
- [ ] No console errors

**Browser testing:**
- [ ] Chrome (desktop & mobile)
- [ ] Firefox (desktop & mobile)
- [ ] Safari (desktop & mobile)
- [ ] Edge (desktop)

### Automated Testing (Future)

**Unit tests with Vitest:**
```javascript
// contact.test.jsx
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Contact from './Contact'

describe('Contact Form', () => {
  it('shows error for invalid email', () => {
    render(<Contact />)
    
    const input = screen.getByLabelText(/email/i)
    fireEvent.change(input, { target: { value: 'invalid' } })
    fireEvent.blur(input)
    
    expect(screen.getByText(/invalid email/i)).toBeInTheDocument()
  })
})
```

## Debugging Guide

### Browser DevTools

**Console debugging:**
```javascript
function MyComponent({ data }) {
  console.log('Component rendered', { data })
  
  useEffect(() => {
    console.log('Effect ran', { data })
  }, [data])
  
  return <div>{/* ... */}</div>
}
```

**React DevTools:**
1. Install React DevTools extension
2. Open browser DevTools → "Components" tab
3. Inspect component tree
4. View props and state
5. Trigger updates manually

**Network debugging:**
1. Open DevTools → Network tab
2. Filter for "Fetch/XHR"
3. Check form submission requests
4. Verify analytics requests
5. Check for failed requests

### Common Issues

**Issue: State not updating**
```javascript
// ❌ Problem: Direct state mutation
const handleClick = () => {
  formData.email = 'new@email.com'  // Won't trigger re-render
  setFormData(formData)
}

// ✅ Solution: Create new object
const handleClick = () => {
  setFormData({ ...formData, email: 'new@email.com' })
}
```

**Issue: Stale closure**
```javascript
// ❌ Problem: Callback references old state
const [count, setCount] = useState(0)

useEffect(() => {
  const timer = setInterval(() => {
    setCount(count + 1)  // Always uses initial count
  }, 1000)
  return () => clearInterval(timer)
}, [])

// ✅ Solution: Use functional update
const [count, setCount] = useState(0)

useEffect(() => {
  const timer = setInterval(() => {
    setCount(c => c + 1)  // Uses current count
  }, 1000)
  return () => clearInterval(timer)
}, [])
```

## Code Review Checklist

**Before committing:**
- [ ] Code follows existing patterns
- [ ] No console.log statements (except for intentional logging)
- [ ] No commented-out code
- [ ] Consistent formatting
- [ ] Descriptive variable names
- [ ] Error handling in place
- [ ] No hardcoded values (use constants/env vars)
- [ ] Responsive design tested
- [ ] Accessibility considerations
- [ ] Performance impact considered

**Git commit messages:**
```bash
# ✅ Good: Descriptive, specific
git commit -m "Add email validation to contact form"
git commit -m "Fix mobile navigation menu toggle"
git commit -m "Optimize portfolio images (reduce size by 60%)"

# ❌ Avoid: Vague, generic
git commit -m "Fix bug"
git commit -m "Update stuff"
git commit -m "Changes"
```

## Common Patterns

### API Calls

```javascript
async function fetchData(endpoint) {
  try {
    const response = await fetch(endpoint)
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('Fetch error:', error)
    throw error
  }
}
```

### Loading States

```javascript
function DataComponent() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    fetchData()
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [])
  
  if (loading) return <Spinner />
  if (error) return <ErrorMessage error={error} />
  if (!data) return <EmptyState />
  
  return <DataDisplay data={data} />
}
```

## Extending the Portfolio

### Adding a Blog

**1. Create blog component:**
```javascript
// src/Blog.jsx
export default function Blog() {
  const posts = [
    { id: 1, title: 'Post 1', excerpt: '...', date: '2025-01-15' },
    // ...
  ]
  
  return (
    <section id="blog" className="section">
      <div className="container">
        <h2>Blog</h2>
        <div className="grid-2">
          {posts.map(post => (
            <article key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <time>{post.date}</time>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
```

**2. Add to App:**
```javascript
import Blog from './Blog'

export default function App() {
  return (
    <>
      <Header />
      {/* ... other sections */}
      <Blog />  {/* Add here */}
      <Footer />
    </>
  )
}
```

**3. Add navigation:**
```javascript
function Header() {
  return (
    <nav>
      {/* ... other links */}
      <a href="#blog">Blog</a>
    </nav>
  )
}
```

### Adding Dark Mode

**1. Add theme state:**
```javascript
function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light'
  })
  
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])
  
  const toggleTheme = () => {
    setTheme(t => t === 'light' ? 'dark' : 'light')
  }
  
  return (
    <>
      <Header theme={theme} onToggleTheme={toggleTheme} />
      {/* ... */}
    </>
  )
}
```

**2. Add CSS:**
```css
[data-theme="light"] {
  --color-bg: #ffffff;
  --color-text: #111827;
}

[data-theme="dark"] {
  --color-bg: #111827;
  --color-text: #f9fafb;
}

body {
  background-color: var(--color-bg);
  color: var(--color-text);
}
```

**3. Add toggle button:**
```javascript
function Header({ theme, onToggleTheme }) {
  return (
    <header>
      <nav>{/* ... */}</nav>
      <button onClick={onToggleTheme}>
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
    </header>
  )
}
```

---

## Summary

This developer guide provides a complete blueprint for:
- Setting up and maintaining the portfolio
- Understanding architectural decisions
- Following best practices
- Extending with new features
- Debugging and testing

Use this as your reference when developing. As you add features, update this document to reflect new patterns and learnings.

**Questions?** Review the main [README.md](./README.md) and [README-react-migration.md](./README-react-migration.md) for additional context.

---

**Last Updated**: January 2025  
**Maintained by**: Tim Superville
