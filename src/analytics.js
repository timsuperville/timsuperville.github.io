
// Consent-based analytics helper
export function hasConsent(){
  try { return localStorage.getItem('analytics_consent') === '1' } catch(e){ return false }
}

export function isOptedOut(){
  try { return localStorage.getItem('analytics_consent') === '0' } catch(e){ return false }
}

export function optIn(){
  try { localStorage.setItem('analytics_consent','1') } catch(e){}
}

export function optOut(){
  try { localStorage.setItem('analytics_consent','0') } catch(e){}
  const GA_ID = import.meta.env.VITE_GA_ID
  if (GA_ID) window[`ga-disable-${GA_ID}`] = true
}

export function initAnalytics(){
  if (!hasConsent()) return

  const GA_ID = import.meta.env.VITE_GA_ID
  const PLAUSIBLE_DOMAIN = import.meta.env.VITE_PLAUSIBLE_DOMAIN

  if (GA_ID){
    const script1 = document.createElement('script')
    script1.async = true
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
    document.head.appendChild(script1)

    const script2 = document.createElement('script')
    script2.innerHTML = `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config','${GA_ID}');`;
    document.head.appendChild(script2)
  }

  if (PLAUSIBLE_DOMAIN){
    const s = document.createElement('script')
    s.setAttribute('defer','')
    s.setAttribute('data-domain', PLAUSIBLE_DOMAIN)
    s.src = 'https://plausible.io/js/plausible.js'
    document.head.appendChild(s)
  }
}

export function trackEvent(name, props = {}){
  // DEV: capture events to window for local debugging
  try {
    if (import.meta.env.DEV) {
      window.__analyticsCalls = window.__analyticsCalls || []
      window.__analyticsCalls.push({ name, props, ts: Date.now() })
    }
  } catch(e){}
  // Plausible
  try {
    if (window.plausible) {
      window.plausible(name, { props })
    }
  } catch(e){}

  // GA (gtag)
  try {
    if (window.gtag) {
      window.gtag('event', name, props)
    }
  } catch(e){}
}
