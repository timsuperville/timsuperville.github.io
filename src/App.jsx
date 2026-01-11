import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
import ScrollProgress from './components/ScrollProgress'
import BackToTop from './components/BackToTop'

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
      <ScrollProgress />
      {/* Skip link for keyboard users */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:bg-white focus:border focus:px-3 focus:py-2">Skip to content</a>

      {!showNotFound && <Header />}

      <main id="main-content">
        <React.Suspense fallback={<div className="h-screen w-full flex items-center justify-center text-slate-500">Loading...</div>}>
          <AnimatePresence mode="wait">
            {(!route || route === '#home' || route === '#services' || route === '#portfolio'
              || route === '#case-studies' || route === '#about') && (
                <motion.div
                  key="home"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                >
                  <Hero />
                  <Services />
                  <Portfolio />
                  <CaseStudies />
                  <Testimonials />
                  <About />
                </motion.div>
              )}

            {route === '#contact' && (
              <motion.div
                key="contact"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Contact setToast={setToast} />
              </motion.div>
            )}

            {isCaseStudy && (
              <motion.div
                key="case-study"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <CaseStudyDetail id={route.replace('#case/', '')} />
              </motion.div>
            )}

            {showNotFound && (
              <motion.div
                key="404"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <NotFound />
              </motion.div>
            )}
          </AnimatePresence>
        </React.Suspense>
      </main>

      {!showNotFound && <Footer />}

      <BackToTop />

      {toast && (
        <div className={`toast ${toast.type} show`} role="status" aria-live="polite">{toast.message}</div>
      )}
    </div>
  )
}
