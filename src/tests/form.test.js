import { describe, it, expect } from 'vitest'
import { calculateProgress, isFormEmpty, EMAIL_REGEX, getInitialFormState } from '../utils/form'

describe('utils/form', () => {
    describe('EMAIL_REGEX', () => {
        it('validates standard email addresses correctly', () => {
            expect(EMAIL_REGEX.test('user@example.com')).toBe(true)
            expect(EMAIL_REGEX.test('first.last@subdomain.domain.org')).toBe(true)
            expect(EMAIL_REGEX.test('invalid-email')).toBe(false)
            expect(EMAIL_REGEX.test('@missinguser.com')).toBe(false)
            expect(EMAIL_REGEX.test('user@missingdomain')).toBe(false)
        })
    })

    describe('getInitialFormState', () => {
        it('returns an empty form model with expected default fields and arrays', () => {
            const initial = getInitialFormState()
            expect(initial.clientName).toBe('')
            expect(initial.email).toBe('')
            expect(Array.isArray(initial.pagesNeeded)).toBe(true)
            expect(initial.pagesNeeded.length).toBe(0)
            expect(Array.isArray(initial.interactiveFeatures)).toBe(true)
            expect(initial.interactiveFeatures.length).toBe(0)
        })
    })

    describe('isFormEmpty', () => {
        it('returns true for fresh initial state', () => {
            expect(isFormEmpty(getInitialFormState())).toBe(true)
        })

        it('returns false when any string field has content', () => {
            const data = getInitialFormState()
            data.clientName = 'Northern Tech'
            expect(isFormEmpty(data)).toBe(false)
        })

        it('returns false when an array field has items', () => {
            const data = getInitialFormState()
            data.pagesNeeded = ['Home / Landing Page']
            expect(isFormEmpty(data)).toBe(false)
        })
    })

    describe('calculateProgress', () => {
        it('calculates 0% for empty form', () => {
            expect(calculateProgress(getInitialFormState())).toBe(0)
        })

        it('calculates 100% when all 6 sections are satisfied', () => {
            const fullData = {
                clientName: 'Acme Co',
                email: 'test@acme.com',
                mainObjectives: 'Attract new customers',
                targetAudience: 'Local homeowners',
                pagesNeeded: ['Home'],
                brandAssets: ['Vector Logo'],
                targetLaunchDate: '1-2 Months'
            }
            expect(calculateProgress(fullData)).toBe(100)
        })

        it('returns proportionate progress for partial completion', () => {
            const partialData = {
                clientName: 'Acme Co',
                email: 'test@acme.com'
            }
            // Section 1 complete (1 out of 6 sections -> ~17%)
            expect(calculateProgress(partialData)).toBe(17)
        })
    })
})
