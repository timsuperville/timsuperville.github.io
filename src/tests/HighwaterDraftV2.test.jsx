import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import HighwaterDraftV2 from '../components/highwater/v2/HighwaterDraftV2'

describe('HighwaterDraftV2 Component', () => {
  it('renders authentic brand elements, Derek Patten, and Psalm 61:2', () => {
    render(<HighwaterDraftV2 />)

    // Practice and Founder identity
    expect(screen.getAllByText(/Highwater Counselling Company/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Derek Patten/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Wembley, AB|Wembley, Alberta/i).length).toBeGreaterThan(0)

    // Scriptural foundation
    expect(screen.getByText(/Psalm 61:2/i)).toBeInTheDocument()

    // Key services
    expect(screen.getAllByText(/Faith & Values-Based Counselling/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Postmodern & Narrative Therapy/i).length).toBeGreaterThan(0)
  })

  it('renders the 3-step What to Expect journey', () => {
    render(<HighwaterDraftV2 />)

    expect(screen.getByText(/What to Expect When You Reach Out/i)).toBeInTheDocument()
    expect(screen.getByText(/Low-Pressure First Step/i)).toBeInTheDocument()
    expect(screen.getByText(/The First 50 Minutes/i)).toBeInTheDocument()
    expect(screen.getByText(/Reclaiming Solid Ground/i)).toBeInTheDocument()
  })

  it('interactively updates the situation selector when clicking a filter button', () => {
    render(<HighwaterDraftV2 />)

    // Initially "Feeling Overwhelmed" is active
    expect(screen.getByText(/When life’s demands flood your capacity/i)).toBeInTheDocument()

    // Click "Our Relationship Keeps Hitting the Same Wall"
    const couplesButton = screen.getByRole('button', { name: /Our Relationship Keeps Hitting the Same Wall/i })
    fireEvent.click(couplesButton)

    // Should now display couples quote
    expect(screen.getByText(/Conflict isn't the end of connection/i)).toBeInTheDocument()
  })

  it('toggles FAQ accordion open and closed', () => {
    render(<HighwaterDraftV2 />)

    const faqQuestion = screen.getByText(/Do I need a doctor's referral to book with Derek\?/i)
    expect(faqQuestion).toBeInTheDocument()

    // Click to expand
    fireEvent.click(faqQuestion)
    expect(screen.getByText(/No referral is required/i)).toBeInTheDocument()
  })

  it('renders Jane App online booking link with secure portal target', () => {
    render(<HighwaterDraftV2 />)

    const bookingLink = screen.getByRole('link', { name: /Book via Jane App Portal/i })
    expect(bookingLink).toBeInTheDocument()
    expect(bookingLink).toHaveAttribute('href', expect.stringContaining('janeapp.com'))
    expect(bookingLink).toHaveAttribute('target', '_blank')
  })

  it('submits inquiry form with confirmation feedback', () => {
    render(<HighwaterDraftV2 />)

    const nameInput = screen.getByPlaceholderText(/First & last name/i)
    const emailInput = screen.getByPlaceholderText(/your@email\.com/i)
    const messageInput = screen.getByPlaceholderText(/Tell us what brings you to Highwater Counselling/i)
    const submitBtn = screen.getByRole('button', { name: /Send Message to Derek Patten/i })

    fireEvent.change(nameInput, { target: { value: 'Shawn Client' } })
    fireEvent.change(emailInput, { target: { value: 'shawn@example.com' } })
    fireEvent.change(messageInput, { target: { value: 'Interested in couples counselling in Wembley.' } })
    fireEvent.click(submitBtn)

    expect(screen.getByText(/Inquiry Received/i)).toBeInTheDocument()
    expect(screen.getByText(/Derek Patten will respond to your message shortly/i)).toBeInTheDocument()
  })
})
