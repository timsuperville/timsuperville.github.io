import React from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, CheckCircle2, Zap, Terminal, HeartHandshake } from 'lucide-react'
import { principles } from '../data'

const icons = [Terminal, Zap, ShieldCheck, HeartHandshake]

export default function Testimonials() {
    return (
        <section id="principles" className="py-24 relative overflow-hidden bg-dark-900/30">
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
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Working Standards</span>
                    </div>
                    <h2 className="text-3xl sm:text-5xl font-bold mb-4 tracking-tight">
                        Freelance <span className="text-gradient">Engineering Principles</span>
                    </h2>
                    <p className="text-slate-400 max-w-xl mx-auto text-base sm:text-lg">
                        The working standards, delivery guarantees, and core values backing every client project.
                    </p>
                </motion.div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {principles.map((item, i) => {
                        const IconComponent = icons[i % icons.length]
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="glass-card flex flex-col justify-between relative border border-white/10 hover:border-primary/40 group p-6 sm:p-7"
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 text-primary-glow group-hover:scale-110 transition-transform">
                                            <IconComponent className="w-5 h-5" />
                                        </div>
                                        {item.metric && (
                                            <div className="text-right">
                                                <div className="text-lg font-mono font-bold text-white">{item.metric}</div>
                                                <div className="text-[10px] font-mono uppercase text-slate-500">{item.metricLabel}</div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-3">
                                        <CheckCircle2 className="w-3 h-3" />
                                        <span>{item.tag}</span>
                                    </div>

                                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary-glow transition-colors">
                                        {item.title}
                                    </h3>

                                    <p className="text-slate-400 text-sm leading-relaxed mb-4">
                                        {item.description}
                                    </p>
                                </div>

                                <div className="pt-4 border-t border-white/5 flex items-center gap-2 text-xs font-mono text-slate-400">
                                    <ShieldCheck className="w-3.5 h-3.5 text-primary-glow" />
                                    <span>Verified Standard</span>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
