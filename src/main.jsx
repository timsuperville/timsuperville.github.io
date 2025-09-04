import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles.css'
import { initAnalytics, hasConsent } from './analytics'
import CookieBanner from './CookieBanner'

// Analytics: consent-first. Only initialize analytics when user has given consent.
if (hasConsent()) {
  initAnalytics()
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <main id="main-content">
      <App />
      <CookieBanner />
    </main>
  </React.StrictMode>
)
