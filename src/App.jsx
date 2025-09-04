import React, { useState, useEffect } from 'react'

function Header(){
  return (
    <header className="site-header">
      <div className="container nav-grid">
        <a href="#home" className="logo" aria-label="Home — Tim Superville" title="Home — Tim Superville">
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
        <nav role="navigation" aria-label="Primary">
          <a href="#home">Home</a>
          <a href="#services">Services</a>
          <a href="#portfolio">Portfolio</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
    </header>
  )
}

function Hero(){
  return (
    <section id="home" className="hero">
      <div className="container hero-inner">
        <h1>Hi, I'm Tim — Freelance Web Developer</h1>
        <p>I build modern, responsive web applications that help businesses grow.</p>
        <div className="cta">
          <a className="btn primary" href="#portfolio">View Work</a>
          <a className="btn" href="#contact">Hire Me</a>
        </div>
      </div>
    </section>
  )
}

function Services(){
  return (
    <section id="services" className="section">
      <div className="container">
        <h2>Services</h2>
        <div className="grid-3">
          <div className="card">
            <h3>Web Development</h3>
            <p>Custom web apps with React, Node.js and modern stacks.</p>
          </div>
          <div className="card">
            <h3>Responsive Design</h3>
            <p>Mobile-first designs that convert across devices.</p>
          </div>
          <div className="card">
            <h3>Performance</h3>
            <p>Optimized for speed, SEO and accessibility.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Portfolio(){
  return (
    <section id="portfolio" className="section alt">
      <div className="container">
        <h2>Recent Projects</h2>
        <div className="grid-2">
          <article className="portfolio-item">
            <img src="/images/writingCode.jpg" alt="E-commerce platform" />
            <h3>E-commerce Platform</h3>
            <p>Full-stack solution with payments and admin dashboard.</p>
          </article>
          <article className="portfolio-item">
            <img src="/images/background2.jpg" alt="Business site" />
            <h3>Business Website</h3>
            <p>Responsive marketing site with contact & SEO optimizations.</p>
          </article>
        </div>
      </div>
    </section>
  )
}

function About(){
  return (
    <section id="about" className="section">
      <div className="container about-grid">
        <div>
          <h2>About Me</h2>
          <p>I'm a passionate web developer focused on building useful, beautiful digital products. I specialize in JavaScript, React, and backend APIs.</p>
          <p>Available for freelance projects, consultations, and long-term partnerships.</p>
          <div className="social">
            <a href="https://github.com/timsuperville" title="GitHub" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/timsuperville" title="LinkedIn" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </div>
        <div>
          <img className="profile" src="/images/profile.jpg" alt="Tim Superville" />
        </div>
      </div>
    </section>
  )
}

function Contact(){
  // Formspree endpoint placeholder - replace with your endpoint
  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/your-form-id'

  return (
    <section id="contact" className="section alt">
      <div className="container">
        <h2>Contact</h2>
        <form action={FORMSPREE_ENDPOINT} method="POST" className="contact-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="first_name">First Name *</label>
              <input id="first_name" name="first_name" required />
            </div>
            <div className="form-group">
              <label htmlFor="last_name">Last Name *</label>
              <input id="last_name" name="last_name" required />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input id="email" name="email" type="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="project_type">Project Type</label>
            <select id="project_type" name="project_type">
              <option value="">Select</option>
              <option value="web-app">Web Application</option>
              <option value="website">Business Website</option>
              <option value="ecommerce">E-commerce</option>
              <option value="consultation">Consultation</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="message">Project Details *</label>
            <textarea id="message" name="message" rows="6" required></textarea>
          </div>
          <button type="submit" className="btn primary">Send Message</button>
        </form>
      </div>
    </section>
  )
}

import { isOptedOut, optIn, optOut } from './analytics'

function Footer(){
  const [optedOut, setOptedOut] = React.useState(isOptedOut())

  return (
    <footer className="site-footer">
      <div className="container">
        <p>© 2025 Tim Superville</p>
        <nav className="footer-nav">
          <a href="#contact">Contact</a>
        </nav>
        <div style={{marginTop:12}}>
          <span style={{marginRight:8}}>Analytics:</span>
          {optedOut ? (
            <button className="btn" onClick={() => { optIn(); setOptedOut(false) }}>Enable</button>
          ) : (
            <button className="btn" onClick={() => { optOut(); setOptedOut(true) }}>Disable</button>
          )}
        </div>
      </div>
    </footer>
  )
}

export default function App(){
  const [route, setRoute] = useState(window.location.hash || '#home')

  useEffect(() => {
    const onHash = () => setRoute(window.location.hash || '#home')
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  return (
    <div>
      <Header />
      <main>
        {route === '#home' && (
          <>
            <Hero />
            <Services />
            <Portfolio />
            <About />
          </>
        )}
        {route === '#contact' && <Contact />}
      </main>
      <Footer />
    </div>
  )
}
