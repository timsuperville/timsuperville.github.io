import React from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Download, Mail, MapPin, Globe, CheckCircle2 } from 'lucide-react'
import { resume } from '../data/resume'

export default function Resume() {
    return (
        <section className="py-28 min-h-screen bg-dark-950 relative overflow-hidden">
            {/* Subtle Ambient Glow */}
            <div className="absolute top-20 right-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[140px] pointer-events-none"></div>

            <div className="max-w-4xl mx-auto px-6 relative z-10">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
                    <a 
                        href="#about" 
                        className="inline-flex items-center gap-2 text-sm font-mono text-slate-400 hover:text-white transition-colors group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
                        <span>Back to Profile</span>
                    </a>

                    <button
                        onClick={() => window.print()}
                        className="btn-outline flex items-center gap-2 px-5 py-2.5 text-xs font-mono uppercase"
                    >
                        <Download className="w-4 h-4 text-primary-glow" /> 
                        <span>Print / Save PDF</span>
                    </button>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="glass-card p-6 sm:p-12 border border-white/10"
                    id="resume-content"
                >
                    {/* Header */}
                    <div className="border-b border-white/10 pb-8 mb-8">
                        <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-3 tracking-tight">Tim Superville</h1>
                        <p className="text-lg sm:text-xl text-primary-glow font-medium mb-5">Full Stack Web Developer & Software Engineer</p>
                        <div className="flex flex-wrap gap-4 sm:gap-6 text-xs sm:text-sm text-slate-400 font-mono">
                            <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-slate-500" /> Northern Alberta, Canada (Remote)</span>
                            <span className="flex items-center gap-1.5"><Mail className="w-4 h-4 text-slate-500" /> hello@tsuperville.com</span>
                            <span className="flex items-center gap-1.5"><Globe className="w-4 h-4 text-slate-500" /> tsuperville.com</span>
                        </div>
                    </div>

                    {/* Summary */}
                    <div className="mb-10">
                        <h2 className="text-xs font-mono uppercase tracking-widest text-primary-glow font-bold mb-3 border-l-2 border-primary pl-3">
                            Professional Summary
                        </h2>
                        <p className="text-slate-300 leading-relaxed text-sm sm:text-base">{resume.summary}</p>
                    </div>

                    {/* Experience */}
                    <div className="mb-10">
                        <h2 className="text-xs font-mono uppercase tracking-widest text-primary-glow font-bold mb-6 border-l-2 border-primary pl-3">
                            Work Experience
                        </h2>
                        <div className="space-y-8">
                            {resume.experience.map((job, i) => (
                                <div key={i} className="pb-8 border-b border-white/5 last:border-0 last:pb-0">
                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                                        <h3 className="text-lg sm:text-xl font-bold text-white">{job.role}</h3>
                                        <span className="text-primary-glow font-mono text-xs sm:text-sm font-semibold">{job.period}</span>
                                    </div>
                                    <div className="text-sm font-mono text-slate-400 mb-3">{job.company} • {job.location}</div>
                                    <p className="text-slate-300 text-sm italic mb-4">{job.description}</p>
                                    <ul className="space-y-2 text-slate-400 text-sm">
                                        {job.achievements.map((item, j) => (
                                            <li key={j} className="flex items-start gap-2.5">
                                                <CheckCircle2 className="w-4 h-4 text-primary-glow shrink-0 mt-0.5" />
                                                <span className="text-slate-300">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Skills Grid */}
                    <div className="mb-10">
                        <h2 className="text-xs font-mono uppercase tracking-widest text-primary-glow font-bold mb-6 border-l-2 border-primary pl-3">
                            Technical Competencies
                        </h2>
                        <div className="grid sm:grid-cols-3 gap-6">
                            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                                <h3 className="text-white font-bold text-sm mb-3 font-mono">Frontend</h3>
                                <ul className="space-y-2 text-xs font-mono text-slate-300">
                                    {resume.skills.frontend.map((s, idx) => (
                                        <li key={idx} className="flex items-center justify-between">
                                            <span>{s.name}</span>
                                            <span className="text-primary-glow text-[11px]">{s.level}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                                <h3 className="text-white font-bold text-sm mb-3 font-mono">Backend</h3>
                                <ul className="space-y-2 text-xs font-mono text-slate-300">
                                    {resume.skills.backend.map((s, idx) => (
                                        <li key={idx} className="flex items-center justify-between">
                                            <span>{s.name}</span>
                                            <span className="text-secondary-glow text-[11px]">{s.level}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                                <h3 className="text-white font-bold text-sm mb-3 font-mono">DevOps & Tooling</h3>
                                <ul className="space-y-2 text-xs font-mono text-slate-300">
                                    {resume.skills.tools.map((s, idx) => (
                                        <li key={idx} className="flex items-center justify-between">
                                            <span>{s.name}</span>
                                            <span className="text-emerald-400 text-[11px]">{s.level}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Education */}
                    <div>
                        <h2 className="text-xs font-mono uppercase tracking-widest text-primary-glow font-bold mb-4 border-l-2 border-primary pl-3">
                            Education
                        </h2>
                        {resume.education.map((edu, i) => (
                            <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                                    <h3 className="text-base font-bold text-white">{edu.school}</h3>
                                    <span className="text-primary-glow font-mono text-xs">{edu.year}</span>
                                </div>
                                <p className="text-slate-300 text-sm">{edu.degree}</p>
                                {edu.honors && <p className="text-xs font-mono text-slate-400 mt-1">{edu.honors}</p>}
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
