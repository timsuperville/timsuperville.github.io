
import { motion } from 'framer-motion'
import { trackEvent } from '../analytics'
import { caseStudies } from '../data/caseStudies'
import { ArrowRight, BookOpen } from 'lucide-react'

export default function CaseStudies() {
    return (
        <section id="case-studies" className="py-24 relative">
            <div className="section-container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary-glow text-sm font-medium mb-4">
                        <BookOpen className="w-4 h-4" />
                        <span>In Depth</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Case <span className="text-gradient">Studies</span>
                    </h2>
                    <p className="text-slate-400 max-w-2xl">
                        A deeper look into my process, technical challenges, and solutions.
                    </p>
                </motion.div>

                <div className="grid gap-8 md:grid-cols-2">
                    {caseStudies.map((study, i) => (
                        <motion.article
                            key={study.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.2 }}
                            className="glass-card group flex flex-col h-full"
                        >
                            <h3 className="text-2xl font-bold mb-3 text-slate-100 group-hover:text-primary-glow transition-colors">{study.listTitle}</h3>
                            <p className="text-slate-400 mb-6 flex-grow">{study.shortDescription}</p>

                            <div className="flex flex-wrap gap-2 mb-6">
                                {study.shortTech.replace('Tech: ', '').split(',').map((t, idx) => (
                                    <span key={idx} className="text-xs font-mono text-slate-500 bg-white/5 px-2 py-1 rounded">
                                        {t.trim()}
                                    </span>
                                ))}
                            </div>

                            <a
                                href={`#case/${study.id}`}
                                className="inline-flex items-center gap-2 text-primary-glow font-semibold group-hover:gap-3 transition-all"
                                onClick={() => { try { trackEvent('case_open', { id: study.id }) } catch { } }}
                            >
                                Read Case Study <ArrowRight className="w-4 h-4" />
                            </a>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    )
}
