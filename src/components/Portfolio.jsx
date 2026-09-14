import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Sparkles, TrendingUp } from 'lucide-react'
import { projects } from '../data/projects'
import Skeleton from './Skeleton'

export default function Portfolio() {
    const [filter, setFilter] = useState('All')
    const categories = ['All', 'Full Stack', 'Frontend']

    const filteredProjects = projects.filter(p => filter === 'All' || p.category === filter)

    return (
        <section id="portfolio" className="py-24 relative overflow-hidden bg-dark-900/40">
            {/* Subtle Ambient Radial */}
            <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[140px] pointer-events-none"></div>

            <div className="section-container relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-6"
                >
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary-glow text-xs font-mono uppercase tracking-wider mb-4">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Featured Projects</span>
                        </div>
                        <h2 className="text-3xl sm:text-5xl font-bold mb-4 tracking-tight">
                            Recent <span className="text-gradient">Work</span>
                        </h2>
                        <p className="text-slate-400 max-w-xl text-base sm:text-lg">
                            Real-world software systems, headless e-commerce, and enterprise applications delivered for high-growth clients.
                        </p>
                    </div>

                    {/* Filter Pills */}
                    <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-dark-950/60 border border-white/10 backdrop-blur-md">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all duration-200 ${
                                    filter === cat
                                        ? 'bg-primary/20 border border-primary-glow/50 text-white shadow-glow-primary shadow-sm'
                                        : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Project Grid */}
                <motion.div
                    layout
                    className="grid gap-8 lg:gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((p) => (
                            <PortfolioCard key={p.id} project={p} />
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    )
}

function PortfolioCard({ project }) {
    const [isLoaded, setIsLoaded] = useState(false)

    return (
        <motion.article
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.35 }}
            className="group glass-card flex flex-col justify-between overflow-hidden p-0 border border-white/10 hover:border-primary/40"
        >
            {/* Image Preview Container */}
            <div className="aspect-[16/10] overflow-hidden relative bg-dark-950">
                {!isLoaded && <Skeleton className="absolute inset-0 w-full h-full z-10" />}
                <img
                    src={project.image}
                    alt={project.alt}
                    loading="lazy"
                    onLoad={() => setIsLoaded(true)}
                    className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                        isLoaded ? 'opacity-90 group-hover:opacity-100' : 'opacity-0'
                    }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/20 to-transparent"></div>

                {/* Metric Badge */}
                {project.metrics && (
                    <div className="absolute top-4 left-4 z-20 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-dark-950/80 backdrop-blur-md border border-primary/30 text-primary-glow text-xs font-mono font-semibold shadow-lg">
                        <TrendingUp className="w-3.5 h-3.5" />
                        <span>{project.metrics}</span>
                    </div>
                )}
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-7 flex flex-col justify-between flex-grow">
                <div>
                    <div className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-2">
                        {project.category}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-glow transition-colors">
                        {project.title}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed mb-6">
                        {project.description}
                    </p>
                </div>

                <div>
                    {/* Tech Pills */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                        {project.tags.map((tag, idx) => (
                            <span
                                key={idx}
                                className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/[0.04] border border-white/5 text-slate-400"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Action */}
                    <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                        <a
                            href={`#case/${project.id}`}
                            className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-primary-glow group-hover:text-white transition-colors"
                        >
                            <span>Read Full Case Study</span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>
                </div>
            </div>
        </motion.article>
    )
}
