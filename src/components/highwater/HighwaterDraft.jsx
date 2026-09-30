import React from 'react'
import HighwaterNav from './HighwaterNav'
import HighwaterHero from './HighwaterHero'
import HighwaterJourney from './HighwaterJourney'
import HighwaterSelector from './HighwaterSelector'
import HighwaterAbout from './HighwaterAbout'
import HighwaterServices from './HighwaterServices'
import HighwaterInsuranceFAQ from './HighwaterInsuranceFAQ'
import HighwaterBooking from './HighwaterBooking'
import HighwaterLogo from './HighwaterLogo'

export default function HighwaterDraft() {
  React.useEffect(() => {
    if (window.location.hash && window.location.hash.startsWith('#v2-')) {
      const targetId = window.location.hash.replace('#', '')
      const el = document.getElementById(targetId)
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' })
        }, 150)
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#16333B] font-sans selection:bg-[#BEE0E6] selection:text-[#193F49]">
      {/* Draft Switcher & Navigation Header */}
      <HighwaterNav />

      {/* Main Sanctuary Presentation */}
      <main id="highwater-v2-content">
        <HighwaterHero />
        <HighwaterJourney />
        <HighwaterSelector />
        <HighwaterAbout />
        <HighwaterServices />
        <HighwaterInsuranceFAQ />
        <HighwaterBooking />
      </main>

      {/* Dedicated Sanctuary Footer */}
      <footer className="border-t border-[#E5ECEE] bg-white py-12 text-[#56747D] text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <HighwaterLogo className="w-10 h-10" />
            <div>
              <strong className="block text-[#16333B] text-sm">Highwater Counselling Company</strong>
              <span className="flex flex-wrap items-center gap-x-1.5 text-[11px] sm:text-xs">
                <span>Wembley, Alberta</span>
                <span className="hidden sm:inline" aria-hidden="true">•</span>
                <span>Derek Patten, Founder</span>
              </span>
            </div>
          </div>

          <div className="text-center sm:text-right space-y-1">
            <p>© {new Date().getFullYear()} Highwater Counselling Company. All rights reserved.</p>
            <p className="text-[11px] text-[#7A969E] flex flex-wrap items-center justify-center sm:justify-end gap-x-1.5">
              <span>Private Practice Client Portal</span>
              <span className="hidden sm:inline" aria-hidden="true">•</span>
              <span>Online Scheduling</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
