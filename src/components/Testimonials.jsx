
import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import { testimonials } from '../data/testimonials'

export default function Testimonials() {
    return (
        <section id="testimonials" className="py-24 relative overflow-hidden">
            {/* Background Accents */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -z-10"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10"></div>

            <div className="section-container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Client <span className="text-gradient">Feedback</span>
                    </h2>
                    <p className="text-slate-400">Trusted by founders and product teams.</p>
                </motion.div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="glass-card relative"
                        >
                            <Quote className="absolute top-6 right-6 w-8 h-8 text-primary/20" />
                            <p className="text-slate-300 italic mb-6 relative z-10">&quot;{t.quote}&quot;</p>
                            <footer className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-lg">
                                    {t.author.charAt(0)}
                                </div>
                                <div>
                                    <div className="font-bold text-white">{t.author}</div>
                                    <div className="text-sm text-slate-500">Client</div>
                                </div>
                            </footer>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
