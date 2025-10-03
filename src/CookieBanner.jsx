/**
 * Cookie Consent Banner Component
 * 
 * Displays a consent banner asking users to accept or decline analytics tracking.
 * Implements GDPR-compliant, opt-in analytics where no tracking occurs without
 * explicit user consent.
 * 
 * Features:
 * - Shows only if user hasn't made a choice (no consent stored)
 * - Accept button: Stores consent, initializes analytics, hides banner
 * - Decline button: Stores rejection, no analytics, hides banner
 * - User choice persists across sessions via localStorage
 * 
 * The banner is fixed to the bottom of the page and disappears after user makes a choice.
 * Users can change their preference later via the footer toggle.
 * 
 * @component
 * @example
 * // In main.jsx
 * import CookieBanner from './CookieBanner'
 * 
 * createRoot(document.getElementById('root')).render(
 *   <>
 *     <App />
 *     <CookieBanner />
 *   </>
 * )
 */

import React from 'react'
import { hasConsent, optIn, optOut, initAnalytics } from './analytics'

export default function CookieBanner(){
  /**
   * Track banner visibility state
   * 
   * Initial state: Show banner if user hasn't given consent
   * - !hasConsent() means no stored consent, so show banner
   * - If consent exists, banner is hidden from the start
   */
  const [visible, setVisible] = React.useState(!hasConsent())

  /**
   * Don't render anything if banner should be hidden
   * This happens when:
   * - User has already made a choice (consent stored in localStorage)
   * - User just clicked Accept or Decline (visible set to false)
   */
  if (!visible) return null

  /**
   * Handle user declining analytics
   * 
   * Workflow:
   * 1. Call optOut() - Stores '0' in localStorage, disables GA if loaded
   * 2. Hide banner - User won't see it again until they clear localStorage
   * 
   * Result: No analytics will be initialized for this user
   */
  const handleDecline = () => {
    optOut()
    setVisible(false)
  }

  /**
   * Handle user accepting analytics
   * 
   * Workflow:
   * 1. Call optIn() - Stores '1' in localStorage
   * 2. Call initAnalytics() - Loads GA4 and/or Plausible scripts
   * 3. Hide banner - User won't see it again
   * 
   * Result: Analytics scripts load and begin tracking
   */
  const handleAccept = () => {
    optIn()
    initAnalytics()  // Load analytics immediately after consent
    setVisible(false)
  }

  return (
    <div className="cookie-banner">
      <div className="container">
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
          {/* Banner message explaining what analytics do */}
          <div>
            <strong>We use cookies</strong>
            <p style={{margin:0}}>
              I use analytics to improve the site. Accept to enable analytics (GA/Plausible).
            </p>
          </div>

          {/* Action buttons: Decline or Accept */}
          <div>
            <button 
              className="btn" 
              onClick={handleDecline}
              aria-label="Decline analytics"
            >
              Decline
            </button>
            <button 
              className="btn primary" 
              style={{marginLeft:8}} 
              onClick={handleAccept}
              aria-label="Accept analytics"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

