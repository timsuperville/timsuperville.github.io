/**
 * Application Entry Point
 * 
 * This is the main entry point for the React application. It:
 * 1. Imports React and ReactDOM for rendering
 * 2. Imports the main App component (contains all page sections)
 * 3. Imports global styles
 * 4. Handles analytics initialization (with consent check)
 * 5. Mounts the application to the DOM
 * 6. Renders the cookie consent banner
 * 
 * Privacy-First Analytics:
 * Analytics are only initialized if the user has previously given consent.
 * On first visit, analytics won't load until user accepts the cookie banner.
 * 
 * @module main
 */

import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles.css'
import { initAnalytics, hasConsent } from './analytics'
import CookieBanner from './CookieBanner'

/**
 * Initialize analytics on page load (only if user has given consent)
 * 
 * This checks localStorage for stored consent from a previous visit.
 * If consent exists, analytics scripts (GA4/Plausible) are loaded immediately.
 * If no consent, the CookieBanner component will show and ask for permission.
 * 
 * Privacy Note: Analytics never load without explicit user consent
 */
if (hasConsent()) {
  initAnalytics()
}

/**
 * Mount the React application
 * 
 * Structure:
 * - <main id="main-content"> - Semantic wrapper for accessibility
 *   - <App /> - Main application component with all page sections
 *   - <CookieBanner /> - Consent banner (shows only if needed)
 * 
 * The #root element is defined in the HTML file and serves as the mount point.
 * StrictMode helps identify potential problems during development.
 */
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <main id="main-content">
      <App />
      <CookieBanner />
    </main>
  </React.StrictMode>
)

