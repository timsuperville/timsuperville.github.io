import React from 'react'
import { hasConsent, optIn, optOut, initAnalytics } from './analytics'

export default function CookieBanner(){
  const [visible, setVisible] = React.useState(!hasConsent())

  if (!visible) return null

  return (
    <div className="cookie-banner">
      <div className="container">
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
          <div>
            <strong>We use cookies</strong>
            <p style={{margin:0}}>I use analytics to improve the site. Accept to enable analytics (GA/Plausible).</p>
          </div>
          <div>
            <button className="btn" onClick={() => { optOut(); setVisible(false); }}>Decline</button>
            <button className="btn primary" style={{marginLeft:8}} onClick={() => { optIn(); initAnalytics(); setVisible(false); }}>Accept</button>
          </div>
        </div>
      </div>
    </div>
  )
}
