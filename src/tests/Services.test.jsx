import { render, screen } from '@testing-library/react'
import Services from '../components/Services'

describe('Services', () => {
    it('renders services list', () => {
        render(<Services />)
        expect(screen.getByText('Full-Stack Web Development')).toBeInTheDocument()
        expect(screen.getByText('High-Performance Websites & SEO')).toBeInTheDocument()
    })
})
