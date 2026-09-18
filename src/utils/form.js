// ─── Form Utilities ──────────────────────────────────────────────────────────
// Pure functions for client intake form state management.
// No side-effects, no React imports — safe to use in any context.

/** Returns a fresh, empty form state object. */
export const getInitialFormState = () => ({
    clientName: '',
    contactPerson: '',
    email: '',
    practiceEmail: '',
    phone: '',
    website: '',
    mainObjectives: '',
    keyChallenges: '',
    targetAudience: '',
    brandValues: '',
    brandMotto: '',
    pagesNeeded: [],
    interactiveFeatures: [],
    integrations: [],
    techPreferences: '',
    visualStyle: '',
    inspirationWebsites: '',
    brandAssets: [],
    targetLaunchDate: '',
    targetLaunchExact: '',
    milestones: '',
    rolesResponsibilities: '',
    budgetRange: '',
    actionItems: ''
})

/**
 * Returns true when every field in the form data is blank / empty.
 * Used to skip auto-save and derive the zero-progress state.
 */
export const isFormEmpty = (data) => {
    if (!data) return true
    return !data.clientName?.trim() &&
        !data.contactPerson?.trim() &&
        !data.email?.trim() &&
        !data.practiceEmail?.trim() &&
        !data.phone?.trim() &&
        !data.website?.trim() &&
        !data.mainObjectives?.trim() &&
        !data.keyChallenges?.trim() &&
        !data.targetAudience?.trim() &&
        !data.brandValues?.trim() &&
        !data.brandMotto?.trim() &&
        (!data.pagesNeeded || data.pagesNeeded.length === 0) &&
        (!data.interactiveFeatures || data.interactiveFeatures.length === 0) &&
        (!data.integrations || data.integrations.length === 0) &&
        !data.techPreferences?.trim() &&
        !data.visualStyle?.trim() &&
        !data.inspirationWebsites?.trim() &&
        (!data.brandAssets || data.brandAssets.length === 0) &&
        !data.targetLaunchDate?.trim() &&
        !data.targetLaunchExact?.trim() &&
        !data.milestones?.trim() &&
        !data.rolesResponsibilities?.trim() &&
        !data.budgetRange?.trim() &&
        !data.actionItems?.trim()
}

/**
 * Calculates a 0–100 completion percentage across the 6 discovery sections.
 * Each section contributes 1 point (Section 1 allows a half-point for partial).
 */
export const calculateProgress = (formData) => {
    if (isFormEmpty(formData)) return 0

    let score = 0
    const total = 6

    // Section 1: Business & Contact
    if (formData.clientName?.trim() && formData.email?.trim()) {
        score += 1
    } else if (formData.clientName?.trim() || formData.email?.trim() || formData.contactPerson?.trim()) {
        score += 0.5
    }

    // Section 2: Goals & Vision
    if (formData.mainObjectives?.trim() || formData.keyChallenges?.trim()) {
        score += 1
    }

    // Section 3: Audience & Brand Vibe
    if (formData.targetAudience?.trim() || formData.brandValues?.trim() || formData.brandMotto?.trim()) {
        score += 1
    }

    // Section 4: Pages, Features & Integrations
    if ((formData.pagesNeeded || []).length > 0 || (formData.interactiveFeatures || []).length > 0 || (formData.integrations || []).length > 0) {
        score += 1
    }

    // Section 5: Visual Direction & Assets
    if (formData.visualStyle?.trim() || formData.inspirationWebsites?.trim() || (formData.brandAssets || []).length > 0) {
        score += 1
    }

    // Section 6: Timeline & Budget
    if (formData.targetLaunchDate?.trim() || formData.targetLaunchExact?.trim() || formData.budgetRange?.trim()) {
        score += 1
    }

    return Math.min(100, Math.round((score / total) * 100))
}

/** Returns the email regex used for validation. */
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
