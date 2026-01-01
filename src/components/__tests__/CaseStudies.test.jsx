import { render, screen } from '@testing-library/react'
import CaseStudies from '../CaseStudies'

describe('CaseStudies', () => {
    it('renders list of studies', () => {
        render(<CaseStudies />)
        expect(screen.getByText('E‑commerce revamp — 30% faster conversions')).toBeInTheDocument()
    })
})
