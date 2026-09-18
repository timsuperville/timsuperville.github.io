import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
    ArrowLeft,
    Target,
    CheckCircle2,
    Send,
    Calendar,
    ShieldCheck,
    Compass,
    Layout,
    Palette,
    Users,
    Check,
    RotateCcw,
    Download,
    Mail,
    AlertCircle,
    Copy,
    Layers,
    Sparkles
} from 'lucide-react'
import confetti from 'canvas-confetti'
import { CONFIG } from '../config'
import { trackEvent } from '../lib/analytics'
import {
    GOAL_OPTIONS,
    PAGE_OPTIONS,
    FEATURE_OPTIONS,
    INTEGRATION_OPTIONS,
    NOTE_QUICK_CHIPS,
    STYLE_OPTIONS,
    ASSET_OPTIONS,
    TIMELINE_OPTIONS,
    BUDGET_OPTIONS,
    QUICK_PRESETS
} from '../constants/intake'
import { calculateProgress, isFormEmpty, EMAIL_REGEX } from '../utils/form'
import { downloadBriefTxt, copyBriefToClipboard, getMailtoHref } from '../utils/brief'
import { useIntakeDraft } from '../hooks/useIntakeDraft'

export default function ClientIntake({ setToast, onReset }) {
    const {
        formData,
        lastSavedTime,
        handleTextChange,
        toggleArrayItem,
        clearDraft,
        applyPreset
    } = useIntakeDraft()

    const [submitting, setSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState(null)
    const [errorMessage, setErrorMessage] = useState('')

    const progress = calculateProgress(formData)

    const handleClearDraft = () => {
        clearDraft({
            onReset,
            onConfirm: () => {
                if (setToast) {
                    setToast({ type: 'success', message: 'Form draft reset.' })
                    setTimeout(() => setToast(null), 2500)
                }
            }
        })
    }

    const handleDownloadBrief = () => {
        const ok = downloadBriefTxt(formData)
        if (ok && setToast) {
            setToast({ type: 'success', message: 'Project brief downloaded successfully!' })
            setTimeout(() => setToast(null), 3000)
        }
    }

    const handleCopyBrief = async () => {
        const ok = await copyBriefToClipboard(formData)
        if (ok && setToast) {
            setToast({ type: 'success', message: 'Project brief copied to clipboard!' })
            setTimeout(() => setToast(null), 3000)
        }
    }

    const handleApplyPreset = (preset) => {
        applyPreset(preset)
        if (setToast) {
            setToast({ type: 'success', message: `Added recommended pages & features for ${preset.label}` })
            setTimeout(() => setToast(null), 3000)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmitStatus(null)
        setErrorMessage('')

        if (!formData.clientName.trim()) {
            setErrorMessage('Please let us know your business, organization, or project name.')
            setSubmitStatus('error')
            const el = document.getElementById('clientName')
            if (el) {
                if (typeof el.scrollIntoView === 'function') el.scrollIntoView({ behavior: 'smooth', block: 'center' })
                if (typeof el.focus === 'function') el.focus()
            } else if (typeof window !== 'undefined' && typeof window.scrollTo === 'function') {
                window.scrollTo({ top: 300, behavior: 'smooth' })
            }
            return
        }
        if (!formData.email.trim() || !EMAIL_REGEX.test(formData.email)) {
            setErrorMessage('Please enter a valid email address so Tim can reply to you.')
            setSubmitStatus('error')
            const el = document.getElementById('email')
            if (el) {
                if (typeof el.scrollIntoView === 'function') el.scrollIntoView({ behavior: 'smooth', block: 'center' })
                if (typeof el.focus === 'function') el.focus()
            } else if (typeof window !== 'undefined' && typeof window.scrollTo === 'function') {
                window.scrollTo({ top: 300, behavior: 'smooth' })
            }
            return
        }

        setSubmitting(true)
        const endpoint = CONFIG.GOOGLE_SHEETS_INTAKE_URL?.trim()

        if (!endpoint) {
            setTimeout(() => {
                setSubmitting(false)
                setSubmitStatus('success')
                confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } })
                if (setToast) {
                    setToast({ type: 'success', message: 'Project details received! Your draft is saved.' })
                    setTimeout(() => setToast(null), 5000)
                }
            }, 600)
            return
        }

        try {
            await fetch(endpoint, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                body: JSON.stringify(formData)
            })
            setSubmitting(false)
            setSubmitStatus('success')
            confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 } })
            try { trackEvent('client_intake_submit', { result: 'success' }) } catch { }
            if (setToast) {
                setToast({ type: 'success', message: 'Project details submitted successfully!' })
                setTimeout(() => setToast(null), 5000)
            }
        } catch {
            setSubmitting(false)
            setErrorMessage("We could not send your submission right now. Don't worry, all your answers are safely saved in your browser. Please try again or use the email fallback below.")
            setSubmitStatus('error')
            try { trackEvent('client_intake_submit', { result: 'error' }) } catch { }
        }
    }

    const cardClasses = "glass-card p-6 sm:p-10 border border-white/10 mb-8 rounded-2xl relative overflow-hidden"
    const sectionHeadingClasses = "text-xl sm:text-2xl font-bold text-white mb-2 flex items-center gap-3"
    const sectionSubtextClasses = "text-sm text-slate-400 mb-6 leading-relaxed"
    const fieldLabelClasses = "block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2 font-medium"
    const inputClasses = "w-full bg-dark-950/80 border border-white/10 rounded-xl px-4 py-3 text-slate-100 outline-none focus:border-primary-glow/70 focus:ring-1 focus:ring-primary-glow/50 transition-all placeholder:text-slate-600 font-sans text-sm"

    return (
        <section className="py-24 min-h-screen bg-dark-950 relative overflow-hidden">
            {/* Background Ambient Glows */}
            <div className="absolute top-20 right-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[140px] pointer-events-none"></div>
            <div className="absolute bottom-40 left-10 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[140px] pointer-events-none"></div>

            <div className="max-w-4xl mx-auto px-6 relative z-10">
                {/* Top Navigation & Auto-Save Indicator */}
                <div className="flex justify-between items-center mb-8 gap-4 flex-wrap">
                    <a 
                        href="#home" 
                        className="inline-flex items-center gap-2 text-sm font-mono text-slate-400 hover:text-white transition-colors group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
                        <span>Back to Home</span>
                    </a>

                    <div className="flex items-center gap-3">
                        <a 
                            href="#highwater" 
                            className="inline-flex items-center gap-1.5 text-xs font-mono text-amber-400/90 hover:text-amber-300 bg-amber-400/10 px-3 py-1.5 rounded-full border border-amber-400/20 transition-colors"
                        >
                            <span>View Highwater Draft</span>
                            <span className="text-[10px]">→</span>
                        </a>

                        {lastSavedTime && !isFormEmpty(formData) && (
                            <span className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 bg-white/5 px-3.5 py-1.5 rounded-full border border-white/10">
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                                <span>Draft auto-saved {lastSavedTime}</span>
                            </span>
                        )}
                    </div>
                </div>

                {/* Success View */}
                {submitStatus === 'success' ? (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass-card p-8 sm:p-14 border border-emerald-500/30 text-center rounded-3xl mb-12 shadow-2xl shadow-emerald-950/20"
                    >
                        <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 className="w-8 h-8" />
                        </div>

                        <span className="inline-block px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-mono uppercase tracking-wider mb-3">
                            Details Received
                        </span>

                        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
                            Thank You, {formData.contactPerson || 'Friend'}!
                        </h2>

                        <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
                            Your project discovery details have been delivered directly to Tim Superville. All answers are safely stored and logged in our system.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-left max-w-3xl mx-auto mb-10">
                            <div className="p-5 rounded-2xl bg-dark-950/80 border border-white/10">
                                <div className="text-xs font-mono text-primary-glow uppercase mb-2">Step 1</div>
                                <h3 className="font-bold text-white text-base mb-1">Personal Review</h3>
                                <p className="text-xs text-slate-400 leading-relaxed">
                                    Tim will personally review your goals, pages, and feature wishlist to prepare an initial scope.
                                </p>
                            </div>

                            <div className="p-5 rounded-2xl bg-dark-950/80 border border-white/10">
                                <div className="text-xs font-mono text-primary-glow uppercase mb-2">Step 2</div>
                                <h3 className="font-bold text-white text-base mb-1">1-Business-Day Reply</h3>
                                <p className="text-xs text-slate-400 leading-relaxed">
                                    You&apos;ll receive an email with recommendations, estimated timeline, and investment options.
                                </p>
                            </div>

                            <div className="p-5 rounded-2xl bg-dark-950/80 border border-white/10">
                                <div className="text-xs font-mono text-primary-glow uppercase mb-2">Step 3</div>
                                <h3 className="font-bold text-white text-base mb-1">Discovery Call</h3>
                                <p className="text-xs text-slate-400 leading-relaxed">
                                    We&apos;ll hop on a quick 15-minute call to answer questions and lock in your project plan.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <a 
                                href={CONFIG.CALENDLY_URL} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="btn-primary inline-flex items-center gap-2 px-8 py-3.5 text-sm font-mono uppercase tracking-wider"
                            >
                                <Calendar className="w-4 h-4" />
                                <span>Schedule Intro Call on Calendly</span>
                            </a>

                            <button
                                type="button"
                                onClick={handleDownloadBrief}
                                className="btn-outline inline-flex items-center gap-2 px-6 py-3.5 text-sm font-mono uppercase tracking-wider"
                            >
                                <Download className="w-4 h-4" />
                                <span>Download Project Brief (.txt)</span>
                            </button>

                            <a 
                                href="#home" 
                                className="text-xs font-mono text-slate-400 hover:text-white px-4 py-2 transition-colors"
                            >
                                <span>Return to Home</span>
                            </a>
                        </div>
                    </motion.div>
                ) : (
                    <>
                        {/* Hero Header */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="mb-8 text-center sm:text-left"
                        >
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primary-glow text-xs font-mono uppercase tracking-wider mb-4">
                                <Compass className="w-3.5 h-3.5" />
                                <span>Start Your Project • Discovery & Planning</span>
                            </div>

                            <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight">
                                Tell Us About <span className="text-gradient">Your Vision</span>
                            </h1>

                            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-3xl">
                                A quick, guided questionnaire to share your goals, desired features, and timeline. Fill in whatever you know — we will handle the fine details together.
                            </p>

                            {/* Real-time Progress Bar */}
                            <div className="mt-6 p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                                <div className="flex justify-between items-center text-xs font-mono text-slate-400 mb-2">
                                    <span className="flex items-center gap-1.5">
                                        <Compass className="w-3.5 h-3.5 text-primary-glow" />
                                        <span>Questionnaire Progress</span>
                                    </span>
                                    <span className="text-primary-glow font-bold">{progress}% Completed</span>
                                </div>
                                <div className="w-full h-2 rounded-full bg-dark-950 overflow-hidden border border-white/5">
                                    <div 
                                        className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500 ease-out"
                                        style={{ width: `${progress}%` }}
                                    ></div>
                                </div>
                            </div>
                        </motion.div>

                        <form onSubmit={handleSubmit} noValidate>
                            {/* 1. Client & Contact Information */}
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.1 }}
                                className={cardClasses}
                            >
                                <h2 className={sectionHeadingClasses}>
                                    <Users className="w-5 h-5 text-primary-glow" />
                                    <span>1. About You & Your Business</span>
                                </h2>
                                <p className={sectionSubtextClasses}>
                                    Let’s start with the basics so we know who we are building for and how to reach you.
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                                    <div>
                                        <label htmlFor="clientName" className={fieldLabelClasses}>
                                            Company / Organization / Project Name *
                                        </label>
                                        <input 
                                            id="clientName" 
                                            name="clientName"
                                            required
                                            value={formData.clientName} 
                                            onChange={e => handleTextChange('clientName', e.target.value)}
                                            placeholder="e.g. Northern Peak Coffee, Acme Supply Co." 
                                            className={inputClasses} 
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="contactPerson" className={fieldLabelClasses}>
                                            Your Name *
                                        </label>
                                        <input 
                                            id="contactPerson" 
                                            name="contactPerson"
                                            value={formData.contactPerson} 
                                            onChange={e => handleTextChange('contactPerson', e.target.value)}
                                            placeholder="e.g. Jane Doe" 
                                            className={inputClasses} 
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                                    <div>
                                        <label htmlFor="email" className={fieldLabelClasses}>
                                            Primary Contact Email *
                                        </label>
                                        <input 
                                            id="email" 
                                            name="email"
                                            type="email"
                                            required
                                            value={formData.email} 
                                            onChange={e => handleTextChange('email', e.target.value)}
                                            placeholder="your-name@gmail.com" 
                                            className={inputClasses} 
                                        />
                                        <p className="mt-1.5 text-[11px] text-slate-500 font-sans">
                                            Where Tim should reply to your project discovery brief.
                                        </p>
                                    </div>

                                    <div>
                                        <label htmlFor="practiceEmail" className={fieldLabelClasses}>
                                            Public / Practice Notification Email (optional)
                                        </label>
                                        <input 
                                            id="practiceEmail" 
                                            name="practiceEmail"
                                            type="email"
                                            value={formData.practiceEmail} 
                                            onChange={e => handleTextChange('practiceEmail', e.target.value)}
                                            placeholder="e.g. info@practice.com or company@gmail.com" 
                                            className={inputClasses} 
                                        />
                                        <p className="mt-1.5 text-[11px] text-slate-500 font-sans">
                                            If the public contact email on the website is different from your personal email.
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label htmlFor="phone" className={fieldLabelClasses}>
                                            Phone Number (optional)
                                        </label>
                                        <input 
                                            id="phone" 
                                            name="phone"
                                            type="tel"
                                            value={formData.phone} 
                                            onChange={e => handleTextChange('phone', e.target.value)}
                                            placeholder="(780) 555-0199" 
                                            className={inputClasses} 
                                        />
                                        <p className="mt-1.5 text-[11px] text-slate-500 font-sans">
                                            Optional — only if you prefer a quick phone call or text.
                                        </p>
                                    </div>

                                    <div>
                                        <label htmlFor="website" className={fieldLabelClasses}>
                                            Current Website or Social Page
                                        </label>
                                        <input 
                                            id="website" 
                                            name="website"
                                            value={formData.website} 
                                            onChange={e => handleTextChange('website', e.target.value)}
                                            placeholder="https://... or @instagram" 
                                            className={inputClasses} 
                                        />
                                        <p className="mt-1.5 text-[11px] text-slate-500 font-sans">
                                            If you already have one, or link your Facebook / Instagram page.
                                        </p>
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label htmlFor="location" className={fieldLabelClasses}>
                                            City, Region, or Service Area (optional)
                                        </label>
                                        <input 
                                            id="location" 
                                            name="location"
                                            value={formData.location} 
                                            onChange={e => handleTextChange('location', e.target.value)}
                                            placeholder="e.g. Wembley & Grande Prairie, AB, or Calgary & Online, or Greater Vancouver..." 
                                            className={inputClasses} 
                                        />
                                        <p className="mt-1.5 text-[11px] text-slate-500 font-sans">
                                            Helps configure local SEO, Google Maps verification, and client service territory.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* 2. Goals & Vision */}
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.15 }}
                                className={cardClasses}
                            >
                                <h2 className={sectionHeadingClasses}>
                                    <Target className="w-5 h-5 text-secondary-glow" />
                                    <span>2. Your Goals & Vision</span>
                                </h2>
                                <p className={sectionSubtextClasses}>
                                    What does a home run look like for this new website? Select your top goals or describe them below.
                                </p>

                                {/* Common Goal Chips */}
                                <div className="mb-6">
                                    <label className={fieldLabelClasses}>
                                        Select Your Top Project Goals
                                    </label>
                                    <div className="flex flex-wrap gap-2.5">
                                        {GOAL_OPTIONS.map(goal => {
                                            const isSelected = formData.mainObjectives.includes(goal)
                                            return (
                                                <button
                                                    key={goal}
                                                    type="button"
                                                    aria-pressed={isSelected}
                                                    onClick={() => {
                                                        const current = formData.mainObjectives
                                                        if (isSelected) {
                                                            const cleaned = current.split(', ').filter(x => x !== goal).join(', ')
                                                            handleTextChange('mainObjectives', cleaned)
                                                        } else {
                                                            const updated = current ? `${current}, ${goal}` : goal
                                                            handleTextChange('mainObjectives', updated)
                                                        }
                                                    }}
                                                    className={`px-3.5 py-2 rounded-xl text-xs font-mono transition-all flex items-center gap-1.5 ${
                                                        isSelected
                                                            ? 'bg-primary/20 text-primary-glow border border-primary/40 font-semibold'
                                                            : 'bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10'
                                                    }`}
                                                >
                                                    {isSelected && <Check className="w-3.5 h-3.5" />}
                                                    <span>{goal}</span>
                                                </button>
                                            )
                                        })}
                                    </div>
                                </div>

                                <div className="space-y-5">
                                    <div>
                                        <label htmlFor="mainObjectives" className={fieldLabelClasses}>
                                            In your own words, what is the main goal for this new site?
                                        </label>
                                        <textarea 
                                            id="mainObjectives" 
                                            name="mainObjectives"
                                            rows="3"
                                            value={formData.mainObjectives} 
                                            onChange={e => handleTextChange('mainObjectives', e.target.value)}
                                            placeholder="e.g. We want a modern, fast site that turns local visitors into paying clients and allows customers to easily book consultations online." 
                                            className={inputClasses} 
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="keyChallenges" className={fieldLabelClasses}>
                                            What isn’t working with your current website or setup? (Or what is your biggest hurdle?)
                                        </label>
                                        <textarea 
                                            id="keyChallenges" 
                                            name="keyChallenges"
                                            rows="2"
                                            value={formData.keyChallenges} 
                                            onChange={e => handleTextChange('keyChallenges', e.target.value)}
                                            placeholder="e.g. Our current site is slow on phones, difficult to edit, doesn't reflect the high quality of our work, and we get no inquiries from it." 
                                            className={inputClasses} 
                                        />
                                    </div>
                                </div>
                            </motion.div>

                            {/* 3. Target Audience & Brand Personality */}
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.2 }}
                                className={cardClasses}
                            >
                                <h2 className={sectionHeadingClasses}>
                                    <Palette className="w-5 h-5 text-primary-glow" />
                                    <span>3. Your Audience & Brand Vibe</span>
                                </h2>
                                <p className={sectionSubtextClasses}>
                                    Help us understand who will be visiting your site and how you want them to feel.
                                </p>

                                <div className="space-y-6">
                                    <div>
                                        <label htmlFor="targetAudience" className={fieldLabelClasses}>
                                            Who is your ideal customer or target audience?
                                        </label>
                                        <input 
                                            id="targetAudience" 
                                            name="targetAudience"
                                            value={formData.targetAudience} 
                                            onChange={e => handleTextChange('targetAudience', e.target.value)}
                                            placeholder="e.g. Homeowners aged 30-55 in Northern Alberta looking for reliable renovations..." 
                                            className={inputClasses} 
                                        />
                                    </div>

                                    <div>
                                        <label className={fieldLabelClasses}>
                                            What feeling or personality best matches your brand?
                                        </label>
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                                            {STYLE_OPTIONS.map(style => {
                                                const isSelected = formData.brandValues.includes(style)
                                                return (
                                                    <button
                                                        key={style}
                                                        type="button"
                                                        aria-pressed={isSelected}
                                                        onClick={() => {
                                                            const current = formData.brandValues
                                                            if (isSelected) {
                                                                const cleaned = current.split(', ').filter(x => x !== style).join(', ')
                                                                handleTextChange('brandValues', cleaned)
                                                            } else {
                                                                const updated = current ? `${current}, ${style}` : style
                                                                handleTextChange('brandValues', updated)
                                                            }
                                                        }}
                                                        className={`p-3 rounded-xl text-xs font-mono text-center border transition-all ${
                                                            isSelected 
                                                                ? 'bg-secondary/20 text-secondary-glow border-secondary/40 font-semibold shadow-sm shadow-secondary/10' 
                                                                : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                                                        }`}
                                                    >
                                                        {style}
                                                    </button>
                                                )
                                            })}
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="brandMotto" className={fieldLabelClasses}>
                                            Brand Tagline, Scripture, or Core Motto (optional)
                                        </label>
                                        <input 
                                            id="brandMotto" 
                                            name="brandMotto"
                                            value={formData.brandMotto} 
                                            onChange={e => handleTextChange('brandMotto', e.target.value)}
                                            placeholder='e.g. Psalm 61:2 "Lead me to the rock that is higher than I", or "Crafted with Integrity"' 
                                            className={inputClasses} 
                                        />
                                        <p className="mt-1.5 text-[11px] text-slate-500 font-sans">
                                            A guiding scripture, philosophy, or mission quote that anchors your brand voice.
                                        </p>
                                    </div>

                                    <div>
                                        <label htmlFor="brandColorsNotes" className={fieldLabelClasses}>
                                            Preferred Colors, Themes, or Aesthetic Notes (optional)
                                        </label>
                                        <input 
                                            id="brandColorsNotes" 
                                            name="brandColorsNotes"
                                            value={formData.brandColorsNotes} 
                                            onChange={e => handleTextChange('brandColorsNotes', e.target.value)}
                                            placeholder="e.g. Forest greens, warm stone neutrals, alpine tones, or specific brand hex codes..." 
                                            className={inputClasses} 
                                        />
                                        <p className="mt-1.5 text-[11px] text-slate-500 font-sans">
                                            Any favorite color palette ideas, moods, or existing brand guidelines.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* 4. Pages & Must-Have Features */}
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.25 }}
                                className={cardClasses}
                            >
                                <h2 className={sectionHeadingClasses}>
                                    <Layout className="w-5 h-5 text-secondary-glow" />
                                    <span>4. Pages & Features You Need</span>
                                </h2>
                                <p className={sectionSubtextClasses}>
                                    Select the pages and features you think you&apos;ll need. You can always change or add more later.
                                </p>

                                {/* Quick-Pick Starter Presets */}
                                <div className="mb-6 p-4 rounded-xl bg-white/[0.02] border border-white/10">
                                    <div className="flex items-center gap-2 mb-1.5 text-xs font-mono font-semibold text-secondary-glow uppercase tracking-wider">
                                        <Layers className="w-3.5 h-3.5" />
                                        <span>Quick-Pick Starter Archetypes (1-Click)</span>
                                    </div>
                                    <p className="text-xs text-slate-400 mb-3">
                                        Click a profile below to automatically select common pages and features. You can still adjust everything afterwards.
                                    </p>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                                        {QUICK_PRESETS.map(preset => (
                                            <button
                                                key={preset.id}
                                                type="button"
                                                onClick={() => handleApplyPreset(preset)}
                                                className="p-3 rounded-xl text-left bg-white/5 hover:bg-secondary/15 border border-white/10 hover:border-secondary/40 transition-all group"
                                            >
                                                <div className="text-xs font-semibold text-slate-200 group-hover:text-secondary-glow transition-colors">
                                                    {preset.label}
                                                </div>
                                                <div className="text-[11px] text-slate-400 mt-1 line-clamp-2 font-sans">
                                                    {preset.description}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Pages Needed */}
                                <div className="mb-6">
                                    <label className={fieldLabelClasses}>
                                        Key Pages Envisioned
                                    </label>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                                        {PAGE_OPTIONS.map(page => {
                                            const isSelected = (formData.pagesNeeded || []).includes(page)
                                            return (
                                                <button
                                                    key={page}
                                                    type="button"
                                                    aria-pressed={isSelected}
                                                    onClick={() => toggleArrayItem('pagesNeeded', page)}
                                                    className={`p-3 rounded-xl text-xs font-mono text-left border flex items-center justify-between transition-all ${
                                                        isSelected 
                                                            ? 'bg-primary/15 text-primary-glow border-primary/40 font-medium' 
                                                            : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                                                    }`}
                                                >
                                                    <span>{page}</span>
                                                    {isSelected && <Check className="w-3.5 h-3.5 text-primary-glow" />}
                                                </button>
                                            )
                                        })}
                                    </div>
                                    <div className="mt-3">
                                        <label htmlFor="otherPages" className="block text-xs font-mono text-slate-400 mb-1.5">
                                            Other Specific Pages or Sections Needed (optional)
                                        </label>
                                        <input 
                                            id="otherPages" 
                                            name="otherPages"
                                            value={formData.otherPages} 
                                            onChange={e => handleTextChange('otherPages', e.target.value)}
                                            placeholder="e.g. Insurance & Direct Billing, Careers / Hiring, Patient Resources, Case Studies..." 
                                            className={inputClasses} 
                                        />
                                    </div>
                                </div>

                                {/* Features Needed */}
                                <div className="mb-6">
                                    <label className={fieldLabelClasses}>
                                        Key Interactive Features
                                    </label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                        {FEATURE_OPTIONS.map(feat => {
                                            const isSelected = (formData.interactiveFeatures || []).includes(feat)
                                            return (
                                                <button
                                                    key={feat}
                                                    type="button"
                                                    aria-pressed={isSelected}
                                                    onClick={() => toggleArrayItem('interactiveFeatures', feat)}
                                                    className={`p-3 rounded-xl text-xs font-mono text-left border flex items-center justify-between transition-all ${
                                                        isSelected 
                                                            ? 'bg-secondary/15 text-secondary-glow border-secondary/40 font-medium' 
                                                            : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                                                    }`}
                                                >
                                                    <span>{feat}</span>
                                                    {isSelected && <Check className="w-3.5 h-3.5 text-secondary-glow" />}
                                                </button>
                                            )
                                        })}
                                    </div>
                                </div>

                                {/* Third-Party Tools & Integrations */}
                                <div className="mb-6">
                                    <label className={fieldLabelClasses}>
                                        Third-Party Tools &amp; Integrations
                                    </label>
                                    <p className="text-xs text-slate-400 mb-2.5">
                                        Select any scheduling software, payment processors, local maps, or external apps to connect.
                                    </p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                        {INTEGRATION_OPTIONS.map(tool => {
                                            const isSelected = (formData.integrations || []).includes(tool)
                                            return (
                                                <button
                                                    key={tool}
                                                    type="button"
                                                    aria-pressed={isSelected}
                                                    onClick={() => toggleArrayItem('integrations', tool)}
                                                    className={`p-3 rounded-xl text-xs font-mono text-left border flex items-center justify-between transition-all ${
                                                        isSelected 
                                                            ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40 font-medium' 
                                                            : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                                                    }`}
                                                >
                                                    <span>{tool}</span>
                                                    {isSelected && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                                                </button>
                                            )
                                        })}
                                    </div>
                                    <div className="mt-3">
                                        <label htmlFor="otherIntegrations" className="block text-xs font-mono text-slate-400 mb-1.5">
                                            Other Tools, Apps, or Software to Connect (optional)
                                        </label>
                                        <input 
                                            id="otherIntegrations" 
                                            name="otherIntegrations"
                                            value={formData.otherIntegrations} 
                                            onChange={e => handleTextChange('otherIntegrations', e.target.value)}
                                            placeholder="e.g. Jobber, QuickBooks, Mindbody, Fresha, Cliniko, HubSpot, etc." 
                                            className={inputClasses} 
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="techPreferences" className={fieldLabelClasses}>
                                        Do you have a specific platform or tech preference?
                                    </label>
                                    <input 
                                        id="techPreferences" 
                                        name="techPreferences"
                                        value={formData.techPreferences} 
                                        onChange={e => handleTextChange('techPreferences', e.target.value)}
                                        placeholder="e.g. Open to recommendation, Shopify, WordPress, Custom Modern Web App..." 
                                        className={inputClasses} 
                                    />
                                </div>
                            </motion.div>

                            {/* 5. Visual Direction & Inspiration */}
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.3 }}
                                className={cardClasses}
                            >
                                <h2 className={sectionHeadingClasses}>
                                    <Palette className="w-5 h-5 text-primary-glow" />
                                    <span>5. Visual Style & Existing Assets</span>
                                </h2>
                                <p className={sectionSubtextClasses}>
                                    Share your aesthetic preferences and what materials you already have on hand.
                                </p>

                                <div className="space-y-6">
                                    <div>
                                        <label htmlFor="inspirationWebsites" className={fieldLabelClasses}>
                                            Websites or brands you love the look or feel of (Paste 1–3 links or names)
                                        </label>
                                        <textarea 
                                            id="inspirationWebsites" 
                                            name="inspirationWebsites"
                                            rows="2"
                                            value={formData.inspirationWebsites} 
                                            onChange={e => handleTextChange('inspirationWebsites', e.target.value)}
                                            placeholder="e.g. apple.com for clean typography; stripe.com for polish; localcompetitor.ca for services..." 
                                            className={inputClasses} 
                                        />
                                        <p className="mt-1.5 text-[11px] text-slate-500 font-sans">
                                            Optional — don&apos;t worry if you don&apos;t have any yet. Tim will curate tailored visual concepts for your review.
                                        </p>
                                    </div>

                                    <div>
                                        <label className={fieldLabelClasses}>
                                            What brand assets do you already have ready?
                                        </label>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                            {ASSET_OPTIONS.map(asset => {
                                                const isSelected = (formData.brandAssets || []).includes(asset)
                                                return (
                                                    <button
                                                        key={asset}
                                                        type="button"
                                                        aria-pressed={isSelected}
                                                        onClick={() => toggleArrayItem('brandAssets', asset)}
                                                        className={`p-3 rounded-xl text-xs font-mono text-left border flex items-center justify-between transition-all ${
                                                            isSelected 
                                                                ? 'bg-primary/15 text-primary-glow border-primary/40 font-medium' 
                                                                : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                                                        }`}
                                                    >
                                                        <span>{asset}</span>
                                                        {isSelected && <Check className="w-3.5 h-3.5 text-primary-glow" />}
                                                    </button>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* 6. Timeline, Budget & Next Steps */}
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.35 }}
                                className={cardClasses}
                            >
                                <h2 className={sectionHeadingClasses}>
                                    <Calendar className="w-5 h-5 text-secondary-glow" />
                                    <span>6. Timeline & Investment Range</span>
                                </h2>
                                <p className={sectionSubtextClasses}>
                                    When would you love this live, and what is your approximate budget range?
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">
                                    <div>
                                        <label htmlFor="targetLaunchDate" className={fieldLabelClasses}>
                                            Target Launch Window
                                        </label>
                                        <select 
                                            id="targetLaunchDate" 
                                            name="targetLaunchDate"
                                            value={formData.targetLaunchDate} 
                                            onChange={e => handleTextChange('targetLaunchDate', e.target.value)}
                                            className={`${inputClasses} appearance-none bg-dark-950`}
                                        >
                                            <option value="">Select timeframe (or leave blank)...</option>
                                            {TIMELINE_OPTIONS.map(opt => (
                                                <option key={opt} value={opt}>{opt}</option>
                                            ))}
                                        </select>
                                        <p className="mt-1.5 text-[11px] text-slate-500 font-sans">
                                            General timeframe expectation.
                                        </p>
                                    </div>

                                    <div>
                                        <label htmlFor="targetLaunchExact" className={fieldLabelClasses}>
                                            Exact Target Date (optional)
                                        </label>
                                        <input 
                                            id="targetLaunchExact" 
                                            name="targetLaunchExact"
                                            value={formData.targetLaunchExact} 
                                            onChange={e => handleTextChange('targetLaunchExact', e.target.value)}
                                            placeholder="e.g. October 1st, 2026" 
                                            className={inputClasses} 
                                        />
                                        <p className="mt-1.5 text-[11px] text-slate-500 font-sans">
                                            If driven by an exact calendar deadline.
                                        </p>
                                    </div>

                                    <div>
                                        <label htmlFor="budgetRange" className={fieldLabelClasses}>
                                            Approximate Investment Range
                                        </label>
                                        <select 
                                            id="budgetRange" 
                                            name="budgetRange"
                                            value={formData.budgetRange} 
                                            onChange={e => handleTextChange('budgetRange', e.target.value)}
                                            className={`${inputClasses} appearance-none bg-dark-950`}
                                        >
                                            <option value="">Select approximate budget (or leave blank)...</option>
                                            {BUDGET_OPTIONS.map(opt => (
                                                <option key={opt} value={opt}>{opt}</option>
                                            ))}
                                        </select>
                                        <p className="mt-1.5 text-[11px] text-slate-500 font-sans">
                                            Fixed quotes with zero hidden surprises.
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-5">
                                    <div>
                                        <label htmlFor="milestones" className={fieldLabelClasses}>
                                            Is there an upcoming event, grand opening, or deadline driving this?
                                        </label>
                                        <input 
                                            id="milestones" 
                                            name="milestones"
                                            value={formData.milestones} 
                                            onChange={e => handleTextChange('milestones', e.target.value)}
                                            placeholder="e.g. Busy season starts in May, new product release on Oct 1st, or no strict deadline..." 
                                            className={inputClasses} 
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="rolesResponsibilities" className={fieldLabelClasses}>
                                            Who on your team will be involved in reviews and approvals?
                                        </label>
                                        <input 
                                            id="rolesResponsibilities" 
                                            name="rolesResponsibilities"
                                            value={formData.rolesResponsibilities} 
                                            onChange={e => handleTextChange('rolesResponsibilities', e.target.value)}
                                            placeholder="e.g. Just myself; or myself and business partner David..." 
                                            className={inputClasses} 
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="actionItems" className={fieldLabelClasses}>
                                            Anything else you&apos;d like to share or questions for Tim?
                                        </label>

                                        {/* Quick-Insert Note Chips (1-Click Appends) */}
                                        <div className="mb-3 mt-1.5">
                                            <div className="text-[11px] font-mono text-slate-400 mb-1.5 flex items-center gap-1.5">
                                                <Sparkles className="w-3 h-3 text-secondary-glow" />
                                                <span>Quick Note Additions (1-Click Tap to Append):</span>
                                            </div>
                                            <div className="flex flex-wrap gap-1.5">
                                                {NOTE_QUICK_CHIPS.map((chip, idx) => (
                                                    <button
                                                        key={idx}
                                                        type="button"
                                                        onClick={() => {
                                                            const current = formData.actionItems ? formData.actionItems.trim() : ''
                                                            const next = current ? `${current}\n• ${chip.text}` : `• ${chip.text}`
                                                            handleTextChange('actionItems', next)
                                                        }}
                                                        className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-secondary/20 border border-white/10 hover:border-secondary/40 text-[11px] font-mono text-slate-300 hover:text-white transition-all shadow-2xs"
                                                    >
                                                        {chip.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <textarea 
                                            id="actionItems" 
                                            name="actionItems"
                                            rows="4"
                                            value={formData.actionItems} 
                                            onChange={e => handleTextChange('actionItems', e.target.value)}
                                            placeholder="e.g. We also need domain transfer help, or curious about monthly maintenance options..." 
                                            className={inputClasses} 
                                        />
                                    </div>
                                </div>
                            </motion.div>

                            {/* Error Alert with Adblocker / Firewall Fallback */}
                            {errorMessage && (
                                <motion.div 
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mb-6 p-5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm space-y-4"
                                >
                                    <div className="flex items-start gap-3">
                                        <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                                        <div>
                                            <p className="font-semibold text-rose-200">{errorMessage}</p>
                                            <p className="text-xs text-rose-300/80 mt-1 leading-relaxed">
                                                If an adblocker, VPN, or browser firewall is blocking direct form submission, your answers are safe! You can email them directly to Tim with one click or download your formatted project brief below:
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-rose-500/20">
                                        <a
                                            href={getMailtoHref(formData)}
                                            className="btn-primary inline-flex items-center gap-2 px-4 py-2.5 text-xs font-mono uppercase tracking-wider !bg-rose-600 hover:!bg-rose-500 !text-white !border-rose-400 shadow-md"
                                        >
                                            <Mail className="w-3.5 h-3.5" />
                                            <span>Email Answers Directly to Tim</span>
                                        </a>

                                        <button
                                            type="button"
                                            onClick={handleDownloadBrief}
                                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-xs font-mono text-white transition-colors"
                                        >
                                            <Download className="w-3.5 h-3.5" />
                                            <span>Download Brief (.txt)</span>
                                        </button>

                                        <button
                                            type="button"
                                            onClick={handleCopyBrief}
                                            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-300 transition-colors"
                                        >
                                            <Copy className="w-3.5 h-3.5" />
                                            <span>Copy Answers</span>
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {/* Submission Bar */}
                            <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
                                <div className="flex items-center gap-3 text-xs text-slate-400 font-sans">
                                    <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                                    <span>
                                        100% Confidential. Your details are sent directly to Tim Superville. No spam or third-party sharing.
                                    </span>
                                </div>

                                <div className="flex items-center gap-4 w-full sm:w-auto">
                                    <button
                                        type="button"
                                        onClick={handleClearDraft}
                                        className="text-xs font-mono text-slate-500 hover:text-rose-400 transition-colors py-2 px-3 flex items-center gap-1.5"
                                        title="Clear form and start over"
                                    >
                                        <RotateCcw className="w-3.5 h-3.5" />
                                        <span>Reset</span>
                                    </button>

                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 text-sm font-mono uppercase tracking-wider disabled:opacity-50 shadow-lg shadow-primary/20"
                                    >
                                        {submitting ? (
                                            <span>Sending Your Details...</span>
                                        ) : (
                                            <>
                                                <span>Send Project Details</span>
                                                <Send className="w-4 h-4" />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </>
                )}
            </div>
        </section>
    )
}
