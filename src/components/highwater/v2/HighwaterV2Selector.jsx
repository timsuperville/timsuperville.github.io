import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Calendar, Check } from 'lucide-react'
import { SELECTOR_OPTIONS } from './highwaterV2Data'

export default function HighwaterV2Selector() {
  const [activeOptionId, setActiveOptionId] = useState(SELECTOR_OPTIONS[0].id)
  const activeOption = SELECTOR_OPTIONS.find(opt => opt.id === activeOptionId) || SELECTOR_OPTIONS[0]

  return (
    <section id="v2-selector" className="py-20 border-b border-[#E8EEEA] bg-[#FAF8F5] scroll-mt-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-[#9C7F48] font-bold font-mono">
            Interactive Fit Guide
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-[#16333B] mt-2 mb-4 font-serif">
            Where Shall We Begin?
          </h2>
          <p className="text-sm sm:text-base text-[#4A676F] leading-relaxed">
            Select what best describes where you or your family are feeling stuck. Explore how Derek approaches your specific situation.
          </p>
        </div>

        {/* Situation Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-10 max-w-4xl mx-auto">
          {SELECTOR_OPTIONS.map((option) => {
            const isSelected = option.id === activeOptionId
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => setActiveOptionId(option.id)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                  isSelected 
                    ? 'bg-[#1C3B44] text-white shadow-sm border border-[#2B5460]' 
                    : 'bg-white text-[#345159] hover:bg-[#F0F5F6] border border-[#DCE6E8]'
                }`}
              >
                {isSelected && <Check className="w-3.5 h-3.5 text-[#BCE0E7]" />}
                <span>{option.label}</span>
              </button>
            )
          })}
        </div>

        {/* Dynamic Detail Card */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeOption.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-3xl p-6 sm:p-10 border border-[#DEE7E9] shadow-md relative overflow-hidden"
            >
              {/* Category Marker */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <span className="text-xs font-mono uppercase tracking-widest text-[#A88B58] font-bold">
                  {activeOption.category}
                </span>
                <span className="text-[11px] px-3 py-1 rounded-full bg-[#EBF4F6] text-[#224E5A] font-semibold border border-[#CEE1E6]">
                  {activeOption.sessionFormat}
                </span>
              </div>

              {/* Empathy Quote */}
              <blockquote className="text-lg sm:text-xl font-serif text-[#18363F] italic leading-snug mb-6 border-l-2 border-[#A88B58] pl-4">
                “{activeOption.quote}”
              </blockquote>

              {/* Approach Narrative */}
              <div className="mb-8 text-sm sm:text-base text-[#3E5C64] leading-relaxed">
                <p>{activeOption.approach}</p>
              </div>

              {/* Bottom Card Actions */}
              <div className="pt-6 border-t border-[#EDF4F5] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-xs text-[#527078]">
                  <span className="text-[#849C9E] block mb-0.5">Recommended Modality:</span>
                  <strong className="text-[#1A3841] text-sm">{activeOption.recommendedService}</strong>
                </div>

                <a 
                  href="#v2-booking"
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById('v2-booking')?.scrollIntoView({ behavior: 'smooth' })
                    window.history.pushState(null, '', '#v2-booking')
                  }}
                  className="inline-flex items-center justify-center gap-2 bg-[#1C3B44] hover:bg-[#122B32] text-white text-xs sm:text-sm font-semibold px-5 py-3 rounded-xl shadow-xs border border-[#2B5460] transition-all transform hover:-translate-y-0.5"
                >
                  <Calendar className="w-4 h-4 text-[#BEE1E7]" />
                  <span>Book for {activeOption.category}</span>
                  <ArrowRight className="w-4 h-4 text-[#9CC8D3]" />
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  )
}
