import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
    Search, 
    Home, 
    FolderGit2, 
    Layers, 
    Calculator, 
    FileText, 
    Mail, 
    Calendar, 
    ExternalLink, 
    Palette, 
    X,
    ChevronRight,
    ClipboardList
} from 'lucide-react'
import { CONFIG } from '../config'

export default function CommandPalette({ isOpen, setIsOpen, currentAccent, setCurrentAccent, setToast }) {
    const [query, setQuery] = useState('')
    const [selectedIndex, setSelectedIndex] = useState(0)
    const inputRef = useRef(null)

    // Keyboard shortcut to toggle Command Palette (Ctrl+K or Cmd+K)
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault()
                setIsOpen(prev => !prev)
            }
            if (e.key === 'Escape' && isOpen) {
                setIsOpen(false)
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [isOpen, setIsOpen])

    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                setQuery('')
                setSelectedIndex(0)
                inputRef.current?.focus()
            }, 20)
            return () => clearTimeout(timer)
        }
    }, [isOpen])

    const copyEmail = () => {
        navigator.clipboard.writeText('hello@tsuperville.com')
        if (setToast) {
            setToast({ type: 'success', message: 'Copied hello@tsuperville.com to clipboard!' })
            setTimeout(() => setToast(null), 3000)
        }
        setIsOpen(false)
    }

    const cycleAccent = () => {
        const accents = ['cyan', 'violet', 'emerald', 'amber']
        const nextIdx = (accents.indexOf(currentAccent) + 1) % accents.length
        const next = accents[nextIdx]
        if (setCurrentAccent) {
            setCurrentAccent(next)
            if (setToast) {
                setToast({ type: 'success', message: `Theme accent switched to ${next.toUpperCase()}!` })
                setTimeout(() => setToast(null), 2500)
            }
        }
        setIsOpen(false)
    }

    const navigateTo = (hash) => {
        window.location.assign(hash)
        setIsOpen(false)
    }

    const openExternal = (url) => {
        window.open(url, '_blank')
        setIsOpen(false)
    }

    const commands = [
        {
            category: 'Navigation',
            items: [
                { id: 'nav-home', label: 'Go to Home & Overview', icon: Home, action: () => navigateTo('#home') },
                { id: 'nav-work', label: 'View Recent Work & Projects', icon: FolderGit2, action: () => navigateTo('#portfolio') },
                { id: 'nav-tech', label: 'Explore Skills & Technologies', icon: Layers, action: () => navigateTo('#tech-stack') },
                { id: 'nav-estimator', label: 'Calculate Project Scope & Cost', icon: Calculator, action: () => navigateTo('#estimator') },
                { id: 'nav-intake', label: 'Open Client Discovery & Intake Form', icon: ClipboardList, action: () => navigateTo('#intake') },
                { id: 'nav-highwater', label: 'Client Draft: Highwater Counselling Company', badge: 'Wembley, AB', icon: ExternalLink, action: () => navigateTo('#highwater') },
                { id: 'nav-resume', label: 'View Interactive Resume', icon: FileText, action: () => navigateTo('#resume') },
                { id: 'nav-contact', label: 'Contact & Inquiry', icon: Mail, action: () => navigateTo('#contact') }
            ]
        },
        {
            category: 'Quick Actions',
            items: [
                { id: 'act-copy-email', label: 'Copy Email to Clipboard', badge: 'hello@tsuperville.com', icon: Mail, action: copyEmail },
                { id: 'act-book', label: 'Book 15-Min Consultation Call', badge: 'Calendly', icon: Calendar, action: () => openExternal(CONFIG.CALENDLY_URL) },
                { id: 'act-theme', label: 'Cycle Accent Color', badge: currentAccent ? currentAccent.toUpperCase() : 'CYAN', icon: Palette, action: cycleAccent },
                { id: 'act-github', label: 'Open GitHub Profile', badge: 'timsuperville', icon: ExternalLink, action: () => openExternal('https://github.com/timsuperville') }
            ]
        }
    ]

    const allFilteredItems = commands.flatMap(cat => 
        cat.items.filter(item => 
            item.label.toLowerCase().includes(query.toLowerCase()) || 
            (item.badge && item.badge.toLowerCase().includes(query.toLowerCase()))
        )
    )

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault()
            setSelectedIndex(prev => (prev + 1) % (allFilteredItems.length || 1))
        } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            setSelectedIndex(prev => (prev - 1 + allFilteredItems.length) % (allFilteredItems.length || 1))
        } else if (e.key === 'Enter') {
            e.preventDefault()
            if (allFilteredItems[selectedIndex]) {
                allFilteredItems[selectedIndex].action()
            }
        }
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/70 backdrop-blur-md"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Modal Window */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.96, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="relative w-full max-w-2xl rounded-2xl bg-dark-900 border border-white/10 shadow-2xl shadow-black/80 overflow-hidden z-10"
                    >
                        {/* Search Bar */}
                        <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10 bg-white/[0.02]">
                            <Search className="w-5 h-5 text-slate-400 shrink-0" />
                            <input
                                ref={inputRef}
                                type="text"
                                value={query}
                                onChange={e => { setQuery(e.target.value); setSelectedIndex(0); }}
                                onKeyDown={handleKeyDown}
                                placeholder="Type a command, section, or action..."
                                className="w-full bg-transparent text-white placeholder:text-slate-500 text-base outline-none font-sans"
                            />
                            {query && (
                                <button 
                                    onClick={() => setQuery('')}
                                    className="p-1 rounded-md text-slate-400 hover:text-white"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                            <div className="hidden sm:flex items-center gap-1">
                                <kbd className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/10 text-slate-400 border border-white/10">ESC</kbd>
                            </div>
                        </div>

                        {/* List */}
                        <div className="max-h-[380px] overflow-y-auto p-2 divide-y divide-white/5">
                            {allFilteredItems.length === 0 ? (
                                <div className="p-8 text-center text-slate-500 text-sm">
                                    No commands found matching &ldquo;{query}&rdquo;
                                </div>
                            ) : (
                                <div className="py-1">
                                    {allFilteredItems.map((item, idx) => {
                                        const Icon = item.icon
                                        const isSelected = idx === selectedIndex
                                        return (
                                            <button
                                                key={item.id}
                                                onClick={item.action}
                                                onMouseEnter={() => setSelectedIndex(idx)}
                                                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-left transition-colors ${
                                                    isSelected ? 'bg-primary/15 text-white' : 'text-slate-300 hover:bg-white/5'
                                                }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className={`p-2 rounded-lg ${isSelected ? 'bg-primary/25 text-primary-glow' : 'bg-white/5 text-slate-400'}`}>
                                                        <Icon className="w-4 h-4" />
                                                    </div>
                                                    <span className="text-sm font-medium">{item.label}</span>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    {item.badge && (
                                                        <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-400">
                                                            {item.badge}
                                                        </span>
                                                    )}
                                                    {isSelected && <ChevronRight className="w-4 h-4 text-primary-glow" />}
                                                </div>
                                            </button>
                                        )
                                    })}
                                </div>
                            )}
                        </div>

                        {/* Footer Tips */}
                        <div className="px-4 py-2.5 bg-dark-950/80 border-t border-white/5 flex items-center justify-between text-xs text-slate-500">
                            <div className="flex items-center gap-3">
                                <span>Navigate <kbd className="font-mono bg-white/10 px-1.5 py-0.5 rounded text-[10px]">↑↓</kbd></span>
                                <span>Select <kbd className="font-mono bg-white/10 px-1.5 py-0.5 rounded text-[10px]">↵</kbd></span>
                            </div>
                            <span className="font-mono text-primary-glow/80 text-[11px]">Tim Superville • Command Hub</span>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}
