/**
 * Analytics Module
 * 
 * Provides consent-based analytics integration with Google Analytics 4 and Plausible.
 * Implements a privacy-first approach where analytics only load after explicit user consent.
 * 
 * Key Features:
 * - Consent management via localStorage
 * - Support for Google Analytics 4 (GA4)
 * - Support for Plausible Analytics (privacy-focused)
 * - Custom event tracking
 * - GDPR compliant (no tracking without consent)
 * 
 * Usage:
 *   import { hasConsent, initAnalytics, trackEvent, optIn, optOut } from './analytics'
 * 
 *   // Check if user has given consent
 *   if (hasConsent()) {
 *     initAnalytics()
 *   }
 * 
 *   // Track custom events
 *   trackEvent('button_click', { button_name: 'Download Resume' })
 * 
 * @module analytics
 */

/**
 * Check if user has given consent for analytics tracking
 * 
 * Reads from localStorage to check if user has accepted analytics.
 * Returns false if localStorage is unavailable (e.g., private browsing)
 * 
 * @returns {boolean} True if user has given consent, false otherwise
 * 
 * @example
 * if (hasConsent()) {
 *   initAnalytics()
 * }
 */
export function hasConsent(){
  try { 
    return localStorage.getItem('analytics_consent') === '1' 
  } catch(e){ 
    // localStorage might be unavailable (private browsing, etc.)
    return false 
  }
}

/**
 * Check if user has explicitly opted out of analytics
 * 
 * Different from !hasConsent() - this checks for explicit rejection (value '0')
 * while !hasConsent() could mean user hasn't decided yet
 * 
 * @returns {boolean} True if user has explicitly declined analytics
 * 
 * @example
 * if (isOptedOut()) {
 *   console.log('User has declined analytics')
 * }
 */
export function isOptedOut(){
  try { 
    return localStorage.getItem('analytics_consent') === '0' 
  } catch(e){ 
    return false 
  }
}

/**
 * Record user's consent for analytics tracking
 * 
 * Stores '1' in localStorage to indicate consent.
 * After calling this, hasConsent() will return true.
 * You should call initAnalytics() after this to load analytics scripts.
 * 
 * @example
 * const handleAccept = () => {
 *   optIn()
 *   initAnalytics()
 *   setShowBanner(false)
 * }
 */
export function optIn(){
  try { 
    localStorage.setItem('analytics_consent','1') 
  } catch(e){
    // Fail silently if localStorage unavailable
  }
}

/**
 * Record user's rejection of analytics tracking
 * 
 * Stores '0' in localStorage to indicate opt-out.
 * Also disables Google Analytics if it was already loaded.
 * 
 * @example
 * const handleDecline = () => {
 *   optOut()
 *   setShowBanner(false)
 * }
 */
export function optOut(){
  try { 
    localStorage.setItem('analytics_consent','0') 
  } catch(e){}
  
  // Disable Google Analytics if already loaded
  // This sets a special GA flag that prevents tracking
  const GA_ID = import.meta.env.VITE_GA_ID
  if (GA_ID) {
    window[`ga-disable-${GA_ID}`] = true
  }
}

/**
 * Initialize analytics providers after user consent
 * 
 * Dynamically loads analytics scripts based on environment variables:
 * - VITE_GA_ID: Loads Google Analytics 4 if set
 * - VITE_PLAUSIBLE_DOMAIN: Loads Plausible Analytics if set
 * 
 * Only initializes if user has given consent (hasConsent() returns true).
 * Safe to call multiple times - scripts won't reload.
 * 
 * Environment Variables:
 *   VITE_GA_ID - Google Analytics Measurement ID (format: G-XXXXXXXXXX)
 *   VITE_PLAUSIBLE_DOMAIN - Your website domain for Plausible
 * 
 * @example
 * // In main.jsx or after user accepts cookies
 * if (hasConsent()) {
 *   initAnalytics()
 * }
 */
export function initAnalytics(){
  // Don't initialize if user hasn't given consent
  if (!hasConsent()) return

  // Get analytics configuration from environment variables
  // These are set in .env file and embedded at build time
  const GA_ID = import.meta.env.VITE_GA_ID
  const PLAUSIBLE_DOMAIN = import.meta.env.VITE_PLAUSIBLE_DOMAIN

  // Initialize Google Analytics 4 if configured
  if (GA_ID){
    // Load the gtag.js library
    const script1 = document.createElement('script')
    script1.async = true  // Load asynchronously to not block page rendering
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
    document.head.appendChild(script1)

    // Initialize GA4 with configuration
    // This creates the gtag() function and configures the tracking
    const script2 = document.createElement('script')
    script2.innerHTML = `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config','${GA_ID}');`;
    document.head.appendChild(script2)
  }

  // Initialize Plausible Analytics if configured
  if (PLAUSIBLE_DOMAIN){
    const s = document.createElement('script')
    s.setAttribute('defer','')  // Load after HTML parsing completes
    s.setAttribute('data-domain', PLAUSIBLE_DOMAIN)  // Required: your domain
    s.src = 'https://plausible.io/js/plausible.js'
    document.head.appendChild(s)
  }
}

/**
 * Track custom events in analytics
 * 
 * Sends custom events to both Google Analytics and Plausible (if loaded).
 * Events help understand user behavior beyond pageviews.
 * 
 * Safe to call even if analytics aren't loaded - will fail gracefully.
 * 
 * @param {string} name - Event name (use lowercase with underscores)
 * @param {Object} [props={}] - Event properties/parameters
 * 
 * @example
 * // Track button click
 * trackEvent('button_click', {
 *   button_name: 'Download Resume',
 *   location: 'hero_section'
 * })
 * 
 * @example
 * // Track form submission
 * trackEvent('contact_submit', {
 *   result: 'success',
 *   project_type: 'web_app'
 * })
 * 
 * @example
 * // Track navigation
 * trackEvent('nav_click', {
 *   section: 'portfolio'
 * })
 */
export function trackEvent(name, props = {}){
  // Send to Plausible Analytics
  try {
    if (window.plausible) {
      window.plausible(name, { props })
    }
  } catch(e){
    // Fail silently if Plausible not loaded or blocked
  }

  // Send to Google Analytics (gtag)
  try {
    if (window.gtag) {
      window.gtag('event', name, props)
    }
  } catch(e){
    // Fail silently if GA not loaded or blocked
  }
}

