import React from 'react'
import { motion } from 'framer-motion'

export default function About() {
    return (
        <section id="about" className="py-20">
            <div className="max-w-6xl mx-auto px-5 grid md:grid-cols-[1fr_320px] gap-10 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-2xl font-bold mb-4">About Me</h2>
                    <p className="text-gray-700 mb-3">I&apos;m a passionate web developer focused on building useful, beautiful digital products. I specialize in JavaScript, React, and backend APIs.</p>
                    <p className="text-gray-700 mb-4">Available for freelance projects, consultations, and long-term partnerships.</p>
                    <div className="flex gap-4">
                        <a href="https://github.com/timsuperville" title="GitHub" target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:text-sky-800 transition-colors">GitHub</a>
                        <a href="https://www.linkedin.com/in/timsuperville" title="LinkedIn" target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:text-sky-800 transition-colors">LinkedIn</a>
                    </div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <img className="w-full rounded-lg shadow-lg" src="/images/profile.jpg" alt="Tim Superville" loading="lazy" />
                </motion.div>
            </div>
        </section>
    )
}
