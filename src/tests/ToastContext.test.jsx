import React from 'react'
import { render, screen, act, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { ToastProvider } from '../context/ToastContext'
import { useToast } from '../hooks/useToast'

function TestToastConsumer() {
    const { toast, setToast, clearToast } = useToast()
    return (
        <div>
            <button onClick={() => setToast({ type: 'success', message: 'Test Notification' })}>
                Trigger Toast
            </button>
            <button onClick={clearToast}>Clear Toast</button>
            {toast && <span data-testid="toast-msg">{toast.message}</span>}
        </div>
    )
}

describe('ToastContext & ToastProvider', () => {
    it('throws error when useToast is used outside of ToastProvider', () => {
        const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
        expect(() => render(<TestToastConsumer />)).toThrow('useToast must be used within a <ToastProvider>')
        consoleErrorSpy.mockRestore()
    })

    it('renders and auto-dismisses toast message', () => {
        vi.useFakeTimers()
        render(
            <ToastProvider duration={1000}>
                <TestToastConsumer />
            </ToastProvider>
        )

        const triggerBtn = screen.getByText('Trigger Toast')
        fireEvent.click(triggerBtn)

        expect(screen.getAllByText('Test Notification').length).toBeGreaterThan(0)

        act(() => {
            vi.advanceTimersByTime(1100)
        })

        expect(screen.queryByText('Test Notification')).not.toBeInTheDocument()
        vi.useRealTimers()
    })

    it('allows manual toast clearance via clearToast', () => {
        render(
            <ToastProvider>
                <TestToastConsumer />
            </ToastProvider>
        )

        fireEvent.click(screen.getByText('Trigger Toast'))
        expect(screen.getAllByText('Test Notification').length).toBeGreaterThan(0)

        fireEvent.click(screen.getByText('Clear Toast'))
        expect(screen.queryByText('Test Notification')).not.toBeInTheDocument()
    })
})
