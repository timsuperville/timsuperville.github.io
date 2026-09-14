import { render, screen, fireEvent } from '@testing-library/react'
import CommandPalette from '../CommandPalette'

describe('CommandPalette', () => {
    it('renders nothing when closed', () => {
        const { container } = render(
            <CommandPalette 
                isOpen={false} 
                setIsOpen={() => {}} 
                currentAccent="cyan" 
                setCurrentAccent={() => {}} 
            />
        )
        expect(container).toBeEmptyDOMElement()
    })

    it('renders search input and commands when open', () => {
        render(
            <CommandPalette 
                isOpen={true} 
                setIsOpen={() => {}} 
                currentAccent="cyan" 
                setCurrentAccent={() => {}} 
            />
        )
        expect(screen.getByPlaceholderText(/Type a command/i)).toBeInTheDocument()
        expect(screen.getByText(/Copy Email to Clipboard/i)).toBeInTheDocument()
        expect(screen.getByText(/Book 15-Min Consultation Call/i)).toBeInTheDocument()
    })

    it('filters commands based on search input', () => {
        render(
            <CommandPalette 
                isOpen={true} 
                setIsOpen={() => {}} 
                currentAccent="cyan" 
                setCurrentAccent={() => {}} 
            />
        )
        const input = screen.getByPlaceholderText(/Type a command/i)
        fireEvent.change(input, { target: { value: 'resume' } })
        expect(screen.getByText(/View Interactive Resume/i)).toBeInTheDocument()
    })
})
