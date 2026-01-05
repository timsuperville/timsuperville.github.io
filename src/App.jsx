import { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Services from './components/Services'
import Portfolio from './components/Portfolio'
import CaseStudies from './components/CaseStudies'
import CaseStudyDetail from './components/CaseStudyDetail'
import About from './components/About'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const [route, setRoute] = useState(window.location.hash || '#home')
  const [toast, setToast] = useState(null)

  useEffect(() => {
    const onHash = () => setRoute(window.location.hash || '#home')
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  useEffect(() => {
    if (route === '#home' || route === '') {
      document.title = 'Tim Superville — Portfolio'
    } else if (route === '#contact') {
      document.title = 'Contact — Tim Superville'
    }
  }, [route])

  return (
    <div>
      {/* Skip link for keyboard users */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:bg-white focus:border focus:px-3 focus:py-2">Skip to content</a>
      <Header />
      <main id="main-content">
        {(!route.startsWith('#case/') && route !== '#contact') && (
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
          <CaseStudyDetail id={route.replace('#case/', '')} />
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
