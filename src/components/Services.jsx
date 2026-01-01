import React from 'react'
import { motion } from 'framer-motion'
import { services } from '../data/services'

export default function Services() {
    return (
        <section id="services" className="py-20">
            <div className="max-w-6xl mx-auto px-5">
                <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-2xl font-bold mb-6"
                >
                    Services
                </motion.h2>
                <div className="grid gap-6 md:grid-cols-3">
                    {services.map((s, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
                        >
                            <h3 className="font-semibold mb-2">{s.title}</h3>
                            <p className="text-sm text-gray-600">{s.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
