import { render, screen } from '@testing-library/react'
import Portfolio from '../Portfolio'

describe('Portfolio', () => {
    it('renders projects', async () => {
        render(<Portfolio />)
        expect(await screen.findByText(/Recent/i)).toBeInTheDocument()
        expect(await screen.findByText(/Work/i)).toBeInTheDocument()
    })
})
