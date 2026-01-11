
import { motion } from 'framer-motion'
import { Github, Linkedin, FileText } from 'lucide-react'

export default function About() {
    const techStack = [
        'React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL',
        'Tailwind', 'GraphQL', 'AWS', 'Framer Motion', 'Docker', 'Figma'
    ]

    return (
        <section id="about" className="py-24 relative overflow-hidden bg-dark-900/30">
            <div className="section-container">
                <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-20 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            About <span className="text-gradient">Tim Superville</span>
                        </h2>

                        <div className="space-y-4 text-slate-400 text-lg leading-relaxed mb-8">
                            <p>
                                I&apos;m a passionate web developer focused on building useful, beautiful digital products. I specialize in the React ecosystem, Node.js, and modern frontend tooling.
                            </p>
                            <p>
                                My philosophy is simple: **Start with the user.** Whether I'm building a small business landing page or a complex SaaS application, I prioritize speed, accessibility, and delight.
                            </p>
                            <p>
                                Available for freelance projects, consultations, and long-term partnerships.
                            </p>
                        </div>

                        <div className="relative overflow-hidden w-full max-w-xl mb-8 -mx-4 md:mx-0 mask-gradient">
                            <div className="flex gap-4 animate-marquee whitespace-nowrap">
                                {[...techStack, ...techStack].map((tech, i) => (
                                    <span key={i} className="px-4 py-2 rounded-full text-sm font-medium bg-white/5 text-slate-300 border border-white/10 backdrop-blur-sm">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                            <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-dark-900 to-transparent z-10"></div>
                            <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-dark-900 to-transparent z-10"></div>
                        </div>

                        <div className="flex gap-4">
                            <a href="#resume" className="btn-primary flex items-center gap-2 px-6 py-2 text-sm shadow-none hover:shadow-lg hover:shadow-primary/20">
                                <FileText className="w-4 h-4" /> View Resume
                            </a>
                            <a href="https://github.com/timsuperville" target="_blank" rel="noopener noreferrer" className="btn-outline flex items-center gap-2 px-6 py-2 text-sm">
                                <Github className="w-4 h-4" /> GitHub
                            </a>
                            <a href="https://www.linkedin.com/in/timsuperville" target="_blank" rel="noopener noreferrer" className="btn-outline flex items-center gap-2 px-6 py-2 text-sm">
                                <Linkedin className="w-4 h-4" /> LinkedIn
                            </a>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative"
                    >
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary rounded-2xl blur-2xl opacity-40"></div>
                        <img
                            className="relative w-full rounded-2xl shadow-2xl border border-white/10 grayscale hover:grayscale-0 transition-all duration-500"
                            src="/images/profile.jpg"
                            alt="Tim Superville"
                            loading="lazy"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
