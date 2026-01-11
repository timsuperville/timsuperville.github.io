
import { motion } from 'framer-motion'
import { ArrowLeft, Download, Mail, MapPin, Globe } from 'lucide-react'
import { resume } from '../data/resume'

export default function Resume() {
    return (
        <section className="py-32 min-h-screen bg-dark-950">
            <div className="max-w-4xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                    <a href="#about" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Profile
                    </a>

                    <button
                        onClick={() => window.print()}
                        className="btn-outline flex items-center gap-2 px-6 py-2 text-sm"
                    >
                        <Download className="w-4 h-4" /> Print / Save PDF
                    </button>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="glass-card p-8 md:p-12"
                    id="resume-content"
                >
                    {/* Header */}
                    <div className="border-b border-white/10 pb-8 mb-8">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-serif">Tim Superville</h1>
                        <p className="text-xl text-primary-glow font-medium mb-6">Full Stack Engineer</p>
                        <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                            <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> San Francisco, CA (Remote)</span>
                            <span className="flex items-center gap-2"><Mail className="w-4 h-4" /> hello@tsuperville.com</span>
                            <span className="flex items-center gap-2"><Globe className="w-4 h-4" /> tsuperville.com</span>
                        </div>
                    </div>

                    {/* Summary */}
                    <div className="mb-12">
                        <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-primary pl-4">Professional Summary</h3>
                        <p className="text-slate-300 leading-relaxed text-lg">{resume.summary}</p>
                    </div>

                    {/* Experience */}
                    <div className="mb-12">
                        <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-6 border-l-2 border-primary pl-4">Experience</h3>
                        <div className="space-y-10">
                            {resume.experience.map((job, i) => (
                                <div key={i}>
                                    <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2">
                                        <h4 className="text-xl font-bold text-white">{job.role}</h4>
                                        <span className="text-primary-glow font-mono text-sm">{job.period}</span>
                                    </div>
                                    <div className="text-lg text-slate-400 mb-4">{job.company}</div>
                                    <p className="text-slate-300 italic mb-4">{job.description}</p>
                                    <ul className="list-disc list-outside ml-5 space-y-2 text-slate-400">
                                        {job.achievements.map((item, j) => (
                                            <li key={j}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Skills */}
                    <div className="mb-12">
                        <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-6 border-l-2 border-primary pl-4">Technical Skills</h3>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div>
                                <h4 className="text-white font-bold mb-3">Frontend</h4>
                                <ul className="space-y-2 text-slate-400">
                                    {resume.skills.frontend.map(s => <li key={s}>{s}</li>)}
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-white font-bold mb-3">Backend</h4>
                                <ul className="space-y-2 text-slate-400">
                                    {resume.skills.backend.map(s => <li key={s}>{s}</li>)}
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-white font-bold mb-3">Tools</h4>
                                <ul className="space-y-2 text-slate-400">
                                    {resume.skills.tools.map(s => <li key={s}>{s}</li>)}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Education */}
                    <div>
                        <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-6 border-l-2 border-primary pl-4">Education</h3>
                        {resume.education.map((edu, i) => (
                            <div key={i}>
                                <h4 className="text-xl font-bold text-white">{edu.school}</h4>
                                <p className="text-slate-400">{edu.degree}, {edu.year}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            <style jsx>{`
                @media print {
                    body * {
                        visibility: hidden;
                    }
                    #resume-content, #resume-content * {
                        visibility: visible;
                    }
                    #resume-content {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                        background: white;
                        color: black;
                        padding: 0;
                        margin: 0;
                        box-shadow: none;
                    }
                    /* Override dark mode text colors for print */
                    #resume-content h1, #resume-content h3, #resume-content h4 {
                        color: black !important;
                    }
                    #resume-content p, #resume-content li, #resume-content span {
                        color: #333 !important;
                    }
                    #resume-content .text-primary-glow {
                        color: #2563eb !important; /* blue-600 */
                    }
                    #resume-content .border-white\/10 {
                        border-color: #eee !important;
                    }
                }
            `}</style>
        </section>
    )
}
