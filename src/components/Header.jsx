import React, { useState, useEffect } from 'react'
import { 
    Menu, 
    X, 
    Terminal, 
    Github, 
    Linkedin, 
    Command, 
    Palette 
} from 'lucide-react'

export default function Header({ onOpenCommandPalette, currentAccent, onCycleAccent }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navLinks = [
        { name: 'Services', href: '#services' },
        { name: 'Portfolio', href: '#portfolio' },
        { name: 'Case Studies', href: '#case-studies' },
        { name: 'Tech Stack', href: '#tech-stack' },
        { name: 'Estimator', href: '#estimator' },
        { name: 'About', href: '#about' },
        { name: 'Contact', href: '#contact' },
    ]

    return (
        <header
            className={`fixed top-0 w-full z-40 transition-all duration-300 ${
                scrolled ? 'nav-glass py-3.5' : 'bg-transparent py-5'
            }`}
        >
            <div className="max-w-7xl mx-auto px-6 sm:px-10 flex items-center justify-between">
                {/* Brand Logo */}
                <a 
                    href="#home" 
                    className="flex items-center gap-3 group" 
                    onClick={() => setIsMenuOpen(false)}
                >
                    <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-secondary text-white shadow-lg shadow-primary/20 group-hover:scale-105 group-hover:shadow-primary/40 transition-all duration-300">
                        <Terminal className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold text-lg tracking-tight text-white group-hover:text-primary-glow transition-colors">
                            Tim Superville
                        </span>
                        <span className="text-[11px] font-mono text-slate-400 tracking-wider uppercase">
                            Full Stack Engineer
                        </span>
                    </div>
                </a>

                {/* Desktop Nav */}
                <nav className="hidden lg:flex items-center space-x-6">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-xs uppercase tracking-wider font-mono font-medium text-slate-300 hover:text-white transition-colors relative group py-1"
                            aria-label={`Navigate to ${link.name}`}
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-glow to-secondary-glow transition-all duration-300 group-hover:w-full"></span>
                        </a>
                    ))}
                </nav>

                {/* Right Action Icons & Command Palette */}
                <div className="hidden sm:flex items-center gap-3">
                    {/* Command Palette Trigger */}
                    <button
                        onClick={onOpenCommandPalette}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-slate-300 hover:text-white hover:bg-white/[0.08] hover:border-white/20 transition-all text-xs font-mono"
                        aria-label="Open command palette"
                    >
                        <Command className="w-3.5 h-3.5 text-primary-glow" />
                        <span>Search</span>
                        <kbd className="px-1.5 py-0.5 rounded text-[10px] bg-white/10 text-slate-400">⌘K</kbd>
                    </button>

                    {/* Accent Switcher Button */}
                    <button
                        onClick={onCycleAccent}
                        className="p-2 rounded-lg bg-white/[0.04] border border-white/10 text-slate-300 hover:text-white hover:bg-white/[0.08] transition-all"
                        title={`Current Accent: ${currentAccent ? currentAccent.toUpperCase() : 'CYAN'}. Click to cycle.`}
                        aria-label="Cycle theme accent color"
                    >
                        <Palette className="w-4 h-4 text-primary-glow" />
                    </button>

                    <div className="h-5 w-px bg-white/10 mx-1"></div>

                    <a 
                        href="https://github.com/timsuperville" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="p-2 text-slate-400 hover:text-white transition-colors" 
                        aria-label="GitHub Profile"
                    >
                        <Github className="w-4 h-4" />
                    </a>
                    <a 
                        href="https://linkedin.com/in/timsuperville" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="p-2 text-slate-400 hover:text-white transition-colors" 
                        aria-label="LinkedIn Profile"
                    >
                        <Linkedin className="w-4 h-4" />
                    </a>
                </div>

                {/* Mobile Menu & Search Controls */}
                <div className="flex items-center gap-2 lg:hidden">
                    <button
                        onClick={onOpenCommandPalette}
                        className="p-2 text-slate-300 hover:text-white"
                        aria-label="Open command palette"
                    >
                        <Command className="w-5 h-5 text-primary-glow" />
                    </button>
                    <button
                        className="p-2 text-slate-300 hover:text-white"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle navigation menu"
                    >
                        {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav Overlay */}
            {isMenuOpen && (
                <div className="absolute top-full left-0 w-full bg-dark-950/95 backdrop-blur-2xl border-b border-white/10 p-6 flex flex-col space-y-4 lg:hidden animate-in slide-in-from-top-4 duration-200">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-base font-medium text-slate-200 hover:text-primary-glow py-2 border-b border-white/5"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {link.name}
                        </a>
                    ))}
                    
                    <div className="flex items-center justify-between pt-4">
                        <div className="flex gap-4">
                            <a href="https://github.com/timsuperville" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white">
                                <Github className="w-5 h-5" />
                            </a>
                            <a href="https://linkedin.com/in/timsuperville" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white">
                                <Linkedin className="w-5 h-5" />
                            </a>
                        </div>
                        <button
                            onClick={onCycleAccent}
                            className="inline-flex items-center gap-2 text-xs font-mono text-primary-glow bg-white/5 px-3 py-1.5 rounded-lg border border-white/10"
                        >
                            <Palette className="w-3.5 h-3.5" />
                            <span>Accent: {currentAccent ? currentAccent.toUpperCase() : 'CYAN'}</span>
                        </button>
                    </div>
                </div>
            )}
        </header>
    )
}
