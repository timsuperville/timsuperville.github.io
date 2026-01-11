import { useEffect } from 'react'
import { ArrowLeft, CheckCircle2, Cpu, Flag, TrendingUp } from 'lucide-react'
import { caseStudies } from '../data/caseStudies'

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
        <section className="py-32 min-h-screen bg-dark-950">
            <div className="max-w-4xl mx-auto px-6">
                <a href="#home" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Home
                </a>

                <h1 className="text-4xl md:text-5xl font-bold mb-8 text-white leading-tight font-serif">{study.detailTitle}</h1>

                {/* Hero Image */}
                {study.image && (
                    <div className="mb-12 rounded-2xl overflow-hidden border border-white/5 bg-dark-800 shadow-2xl relative aspect-video">
                        <img
                            src={study.image}
                            alt={study.detailTitle}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl"></div>
                    </div>
                )}

                <div className="glass-card p-8 mb-12">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <div className="flex items-center gap-2 text-primary-glow font-semibold mb-2">
                                <Flag className="w-5 h-5" /> The Challenge
                            </div>
                            <p className="text-slate-300 leading-relaxed">{study.challenge}</p>
                        </div>
                        <div>
                            <div className="flex items-center gap-2 text-secondary-glow font-semibold mb-2">
                                <TrendingUp className="w-5 h-5" /> The Results
                            </div>
                            <p className="text-slate-300 leading-relaxed">{study.results}</p>
                        </div>
                    </div>
                </div>

                <div className="mb-12">
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <Cpu className="w-6 h-6 text-primary" /> What I Did & Tech Stack
                    </h3>
                    <ul className="grid gap-4 md:grid-cols-2">
                        {study.whatIDid.map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-slate-300 bg-white/5 p-4 rounded-lg">
                                <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="border-t border-white/10 pt-8 mt-12">
                    <p className="text-sm text-slate-500 font-mono">Tech Stack: {study.detailTech}</p>
                </div>
            </div>
        </section>
    )
}
