import { render, screen, fireEvent } from '@testing-library/react'
import Portfolio from '../components/Portfolio'

describe('Portfolio', () => {
    it('renders portfolio section and recent work systems', async () => {
        render(<Portfolio />)
        expect(await screen.findByText('Recent')).toBeInTheDocument()
        expect(await screen.findByText('Work')).toBeInTheDocument()
        expect(screen.getByRole('heading', { name: /High-Performance Trade & Local Web Platform/i })).toBeInTheDocument()
    })

    it('filters projects by category and search input', async () => {
        render(<Portfolio />)
        const searchInput = screen.getByPlaceholderText(/Filter by keyword/i)
        fireEvent.change(searchInput, { target: { value: 'Resonance' } })
        expect(screen.getByRole('heading', { name: /Resonance — Real-Time Audio & Media Sync/i })).toBeInTheDocument()
        expect(screen.queryByRole('heading', { name: /Modular SaaS & Multi-Tenant API Suite/i })).not.toBeInTheDocument()
    })

    it('toggles between showcase carousel view and high-density table view', () => {
        render(<Portfolio />)
        const tableViewBtn = screen.getByTitle('High-Density Table View')
        fireEvent.click(tableViewBtn)
        expect(screen.getByText('Benchmark Metric')).toBeInTheDocument()

        const carouselViewBtn = screen.getByTitle('Showcase Carousel View')
        fireEvent.click(carouselViewBtn)
        expect(screen.getByTitle('Next System')).toBeInTheDocument()
    })

    it('advances carousel slides using navigation controls', () => {
        render(<Portfolio />)
        expect(screen.getByText('System 01')).toBeInTheDocument()
        const nextBtn = screen.getByTitle('Next System')
        fireEvent.click(nextBtn)
        expect(screen.getByText('System 02')).toBeInTheDocument()

        const prevBtn = screen.getByTitle('Previous System')
        fireEvent.click(prevBtn)
        expect(screen.getByText('System 01')).toBeInTheDocument()
    })

    it('toggles auto-rotation play/pause button', () => {
        render(<Portfolio />)
        const pauseBtn = screen.getByTitle('Pause auto-rotation')
        fireEvent.click(pauseBtn)
        expect(screen.getByTitle('Resume auto-rotation')).toBeInTheDocument()
    })
})
