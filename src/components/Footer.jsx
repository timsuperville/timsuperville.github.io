import React, { useState, useEffect } from 'react'
import { Mail, Clock } from 'lucide-react'
import { Github, Linkedin } from './SocialIcons'
import { isOptedOut, optIn, optOut } from '../lib/analytics'

export default function Footer() {
    const [optedOut, setOptedOut] = useState(isOptedOut())
    const [timeString, setTimeString] = useState('')

    useEffect(() => {
        const updateTime = () => {
            try {
                const now = new Date()
                const formatted = now.toLocaleTimeString('en-US', {
                    timeZone: 'America/Edmonton',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                })
                setTimeString(formatted)
            } catch {
                setTimeString('')
            }
        }
        updateTime()
        const interval = setInterval(updateTime, 30000)
        return () => clearInterval(interval)
    }, [])

    return (
        <footer className="bg-dark-950 border-t border-white/10 py-14 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 sm:px-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-white/10 items-center">
                    {/* Brand & Mission */}
                    <div className="md:col-span-6">
                        <div className="font-bold text-xl text-white mb-2">Tim Superville</div>
                        <p className="text-sm text-slate-400 max-w-sm leading-relaxed mb-4">
                            Freelance web developer and full stack engineer building clean, dependable websites and web applications.
                        </p>
                        {timeString && (
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/5 text-xs font-mono text-slate-400">
                                <Clock className="w-3.5 h-3.5 text-primary-glow" />
                                <span>Northern Alberta • {timeString} MT</span>
                            </div>
                        )}
                    </div>

                    {/* Quick Nav Links */}
                    <div className="md:col-span-6 flex flex-wrap md:justify-end items-center gap-6 text-xs font-mono text-slate-400">
                        <a href="#services" className="hover:text-white transition-colors">Services</a>
                        <a href="#portfolio" className="hover:text-white transition-colors">Work</a>
                        <a href="#case-studies" className="hover:text-white transition-colors">Case Studies</a>
                        <a href="#tech-stack" className="hover:text-white transition-colors">Skills & Tech</a>
                        <a href="#estimator" className="hover:text-white transition-colors">Estimator</a>
                        <a href="#intake" className="hover:text-white transition-colors text-primary-glow">Client Intake</a>
                        <a href="#resume" className="hover:text-white transition-colors">Resume</a>
                        <a href="#privacy" className="hover:text-white transition-colors">Privacy</a>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-slate-500">
                    <div className="flex items-center gap-2">
                        <span>&copy; {new Date().getFullYear()} Tim Superville. Built with React & Tailwind CSS.</span>
                    </div>

                    <div className="flex items-center gap-6">
                        {/* Social Icons */}
                        <div className="flex items-center gap-4">
                            <a 
                                href="https://github.com/timsuperville" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-slate-400 hover:text-white transition-colors"
                                aria-label="GitHub Profile"
                            >
                                <Github className="w-4 h-4" />
                            </a>
                            <a 
                                href="https://linkedin.com/in/timsuperville" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-slate-400 hover:text-white transition-colors"
                                aria-label="LinkedIn Profile"
                            >
                                <Linkedin className="w-4 h-4" />
                            </a>
                            <a 
                                href="mailto:hello@tsuperville.com" 
                                className="text-slate-400 hover:text-white transition-colors"
                                aria-label="Email Tim"
                            >
                                <Mail className="w-4 h-4" />
                            </a>
                        </div>

                        {/* Analytics toggle */}
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-600 border-l border-white/10 pl-4">
                            <span>Telemetry:</span>
                            {optedOut ? (
                                <button 
                                    className="text-primary-glow hover:underline" 
                                    onClick={() => { optIn(); setOptedOut(false) }}
                                >
                                    Enable
                                </button>
                            ) : (
                                <button 
                                    className="text-slate-400 hover:text-white hover:underline" 
                                    onClick={() => { optOut(); setOptedOut(true) }}
                                >
                                    Disable
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
