import { render, screen } from '@testing-library/react'
import Portfolio from '../Portfolio'

describe('Portfolio', () => {
    it('renders projects', () => {
        render(<Portfolio />)
        expect(screen.getByText(/Recent Projects/i)).toBeInTheDocument()
        expect(screen.getByText('E-commerce Platform')).toBeInTheDocument()
    })
})
