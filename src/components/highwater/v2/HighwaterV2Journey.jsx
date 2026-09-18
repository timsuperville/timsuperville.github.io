import React from 'react'
import { ShieldCheck, HeartHandshake, Compass } from 'lucide-react'
import { JOURNEY_STEPS } from './highwaterV2Data'

const STEP_ICONS = {
  shield: ShieldCheck,
  heart: HeartHandshake,
  compass: Compass
}

export default function HighwaterV2Journey() {
  return (
    <section id="v2-journey" className="py-20 border-b border-[#E8EEEA] bg-[#F7F4EC]/60 scroll-mt-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-[#9C7F48] font-bold font-mono">
            Demystifying The Process
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-[#16333B] mt-2 mb-4 font-serif">
            What to Expect When You Reach Out
          </h2>
          <p className="text-sm sm:text-base text-[#4C6B73] leading-relaxed">
            Taking the first step into counselling can feel daunting. We believe in total transparency: no surprises, no clinical interrogations, and no pressure to share more than you’re ready for.
          </p>
        </div>

        {/* 3 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {JOURNEY_STEPS.map((item) => {
            const StepIcon = STEP_ICONS[item.iconKey] || ShieldCheck
            return (
              <div 
                key={item.step}
                className="bg-white rounded-2xl p-7 border border-[#DFE8EA] shadow-2xs relative flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-3xl font-extrabold text-[#9BBFC7] font-mono">
                      {item.step}
                    </span>
                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#EBF4F6] text-[#22505C] border border-[#D0E5EA]">
                      {item.highlight}
                    </span>
                  </div>

                  <span className="block text-xs font-mono uppercase tracking-wider text-[#A88B58] font-bold mb-1">
                    {item.subtitle}
                  </span>

                  <h3 className="text-lg font-bold text-[#16333B] mb-3">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#45646C] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-5 mt-6 border-t border-[#F2F7F8] flex items-center gap-2 text-xs text-[#2B5C68] font-medium">
                  <StepIcon className="w-4 h-4 text-[#4C8896] shrink-0" />
                  <span>{item.commitment}</span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Reassurance Callout Box */}
        <div className="mt-12 bg-white rounded-2xl p-6 border border-[#DFE8EA] max-w-3xl mx-auto text-center shadow-2xs">
          <p className="text-xs sm:text-sm text-[#385860] leading-relaxed">
            <strong>Still wondering if counselling is right for you?</strong> You are always welcome to reach out directly with preliminary questions before booking your first appointment.
          </p>
          <div className="mt-4 flex items-center justify-center gap-4">
            <a 
              href="#v2-booking"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('v2-booking')?.scrollIntoView({ behavior: 'smooth' })
                window.history.pushState(null, '', '#v2-booking')
              }}
              className="text-xs font-bold text-[#235360] hover:text-[#13323A] underline underline-offset-4"
            >
              View Available Appointment Times →
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}
