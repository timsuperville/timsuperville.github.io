import { useState, useEffect } from 'react'

// ─── useAccent ────────────────────────────────────────────────────────────────
// Persists the user's chosen accent colour in localStorage and syncs the
// data-accent attribute on the document root for CSS variable switching.

const ACCENT_KEY = 'portfolio_accent'
const ACCENTS = ['cyan', 'violet', 'emerald', 'amber']

export function useAccent() {
    const [currentAccent, setCurrentAccent] = useState(() => {
        try {
            return localStorage.getItem(ACCENT_KEY) || 'cyan'
        } catch {
            return 'cyan'
        }
    })

    useEffect(() => {
        document.documentElement.setAttribute('data-accent', currentAccent)
        try {
            localStorage.setItem(ACCENT_KEY, currentAccent)
        } catch { }
    }, [currentAccent])

    const cycleAccent = () => {
        const nextIdx = (ACCENTS.indexOf(currentAccent) + 1) % ACCENTS.length
        setCurrentAccent(ACCENTS[nextIdx])
        return ACCENTS[nextIdx]
    }

    return { currentAccent, setCurrentAccent, cycleAccent, ACCENTS }
}
