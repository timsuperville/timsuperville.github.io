import React from 'react'
import { motion } from 'framer-motion'
import { Quote, Sparkles, CheckCircle2 } from 'lucide-react'
import { testimonials } from '../data/testimonials'

export default function Testimonials() {
    return (
        <section id="testimonials" className="py-24 relative overflow-hidden bg-dark-900/30">
            {/* Ambient Accents */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-[140px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[140px] pointer-events-none"></div>

            <div className="section-container relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/25 text-primary-glow text-xs font-mono uppercase tracking-wider mb-4">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Client Endorsements</span>
                    </div>
                    <h2 className="text-3xl sm:text-5xl font-bold mb-4 tracking-tight">
                        Trusted by <span className="text-gradient">Founders & Engineering Leaders</span>
                    </h2>
                    <p className="text-slate-400 max-w-xl mx-auto text-base sm:text-lg">
                        Direct feedback from product owners, CTOs, and founders who have collaborated with me.
                    </p>
                </motion.div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="glass-card flex flex-col justify-between relative border border-white/10 hover:border-primary/40"
                        >
                            <Quote className="absolute top-6 right-6 w-8 h-8 text-white/5 pointer-events-none" />

                            <div>
                                {t.highlight && (
                                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-4">
                                        <CheckCircle2 className="w-3.5 h-3.5" />
                                        <span>{t.highlight}</span>
                                    </div>
                                )}

                                <p className="text-slate-300 italic text-sm sm:text-base leading-relaxed mb-8">
                                    &ldquo;{t.quote}&rdquo;
                                </p>
                            </div>

                            <div className="pt-4 border-t border-white/5 flex items-center gap-3.5">
                                <img
                                    src={t.avatar}
                                    alt={t.author}
                                    className="w-12 h-12 rounded-full object-cover border border-white/15 shadow-md"
                                />
                                <div>
                                    <div className="font-bold text-white text-sm">{t.author}</div>
                                    <div className="text-xs text-slate-400">{t.role}</div>
                                    <div className="text-[11px] font-mono text-primary-glow/90">{t.company}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
