import { motion } from 'framer-motion'
import { ArrowLeft, Home } from 'lucide-react'

export default function NotFound() {
    return (
        <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-dark-950 px-6 text-center">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] animate-pulse-slow"></div>
                <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-10 bg-center"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 max-w-lg"
            >
                <h1 className="text-9xl font-bold bg-gradient-to-r from-primary-glow to-secondary-glow bg-clip-text text-transparent mb-4 font-serif">404</h1>
                <h2 className="text-3xl font-bold text-white mb-6">Page Not Found</h2>
                <p className="text-slate-400 text-lg mb-10">
                    Oops! The page you're looking for doesn't exist or has been moved.
                    Let's get you back on track.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="#home" className="btn-primary flex items-center gap-2 justify-center">
                        <Home className="w-4 h-4" /> Go Home
                    </a>
                    <a href="#contact" className="btn-outline flex items-center gap-2 justify-center">
                        Contact Me <ArrowLeft className="w-4 h-4 rotate-180" />
                    </a>
                </div>
            </motion.div>
        </section>
    )
}
