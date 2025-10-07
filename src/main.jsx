import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles.css'
import { initAnalytics, hasConsent } from './analytics'
import CookieBanner from './CookieBanner'
// Dev-only event debug UI
let EventDebug = null
if (import.meta.env.DEV) {
  EventDebug = (await import('./EventDebug.jsx')).default
}

// Analytics: consent-first. Only initialize analytics when user has given consent.
if (hasConsent()) {
  initAnalytics()
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <main id="main-content">
      <App />
      {import.meta.env.DEV && EventDebug ? <EventDebug /> : null}
      <CookieBanner />
    </main>
  </React.StrictMode>
)
