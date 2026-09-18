import React from 'react'
import { Calendar, ArrowRight, Compass, Anchor, Layers, Users, LifeBuoy, Building2 } from 'lucide-react'
import { SERVICES_LIST } from './highwaterV2Data'

const SERVICE_ICONS = {
  'mens-health': Compass,
  'faith-values': Anchor,
  'postmodern-narrative': Layers,
  'couples-relationship': Users,
  'family-addiction': LifeBuoy,
  'onsite-support': Building2
}

export default function HighwaterV2Services() {
  return (
    <section id="v2-services" className="py-20 border-b border-[#E8EEEA] bg-[#FAF8F5] scroll-mt-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-[#9C7F48] font-bold font-mono">
            Areas of Practice
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-[#16333B] mt-2 mb-4 font-serif">
            Grounded Care for Life’s Critical Moments
          </h2>
          <p className="text-sm sm:text-base text-[#49666E]">
            Collaborative, dignity-affirming therapy designed to help you regain footing and move forward with purpose.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_LIST.map((srv) => {
            const Icon = SERVICE_ICONS[srv.id] || Compass
            return (
              <div 
                key={srv.id}
                className="rounded-3xl bg-white border border-[#DFE7E8] p-7 flex flex-col justify-between hover:border-[#6BA7B5] hover:shadow-md transition-all duration-200 group"
              >
                <div>
                  <div className="w-11 h-11 rounded-2xl bg-[#EFF6F7] text-[#24525E] border border-[#D3E5E9] flex items-center justify-center mb-4 group-hover:bg-[#E0EEF2] group-hover:scale-105 transition-all shadow-2xs">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono tracking-wider text-[#A88B58] uppercase block mb-1 font-semibold">
                    {srv.subtitle}
                  </span>
                <h3 className="text-lg font-bold text-[#16333B] mb-3 group-hover:text-[#25525E] transition-colors">
                  {srv.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#43626A] leading-relaxed mb-4">
                  {srv.description}
                </p>
              </div>

              <div className="border-t border-[#F2F6F7] pt-4 mt-2">
                <div className="text-[11px] text-[#6D878E] mb-3">
                  <span className="font-semibold text-[#16333B]">Focus:</span> {srv.target}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {srv.tags.map((tag, idx) => (
                    <span 
                      key={idx} 
                      className="text-[10px] px-2 py-0.5 rounded-md bg-[#EDF5F7] text-[#204F5C] border border-[#D0E4E8] font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
        </div>

        {/* Bottom Booking Hook */}
        <div className="mt-14 text-center">
          <a 
            href="#v2-booking"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('v2-booking')?.scrollIntoView({ behavior: 'smooth' })
              window.history.pushState(null, '', '#v2-booking')
            }}
            className="inline-flex items-center gap-2 bg-[#1C3B44] hover:bg-[#122B32] text-white text-xs sm:text-sm font-semibold px-6 py-3.5 rounded-xl shadow-xs border border-[#2B5460] transition-all transform hover:-translate-y-0.5"
          >
            <Calendar className="w-4 h-4 text-[#BEE1E7]" />
            <span>Book an Appointment</span>
            <ArrowRight className="w-4 h-4 text-[#9BC7D2]" />
          </a>
        </div>

      </div>
    </section>
  )
}
