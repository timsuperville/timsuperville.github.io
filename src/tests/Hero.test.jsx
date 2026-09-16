import { render, screen } from '@testing-library/react'
import Hero from '../components/Hero'

describe('Hero', () => {
    it('renders headline', () => {
        render(<Hero />)
        expect(screen.getByText(/Building/i)).toBeInTheDocument()
        expect(screen.getByText(/fast websites/i)).toBeInTheDocument()
    })
})
