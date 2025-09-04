import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles.css'
import { initAnalytics, hasConsent } from './analytics'
import CookieBanner from './CookieBanner'

// Initialize Google Analytics (GA4) if VITE_GA_ID is provided at build time
function initGA() {
  const GA_ID = import.meta.env.VITE_GA_ID
  if (!GA_ID) return
  // gtag.js snippet
  const script1 = document.createElement('script')
  script1.setAttribute('async', '')
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  document.head.appendChild(script1)

  const script2 = document.createElement('script')
  script2.innerHTML = `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${GA_ID}');`;
  document.head.appendChild(script2)
}

// Initialize analytics (GA/Plausible) if not opted out. GA will still be initialized by initGA when VITE_GA_ID exists.
// Initialize GA snippet early (if VITE_GA_ID exists) but only fully init analytics after consent
initGA()

if (hasConsent()) initAnalytics()

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <main id="main-content">
      <App />
      <CookieBanner />
    </main>
  </React.StrictMode>
)
