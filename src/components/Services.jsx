
import { motion } from 'framer-motion'
import { Globe, Smartphone, Zap, Code2, Layout, Rocket } from 'lucide-react'
import { services } from '../data/services'

const getIcon = (title) => {
    const t = title.toLowerCase()
    if (t.includes('web') || t.includes('dev')) return <Code2 className="w-8 h-8 text-primary" />
    if (t.includes('responsive') || t.includes('design')) return <Layout className="w-8 h-8 text-secondary" />
    if (t.includes('performance') || t.includes('seo')) return <Rocket className="w-8 h-8 text-accent" />
    return <Zap className="w-8 h-8 text-primary" />
}

export default function Services() {
    return (
        <section id="services" className="py-24 relative">
            <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

            <div className="section-container relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Expertise & <span className="text-gradient">Services</span>
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        I combine technical depth with design sensibility to deliver complete digital products.
                    </p>
                </motion.div>

                <div className="grid gap-8 md:grid-cols-3">
                    {services.map((s, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="glass-card group"
                        >
                            <div className="mb-6 p-4 rounded-xl bg-white/5 w-fit group-hover:scale-110 transition-transform duration-300 border border-white/10 group-hover:border-primary/30">
                                {getIcon(s.title)}
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-slate-100 group-hover:text-primary-glow transition-colors">{s.title}</h3>
                            <p className="text-slate-400 leading-relaxed">{s.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
