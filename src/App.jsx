import React, { useState } from 'react'
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
import HighwaterDraft from './components/highwater/HighwaterDraft'
import HighwaterDraftV2 from './components/highwater/v2/HighwaterDraftV2'
import ScrollProgress from './components/ScrollProgress'
import BackToTop from './components/BackToTop'
import CommandPalette from './components/CommandPalette'
import CookieBanner from './components/CookieBanner'
import { useRoute } from './hooks/useRoute'
import { useAccent } from './hooks/useAccent'
import { ToastProvider } from './context/ToastContext'
import { useToast } from './hooks/useToast'

function AppContent() {
  const { route, isMainPage, isCaseStudy, isIntake, isHighwater, isHighwaterV2, isAnyHighwater, showNotFound } = useRoute()
  const { currentAccent, setCurrentAccent, cycleAccent } = useAccent()
  const { setToast } = useToast()
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false)
  const [estimateData, setEstimateData] = useState(null)

  const handleCycleAccent = () => {
    const next = cycleAccent()
    setToast({ type: 'success', message: `Theme accent switched to ${next.toUpperCase()}!` })
  }

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

      {!showNotFound && !isAnyHighwater && (
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

            {isHighwater && (
              <motion.div
                key="highwater-draft-view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <HighwaterDraft />
              </motion.div>
            )}

            {isHighwaterV2 && (
              <motion.div
                key="highwater-v2-draft-view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <HighwaterDraftV2 />
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

      {!showNotFound && !isAnyHighwater && <Footer />}

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
    </div>
  )
}

export default function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  )
}
