import React, { useState } from 'react'

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <header className="bg-white shadow sticky top-0 z-30">
            <div className="max-w-6xl mx-auto px-5 flex items-center justify-between py-3">
                <a href="#home" className="flex items-center gap-3 font-bold text-lg" aria-label="Home — Tim Superville" title="Home — Tim Superville" onClick={() => setIsMenuOpen(false)}>
                    <svg className="logo-mark" width="36" height="36" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
                        <defs>
                            <linearGradient id="g1" x1="0" x2="1" y1="0" y2="1">
                                <stop offset="0" stopColor="#4f46e5" />
                                <stop offset="1" stopColor="#06b6d4" />
                            </linearGradient>
                        </defs>
                        <rect width="36" height="36" rx="6" fill="url(#g1)" />
                        <g fill="#fff" fontFamily="sans-serif" fontWeight="700" fontSize="14" textAnchor="middle">
                            <text x="18" y="22">TS</text>
                        </g>
                    </svg>
                    <span className="brand">Tim Superville</span>
                </a>

                {/* Desktop Nav */}
                <nav role="navigation" aria-label="Primary" className="space-x-6 hidden md:block">
                    <a href="#home" className="text-gray-700 hover:text-sky-600 transition-colors">Home</a>
                    <a href="#services" className="text-gray-700 hover:text-sky-600 transition-colors">Services</a>
                    <a href="#portfolio" className="text-gray-700 hover:text-sky-600 transition-colors">Portfolio</a>
                    <a href="#about" className="text-gray-700 hover:text-sky-600 transition-colors">About</a>
                    <a href="#contact" className="text-gray-700 hover:text-sky-600 transition-colors">Contact</a>
                </nav>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden p-2 text-gray-700 hover:text-sky-600 focus:outline-none"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-expanded={isMenuOpen}
                    aria-label="Toggle navigation menu"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        {isMenuOpen ? (
                            <path d="M18 6L6 18M6 6l12 12" />
                        ) : (
                            <path d="M3 12h18M3 6h18M3 18h18" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile Nav Overlay */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-100 py-4 px-5 flex flex-col space-y-4">
                    <a href="#home" className="text-gray-700 hover:text-sky-600 block py-2" onClick={() => setIsMenuOpen(false)}>Home</a>
                    <a href="#services" className="text-gray-700 hover:text-sky-600 block py-2" onClick={() => setIsMenuOpen(false)}>Services</a>
                    <a href="#portfolio" className="text-gray-700 hover:text-sky-600 block py-2" onClick={() => setIsMenuOpen(false)}>Portfolio</a>
                    <a href="#about" className="text-gray-700 hover:text-sky-600 block py-2" onClick={() => setIsMenuOpen(false)}>About</a>
                    <a href="#contact" className="text-gray-700 hover:text-sky-600 block py-2" onClick={() => setIsMenuOpen(false)}>Contact</a>
                </div>
            )}
        </header>
    )
}
