import React from 'react'
import { Heart, Compass, Shield, CheckCircle } from 'lucide-react'

export default function HighwaterV2About() {
  return (
    <section id="v2-about" className="py-20 border-b border-[#E8EEEA] bg-[#F7F4EC]/60 scroll-mt-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Narrative Copy */}
          <div className="lg:col-span-7">
            <span className="text-xs uppercase tracking-widest text-[#9C7F48] font-bold font-mono">
              About The Practice
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-[#16333B] mt-2 mb-6 font-serif">
              A Human-Centred Sanctuary with Room to Breathe.
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-[#3E5C64] leading-relaxed">
              <p>
                Highwater Counselling Company was founded by <strong>Derek Patten</strong>, MPCC(P), with a singular mission: to provide a grounded, non-clinical environment where real struggles can be examined without pretense. When life feels flooded by challenges—relational breakdowns, burnout, or demanding life transitions—having a safe space to regain your footing makes all the difference.
              </p>
              
              {/* Signature Quote Callout */}
              <div className="border-l-3 border-[#A88B58] pl-4 py-2 my-5 bg-[#FAF7F0] rounded-r-xl border border-y-[#EAE4D5] border-r-[#EAE4D5]">
                <p className="text-sm sm:text-base font-serif italic text-[#1F3E48] leading-relaxed">
                  “A space to open up without pressure to perform or pretend. Seeking support is a sign of being human, not a sign of weakness.”
                </p>
                <span className="block text-xs font-mono font-bold text-[#8F7440] uppercase tracking-wider mt-1.5">
                  — Derek Patten, MPCC(P) • Founder & Counsellor
                </span>
              </div>

              <p>
                Derek&apos;s counselling style is straightforward, judgment-free, and client-centred. Rather than simply offering a passive sympathetic ear, his practice focuses on <strong>actionable, practical tools</strong> that equip you for the real-world demands of daily life, work stress, and the silent weight of providing for a family.
              </p>
              <p>
                Working through a <em>postmodern and narrative framework</em>, Derek believes you are the foremost expert in your own lived experience. For clients who value their Christian faith or spiritual convictions, our <em>Faith & Values-Based Counselling</em> honors your worldview as an enduring foundation for resilience and renewal.
              </p>
            </div>

            {/* Practice Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
              <div className="p-4 rounded-xl bg-white border border-[#DFE7E8] shadow-2xs">
                <div className="font-bold text-[#16333B] text-sm mb-1 flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-[#3C6E7C]" />
                  <span>No Pretense</span>
                </div>
                <div className="text-xs text-[#5C7880]">Drop the performance. Straightforward, authentic dialogue.</div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#DFE7E8] shadow-2xs">
                <div className="font-bold text-[#16333B] text-sm mb-1 flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-[#A88B58]" />
                  <span>Practical Tools</span>
                </div>
                <div className="text-xs text-[#5C7880]">Tangible coping and communication strategies for everyday demands.</div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#DFE7E8] shadow-2xs">
                <div className="font-bold text-[#16333B] text-sm mb-1 flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-[#3C6E7C]" />
                  <span>Values Rooted</span>
                </div>
                <div className="text-xs text-[#5C7880]">Integrating faith, family commitments, and personal convictions.</div>
              </div>
            </div>

          </div>

          {/* Right Column: Practice Operations & Team Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DEE7E9] shadow-md space-y-6">
              
              <div className="border-b border-[#EDF4F5] pb-5">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#A88B58] font-bold block">
                    Founder & Clinician
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#EDF5F7] text-[#204F5C] font-semibold border border-[#CCE0E5]">
                    CPCA Registered
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#16333B]">Derek Patten</h3>
                <span className="text-xs font-semibold text-[#3C6E7C] block mb-1">
                  Master Practitioner in Clinical Counselling (Provisional) — MPCC(P)
                </span>
                <p className="text-xs text-[#4F6C74] mt-1">
                  Specializing in men&apos;s mental health, practical stress resolution, narrative therapy, couples restoration, and family resilience in Wembley, Alberta.
                </p>
              </div>

              <div className="border-b border-[#EDF4F5] pb-5">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#3C6E7C] font-bold block mb-1">
                  Practice Philosophy
                </span>
                <h3 className="text-lg font-bold text-[#16333B]">Practical Tools, Not Passive Listening</h3>
                <p className="text-xs text-[#4F6C74] mt-1">
                  A collaborative, grounded environment where we deconstruct overwhelming patterns and equip you with actionable strategies for work, marriage, and personal life.
                </p>
              </div>

              <div className="pt-1">
                <span className="text-xs font-semibold text-[#254A53] block mb-2">Practice Standard:</span>
                <ul className="space-y-2 text-xs text-[#4F6C74]">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-[#3C6E7C]" />
                    <span>In-person Wembley office appointments</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-[#3C6E7C]" />
                    <span>Alberta-wide encrypted telehealth video</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-[#3C6E7C]" />
                    <span>CPCA-recognized receipts for insurance claims</span>
                  </li>
                </ul>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
