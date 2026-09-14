export const caseStudies = [
    {
        id: 'ecommerce',
        listTitle: 'E‑commerce revamp — 30% faster conversions',
        shortDescription: 'Re-engineered payment pipelines and critical rendering path, yielding a 30% increase in checkout conversions and 18% faster paint times.',
        shortTech: 'Tech: React, Node.js, Stripe, Serverless, Tailwind CSS',
        detailTitle: 'E-commerce revamp',
        image: '/images/ecommerce_dashboard_1768123341838.png',
        category: 'Full Stack Architecture',
        statValue: '+30%',
        statLabel: 'Conversion Rate',
        secondaryStatValue: '18%',
        secondaryStatLabel: 'Speed Improvement',
        challenge: 'The legacy client store suffered from a multi-step checkout with friction, payment failures with no retry strategy, and slow critical-path asset loading leading to high cart abandonment (>68%).',
        whatIDid: [
            'Architected a frictionless single-step checkout flow with instant field validation',
            'Implemented Stripe Elements with idempotent retry handling and webhook reconciliation',
            'Optimized assets, responsive WebP images, and critical inline CSS for sub-second LCP',
            'Integrated real-time serverless inventory verification preventing overselling during traffic peaks'
        ],
        results: '30% increase in conversions, average page load speed improved by 18%, and cart abandonment reduced by 22%.',
        detailTech: 'React, Node.js, Stripe Webhooks, Serverless Functions, Tailwind CSS, Lighthouse CI'
    },
    {
        id: 'axis-integrity',
        listTitle: 'Axis Integrity Services — Enterprise Engineering Telemetry',
        shortDescription: 'Built an industrial asset management portal showcasing specialized corrosion management, NDT certification pipelines, and field-ready telemetry.',
        shortTech: 'Tech: React, Vite, Tailwind CSS, REST APIs, PWA',
        detailTitle: 'Axis Integrity Services — Industrial Cloud',
        image: '/images/engineering_portfolio_1768123368170.png',
        category: 'Enterprise Engineering',
        statValue: '99.9%',
        statLabel: 'Telemetry Reliability',
        secondaryStatValue: '100%',
        secondaryStatLabel: 'Field Mobile Ready',
        challenge: 'A specialized asset integrity engineering firm required a unified, high-credibility digital portal to showcase mission-critical NDT inspection services and provide responsive validation for industrial partners.',
        whatIDid: [
            'Designed and engineered a dark-mode industrial UI optimized for low-latency field access',
            'Structured interactive service matrices and technical certification registries',
            'Engineered offline caching strategies allowing field technicians to reference documentation offline',
            'Deployed automated CI/CD deployment pipelines on Netlify with automated build verification'
        ],
        results: 'Established a verified, partner-facing digital hub that facilitated multi-million dollar industrial contract bids and significantly shortened client onboarding cycles.',
        detailTech: 'React, Vite, Tailwind CSS, Service Workers, Netlify CI/CD'
    },
    {
        id: 'marketing',
        listTitle: 'Marketing Platform Rebuild — SEO Architecture & AA Accessibility',
        shortDescription: 'Modernized front-end architecture and technical SEO, achieving 100/100 Lighthouse audits and a 40% organic traffic surge within 90 days.',
        shortTech: 'Tech: React, Tailwind CSS, Schema.org, Lighthouse CI',
        detailTitle: 'High-Impact Brand & Marketing Platform',
        image: '/images/marketing_site_1768123355082.png',
        category: 'Frontend & SEO',
        statValue: '+40%',
        statLabel: 'Organic Traffic Lift',
        secondaryStatValue: 'AA',
        secondaryStatLabel: 'WCAG Compliance',
        challenge: 'The existing brand site suffered from slow loading speeds, poor search visibility, inaccessible contrast ratios, and lack of semantic hierarchy across screen readers.',
        whatIDid: [
            'Restructured complete document outline using semantic HTML5 landmarks and ARIA live regions',
            'Implemented comprehensive JSON-LD structured data schemas for Google Knowledge Graph indexing',
            'Reduced JavaScript bundle payload by 45% through aggressive code-splitting and dynamic imports',
            'Conducted accessibility audits reaching 100% WCAG AA compliance across all key landing flows'
        ],
        results: 'Organic search impressions climbed 40% within 3 months, bounce rates dropped 15%, and accessibility ratings achieved perfect AA certification.',
        detailTech: 'React, Tailwind CSS, Structured Data (JSON-LD), WCAG AA Guidelines, Lighthouse CI'
    }
]
