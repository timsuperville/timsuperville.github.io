import React, { useState, useEffect } from 'react'
import { trackEvent } from './analytics'

function Header(){
  return (
    <header className="bg-white shadow sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-5 flex items-center justify-between py-3">
        <a href="#home" className="flex items-center gap-3 font-bold text-lg" aria-label="Home — Tim Superville" title="Home — Tim Superville">
          <svg className="logo-mark" width="36" height="36" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
            <defs>
              <linearGradient id="g1" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0" stopColor="#4f46e5" />
                <stop offset="1" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
            <rect width="36" height="36" rx="6" fill="url(#g1)" />
            <g fill="#fff" fontFamily="sans-serif" fontWeight="700" fontSize="14" textAnchor="middle">
              <text x="18" y="22">TS</text>
            </g>
          </svg>
          <span className="brand">Tim Superville</span>
        </a>
        <nav role="navigation" aria-label="Primary" className="space-x-6 hidden md:block">
          <a href="#home" className="text-gray-700 hover:text-sky-600">Home</a>
          <a href="#services" className="text-gray-700 hover:text-sky-600">Services</a>
          <a href="#portfolio" className="text-gray-700 hover:text-sky-600">Portfolio</a>
          <a href="#about" className="text-gray-700 hover:text-sky-600">About</a>
          <a href="#contact" className="text-gray-700 hover:text-sky-600">Contact</a>
        </nav>
      </div>
    </header>
  )
}

function Hero(){
  return (
    <section id="home" className="relative text-white py-28 text-center bg-center bg-cover hero-figure" style={{backgroundImage:"url('/images/writingCode.jpg')"}}>
      <div className="max-w-4xl mx-auto px-5 relative">
        {/* Decorative SVG accent */}
  <svg className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-40" width="380" height="120" viewBox="0 0 600 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <defs>
            <linearGradient id="gA" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0" stopColor="#06b6d4" stopOpacity="0.8"/>
              <stop offset="1" stopColor="#4f46e5" stopOpacity="0.6"/>
            </linearGradient>
          </defs>
          <path d="M0 120 C150 20, 450 220, 600 100 L600 0 L0 0 Z" fill="url(#gA)" />
        </svg>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Hi, I'm Tim — I build web apps that grow businesses</h1>
        <p className="text-lg mb-6 opacity-90">I help small teams and businesses launch fast, accessible, and maintainable web apps using React and modern tooling.</p>
        <div className="flex justify-center gap-4">
          <a className="px-5 py-3 rounded-lg bg-sky-600 text-white" href="#portfolio">View Work</a>
          {/* Primary conversion CTA: book a consult. Replace with your scheduler URL if available. */}
          <a
              className="btn-accent"
              href="https://calendly.com/your-username/15min"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => { try { trackEvent('hero_book_consult_click') } catch(e){} }}
            >
              Book a free 15‑min consult
            </a>
        </div>
      </div>
    </section>
  )
}

