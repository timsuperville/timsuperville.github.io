// ─── Client Intake Form — Constants ─────────────────────────────────────────
// All static option arrays and quick-pick presets used by the discovery form.
// Centralised here so they can be imported independently of UI (e.g. in tests,
// server-side scripts, or future CMS-driven builds).

export const STORAGE_KEY = 'tim_client_planner_draft_v3'

export const GOAL_OPTIONS = [
    'Generate More Client Leads & Calls',
    'Sell Products Online / E-Commerce',
    'Modernize Our Outdated Website',
    'Automate Bookings & Appointments',
    'Establish Trust & Credibility',
    'Improve Mobile Experience & Speed',
    'Rank Higher on Google (Local SEO)',
    'Showcase Portfolio & Case Studies'
]

export const PAGE_OPTIONS = [
    'Home',
    'About Us / Story',
    'Services / Offerings',
    'Contact & Inquiry',
    'Online Booking / Calendar',
    'Portfolio / Project Gallery',
    'Client Portal / Login',
    'Blog / Articles / Resources',
    'Online Store / Shop',
    'FAQ / Help Center'
]

export const FEATURE_OPTIONS = [
    'Interactive Contact Form',
    'Online Appointment Booking',
    'Credit Card / Stripe Payments',
    'Mobile-First Responsive Design',
    'Google Local SEO & Maps Setup',
    'Analytics & Conversion Tracking',
    'Email Newsletter Signup',
    'Live Chat / Messaging',
    'Client Intake / Onboarding Forms'
]

export const STYLE_OPTIONS = [
    'Modern & Clean',
    'Warm & Approachable',
    'Bold & High-Energy',
    'Minimalist & Focused',
    'Established & Trustworthy',
    'Luxury & Refined',
    'Creative & Artistic',
    'Dark & Tech-Forward'
]

export const ASSET_OPTIONS = [
    'Logo Files Ready',
    'Brand Colors & Fonts Defined',
    'Professional Photos Ready',
    'Written Copy / Content Ready',
    'Domain & Hosting Secured',
    'Starting Fresh / Need Help With These'
]

export const TIMELINE_OPTIONS = [
    'As soon as possible',
    'Within 1 month',
    '1 to 2 months',
    'Flexible / No hard deadline'
]

export const BUDGET_OPTIONS = [
    'Under $2,500',
    '$2,500 – $5,000',
    '$5,000 – $10,000',
    '$10,000+',
    "Not sure yet — let's discuss"
]

/** One-click starter archetypes for Section 4 (Pages & Features). */
export const QUICK_PRESETS = [
    {
        id: 'service',
        label: 'Local Service Business',
        description: 'Consulting, trades, clinics, or professional services',
        pages: ['Home', 'About Us / Story', 'Services / Offerings', 'Contact & Inquiry', 'FAQ / Help Center'],
        features: ['Interactive Contact Form', 'Mobile-First Responsive Design', 'Google Local SEO & Maps Setup', 'Analytics & Conversion Tracking']
    },
    {
        id: 'trade',
        label: 'Trade / Craft / Contractor',
        description: 'Showcases past jobs, galleries, and estimate inquiries',
        pages: ['Home', 'About Us / Story', 'Services / Offerings', 'Portfolio / Project Gallery', 'Contact & Inquiry'],
        features: ['Interactive Contact Form', 'Mobile-First Responsive Design', 'Google Local SEO & Maps Setup']
    },
    {
        id: 'shop',
        label: 'Online Store / E-Commerce',
        description: 'Product catalog, digital orders, and instant card payments',
        pages: ['Home', 'Online Store / Shop', 'About Us / Story', 'Contact & Inquiry', 'FAQ / Help Center'],
        features: ['Credit Card / Stripe Payments', 'Mobile-First Responsive Design', 'Analytics & Conversion Tracking']
    }
]
