import React from 'react'
import { motion } from 'framer-motion'
import { Code2, Gauge, CreditCard, Activity, CheckCircle2, ArrowRight } from 'lucide-react'
import { services } from '../data'

const getIcon = (id) => {
    switch (id) {
        case 'fullstack':
            return <Code2 className="w-6 h-6 text-primary-glow" />
        case 'performance-seo':
            return <Gauge className="w-6 h-6 text-secondary-glow" />
        case 'cloud-payments':
            return <CreditCard className="w-6 h-6 text-emerald-400" />
        case 'realtime-media':
            return <Activity className="w-6 h-6 text-primary-glow" />
        default:
            return <Code2 className="w-6 h-6 text-primary-glow" />
    }
}

export default function Services() {
    return (
        <section id="services" className="py-24 relative overflow-hidden bg-dark-950">
            {/* Ambient Lighting */}
            <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[140px] -translate-y-1/2 pointer-events-none"></div>

            <div className="section-container relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary-glow text-xs font-mono uppercase tracking-wider mb-4">
                        <span>Services & Solutions</span>
                    </div>
                    <h2 className="text-3xl sm:text-5xl font-bold mb-4 tracking-tight">
                        Web Development & <span className="text-gradient">Services</span>
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-base sm:text-lg">
                        Reliable, well-built web solutions designed to solve real business problems — built right the first time.
                    </p>
                </motion.div>

                <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
                    {services.map((s, i) => (
                        <motion.div
                            key={s.id || i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="glass-card group flex flex-col justify-between"
                        >
                            <div>
                                <div className="flex items-start justify-between gap-4 mb-6">
                                    <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 group-hover:scale-110 group-hover:border-primary/40 group-hover:shadow-glow-primary transition-all duration-300">
                                        {getIcon(s.id)}
                                    </div>
                                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-slate-400">
                                        {s.badge}
                                    </span>
                                </div>

                                <h3 className="text-xl sm:text-2xl font-bold mb-3 text-white group-hover:text-primary-glow transition-colors">
                                    {s.title}
                                </h3>

                                <p className="text-slate-400 leading-relaxed mb-6 text-sm sm:text-base">
                                    {s.description}
                                </p>

                                <div className="space-y-2.5 mb-6">
                                    {s.features.map((feat, idx) => (
                                        <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-300">
                                            <CheckCircle2 className="w-4 h-4 text-primary-glow shrink-0" />
                                            <span>{feat}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-3">
                                <div className="flex flex-wrap gap-1.5">
                                    {s.stack.map((st, idx) => (
                                        <span key={idx} className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/[0.03] border border-white/5 text-slate-400">
                                            {st}
                                        </span>
                                    ))}
                                </div>

                                <a 
                                    href="#estimator" 
                                    className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-primary-glow group-hover:translate-x-1 transition-transform"
                                >
                                    <span>Estimate This Service</span>
                                    <ArrowRight className="w-3.5 h-3.5" />
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
