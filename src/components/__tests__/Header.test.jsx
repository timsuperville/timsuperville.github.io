import { render, screen } from '@testing-library/react'
import Header from '../Header'

describe('Header', () => {
    it('renders without crashing', () => {
        render(<Header />)
        expect(screen.getByText('Tim Superville')).toBeInTheDocument()
    })

    it('contains navigation links', () => {
        render(<Header />)
        expect(screen.getByText('Services')).toBeInTheDocument()
        expect(screen.getByText('Portfolio')).toBeInTheDocument()
    })
})
