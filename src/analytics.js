// Lightweight analytics initializer supporting GA4 and Plausible with opt-out
export function isOptedOut(){
  try { return localStorage.getItem('analytics_opt_out') === '1' } catch(e){ return false }
}
export function optOut(){
  try { localStorage.setItem('analytics_opt_out','1') } catch(e){}
  // Set GA disable flag if GA id present
  const GA_ID = import.meta.env.VITE_GA_ID
  if (GA_ID) window[`ga-disable-${GA_ID}`] = true
  // reload to ensure scripts don't run (optional UX)
  window.location.reload()
}
export function optIn(){
  try { localStorage.removeItem('analytics_opt_out') } catch(e){}
  const GA_ID = import.meta.env.VITE_GA_ID
  if (GA_ID) delete window[`ga-disable-${GA_ID}`]
  window.location.reload()
}

export function initAnalytics(){
  if (isOptedOut()) return

  const GA_ID = import.meta.env.VITE_GA_ID
  const PLAUSIBLE_DOMAIN = import.meta.env.VITE_PLAUSIBLE_DOMAIN

  if (GA_ID){
    // Load GA4 gtag.js
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
