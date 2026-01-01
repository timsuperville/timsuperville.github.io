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

// Enable global mock for framer-motion
vi.mock('framer-motion')
