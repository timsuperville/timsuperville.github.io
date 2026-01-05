import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Mail, Send, CheckCircle, AlertCircle } from 'lucide-react'
import { trackEvent } from '../analytics'
import { CONFIG } from '../config'

export default function Contact(props) {
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
    const [startTime] = useState(() => Date.now())

    const validate = () => {
        if (!firstName.trim() || !lastName.trim()) return 'Please provide your name.'
        if (!email.trim()) return 'Please provide an email address.'
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Please enter a valid email.'
        if (!message.trim() || message.trim().length < 10) return 'Please provide a short description (10+ characters).'
        return ''
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setStatus(null)
        setErrorMessage('')

        const v = validate()
        if (v) { setErrorMessage(v); setStatus('error'); return }

        if (website && website.trim().length > 0) {
            setStatus('success')
            setSubmitting(false)
            return
        }

        if (Date.now() - startTime < 2000) {
            setStatus('success')
            setSubmitting(false)
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
                try { trackEvent('contact_submit', { result: 'success' }) } catch { }
                if (props && typeof props.setToast === 'function') {
                    props.setToast({ type: 'success', message: 'Message sent — thanks!' })
                    setTimeout(() => props.setToast(null), 5000)
                }
            } else {
                const data = await res.json().catch(() => ({}))
                const msg = data?.error || 'Submission failed. Please try again later.'
                setErrorMessage(msg)
                setStatus('error')
                try { trackEvent('contact_submit', { result: 'error' }) } catch { }
            }
        } catch (err) {
            setErrorMessage('Could not send message — check your network and try again.')
            setStatus('error')
            try { trackEvent('contact_submit', { result: 'error' }) } catch { }
        } finally {
            setSubmitting(false)
        }
    }

    const inputClasses = "w-full bg-dark-900/50 border border-white/10 rounded-lg px-4 py-3 text-slate-200 outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-slate-600"
    const labelClasses = "block text-sm font-medium text-slate-400 mb-1.5"

    return (
        <section id="contact" className="py-24 relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-4xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Let&apos;s <span className="text-gradient">Work Together</span>
                    </h2>
                    <p className="text-slate-400 max-w-lg mx-auto mb-8">
                        Have a project in mind? I&apos;d love to hear about it. Send me a message or book a call.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        <a
                            className="btn-primary inline-flex items-center gap-2"
                            href={CALENDLY_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => { try { trackEvent('contact_book_consult_click') } catch { } }}
                        >
                            <Calendar className="w-4 h-4" />
                            Book a free 15‑min consult
                        </a>
                        <a
                            className="btn-outline inline-flex items-center gap-2"
                            href={`mailto:${CONTACT_EMAIL}?subject=Interested%20in%20working%20together`}
                        >
                            <Mail className="w-4 h-4" />
                            Email me directly
                        </a>
                    </div>
                </motion.div>

                <motion.form
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    onSubmit={handleSubmit}
                    className="glass-card p-8 md:p-10"
                    noValidate
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label htmlFor="first_name" className={labelClasses}>First Name *</label>
                            <input id="first_name" name="first_name" value={firstName} onChange={e => setFirstName(e.target.value)} required className={inputClasses} placeholder="Jane" />
                        </div>
                        <div>
                            <label htmlFor="last_name" className={labelClasses}>Last Name *</label>
                            <input id="last_name" name="last_name" value={lastName} onChange={e => setLastName(e.target.value)} required className={inputClasses} placeholder="Doe" />
                        </div>
                    </div>

                    <div className="mb-6">
                        <label htmlFor="email" className={labelClasses}>Email Address *</label>
                        <input id="email" name="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required className={inputClasses} placeholder="jane@example.com" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label htmlFor="project_type" className={labelClasses}>Project Type</label>
                            <select id="project_type" name="project_type" value={projectType} onChange={e => setProjectType(e.target.value)} className={`${inputClasses} appearance-none`}>
                                <option value="" className="bg-dark-900">Select...</option>
                                <option value="web-app" className="bg-dark-900">Web Application</option>
                                <option value="website" className="bg-dark-900">Business Website</option>
                                <option value="ecommerce" className="bg-dark-900">E-commerce</option>
                                <option value="consultation" className="bg-dark-900">Consultation</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="budget_range" className={labelClasses}>Budget Range</label>
                            <select id="budget_range" name="budget_range" value={budgetRange} onChange={e => setBudgetRange(e.target.value)} className={`${inputClasses} appearance-none`}>
                                <option value="" className="bg-dark-900">Select...</option>
                                <option value="<1k" className="bg-dark-900">Under $1,000</option>
                                <option value="1k-5k" className="bg-dark-900">$1,000–$5,000</option>
                                <option value="5k-20k" className="bg-dark-900">$5,000–$20,000</option>
                                <option value=">20k" className="bg-dark-900">$20,000+</option>
                            </select>
                        </div>
                    </div>

                    <div style={{ display: 'none' }} aria-hidden="true">
                        <label htmlFor="website">Website</label>
                        <input id="website" name="website" value={website} onChange={e => setWebsite(e.target.value)} />
                    </div>

                    <div className="mb-8">
                        <label htmlFor="message" className={labelClasses}>Project Details *</label>
                        <textarea id="message" name="message" rows="5" value={message} onChange={e => setMessage(e.target.value)} required className={inputClasses} placeholder="Tell me about your goals..."></textarea>
                    </div>

                    <div aria-live="polite" className="mb-6 min-h-[24px]">
                        {status === 'success' && (
                            <div className="flex items-center gap-2 text-green-400 bg-green-400/10 p-3 rounded-lg border border-green-400/20">
                                <CheckCircle className="w-5 h-5" />
                                <span>Message sent successfully! I&apos;ll get back to you soon.</span>
                            </div>
                        )}
                        {status === 'error' && (
                            <div className="flex items-center gap-2 text-red-400 bg-red-400/10 p-3 rounded-lg border border-red-400/20">
                                <AlertCircle className="w-5 h-5" />
                                <span>{errorMessage}</span>
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {submitting ? (
                            <>Sending...</>
                        ) : (
                            <>Send Message <Send className="w-4 h-4" /></>
                        )}
                    </button>
                </motion.form>
            </div>
        </section>
    )
}