function Services(){
  return (
    <section id="services" className="py-20">
      <div className="max-w-6xl mx-auto px-5">
        <h2 className="text-2xl font-bold mb-6">Services</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-semibold mb-2">Web Development</h3>
            <p className="text-sm text-gray-600">Custom web apps with React, Node.js and modern stacks.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-semibold mb-2">Responsive Design</h3>
            <p className="text-sm text-gray-600">Mobile-first designs that convert across devices.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-semibold mb-2">Performance</h3>
            <p className="text-sm text-gray-600">Optimized for speed, SEO and accessibility.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Portfolio(){
  return (
    <section id="portfolio" className="bg-white py-20">
      <div className="max-w-6xl mx-auto px-5">
        <h2 className="text-2xl font-bold mb-6">Recent Projects</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <article className="rounded-lg overflow-hidden shadow card-elevated">
            <img src="/images/writingCode.jpg" alt="E-commerce platform" className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="font-semibold">E-commerce Platform</h3>
              <p className="text-sm text-gray-600">Full-stack solution with payments and admin dashboard.</p>
            </div>
          </article>
          <article className="rounded-lg overflow-hidden shadow card-elevated">
            <img src="/images/background2.jpg" alt="Business site" className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="font-semibold">Business Website</h3>
              <p className="text-sm text-gray-600">Responsive marketing site with contact & SEO optimizations.</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}

function CaseStudies(){
  return (
    <section id="case-studies" className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-5">
        <h2 className="text-2xl font-bold mb-6">Case studies</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <article className="bg-white p-6 rounded-lg shadow card-elevated">
            <h3 className="font-semibold mb-2">E‑commerce revamp — 30% faster conversions</h3>
            <p className="text-sm text-gray-700 mb-3">Rebuilt checkout flow and improved speed, resulting in a 30% increase in conversions and 18% faster page loads.</p>
            <p className="text-xs text-gray-500">Tech: React, Node, Stripe, Serverless functions</p>
            <div className="mt-4">
              <a href="#case/ecommerce" className="text-sky-600" onClick={() => { try { trackEvent('case_open', { id: 'ecommerce' }) } catch(e){} }}>Read case study →</a>
            </div>
          </article>
          <article className="bg-white p-6 rounded-lg shadow card-elevated">
            <h3 className="font-semibold mb-2">Marketing site rebuild — SEO & accessibility</h3>
            <p className="text-sm text-gray-700 mb-3">Updated content and accessibility, improved structured data and technical SEO, increasing organic traffic by 40% in 3 months.</p>
            <p className="text-xs text-gray-500">Tech: React, Tailwind, Lighthouse optimizations</p>
            <div className="mt-4">
              <a href="#case/marketing" className="text-sky-600" onClick={() => { try { trackEvent('case_open', { id: 'marketing' }) } catch(e){} }}>Read case study →</a>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}

function CaseStudyDetail({ id }){
  // Basic router: show content for known case ids
  if (id === 'ecommerce'){
    return (
      <section id="case-ecommerce" className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-5">
          <a href="#home" className="text-sm text-sky-600">← Back</a>
          <h2 className="text-3xl font-bold mt-4 mb-3">E-commerce revamp</h2>
          <p className="text-gray-700 mb-4">Challenge: a slow, complicated checkout flow and high cart abandonment.</p>
          <h3 className="font-semibold">What I did</h3>
          <ul className="list-disc ml-6 mb-3 text-gray-700">
            <li>Rebuilt checkout to a single-step experience</li>
            <li>Optimized images and critical CSS for faster paint</li>
            <li>Added Stripe integration and retry handling for payments</li>
            <li>Implemented serverless webhooks for order processing</li>
          </ul>
          <h3 className="font-semibold">Results</h3>
          <p className="text-gray-700 mb-3">30% increase in conversions, average page load speed improved by 18%, and cart abandonment reduced by 22%.</p>
          <p className="text-xs text-gray-500">Tech: React, Node, Stripe, Serverless functions, Lighthouse optimizations</p>
        </div>
      </section>
    )
  }

  if (id === 'marketing'){
    return (
      <section id="case-marketing" className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-5">
          <a href="#home" className="text-sm text-sky-600">← Back</a>
          <h2 className="text-3xl font-bold mt-4 mb-3">Marketing site rebuild</h2>
          <p className="text-gray-700 mb-4">Challenge: outdated site with poor organic visibility and accessibility issues.</p>
          <h3 className="font-semibold">What I did</h3>
          <ul className="list-disc ml-6 mb-3 text-gray-700">
            <li>Rewrote content with SEO in mind and added structured data</li>
            <li>Improved heading structure and ARIA landmarks for accessibility</li>
            <li>Reduced bundle size and improved Lighthouse scores</li>
          </ul>
          <h3 className="font-semibold">Results</h3>
          <p className="text-gray-700 mb-3">Organic traffic increased 40% in three months; accessibility score improved to AA across pages.</p>
          <p className="text-xs text-gray-500">Tech: React, Tailwind, Lighthouse optimizations</p>
        </div>
      </section>
    )
  }

  return null
}

function About(){
  return (
    <section id="about" className="py-20">
      <div className="max-w-6xl mx-auto px-5 grid md:grid-cols-[1fr_320px] gap-10 items-center">
        <div>
          <h2 className="text-2xl font-bold mb-4">About Me</h2>
          <p className="text-gray-700 mb-3">I'm a passionate web developer focused on building useful, beautiful digital products. I specialize in JavaScript, React, and backend APIs.</p>
          <p className="text-gray-700 mb-4">Available for freelance projects, consultations, and long-term partnerships.</p>
          <div className="flex gap-4">
            <a href="https://github.com/timsuperville" title="GitHub" target="_blank" rel="noopener noreferrer" className="text-sky-600">GitHub</a>
            <a href="https://www.linkedin.com/in/timsuperville" title="LinkedIn" target="_blank" rel="noopener noreferrer" className="text-sky-600">LinkedIn</a>
          </div>
        </div>
        <div>
          <img className="w-full rounded-lg" src="/images/profile.jpg" alt="Tim Superville" />
        </div>
      </div>
    </section>
  )
}

function Testimonials(){
  const items = [
    { quote: 'Tim delivered our site on time and improved conversions dramatically.', author: 'Michelle R., CEO' },
    { quote: 'Clear communication and excellent code quality — highly recommend.', author: 'Janessa L., Product Owner' }
  ]

  return (
    <section id="testimonials" className="py-12 bg-white">
      <div className="max-w-4xl mx-auto px-5 text-center">
        <h2 className="text-2xl font-bold mb-4">Testimonials</h2>
        <div className="space-y-4">
          {items.map((t,i) => (
            <blockquote key={i} className="p-4 border rounded">
              <p className="text-gray-700 mb-2">“{t.quote}”</p>
              <footer className="text-sm text-gray-500">— {t.author}</footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact(props){
  // Endpoints and links (override via .env: VITE_FORMSPREE_ENDPOINT, VITE_CALENDLY_URL, VITE_CONTACT_EMAIL)
  const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT || 'https://formspree.io/f/your-form-id'
  const CALENDLY_URL = import.meta.env.VITE_CALENDLY_URL || 'https://calendly.com/your-username/15min'
  const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL || 'hello@yourdomain.com'

  const [firstName, setFirstName] = React.useState('')
  const [lastName, setLastName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [projectType, setProjectType] = React.useState('')
  const [budgetRange, setBudgetRange] = React.useState('')
  const [website, setWebsite] = React.useState('') // honeypot (bots often fill this)
  const [message, setMessage] = React.useState('')
  const [submitting, setSubmitting] = React.useState(false)
  const [status, setStatus] = React.useState(null) // 'success' | 'error' | null
  const [errorMessage, setErrorMessage] = React.useState('')
  const [startTime] = React.useState(() => Date.now())

  const validate = () => {
    if (!firstName.trim() || !lastName.trim()) return 'Please provide your name.'
    if (!email.trim()) return 'Please provide an email address.'
    // simple email check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Please enter a valid email.'
    if (!message.trim() || message.trim().length < 10) return 'Please provide a short description (10+ characters).'
    return ''
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus(null)
    setErrorMessage('')

    const v = validate()
    if (v) { setErrorMessage(v); setStatus('error'); return }

    // Honeypot check: if the hidden website field is filled, treat as spam and silently succeed
    if (website && website.trim().length > 0) {
      setStatus('success')
      setSubmitting(false)
      return
    }

    // Timing check: if submitted too quickly (less than 2s), likely a bot
    if (Date.now() - startTime < 2000) {
      setStatus('success')
      setSubmitting(false)
      return
    }

    setSubmitting(true)
    try {
      const formData = new FormData()
      formData.append('first_name', firstName)
      formData.append('last_name', lastName)
      formData.append('email', email)
         formData.append('budget_range', budgetRange)
      formData.append('project_type', projectType)
      formData.append('message', message)

      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      })

      if (res.ok) {
        setStatus('success')
        setFirstName('')
        setLastName('')
        setEmail('')
        setProjectType('')
        setMessage('')
        try { trackEvent('contact_submit', { result: 'success' }) } catch(e){}
        if (props && typeof props.setToast === 'function'){
          props.setToast({ type: 'success', message: 'Message sent — thanks!' })
          setTimeout(() => props.setToast(null), 5000)
        }
  } else {
        const data = await res.json().catch(()=>({}))
        const msg = data?.error || 'Submission failed. Please try again later.'
        setErrorMessage(msg)
        setStatus('error')
        try { trackEvent('contact_submit', { result: 'error' }) } catch(e){}
      }
    } catch (err) {
      setErrorMessage('Could not send message — check your network and try again.')
      setStatus('error')
      try { trackEvent('contact_submit', { result: 'error' }) } catch(e){}
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-12 bg-gray-50">
      <div className="max-w-3xl mx-auto px-5">
        <h2 className="text-2xl font-semibold mb-4">Contact</h2>
           <div className="mb-4 flex gap-3">
             <a className="inline-flex items-center px-4 py-2 bg-sky-600 text-white rounded" href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" onClick={() => { try { trackEvent('contact_book_consult_click') } catch(e){} }}>Book a free 15‑min consult</a>
             <a className="inline-flex items-center px-4 py-2 border rounded" href={`mailto:${CONTACT_EMAIL}?subject=Interested%20in%20working%20together`}>Email me</a>
           </div>
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow" noValidate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="first_name" className="block text-sm text-gray-700 mb-1">First Name *</label>
              <input id="first_name" name="first_name" value={firstName} onChange={e=>setFirstName(e.target.value)} required className="w-full border px-3 py-2 rounded" />
            </div>
            <div>
              <label htmlFor="last_name" className="block text-sm text-gray-700 mb-1">Last Name *</label>
              <input id="last_name" name="last_name" value={lastName} onChange={e=>setLastName(e.target.value)} required className="w-full border px-3 py-2 rounded" />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm text-gray-700 mb-1">Email *</label>
            <input id="email" name="email" type="email" value={email} onChange={e=>setEmail(e.target.value)} required className="w-full border px-3 py-2 rounded" />
          </div>

          <div>
                  <label htmlFor="project_type" className="block text-sm text-gray-700 mb-1">Project Type</label>
                  <select id="project_type" name="project_type" value={projectType} onChange={e=>setProjectType(e.target.value)} className="w-full border px-3 py-2 rounded">
              <option value="">Select</option>
              <option value="web-app">Web Application</option>
              <option value="website">Business Website</option>
              <option value="ecommerce">E-commerce</option>
              <option value="consultation">Consultation</option>
            </select>
          </div>

                <div>
                  <label htmlFor="budget_range" className="block text-sm text-gray-700 mb-1">Budget range (optional)</label>
                  <select id="budget_range" name="budget_range" value={budgetRange} onChange={e=>setBudgetRange(e.target.value)} className="w-full border px-3 py-2 rounded">
                    <option value="">Select</option>
                    <option value="<1k">Under $1,000</option>
                    <option value="1k-5k">$1,000–$5,000</option>
                    <option value="5k-20k">$5,000–$20,000</option>
                    <option value=">20k">$20,000+</option>
                  </select>
                </div>

          {/* Honeypot field (hidden) */}
          <div style={{display:'none'}} aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input id="website" name="website" value={website} onChange={e=>setWebsite(e.target.value)} />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm text-gray-700 mb-1">Project Details *</label>
            <textarea id="message" name="message" rows="6" value={message} onChange={e=>setMessage(e.target.value)} required className="w-full border px-3 py-2 rounded"></textarea>
          </div>

          <div aria-live="polite" className="form-status">
            {status === 'success' && <div className="text-sm text-green-600">Thanks — your message was sent. I usually reply within 1–2 business days.</div>}
            {status === 'error' && errorMessage && <div className="text-sm text-red-600">{errorMessage}</div>}
          </div>

          <div>
            <button type="submit" className="inline-flex items-center px-4 py-2 bg-sky-600 text-white rounded" disabled={submitting}>{submitting ? 'Sending…' : 'Send Message'}</button>
          </div>
        </form>
      </div>
    </section>
  )
}

import { isOptedOut, optIn, optOut } from './analytics'

function Footer(){
  const [optedOut, setOptedOut] = React.useState(isOptedOut())

  return (
    <footer className="bg-white border-t py-6">
      <div className="max-w-6xl mx-auto px-5 text-center">
        <p className="text-sm text-gray-600">© 2025 Tim Superville</p>
        <nav className="mt-2">
          <a href="#contact" className="text-sky-600">Contact</a>
        </nav>
        <div className="mt-3">
          <span className="mr-2 text-sm text-gray-600">Analytics:</span>
          {optedOut ? (
            <button className="px-3 py-1 border rounded" onClick={() => { optIn(); setOptedOut(false) }}>Enable</button>
          ) : (
            <button className="px-3 py-1 border rounded" onClick={() => { optOut(); setOptedOut(true) }}>Disable</button>
          )}
        </div>
      </div>
    </footer>
  )
}

export default function App(){
  const [route, setRoute] = useState(window.location.hash || '#home')
  const [toast, setToast] = useState(null)

  useEffect(() => {
    const onHash = () => setRoute(window.location.hash || '#home')
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  return (
    <div>
      {/* Skip link for keyboard users */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:bg-white focus:border focus:px-3 focus:py-2">Skip to content</a>
      <Header />
      <main>
        {route === '#home' && (
          <>
              <Hero />
              <Services />
              <Portfolio />
              <CaseStudies />
              <Testimonials />
              <About />
          </>
        )}
        {route.startsWith('#case/') && (
          <CaseStudyDetail id={route.replace('#case/','')} />
        )}
        {route === '#contact' && <Contact setToast={setToast} />}
      </main>
      <Footer />
      {toast && (
        <div className={`toast ${toast.type} show`} role="status" aria-live="polite">{toast.message}</div>
      )}
    </div>
  )
}
