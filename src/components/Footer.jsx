import { useState } from 'react'
import { Github, Linkedin, Mail } from 'lucide-react'
import { isOptedOut, optIn, optOut } from '../analytics'

export default function Footer() {
    const [optedOut, setOptedOut] = useState(isOptedOut())

    return (
        <footer className="bg-dark-950 border-t border-white/5 py-12">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <div className="flex justify-center gap-6 mb-8">
                    <a href="https://github.com/timsuperville" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors" aria-label="GitHub">
                        <Github className="w-5 h-5" />
                    </a>
                    <a href="https://www.linkedin.com/in/timsuperville" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors" aria-label="LinkedIn">
                        <Linkedin className="w-5 h-5" />
                    </a>
                    <a href="mailto:hello@tsuperville.com" className="text-slate-400 hover:text-white transition-colors" aria-label="Email">
                        <Mail className="w-5 h-5" />
                    </a>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-sm text-slate-500">
                    <p>&copy; {new Date().getFullYear()} Tim Superville. All rights reserved.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#contact" className="hover:text-white transition-colors">Contact</a>
                        <div className="flex items-center gap-2 text-xs text-slate-600">
                            <span>Analytics:</span>
                            {optedOut ? (
                                <button className="underline hover:text-slate-400 transition-colors" onClick={() => { optIn(); setOptedOut(false) }}>Enable</button>
                            ) : (
                                <button className="underline hover:text-slate-400 transition-colors" onClick={() => { optOut(); setOptedOut(true) }}>Disable</button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
