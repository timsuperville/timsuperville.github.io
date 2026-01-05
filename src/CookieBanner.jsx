import { useState } from 'react'
import { optIn, optOut, initAnalytics } from './analytics'
import { X, Cookie } from 'lucide-react'

export default function CookieBanner() {
  // Show banner only when the user hasn't made a choice (null)
  const [visible, setVisible] = useState(() => localStorage.getItem('analytics_consent') === null)

  if (!visible) return null

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-lg z-50 animate-in slide-in-from-bottom-4 duration-500">
      <div className="glass-card p-5 border border-primary/20 bg-dark-950/90 backdrop-blur-xl">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-primary/10 rounded-lg shrink-0">
            <Cookie className="w-6 h-6 text-primary-glow" />
          </div>
          <div>
            <h4 className="font-bold text-white mb-1">Cookie Preferences</h4>
            <p className="text-sm text-slate-400 mb-4 leading-relaxed">
              I use simple analytics to see how the site is performing. No personal data is tracked.
            </p>
            <div className="flex gap-3">
              <button
                className="btn-primary text-sm px-4 py-2"
                onClick={() => { optIn(); initAnalytics(); setVisible(false); }}
              >
                Accept
              </button>
              <button
                className="px-4 py-2 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                onClick={() => { optOut(); setVisible(false); }}
              >
                Decline
              </button>
            </div>
          </div>
          <button
            onClick={() => { optOut(); setVisible(false); }}
            className="text-slate-500 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
