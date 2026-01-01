import React from 'react'
import { motion } from 'framer-motion'
import { projects } from '../data/projects'

export default function Portfolio() {
    return (
        <section id="portfolio" className="bg-white py-20">
            <div className="max-w-6xl mx-auto px-5">
                <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-2xl font-bold mb-6"
                >
                    Recent Projects
                </motion.h2>
                <div className="grid gap-6 md:grid-cols-2">
                    {projects.map((p, i) => (
                        <motion.article
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.2 }}
                            className="rounded-lg overflow-hidden shadow card-elevated hover:shadow-xl transition-shadow"
                        >
                            <img src={p.image} alt={p.alt} loading="lazy" className="w-full h-48 object-cover transform hover:scale-105 transition-transform duration-500" />
                            <div className="p-4 bg-white relative z-10">
                                <h3 className="font-semibold">{p.title}</h3>
                                <p className="text-sm text-gray-600">{p.description}</p>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    )
}
