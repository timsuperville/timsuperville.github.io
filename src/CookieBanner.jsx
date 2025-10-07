import React from 'react'
import { hasConsent, optIn, optOut, initAnalytics } from './analytics'

export default function CookieBanner(){
  // Show banner only when the user hasn't made a choice (null)
  const [visible, setVisible] = React.useState(() => localStorage.getItem('analytics_consent') === null)

  if (!visible) return null

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white border rounded shadow p-4 max-w-2xl w-full mx-4 z-40">
      <div className="flex items-center justify-between gap-4">
        <div>
          <strong className="block">We use cookies</strong>
          <p className="text-sm text-gray-600">I use analytics to improve the site. Accept to enable analytics (GA/Plausible).</p>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1 border rounded text-sm" onClick={() => { optOut(); setVisible(false); }}>Decline</button>
          <button className="px-3 py-1 bg-sky-600 text-white rounded text-sm" onClick={() => { optIn(); initAnalytics(); setVisible(false); }}>Accept</button>
        </div>
      </div>
    </div>
  )
}
