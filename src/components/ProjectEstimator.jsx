import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { 
    Calculator, 
    Clock, 
    ArrowRight, 
    Check, 
    Layers, 
    ShoppingCart, 
    Globe, 
    Gauge,
    Building2,
    ClipboardList,
    Sparkles
} from 'lucide-react'
import { STORAGE_KEY } from '../constants/intake'

const projectTypes = [
    {
        id: 'web-app',
        title: 'SaaS / Web Application',
        basePrice: 5000,
        baseWeeks: 4,
        icon: Layers,
        desc: 'Interactive dashboard, user accounts, database, and custom API integration.'
    },
    {
        id: 'practice-hub',
        title: 'Clinic, Practice & Service Hub',
        basePrice: 3200,
        baseWeeks: 2,
        icon: Building2,
        desc: 'Online booking integration (Jane/Calendly), Google Maps embed, service showcases, and patient intake.'
    },
    {
        id: 'ecommerce',
        title: 'Headless E-Commerce',
        basePrice: 4000,
        baseWeeks: 3,
        icon: ShoppingCart,
        desc: 'Product catalog, Stripe checkout, inventory synchronization, and customer portal.'
    },
    {
        id: 'website',
        title: 'High-Impact Brand Site',
        basePrice: 2500,
        baseWeeks: 2,
        icon: Globe,
        desc: 'Conversion-optimized marketing site, AA accessibility, dynamic animations & SEO.'
    },
    {
        id: 'audit',
        title: 'Performance & Architecture Audit',
        basePrice: 1500,
        baseWeeks: 1,
        icon: Gauge,
        desc: 'Comprehensive Core Web Vitals diagnostic, bundle analysis, and actionable remediation.'
    }
]

const addOnFeatures = [
    { id: 'booking', label: 'Online Booking & Client Scheduling', price: 800, days: 4 },
    { id: 'local-seo', label: 'Google Maps & Local SEO Setup', price: 500, days: 3 },
    { id: 'intake-forms', label: 'Interactive Client Intake Engine', price: 700, days: 4 },
    { id: 'auth', label: 'User Authentication & RBAC', price: 1000, days: 5 },
    { id: 'payments', label: 'Stripe Payments / Subscriptions', price: 1200, days: 5 },
    { id: 'cms', label: 'CMS / Headless Blog Integration', price: 800, days: 4 },
    { id: 'seo', label: 'Comprehensive Technical SEO & Schema', price: 600, days: 3 },
    { id: 'design-system', label: 'Custom UI Component Library', price: 1500, days: 7 },
    { id: 'tests', label: 'Automated Vitest Test Suite (>90%)', price: 900, days: 4 }
]

