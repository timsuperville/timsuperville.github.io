import { render, screen, fireEvent } from '@testing-library/react'
import Portfolio from '../Portfolio'

describe('Portfolio', () => {
    it('renders portfolio section and recent work systems', async () => {
        render(<Portfolio />)
        expect(await screen.findByText('Recent')).toBeInTheDocument()
        expect(await screen.findByText('Work')).toBeInTheDocument()
        expect(screen.getByText('High-Performance Trade & Local Web Platform')).toBeInTheDocument()
    })

    it('filters projects by category and search input', async () => {
        render(<Portfolio />)
        const searchInput = screen.getByPlaceholderText(/Filter by keyword/i)
        fireEvent.change(searchInput, { target: { value: 'Resonance' } })
        expect(screen.getByText('Resonance — Real-Time Audio & Media Sync')).toBeInTheDocument()
        expect(screen.queryByText('Modular SaaS & Multi-Tenant API Suite')).not.toBeInTheDocument()
    })

    it('toggles between grid view and high-density table view', () => {
        render(<Portfolio />)
        const tableViewBtn = screen.getByTitle('High-Density Table View')
        fireEvent.click(tableViewBtn)
        expect(screen.getByText('Benchmark Metric')).toBeInTheDocument()
    })
})
