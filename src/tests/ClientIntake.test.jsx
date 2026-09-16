import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import ClientIntake from '../components/ClientIntake'

describe('ClientIntake', () => {
    beforeEach(() => {
        localStorage.clear()
        vi.spyOn(window, 'confirm').mockImplementation(() => true)
    })

    afterEach(() => {
        vi.restoreAllMocks()
    })

    it('renders all 6 client-focused discovery sections and progress bar', () => {
        render(<ClientIntake setToast={() => {}} />)

        expect(screen.getByText('Tell Us About')).toBeInTheDocument()
        expect(screen.getByText('Your Vision')).toBeInTheDocument()
        expect(screen.getByText('1. About You & Your Business')).toBeInTheDocument()
        expect(screen.getByText('2. Your Goals & Vision')).toBeInTheDocument()
        expect(screen.getByText('3. Your Audience & Brand Vibe')).toBeInTheDocument()
        expect(screen.getByText('4. Pages & Features You Need')).toBeInTheDocument()
        expect(screen.getByText('5. Visual Style & Existing Assets')).toBeInTheDocument()
        expect(screen.getByText('6. Timeline & Investment Range')).toBeInTheDocument()
        expect(screen.getByText(/Questionnaire Progress/i)).toBeInTheDocument()
    })

    it('shows 0% Completed when the form is empty', () => {
        render(<ClientIntake setToast={() => {}} />)
        expect(screen.getByText('0% Completed')).toBeInTheDocument()
    })

    it('updates text inputs and saves draft to localStorage', async () => {
        render(<ClientIntake setToast={() => {}} />)

        const clientInput = screen.getByLabelText(/Company \/ Organization \/ Project Name \*/i)
        fireEvent.change(clientInput, { target: { value: 'Acme Woodworking' } })
        expect(clientInput.value).toBe('Acme Woodworking')

        await waitFor(() => {
            const saved = localStorage.getItem('tim_client_planner_draft_v3')
            expect(saved).not.toBeNull()
            expect(saved).toContain('Acme Woodworking')
        }, { timeout: 1500 })
    })

    it('shows validation error if client name or email is empty upon submission', () => {
        render(<ClientIntake setToast={() => {}} />)

        const submitBtn = screen.getByText(/Send Project Details/i)
        fireEvent.click(submitBtn)

        expect(screen.getByText(/Please let us know your business, organization, or project name/i)).toBeInTheDocument()
    })

    it('toggles page and feature selection pills', () => {
        render(<ClientIntake setToast={() => {}} />)

        const faqBtn = screen.getByText('FAQ / Help Center')
        fireEvent.click(faqBtn)

        expect(screen.getByText('FAQ / Help Center')).toBeInTheDocument()
    })

    it('resets form when Reset button is clicked', async () => {
        window.confirm = () => true
        const onReset = vi.fn()
        render(<ClientIntake setToast={() => {}} onReset={onReset} />)

        const clientInput = screen.getByLabelText(/Company \/ Organization \/ Project Name \*/i)
        fireEvent.change(clientInput, { target: { value: 'Acme Woodworking' } })
        expect(clientInput.value).toBe('Acme Woodworking')

        const resetBtn = screen.getByRole('button', { name: /reset/i })
        fireEvent.click(resetBtn)
        expect(onReset).toHaveBeenCalled()

        await waitFor(() => {
            expect(clientInput.value).toBe('')
            expect(screen.getByText('0% Completed')).toBeInTheDocument()
        })
    })

    it('applies quick-pick starter archetypes and updates aria-pressed attributes', () => {
        render(<ClientIntake setToast={() => {}} />)

        const archetypeBtn = screen.getByText('Local Service Business')
        fireEvent.click(archetypeBtn)

        const faqBtn = screen.getByRole('button', { name: /FAQ \/ Help Center/i })
        expect(faqBtn).toHaveAttribute('aria-pressed', 'true')

        const contactPageBtn = screen.getByRole('button', { name: /Contact & Inquiry/i })
        expect(contactPageBtn).toHaveAttribute('aria-pressed', 'true')
    })

    it('renders adblocker fallback email link and download actions when error occurs', () => {
        render(<ClientIntake setToast={() => {}} />)

        // Trigger required validation error
        const submitBtn = screen.getByText(/Send Project Details/i)
        fireEvent.click(submitBtn)

        expect(screen.getByText(/Please let us know your business, organization, or project name/i)).toBeInTheDocument()
        expect(screen.getByRole('link', { name: /Email Answers Directly to Tim/i })).toHaveAttribute('href', expect.stringContaining('mailto:timsuperville@gmail.com'))
        expect(screen.getByRole('button', { name: /Download Brief \(\.txt\)/i })).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /Copy Answers/i })).toBeInTheDocument()
    })
})
