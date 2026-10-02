import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import HighwaterDraft from '../components/highwater/HighwaterDraft'

describe('HighwaterDraft Component', () => {
  it('renders brand identity, Derek Patten, and authentic details without filler', () => {
    render(<HighwaterDraft />)

    // Check brand headers and identity
    expect(screen.getAllByText(/Highwater Counselling Company/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Derek Patten/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Wembley, Alberta/i).length).toBeGreaterThan(0)

    // Check scriptural inspiration
    expect(screen.getByText(/Psalm 61:2/i)).toBeInTheDocument()

    // Check key chosen services
    expect(screen.getAllByText(/Men’s Mental Health & Direction/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Postmodern & Narrative Therapy/i).length).toBeGreaterThan(0)
  })

  it('allows expanding and collapsing the Canadian counselling FAQ section', () => {
    render(<HighwaterDraft />)

    const faqQuestion = screen.getByText(/Do I need a doctor's referral to book with Derek\?/i)
    expect(faqQuestion).toBeInTheDocument()

    // Click to open
    fireEvent.click(faqQuestion)
    expect(screen.getByText(/No referral is required/i)).toBeInTheDocument()
  })

  it('renders Jane App online booking link with secure portal target', () => {
    render(<HighwaterDraft />)

    const janeLink = screen.getByRole('link', { name: /Book via Jane App Portal/i })
    expect(janeLink).toBeInTheDocument()
    expect(janeLink).toHaveAttribute('href', expect.stringContaining('janeapp.com'))
    expect(janeLink).toHaveAttribute('target', '_blank')
  })

  it('submits inquiry form with valid fields', () => {
    render(<HighwaterDraft />)

    const nameInput = screen.getByPlaceholderText(/First & last name/i)
    const emailInput = screen.getByPlaceholderText(/your@email\.com/i)
    const messageInput = screen.getByPlaceholderText(/Tell us what brings you to Highwater Counselling/i)
    const submitBtn = screen.getByRole('button', { name: /Send Message to Derek Patten/i })

    fireEvent.change(nameInput, { target: { value: 'Jane Client' } })
    fireEvent.change(emailInput, { target: { value: 'jane@example.com' } })
    fireEvent.change(messageInput, { target: { value: 'Hello Derek, I would like to schedule an appointment.' } })
    fireEvent.click(submitBtn)

    expect(screen.getByText(/Inquiry Received/i)).toBeInTheDocument()
  })
})
