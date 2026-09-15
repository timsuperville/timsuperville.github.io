import { render, screen } from '@testing-library/react'
import CaseStudyDetail from '../CaseStudyDetail'

describe('CaseStudyDetail', () => {
    it('renders a known case study', () => {
        render(<CaseStudyDetail id="trade-platform" />)
        expect(screen.getByText('High-Performance Trade & Local Web Platform')).toBeInTheDocument()
        expect(screen.getByText(/100\/100/i)).toBeInTheDocument()
    })

    it('renders nothing for unknown id', () => {
        const { container } = render(<CaseStudyDetail id="invalid-id" />)
        expect(container).toBeEmptyDOMElement()
    })
})
