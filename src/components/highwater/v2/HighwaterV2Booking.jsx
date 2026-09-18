import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, ExternalLink, Check, Mail, PhoneCall } from 'lucide-react'
import { PRACTICE_META } from './highwaterV2Data'

export default function HighwaterV2Booking() {
  const [inquirySubmitted, setInquirySubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: 'Faith & Values-Based Counselling',
    format: 'In-Person (Wembley, AB)',
    message: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    setInquirySubmitted(true)
  }

  return (
    <section id="v2-booking" className="py-20 bg-[#FAF8F5] scroll-mt-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-[#9C7F48] font-bold font-mono">
            Booking & Contact
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-[#16333B] mt-2 mb-3 font-serif">
            Take Your First Step
          </h2>
          <p className="text-sm sm:text-base text-[#4C6B73]">
            Book directly through our secure client portal or send a direct inquiry to Derek Patten.
          </p>
        </div>

        {/* Dual Cards: Online Booking + Wembley Location */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          
          {/* Online Client Portal Card */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-7 sm:p-9 border border-[#DEE7E9] shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="text-xs font-mono uppercase tracking-widest text-[#A88B58] font-bold">
                  Jane App Integration
                </span>
                <span className="text-[11px] px-2.5 py-1 rounded-md bg-[#E8F3F5] text-[#1E4B56] font-bold">
                  PIPEDA Compliant
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-[#16333B] mb-3 font-serif">
                Online Scheduling via Jane App
              </h3>

              <p className="text-xs sm:text-sm text-[#43626A] leading-relaxed mb-6">
                Highwater Counselling utilizes <strong>Jane App</strong>—Canada&apos;s leading secure practice management platform. Browse available appointment openings, select your service (in-office or telehealth), and complete intake forms privately.
              </p>

              <div className="bg-[#FAF8F5] rounded-2xl p-4 border border-[#E5ECEE] mb-6 text-xs text-[#35545D] space-y-2">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#3C6E7C]" />
                  <span>Real-time Jane App calendar availability</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#3C6E7C]" />
                  <span>Encrypted digital intake forms & receipts</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#3C6E7C]" />
                  <span>Automated email & text appointment reminders</span>
                </div>
              </div>
            </div>

            <div>
              <a
                href={PRACTICE_META.contact.janeAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#1C3B44] hover:bg-[#122B32] text-white text-sm font-semibold py-3.5 px-6 rounded-xl shadow-xs border border-[#2B5460] transition-all transform hover:-translate-y-0.5"
              >
                <Calendar className="w-4 h-4 text-[#BEE1E7]" />
                <span>Book via Jane App Portal</span>
                <ExternalLink className="w-4 h-4 text-[#9CC7D2]" />
              </a>
              <span className="block text-[11px] text-[#63828B] text-center mt-2 font-mono">
                Connects directly to Derek Patten&apos;s active Jane App scheduler
              </span>
            </div>
          </div>

          {/* Wembley Office & Telehealth Card */}
          <div id="v2-location" className="lg:col-span-6 bg-white rounded-3xl p-7 sm:p-9 border border-[#DEE7E9] shadow-sm flex flex-col justify-between scroll-mt-28">
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="text-xs font-mono uppercase tracking-widest text-[#3C6E7C] font-bold">
                  Practice Location
                </span>
                <span className="text-[11px] px-2.5 py-1 rounded-md bg-[#F4EFE6] text-[#856832] font-bold">
                  Wembley, AB
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-[#16333B] mb-3 font-serif">
                Wembley Office & Virtual Telehealth
              </h3>

              <p className="text-xs sm:text-sm text-[#43626A] leading-relaxed mb-6">
                Conveniently located in Wembley, Alberta, serving Grande Prairie County and the Peace Region. Secure virtual telehealth sessions are also available for clients across Alberta.
              </p>

              {/* Interactive Embedded Google Map */}
              <div className="relative w-full h-64 sm:h-72 rounded-2xl overflow-hidden border border-[#DCE6E8] shadow-xs mb-6 bg-[#EBF2F4]">
                <iframe
                  title="Highwater Counselling Office Location in Wembley, Alberta"
                  src="https://maps.google.com/maps?q=Wembley%2C%20Alberta&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>

            <div className="text-xs text-[#527179] text-center">
              Direct email inquiries: <a href={`mailto:${PRACTICE_META.contact.email}`} className="text-[#24525E] font-semibold underline">{PRACTICE_META.contact.email}</a>
            </div>
          </div>

        </div>

        {/* General Direct Inquiry Form */}
        <div className="bg-white rounded-3xl p-7 sm:p-10 border border-[#DEE7E9] shadow-sm max-w-3xl mx-auto mb-16">
          <div className="text-center mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-[#16333B] font-serif">
              Questions Before Booking?
            </h3>
            <p className="text-xs sm:text-sm text-[#506E76] mt-1">
              Reach out directly with preliminary questions. Derek Patten will get back to you promptly.
            </p>
          </div>

          {inquirySubmitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8 space-y-3"
            >
              <div className="w-12 h-12 rounded-full bg-[#EBF4F6] text-[#224E5A] flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-[#16333B]">Inquiry Received</h4>
              <p className="text-xs sm:text-sm text-[#4E6C74] max-w-md mx-auto">
                Thank you for reaching out. Derek Patten will respond to your message shortly.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#22434C] mb-1">Your Name *</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="First & last name"
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-[#D7E3E5] bg-[#FAF8F5] focus:bg-white focus:outline-none focus:border-[#3C6E7C]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#22434C] mb-1">Email Address *</label>
                  <input 
                    type="email" 
                    required 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="your@email.com"
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-[#D7E3E5] bg-[#FAF8F5] focus:bg-white focus:outline-none focus:border-[#3C6E7C]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#22434C] mb-1">How can we help? *</label>
                <textarea 
                  rows={3}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="Tell us what brings you to Highwater Counselling..."
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-[#D7E3E5] bg-[#FAF8F5] focus:bg-white focus:outline-none focus:border-[#3C6E7C]"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#1C3B44] hover:bg-[#122B32] text-white text-xs sm:text-sm font-semibold px-6 py-3 rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <Mail className="w-4 h-4 text-[#BEE1E7]" />
                <span>Send Message to Derek Patten</span>
              </button>
            </form>
          )}
        </div>

        {/* 24/7 Crisis Support Notice Bar */}
        <div className="bg-[#FAF4EB] rounded-2xl p-4 sm:p-5 border border-[#E9DFCE] text-xs text-[#5D4E33] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3">
            <PhoneCall className="w-5 h-5 text-[#9C7F48] flex-shrink-0 mt-0.5 sm:mt-0" />
            <div>
              <strong className="block text-[#433722]">Emergency & Regional Crisis Resources:</strong>
              <span className="text-[#68563A]">If you are in immediate crisis or experiencing thoughts of self-harm, please reach out right away.</span>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-semibold text-[#8C6D33] w-full md:w-auto">
            <a 
              href="tel:18773032642" 
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#F0E6D6] hover:bg-[#E5D7C0] text-[#5B441B] transition-colors focus:outline-none focus:ring-2 focus:ring-[#9C7F48]"
              aria-label="Call Alberta Mental Health Help Line at 1-877-303-2642"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#9C7F48] flex-shrink-0" />
              <span>AHS Mental Health: 1-877-303-2642</span>
            </a>
            <a 
              href="tel:988" 
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#F0E6D6] hover:bg-[#E5D7C0] text-[#5B441B] transition-colors focus:outline-none focus:ring-2 focus:ring-[#9C7F48]"
              aria-label="Call National Suicide Crisis Helpline at 988"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#9C7F48] flex-shrink-0" />
              <span>National Suicide Crisis: 988</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}
