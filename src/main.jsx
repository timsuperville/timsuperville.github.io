import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles.css'
import { initAnalytics, hasConsent } from './analytics'
import CookieBanner from './CookieBanner'
// Dev-only event debug UI
let EventDebug = null
// Dynamically import the debug overlay only when running the dev server
if (import.meta.env.DEV && typeof window !== 'undefined') {
  import('./EventDebug.jsx').then(mod => {
    EventDebug = mod.default
    // If the app already mounted, force a re-render by appending the debug node via a small helper
    const root = document.getElementById('root')
    if (root && root._reactRootContainer) {
      // Trigger a tiny re-render by dispatching a custom event the app can listen for (App doesn't currently do this),
      // but we can also append the debug overlay directly to body here as a fallback.
      const node = document.createElement('div')
      node.id = 'event-debug-mount'
      document.body.appendChild(node)
      // Render debug overlay directly into this node
      try {
        import('react-dom/client').then(({ createRoot }) => {
          createRoot(node).render(React.createElement(EventDebug))
        }).catch(()=>{})
      } catch (e) {
        // If dynamic rendering fails, ignore — dev overlay is non-critical
        console.warn('EventDebug mount skipped', e)
      }
    }
  }).catch(()=>{})
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
