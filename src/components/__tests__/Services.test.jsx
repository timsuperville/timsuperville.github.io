import { render, screen } from '@testing-library/react'
import Services from '../Services'

describe('Services', () => {
    it('renders services list', () => {
        render(<Services />)
        expect(screen.getByText('Web Development')).toBeInTheDocument()
        expect(screen.getByText('Responsive Design')).toBeInTheDocument()
    })
})
