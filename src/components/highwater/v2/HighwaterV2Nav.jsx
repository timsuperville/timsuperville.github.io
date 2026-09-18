import React, { useState } from 'react'
import { Calendar, Menu, X } from 'lucide-react'
import HighwaterLogo from '../HighwaterLogo'

export default function HighwaterV2Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { label: 'How It Works', href: '#v2-journey' },
    { label: 'Find Your Focus', href: '#v2-selector' },
    { label: 'About Derek', href: '#v2-about' },
    { label: 'Services', href: '#v2-services' },
    { label: 'Benefits & FAQ', href: '#v2-faq' },
    { label: 'Location', href: '#v2-location' }
  ]

  const handleNavClick = (e, href) => {
    if (href.startsWith('#')) {
      const targetId = href.slice(1)
      const element = document.getElementById(targetId)
      if (element) {
        e.preventDefault()
        element.scrollIntoView({ behavior: 'smooth' })
        window.history.pushState(null, '', href)
      }
    }
    setMobileMenuOpen(false)
  }

  return (
    <div className="sticky top-0 z-40">
      {/* ─── Client Review Banner with Dual Draft Switcher ────────────────────── */}
      <aside 
        aria-label="Client Draft Preview Banner" 
        className="bg-[#1C363D] text-xs text-slate-100 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 shadow-sm border-b border-[#284952]"
      >
        <div className="flex items-center gap-2.5">
          <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#D4E8EC] text-[#14323A] font-bold uppercase text-[10px] tracking-wider">
            Draft 2 Active
          </span>
          <span className="text-slate-200">
            <strong>Highwater Counselling Company</strong> — Derek Patten (Wembley, AB)
          </span>
        </div>

        {/* Live Draft Switcher Pills */}
        <div className="flex items-center gap-2">
          <span className="text-slate-400 text-[11px] hidden sm:inline">Compare Concept:</span>
          <div className="inline-flex rounded-lg bg-[#142A30] p-0.5 border border-[#2B4B54] text-xs">
            <a 
              href="#highwater" 
              className="px-2.5 py-1 rounded-md text-slate-300 hover:text-white transition-colors"
            >
              Draft 1 (Linen Classic)
            </a>
            <span className="px-2.5 py-1 rounded-md bg-[#254C57] text-white font-semibold shadow-xs">
              Draft 2 (Alpine Haven)
            </span>
          </div>
          <a 
            href="#client-intake" 
            className="text-[#B5DBE4] hover:text-white underline underline-offset-2 ml-2 text-[11px]"
          >
            Intake Hub
          </a>
        </div>
      </aside>

      {/* ─── Main Sanctuary Navigation Header ─────────────────────────────────── */}
      <header className="border-b border-[#E7EFEB] bg-[#FAF8F5]/95 backdrop-blur-md shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          <a 
            href="#highwater-v2" 
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
              window.history.pushState(null, '', '#highwater-v2')
            }}
            className="flex items-center gap-3 group"
          >
            <HighwaterLogo className="w-12 h-12 transition-transform duration-300 group-hover:scale-105" />
            <div>
              <span className="block font-bold tracking-[0.18em] text-[#163038] text-base sm:text-lg leading-tight uppercase font-sans">
                Highwater
              </span>
              <span className="block text-[11px] tracking-[0.26em] text-[#3D6C78] uppercase font-bold">
                Counselling Company
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav aria-label="Highwater Draft 2 Navigation" className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#2A4850]">
            {navLinks.map((link) => (
              <a 
                key={link.href} 
                href={link.href} 
                onClick={(e) => handleNavClick(e, link.href)}
                className="hover:text-[#21515E] transition-colors py-1"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Header Action Button */}
          <div className="flex items-center gap-3">
            <a 
              href="#v2-booking"
              onClick={(e) => handleNavClick(e, '#v2-booking')}
              className="hidden sm:inline-flex items-center gap-2 bg-[#1B3B44] hover:bg-[#132D34] text-white font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-xs border border-[#26505C] transition-all transform hover:-translate-y-0.5"
            >
              <Calendar className="w-4 h-4 text-[#C1DFE6]" />
              <span>Book Appointment</span>
            </a>

            {/* Mobile Hamburger Toggle */}
            <button 
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-[#1E3B44] hover:bg-[#F0EEE6] transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Slide-down Drawer */}
        {mobileMenuOpen && (
          <nav aria-label="Mobile Navigation" className="lg:hidden border-t border-[#E8EEEB] bg-[#FAF8F5] px-4 pt-3 pb-6 space-y-3 shadow-lg">
            {navLinks.map((link) => (
              <a 
                key={link.href} 
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="block text-sm font-medium text-[#23424A] py-2 px-3 rounded-lg hover:bg-[#F2EFE8] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2">
              <a 
                href="#v2-booking"
                onClick={(e) => handleNavClick(e, '#v2-booking')}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#1B3B44] text-white text-sm font-semibold py-3 rounded-xl shadow-sm"
              >
                <Calendar className="w-4 h-4 text-[#C1DFE6]" />
                <span>Book Appointment</span>
              </a>
            </div>
          </nav>
        )}
      </header>
    </div>
  )
}
