import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Calendar, ChevronDown } from 'lucide-react'
import { CONFIG } from '../config'
import { trackEvent } from '../analytics'

export default function Hero() {
    return (
        <section id="home" className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-20">
            {/* Dynamic Background */}
            <div className="absolute inset-0 bg-dark-950">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-pulse-slow"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[120px] animate-pulse-slow delay-1000"></div>
                <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-20 bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
            </div>

            <div className="section-container relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20 bg-primary/5 mb-8"
                >
                    <span className="w-2 h-2 rounded-full bg-primary-glow animate-pulse"></span>
                    <span className="text-sm font-medium text-primary-glow tracking-wide">Available for new projects</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-5xl md:text-7xl font-bold mb-6 leading-tight font-serif"
                >
                    Building <Typewriter text={["digital experiences", "scalable applications", "engaging interfaces"]} /> <br />
                    that people love.
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
                >
                    I help forward-thinking companies design and build high-performance web applications. fast, accessible, and scalable.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <a
                        href="#portfolio"
                        className="btn-primary flex items-center gap-2 group w-full sm:w-auto justify-center"
                    >
                        View My Work
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                    <a
                        href={CONFIG.CALENDLY_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-outline flex items-center gap-2 group w-full sm:w-auto justify-center"
                        onClick={() => { try { trackEvent('hero_book_consult_click') } catch { } }}
                    >
                        <Calendar className="w-4 h-4" />
                        Book Consult
                    </a>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.a
                href="#services"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-500 hover:text-white transition-colors animate-bounce"
            >
                <ChevronDown className="w-8 h-8" />
            </motion.a>
        </section>
    )
}

function Typewriter({ text }) {
    const [index, setIndex] = React.useState(0)
    const [subIndex, setSubIndex] = React.useState(0)
    const [reverse, setReverse] = React.useState(false)

    React.useEffect(() => {
        if (subIndex === text[index].length + 1 && !reverse) {
            setTimeout(() => setReverse(true), 1000)
            return
        }

        if (subIndex === 0 && reverse) {
            setReverse(false)
            setIndex((prev) => (prev + 1) % text.length)
            return
        }

        const timeout = setTimeout(() => {
            setSubIndex((prev) => prev + (reverse ? -1 : 1))
        }, Math.max(reverse ? 75 : subIndex === text[index].length ? 1000 : 150, parseInt(Math.random() * 350)))

        return () => clearTimeout(timeout)
    }, [subIndex, index, reverse, text])

    return (
        <span className="text-gradient min-w-[300px] inline-block">
            {text[index].substring(0, subIndex)}
            <span className="animate-pulse">|</span>
        </span>
    )
}
