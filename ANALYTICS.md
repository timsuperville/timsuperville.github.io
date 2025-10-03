# Analytics & Privacy Guide

> Complete guide to analytics implementation, privacy compliance, and user consent management

## Table of Contents

- [Overview](#overview)
- [Analytics Options](#analytics-options)
- [Privacy-First Approach](#privacy-first-approach)
- [Implementation Details](#implementation-details)
- [Configuration](#configuration)
- [GDPR Compliance](#gdpr-compliance)
- [Cookie Consent](#cookie-consent)
- [Event Tracking](#event-tracking)
- [Testing Analytics](#testing-analytics)
- [Troubleshooting](#troubleshooting)
- [Privacy Policy](#privacy-policy)

## Overview

This portfolio implements a **consent-first, privacy-respecting analytics system** that:

✅ **Respects user privacy**: No tracking without explicit consent  
✅ **GDPR compliant**: Meets European privacy regulations  
✅ **User-controlled**: Easy opt-in/opt-out at any time  
✅ **Transparent**: Clear explanation of what's tracked  
✅ **Flexible**: Supports multiple analytics providers  

### Core Principles

1. **Consent First**: Analytics never load without user approval
2. **Transparency**: Users know exactly what data is collected
3. **Control**: Users can revoke consent anytime
4. **Privacy by Design**: Minimal data collection, no PII
5. **Compliance**: Follows GDPR, CCPA, and privacy best practices

## Analytics Options

### Supported Providers

#### 1. Google Analytics 4 (GA4)

**Pros:**
- ✅ Industry standard with comprehensive features
- ✅ Free for most use cases
- ✅ Deep insights (demographics, behavior flow, conversions)
- ✅ Integration with Google Search Console, Ads
- ✅ Machine learning insights

**Cons:**
- ❌ Privacy concerns (Google's data practices)
- ❌ Requires cookie consent for GDPR
- ❌ Complex setup and learning curve
- ❌ Can slow page load slightly

**Best For:**
- Comprehensive analytics needs
- Integration with Google ecosystem
- Large-scale tracking and analysis

#### 2. Plausible Analytics

**Pros:**
- ✅ Privacy-focused (no cookies, no personal data)
- ✅ GDPR, CCPA compliant by default
- ✅ Lightweight script (< 1KB)
- ✅ Simple, beautiful dashboard
- ✅ No cookie banner needed (but we still provide one)
- ✅ Open-source option available

**Cons:**
- ❌ Paid service ($9/month for 10k pageviews)
- ❌ Limited features compared to GA4
- ❌ No user-level tracking (by design)

**Best For:**
- Privacy-conscious users
- Simple pageview analytics
- Minimalist approach
- European websites

#### 3. Both (Recommended)

Use both for the best of both worlds:
- **Plausible**: Primary analytics (simple, privacy-focused)
- **GA4**: Detailed insights when needed

## Privacy-First Approach

### How It Works

```
┌──────────────────────────────────────────────────────┐
│                   User Visits Site                   │
└────────────────────┬─────────────────────────────────┘
                     │
                     ▼
           ┌─────────────────────┐
           │  Has Consent Stored? │
           │  (localStorage)      │
           └─────────┬────────────┘
                     │
         ┌───────────┴───────────┐
         │                       │
        YES                     NO
         │                       │
         ▼                       ▼
┌────────────────┐    ┌──────────────────────┐
│ Load Analytics │    │ Show Cookie Banner   │
│ (GA4/Plausible)│    │ "Accept" / "Decline" │
└────────────────┘    └──────────┬───────────┘
                                 │
                     ┌───────────┴──────────┐
                     │                      │
                 ACCEPT                 DECLINE
                     │                      │
                     ▼                      ▼
            ┌────────────────┐    ┌─────────────────┐
            │ Store Consent  │    │ Store Rejection │
            │ Load Analytics │    │ No Analytics    │
            └────────────────┘    └─────────────────┘
```

### Data Collection Philosophy

**What We Track:**
- ✅ Page views (anonymous)
- ✅ Session duration
- ✅ Geographic location (country/city level)
- ✅ Device type (mobile/desktop/tablet)
- ✅ Browser and OS
- ✅ Traffic source (where users came from)
- ✅ Custom events (form submissions, button clicks)

**What We DON'T Track:**
- ❌ Personal information (names, emails)
- ❌ Form input content
- ❌ Keystrokes or mouse movements
- ❌ Passwords or sensitive data
- ❌ Cross-site tracking
- ❌ Individual user identification (with Plausible)

## Implementation Details

### File Structure

```
src/
├── analytics.js         # Core analytics module
├── CookieBanner.jsx     # Consent UI component
└── main.jsx             # Initialization logic
```

### Analytics Module (`src/analytics.js`)

**Core functions:**

```javascript
// Check if user has given consent
export function hasConsent() {
  return localStorage.getItem('analytics_consent') === 'true'
}

// Initialize analytics (called after consent)
export function initAnalytics() {
  // Load GA4 if configured
  if (import.meta.env.VITE_GA_ID) {
    loadGoogleAnalytics(import.meta.env.VITE_GA_ID)
  }
  
  // Load Plausible if configured
  if (import.meta.env.VITE_PLAUSIBLE_DOMAIN) {
    loadPlausible(import.meta.env.VITE_PLAUSIBLE_DOMAIN)
  }
}

// Track custom events
export function trackEvent(eventName, params = {}) {
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

// User opts in
export function optIn() {
  localStorage.setItem('analytics_consent', 'true')
}

// User opts out
export function optOut() {
  localStorage.removeItem('analytics_consent')
  // Clear existing analytics cookies/data
}
```

### Google Analytics 4 Implementation

**Script injection:**

```javascript
function loadGoogleAnalytics(measurementId) {
  // Inject gtag.js script
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
  document.head.appendChild(script)
  
  // Initialize dataLayer
  window.dataLayer = window.dataLayer || []
  window.gtag = function() { dataLayer.push(arguments) }
  
  gtag('js', new Date())
  gtag('config', measurementId, {
    anonymize_ip: true,  // Anonymize IP addresses
    cookie_flags: 'SameSite=None;Secure'
  })
}
```

**Key settings:**
- `anonymize_ip: true` - Removes last octet of IP address
- `cookie_flags` - Secure cookies (HTTPS only)

### Plausible Implementation

**Script injection:**

```javascript
function loadPlausible(domain) {
  const script = document.createElement('script')
  script.defer = true
  script.src = 'https://plausible.io/js/script.js'
  script.setAttribute('data-domain', domain)
  document.head.appendChild(script)
}
```

**Benefits:**
- No cookies (doesn't require consent technically, but we ask anyway)
- < 1KB script size
- Fast loading
- Privacy-compliant by default

### Cookie Banner Component

**Location**: `src/CookieBanner.jsx`

```javascript
import React from 'react'
import { hasConsent, optIn, optOut, initAnalytics } from './analytics'

export default function CookieBanner() {
  const [visible, setVisible] = React.useState(!hasConsent())
  
  if (!visible) return null
  
  const handleAccept = () => {
    optIn()
    initAnalytics()
    setVisible(false)
  }
  
  const handleDecline = () => {
    optOut()
    setVisible(false)
  }
  
  return (
    <div className="cookie-banner">
      <div className="container">
        <div className="banner-content">
          <div>
            <strong>We use cookies</strong>
            <p>
              I use analytics to improve the site experience. 
              Your data is anonymous and never sold. 
              Accept to enable analytics (GA4/Plausible).
            </p>
          </div>
          <div className="banner-actions">
            <button className="btn" onClick={handleDecline}>
              Decline
            </button>
            <button className="btn primary" onClick={handleAccept}>
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
```

**Styling** (`src/styles.css`):

```css
.cookie-banner {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  box-shadow: 0 -4px 6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem 0;
  z-index: 1000;
}

.banner-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}

.banner-actions {
  display: flex;
  gap: 1rem;
  flex-shrink: 0;
}

@media (max-width: 768px) {
  .banner-content {
    flex-direction: column;
    text-align: center;
  }
}
```

## Configuration

### Environment Variables

**Create `.env` file** (copy from `.env.example`):

```env
# Google Analytics 4
# Create at: https://analytics.google.com
# Format: G-XXXXXXXXXX
VITE_GA_ID=

# Plausible Analytics
# Sign up at: https://plausible.io
# Use your domain name
VITE_PLAUSIBLE_DOMAIN=
```

**Important notes:**
- Variables MUST start with `VITE_` to be accessible in browser
- Values are embedded in build at compile time
- Never commit `.env` to version control
- Use different values for dev/production if needed

### Google Analytics Setup

1. **Create GA4 Property**:
   - Go to [Google Analytics](https://analytics.google.com)
   - Create account (if new)
   - Click "Admin" → "Create Property"
   - Property name: "Your Name Portfolio"
   - Time zone: Your timezone
   - Currency: Your currency

2. **Get Measurement ID**:
   - Admin → Data Streams
   - Click "Add stream" → "Web"
   - Website URL: `https://yoursite.github.io`
   - Stream name: "Portfolio Website"
   - Copy Measurement ID (format: `G-XXXXXXXXXX`)

3. **Add to `.env`**:
   ```env
   VITE_GA_ID=G-XXXXXXXXXX
   ```

4. **Configure Settings** (optional):
   - Data retention: 14 months (default)
   - IP anonymization: Enabled
   - Signals: Disabled (for privacy)

5. **Rebuild site**:
   ```bash
   npm run build
   ```

### Plausible Setup

1. **Create Account**:
   - Go to [Plausible.io](https://plausible.io)
   - Sign up (30-day free trial)
   - Plans start at $9/month (10k pageviews)

2. **Add Website**:
   - Dashboard → "Add website"
   - Domain: `yoursite.github.io`
   - Timezone: Your timezone

3. **Add to `.env`**:
   ```env
   VITE_PLAUSIBLE_DOMAIN=yoursite.github.io
   ```

4. **Rebuild site**:
   ```bash
   npm run build
   ```

5. **Verify Installation**:
   - Visit your site
   - Accept cookies
   - Check Plausible dashboard (updates in real-time)

### Using Both Analytics

**Recommended setup:**

```env
# Both providers enabled
VITE_GA_ID=G-XXXXXXXXXX
VITE_PLAUSIBLE_DOMAIN=yoursite.github.io
```

**Benefits:**
- Plausible for quick, privacy-friendly overview
- GA4 for detailed analysis when needed
- Redundancy if one service has issues

**Cost:**
- GA4: Free
- Plausible: $9-$19/month (worth it for privacy)

## GDPR Compliance

### Requirements

**GDPR mandates:**
1. ✅ **Consent before tracking**: Must ask before loading analytics
2. ✅ **Clear information**: Explain what data is collected
3. ✅ **Easy opt-out**: Allow users to withdraw consent
4. ✅ **Data minimization**: Collect only necessary data
5. ✅ **User rights**: Provide access to data (though analytics are anonymous)

**How we comply:**

| Requirement | Implementation |
|-------------|----------------|
| Consent before tracking | Cookie banner, analytics only load after acceptance |
| Clear information | Banner explains analytics purpose |
| Easy opt-out | Decline button, toggle in footer |
| Data minimization | Anonymous IPs, no PII collected |
| User rights | Analytics data is anonymous, no user-specific data stored |

### CCPA Compliance

**California Consumer Privacy Act:**

While less strict than GDPR, we comply by:
- ✅ Disclosing data collection practices
- ✅ Providing opt-out mechanism
- ✅ Not selling user data (we don't collect any to sell)

### Other Regulations

Our privacy-first approach complies with:
- ✅ ePrivacy Directive (EU)
- ✅ PIPEDA (Canada)
- ✅ LGPD (Brazil)
- ✅ POPIA (South Africa)

## Cookie Consent

### LocalStorage vs Cookies

**We use LocalStorage** for consent management:

**Pros:**
- ✅ Not sent with every HTTP request (no performance impact)
- ✅ Persists across sessions
- ✅ Simple API
- ✅ More storage space (if needed)

**Cons:**
- ❌ Not accessible across subdomains (not an issue for this use case)

**Storage key:**
```javascript
localStorage.getItem('analytics_consent')  // 'true' or null
```

### Consent Lifecycle

**First Visit:**
1. User visits site
2. Check localStorage for consent
3. Not found → Show banner
4. User accepts/declines
5. Store choice in localStorage
6. Initialize analytics (if accepted)

**Return Visit:**
1. User visits site
2. Check localStorage for consent
3. Found 'true' → Initialize analytics immediately
4. Found null/undefined → Show banner again

**Changing Mind:**
- Footer toggle allows changing preference anytime
- Clears/sets localStorage
- Reinitializes or removes analytics

### Consent Expiration

**Current implementation**: Consent never expires

**To add expiration** (optional):

```javascript
// Store with timestamp
export function optIn() {
  const consent = {
    accepted: true,
    timestamp: Date.now()
  }
  localStorage.setItem('analytics_consent', JSON.stringify(consent))
}

// Check if expired (e.g., after 1 year)
export function hasConsent() {
  const stored = localStorage.getItem('analytics_consent')
  if (!stored) return false
  
  const consent = JSON.parse(stored)
  const oneYear = 365 * 24 * 60 * 60 * 1000
  
  if (Date.now() - consent.timestamp > oneYear) {
    // Expired, ask again
    localStorage.removeItem('analytics_consent')
    return false
  }
  
  return consent.accepted === true
}
```

## Event Tracking

### Custom Events

**Track user interactions:**

```javascript
import { trackEvent } from './analytics'

// Track button click
<button onClick={() => {
  trackEvent('button_click', {
    button_name: 'Download Resume',
    location: 'hero_section'
  })
  // Handle button action
}}>
  Download Resume
</button>

// Track link click
<a href="#contact" onClick={() => {
  trackEvent('navigation_click', { section: 'contact' })
}}>
  Contact
</a>

// Track form submission
const handleSubmit = async (e) => {
  e.preventDefault()
  
  try {
    await submitForm(data)
    trackEvent('contact_submit', {
      result: 'success',
      project_type: formData.projectType
    })
  } catch (error) {
    trackEvent('contact_submit', {
      result: 'error',
      error: error.message
    })
  }
}
```

### Recommended Events

**Navigation:**
```javascript
trackEvent('nav_click', { destination: 'portfolio' })
trackEvent('scroll_to_section', { section: 'about' })
```

**Engagement:**
```javascript
trackEvent('cta_click', { cta_text: 'Hire Me', location: 'hero' })
trackEvent('social_link_click', { platform: 'github' })
trackEvent('project_view', { project_name: 'E-commerce Platform' })
```

**Forms:**
```javascript
trackEvent('form_start', { form_name: 'contact' })
trackEvent('form_submit', { form_name: 'contact', result: 'success' })
trackEvent('form_error', { form_name: 'contact', error: 'invalid_email' })
```

**Errors:**
```javascript
trackEvent('page_error', { error: '404', path: window.location.pathname })
trackEvent('api_error', { endpoint: '/api/submit', status: 500 })
```

### Event Naming Conventions

**Best practices:**
- Use lowercase with underscores: `button_click`
- Be descriptive: `download_resume` not `click1`
- Use consistent categories: `form_*`, `nav_*`, `cta_*`
- Include context in parameters

**Parameters:**
- Keep parameter names consistent
- Use strings or numbers only
- Avoid PII in parameters
- Limit to relevant data

## Testing Analytics

### Development Testing

**With dev server:**

1. **Start dev server:**
   ```bash
   npm run dev
   ```

2. **Add temporary console logs**:
   ```javascript
   export function trackEvent(eventName, params) {
     console.log('Track:', eventName, params)  // Add this
     
     if (!hasConsent()) return
     // ... rest of function
   }
   ```

3. **Test in browser:**
   - Accept cookies
   - Trigger events
   - Check console for logs

4. **Remove console logs** before committing

### Production Testing

**After deployment:**

1. **Clear analytics consent:**
   - Open DevTools → Application → Local Storage
   - Delete `analytics_consent` key
   - Refresh page

2. **Accept cookies:**
   - Should see cookie banner
   - Click "Accept"
   - Verify banner disappears

3. **Check analytics loading:**
   - DevTools → Network tab
   - Look for:
     - `gtag/js` (Google Analytics)
     - `script.js` (Plausible)
   - Should load after consent

4. **Trigger test events:**
   - Submit contact form
   - Click navigation links
   - Interact with CTAs

5. **Verify in dashboards:**
   - **GA4**: Real-time report (may take 1-2 minutes)
   - **Plausible**: Real-time (instant)

### Debugging

**Common issues:**

**Analytics not loading:**
```javascript
// Add to analytics.js
console.log('GA ID:', import.meta.env.VITE_GA_ID)
console.log('Plausible Domain:', import.meta.env.VITE_PLAUSIBLE_DOMAIN)
console.log('Has consent:', hasConsent())
```

**Events not tracking:**
```javascript
// Add to trackEvent
export function trackEvent(eventName, params) {
  console.log('Tracking:', eventName, params)
  console.log('Has consent:', hasConsent())
  console.log('GA available:', !!window.gtag)
  console.log('Plausible available:', !!window.plausible)
  // ... rest of function
}
```

**Check for errors:**
- Browser console for JavaScript errors
- Network tab for failed requests
- Verify env vars are set correctly

## Troubleshooting

### Analytics Not Tracking

**Issue**: No data in analytics dashboard

**Checklist:**
- [ ] Environment variables set correctly in `.env`
- [ ] Site rebuilt after adding env vars (`npm run build`)
- [ ] Cookie consent accepted on site
- [ ] Analytics scripts loading (check Network tab)
- [ ] No JavaScript errors in console
- [ ] Ad blocker disabled (can block analytics)
- [ ] Waiting long enough (GA4 can take 24-48 hours initially)

**Debug:**
```javascript
// Temporarily add to src/analytics.js
export function initAnalytics() {
  console.log('Initializing analytics...')
  console.log('GA ID:', import.meta.env.VITE_GA_ID)
  console.log('Plausible:', import.meta.env.VITE_PLAUSIBLE_DOMAIN)
  
  if (import.meta.env.VITE_GA_ID) {
    console.log('Loading GA4...')
    loadGoogleAnalytics(import.meta.env.VITE_GA_ID)
  }
  
  if (import.meta.env.VITE_PLAUSIBLE_DOMAIN) {
    console.log('Loading Plausible...')
    loadPlausible(import.meta.env.VITE_PLAUSIBLE_DOMAIN)
  }
}
```

### Cookie Banner Not Appearing

**Issue**: Banner doesn't show up

**Checklist:**
- [ ] `CookieBanner` component imported in `src/main.jsx`
- [ ] LocalStorage clear (no consent stored)
- [ ] CSS for banner is present
- [ ] No z-index conflicts

**Fix:**
```javascript
// Force banner to show (for testing)
localStorage.removeItem('analytics_consent')
// Refresh page
```

### Events Not Tracking

**Issue**: Custom events not appearing in dashboard

**Checklist:**
- [ ] `trackEvent` called with correct parameters
- [ ] User has given consent
- [ ] Analytics initialized
- [ ] No typos in event names

**Debug:**
```javascript
// Add temporary logging
import { trackEvent } from './analytics'

const handleClick = () => {
  console.log('Button clicked')
  trackEvent('button_click', { button: 'test' })
  console.log('Event tracked')
}
```

## Privacy Policy

### Required Disclosures

If using analytics, your privacy policy should include:

**1. What data is collected:**
- Pageviews and sessions
- Device type and browser
- Geographic location (country/city)
- Traffic sources
- Anonymous usage patterns

**2. How it's used:**
- Understand site usage
- Improve user experience
- Identify popular content
- Fix technical issues

**3. Third parties:**
- Google Analytics (if using GA4)
- Plausible Analytics (if using)

**4. User rights:**
- Opt-out mechanism (cookie banner)
- No personal data collected
- Cannot identify individual users

**5. Data retention:**
- GA4: 14 months (configurable)
- Plausible: Indefinitely (aggregated)

**6. Contact:**
- Your email for privacy questions

### Sample Privacy Policy Section

```markdown
## Analytics & Cookies

### What We Collect

This website uses analytics to understand how visitors use the site. 
We collect:

- Pages visited
- Time spent on site
- Device type (mobile, tablet, desktop)
- Geographic location (country/city level)
- Browser and operating system
- How you arrived at the site (search, direct, referral)

### How We Use This Data

Analytics help us:
- Understand which content is most valuable
- Improve site performance and usability
- Identify and fix technical issues

### Your Privacy

- **No personal information**: We don't collect names, emails, or any personally identifiable information
- **Anonymous data**: Analytics data cannot be used to identify you
- **No tracking without consent**: Analytics only load if you accept cookies
- **Easy opt-out**: You can decline or revoke consent at any time

### Analytics Providers

We use:
- **Google Analytics 4**: Industry-standard analytics (with IP anonymization)
- **Plausible Analytics**: Privacy-focused, GDPR-compliant analytics

### Your Rights

You have the right to:
- Decline analytics (click "Decline" on cookie banner)
- Revoke consent (toggle in site footer)
- Request information about data collected (though it's anonymous)

### Contact

For privacy questions: [your-email@example.com](mailto:your-email@example.com)

### Changes

This privacy policy may be updated. Last updated: [Date]
```

## Summary

**Quick Reference:**

✅ **Setup**: Add analytics IDs to `.env`, rebuild, deploy  
✅ **Privacy**: Users must accept cookies before tracking  
✅ **Control**: Users can opt-out anytime via footer toggle  
✅ **Compliance**: GDPR, CCPA compliant by design  
✅ **Testing**: Clear localStorage, accept cookies, verify in dashboard  

**Best Practices:**

1. Always ask for consent before tracking
2. Be transparent about data collection
3. Minimize data collection
4. Provide easy opt-out
5. Respect user privacy choices
6. Test analytics in production
7. Review privacy policy regularly

---

**Questions?** Refer to the main [README.md](./README.md) for more information.

---

**Last Updated**: January 2025  
**Maintained by**: Tim Superville
