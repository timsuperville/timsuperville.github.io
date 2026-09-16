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
vi.stubGlobal('confirm', vi.fn(() => true))
if (typeof window !== 'undefined') {
    window.confirm = vi.fn(() => true)
    if (window.HTMLElement) {
        window.HTMLElement.prototype.scrollIntoView = vi.fn()
    }
}

// Mock framer-motion to render children directly
import React from 'react'

const motionKeys = new Set([
    'initial', 'animate', 'transition', 'whileInView', 'whileHover', 'whileTap',
    'viewport', 'variants', 'exit', 'custom', 'onAnimationStart', 'onAnimationComplete',
    'onLayoutAnimationStart', 'onLayoutAnimationComplete', 'layout',
    'drag', 'dragConstraints', 'dragElastic', 'dragDirectionLock', 'dragMomentum',
    'dragPropagation', 'dragSnapToOrigin', 'dragTransition', 'onDrag', 'onDragStart', 'onDragEnd'
])

const componentCache = new Map()

vi.mock('framer-motion', async () => {
    const actual = await vi.importActual('framer-motion')
    return {
        ...actual,
        motion: new Proxy({}, {
            get: (_target, prop) => {
                if (componentCache.has(prop)) return componentCache.get(prop)
                const tag = typeof prop === 'string' && prop.match(/^[a-z]+$/) ? prop : 'div'
                const Component = React.forwardRef(({ children, ...props }, ref) => {
                    const validProps = {}
                    for (const [key, value] of Object.entries(props)) {
                        if (!motionKeys.has(key)) validProps[key] = value
                    }
                    return React.createElement(tag, { ...validProps, ref }, children)
                })
                Component.displayName = `motion.${prop}`
                componentCache.set(prop, Component)
                return Component
            }
        }),
        AnimatePresence: ({ children }) => children,
    }
})
