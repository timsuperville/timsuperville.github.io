import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from './components/Header'
import Hero from './components/Hero'
import Services from './components/Services'
import Portfolio from './components/Portfolio'
import CaseStudies from './components/CaseStudies'
import CaseStudyDetail from './components/CaseStudyDetail'
import TechMatrix from './components/TechMatrix'
import ProjectEstimator from './components/ProjectEstimator'
import About from './components/About'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import NotFound from './components/NotFound'
import Resume from './components/Resume'
import PrivacyPolicy from './components/PrivacyPolicy'
import ClientIntake from './components/ClientIntake'
import ScrollProgress from './components/ScrollProgress'
import BackToTop from './components/BackToTop'
import CommandPalette from './components/CommandPalette'
import CookieBanner from './CookieBanner'

export default function App() {
  const [route, setRoute] = useState(window.location.hash || '#home')
  const [toast, setToast] = useState(null)
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false)
  const [estimateData, setEstimateData] = useState(null)
  
  const [currentAccent, setCurrentAccent] = useState(() => {
    try {
      return localStorage.getItem('portfolio_accent') || 'cyan'
    } catch {
      return 'cyan'
    }
  })

  // Sync accent attribute with root document
  useEffect(() => {
    document.documentElement.setAttribute('data-accent', currentAccent)
    try {
      localStorage.setItem('portfolio_accent', currentAccent)
    } catch { }
  }, [currentAccent])

  const handleCycleAccent = () => {
    const accents = ['cyan', 'violet', 'emerald', 'amber']
    const nextIdx = (accents.indexOf(currentAccent) + 1) % accents.length
    const next = accents[nextIdx]
    setCurrentAccent(next)
    setToast({ type: 'success', message: `Theme accent switched to ${next.toUpperCase()}!` })
    setTimeout(() => setToast(null), 2500)
  }

  useEffect(() => {
    const onHash = () => setRoute(window.location.hash || '#home')
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  useEffect(() => {
    if (!route || route === '#home' || route === '') {
      document.title = 'Tim Superville | Web Developer & Full Stack Engineer'
      document.querySelector('meta[name="description"]')?.setAttribute(
        'content', 
        'Freelance web developer and full stack engineer based in Northern Alberta. Building clean, fast, and dependable websites and web applications.'
      )
    } else if (route === '#contact') {
      document.title = 'Contact & Inquiries — Tim Superville'
      document.querySelector('meta[name="description"]')?.setAttribute(
        'content', 
        'Get in touch with Tim Superville to discuss your website or web application project.'
      )
    } else if (route === '#resume') {
      document.title = 'Interactive Resume — Tim Superville'
    } else if (route === '#privacy') {
      document.title = 'Privacy Policy — Tim Superville'
    } else if (route === '#intake' || route === '#client-intake' || route === '#start-project' || route === '#planner') {
      document.title = 'Website Project Planner & Discovery — Tim Superville'
      document.querySelector('meta[name="description"]')?.setAttribute(
        'content', 
        'Website project planner and discovery questionnaire. Share your goals, desired features, and timeline with Tim Superville.'
      )
    }
  }, [route])

  // Route logic: identify main single-page navigation vs dedicated views
  const isMainPage = !route || route === '#home' || route === '#services' || route === '#portfolio'
    || route === '#case-studies' || route === '#tech-stack' || route === '#estimator' 
    || route === '#testimonials' || route === '#principles' || route === '#about' || route === '#contact'
  
  const isCaseStudy = route.startsWith('#case/')
  const isIntake = route === '#intake' || route === '#client-intake' || route === '#start-project' || route === '#planner'
  const showNotFound = !isMainPage && !isCaseStudy && route !== '#resume' && route !== '#privacy' && !isIntake

  return (
    <div className="min-h-screen bg-dark-950 text-slate-100 flex flex-col justify-between selection:bg-primary-glow/30 selection:text-white">
      <ScrollProgress />

      {/* Skip link for keyboard accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded-xl focus:font-mono focus:text-xs"
      >
        Skip to main content
      </a>

      {!showNotFound && (
        <Header 
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          currentAccent={currentAccent}
          onCycleAccent={handleCycleAccent}
        />
      )}

      <main id="main-content" className="flex-grow">
        <React.Suspense fallback={<div className="h-screen w-full flex items-center justify-center text-slate-500 font-mono text-sm">Initializing system...</div>}>
          <AnimatePresence mode="wait">
            {isMainPage && (
              <motion.div
                key="home-flow"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <Hero />
                <Services />
                <Portfolio />
                <CaseStudies />
                <TechMatrix />
                <ProjectEstimator onSelectEstimate={setEstimateData} />
                <Testimonials />
                <About />
                <Contact setToast={setToast} estimateData={estimateData} />
              </motion.div>
            )}

            {isCaseStudy && (
              <motion.div
                key="case-study-detail"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <CaseStudyDetail id={route.replace('#case/', '')} />
              </motion.div>
            )}

            {route === '#resume' && (
              <motion.div
                key="resume-view"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <Resume />
              </motion.div>
            )}

            {route === '#privacy' && (
              <motion.div
                key="privacy-view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <PrivacyPolicy />
              </motion.div>
            )}

            {isIntake && (
              <motion.div
                key="intake-view"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <ClientIntake setToast={setToast} />
              </motion.div>
            )}

            {showNotFound && (
              <motion.div
                key="not-found-view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <NotFound />
              </motion.div>
            )}
          </AnimatePresence>
        </React.Suspense>
      </main>

      {!showNotFound && <Footer />}

      {/* Global Command Palette */}
      <CommandPalette 
        isOpen={isCommandPaletteOpen}
        setIsOpen={setIsCommandPaletteOpen}
        currentAccent={currentAccent}
        setCurrentAccent={setCurrentAccent}
        setToast={setToast}
      />

      {/* Utilities */}
      <CookieBanner />
      <BackToTop />

      {/* Global Toast Notification */}
      {toast && (
        <div 
          className="fixed bottom-6 right-6 z-50 p-4 rounded-xl bg-dark-900 border border-primary/30 text-white shadow-2xl shadow-black/80 flex items-center gap-3 animate-in slide-in-from-bottom-5 duration-300 font-mono text-xs"
          role="status" 
          aria-live="polite"
        >
          <span className="w-2 h-2 rounded-full bg-primary-glow animate-pulse"></span>
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  )
}