export default function ProjectEstimator({ onSelectEstimate }) {
    const [selectedType, setSelectedType] = useState('web-app')
    const [selectedAddons, setSelectedAddons] = useState(['booking', 'local-seo', 'seo'])
    const [timelinePreference, setTimelinePreference] = useState('standard') // 'fast' | 'standard' | 'relaxed'

    const toggleAddon = (id) => {
        setSelectedAddons(prev => 
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        )
    }

    const { totalLow, totalHigh, totalWeeks, selectedTypeObj, selectedAddonObjs } = useMemo(() => {
        const typeObj = projectTypes.find(t => t.id === selectedType) || projectTypes[0]
        let price = typeObj.basePrice
        let days = typeObj.baseWeeks * 5

        const addonObjs = []
        selectedAddons.forEach(addonId => {
            const add = addOnFeatures.find(a => a.id === addonId)
            if (add) {
                addonObjs.push(add)
                price += add.price
                days += add.days
            }
        })

        if (timelinePreference === 'fast') {
            price *= 1.25 // 25% sprint rush premium
            days *= 0.75
        } else if (timelinePreference === 'relaxed') {
            price *= 0.95 // 5% flexibility discount
            days *= 1.2
        }

        const weeks = Math.max(1, Math.round(days / 5))
        const low = Math.round(price * 0.9)
        const high = Math.round(price * 1.15)

        return { 
            totalLow: low, 
            totalHigh: high, 
            totalWeeks: weeks,
            selectedTypeObj: typeObj,
            selectedAddonObjs: addonObjs
        }
    }, [selectedType, selectedAddons, timelinePreference])

    const handleApplyEstimate = () => {
        const typeObj = projectTypes.find(t => t.id === selectedType)
        const summary = `${typeObj?.title} with ${selectedAddons.length} features (~$${totalLow.toLocaleString()}–$${totalHigh.toLocaleString()} CAD)`
        
        if (onSelectEstimate) {
            onSelectEstimate({
                type: selectedType,
                budget: totalHigh > 20000 ? '>20k' : totalHigh > 5000 ? '5k-20k' : totalHigh > 1000 ? '1k-5k' : '<1k',
                message: `Hi Tim, I estimated our project (${summary}) on your site. We are looking for capabilities: ${selectedAddons.join(', ')} over ~${totalWeeks} weeks. Let's discuss!`
            })
        }
        
        window.location.hash = '#contact'
    }

    const handleHandoffToIntake = () => {
        try {
            const typeObj = projectTypes.find(t => t.id === selectedType)
            const budgetStr = totalHigh <= 2500 ? 'Under $2,500' : totalHigh <= 5000 ? '$2,500 – $5,000' : totalHigh <= 10000 ? '$5,000 – $10,000' : '$10,000+'
            const saved = localStorage.getItem(STORAGE_KEY)
            let existing = saved ? JSON.parse(saved) : {}

            const featureMap = {
                booking: 'Online Appointment Booking',
                'local-seo': 'Google Local SEO & Maps Setup',
                'intake-forms': 'Client Intake / Onboarding Forms',
                payments: 'Credit Card / Stripe Payments',
                seo: 'Google Local SEO & Maps Setup'
            }
            const mappedFeatures = selectedAddons.map(a => featureMap[a]).filter(Boolean)
            const currentFeatures = existing.interactiveFeatures || []
            const combinedFeatures = Array.from(new Set([...currentFeatures, ...mappedFeatures]))

            existing = {
                ...existing,
                budgetRange: budgetStr,
                interactiveFeatures: combinedFeatures,
                actionItems: existing.actionItems 
                    ? `${existing.actionItems}\n• Scope from Estimator: ${typeObj?.title} (~$${totalLow.toLocaleString()}–$${totalHigh.toLocaleString()} CAD, ~${totalWeeks} wks)`
                    : `• Scope from Estimator: ${typeObj?.title} (~$${totalLow.toLocaleString()}–$${totalHigh.toLocaleString()} CAD, ~${totalWeeks} wks)`
            }
            localStorage.setItem(STORAGE_KEY, JSON.stringify(existing))
        } catch { }
    }

    return (
        <section id="estimator" className="py-24 relative overflow-hidden bg-dark-900/40">
            <div className="section-container relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/25 text-secondary-glow text-xs font-mono uppercase tracking-wider mb-4">
                        <Calculator className="w-3.5 h-3.5" />
                        <span>Transparent Project Estimator</span>
                    </div>
                    <h2 className="text-3xl sm:text-5xl font-bold mb-4 tracking-tight">
                        Scope Your <span className="text-gradient">Project & Timeline</span>
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-base sm:text-lg">
                        Select your project requirements below for an instant ballpark investment range and delivery timeline.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Controls (Left 7 cols) */}
                    <div className="lg:col-span-7 space-y-8">
                        {/* Step 1: Project Type */}
                        <div>
                            <label className="block text-sm font-semibold uppercase tracking-wider text-slate-300 mb-4 font-mono">
                                1. Select Foundation Type
                            </label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {projectTypes.map(t => {
                                    const Icon = t.icon
                                    const isSelected = selectedType === t.id
                                    return (
                                        <button
                                            key={t.id}
                                            onClick={() => setSelectedType(t.id)}
                                            className={`p-4 rounded-xl text-left transition-all duration-200 border flex flex-col justify-between ${
                                                isSelected
                                                    ? 'bg-primary/15 border-primary-glow shadow-glow-primary shadow-md text-white'
                                                    : 'bg-white/[0.02] border-white/10 text-slate-400 hover:bg-white/[0.05] hover:text-slate-200'
                                            }`}
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <div className={`p-2 rounded-lg ${isSelected ? 'bg-primary/20 text-primary-glow' : 'bg-white/5 text-slate-400'}`}>
                                                    <Icon className="w-4 h-4" />
                                                </div>
                                                {isSelected && <Check className="w-4 h-4 text-primary-glow" />}
                                            </div>
                                            <div className="font-bold text-sm text-white mb-1">{t.title}</div>
                                            <div className="text-xs text-slate-400 leading-relaxed">{t.desc}</div>
                                        </button>
                                    )
                                })}
                            </div>
                        </div>

                        {/* Step 2: Add-on Capabilities */}
                        <div>
                            <label className="block text-sm font-semibold uppercase tracking-wider text-slate-300 mb-4 font-mono">
                                2. Add-on Features & Integrations
                            </label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {addOnFeatures.map(item => {
                                    const checked = selectedAddons.includes(item.id)
                                    return (
                                        <button
                                            key={item.id}
                                            onClick={() => toggleAddon(item.id)}
                                            className={`flex items-center justify-between p-3.5 rounded-xl border text-sm transition-all ${
                                                checked
                                                    ? 'bg-secondary/15 border-secondary-glow text-white shadow-sm'
                                                    : 'bg-white/[0.02] border-white/10 text-slate-400 hover:bg-white/[0.05]'
                                            }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={`w-4 h-4 rounded flex items-center justify-center border ${
                                                    checked ? 'bg-secondary-glow border-secondary-glow text-dark-950' : 'border-white/20 bg-transparent'
                                                }`}>
                                                    {checked && <Check className="w-3 h-3 stroke-[3]" />}
                                                </div>
                                                <span className="font-medium text-xs sm:text-sm">{item.label}</span>
                                            </div>
                                        </button>
                                    )
                                })}
                            </div>
                        </div>

                        {/* Step 3: Timeline Urgency */}
                        <div>
                            <label className="block text-sm font-semibold uppercase tracking-wider text-slate-300 mb-4 font-mono">
                                3. Delivery Pace
                            </label>
                            <div className="grid grid-cols-3 gap-3">
                                {[
                                    { id: 'fast', label: 'Accelerated Sprint', desc: 'Prioritized launch' },
                                    { id: 'standard', label: 'Standard Cadence', desc: 'Optimal balance' },
                                    { id: 'relaxed', label: 'Flexible Window', desc: 'Milestone pacing' }
                                ].map(p => (
                                    <button
                                        key={p.id}
                                        onClick={() => setTimelinePreference(p.id)}
                                        className={`p-3 rounded-xl border text-center transition-all ${
                                            timelinePreference === p.id
                                                ? 'bg-white/10 border-primary-glow text-white shadow-md'
                                                : 'bg-white/[0.02] border-white/10 text-slate-400 hover:bg-white/[0.05]'
                                        }`}
                                    >
                                        <div className="font-bold text-xs sm:text-sm text-white mb-0.5">{p.label}</div>
                                        <div className="text-[11px] text-slate-500">{p.desc}</div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Summary Card (Right 5 cols) */}
                    <div className="lg:col-span-5">
                        <div className="glass-card p-6 sm:p-8 sticky top-28 border border-primary/20 bg-dark-950/80">
                            <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Estimated Investment</span>
                                        <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/25">
                                            CAD
                                        </span>
                                    </div>
                                    <div className="text-3xl sm:text-4xl font-extrabold text-white">
                                        ${totalLow.toLocaleString()} <span className="text-xl font-normal text-slate-400">–</span> ${totalHigh.toLocaleString()}
                                    </div>
                                </div>
                                <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20 text-primary-glow">
                                    <Calculator className="w-6 h-6" />
                                </div>
                            </div>

                            <div className="space-y-3 mb-6">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="flex items-center gap-2 text-slate-300">
                                        <Clock className="w-4 h-4 text-primary-glow" />
                                        <span>Estimated Delivery</span>
                                    </span>
                                    <span className="font-mono font-bold text-white">~{totalWeeks} {totalWeeks === 1 ? 'Week' : 'Weeks'}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-slate-400">Included Modules</span>
                                    <span className="font-mono text-primary-glow font-semibold">{selectedAddons.length + 1} Packages</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-slate-400">Code Quality</span>
                                    <span className="font-mono text-green-400 font-semibold">100% Type-Safe & Tested</span>
                                </div>
                            </div>

                            {/* Itemized Scope Breakdown */}
                            <div className="py-4 border-y border-white/10 mb-6 space-y-2">
                                <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                                    <Sparkles className="w-3 h-3 text-secondary-glow" />
                                    <span>Selected Scope Breakdown:</span>
                                </div>
                                <div className="flex items-center justify-between text-xs text-slate-200">
                                    <span className="truncate max-w-[210px]">• {selectedTypeObj?.title}</span>
                                    <span className="font-mono text-slate-400">${selectedTypeObj?.basePrice.toLocaleString()}</span>
                                </div>
                                {selectedAddonObjs.map(addon => (
                                    <div key={addon.id} className="flex items-center justify-between text-xs text-slate-300">
                                        <span className="truncate max-w-[210px]">• {addon.label}</span>
                                        <span className="font-mono text-slate-400">+${addon.price.toLocaleString()}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-2.5">
                                <button
                                    onClick={handleApplyEstimate}
                                    className="w-full btn-primary flex items-center justify-center gap-2 py-3.5 text-sm sm:text-base group shadow-md shadow-primary/20"
                                >
                                    <span>Lock In This Scope</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>

                                <a
                                    href="#client-intake"
                                    onClick={handleHandoffToIntake}
                                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/5 hover:bg-secondary/15 border border-white/10 hover:border-secondary/30 text-xs font-mono text-slate-300 hover:text-white transition-all group"
                                >
                                    <ClipboardList className="w-4 h-4 text-secondary-glow" />
                                    <span>Transfer to Discovery Questionnaire ↗</span>
                                </a>
                            </div>

                            <p className="text-[11px] text-slate-500 text-center mt-4 leading-relaxed font-sans">
                                All quotes in CAD (USD accepted for US clients). Fixed milestone pricing with zero hidden fees confirmed before kickoff.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
