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

                <p className="text-slate-500 mb-4">
                    © {new Date().getFullYear()} Tim Superville. Built with React & Tailwind.
                </p>

                <div className="flex justify-center items-center gap-2 text-xs text-slate-600">
                    <span>Analytics:</span>
                    {optedOut ? (
                        <button className="underline hover:text-slate-400 transition-colors" onClick={() => { optIn(); setOptedOut(false) }}>Enable</button>
                    ) : (
                        <button className="underline hover:text-slate-400 transition-colors" onClick={() => { optOut(); setOptedOut(true) }}>Disable</button>
                    )}
                </div>
            </div>
        </footer>
    )
}
