import { render, screen } from '@testing-library/react'
import CaseStudyDetail from '../CaseStudyDetail'

describe('CaseStudyDetail', () => {
    it('renders a known case study', () => {
        render(<CaseStudyDetail id="ecommerce" />)
        expect(screen.getByText('E-commerce revamp')).toBeInTheDocument()
        expect(screen.getByText(/30% increase/i)).toBeInTheDocument()
    })

    it('renders nothing for unknown id', () => {
        const { container } = render(<CaseStudyDetail id="invalid-id" />)
        expect(container).toBeEmptyDOMElement()
    })
})
