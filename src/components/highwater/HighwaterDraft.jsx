import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Shield, 
  HeartHandshake, 
  MapPin, 
  Mail,
  Calendar, 
  ExternalLink,
  CheckCircle2, 
  ChevronDown, 
  ArrowRight, 
  Users, 
  Compass, 
  Clock, 
  Layers, 
  Check, 
  Anchor, 
  LifeBuoy, 
  Building2 
} from 'lucide-react'
import HighwaterLogo from './HighwaterLogo'

const DRAFT1_SERVICE_ICONS = {
  'mens-health': Compass,
  'faith-values': Anchor,
  'postmodern-narrative': Layers,
  'couples-relationship': Users,
  'family-addiction': LifeBuoy,
  'onsite-support': Building2
}

export default function HighwaterDraft() {
  const [activeFaq, setActiveFaq] = useState(null)
  const [inquirySubmitted, setInquirySubmitted] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    serviceInterest: 'Faith & Values-Based Counselling',
    preferredFormat: 'In-Person (Wembley, AB)',
    message: ''
  })

  const servicesList = [
    {
      id: 'faith-values',
      title: 'Faith & Values-Based Counselling',
      subtitle: 'Spiritually Attuned & Values-Informed Care',
      description: 'Honouring personal faith traditions, spiritual worldviews, and core virtues as a foundational anchor for healing, clarity, and renewal during life transitions.',
      target: 'Individuals, couples, and seekers desiring spiritually grounded support',
      tags: ['Worldview Alignment', 'Spiritual Wellness', 'Inner Grounding']
    },
    {
      id: 'postmodern',
      title: 'Postmodern & Narrative Therapy',
      subtitle: 'Collaborative & Strength-Based Practice',
      description: 'Moving beyond rigid clinical labels to explore the stories that shape your life. We work collaboratively to provide practical tools rather than passive listening, helping you co-author empowered futures.',
      target: 'Individuals facing life transitions, identity shifts, and systemic overwhelm',
      tags: ['Narrative Reframing', 'Practical Tools', 'Client Autonomy']
    },
    {
      id: 'mens-mental-health',
      title: "Men's Mental Health & Direction",
      subtitle: 'No Pressure to Perform or Pretend',
      description: 'A candid, judgment-free space to confront high-pressure responsibilities, chronic stress, fatherhood, and burnout. Seeking support is a sign of being human, not a sign of weakness.',
      target: 'Men in demanding careers, leadership, and family life seeking practical tools',
      tags: ['No Posturing', 'Stress & Burnout', 'Practical Tools', 'Fatherhood']
    },
    {
      id: 'couples-family',
      title: 'Couples & Relationship Counselling',
      subtitle: 'Rebuilding Trust & Communication',
      description: 'Strengthening relational bonds by identifying recurring communication cycles, repairing past wounds, and establishing mutual empathy and shared values.',
      target: 'Couples facing communication barriers, conflict, or relational stagnation',
      tags: ['Communication Repair', 'Relational Trust', 'Shared Values']
    },
    {
      id: 'youth-addiction',
      title: 'Family & Youth Addiction Support',
      subtitle: 'Compassionate Recovery & Boundary Work',
      description: 'Specialized support for youths, young adults, and their families confronting substance use, behavioural dependencies, and the emotional toll of family addiction.',
      target: 'Youths, young adults, and parents navigating addiction recovery journeys',
      tags: ['Substance Support', 'Family Systems', 'Boundary Restoration']
    },
    {
      id: 'onsite-support',
      title: 'On-Site Mental Health Support',
      subtitle: 'Direct Community & Workplace Accessibility',
      description: 'Meeting individuals, organizations, and community groups directly on-site in Wembley and the greater Grande Prairie County region for critical support and mental wellness care.',
      target: 'Community groups, local organizations, and on-location client care',
      tags: ['Wembley & Regional', 'Mobile / On-Site Care', 'Crisis Navigation']
    }
  ]

  const faqsList = [
    {
      q: "What are Derek Patten's professional credentials and registration?",
      a: "Derek Patten is a Master Practitioner in Clinical Counselling (Provisional) — MPCC(P) — registered in good standing with the Canadian Professional Counsellors Association (CPCA). He provides collaborative, evidence-informed clinical counselling adhered to strict Canadian ethical and privacy standards."
    },
    {
      q: "Do I need a doctor's referral to schedule a session?",
      a: "No physician referral is required. You can contact Highwater Counselling Company directly or book an appointment online at your convenience."
    },
    {
      q: "What can I expect during our first session?",
      a: "The initial appointment is a straightforward, welcoming conversation focused on understanding what you are facing. Rather than simply offering a passive sympathetic ear, Derek focuses on equipping you with practical tools. There is zero pressure to perform or pretend."
    },
    {
      q: "Are counselling services covered by private insurance or Alberta Health Services?",
      a: "Private counselling is not funded under provincial AHS medicare. However, most Canadian extended health benefit plans (Sun Life, Manulife, Canada Life, Alberta Blue Cross, Green Shield, Desjardins) reimburse clinical counselling provided by CPCA-registered practitioners (MPCC/RPC). Detailed official receipts are provided following every session for easy claims submission."
    },
    {
      q: "What is your appointment cancellation policy?",
      a: "If you need to reschedule or cancel an appointment, please provide advance notice through your secure client portal or by contacting the practice so that open appointments may be made available to other clients in need. Practice cancellation notice guidelines are provided in your client intake agreement."
    },
    {
      q: "Are sessions held in-person or virtually?",
      a: "We offer both dedicated in-person sessions at our office in Wembley, Alberta, as well as secure virtual telehealth sessions for clients throughout Alberta."
    },
    {
      q: "Is everything we discuss kept strictly confidential?",
      a: "Yes. All sessions and records are held in strict professional confidence under Canadian privacy and clinical ethics standards (PIPEDA), with only the standard legal and safety exceptions (such as imminent safety risk to self or others)."
    }
  ]

  const handleHwScroll = (e, href) => {
    if (href.startsWith('#')) {
      const targetId = href.slice(1)
      const element = document.getElementById(targetId)
      if (element) {
        e.preventDefault()
        element.scrollIntoView({ behavior: 'smooth' })
        window.history.pushState(null, '', href)
      }
    }
  }

  React.useEffect(() => {
    if (window.location.hash && window.location.hash.startsWith('#hw-')) {
      const targetId = window.location.hash.replace('#', '')
      const el = document.getElementById(targetId)
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' })
        }, 150)
      }
    }
  }, [])

  const handleInquirySubmit = (e) => {
    e.preventDefault()
    setInquirySubmitted(true)
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1E353D] font-sans selection:bg-[#BEE0E6] selection:text-[#193F49]">
      
      {/* ─── Client Review Banner (Tim Superville Portfolio Context) ──────────── */}
      {/* ─── Unified Sticky Header (Draft Switcher + Navigation) ──────────────── */}
      <div className="sticky top-0 z-40">
        <aside aria-label="Client Draft Preview Banner" className="bg-[#244C57] text-xs text-slate-100 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#BEE0E6] text-[#193F49] font-bold tracking-wide uppercase text-[10px]">
              Draft Preview
            </span>
            <span>
              <strong>Client:</strong> Highwater Counselling Company — Derek Patten (Wembley, AB)
            </span>
          </div>
          <div className="flex items-center gap-3 text-[11px]">
            {/* Draft Comparison Switcher */}
            <div className="inline-flex rounded-lg bg-[#142A30] p-0.5 border border-[#2B4B54] text-xs">
              <span className="px-2.5 py-1 rounded-md bg-[#2B5460] text-white font-semibold shadow-xs">
                Draft 1 (Linen Classic)
              </span>
              <a 
                href="#highwater-v2" 
                className="px-2.5 py-1 rounded-md text-slate-300 hover:text-white transition-colors"
              >
                Draft 2 (Alpine Haven)
              </a>
            </div>

            <a 
              href="#client-intake" 
              className="text-[#D4EAF0] hover:text-white underline underline-offset-2 transition-colors font-medium ml-1"
            >
              Intake Hub
            </a>
            <a 
              href="#home" 
              className="text-slate-300 hover:text-white transition-colors hidden sm:inline"
            >
              Portfolio
            </a>
          </div>
        </aside>

        {/* ─── Highwater Dedicated Navigation (Airy Linen & Sea-Glass Accent) ──── */}
        <header className="border-b border-[#E4EAEB] bg-white/95 backdrop-blur-md shadow-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            <a href="#highwater" className="flex items-center gap-3 group">
              <HighwaterLogo className="w-12 h-12 transition-transform duration-300 group-hover:scale-105" />
              <div>
                <span className="block font-bold tracking-[0.16em] text-[#1E3D46] text-base sm:text-lg leading-tight uppercase font-sans">
                  Highwater
                </span>
                <span className="block text-[11px] tracking-[0.24em] text-[#5491A0] uppercase font-bold">
                  Counselling Company
                </span>
              </div>
            </a>

            <nav aria-label="Highwater Primary Navigation" className="hidden md:flex items-center gap-7 text-sm font-semibold text-[#2C4D56]">
              <a href="#hw-about" onClick={(e) => handleHwScroll(e, '#hw-about')} className="hover:text-[#5491A0] transition-colors">About Derek</a>
              <a href="#hw-services" onClick={(e) => handleHwScroll(e, '#hw-services')} className="hover:text-[#5491A0] transition-colors">Services</a>
              <a href="#hw-faqs" onClick={(e) => handleHwScroll(e, '#hw-faqs')} className="hover:text-[#5491A0] transition-colors">FAQ</a>
              <a href="#hw-location" onClick={(e) => handleHwScroll(e, '#hw-location')} className="hover:text-[#5491A0] transition-colors">Wembley Office</a>
              <a href="#hw-contact" onClick={(e) => handleHwScroll(e, '#hw-contact')} className="hover:text-[#5491A0] transition-colors">Contact</a>
            </nav>

            <div className="flex items-center gap-3">
              <a 
                href="#hw-booking"
                onClick={(e) => handleHwScroll(e, '#hw-booking')}
                className="inline-flex items-center gap-2 bg-[#20444E] hover:bg-[#16353E] text-white font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-lg shadow-sm border border-[#2B5460] transition-all duration-200 transform hover:-translate-y-0.5"
              >
                <Calendar className="w-4 h-4 text-[#C5DFE5]" />
                <span>Book Appointment</span>
              </a>
            </div>
          </div>
        </header>
      </div>

      {/* ─── Hero Section (Luminous Sea-Glass Mist & Calming Mountain Horizon) ─ */}
      <section className="relative overflow-hidden pt-14 pb-20 sm:pt-24 sm:pb-28 border-b border-[#E4EAEB]">
        {/* Soft, Calming Mineral Sea-Glass Gradient */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-50"
          style={{
            background: 'radial-gradient(circle at 50% 12%, #E2F0F3 0%, #FAF8F5 75%)'
          }}
        />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#1A3841] leading-tight mb-6">
            When Life’s Waters Rise, <br />
            <span className="text-[#2B606D]">
              A Solid Place to Stand.
            </span>
          </h1>

          <p className="text-base sm:text-xl text-[#304E56] max-w-3xl mx-auto leading-relaxed mb-4">
            Professional, postmodern, and faith-integrated counselling grounded in compassion and resilience. Founded by <strong>Derek Patten</strong>, MPCC(P), offering private office sessions, virtual telehealth, and dedicated on-site support for men, couples, families, and groups.
          </p>

          <blockquote className="text-xs sm:text-sm text-[#3E707D] italic font-serif max-w-xl mx-auto mb-10">
            “When my heart is overwhelmed: lead me to the rock that is higher than I.” 
            <span className="block not-italic font-sans text-[11px] text-[#9E8250] tracking-wider uppercase font-semibold mt-1.5">
              — Psalm 61:2
            </span>
          </blockquote>

          {/* Call to Actions (Grounded Deep Nordic Slate + Crisp White) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="#hw-booking"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#20444E] hover:bg-[#16353E] text-white text-sm font-semibold px-7 py-3.5 rounded-xl shadow-md border border-[#2B5460] transition-all transform hover:-translate-y-0.5"
            >
              <Calendar className="w-4 h-4 text-[#C5DFE5]" />
              <span>Book an Appointment</span>
              <ArrowRight className="w-4 h-4 text-[#A8CCD4]" />
            </a>
            <a 
              href="#hw-services"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-[#F2F7F9] text-[#1A3841] border border-[#CBDDE1] text-sm font-semibold px-6 py-3.5 rounded-xl transition-all shadow-xs"
            >
              <span>Explore Practice Services</span>
            </a>
          </div>

          {/* Quick Trust Badges (Clean White Cards with Soft Sea-Glass Accents) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-14 max-w-4xl mx-auto text-left">
            <div className="p-4 rounded-xl bg-white border border-[#E4EAEB] shadow-xs flex items-center gap-3">
              <Shield className="w-5 h-5 text-[#3E707D] flex-shrink-0" />
              <div className="text-xs">
                <span className="block font-bold text-[#1A3841]">CPCA Registered</span>
                <span className="text-[#648088]">MPCC(P) Clinical Counsellor</span>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-white border border-[#E4EAEB] shadow-xs flex items-center gap-3">
              <Compass className="w-5 h-5 text-[#A88B58] flex-shrink-0" />
              <div className="text-xs">
                <span className="block font-bold text-[#1A3841]">Practical Tools</span>
                <span className="text-[#648088]">Actionable coping strategies</span>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-white border border-[#E4EAEB] shadow-xs flex items-center gap-3">
              <HeartHandshake className="w-5 h-5 text-[#3E707D] flex-shrink-0" />
              <div className="text-xs">
                <span className="block font-bold text-[#1A3841]">Faith & Values-Based</span>
                <span className="text-[#648088]">Honouring your beliefs</span>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-white border border-[#E4EAEB] shadow-xs flex items-center gap-3">
              <MapPin className="w-5 h-5 text-[#A88B58] flex-shrink-0" />
              <div className="text-xs">
                <span className="block font-bold text-[#1A3841]">In-Office & On-Site</span>
                <span className="text-[#648088]">Wembley, virtual & mobile</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── About Section (Meet Derek Patten) ─────────────────────── */}
      <section id="hw-about" className="py-20 border-b border-[#E4EAEB] bg-[#F4F1E8]/60 scroll-mt-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Visual Card / Practice Showcase (Featuring Real Portrait of Derek Patten) */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-sm rounded-2xl bg-white p-3 sm:p-3.5 border border-[#DFE8EA] shadow-md text-[#1A3841] overflow-hidden group">
                <div className="overflow-hidden rounded-xl bg-[#F0F5F6] border border-[#D5E4E7]">
                  <img 
                    src="/images/derek-patten.jpg" 
                    alt="Derek Patten, MPCC(P) - Clinical Counsellor and Founder of Highwater Counselling Company" 
                    className="w-full h-80 sm:h-[350px] object-cover object-top transition-transform duration-500 group-hover:scale-102"
                  />
                </div>
                <div className="mt-3 px-3.5 py-2.5 rounded-lg bg-[#FAF8F5] border border-[#DFE8EA] flex items-center justify-between">
                  <div>
                    <strong className="block text-sm font-bold text-[#1A3841]">Derek Patten, MPCC(P)</strong>
                    <span className="text-[11px] text-[#3E707D] font-medium">Founder & Counsellor • CPCA</span>
                  </div>
                  <span className="text-[10px] uppercase font-mono px-2.5 py-1 rounded bg-[#EAF3F5] text-[#24535F] border border-[#CCE2E7] font-bold">
                    Wembley, AB
                  </span>
                </div>
              </div>
            </div>

            {/* Narrative Content */}
            <div className="lg:col-span-7">
              <span className="text-xs uppercase tracking-widest text-[#A88B58] font-bold font-mono">
                About The Practice
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold text-[#1A3841] mt-2 mb-6">
                Meeting You Where You Are, With Room to Breathe.
              </h2>

              <div className="space-y-4 text-[#35525B] text-sm sm:text-base leading-relaxed">
                <p>
                  Highwater Counselling Company was born out of a desire to provide a distinct, non-clinical environment where real struggles can be explored without pretense. When life feels flooded by challenges—whether relational, emotional, or transitional—having a safe, unhurried space to regain footing makes all the difference.
                </p>

                {/* Derek's Signature Callout Quote */}
                <div className="border-l-3 border-[#A88B58] pl-4 py-2 my-4 bg-[#FAF7F0] rounded-r-xl border border-y-[#EAE4D5] border-r-[#EAE4D5]">
                  <p className="text-sm sm:text-base font-serif italic text-[#1F3E48] leading-relaxed">
                    “A space to open up without pressure to perform or pretend. Seeking support is a sign of being human, not a sign of weakness.”
                  </p>
                  <span className="block text-xs font-mono font-bold text-[#8F7440] uppercase tracking-wider mt-1.5">
                    — Derek Patten, MPCC(P) • Founder & Counsellor
                  </span>
                </div>

                <p>
                  <strong>Derek Patten</strong> approaches therapy through a postmodern and narrative framework focused on <em>practical tools and real-world strategies</em> rather than just passive listening. He brings a deep understanding of the unique pressures in Grande Prairie and the Peace Region—including high-stress responsibilities, relational strain, and the silent weight of providing for a family.
                </p>
                <p>
                  For clients who draw strength from their spiritual convictions, our <em>Faith & Values-Based Counselling</em> honors your worldview as an enduring, powerful resource for resilience and renewal.
                </p>
              </div>

              {/* Founder Pillars (Clean Light Cards) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                <div className="p-4 rounded-xl bg-white border border-[#E2EBEB] shadow-xs">
                  <div className="font-bold text-[#1A3841] text-sm mb-1">No Pretense</div>
                  <div className="text-xs text-[#648088]">Drop the performance. Straightforward, authentic dialogue.</div>
                </div>
                <div className="p-4 rounded-xl bg-white border border-[#E2EBEB] shadow-xs">
                  <div className="font-bold text-[#1A3841] text-sm mb-1">Practical Tools</div>
                  <div className="text-xs text-[#648088]">Tangible coping and communication strategies for everyday life.</div>
                </div>
                <div className="p-4 rounded-xl bg-white border border-[#E2EBEB] shadow-xs">
                  <div className="font-bold text-[#1A3841] text-sm mb-1">Rooted in Values</div>
                  <div className="text-xs text-[#648088]">Integrating personal faith and core values whenever clients wish.</div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ─── Services Section (Airy White Cards with Seafoam Accents) ───────── */}
      <section id="hw-services" className="py-20 border-b border-[#E4EAEB] bg-[#FAF8F5] scroll-mt-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-[#A88B58] font-bold font-mono">
              Therapeutic Offerings
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-[#1E3D46] mt-2 mb-4">
              Comprehensive, Person-Centred Support
            </h2>
            <p className="text-sm sm:text-base text-[#4C6D75]">
              Tailored clinical services designed for couples, men, families, and individuals seeking grounded emotional healing and direction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesList.map((srv) => {
              const Icon = DRAFT1_SERVICE_ICONS[srv.id] || Compass
              return (
                <div 
                  key={srv.id}
                  className="rounded-2xl bg-white border border-[#E2EBEB] p-6 flex flex-col justify-between hover:border-[#6BA7B5] hover:shadow-md transition-all duration-200 group"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-[#EDF6F8] text-[#2C6270] border border-[#D2E7EC] flex items-center justify-center mb-3.5 group-hover:bg-[#DEEFF2] group-hover:scale-105 transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono tracking-wider text-[#A88B58] uppercase block mb-1 font-semibold">
                      {srv.subtitle}
                    </span>
                  <h3 className="text-lg font-bold text-[#1E3D46] mb-3 group-hover:text-[#4B8897] transition-colors">
                    {srv.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#415F67] leading-relaxed mb-4">
                    {srv.description}
                  </p>
                </div>

                <div className="border-t border-[#F0F5F6] pt-4 mt-2">
                  <div className="text-[11px] text-[#6B858D] mb-3">
                    <span className="font-semibold text-[#1E3D46]">Focus:</span> {srv.target}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {srv.tags.map((t, idx) => (
                      <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-[#EDF6F8] text-[#2C6270] border border-[#D2E7EC] font-medium">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

          {/* Dedicated On-Site Support Highlight Box (Soft Seafoam Mist) */}
          <div className="mt-12 rounded-2xl bg-gradient-to-r from-[#EBF5F7] to-[#F5F2E9] border border-[#CFDFE3] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#A88B58] uppercase tracking-wider">
                <Layers className="w-4 h-4" />
                <span>Regional Community Initiative</span>
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-[#1E3D46]">
                On-Site Mental Health Support Across Wembley & Grande Prairie County
              </h4>
              <p className="text-xs sm:text-sm text-[#415F67] max-w-2xl">
                In addition to private office sessions, Derek provides specialized on-site support for organizations, workplaces, and groups facing crises, collective grief, or seeking workplace wellness facilitation.
              </p>
            </div>
            <a 
              href="#hw-contact"
              className="flex-shrink-0 bg-[#20444E] hover:bg-[#16353E] text-white font-semibold text-xs sm:text-sm px-6 py-3 rounded-xl transition-all shadow-sm border border-[#2B5460]"
            >
              Inquire About On-Site Support
            </a>
          </div>
        </div>
      </section>

      {/* ─── Canadian Counselling FAQ Section (Warm Linen Grounding) ────────── */}
      <section id="hw-faqs" className="py-20 border-b border-[#E4EAEB] bg-[#F4F1E8]/60 scroll-mt-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs uppercase tracking-widest text-[#A88B58] font-bold font-mono">
              Frequently Asked Questions
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-[#1A3841] mt-2 mb-4">
              Answers for Your Peace of Mind
            </h2>
            <p className="text-sm text-[#4C6D75] max-w-xl mx-auto">
              Clear guidance on getting started, Alberta healthcare coverage, session formats, and practice policies.
            </p>
          </div>

          <div className="space-y-3">
            {faqsList.map((faq, index) => {
              const isOpen = activeFaq === index
              return (
                <div 
                  key={index}
                  className="rounded-xl border border-[#DFE6E8] bg-white overflow-hidden shadow-xs transition-all"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-[#FAF8F5] transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm sm:text-base font-bold text-[#1A3841]">
                      {faq.q}
                    </span>
                    <ChevronDown 
                      className={`w-4 h-4 text-[#3E707D] flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-5 pb-5 text-xs sm:text-sm text-[#415F67] leading-relaxed border-t border-[#EDF4F5] pt-3">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>

          <div className="mt-8 text-center text-xs text-[#6B858D]">
            Have a specific clinical or scheduling question not covered here?{' '}
            <a href="#hw-contact" className="text-[#A88B58] font-semibold underline underline-offset-2 hover:text-[#1A3841]">
              Reach out to Derek Patten directly
            </a>.
          </div>
        </div>
      </section>

      {/* ─── Online Appointment Booking & Practice Location ───────────────── */}
      <section id="hw-booking" className="py-20 border-b border-[#E4EAEB] bg-[#FAF8F5] scroll-mt-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Online Booking Box (Clean White with Deep Slate Button) */}
            <div className="lg:col-span-7 rounded-2xl bg-white border border-[#E2EBEB] p-8 shadow-xs flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#EDF6F8] text-[#2C6270] text-xs font-mono font-semibold mb-4">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Online Client Portal</span>
                </div>
                <h3 className="text-2xl font-bold text-[#1A3841] mb-3">
                  Book an Appointment Online
                </h3>
                <p className="text-sm text-[#415F67] leading-relaxed mb-6">
                  We utilize a secure, Canadian-hosted client portal compliant with national privacy standards (PIPEDA) for online scheduling, confidential digital intake forms, and automated reminders. Browse available openings with Derek Patten and reserve a session in minutes.
                </p>

                <div className="space-y-3 mb-8 text-xs text-[#415F67]">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#3E707D] flex-shrink-0 mt-0.5" />
                    <span>Real-time availability for In-Person (Wembley) and Virtual appointments.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#3E707D] flex-shrink-0 mt-0.5" />
                    <span>Easy intake questionnaire completed prior to your first session.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#3E707D] flex-shrink-0 mt-0.5" />
                    <span>Automated receipts issued immediately after sessions for insurance claims.</span>
                  </div>
                </div>
              </div>

              {/* Functional Jane App Booking Callout */}
              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DFE7E9]">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-[#648088]">
                    <span className="block font-bold text-[#1A3841]">Powered by Jane App</span>
                    <span className="text-[11px] text-[#2B606D] font-mono">
                      PIPEDA-Compliant Canadian Client Portal
                    </span>
                  </div>
                  <a 
                    href="https://highwatercounselling.janeapp.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#20444E] hover:bg-[#16353E] text-white font-semibold text-xs px-5 py-3 rounded-lg transition-all shadow-sm border border-[#2B5460] transform hover:-translate-y-0.5"
                  >
                    <Calendar className="w-3.5 h-3.5 text-[#C5DFE5]" />
                    <span>Book via Jane App</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Location & Google Maps Container */}
            <div id="hw-location" className="lg:col-span-5 rounded-2xl bg-white border border-[#E2EBEB] p-8 shadow-xs flex flex-col justify-between scroll-mt-28">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#EDF6F8] text-[#2C6270] text-xs font-mono font-semibold mb-4">
                  <MapPin className="w-3.5 h-3.5 text-[#A88B58]" />
                  <span>Google Local Setup</span>
                </div>
                <h3 className="text-xl font-bold text-[#1A3841] mb-2">Practice Location</h3>
                <p className="text-xs text-[#648088] mb-6">
                  Serving the town of Wembley, Grande Prairie County, and surrounding Peace River region.
                </p>

                {/* Interactive Embedded Google Map */}
                <div className="relative w-full h-52 rounded-xl overflow-hidden border border-[#DDD5C8] shadow-xs mb-4 bg-[#F2EDE4]">
                  <iframe
                    title="Highwater Counselling Practice Location - Wembley, Alberta"
                    src="https://maps.google.com/maps?q=Wembley%2C%20Alberta&t=&z=13&ie=UTF8&iwloc=&output=embed"
                    className="w-full h-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>
              </div>

              <div className="border-t border-[#F0F5F6] pt-4 mt-6 text-xs text-[#415F67] space-y-2">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#A88B58]" />
                  <a href="mailto:highwatercounselingcompany@gmail.com" className="hover:text-[#1A3841] font-medium transition-colors">
                    highwatercounselingcompany@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-2 text-[#648088]">
                  <Clock className="w-4 h-4 text-[#3E707D]" />
                  <span>Appointments Available In-Person & Secure Virtual Telehealth</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ─── Contact & Inquiry Form Section ─────────────────────────────────── */}
      <section id="hw-contact" className="py-20 border-b border-[#E4EAEB] bg-[#F4F1E8]/60 scroll-mt-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-[#A88B58] font-bold font-mono">
              Get In Touch
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-[#1A3841] mt-2 mb-3">
              Connect With Highwater Counselling
            </h2>
            <p className="text-sm text-[#4C6D75] max-w-lg mx-auto">
              Reach out directly to Derek Patten (Founder & Counsellor) with questions or general inquiries.
            </p>
          </div>

          <div className="rounded-2xl bg-white border border-[#E2EBEB] p-6 sm:p-10 shadow-sm">
            {inquirySubmitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10 space-y-4"
              >
                <div className="w-14 h-14 rounded-full bg-[#EDF6F8] text-[#2C6270] flex items-center justify-center mx-auto shadow-xs">
                  <Check className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-[#1A3841]">Inquiry Received</h3>
                <p className="text-sm text-[#415F67] max-w-md mx-auto">
                  Thank you for reaching out to Highwater Counselling Company. Derek Patten will respond to your message within 1–2 business days.
                </p>
                <button
                  onClick={() => setInquirySubmitted(false)}
                  className="text-xs text-[#2B606D] font-semibold underline underline-offset-2 mt-4"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-[#1A3841] uppercase tracking-wider mb-2">
                      Full Name *
                    </label>
                    <input 
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. John Doe"
                      className="w-full px-4 py-3 rounded-lg bg-[#FAF8F5] border border-[#D5E1E4] text-[#1A3841] text-sm focus:outline-none focus:border-[#20444E] focus:bg-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1A3841] uppercase tracking-wider mb-2">
                      Email Address *
                    </label>
                    <input 
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 rounded-lg bg-[#FAF8F5] border border-[#D5E1E4] text-[#1A3841] text-sm focus:outline-none focus:border-[#20444E] focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-[#1A3841] uppercase tracking-wider mb-2">
                      Primary Service of Interest
                    </label>
                    <select
                      value={formData.serviceInterest}
                      onChange={(e) => setFormData({ ...formData, serviceInterest: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-[#FAF8F5] border border-[#D5E1E4] text-[#1A3841] text-sm focus:outline-none focus:border-[#20444E] focus:bg-white transition-colors"
                    >
                      <option value="Faith & Values-Based Counselling">Faith & Values-Based Counselling</option>
                      <option value="Postmodern & Narrative Therapy">Postmodern & Narrative Therapy</option>
                      <option value="Men's Mental Health">Men&apos;s Mental Health &amp; Direction</option>
                      <option value="Couples & Relationships">Couples & Relationships</option>
                      <option value="Family & Youth Addiction Support">Family & Youth Addiction Support</option>
                      <option value="On-Site Mental Health Support">On-Site Mental Health Support</option>
                      <option value="General Inquiry">General Inquiry / Consultation</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1A3841] uppercase tracking-wider mb-2">
                      Preferred Format
                    </label>
                    <select
                      value={formData.preferredFormat}
                      onChange={(e) => setFormData({ ...formData, preferredFormat: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-[#FAF8F5] border border-[#D5E1E4] text-[#1A3841] text-sm focus:outline-none focus:border-[#20444E] focus:bg-white transition-colors"
                    >
                      <option value="In-Person (Wembley, AB)">In-Person (Wembley, AB Office)</option>
                      <option value="Virtual / Telehealth">Virtual / Telehealth (Alberta-Wide)</option>
                      <option value="On-Site Organization Support">On-Site Organization / Group Support</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1A3841] uppercase tracking-wider mb-2">
                    How Can We Support You?
                  </label>
                  <textarea 
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Briefly describe what brings you to counselling or any questions you have regarding booking..."
                    className="w-full px-4 py-3 rounded-lg bg-[#FAF8F5] border border-[#D5E1E4] text-[#1A3841] text-sm focus:outline-none focus:border-[#20444E] focus:bg-white transition-colors"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                  <div className="text-[11px] text-[#648088]">
                    <span className="font-bold text-[#1A3841]">Confidentiality Note:</span> Messages are transmitted securely. Please avoid submitting acute emergency medical data.
                  </div>
                  <button
                    type="submit"
                    className="w-full sm:w-auto bg-[#20444E] hover:bg-[#16353E] text-white font-semibold text-xs sm:text-sm px-7 py-3 rounded-lg transition-all shadow-sm border border-[#2B5460] flex items-center justify-center gap-2"
                  >
                    <span>Send Message to Practice</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ─── Emergency & Crisis Support Notice (Warm Grounded Banner) ─────────── */}
      <div className="bg-[#EFE9DD] border-b border-[#DCD3C3] py-4 text-center px-4 text-xs text-[#524430]">
        <p className="max-w-3xl mx-auto leading-relaxed">
          <strong>Immediate Crisis Support Notice:</strong> Highwater Counselling Company does not operate as a 24/7 emergency clinic. If you or someone you know is in immediate crisis, please call <strong>911</strong> or the <strong>Alberta Mental Health Help Line: 1-877-303-2642</strong> (24/7, toll-free) or dial <strong>988</strong> (Suicide Crisis Helpline).
        </p>
      </div>

      {/* ─── Highwater Dedicated Footer (Serene Slate-Teal Anchor) ───────────── */}
      <footer className="bg-[#1C3B45] py-12 text-slate-300 text-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <HighwaterLogo className="w-8 h-8" />
            <div>
              <span className="font-bold text-white tracking-wider uppercase block text-sm">
                Highwater Counselling Company
              </span>
              <span className="text-[11px] text-slate-400">
                Wembley, Alberta, Canada • Derek Patten, Counsellor
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-[11px]">
            <a href="#hw-about" className="hover:text-white transition-colors">About Derek</a>
            <a href="#hw-services" className="hover:text-white transition-colors">Services</a>
            <a href="#hw-faqs" className="hover:text-white transition-colors">FAQ</a>
            <a href="#hw-booking" className="hover:text-white transition-colors">Book Online</a>
            <a href="#hw-contact" className="hover:text-white transition-colors">Contact</a>
          </div>

          <div className="text-slate-400 text-[11px] text-center sm:text-right">
            &copy; {new Date().getFullYear()} Highwater Counselling Company. <br />
            All Rights Reserved.
          </div>
        </div>
      </footer>

    </div>
  )
}
