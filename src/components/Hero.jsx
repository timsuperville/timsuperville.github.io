import React from 'react'
import { motion } from 'framer-motion'
import { trackEvent } from '../analytics'
import { CONFIG } from '../config'

export default function Hero() {
    return (
        <section id="home" className="relative text-white py-28 text-center bg-center bg-cover hero-figure" style={{ backgroundImage: "url('/images/writingCode.jpg')" }}>
            <div className="max-w-4xl mx-auto px-5 relative">
                {/* Decorative SVG accent */}

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-4xl md:text-5xl font-extrabold mb-4"
                >
                    Hi, I&apos;m Tim — I build web apps that grow businesses
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 0.9, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-lg mb-6 opacity-90"
                >
                    I help small teams and businesses launch fast, accessible, and maintainable web apps using React and modern tooling.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex justify-center gap-4"
                >
                    <a className="px-5 py-3 rounded-lg bg-sky-600 text-white hover:bg-sky-500 transition-colors" href="#portfolio">View Work</a>
                    {/* Primary conversion CTA: book a consult. Replace with your scheduler URL if available. */}
                    <a
                        className="px-5 py-3 rounded-lg bg-white text-sky-900 font-bold border border-sky-200 hover:bg-gray-50 transition-colors shadow-lg"
                        href={CONFIG.CALENDLY_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => { try { trackEvent('hero_book_consult_click') } catch (e) { } }}
                    >
                        Book a free 15‑min consult
                    </a>
                </motion.div>
            </div>
        </section>
    )
}
