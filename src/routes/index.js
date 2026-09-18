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
    PLANNER: '#planner',
    HIGHWATER: '#highwater',
    HIGHWATER_ALIAS: '#client/highwater',
    HIGHWATER_V2: '#highwater-v2',
    HIGHWATER_V2_ALIAS: '#client/highwater-v2'
}

export const HIGHWATER_SECTIONS = [
    '#hw-about',
    '#hw-services',
    '#hw-faqs',
    '#hw-booking',
    '#hw-location',
    '#hw-contact'
]

export const HIGHWATER_V2_SECTIONS = [
    '#v2-journey',
    '#v2-selector',
    '#v2-about',
    '#v2-services',
    '#v2-faq',
    '#v2-location',
    '#v2-booking'
]

export const HIGHWATER_ROUTES = new Set([
    '#highwater',
    '#client/highwater',
    ...HIGHWATER_SECTIONS
])

export const HIGHWATER_V2_ROUTES = new Set([
    '#highwater-v2',
    '#client/highwater-v2',
    ...HIGHWATER_V2_SECTIONS
])

export const ALL_HIGHWATER_ROUTES = new Set([
    ...HIGHWATER_ROUTES,
    ...HIGHWATER_V2_ROUTES
])

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
    },
    highwater: {
        title: 'Highwater Counselling Company | Wembley, AB | Derek Patten',
        description:
            'Faith & values-based counselling, postmodern therapy, and on-site mental health support in Wembley, Alberta. Founded by Derek Patten.'
    },
    highwater_v2: {
        title: 'Highwater Counselling Company (Draft 2) | Serene Alpine Sanctuary | Derek Patten',
        description:
            'When life’s waters rise, a solid place to stand. Professional, postmodern, and faith-integrated counselling in Wembley, Alberta.'
    }
}

export const isMainPageRoute = (route) => MAIN_PAGE_ROUTES.has(route || '')
export const isIntakeRoute = (route) => INTAKE_ROUTES.has(route)
export const isHighwaterRoute = (route) => HIGHWATER_ROUTES.has(route) || (typeof route === 'string' && route.startsWith('#hw-'))
export const isHighwaterV2Route = (route) => HIGHWATER_V2_ROUTES.has(route) || (typeof route === 'string' && route.startsWith('#v2-'))
export const isAllHighwaterRoute = (route) => ALL_HIGHWATER_ROUTES.has(route) || isHighwaterRoute(route) || isHighwaterV2Route(route)
export const isCaseStudyRoute = (route) => typeof route === 'string' && route.startsWith('#case/')
