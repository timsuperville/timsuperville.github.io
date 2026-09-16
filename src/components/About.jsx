import React from 'react'
import { motion } from 'framer-motion'
import { FileText, User } from 'lucide-react'
import { Github, Linkedin } from './SocialIcons'

export default function About() {
    const techStack = [
        'React 18/19', 'TypeScript', 'Next.js', 'Node.js', 'PostgreSQL',
        'Tailwind CSS', 'GraphQL', 'Docker', 'Framer Motion', 'Stripe API',
        'Vite', 'Vitest', 'WebSockets', 'Lighthouse CI', 'CI/CD'
    ]

    return (
        <section id="about" className="py-24 relative overflow-hidden bg-dark-950">
            {/* Ambient Lighting */}
            <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[140px] pointer-events-none"></div>

            <div className="section-container relative z-10">
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                    {/* Left Column (7 cols) */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-7"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/25 text-primary-glow text-xs font-mono uppercase tracking-wider mb-4">
                            <User className="w-3.5 h-3.5" />
                            <span>About Me & Experience</span>
                        </div>

                        <h2 className="text-3xl sm:text-5xl font-bold mb-6 tracking-tight">
                            About <span className="text-gradient">Tim Superville</span>
                        </h2>

                        <div className="space-y-4 text-slate-300 text-base sm:text-lg leading-relaxed mb-8">
                            <p>
                                I&apos;m an independent web developer and full stack engineer based in Northern Alberta. I help local businesses, organizations, and growing teams build reliable websites, custom web applications, and smooth integrations without agency overhead.
                            </p>
                            <p>
                                When you work with me, you communicate directly with the person writing your code. No account manager layers, no outsourced handoffs, and no confusing technical buzzwords. I prioritize <strong className="text-white">direct communication</strong>, <strong className="text-white">honest timelines</strong>, and <strong className="text-white">reliable software</strong> that works every single day.
                            </p>
                            <p>
                                Whether you need a fresh website for your business, an online booking or customer ordering system, or clean integration with payment tools like Stripe, I build solutions tailored directly to your operational goals.
                            </p>
                        </div>

                        {/* Tech Marquee */}
                        <div className="relative overflow-hidden w-full mb-10 py-2 border-y border-white/5">
                            <div className="flex gap-3 animate-marquee whitespace-nowrap">
                                {[...techStack, ...techStack].map((tech, i) => (
                                    <span 
                                        key={i} 
                                        className="px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium bg-white/[0.03] text-slate-300 border border-white/10"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                            <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-dark-950 to-transparent z-10 pointer-events-none"></div>
                            <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-dark-950 to-transparent z-10 pointer-events-none"></div>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <a href="#resume" className="btn-primary flex items-center gap-2 text-xs font-mono uppercase">
                                <FileText className="w-4 h-4" /> View Full Resume
                            </a>
                            <a 
                                href="https://github.com/timsuperville" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="btn-outline flex items-center gap-2 text-xs font-mono uppercase"
                            >
                                <Github className="w-4 h-4" /> GitHub
                            </a>
                            <a 
                                href="https://www.linkedin.com/in/timsuperville" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="btn-outline flex items-center gap-2 text-xs font-mono uppercase"
                            >
                                <Linkedin className="w-4 h-4" /> LinkedIn
                            </a>
                        </div>
                    </motion.div>

                    {/* Right Column: Interactive Code Snapshot & Profile Photo (5 cols) */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-5 space-y-6"
                    >
                        {/* Profile Image with Obsidian Ring */}
                        <div className="relative mx-auto max-w-sm">
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary rounded-3xl blur-2xl opacity-30"></div>
                            <img
                                className="relative w-full rounded-3xl shadow-2xl border border-white/15 object-cover aspect-[4/5]"
                                src="/images/profile.jpg"
                                alt="Tim Superville - Full Stack Engineer"
                                loading="lazy"
                            />
                        </div>

                        {/* Mini Terminal Code Card */}
                        <div className="glass-card p-5 border border-white/10 font-mono text-xs text-slate-300">
                            <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                                <div className="flex items-center gap-1.5">
                                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
                                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
                                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
                                </div>
                                <span className="text-[11px] text-slate-500">tim.config.ts</span>
                            </div>
                            <div className="space-y-1 text-[11px] sm:text-xs">
                                <div><span className="text-secondary-glow">export const</span> <span className="text-white font-bold">developer</span> = &#123;</div>
                                <div className="pl-4"><span className="text-primary-glow">name</span>: <span className="text-amber-300">&quot;Tim Superville&quot;</span>,</div>
                                <div className="pl-4"><span className="text-primary-glow">location</span>: <span className="text-amber-300">&quot;Northern Alberta, CA&quot;</span>,</div>
                                <div className="pl-4"><span className="text-primary-glow">coreValues</span>: [<span className="text-amber-300">&quot;Reliability&quot;</span>, <span className="text-amber-300">&quot;Clear Communication&quot;</span>, <span className="text-amber-300">&quot;Performance&quot;</span>],</div>
                                <div className="pl-4"><span className="text-primary-glow">status</span>: <span className="text-emerald-400">&quot;Available for Projects&quot;</span></div>
                                <div>&#125;</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
