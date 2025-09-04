import React from 'react'

function Header(){
  return (
    <header className="site-header">
      <div className="container nav-grid">
        <div className="logo">TS Code <span className="code">{`</>`}</span></div>
        <nav>
          <a href="#home">Home</a>
          <a href="#services">Services</a>
          <a href="#portfolio">Portfolio</a>
          <a href="#about">About</a>
          <a href="/contact.html">Contact</a>
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
          <a className="btn" href="/contact.html">Hire Me</a>
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
            <a href="#" title="GitHub">GitHub</a>
            <a href="#" title="LinkedIn">LinkedIn</a>
          </div>
        </div>
        <div>
          <img className="profile" src="/images/profile.jpg" alt="Tim Superville" />
        </div>
      </div>
    </section>
  )
}

function Footer(){
  return (
    <footer className="site-footer">
      <div className="container">
        <p>© 2025 Tim Superville</p>
        <nav className="footer-nav">
          <a href="/contact.html">Contact</a>
        </nav>
      </div>
    </footer>
  )
}

export default function App(){
  return (
    <div>
      <Header />
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <About />
      </main>
      <Footer />
    </div>
  )
}
