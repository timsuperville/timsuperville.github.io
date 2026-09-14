import React from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'

export default function PrivacyPolicy() {
    return (
        <section className="py-32 min-h-screen bg-dark-950 relative overflow-hidden">
            <div className="max-w-4xl mx-auto px-6 relative z-10">
                <a 
                    href="#home" 
                    className="inline-flex items-center gap-2 text-sm font-mono text-slate-400 hover:text-white mb-8 transition-colors group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
                    <span>Back to Home</span>
                </a>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card p-8 md:p-12 text-slate-300 border border-white/10"
                >
                    <h1 className="text-3xl font-bold text-white mb-8">Privacy Policy</h1>

                    <div className="space-y-6 text-sm sm:text-base leading-relaxed">
                        <p className="text-xs font-mono text-slate-500">Last updated: September 2026</p>

                        <h2 className="text-xl font-bold text-white mt-8">1. Introduction</h2>
                        <p>
                            Welcome to <strong>Tim Superville&apos;s Portfolio</strong> (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;). We respect your privacy and are committed to protecting your personal data. This privacy policy informs you how we process personal data when you visit our website and how privacy rights protect you.
                        </p>

                        <h2 className="text-xl font-bold text-white mt-8">2. Data We Collect</h2>
                        <p>We only collect data provided directly by you through our contact and consultation inquiry form:</p>
                        <ul className="list-disc pl-5 space-y-2 text-slate-400">
                            <li><strong className="text-slate-200">Identity Data:</strong> First and last name provided in message inquiries.</li>
                            <li><strong className="text-slate-200">Contact Data:</strong> Email address provided for communication.</li>
                            <li><strong className="text-slate-200">Project Data:</strong> Project type, budget preferences, and message descriptions.</li>
                            <li><strong className="text-slate-200">Anonymous Usage Data:</strong> Optional telemetry measuring page performance without collecting personally identifying information (PII).</li>
                        </ul>

                        <h2 className="text-xl font-bold text-white mt-8">3. How We Use Your Data</h2>
                        <p>Your information is used strictly to respond to project inquiries, schedule consultations, and maintain technical performance. We never sell, lease, or distribute contact details to third parties.</p>

                        <h2 className="text-xl font-bold text-white mt-8">4. Telemetry & Cookies</h2>
                        <p>
                            We maintain an opt-in/opt-out mechanism for simple privacy-respecting performance telemetry. You can adjust this preference at any time using the footer controls.
                        </p>

                        <h2 className="text-xl font-bold text-white mt-8">5. Direct Contact</h2>
                        <p>
                            For inquiries regarding this privacy statement, please contact: <strong className="text-white">hello@tsuperville.com</strong>
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
