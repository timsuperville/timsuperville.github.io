import React, { useEffect } from 'react'
import { ArrowLeft, CheckCircle2, Layers, Flag, TrendingUp } from 'lucide-react'
import { caseStudies } from '../data/caseStudies'
import CodeTerminal from './CodeTerminal'

export default function CaseStudyDetail({ id }) {
    const study = caseStudies.find(s => s.id === id)

    useEffect(() => {
        if (study) {
            document.title = `${study.detailTitle} — Tim Superville`
            document.querySelector('meta[name="description"]')?.setAttribute('content', `Case Study: ${study.detailTitle}. ${study.challenge.substring(0, 120)}...`)
            window.scrollTo(0, 0)
        }
    }, [study])

    if (!study) return null

    return (
        <section className="py-32 min-h-screen bg-dark-950 relative overflow-hidden">
            {/* Ambient Lighting */}
            <div className="absolute top-20 right-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[140px] pointer-events-none"></div>

            <div className="max-w-4xl mx-auto px-6 relative z-10">
                <a 
                    href="#portfolio" 
                    className="inline-flex items-center gap-2 text-sm font-mono text-slate-400 hover:text-white mb-8 transition-colors group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
                    <span>Back to Selected Work</span>
                </a>

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/25 text-primary-glow text-xs font-mono uppercase tracking-wider mb-4">
                    <span>{study.category}</span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-extrabold mb-8 text-white tracking-tight leading-tight">
                    {study.detailTitle}
                </h1>

                {/* Real Code Architecture Terminal */}
                {study.code && (
                    <div className="mb-12">
                        <CodeTerminal
                            filename={study.filename}
                            language={study.language}
                            code={study.code}
                            maxHeight="380px"
                        />
                    </div>
                )}

                {/* Challenge & Results Metrics */}
                <div className="glass-card p-6 sm:p-10 mb-12 border border-white/10">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <div className="flex items-center gap-2 text-primary-glow font-semibold mb-3">
                                <Flag className="w-5 h-5" /> 
                                <span className="font-mono text-sm uppercase tracking-wider">The Challenge</span>
                            </div>
                            <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                                {study.challenge}
                            </p>
                        </div>
                        <div className="pt-6 md:pt-0 border-t md:border-t-0 md:border-l border-white/10 md:pl-8">
                            <div className="flex items-center gap-2 text-secondary-glow font-semibold mb-3">
                                <TrendingUp className="w-5 h-5" /> 
                                <span className="font-mono text-sm uppercase tracking-wider">The Results & Impact</span>
                            </div>
                            <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                                {study.results}
                            </p>
                        </div>
                    </div>
                </div>

                {/* What I Did */}
                <div className="mb-12">
                    <h3 className="text-xl sm:text-2xl font-bold mb-6 flex items-center gap-2.5 text-white">
                        <Layers className="w-5 h-5 text-primary-glow" /> 
                        <span>What Was Built & Delivered</span>
                    </h3>
                    <ul className="grid gap-4 md:grid-cols-2">
                        {study.whatIDid.map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-slate-300 bg-white/[0.03] border border-white/5 p-4 rounded-xl">
                                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                                <span className="text-sm sm:text-base leading-relaxed">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Tech Stack & CTA */}
                <div className="border-t border-white/10 pt-8 mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                    <div>
                        <span className="text-xs font-mono uppercase tracking-wider text-slate-500 block mb-1">Architecture & Tools</span>
                        <p className="text-sm text-slate-300 font-mono">{study.detailTech}</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <a
                            href="#contact"
                            className="btn-primary text-xs font-mono uppercase"
                        >
                            Discuss Similar Project
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}
