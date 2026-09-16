import { render, screen } from '@testing-library/react'
import CaseStudies from '../components/CaseStudies'

describe('CaseStudies', () => {
    it('renders list of studies', () => {
        render(<CaseStudies />)
        expect(screen.getByText('High-Performance Trade Platform — Sub-1s Edge Delivery')).toBeInTheDocument()
    })
})
