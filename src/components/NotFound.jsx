import React from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Home } from 'lucide-react'

export default function NotFound() {
    return (
        <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-dark-950 px-6 text-center">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[140px] animate-pulse-slow"></div>
                <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-10 bg-center"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative z-10 max-w-lg glass-card p-8 sm:p-12 border border-white/10"
            >
                <div className="text-8xl sm:text-9xl font-extrabold bg-gradient-to-r from-primary-glow to-secondary-glow bg-clip-text text-transparent mb-4 font-mono">
                    404
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4">Route Not Found</h1>
                <p className="text-slate-400 text-sm sm:text-base mb-8 leading-relaxed">
                    The requested path does not exist in the routing tree or has been relocated. Return to the home overview or jump to contact.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <a href="#home" className="btn-primary flex items-center gap-2 justify-center text-xs font-mono uppercase">
                        <Home className="w-4 h-4" /> 
                        <span>Return Home</span>
                    </a>
                    <a href="#contact" className="btn-outline flex items-center gap-2 justify-center text-xs font-mono uppercase">
                        <span>Contact Me</span> 
                        <ArrowLeft className="w-4 h-4 rotate-180" />
                    </a>
                </div>
            </motion.div>
        </section>
    )
}
