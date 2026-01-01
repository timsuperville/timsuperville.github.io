import { render, screen } from '@testing-library/react'
import Hero from '../Hero'

describe('Hero', () => {
    it('renders headline', () => {
        render(<Hero />)
        expect(screen.getByText(/build web apps/i)).toBeInTheDocument()
    })
})
