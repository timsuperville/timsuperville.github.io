import React from 'react'
import { motion } from 'framer-motion'
import { trackEvent } from '../analytics'
import { caseStudies } from '../data/caseStudies'

export default function CaseStudies() {
    return (
        <section id="case-studies" className="py-16 bg-gray-50">
            <div className="max-w-6xl mx-auto px-5">
                <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-2xl font-bold mb-6"
                >
                    Case studies
                </motion.h2>
                <div className="grid gap-6 md:grid-cols-2">
                    {caseStudies.map((study, i) => (
                        <motion.article
                            key={study.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.2 }}
                            className="bg-white p-6 rounded-lg shadow card-elevated"
                        >
                            <h3 className="font-semibold mb-2">{study.listTitle}</h3>
                            <p className="text-sm text-gray-700 mb-3">{study.shortDescription}</p>
                            <p className="text-xs text-gray-500">{study.shortTech}</p>
                            <div className="mt-4">
                                <a href={`#case/${study.id}`} className="text-sky-600 hover:underline" onClick={() => { try { trackEvent('case_open', { id: study.id }) } catch (e) { } }}>Read case study →</a>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    )
}
