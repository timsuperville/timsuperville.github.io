import { render, screen, fireEvent } from '@testing-library/react'
import TechMatrix from '../TechMatrix'

describe('TechMatrix', () => {
    it('renders technical skills and category filters', () => {
        render(<TechMatrix />)
        expect(screen.getByText(/Depth & Scale/i)).toBeInTheDocument()
        expect(screen.getByText('Frontend Architecture')).toBeInTheDocument()
        expect(screen.getByText('Backend & APIs')).toBeInTheDocument()
    })

    it('filters skills when category button is clicked', () => {
        render(<TechMatrix />)
        const backendBtn = screen.getByText('Backend & APIs')
        fireEvent.click(backendBtn)
        expect(screen.getByText('PostgreSQL & SQL')).toBeInTheDocument()
    })
})
