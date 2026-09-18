import { useState, useEffect } from 'react'
import { STORAGE_KEY } from '../constants/intake.js'
import { getInitialFormState, isFormEmpty } from '../utils/form.js'

// ─── useIntakeDraft ───────────────────────────────────────────────────────────
// Manages draft persistence for the client intake form.
// Restores the last saved draft from localStorage on mount, and auto-saves
// on each formData change (debounced by 500 ms) when the form is non-empty.
// Also cleans up stale drafts from prior localStorage key versions.

const STALE_KEYS = ['client_intake_draft_v1', 'client_project_planner_draft_v2']

export function useIntakeDraft() {
    const [formData, setFormData] = useState(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY)
            if (saved) {
                const parsed = JSON.parse(saved)
                if (parsed && !isFormEmpty(parsed)) {
                    return { ...getInitialFormState(), ...parsed }
                }
            }
        } catch { }
        return getInitialFormState()
    })

    const [lastSavedTime, setLastSavedTime] = useState(null)

    // Remove stale drafts from earlier versions on first mount
    useEffect(() => {
        try {
            STALE_KEYS.forEach(key => localStorage.removeItem(key))
        } catch { }
    }, [])

    // Auto-save: debounced 500 ms after last formData change
    useEffect(() => {
        if (isFormEmpty(formData)) {
            try {
                localStorage.removeItem(STORAGE_KEY)
            } catch { }
            return
        }

        const timer = setTimeout(() => {
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(formData))
                setLastSavedTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
            } catch { }
        }, 500)
        return () => clearTimeout(timer)
    }, [formData])

    /** Update a single text / select field. */
    const handleTextChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    /** Toggle an item in an array field (pages, features, assets, etc.). */
    const toggleArrayItem = (field, item) => {
        setFormData(prev => {
            const current = prev[field] || []
            const next = current.includes(item)
                ? current.filter(x => x !== item)
                : [...current, item]
            return { ...prev, [field]: next }
        })
    }

    /**
     * Clears the draft and resets to initial form state.
     * Skips browser confirm in test environments.
     */
    const clearDraft = (callbacks = {}) => {
        const { onConfirm, onReset } = callbacks
        if (typeof window !== 'undefined' && typeof window.confirm === 'function') {
            try {
                const isTest =
                    (typeof process !== 'undefined' && process.env?.NODE_ENV === 'test') ||
                    (typeof import.meta !== 'undefined' && import.meta.env?.MODE === 'test')
                if (!isTest && !window.confirm('Clear all entered information and start fresh?')) {
                    return false
                }
            } catch { }
        }

        setFormData(getInitialFormState())
        try {
            localStorage.removeItem(STORAGE_KEY)
            STALE_KEYS.forEach(key => localStorage.removeItem(key))
        } catch { }
        setLastSavedTime(null)
        if (typeof onReset === 'function') onReset()
        if (typeof onConfirm === 'function') onConfirm()
        return true
    }

    /**
     * Merge a quick-pick preset's pages and features into the current selection.
     * Does not overwrite user-selected values — uses Set union.
     */
    const applyPreset = (preset) => {
        setFormData(prev => {
            const currentPages = prev.pagesNeeded || []
            const currentFeatures = prev.interactiveFeatures || []
            const currentIntegrations = prev.integrations || []
            return {
                ...prev,
                pagesNeeded: Array.from(new Set([...currentPages, ...(preset.pages || [])])),
                interactiveFeatures: Array.from(new Set([...currentFeatures, ...(preset.features || [])])),
                integrations: Array.from(new Set([...currentIntegrations, ...(preset.integrations || [])]))
            }
        })
    }

    return {
        formData,
        setFormData,
        lastSavedTime,
        handleTextChange,
        toggleArrayItem,
        clearDraft,
        applyPreset
    }
}
