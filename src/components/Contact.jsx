import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Mail, Send, CheckCircle, AlertCircle, Copy, Check, Sparkles } from 'lucide-react'
import confetti from 'canvas-confetti'
import { trackEvent } from '../analytics'
import { CONFIG } from '../config'

export default function Contact({ setToast, estimateData }) {
    const { FORMSPREE_ENDPOINT, CALENDLY_URL, CONTACT_EMAIL } = CONFIG

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [projectType, setProjectType] = useState('')
    const [budgetRange, setBudgetRange] = useState('')
    const [website, setWebsite] = useState('')
    const [message, setMessage] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const [status, setStatus] = useState(null)
    const [errorMessage, setErrorMessage] = useState('')
    const [copiedEmail, setCopiedEmail] = useState(false)
    const [startTime] = useState(() => Date.now())

    // If pre-filled estimate received from ProjectEstimator
    useEffect(() => {
        if (estimateData) {
            if (estimateData.type) setProjectType(estimateData.type)
            if (estimateData.budget) setBudgetRange(estimateData.budget)
            if (estimateData.message) setMessage(estimateData.message)
        }
    }, [estimateData])

    const handleCopyEmail = () => {
        navigator.clipboard.writeText(CONTACT_EMAIL || 'hello@tsuperville.com')
        setCopiedEmail(true)
        if (setToast) {
            setToast({ type: 'success', message: 'Email address copied to clipboard!' })
            setTimeout(() => setToast(null), 3000)
        }
        setTimeout(() => setCopiedEmail(false), 2500)
    }

    const validate = () => {
        if (!firstName.trim() || !lastName.trim()) return 'Please provide your first and last name.'
        if (!email.trim()) return 'Please provide an email address.'
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Please enter a valid email address.'
        if (!message.trim() || message.trim().length < 10) return 'Please provide a short message or project summary (10+ characters).'
        return ''
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setStatus(null)
        setErrorMessage('')

        const v = validate()
        if (v) { 
            setErrorMessage(v)
            setStatus('error')
            return 
        }

        // Honeypot spam check
        if (website && website.trim().length > 0) {
            setStatus('success')
            return
        }

        // Bot instant-submit check
        if (Date.now() - startTime < 1800) {
            setStatus('success')
            return
        }

        setSubmitting(true)
        try {
            const formData = new FormData()
            formData.append('first_name', firstName)
            formData.append('last_name', lastName)
            formData.append('email', email)
            formData.append('budget_range', budgetRange)
            formData.append('project_type', projectType)
            formData.append('message', message)

            const res = await fetch(FORMSPREE_ENDPOINT, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            })

            if (res.ok) {
                setStatus('success')
                setFirstName('')
                setLastName('')
                setEmail('')
                setProjectType('')
                setBudgetRange('')
                setMessage('')

                confetti({
                    particleCount: 120,
                    spread: 80,
                    origin: { y: 0.6 }
                })

                try { trackEvent('contact_submit', { result: 'success' }) } catch { }
                if (setToast) {
                    setToast({ type: 'success', message: 'Message sent successfully — I will get back to you within 24 hours!' })
                    setTimeout(() => setToast(null), 6000)
                }
            } else {
                const data = await res.json().catch(() => ({}))
                const msg = data?.error || 'Submission failed. Please email directly at ' + CONTACT_EMAIL
                setErrorMessage(msg)
                setStatus('error')
                try { trackEvent('contact_submit', { result: 'error' }) } catch { }
            }
        } catch {
            setErrorMessage('Could not send message — please check your connection or reach out via email directly.')
            setStatus('error')
            try { trackEvent('contact_submit', { result: 'network_error' }) } catch { }
        } finally {
            setSubmitting(false)
        }
    }

    const inputClasses = "w-full bg-dark-950/60 border border-white/10 rounded-xl px-4 py-3 text-slate-100 outline-none focus:border-primary-glow/70 focus:ring-1 focus:ring-primary-glow/50 transition-all placeholder:text-slate-500 font-sans text-sm"
    const labelClasses = "block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2"

    return (
        <section id="contact" className="py-24 relative overflow-hidden bg-dark-950">
            {/* Ambient Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/10 rounded-full blur-[160px] pointer-events-none"></div>

            <div className="max-w-4xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/25 text-primary-glow text-xs font-mono uppercase tracking-wider mb-4">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Let&apos;s Build Together</span>
                    </div>
                    <h2 className="text-3xl sm:text-5xl font-bold mb-4 tracking-tight">
                        Initiate a <span className="text-gradient">Conversation</span>
                    </h2>
                    <p className="text-slate-400 max-w-xl mx-auto text-base sm:text-lg mb-8">
                        Ready to level up your product, scale your engineering velocity, or build a custom application? Send an inquiry or schedule a call.
                    </p>

                    <div className="flex flex-wrap justify-center items-center gap-3 mb-10">
                        <a
                            className="btn-primary inline-flex items-center gap-2 text-xs font-mono uppercase"
                            href={CALENDLY_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => { try { trackEvent('contact_book_consult_click') } catch { } }}
                        >
                            <Calendar className="w-4 h-4" />
                            <span>Book Free 15‑Min Consult</span>
                        </a>

                        <button
                            type="button"
                            onClick={handleCopyEmail}
                            className="btn-outline inline-flex items-center gap-2 text-xs font-mono uppercase"
                        >
                            {copiedEmail ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                            <span>{copiedEmail ? 'Copied Email!' : 'Copy Email Address'}</span>
                        </button>

                        <a
                            className="inline-flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-mono text-slate-400 hover:text-white transition-colors"
                            href={`mailto:${CONTACT_EMAIL}?subject=Engineering%20Inquiry`}
                        >
                            <Mail className="w-4 h-4" />
                            <span>Direct Email</span>
                        </a>
                    </div>
                </motion.div>

                <motion.form
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 }}
                    onSubmit={handleSubmit}
                    className="glass-card p-6 sm:p-10 border border-white/10"
                    noValidate
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                        <div>
                            <label htmlFor="first_name" className={labelClasses}>First Name *</label>
                            <input 
                                id="first_name" 
                                name="first_name" 
                                value={firstName} 
                                onChange={e => setFirstName(e.target.value)} 
                                required 
                                className={inputClasses} 
                                placeholder="Alex" 
                            />
                        </div>
                        <div>
                            <label htmlFor="last_name" className={labelClasses}>Last Name *</label>
                            <input 
                                id="last_name" 
                                name="last_name" 
                                value={lastName} 
                                onChange={e => setLastName(e.target.value)} 
                                required 
                                className={inputClasses} 
                                placeholder="Rivers" 
                            />
                        </div>
                    </div>

                    <div className="mb-5">
                        <label htmlFor="email" className={labelClasses}>Email Address *</label>
                        <input 
                            id="email" 
                            name="email" 
                            type="email" 
                            value={email} 
                            onChange={e => setEmail(e.target.value)} 
                            required 
                            className={inputClasses} 
                            placeholder="alex@company.com" 
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                        <div>
                            <label htmlFor="project_type" className={labelClasses}>Project Type</label>
                            <select 
                                id="project_type" 
                                name="project_type" 
                                value={projectType} 
                                onChange={e => setProjectType(e.target.value)} 
                                className={`${inputClasses} appearance-none bg-dark-950`}
                            >
                                <option value="">Select Category...</option>
                                <option value="web-app">SaaS / Web Application</option>
                                <option value="ecommerce">Headless E-Commerce</option>
                                <option value="website">High-Impact Brand Site</option>
                                <option value="audit">Performance & Architecture Audit</option>
                                <option value="consultation">Staff Engineering Consultation</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="budget_range" className={labelClasses}>Estimated Budget</label>
                            <select 
                                id="budget_range" 
                                name="budget_range" 
                                value={budgetRange} 
                                onChange={e => setBudgetRange(e.target.value)} 
                                className={`${inputClasses} appearance-none bg-dark-950`}
                            >
                                <option value="">Select Range...</option>
                                <option value="<1k">Under $2,500</option>
                                <option value="1k-5k">$2,500 – $5,000</option>
                                <option value="5k-20k">$5,000 – $15,000</option>
                                <option value=">20k">$15,000+</option>
                            </select>
                        </div>
                    </div>

                    {/* Honeypot Spam Prevention */}
                    <div style={{ display: 'none' }} aria-hidden="true">
                        <label htmlFor="website">Website</label>
                        <input id="website" name="website" value={website} onChange={e => setWebsite(e.target.value)} />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="message" className={labelClasses}>Project Details & Objectives *</label>
                        <textarea 
                            id="message" 
                            name="message" 
                            rows="4" 
                            value={message} 
                            onChange={e => setMessage(e.target.value)} 
                            required 
                            className={inputClasses} 
                            placeholder="Tell me about your product goals, technical stack, or desired launch timeline..."
                        ></textarea>
                    </div>

                    {/* Feedback Status */}
                    <div aria-live="polite" className="mb-6 min-h-[24px]">
                        {status === 'success' && (
                            <div className="flex items-center gap-2.5 text-emerald-400 bg-emerald-400/10 p-3.5 rounded-xl border border-emerald-400/20 text-sm">
                                <CheckCircle className="w-5 h-5 shrink-0" />
                                <span>Message delivered! I will review your project details and follow up within 24 business hours.</span>
                            </div>
                        )}
                        {status === 'error' && (
                            <div className="flex items-center gap-2.5 text-rose-400 bg-rose-400/10 p-3.5 rounded-xl border border-rose-400/20 text-sm">
                                <AlertCircle className="w-5 h-5 shrink-0" />
                                <span>{errorMessage}</span>
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full btn-primary flex items-center justify-center gap-2 py-4 text-sm font-mono uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {submitting ? (
                            <span>Transmitting Message...</span>
                        ) : (
                            <>
                                <span>Send Project Inquiry</span> 
                                <Send className="w-4 h-4" />
                            </>
                        )}
                    </button>
                </motion.form>
            </div>
        </section>
    )
}
