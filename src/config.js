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
    CONTACT_EMAIL: getEnv('VITE_CONTACT_EMAIL', 'hello@tsuperville.com'),
    GOOGLE_SHEETS_INTAKE_URL: getEnv('VITE_GOOGLE_SHEETS_INTAKE_URL', 'https://script.google.com/macros/s/AKfycbxerZ9JYA50tBwPcOe6_kslyTJjMVzohsyhx_IrhWdSw7BmbR9q1YM0PZR1dyXc9meB/exec')
}
