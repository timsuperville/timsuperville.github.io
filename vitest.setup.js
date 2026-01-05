import '@testing-library/jest-dom'
import { vi } from 'vitest'

const IntersectionObserverMock = vi.fn(() => ({
    disconnect: vi.fn(),
    observe: vi.fn(),
    takeRecords: vi.fn(),
    unobserve: vi.fn(),
}))

vi.stubGlobal('IntersectionObserver', IntersectionObserverMock)
vi.stubGlobal('scrollTo', vi.fn())

// Mock framer-motion to render children directly
import React from 'react'

vi.mock('framer-motion', async () => {
    const actual = await vi.importActual('framer-motion')
    return {
        ...actual,
        motion: new Proxy({}, {
            get: (_target, _prop) => ({ children, ...props }) => {
                return React.createElement('div', props, children)
            }
        }),
        AnimatePresence: ({ children }) => children,
    }
})
