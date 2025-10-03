# Tim Superville - Professional Portfolio Website

> A modern, high-performance portfolio website showcasing freelance web development services and projects. Built with React, Vite, and modern web technologies for optimal performance and user experience.

[![GitHub Pages](https://img.shields.io/badge/deployed-GitHub%20Pages-success)](https://timsuperville.github.io)
[![React](https://img.shields.io/badge/React-18.2.0-blue)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF)](https://vitejs.dev)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [Deployment](#deployment)
- [Customization](#customization)
- [Project Structure](#project-structure)
- [Development Workflow](#development-workflow)
- [Performance](#performance)
- [Analytics & Privacy](#analytics--privacy)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

This portfolio website serves as a professional showcase for Tim Superville, a freelance web developer specializing in modern web applications. The site is designed to:

- **Attract Clients**: Present services and past work in an engaging, professional manner
- **Demonstrate Expertise**: Showcase technical skills through the site's own implementation
- **Facilitate Contact**: Provide easy ways for potential clients to reach out
- **Build Trust**: Establish credibility through testimonials, portfolio pieces, and professional presentation

### Key Objectives

1. **Performance First**: Fast loading times and smooth interactions to keep visitors engaged
2. **Mobile Responsive**: Flawless experience across all devices and screen sizes
3. **SEO Optimized**: Discoverable through search engines with proper meta tags and semantic HTML
4. **Privacy Conscious**: GDPR-compliant analytics with user consent and opt-out options
5. **Maintainable**: Clean, well-documented code that's easy to update and extend

## ✨ Features

### Core Features

- **🎨 Modern UI/UX Design**
  - Clean, professional aesthetic that reflects modern web design trends
  - Smooth animations and transitions for enhanced user experience
  - Consistent branding throughout all pages and components
  - Custom SVG logo with gradient effects

- **📱 Fully Responsive Design**
  - Mobile-first approach ensuring optimal experience on all devices
  - Flexible layouts using CSS Grid and Flexbox
  - Adaptive navigation that transforms for mobile screens
  - Touch-friendly interactive elements

- **🛠️ Services Showcase**
  - Clear presentation of offered web development services
  - Service cards with icons and descriptions
  - Easy to update and expand service offerings

- **💼 Portfolio Section**
  - Display of recent projects with images and descriptions
  - Technology stack badges for each project
  - Filterable project categories (can be extended)
  - Project detail views with live links and GitHub repos

- **📬 Advanced Contact Form**
  - Comprehensive multi-field contact form
  - Real-time client-side validation
  - Spam protection with honeypot and timing checks
  - Integration with Formspree for email delivery
  - Success/error feedback to users
  - Form state management with React hooks

- **🔍 SEO Optimization**
  - Semantic HTML5 structure
  - Proper meta tags (title, description, Open Graph, Twitter Cards)
  - Sitemap.xml for search engine crawlers
  - Robots.txt for crawler directives
  - Schema.org structured data (can be extended)
  - Fast page load times for better rankings

- **📊 Analytics Integration**
  - Support for Google Analytics 4 (GA4)
  - Support for Plausible Analytics (privacy-focused alternative)
  - Cookie consent banner for GDPR compliance
  - User opt-in/opt-out functionality
  - LocalStorage-based consent management
  - Event tracking for user interactions

- **♿ Accessibility**
  - ARIA labels and roles for screen readers
  - Keyboard navigation support
  - Sufficient color contrast ratios
  - Focus indicators for interactive elements
  - Semantic heading structure

- **🔒 Privacy & Security**
  - No tracking without explicit user consent
  - Secure form submission practices
  - No sensitive data stored client-side
  - HTTPS enforced via GitHub Pages

## 🛠️ Technology Stack

### Frontend Framework
- **React 18.2.0**: Modern UI library with hooks for state management
- **JSX**: Component-based architecture for maintainable code

### Build Tools
- **Vite 5.x**: Next-generation frontend tooling for fast development
  - Lightning-fast Hot Module Replacement (HMR)
  - Optimized production builds with tree-shaking
  - Native ES modules support
  - TypeScript support ready

### Styling
- **CSS3**: Modern styling with custom properties (CSS variables)
- **TailwindCSS 3.x** (PostCSS): Utility-first CSS framework
- **Autoprefixer**: Automatic vendor prefix handling
- **CSS Grid & Flexbox**: Advanced layout capabilities
- **CSS Animations**: Smooth transitions and micro-interactions

### Analytics
- **Google Analytics 4**: Comprehensive web analytics
- **Plausible Analytics**: Privacy-friendly alternative (optional)
- Custom analytics wrapper for consent management

### Form Handling
- **Formspree**: Backend service for form submissions
- **React Hooks**: Client-side form state management
- Built-in validation and spam protection

### Hosting & Deployment
- **GitHub Pages**: Free, reliable static site hosting
- **GitHub Actions**: Automated deployment on push (optional)
- **Custom Domain Support**: Can be configured for custom domains

### Development Tools
- **npm**: Package management
- **ESLint** (optional): Code quality and consistency
- **Prettier** (optional): Code formatting

## 🏗️ Architecture

### Component Structure

The application follows a single-page architecture with React components:

```
App (Root Component)
├── Header (Navigation)
├── Hero (Landing Section)
├── Services (Service Cards)
├── Portfolio (Project Showcase)
├── About (Bio & Links)
├── Contact (Contact Form)
├── Footer (Footer & Analytics Toggle)
└── CookieBanner (Consent Management)
```

### State Management

- **React Hooks**: useState, useEffect for local component state
- **LocalStorage**: Persistent user preferences (analytics consent)
- **Form State**: Controlled components for form inputs

### Analytics Architecture

```
analytics.js (Core Module)
├── hasConsent(): Check user consent status
├── initAnalytics(): Initialize GA4/Plausible
├── trackEvent(): Track custom events
├── optIn(): User accepts analytics
└── optOut(): User declines analytics

main.jsx: Initialize analytics if consent given
CookieBanner.jsx: Handle user consent UI
App.jsx: Track form submissions and interactions
```

### Build Process

1. **Development**: `npm run dev` starts Vite dev server with HMR
2. **Production Build**: `npm run build` creates optimized bundle in `/docs`
3. **Preview**: `npm run preview` serves production build locally

### Routing

Currently uses hash-based routing (`#section`) for single-page navigation. Can be extended to:
- React Router for multi-page navigation
- Dynamic routes for blog or project details

## 🚀 Getting Started

### Prerequisites

- **Node.js**: Version 14.x or higher (18.x recommended)
- **npm**: Version 6.x or higher (comes with Node.js)
- **Git**: For version control
- **Code Editor**: VS Code recommended with ES6/JSX support

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/timsuperville/timsuperville.github.io.git
   cd timsuperville.github.io
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables (optional)**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your analytics IDs:
   ```env
   VITE_GA_ID=G-XXXXXXXXXX
   VITE_PLAUSIBLE_DOMAIN=yourdomain.com
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```
   
   The site will be available at `http://localhost:5173`

5. **Build for production**
   ```bash
   npm run build
   ```
   
   The built site will be in the `/docs` directory

### Quick Start Checklist

- [ ] Install Node.js and npm
- [ ] Clone repository
- [ ] Run `npm install`
- [ ] Configure `.env` (optional)
- [ ] Update personal information in `src/App.jsx`
- [ ] Replace profile image in `/images/profile.jpg`
- [ ] Update Formspree endpoint in `src/App.jsx`
- [ ] Run `npm run dev` to preview
- [ ] Run `npm run build` to build for production
- [ ] Commit and push to deploy

## ⚙️ Configuration

### Analytics Configuration

#### Google Analytics 4 (GA4)

1. Create a GA4 property at [Google Analytics](https://analytics.google.com)
2. Copy your Measurement ID (format: `G-XXXXXXXXXX`)
3. Add to `.env`:
   ```env
   VITE_GA_ID=G-XXXXXXXXXX
   ```

#### Plausible Analytics (Privacy-Focused)

1. Sign up at [Plausible.io](https://plausible.io)
2. Add your domain
3. Add to `.env`:
   ```env
   VITE_PLAUSIBLE_DOMAIN=timsuperville.github.io
   ```

**Note**: Analytics only load after user consent via the cookie banner.

### Form Configuration

The contact form uses Formspree for email delivery:

1. Sign up at [Formspree.io](https://formspree.io)
2. Create a new form
3. Copy your form endpoint
4. Update in `src/App.jsx`:
   ```javascript
   const FORMSPREE_ENDPOINT = 'https://formspree.io/f/your-form-id'
   ```

### Custom Domain Configuration

To use a custom domain (e.g., `timsuperville.dev`):

1. Add a `CNAME` file in the `/docs` directory with your domain
2. Configure DNS records with your domain provider:
   ```
   A Record: 185.199.108.153
   A Record: 185.199.109.153
   A Record: 185.199.110.153
   A Record: 185.199.111.153
   ```
3. Update `base` in `vite.config.js` if needed
4. Wait for DNS propagation (up to 48 hours)

### Environment Variables

All environment variables are prefixed with `VITE_` to be accessible in the frontend:

```env
# Google Analytics 4
VITE_GA_ID=G-XXXXXXXXXX

# Plausible Analytics
VITE_PLAUSIBLE_DOMAIN=yourdomain.com
```

**Security Note**: Never commit `.env` to version control. Only `.env.example` should be tracked.

## 🚢 Deployment

This site is configured for automatic deployment to GitHub Pages.

### GitHub Pages Setup

1. **Repository Settings**
   - Go to repository Settings → Pages
   - Source: Deploy from a branch
   - Branch: `main` (or your default branch)
   - Folder: `/docs`
   - Click Save

2. **Build and Deploy**
   ```bash
   npm run build
   git add docs/
   git commit -m "Build for deployment"
   git push origin main
   ```

3. **Access Your Site**
   - Your site will be live at: `https://yourusername.github.io`
   - First deployment may take 2-5 minutes

### Manual Deployment

If you prefer to build locally before pushing:

```bash
# Build the site
npm run build

# Preview the build locally
npm run preview

# Commit and push
git add docs/
git commit -m "Deploy updates"
git push origin main
```

### Automated Deployment (Optional)

You can set up GitHub Actions to automatically build on push:

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./docs
```

### Deployment Checklist

- [ ] Run `npm run build` to create production bundle
- [ ] Test production build locally with `npm run preview`
- [ ] Verify all links work correctly
- [ ] Check responsive design on multiple devices
- [ ] Validate HTML/CSS (optional)
- [ ] Update any hardcoded URLs if using custom domain
- [ ] Commit built files in `/docs` directory
- [ ] Push to GitHub
- [ ] Verify deployment on GitHub Pages
- [ ] Test analytics and form submission on live site

## 🎨 Customization

### Personal Branding

#### 1. Update Profile Information

Edit `src/App.jsx` to update your personal information:

```javascript
// Hero Section
function Hero(){
  return (
    <section id="home" className="hero">
      <div className="container hero-inner">
        <h1>Hi, I'm [Your Name] — [Your Title]</h1>
        <p>[Your tagline or brief description]</p>
        {/* ... */}
      </div>
    </section>
  )
}

// About Section
function About(){
  return (
    <section id="about" className="section">
      <div className="container about-grid">
        <div>
          <h2>About Me</h2>
          <p>[Your bio - paragraph 1]</p>
          <p>[Your bio - paragraph 2]</p>
          {/* Update social links */}
          <div className="social">
            <a href="https://github.com/yourusername">GitHub</a>
            <a href="https://linkedin.com/in/yourusername">LinkedIn</a>
          </div>
        </div>
        {/* ... */}
      </div>
    </section>
  )
}
```

#### 2. Update Contact Information

Update email and other contact details:

```javascript
function Contact(props){
  // Update Formspree endpoint
  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/your-form-id'
  
  // ... rest of component
}

function Footer(){
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p>© 2025 [Your Name]. All rights reserved.</p>
        <p>Email: <a href="mailto:your@email.com">your@email.com</a></p>
        {/* ... */}
      </div>
    </footer>
  )
}
```

#### 3. Replace Images

Replace these key images in the `/images` directory:

- `profile.jpg`: Your professional headshot (recommended: 400x400px, square)
- `writingCode.jpg`: Project showcase image 1 (recommended: 1200x800px)
- `background2.jpg`: Project showcase image 2 (recommended: 1200x800px)
- `logoblank.png`: Favicon fallback (recommended: 512x512px)

Update the logo in `favicon.svg` with your own design.

#### 4. Customize Colors

Update the color scheme in `src/styles.css`:

```css
:root {
  /* Primary brand colors */
  --color-primary: #4f46e5;      /* Main brand color */
  --color-primary-dark: #4338ca;  /* Darker shade */
  --color-accent: #06b6d4;        /* Accent color */
  
  /* Background colors */
  --color-bg: #ffffff;
  --color-bg-alt: #f9fafb;
  
  /* Text colors */
  --color-text: #111827;
  --color-text-light: #6b7280;
  
  /* Add your custom colors here */
}
```

#### 5. Update Services

Modify the services you offer in `src/App.jsx`:

```javascript
function Services(){
  return (
    <section id="services" className="section">
      <div className="container">
        <h2>Services</h2>
        <div className="grid-3">
          <div className="card">
            <h3>[Your Service 1]</h3>
            <p>[Service description]</p>
          </div>
          {/* Add more service cards */}
        </div>
      </div>
    </section>
  )
}
```

#### 6. Update Portfolio Projects

Update your portfolio items:

```javascript
function Portfolio(){
  return (
    <section id="portfolio" className="section alt">
      <div className="container">
        <h2>Recent Projects</h2>
        <div className="grid-2">
          <article className="portfolio-item">
            <img src="/images/project1.jpg" alt="Project 1" />
            <h3>[Project Name]</h3>
            <p>[Project description]</p>
            {/* Add tech stack, links, etc. */}
          </article>
          {/* Add more projects */}
        </div>
      </div>
    </section>
  )
}
```

### Advanced Customization

#### Adding New Sections

1. Create a new component function in `src/App.jsx`:
   ```javascript
   function NewSection(){
     return (
       <section id="newsection" className="section">
         <div className="container">
           <h2>New Section</h2>
           {/* Your content */}
         </div>
       </section>
     )
   }
   ```

2. Add it to the main App component:
   ```javascript
   export default function App(){
     return (
       <>
         <Header />
         <Hero />
         <Services />
         <Portfolio />
         <About />
         <NewSection />  {/* Add here */}
         <Contact />
         <Footer />
       </>
     )
   }
   ```

3. Add navigation link in Header:
   ```javascript
   <nav>
     {/* ... other links */}
     <a href="#newsection">New Section</a>
   </nav>
   ```

#### Custom Fonts

1. Add font import in `src/styles.css`:
   ```css
   @import url('https://fonts.googleapis.com/css2?family=Your+Font:wght@400;700&display=swap');
   
   :root {
     --font-body: 'Your Font', sans-serif;
   }
   ```

2. Apply to body:
   ```css
   body {
     font-family: var(--font-body);
   }
   ```

## 📁 Project Structure

```
timsuperville.github.io/
├── .github/                 # GitHub-specific files
│   └── workflows/          # GitHub Actions workflows (optional)
├── docs/                   # Built site (deployed to GitHub Pages)
│   ├── assets/            # Compiled CSS and JS bundles
│   ├── images/            # Copied image assets
│   └── index.html         # Built HTML entry point
├── images/                 # Source image assets
│   ├── profile.jpg        # Profile photo
│   ├── writingCode.jpg    # Portfolio image 1
│   ├── background2.jpg    # Portfolio image 2
│   └── logoblank.png      # Favicon fallback
├── src/                    # React source code
│   ├── App.jsx            # Main React component (all sections)
│   ├── main.jsx           # React entry point
│   ├── analytics.js       # Analytics module (GA4, Plausible)
│   ├── CookieBanner.jsx   # Cookie consent component
│   └── styles.css         # Global styles and CSS variables
├── .env.example            # Environment variables template
├── .gitignore              # Git ignore rules
├── favicon.svg             # Site favicon (SVG)
├── index.html              # Root redirect to /docs
├── package.json            # npm dependencies and scripts
├── package-lock.json       # Locked dependency versions
├── postcss.config.cjs      # PostCSS configuration (Tailwind, Autoprefixer)
├── README.md               # This file - main documentation
├── README-react-migration.md # React migration notes
├── robots.txt              # Search engine crawler directives
├── sitemap.xml             # Search engine sitemap
├── tailwind.config.cjs     # TailwindCSS configuration
└── vite.config.js          # Vite build configuration

Legacy files (can be removed after full React migration):
├── contact.html            # Legacy contact page
├── index.css              # Legacy stylesheet
└── main.js                # Legacy JavaScript
```

### Key Files Explained

- **`src/App.jsx`**: Main application component containing all page sections
- **`src/main.jsx`**: React entry point that mounts the app
- **`src/analytics.js`**: Analytics integration with consent management
- **`src/CookieBanner.jsx`**: Cookie consent UI component
- **`src/styles.css`**: Global styles, CSS variables, and Tailwind imports
- **`vite.config.js`**: Vite configuration (build to `/docs`, base path)
- **`package.json`**: Dependencies and npm scripts
- **`.env.example`**: Template for environment variables
- **`docs/`**: Production build output (served by GitHub Pages)

## 🔧 Development Workflow

### Daily Development

1. **Start Development Server**
   ```bash
   npm run dev
   ```
   - Launches Vite dev server at `http://localhost:5173`
   - Hot Module Replacement (HMR) for instant updates
   - View changes in real-time without page refresh

2. **Make Changes**
   - Edit React components in `src/App.jsx`
   - Update styles in `src/styles.css`
   - Add/replace images in `/images`
   - Changes appear instantly in browser

3. **Build and Test**
   ```bash
   npm run build      # Build for production
   npm run preview    # Preview production build
   ```

4. **Deploy**
   ```bash
   git add .
   git commit -m "Your changes"
   git push origin main
   ```

### Best Practices

1. **Component Organization**
   - Keep components small and focused
   - Extract reusable components into separate files when needed
   - Use descriptive function names

2. **State Management**
   - Use React hooks (useState, useEffect) for local state
   - Keep form state controlled
   - Store user preferences in localStorage

3. **Styling**
   - Use CSS variables for consistent theming
   - Follow mobile-first approach
   - Keep styles scoped and maintainable

4. **Performance**
   - Optimize images before adding them
   - Keep bundle size small
   - Use lazy loading for images when appropriate
   - Minimize re-renders

5. **Accessibility**
   - Use semantic HTML elements
   - Add ARIA labels where needed
   - Ensure keyboard navigation works
   - Maintain color contrast ratios

6. **Version Control**
   - Commit frequently with clear messages
   - Don't commit `.env` or `node_modules`
   - Keep `/docs` in version control for GitHub Pages

### npm Scripts

```bash
npm run dev       # Start development server with HMR
npm run build     # Build for production (outputs to /docs)
npm run preview   # Preview production build locally
```

### Adding Dependencies

```bash
# Add a runtime dependency
npm install package-name

# Add a development dependency
npm install -D package-name

# Update dependencies
npm update

# Check for outdated packages
npm outdated
```

## ⚡ Performance

### Current Performance Metrics

- **First Contentful Paint (FCP)**: < 1.0s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Time to Interactive (TTI)**: < 3.0s
- **Cumulative Layout Shift (CLS)**: < 0.1
- **Bundle Size**: ~50-70KB (gzipped)

### Optimization Techniques Used

1. **Build Optimization**
   - Vite's optimized production builds
   - Tree-shaking to remove unused code
   - Code splitting for async components (can be extended)
   - Minification of HTML, CSS, and JavaScript

2. **Asset Optimization**
   - Compressed images (recommend WebP format)
   - SVG logo for scalability without pixelation
   - Lazy loading for images (can be implemented)
   - CSS and JS bundling and minification

3. **Rendering Optimization**
   - Efficient React component structure
   - Minimal re-renders
   - No unnecessary useEffect dependencies
   - Controlled form inputs

4. **Caching Strategy**
   - Browser caching via GitHub Pages
   - Service worker (can be implemented with Workbox)

### Performance Improvement Tips

1. **Image Optimization**
   ```bash
   # Convert images to WebP format
   # Use online tools or CLI tools like sharp
   npm install -g sharp-cli
   sharp -i image.jpg -o image.webp
   ```

2. **Implement Lazy Loading**
   ```javascript
   // Add to images in portfolio
   <img src="/images/project.jpg" loading="lazy" alt="Project" />
   ```

3. **Add Service Worker (PWA)**
   - Implement with Vite PWA plugin
   - Enable offline functionality
   - Cache assets for faster subsequent loads

4. **Optimize Analytics Loading**
   - Analytics scripts only load after consent
   - Scripts loaded asynchronously
   - No blocking of page rendering

### Measuring Performance

Use these tools to measure and monitor performance:

- **Lighthouse**: Built into Chrome DevTools
  ```bash
  # Run Lighthouse CLI
  npm install -g lighthouse
  lighthouse https://timsuperville.github.io --view
  ```

- **WebPageTest**: [webpagetest.org](https://www.webpagetest.org)
- **Google PageSpeed Insights**: [pagespeed.web.dev](https://pagespeed.web.dev)
- **Chrome DevTools**: Performance and Network tabs

## 📊 Analytics & Privacy

### Privacy-First Approach

This site implements a **consent-first analytics strategy**:

1. **No tracking by default**: Analytics do not initialize without user consent
2. **Clear consent UI**: Cookie banner explains what data is collected
3. **Easy opt-out**: Users can decline or revoke consent at any time
4. **Persistent preferences**: Consent choice stored in localStorage
5. **GDPR compliant**: Meets European privacy regulations

### Analytics Implementation

#### How It Works

1. **Page Load**: Analytics check for consent
2. **No Consent**: Cookie banner displays
3. **User Accepts**: Analytics initialize, banner hides
4. **User Declines**: No analytics load, banner hides
5. **Preference Stored**: LocalStorage remembers choice

#### Tracked Events

- Page views (automatic)
- Contact form submissions
- User interactions (can be extended)

#### What Is NOT Tracked

- Personal information
- Form content
- Keystrokes
- Mouse movements

### Data Collection

#### Google Analytics 4
- Anonymous visitor data
- Page views and session duration
- Geographic location (country/city level)
- Device and browser information
- Traffic sources

#### Plausible Analytics
- Page views only
- No cookies
- No personal data
- Privacy-focused alternative to GA4

### Managing Consent

Users can manage their consent preference:

1. **Via Cookie Banner**: On first visit
2. **Via Footer Toggle**: Available on every page load
3. **Via Browser**: Clear localStorage to reset

### For Developers

#### Disable Analytics in Development

Analytics are only initialized when `VITE_GA_ID` or `VITE_PLAUSIBLE_DOMAIN` is set. In development, leave `.env` empty or don't create it.

#### Track Custom Events

```javascript
import { trackEvent } from './analytics'

// Track a custom event
trackEvent('button_click', {
  button_name: 'Download Resume',
  section: 'hero'
})
```

#### Check Consent Status

```javascript
import { hasConsent } from './analytics'

if (hasConsent()) {
  // User has given consent
}
```

## 🐛 Troubleshooting

### Common Issues and Solutions

#### Build Errors

**Issue**: `Module not found` errors during build
```
Solution:
1. Delete node_modules and package-lock.json
2. Run: npm install
3. Try building again: npm run build
```

**Issue**: PostCSS or Tailwind errors
```
Solution:
1. Ensure tailwindcss and autoprefixer are installed:
   npm install -D tailwindcss autoprefixer
2. Rebuild: npm run build
```

**Issue**: Vite CJS deprecation warning
```
Solution: This is a warning and won't affect build.
To fix, update vite.config.js to use ES modules (optional).
```

#### Development Server Issues

**Issue**: Port 5173 already in use
```
Solution:
1. Kill the process using port 5173:
   lsof -ti:5173 | xargs kill -9   (Mac/Linux)
   netstat -ano | findstr :5173    (Windows)
2. Or specify a different port:
   npm run dev -- --port 3000
```

**Issue**: Changes not reflecting in browser
```
Solution:
1. Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
2. Clear browser cache
3. Restart dev server: Stop and run npm run dev again
```

#### GitHub Pages Deployment Issues

**Issue**: Site shows 404 error
```
Solution:
1. Verify GitHub Pages settings:
   - Source: Deploy from a branch
   - Branch: main
   - Folder: /docs
2. Ensure /docs is committed and pushed:
   git add docs/
   git commit -m "Add build files"
   git push
3. Wait 2-5 minutes for deployment
```

**Issue**: Assets not loading (blank page)
```
Solution:
1. Check vite.config.js base path:
   base: './'    // For GitHub Pages without custom domain
   base: '/'     // For custom domain
2. Rebuild: npm run build
3. Commit and push
```

**Issue**: Site not updating after push
```
Solution:
1. Check GitHub Actions tab for build errors
2. Clear browser cache with hard refresh
3. Verify /docs has latest build files
4. Try incognito/private browsing mode
```

#### Form Submission Issues

**Issue**: Form submission not working
```
Solution:
1. Verify Formspree endpoint in src/App.jsx:
   const FORMSPREE_ENDPOINT = 'https://formspree.io/f/your-form-id'
2. Check Formspree account is set up
3. Test form submission on Formspree dashboard
4. Check browser console for errors
```

**Issue**: Form submits but no email received
```
Solution:
1. Check spam/junk folder
2. Verify email address in Formspree settings
3. Check Formspree submission log
4. Confirm Formspree plan limits not exceeded
```

#### Analytics Issues

**Issue**: Analytics not tracking
```
Solution:
1. Check .env file has correct IDs
2. Rebuild site: npm run build
3. Accept cookie consent on live site
4. Check browser console for errors
5. Verify analytics dashboard shows data (may take 24-48 hours)
6. Test in incognito mode to ensure fresh consent
```

**Issue**: Cookie banner not appearing
```
Solution:
1. Clear localStorage in browser dev tools
2. Refresh page
3. Check CookieBanner.jsx is imported in main.jsx
```

#### Image Issues

**Issue**: Images not displaying
```
Solution:
1. Verify image paths are correct:
   /images/filename.jpg (from public root)
2. Check images exist in /images directory
3. Ensure images are copied to docs/images during build
4. Check image file extensions match exactly
5. Use browser dev tools to see 404 errors
```

**Issue**: Images too large / slow loading
```
Solution:
1. Compress images before adding:
   - Use tinypng.com or similar
   - Target < 200KB per image
2. Consider WebP format for better compression
3. Add loading="lazy" attribute to images
```

### Getting Help

If you encounter issues not covered here:

1. **Check Browser Console**: Look for error messages
2. **Review Git History**: See what changed recently
3. **Check Dependencies**: Run `npm outdated` and `npm audit`
4. **Search GitHub Issues**: Look for similar problems
5. **Create an Issue**: Open a GitHub issue with details:
   - Error message
   - Steps to reproduce
   - Environment (OS, Node version, browser)
   - Screenshots if applicable

### Debug Mode

Enable verbose logging:

```javascript
// In src/analytics.js or src/App.jsx
const DEBUG = true

if (DEBUG) {
  console.log('Debug info:', data)
}
```

## 🤝 Contributing

While this is a personal portfolio, contributions are welcome for:

- Bug fixes
- Performance improvements
- Documentation enhancements
- Accessibility improvements

### How to Contribute

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/improvement`
3. Make your changes
4. Test thoroughly
5. Commit with clear messages: `git commit -m "Add: feature description"`
6. Push to your fork: `git push origin feature/improvement`
7. Open a Pull Request with description of changes

### Code Style

- Use consistent indentation (2 spaces)
- Follow React best practices
- Add comments for complex logic
- Keep components small and focused
- Test in multiple browsers

## 📝 Additional Documentation

- **[README-react-migration.md](./README-react-migration.md)**: Details about the React migration and build process
- **[DEVELOPER.md](./DEVELOPER.md)**: Comprehensive developer guide (to be created)
- **[CUSTOMIZATION.md](./CUSTOMIZATION.md)**: Detailed customization guide (to be created)
- **[ANALYTICS.md](./ANALYTICS.md)**: Analytics setup and privacy guide (to be created)

## 📞 Contact

**Tim Superville**
- **Email**: [tim@timsuperville.dev](mailto:tim@timsuperville.dev)
- **Website**: [timsuperville.github.io](https://timsuperville.github.io)
- **GitHub**: [@timsuperville](https://github.com/timsuperville)
- **LinkedIn**: [linkedin.com/in/timsuperville](https://www.linkedin.com/in/timsuperville)

For freelance inquiries, project collaborations, or questions about this portfolio site, feel free to reach out via the contact form on the website or directly via email.

## 📄 License

© 2025 Tim Superville. All rights reserved.

This portfolio website and its code are proprietary. The code is available for reference and learning purposes. If you wish to use portions of this code for your own portfolio:

1. Give attribution to Tim Superville
2. Do not copy the entire site as-is
3. Customize significantly for your own brand
4. Replace all personal information and images

### Third-Party Licenses

This project uses open-source libraries with their own licenses:
- React: MIT License
- Vite: MIT License
- TailwindCSS: MIT License
- Other dependencies: See package.json

---

**Built with** ❤️ **by Tim Superville | Modern Web Development**

*Last Updated: January 2025*
