import { render, screen } from '@testing-library/react'
import Testimonials from '../Testimonials'

describe('Testimonials', () => {
    it('renders testimonials', () => {
        render(<Testimonials />)
        expect(screen.getByText(/Michelle R./)).toBeInTheDocument()
    })
})
