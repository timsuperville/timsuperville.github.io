// ─── Project Brief Utilities ─────────────────────────────────────────────────
// Functions for generating, downloading, and emailing a formatted project brief
// from intake form data. Pure where possible; browser APIs wrapped for safety.

const CONTACT_EMAIL = 'timsuperville@gmail.com'
const CONTACT_SITE = 'https://timsuperville.github.io'

/**
 * Generates a formatted plain-text project discovery brief from form data.
 * @param {object} formData - The intake form data object.
 * @returns {string} Multi-line text brief.
 */
export const generateBriefText = (formData) => {
    return [
        `================================================================`,
        `WEBSITE PROJECT DISCOVERY BRIEF`,
        `================================================================`,
        `Company / Organization: ${formData.clientName || 'N/A'}`,
        `Contact Name:           ${formData.contactPerson || 'N/A'}`,
        `Contact Email:          ${formData.email || 'N/A'}`,
        `Public/Practice Email:  ${formData.practiceEmail || 'Same as contact'}`,
        `Phone:                  ${formData.phone || 'N/A'}`,
        `Location/Service Area:  ${formData.location || 'N/A'}`,
        `Current Website/Social: ${formData.website || 'N/A'}`,
        `Generated On:           ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`,
        `----------------------------------------------------------------`,
        ``,
        `1. GOALS & VISION`,
        `----------------------------------------------------------------`,
        `Primary Objectives:`,
        formData.mainObjectives ? `  ${formData.mainObjectives}` : `  (None specified)`,
        ``,
        `Current Challenges / Hurdles:`,
        formData.keyChallenges ? `  ${formData.keyChallenges}` : `  (None specified)`,
        ``,
        `2. AUDIENCE & BRAND PERSONALITY`,
        `----------------------------------------------------------------`,
        `Target Audience:       ${formData.targetAudience || 'N/A'}`,
        `Brand Vibe & Styles:   ${formData.brandValues || 'N/A'}`,
        `Colors / Aesthetics:   ${formData.brandColorsNotes || 'N/A'}`,
        `Motto / Scripture:     ${formData.brandMotto || 'N/A'}`,
        ``,
        `3. PAGES & FEATURES REQUIRED`,
        `----------------------------------------------------------------`,
        `Pages Needed:`,
        ((formData.pagesNeeded && formData.pagesNeeded.length > 0) || formData.otherPages)
            ? [
                ...(formData.pagesNeeded || []).map(p => `  • ${p}`),
                ...(formData.otherPages ? [`  • Additional Pages: ${formData.otherPages}`] : [])
              ].join('\n')
            : `  (Open to recommendations)`,
        ``,
        `Interactive Features:`,
        (formData.interactiveFeatures && formData.interactiveFeatures.length > 0)
            ? formData.interactiveFeatures.map(f => `  • ${f}`).join('\n')
            : `  (Open to recommendations)`,
        ``,
        `Integrations & Tools:`,
        ((formData.integrations && formData.integrations.length > 0) || formData.otherIntegrations)
            ? [
                ...(formData.integrations || []).map(i => `  • ${i}`),
                ...(formData.otherIntegrations ? [`  • Other Software: ${formData.otherIntegrations}`] : [])
              ].join('\n')
            : `  (None specified)`,
        ``,
        `Tech / Platform Preferences: ${formData.techPreferences || 'Open to recommendations'}`,
        ``,
        `4. VISUAL STYLE & ASSETS`,
        `----------------------------------------------------------------`,
        `Inspiration Sites:`,
        formData.inspirationWebsites ? `  ${formData.inspirationWebsites}` : `  (None provided)`,
        ``,
        `Existing Brand Assets:`,
        (formData.brandAssets && formData.brandAssets.length > 0)
            ? formData.brandAssets.map(a => `  • ${a}`).join('\n')
            : `  (Starting fresh / need assistance)`,
        ``,
        `5. TIMELINE & BUDGET`,
        `----------------------------------------------------------------`,
        `Target Launch:    ${formData.targetLaunchExact ? `${formData.targetLaunchExact} (${formData.targetLaunchDate || 'Target'})` : (formData.targetLaunchDate || 'Flexible')}`,
        `Estimated Budget: ${formData.budgetRange || 'To be discussed'}`,
        `Driving Events:   ${formData.milestones || 'N/A'}`,
        `Decision Team:    ${formData.rolesResponsibilities || 'N/A'}`,
        ``,
        `6. ADDITIONAL NOTES & QUESTIONS`,
        `----------------------------------------------------------------`,
        formData.actionItems ? `  ${formData.actionItems}` : `  (None provided)`,
        ``,
        `================================================================`,
        `Prepared for Tim Superville (${CONTACT_EMAIL})`,
        `Website: ${CONTACT_SITE}`,
        `================================================================`
    ].join('\n')
}

/**
 * Triggers a browser file download of the project brief as a .txt file.
 * @param {object} formData - The intake form data object.
 */
export const downloadBriefTxt = (formData) => {
    try {
        const text = generateBriefText(formData)
        const blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        const safeName = (formData.clientName || 'Project').replace(/[^a-z0-9]/gi, '-').toLowerCase()
        a.href = url
        a.download = `website-project-brief-${safeName}.txt`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
        return true
    } catch {
        return false
    }
}

/**
 * Copies the formatted project brief to the clipboard.
 * @param {object} formData - The intake form data object.
 * @returns {Promise<boolean>} True on success.
 */
export const copyBriefToClipboard = async (formData) => {
    try {
        const text = generateBriefText(formData)
        await navigator.clipboard.writeText(text)
        return true
    } catch {
        return false
    }
}

/**
 * Builds a pre-filled mailto: href for emailing the brief directly to Tim.
 * @param {object} formData - The intake form data object.
 * @returns {string} A mailto: URL string.
 */
export const getMailtoHref = (formData) => {
    const subject = encodeURIComponent(`Website Project Discovery: ${formData.clientName || 'New Project'}`)
    const body = encodeURIComponent(generateBriefText(formData))
    return `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
}
