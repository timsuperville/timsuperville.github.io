import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
    Layers, 
    Server, 
    Cloud, 
    ShieldCheck, 
    CheckCircle2, 
    Terminal
} from 'lucide-react'

const skillData = [
    // Frontend
    { name: 'React 18 / 19', category: 'Frontend', level: 'Expert', years: '6+ yrs', desc: 'Hooks, Concurrent Mode, Suspense, Custom Context Architectures' },
    { name: 'TypeScript & ESNext', category: 'Frontend', level: 'Expert', years: '5+ yrs', desc: 'Strict mode, generics, type-safe API contracts, zero any' },
    { name: 'Tailwind CSS & Systems', category: 'Frontend', level: 'Expert', years: '4+ yrs', desc: 'Modern CSS, responsive layouts, design systems, dark mode' },
    { name: 'Next.js & Vite', category: 'Frontend', level: 'Advanced', years: '4+ yrs', desc: 'SSR, SSG, route handlers, dynamic bundling, ultra-fast HMR' },
    { name: 'Framer Motion', category: 'Frontend', level: 'Advanced', years: '3+ yrs', desc: 'Physics-based micro-interactions, layout transitions, gestures' },
    { name: 'HTML5 & ARIA (WCAG AA)', category: 'Frontend', level: 'Expert', years: '6+ yrs', desc: 'Semantic tree, screen-reader landmarks, keyboard navigation' },

    // Backend
    { name: 'Node.js & Express', category: 'Backend', level: 'Advanced', years: '5+ yrs', desc: 'Asynchronous event loop, streaming APIs, middleware chains' },
    { name: 'PostgreSQL & SQL', category: 'Backend', level: 'Advanced', years: '4+ yrs', desc: 'Relational schemas, indexing strategies, migrations, ACID' },
    { name: 'REST & GraphQL APIs', category: 'Backend', level: 'Expert', years: '5+ yrs', desc: 'Idempotent endpoints, schema stitching, pagination, rate limiting' },
    { name: 'Stripe API & Webhooks', category: 'Backend', level: 'Advanced', years: '3+ yrs', desc: 'Subscription flows, payment intents, retry logic, invoices' },
    { name: 'Redis & In-Memory Caching', category: 'Backend', level: 'Intermediate', years: '3+ yrs', desc: 'Session storage, cache invalidation, throughput acceleration' },

    // Cloud & DevOps
    { name: 'GitHub Actions & CI/CD', category: 'Cloud & DevOps', level: 'Expert', years: '4+ yrs', desc: 'Automated test runners, branch protection, zero-downtime deploy' },
    { name: 'Docker & Containers', category: 'Cloud & DevOps', level: 'Advanced', years: '3+ yrs', desc: 'Multi-stage builds, isolated environments, compose configurations' },
    { name: 'Serverless Functions', category: 'Cloud & DevOps', level: 'Advanced', years: '4+ yrs', desc: 'Edge workers, Lambda, event triggers, cold-start mitigation' },
    { name: 'Lighthouse CI & Vitals', category: 'Cloud & DevOps', level: 'Expert', years: '4+ yrs', desc: 'Core Web Vitals enforcement (LCP, FID/INP, CLS) in pull requests' },

    // Testing & Quality
    { name: 'Vitest & Jest', category: 'Testing', level: 'Expert', years: '4+ yrs', desc: 'Fast unit testing, mock strategies, snapshot & component assertions' },
    { name: 'React Testing Library', category: 'Testing', level: 'Expert', years: '4+ yrs', desc: 'User-centric behavior testing, accessibility role queries, act() handling' },
    { name: 'ESLint & Prettier', category: 'Testing', level: 'Expert', years: '5+ yrs', desc: 'Automated AST linting, clean code mandates, team standards' }
]

const categories = [
    { id: 'All', label: 'All Disciplines', icon: Terminal },
    { id: 'Frontend', label: 'Frontend Architecture', icon: Layers },
    { id: 'Backend', label: 'Backend & APIs', icon: Server },
    { id: 'Cloud & DevOps', label: 'Cloud & CI/CD', icon: Cloud },
    { id: 'Testing', label: 'Testing & Quality', icon: ShieldCheck },
]

export default function TechMatrix() {
    const [selectedCat, setSelectedCat] = useState('All')

    const filtered = selectedCat === 'All' 
        ? skillData 
        : skillData.filter(s => s.category === selectedCat)

    return (
        <section id="tech-stack" className="py-24 relative overflow-hidden bg-dark-950">
            {/* Ambient Lighting */}
            <div className="absolute top-1/3 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-10 left-10 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="section-container relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary-glow text-xs font-mono uppercase tracking-wider mb-4">
                        <Terminal className="w-3.5 h-3.5" />
                        <span>Skills & Technologies</span>
                    </div>
                    <h2 className="text-3xl sm:text-5xl font-bold mb-4 tracking-tight">
                        Built for <span className="text-gradient">Quality & Reliability</span>
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-base sm:text-lg">
                        A proven full-stack skillset honed across 6+ years of building websites, web applications, and reliable business tools.
                    </p>
                </motion.div>

                {/* Category Filters */}
                <div className="flex flex-wrap justify-center gap-2 mb-12">
                    {categories.map(cat => {
                        const Icon = cat.icon
                        const isActive = selectedCat === cat.id
                        return (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCat(cat.id)}
                                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 border ${
                                    isActive
                                        ? 'bg-primary/20 border-primary-glow text-white shadow-glow-primary shadow-lg'
                                        : 'bg-white/[0.03] border-white/10 text-slate-400 hover:bg-white/[0.06] hover:text-white'
                                }`}
                            >
                                <Icon className="w-4 h-4 text-primary-glow" />
                                <span>{cat.label}</span>
                            </button>
                        )
                    })}
                </div>

                {/* Grid */}
                <motion.div 
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    <AnimatePresence mode="popLayout">
                        {filtered.map(skill => (
                            <motion.div
                                key={skill.name}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.3 }}
                                className="glass-card flex flex-col justify-between group hover:border-primary/40"
                            >
                                <div>
                                    <div className="flex items-start justify-between gap-2 mb-3">
                                        <h3 className="font-bold text-lg text-white group-hover:text-primary-glow transition-colors">
                                            {skill.name}
                                        </h3>
                                        <span className={`text-xs font-mono px-2.5 py-0.5 rounded-full border ${
                                            skill.level === 'Expert' 
                                                ? 'bg-primary/10 border-primary/30 text-primary-glow' 
                                                : 'bg-secondary/10 border-secondary/30 text-secondary-glow'
                                        }`}>
                                            {skill.level}
                                        </span>
                                    </div>
                                    <p className="text-sm text-slate-400 leading-relaxed mb-4">
                                        {skill.desc}
                                    </p>
                                </div>

                                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-500 font-mono">
                                    <span className="flex items-center gap-1.5 text-slate-400">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                                        <span>Production Proven</span>
                                    </span>
                                    <span className="text-slate-400">{skill.years}</span>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    )
}
