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
    expect(screen.getAllByText(/Faith & Values-Based Counselling/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Postmodern & Narrative Therapy/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/On-Site Mental Health Support/i).length).toBeGreaterThan(0)
  })

  it('allows expanding and collapsing the Canadian counselling FAQ section', () => {
    render(<HighwaterDraft />)

    const faqQuestion = screen.getByText(/Do I need a doctor's referral to schedule a session\?/i)
    expect(faqQuestion).toBeInTheDocument()

    // Click to open
    fireEvent.click(faqQuestion)
    expect(screen.getByText(/No physician referral is required/i)).toBeInTheDocument()
  })

  it('renders Jane App online booking link with secure portal target', () => {
    render(<HighwaterDraft />)

    const janeLink = screen.getByRole('link', { name: /Book via Jane App/i })
    expect(janeLink).toBeInTheDocument()
    expect(janeLink).toHaveAttribute('href', expect.stringContaining('janeapp.com'))
    expect(janeLink).toHaveAttribute('target', '_blank')
  })

  it('submits inquiry form with valid fields', () => {
    render(<HighwaterDraft />)

    const nameInput = screen.getByPlaceholderText(/e\.g\. John Doe/i)
    const emailInput = screen.getByPlaceholderText(/you@example\.com/i)
    const submitBtn = screen.getByRole('button', { name: /Send Message to Practice/i })

    fireEvent.change(nameInput, { target: { value: 'Jane Client' } })
    fireEvent.change(emailInput, { target: { value: 'jane@example.com' } })
    fireEvent.click(submitBtn)

    expect(screen.getByText(/Inquiry Received/i)).toBeInTheDocument()
  })
})
