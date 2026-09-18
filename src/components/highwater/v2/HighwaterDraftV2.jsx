import React from 'react'
import HighwaterV2Nav from './HighwaterV2Nav'
import HighwaterV2Hero from './HighwaterV2Hero'
import HighwaterV2Journey from './HighwaterV2Journey'
import HighwaterV2Selector from './HighwaterV2Selector'
import HighwaterV2About from './HighwaterV2About'
import HighwaterV2Services from './HighwaterV2Services'
import HighwaterV2InsuranceFAQ from './HighwaterV2InsuranceFAQ'
import HighwaterV2Booking from './HighwaterV2Booking'
import HighwaterLogo from '../HighwaterLogo'

export default function HighwaterDraftV2() {
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
      <HighwaterV2Nav />

      {/* Main Sanctuary Presentation */}
      <main id="highwater-v2-content">
        <HighwaterV2Hero />
        <HighwaterV2Journey />
        <HighwaterV2Selector />
        <HighwaterV2About />
        <HighwaterV2Services />
        <HighwaterV2InsuranceFAQ />
        <HighwaterV2Booking />
      </main>

      {/* Dedicated Sanctuary Footer */}
      <footer className="border-t border-[#E5ECEE] bg-white py-12 text-[#56747D] text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <HighwaterLogo className="w-10 h-10" />
            <div>
              <strong className="block text-[#16333B] text-sm">Highwater Counselling Company</strong>
              <span>Wembley, Alberta • Derek Patten, Founder</span>
            </div>
          </div>

          <div className="text-center sm:text-right space-y-1">
            <p>© {new Date().getFullYear()} Highwater Counselling Company. All rights reserved.</p>
            <p className="text-[11px] text-[#7A969E]">
              Private Practice Client Portal • Online Scheduling
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
