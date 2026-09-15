import { render, screen } from '@testing-library/react'
import Testimonials from '../Testimonials'

describe('Testimonials / Principles', () => {
    it('renders engineering principles and working standards', () => {
        render(<Testimonials />)
        expect(screen.getByText(/Freelance/i)).toBeInTheDocument()
        expect(screen.getByText(/Engineering Principles/i)).toBeInTheDocument()
        expect(screen.getByText('Direct Senior Engineering Access')).toBeInTheDocument()
    })
})
