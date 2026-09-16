import { useContext } from 'react'
import { ToastContext } from '../context/ToastContext'

/**
 * Returns { toast, setToast, clearToast } from the nearest ToastProvider.
 * Throws if used outside a provider.
 */
export function useToast() {
    const ctx = useContext(ToastContext)
    if (!ctx) throw new Error('useToast must be used within a <ToastProvider>')
    return ctx
}
