import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Calendar, Calculator, ChevronDown } from 'lucide-react'
import { CONFIG } from '../config'
import { trackEvent } from '../analytics'

export default function Hero() {
    return (
        <section id="home" className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16">
            {/* Dynamic Mesh Aurora Background */}
            <div className="absolute inset-0 bg-dark-950 pointer-events-none">
                <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-primary/15 rounded-full blur-[140px] animate-pulse-slow"></div>
                <div className="absolute bottom-10 left-1/4 w-[600px] h-[600px] bg-secondary/15 rounded-full blur-[140px] animate-pulse-slow delay-1000"></div>
                <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-15 bg-center [mask-image:radial-gradient(ellipse_at_center,white_30%,transparent_75%)]"></div>
            </div>

            <div className="section-container relative z-10 text-center flex flex-col items-center">
                {/* Live Availability Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass border border-primary/30 bg-primary/5 mb-8 shadow-glow-primary"
                >
                    <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                    </span>
                    <span className="text-xs sm:text-sm font-mono font-medium text-slate-200 tracking-wide">
                        Available for New Projects & Freelance Contracts
                    </span>
                </motion.div>

                {/* Primary Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.15 }}
                    className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl leading-[1.1] sm:leading-[1.15]"
                >
                    Building <Typewriter text={["fast websites", "custom web applications", "dependable digital tools"]} /> <br className="hidden sm:inline" />
                    that work for you.
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    className="text-base sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed font-body"
                >
                    Based in Northern Alberta, Canada. I build fast, clean, and reliable websites and web applications for businesses that want direct communication, honest timelines, and zero guesswork.
                </motion.p>

                {/* CTA Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.45 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md sm:max-w-none mb-16"
                >
                    <a
                        href="#portfolio"
                        className="btn-primary flex items-center justify-center gap-2 group w-full sm:w-auto"
                    >
                        <span>Explore Selected Work</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                    <a
                        href="#estimator"
                        className="btn-outline flex items-center justify-center gap-2 group w-full sm:w-auto"
                    >
                        <Calculator className="w-4 h-4 text-secondary-glow" />
                        <span>Estimate Your Project</span>
                    </a>
                    <a
                        href={CONFIG.CALENDLY_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-white/[0.04] transition-colors w-full sm:w-auto"
                        onClick={() => { try { trackEvent('hero_book_consult_click') } catch { } }}
                    >
                        <Calendar className="w-4 h-4 text-primary-glow" />
                        <span>Book 15m Call</span>
                    </a>
                </motion.div>

                {/* Proof Metrics Band */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.6 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 w-full max-w-3xl glass-card p-4 sm:p-6 border border-white/5"
                >
                    <div className="text-center">
                        <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">6+</div>
                        <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-mono">Years Experience</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl sm:text-3xl font-extrabold text-primary-glow font-mono">+30%</div>
                        <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-mono">Conversion Uplift</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">100/100</div>
                        <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-mono">Core Web Vitals</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl sm:text-3xl font-extrabold text-secondary-glow font-mono">100%</div>
                        <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-mono">WCAG AA Accessible</div>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.a
                href="#services"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 text-slate-500 hover:text-white transition-colors animate-bounce p-2"
                aria-label="Scroll down to services section"
            >
                <ChevronDown className="w-6 h-6" />
            </motion.a>
        </section>
    )
}

function Typewriter({ text }) {
    const [index, setIndex] = useState(0)
    const [subIndex, setSubIndex] = useState(() => text[0].length)
    const [reverse, setReverse] = useState(false)

    useEffect(() => {
        if (subIndex === text[index].length && !reverse) {
            const holdTimer = setTimeout(() => setReverse(true), 2400)
            return () => clearTimeout(holdTimer)
        }

        if (subIndex === 0 && reverse) {
            const resetTimer = setTimeout(() => {
                setReverse(false)
                setIndex((prev) => (prev + 1) % text.length)
            }, 200)
            return () => clearTimeout(resetTimer)
        }

        const timeout = setTimeout(() => {
            setSubIndex((prev) => prev + (reverse ? -1 : 1))
        }, reverse ? 45 : 75)

        return () => clearTimeout(timeout)
    }, [subIndex, index, reverse, text])

    return (
        <span className="text-gradient inline-block min-w-[280px] sm:min-w-[340px]">
            {text[index].substring(0, subIndex)}
            <span className="animate-pulse text-primary-glow">|</span>
        </span>
    )
}
