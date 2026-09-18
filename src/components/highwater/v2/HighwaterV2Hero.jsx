import React from 'react'
import { Calendar, ArrowRight, ShieldCheck, Heart, MapPin } from 'lucide-react'
import { PRACTICE_META } from './highwaterV2Data'

export default function HighwaterV2Hero() {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28 border-b border-[#E8EEEA] bg-[#FAF8F5]">
      {/* Soft Alpine & Mineral River Mist Atmosphere */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, #E5F1F3 0%, #F5F1E8 50%, #FAF8F5 100%)'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Empathy-First Narrative & Scriptural Anchor */}
          <div className="lg:col-span-7 text-left">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#16333B] leading-[1.12] mb-6">
              When Life’s Waters Rise, <br />
              <span className="font-serif italic font-normal text-[#275966]">
                A Solid Place to Stand.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#324F57] leading-relaxed max-w-2xl mb-6">
              A private therapy practice founded by <strong>Derek Patten</strong>, MPCC(P). Providing practical tools, postmodern narrative guidance, and faith-integrated counselling for men, couples, and families navigating burnout, chronic stress, or relational challenges—available in-office, virtually, and through on-site support.
            </p>

            {/* Scriptural Anchor Box (Psalm 61:2) */}
            <div className="border-l-2 border-[#A88B58] pl-4 py-1 mb-8 bg-[#F4EFE6]/50 rounded-r-lg max-w-xl">
              <p className="text-xs sm:text-sm text-[#3E5C64] italic font-serif leading-relaxed">
                “{PRACTICE_META.scripture.verse}”
              </p>
              <span className="block not-italic font-sans text-[11px] font-bold text-[#8C713D] tracking-wider uppercase mt-1">
                — {PRACTICE_META.scripture.citation}
              </span>
            </div>

            {/* Conversion Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <a 
                href="#v2-booking"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById('v2-booking')?.scrollIntoView({ behavior: 'smooth' })
                  window.history.pushState(null, '', '#v2-booking')
                }}
                className="inline-flex items-center justify-center gap-2.5 bg-[#1C3B44] hover:bg-[#122B32] text-white text-sm font-semibold px-7 py-3.5 rounded-xl shadow-md border border-[#2B5562] transition-all transform hover:-translate-y-0.5"
              >
                <Calendar className="w-4 h-4 text-[#BFE1E8]" />
                <span>Book an Appointment</span>
                <ArrowRight className="w-4 h-4 text-[#A1C9D2]" />
              </a>
              <a 
                href="#v2-journey"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById('v2-journey')?.scrollIntoView({ behavior: 'smooth' })
                  window.history.pushState(null, '', '#v2-journey')
                }}
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-[#F2F6F7] text-[#1D3B44] text-sm font-semibold px-6 py-3.5 rounded-xl border border-[#D5E3E6] shadow-2xs transition-colors"
              >
                <span>How Our First Session Works</span>
              </a>
            </div>

            {/* Quick Micro-Trust Signals */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 mt-9 text-xs text-[#527079]">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#3C6F7D]" />
                CPCA Registered • No referral needed
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-[#A88B58]" />
                Strict Canadian ethical privacy
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#3C6F7D]" />
                Wembley Office, Virtual & On-Site
              </span>
            </div>

          </div>

          {/* Right Column: High-End Warm Linen Portrait Showcase */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm">
              
              {/* Organic Linen Halo Card */}
              <div className="rounded-3xl bg-white p-3 sm:p-3.5 border border-[#E0E9EC] shadow-xl relative overflow-hidden">
                <div className="overflow-hidden rounded-2xl bg-[#EDF3F5] border border-[#D6E4E7]">
                  <img 
                    src={PRACTICE_META.founders.counsellor.image} 
                    alt="Derek Patten, MPCC(P) - Clinical Counsellor and Founder of Highwater Counselling Company" 
                    className="w-full h-80 sm:h-[350px] object-cover object-top"
                  />
                </div>

                {/* Grounded Founder Badge (Cleanly positioned below photo to avoid face/collar blockage) */}
                <div className="mt-3 px-3.5 py-3 rounded-xl bg-[#FAF8F5] border border-[#DCE7E9] flex items-center justify-between">
                  <div>
                    <strong className="block text-sm sm:text-base font-bold text-[#16333B]">Derek Patten, MPCC(P)</strong>
                    <span className="text-xs text-[#3C6F7D] font-medium">Founder & Counsellor • CPCA</span>
                  </div>
                  <span className="text-[10px] uppercase font-mono px-2.5 py-1 rounded-md bg-[#E8F2F4] text-[#1E4B56] font-bold border border-[#CCE0E5]">
                    Wembley, AB
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
