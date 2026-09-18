import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ShieldCheck } from 'lucide-react'
import { INSURANCE_PROVIDERS, FAQS_LIST } from './highwaterV2Data'

export default function HighwaterV2InsuranceFAQ() {
  const [openFaqIndex, setOpenFaqIndex] = useState(null)

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index)
  }

  return (
    <section id="v2-faq" className="py-20 border-b border-[#E8EEEA] bg-[#F7F4EC]/60 scroll-mt-28">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Insurance Guidance Box */}
        <div className="bg-white rounded-3xl p-7 sm:p-10 border border-[#DEE7E9] shadow-sm mb-16">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#EDF4F5] pb-6 mb-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#9C7F48] font-bold font-mono">
                Extended Health Coverage
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#16333B] mt-1 font-serif">
                Insurance Reimbursement & Coverage
              </h3>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EBF4F6] text-[#224E5A] text-xs font-semibold border border-[#CCE0E5]">
              <ShieldCheck className="w-4 h-4 text-[#3C6E7C]" />
              <span>Official Receipts Provided</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-[#3E5C64] leading-relaxed mb-6">
            Private therapy is not funded under provincial Alberta Health Services (AHS) medicare. However, most Canadian extended health benefit and employee insurance plans provide reimbursement for clinical counselling provided by practitioners registered with the <strong>Canadian Professional Counsellors Association (CPCA)</strong>. Derek Patten is an MPCC(P) in good standing, and itemized professional receipts with his registration numbers are provided immediately after each session for straightforward claim submission.
          </p>

          <div>
            <span className="block text-[11px] font-bold text-[#738D94] uppercase tracking-wider mb-2.5">
              Commonly Reimbursed Providers:
            </span>
            <div className="flex flex-wrap gap-2">
              {INSURANCE_PROVIDERS.map((provider, i) => (
                <span 
                  key={i} 
                  className="text-xs px-3 py-1.5 rounded-xl bg-[#FAF8F5] text-[#2C4F58] border border-[#DEE6E8] font-medium"
                >
                  {provider}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Accordion Section */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-[#9C7F48] font-bold font-mono">
            Practical Questions
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-[#16333B] mt-2 mb-3 font-serif">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-[#4E6B73]">
            Straightforward answers regarding scheduling, privacy, fees, and what to expect.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS_LIST.map((faq, index) => {
            const isOpen = openFaqIndex === index
            return (
              <div 
                key={index}
                className="bg-white rounded-2xl border border-[#DFE7E8] overflow-hidden shadow-2xs transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left px-6 py-4.5 flex items-center justify-between gap-4 font-semibold text-[#18363F] text-sm sm:text-base hover:text-[#285764] transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span>{faq.q}</span>
                  <ChevronDown 
                    className={`w-5 h-5 text-[#859E9E] transition-transform duration-200 flex-shrink-0 ${
                      isOpen ? 'transform rotate-180 text-[#285764]' : ''
                    }`} 
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-[#436169] leading-relaxed border-t border-[#F2F6F7]">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
