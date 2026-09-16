// ─── Route Definitions & Metadata ────────────────────────────────────────────

export const ROUTES = {
    HOME: '#home',
    SERVICES: '#services',
    PORTFOLIO: '#portfolio',
    CASE_STUDIES: '#case-studies',
    TECH_STACK: '#tech-stack',
    ESTIMATOR: '#estimator',
    TESTIMONIALS: '#testimonials',
    PRINCIPLES: '#principles',
    ABOUT: '#about',
    CONTACT: '#contact',
    RESUME: '#resume',
    PRIVACY: '#privacy',
    INTAKE: '#intake',
    CLIENT_INTAKE: '#client-intake',
    START_PROJECT: '#start-project',
    PLANNER: '#planner'
}

export const INTAKE_ROUTES = new Set([
    '#intake',
    '#client-intake',
    '#start-project',
    '#planner'
])

export const MAIN_PAGE_ROUTES = new Set([
    '',
    '#home',
    '#services',
    '#portfolio',
    '#case-studies',
    '#tech-stack',
    '#estimator',
    '#testimonials',
    '#principles',
    '#about',
    '#contact'
])

export const ROUTE_META = {
    default: {
        title: 'Tim Superville | Web Developer & Full Stack Engineer',
        description:
            'Freelance web developer and full stack engineer based in Northern Alberta. Building clean, fast, and dependable websites and web applications.'
    },
    '#contact': {
        title: 'Contact & Inquiries — Tim Superville',
        description: 'Get in touch with Tim Superville to discuss your website or web application project.'
    },
    '#resume': {
        title: 'Interactive Resume — Tim Superville',
        description: null
    },
    '#privacy': {
        title: 'Privacy Policy — Tim Superville',
        description: null
    },
    intake: {
        title: 'Website Project Planner & Discovery — Tim Superville',
        description:
            'Website project planner and discovery questionnaire. Share your goals, desired features, and timeline with Tim Superville.'
    }
}

export const isMainPageRoute = (route) => MAIN_PAGE_ROUTES.has(route || '')
export const isIntakeRoute = (route) => INTAKE_ROUTES.has(route)
export const isCaseStudyRoute = (route) => typeof route === 'string' && route.startsWith('#case/')
