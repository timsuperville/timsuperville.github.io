import { describe, it, expect, vi } from 'vitest'
import { generateBriefText, getMailtoHref, downloadBriefTxt, copyBriefToClipboard } from '../utils/brief'

describe('utils/brief', () => {
    const mockFormData = {
        clientName: 'Apex Architecture',
        contactPerson: 'Sarah Connor',
        email: 'sarah@apexarch.com',
        phone: '555-0199',
        website: 'apexarch.com',
        mainObjectives: 'Showcase portfolio and capture luxury residential leads',
        keyChallenges: 'Current site is slow and outdated',
        targetAudience: 'High-net-worth homeowners',
        brandValues: 'Modern, Minimalist, High-end',
        pagesNeeded: ['Home / Landing Page', 'Portfolio / Gallery'],
        interactiveFeatures: ['Interactive Project Filter', 'Contact / Inquiry Form'],
        techPreferences: 'React or Next.js',
        inspirationWebsites: 'olsonkundig.com',
        brandAssets: ['Vector Logo (.svg / .ai)', 'Brand Guidelines / Typography'],
        targetLaunchDate: '1-2 Months',
        budgetRange: '$5,000 - $10,000',
        milestones: 'Home Show in October',
        rolesResponsibilities: 'Sarah is primary decision maker',
        actionItems: 'Needs photography advice'
    }

    it('generates a detailed plain text brief containing client and project details', () => {
        const brief = generateBriefText(mockFormData)
        expect(brief).toContain('Apex Architecture')
        expect(brief).toContain('Sarah Connor')
        expect(brief).toContain('sarah@apexarch.com')
        expect(brief).toContain('Showcase portfolio and capture luxury residential leads')
        expect(brief).toContain('Modern, Minimalist, High-end')
        expect(brief).toContain('• Home / Landing Page')
        expect(brief).toContain('• Interactive Project Filter')
        expect(brief).toContain('$5,000 - $10,000')
        expect(brief).toContain('Prepared for Tim Superville')
    })

    it('handles empty / fallback form data gracefully', () => {
        const brief = generateBriefText({})
        expect(brief).toContain('Company / Organization: N/A')
        expect(brief).toContain('Open to recommendations')
        expect(brief).toContain('(None specified)')
    })

    it('generates a valid mailto URL with encoded subject and body', () => {
        const mailto = getMailtoHref(mockFormData)
        expect(mailto.startsWith('mailto:timsuperville@gmail.com?subject=')).toBe(true)
        expect(mailto).toContain(encodeURIComponent('Apex Architecture'))
        expect(mailto).toContain('&body=')
    })

    it('downloads project brief without throwing error in browser environment', () => {
        const appendChildSpy = vi.spyOn(document.body, 'appendChild').mockImplementation(() => {})
        const removeChildSpy = vi.spyOn(document.body, 'removeChild').mockImplementation(() => {})

        const result = downloadBriefTxt(mockFormData)
        expect(typeof result).toBe('boolean')

        appendChildSpy.mockRestore()
        removeChildSpy.mockRestore()
    })

    it('copies project brief to clipboard via navigator.clipboard', async () => {
        Object.assign(navigator, {
            clipboard: {
                writeText: vi.fn().mockResolvedValue(undefined)
            }
        })

        const success = await copyBriefToClipboard(mockFormData)
        expect(success).toBe(true)
        expect(navigator.clipboard.writeText).toHaveBeenCalled()
    })
})
