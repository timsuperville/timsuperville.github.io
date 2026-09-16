import { render, screen, fireEvent } from '@testing-library/react'
import ProjectEstimator from '../components/ProjectEstimator'

describe('ProjectEstimator', () => {
    it('renders project foundation types and default estimate', () => {
        render(<ProjectEstimator onSelectEstimate={() => {}} />)
        expect(screen.getByText('Scope Your')).toBeInTheDocument()
        expect(screen.getByText('SaaS / Web Application')).toBeInTheDocument()
        expect(screen.getByText('Estimated Investment')).toBeInTheDocument()
    })

    it('updates selection when a different project type is chosen', () => {
        render(<ProjectEstimator onSelectEstimate={() => {}} />)
        const ecommerceBtn = screen.getByText('Headless E-Commerce')
        fireEvent.click(ecommerceBtn)
        expect(ecommerceBtn).toBeInTheDocument()
    })

    it('triggers callback when locking in scope', () => {
        let selected = null
        render(<ProjectEstimator onSelectEstimate={(data) => { selected = data }} />)
        const lockInBtn = screen.getByText('Lock In This Scope')
        fireEvent.click(lockInBtn)
        expect(selected).not.toBeNull()
        expect(selected.type).toBe('web-app')
    })
})
