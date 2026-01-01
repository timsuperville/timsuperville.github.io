import React from 'react'
import { motion } from 'framer-motion'
import { trackEvent } from '../analytics'
import { CONFIG } from '../config'

export default function Contact(props) {
    const { FORMSPREE_ENDPOINT, CALENDLY_URL, CONTACT_EMAIL } = CONFIG

    const [firstName, setFirstName] = React.useState('')
    const [lastName, setLastName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [projectType, setProjectType] = React.useState('')
    const [budgetRange, setBudgetRange] = React.useState('')
    const [website, setWebsite] = React.useState('') // honeypot (bots often fill this)
    const [message, setMessage] = React.useState('')
    const [submitting, setSubmitting] = React.useState(false)
    const [status, setStatus] = React.useState(null) // 'success' | 'error' | null
    const [errorMessage, setErrorMessage] = React.useState('')
    const [startTime] = React.useState(() => Date.now())

    const validate = () => {
        if (!firstName.trim() || !lastName.trim()) return 'Please provide your name.'
        if (!email.trim()) return 'Please provide an email address.'
        // simple email check
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

        // Honeypot check: if the hidden website field is filled, treat as spam and silently succeed
        if (website && website.trim().length > 0) {
            setStatus('success')
            setSubmitting(false)
            return
        }

        // Timing check: if submitted too quickly (less than 2s), likely a bot
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
                setMessage('')
                try { trackEvent('contact_submit', { result: 'success' }) } catch (e) { }
                if (props && typeof props.setToast === 'function') {
                    props.setToast({ type: 'success', message: 'Message sent — thanks!' })
                    setTimeout(() => props.setToast(null), 5000)
                }
            } else {
                const data = await res.json().catch(() => ({}))
                const msg = data?.error || 'Submission failed. Please try again later.'
                setErrorMessage(msg)
                setStatus('error')
                try { trackEvent('contact_submit', { result: 'error' }) } catch (e) { }
            }
        } catch (err) {
            setErrorMessage('Could not send message — check your network and try again.')
            setStatus('error')
            try { trackEvent('contact_submit', { result: 'error' }) } catch (e) { }
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <section id="contact" className="py-12 bg-gray-50">
            <div className="max-w-3xl mx-auto px-5">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-2xl font-semibold mb-4"
                >
                    Contact
                </motion.h2>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-4 flex gap-3"
                >
                    <a className="inline-flex items-center px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-500 transition-colors" href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" onClick={() => { try { trackEvent('contact_book_consult_click') } catch (e) { } }}>Book a free 15‑min consult</a>
                    <a className="inline-flex items-center px-4 py-2 border rounded hover:bg-gray-50 transition-colors" href={`mailto:${CONTACT_EMAIL}?subject=Interested%20in%20working%20together`}>Email me</a>
                </motion.div>
                <motion.form
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    onSubmit={handleSubmit}
                    className="space-y-4 bg-white p-6 rounded shadow"
                    noValidate
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="first_name" className="block text-sm text-gray-700 mb-1">First Name *</label>
                            <input id="first_name" name="first_name" value={firstName} onChange={e => setFirstName(e.target.value)} required className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-sky-500 outline-none" />
                        </div>
                        <div>
                            <label htmlFor="last_name" className="block text-sm text-gray-700 mb-1">Last Name *</label>
                            <input id="last_name" name="last_name" value={lastName} onChange={e => setLastName(e.target.value)} required className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-sky-500 outline-none" />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm text-gray-700 mb-1">Email *</label>
                        <input id="email" name="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-sky-500 outline-none" />
                    </div>

                    <div>
                        <label htmlFor="project_type" className="block text-sm text-gray-700 mb-1">Project Type</label>
                        <select id="project_type" name="project_type" value={projectType} onChange={e => setProjectType(e.target.value)} className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-sky-500 outline-none">
                            <option value="">Select</option>
                            <option value="web-app">Web Application</option>
                            <option value="website">Business Website</option>
                            <option value="ecommerce">E-commerce</option>
                            <option value="consultation">Consultation</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="budget_range" className="block text-sm text-gray-700 mb-1">Budget range (optional)</label>
                        <select id="budget_range" name="budget_range" value={budgetRange} onChange={e => setBudgetRange(e.target.value)} className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-sky-500 outline-none">
                            <option value="">Select</option>
                            <option value="<1k">Under $1,000</option>
                            <option value="1k-5k">$1,000–$5,000</option>
                            <option value="5k-20k">$5,000–$20,000</option>
                            <option value=">20k">$20,000+</option>
                        </select>
                    </div>

                    {/* Honeypot field (hidden) */}
                    <div style={{ display: 'none' }} aria-hidden="true">
                        <label htmlFor="website">Website</label>
                        <input id="website" name="website" value={website} onChange={e => setWebsite(e.target.value)} />
                    </div>

                    <div>
                        <label htmlFor="message" className="block text-sm text-gray-700 mb-1">Project Details *</label>
                        <textarea id="message" name="message" rows="6" value={message} onChange={e => setMessage(e.target.value)} required className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-sky-500 outline-none"></textarea>
                    </div>

                    <div aria-live="polite" className="form-status">
                        {status === 'success' && <div className="text-sm text-green-600">Thanks — your message was sent. I usually reply within 1–2 business days.</div>}
                        {status === 'error' && errorMessage && <div className="text-sm text-red-600">{errorMessage}</div>}
                    </div>

                    <div>
                        <button type="submit" className="inline-flex items-center px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-500 transition-colors disabled:opacity-50" disabled={submitting}>{submitting ? 'Sending…' : 'Send Message'}</button>
                    </div>
                </motion.form>
            </div>
        </section>
    )
}
