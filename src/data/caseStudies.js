export const caseStudies = [
    {
        id: 'trade-platform',
        listTitle: 'High-Performance Trade Platform — Sub-1s Edge Delivery',
        shortDescription: 'Engineered a modern web platform for brick-and-mortar trade businesses, achieving 100/100 Core Web Vitals and automated Google Local ranking optimization.',
        shortTech: 'Tech: React, Vite, Tailwind CSS, Cloudflare Pages, Schema.org',
        detailTitle: 'High-Performance Trade & Local Web Platform',
        filename: 'edge-cache.ts',
        language: 'TypeScript',
        code: `// Sub-second Edge Caching & Local SEO Optimization
export async function onRequestGet({ request, next }: EventContext) {
  const url = new URL(request.url)
  const cache = caches.default
  const cacheKey = new Request(url.toString(), request)

  let response = await cache.match(cacheKey)
  if (response) return response

  response = await next()
  response.headers.set('Cache-Control', 'public, max-age=0, s-maxage=86400, stale-while-revalidate=3600')
  response.headers.set('Link', '</fonts/inter.woff2>; rel=preload; as=font; crossorigin')

  return response
}`,
        category: 'Frontend & Edge Architecture',
        statValue: '100/100',
        statLabel: 'Lighthouse Performance',
        secondaryStatValue: '<0.8s',
        secondaryStatLabel: 'Largest Contentful Paint',
        challenge: 'Local brick-and-mortar trade businesses were losing emergency repair calls and inquiries due to bloated legacy site builders that had multi-second load times on mobile devices and lacked structured search markup.',
        whatIDid: [
            'Engineered a zero-server static template system built on Vite and deployed globally via Cloudflare Pages edge CDN',
            'Implemented JSON-LD structured schemas for Schema.org LocalBusiness, service catalogs, and geographic coverage',
            'Designed high-contrast, thumb-friendly mobile call-to-action flows for emergency service dispatch',
            'Optimized assets and critical CSS paths to achieve a sub-800ms Largest Contentful Paint on 4G connections'
        ],
        results: 'Achieved flawless 100/100 Lighthouse audits across performance, accessibility, best practices, and SEO, driving rapid local search indexing and higher customer call volume.',
        detailTech: 'React, Vite, Tailwind CSS, Cloudflare Pages, Schema.org, Lighthouse CI'
    },
    {
        id: 'audio-engine',
        listTitle: 'Resonance Bridge — Real-Time Live Performance Sync',
        shortDescription: 'Architected a sub-15ms WebSocket master clock and telemetry distribution layer to synchronize multitrack playback with live presentation cues.',
        shortTech: 'Tech: TypeScript, React, WebSockets, Web Audio API, Node.js',
        detailTitle: 'Resonance — Real-Time Audio & Media Sync',
        filename: 'resonance-sync.ts',
        language: 'TypeScript',
        code: `// Low-Latency WebSocket Master Clock & Drift Compensation
export function calculateDriftCompensation(
  localPlaybackTime: number,
  masterTimestamp: number,
  roundTripTimeMs: number
): { offset: number; shouldNudge: boolean } {
  const oneWayLatency = roundTripTimeMs / 2
  const targetMasterTime = masterTimestamp + (oneWayLatency / 1000)
  const offset = targetMasterTime - localPlaybackTime

  return {
    offset,
    shouldNudge: Math.abs(offset) > 0.015 // Nudge if drift exceeds 15ms
  }
}`,
        category: 'Real-Time Systems & Audio DSP',
        statValue: '<15ms',
        statLabel: 'Telemetry Sync Latency',
        secondaryStatValue: '100%',
        secondaryStatLabel: 'Cue Advancement Accuracy',
        challenge: 'Live production environments required tight synchronization between audio stems playback and visual lyric/presentation screens across local networks without relying on high-latency cloud roundtrips.',
        whatIDid: [
            'Architected the Resonance Bridge WebSocket synchronization protocol for bidirectional master/slave clock orchestration',
            'Built a responsive, zero-jank audio waveform visualizer and multitrack channel mixer in React',
            'Implemented automated offline-first fallback and heartbeat recovery for network dropouts',
            'Created strict telemetry payload validators to prevent state drift during rapid live tempo and cue changes'
        ],
        results: 'Delivered a resilient, low-latency live stage synchronization system that keeps audio playback and visual displays locked in sync within 15 milliseconds.',
        detailTech: 'TypeScript, React, WebSockets, Web Audio API, Node.js, Vitest'
    },
    {
        id: 'saas-portal',
        listTitle: 'Modular SaaS Portal — Enterprise RBAC & Stripe Billing',
        shortDescription: 'Built a multi-tenant web application architecture with role-based access control, idempotent Stripe subscription pipelines, and automated test coverage.',
        shortTech: 'Tech: React, Node.js, PostgreSQL, Stripe API, Vitest, Docker',
        detailTitle: 'Modular SaaS & Multi-Tenant API Suite',
        filename: 'stripe-webhook.ts',
        language: 'TypeScript',
        code: `// Idempotent Stripe Webhook Ingestion & RBAC License Sync
export async function handleStripeWebhook(payload: Buffer, sig: string, secret: string) {
  const event = stripe.webhooks.constructEvent(payload, sig, secret)
  
  if (await isEventProcessed(event.id)) {
    return { status: 'already_processed', eventId: event.id }
  }

  if (event.type === 'customer.subscription.updated') {
    const sub = event.data.object as Stripe.Subscription
    await syncTenantLicensing(sub.customer as string, sub.status)
  }
  
  await markEventProcessed(event.id)
  return { status: 'success' }
}`,
        category: 'Full Stack Architecture',
        statValue: '99.9%',
        statLabel: 'Platform Availability',
        secondaryStatValue: '94%',
        secondaryStatLabel: 'Automated Test Coverage',
        challenge: 'Growing software platforms require secure multi-tenant isolation, granular user role permissions, and bulletproof billing webhooks that handle edge cases like failed renewals and plan upgrades gracefully.',
        whatIDid: [
            'Architected a 6-tier Role-Based Access Control (RBAC) middleware and client route guard system',
            'Integrated Stripe Billing with idempotent webhook handlers, automated receipt generation, and dunning retry logic',
            'Designed a responsive modern UI interface with fluid theme customization and keyboard accessibility',
            'Authored a comprehensive test suite across API contracts and frontend workflows with Vitest and React Testing Library'
        ],
        results: 'Established a clean, zero-technical-debt platform architecture that enables rapid feature expansion while maintaining rock-solid security and financial audit trails.',
        detailTech: 'React, TypeScript, Node.js, Express, PostgreSQL, Stripe API, Docker, Vitest'
    }
]
