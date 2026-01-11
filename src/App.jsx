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
import NotFound from './components/NotFound'

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
      document.querySelector('meta[name="description"]')?.setAttribute('content', 'Freelance web developer building modern, responsive web apps with React and JavaScript.')
    } else if (route === '#contact') {
      document.title = 'Contact — Tim Superville'
      document.querySelector('meta[name="description"]')?.setAttribute('content', 'Get in touch for your next web project. Available for freelance work and consultation.')
    }
  }, [route])

  // Simple route logic: check if it's one of our known main sections or a sub-route
  const isMainPage = !route || route === '#home' || route === '#services' || route === '#portfolio'
    || route === '#case-studies' || route === '#about' || route === '#contact'
  const isCaseStudy = route.startsWith('#case/')

  const showNotFound = !isMainPage && !isCaseStudy

  return (
    <div>
      {/* Skip link for keyboard users */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:bg-white focus:border focus:px-3 focus:py-2">Skip to content</a>

      {!showNotFound && <Header />}

      <main id="main-content">
        {(!route || route === '#home' || route === '#services' || route === '#portfolio'
          || route === '#case-studies' || route === '#about') && (
            <>
              <Hero />
              <Services />
              <Portfolio />
              <CaseStudies />
              <Testimonials />
              <About />
            </>
          )}

        {route === '#contact' && <Contact setToast={setToast} />}

        {isCaseStudy && (
          <CaseStudyDetail id={route.replace('#case/', '')} />
        )}

        {showNotFound && <NotFound />}
      </main>

      {!showNotFound && <Footer />}

      {toast && (
        <div className={`toast ${toast.type} show`} role="status" aria-live="polite">{toast.message}</div>
      )}
    </div>
  )
}
