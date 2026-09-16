import React from 'react'
import { render, screen, act, fireEvent } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import { useAccent } from '../hooks/useAccent'
import { useRoute } from '../hooks/useRoute'

function TestAccentComponent() {
    const { currentAccent, cycleAccent } = useAccent()
    return (
        <div>
            <span data-testid="accent-value">{currentAccent}</span>
            <button onClick={cycleAccent}>Cycle Accent</button>
        </div>
    )
}

function TestRouteComponent() {
    const { route, isMainPage, isIntake, isCaseStudy } = useRoute()
    return (
        <div>
            <span data-testid="route-val">{route}</span>
            <span data-testid="is-main">{isMainPage ? 'yes' : 'no'}</span>
            <span data-testid="is-intake">{isIntake ? 'yes' : 'no'}</span>
            <span data-testid="is-case">{isCaseStudy ? 'yes' : 'no'}</span>
        </div>
    )
}

describe('hooks/useAccent', () => {
    beforeEach(() => {
        localStorage.clear()
        document.documentElement.removeAttribute('data-accent')
    })

    it('initializes to cyan by default and synchronizes document data-accent', () => {
        render(<TestAccentComponent />)
        expect(screen.getByTestId('accent-value').textContent).toBe('cyan')
        expect(document.documentElement.getAttribute('data-accent')).toBe('cyan')
    })

    it('cycles through accent themes and saves to localStorage', () => {
        render(<TestAccentComponent />)
        const btn = screen.getByText('Cycle Accent')

        act(() => {
            fireEvent.click(btn)
        })
        expect(screen.getByTestId('accent-value').textContent).toBe('violet')
        expect(document.documentElement.getAttribute('data-accent')).toBe('violet')
        expect(localStorage.getItem('portfolio_accent')).toBe('violet')

        act(() => {
            fireEvent.click(btn)
        })
        expect(screen.getByTestId('accent-value').textContent).toBe('emerald')
    })
})

describe('hooks/useRoute', () => {
    beforeEach(() => {
        window.location.hash = ''
    })

    it('identifies main page and updates on hashchange', () => {
        render(<TestRouteComponent />)
        expect(screen.getByTestId('is-main').textContent).toBe('yes')

        act(() => {
            window.location.hash = '#intake'
            window.dispatchEvent(new HashChangeEvent('hashchange'))
        })

        expect(screen.getByTestId('is-intake').textContent).toBe('yes')
        expect(document.title).toContain('Website Project Planner')
    })

    it('identifies case study route', () => {
        render(<TestRouteComponent />)

        act(() => {
            window.location.hash = '#case/resonance-audio'
            window.dispatchEvent(new HashChangeEvent('hashchange'))
        })

        expect(screen.getByTestId('is-case').textContent).toBe('yes')
    })
})
