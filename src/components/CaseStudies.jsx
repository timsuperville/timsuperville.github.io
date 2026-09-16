import React from 'react'
import { motion } from 'framer-motion'
import { trackEvent } from '../lib/analytics'
import { projects } from '../data'
import { ArrowRight, BookOpen, TrendingUp } from 'lucide-react'

export default function CaseStudies() {
    return (
        <section id="case-studies" className="py-24 relative overflow-hidden bg-dark-950">
            {/* Ambient Lighting */}
            <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[140px] -translate-y-1/2 pointer-events-none"></div>

            <div className="section-container relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-2xl mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/25 text-secondary-glow text-xs font-mono uppercase tracking-wider mb-4">
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Case Studies & Results</span>
                    </div>
                    <h2 className="text-3xl sm:text-5xl font-bold mb-4 tracking-tight">
                        Project <span className="text-gradient">Case Studies</span>
                    </h2>
                    <p className="text-slate-400 text-base sm:text-lg">
                        Real problems, how they were solved, and the measurable results achieved.
                    </p>
                </motion.div>

                <div className="space-y-8">
                    {projects.map((study, i) => (
                        <motion.article
                            key={study.id}
                            initial={{ opacity: 0, y: 25 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.15 }}
                            className="glass-card group p-6 sm:p-10 border border-white/10 hover:border-primary/40 transition-all duration-300"
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                                {/* Details (8 cols) */}
                                <div className="lg:col-span-8">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="text-xs font-mono uppercase tracking-wider text-primary-glow font-semibold">
                                            {study.category}
                                        </span>
                                    </div>

                                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 group-hover:text-primary-glow transition-colors">
                                        {study.listTitle}
                                    </h3>

                                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                                        {study.shortDescription}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {study.shortTech.replace('Tech: ', '').split(',').map((t, idx) => (
                                            <span key={idx} className="text-xs font-mono text-slate-400 bg-white/[0.04] border border-white/5 px-2.5 py-1 rounded-md">
                                                {t.trim()}
                                            </span>
                                        ))}
                                    </div>

                                    <a
                                        href={`#case/${study.id}`}
                                        className="inline-flex items-center gap-2 text-sm font-mono font-semibold text-primary-glow hover:text-white transition-colors group-hover:gap-3"
                                        onClick={() => { try { trackEvent('case_open', { id: study.id }) } catch { } }}
                                    >
                                        <span>Read Case Study</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </a>
                                </div>

                                {/* Stat Box (4 cols) */}
                                <div className="lg:col-span-4 flex flex-col justify-center p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                                    <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-2">
                                        <TrendingUp className="w-4 h-4 text-emerald-400" />
                                        <span>Key Impact Benchmark</span>
                                    </div>
                                    <div className="text-4xl sm:text-5xl font-extrabold text-white font-mono tracking-tight mb-1">
                                        {study.statValue}
                                    </div>
                                    <div className="text-sm font-medium text-slate-300 mb-4">
                                        {study.statLabel}
                                    </div>
                                    <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-slate-400">
                                        <span>Secondary Metric</span>
                                        <span className="text-primary-glow font-bold">{study.secondaryStatValue} {study.secondaryStatLabel}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    )
}
