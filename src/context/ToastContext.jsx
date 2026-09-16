/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useCallback } from 'react'

// ─── ToastContext ─────────────────────────────────────────────────────────────
// Global toast notification context and provider. Wrap your app tree with
// <ToastProvider> and consume via useToast() from `../hooks/useToast`.

export const ToastContext = createContext(null)

const TOAST_DURATION_MS = 2500

/**
 * Provides toast state to the subtree.
 * Accepts an optional `duration` prop (ms) to override the auto-dismiss timer.
 */
export function ToastProvider({ children, duration = TOAST_DURATION_MS }) {
    const [toast, setToastState] = useState(null)

    const setToast = useCallback((newToast) => {
        setToastState(newToast)
        if (newToast) {
            const ms = newToast.duration ?? duration
            setTimeout(() => setToastState(null), ms)
        }
    }, [duration])

    const clearToast = useCallback(() => setToastState(null), [])

    return (
        <ToastContext.Provider value={{ toast, setToast, clearToast }}>
            {children}
            {toast && (
                <div 
                    className="fixed bottom-6 right-6 z-50 p-4 rounded-xl bg-dark-900 border border-primary/30 text-white shadow-2xl shadow-black/80 flex items-center gap-3 animate-in slide-in-from-bottom-5 duration-300 font-mono text-xs"
                    role="status" 
                    aria-live="polite"
                >
                    <span className="w-2 h-2 rounded-full bg-primary-glow animate-pulse"></span>
                    <span>{toast.message}</span>
                </div>
            )}
        </ToastContext.Provider>
    )
}
