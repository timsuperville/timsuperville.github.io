const getEnv = (key, fallback) => {
    try {
        return import.meta.env[key] || fallback
    } catch {
        return fallback
    }
}

export const CONFIG = {
    CALENDLY_URL: getEnv('VITE_CALENDLY_URL', 'https://calendly.com/'),
    FORMSPREE_ENDPOINT: getEnv('VITE_FORMSPREE_ENDPOINT', 'https://formspree.io/f/your-form-id'),
    CONTACT_EMAIL: getEnv('VITE_CONTACT_EMAIL', 'hello@example.com')
}
