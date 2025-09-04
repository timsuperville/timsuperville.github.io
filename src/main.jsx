import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles.css'

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

initGA()

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <main id="main-content">
      <App />
    </main>
  </React.StrictMode>
)
