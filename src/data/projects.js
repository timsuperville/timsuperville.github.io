// ─── Consolidated Projects & Case Studies ─────────────────────────────────────
// Canonical source of truth for portfolio cards and deep-dive case studies.

export const projects = [
    {
        id: 'trade-platform',
        title: 'High-Performance Trade & Local Web Platform',
        detailTitle: 'High-Performance Trade & Local Web Platform',
        listTitle: 'High-Performance Trade Platform — Sub-1s Edge Delivery',
        subtitle: 'Sub-second edge architecture with automated Local SEO and conversion pipelines',
        description: 'Engineered an ultra-fast, mobile-first web platform for local service and trade businesses. Features Schema.org structured data, edge deployment on Cloudflare Pages, and streamlined customer inquiry workflows.',
        shortDescription: 'Engineered a modern web platform for brick-and-mortar trade businesses, achieving 100/100 Core Web Vitals and automated Google Local ranking optimization.',
        shortTech: 'Tech: React, Vite, Tailwind CSS, Cloudflare Pages, Schema.org',
        detailTech: 'React, Vite, Tailwind CSS, Cloudflare Pages, Schema.org, Lighthouse CI',
        category: 'Frontend',
        detailCategory: 'Frontend & Edge Architecture',
        domainId: 'edge',
        domain: 'Edge & Performance',
        status: 'Production',
        year: '2026',
        connections: ['audio-engine', 'saas-portal'],
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
        statValue: '100/100',
        statLabel: 'Lighthouse Performance',
        secondaryStatValue: '<0.8s',
        secondaryStatLabel: 'Largest Contentful Paint',
        metrics: '100/100 Lighthouse',
        metricsSub: 'Sub-1s Largest Contentful Paint',
        challenge: 'Local brick-and-mortar trade businesses were losing emergency repair calls and inquiries due to bloated legacy site builders that had multi-second load times on mobile devices and lacked structured search markup.',
        whatIDid: [
            'Engineered a zero-server static template system built on Vite and deployed globally via Cloudflare Pages edge CDN',
            'Implemented JSON-LD structured schemas for Schema.org LocalBusiness, service catalogs, and geographic coverage',
            'Designed high-contrast, thumb-friendly mobile call-to-action flows for emergency service dispatch',
            'Optimized assets and critical CSS paths to achieve a sub-800ms Largest Contentful Paint on 4G connections'
        ],
        results: 'Achieved flawless 100/100 Lighthouse audits across performance, accessibility, best practices, and SEO, driving rapid local search indexing and higher customer call volume.',
        tags: ['React', 'Vite', 'Tailwind CSS', 'Cloudflare Pages', 'Schema.org', 'Technical SEO'],
        featured: true
    },
    {
        id: 'audio-engine',
        title: 'Resonance — Real-Time Audio & Media Sync',
        detailTitle: 'Resonance — Real-Time Audio & Media Sync',
        listTitle: 'Resonance Bridge — Real-Time Live Performance Sync',
        subtitle: 'Low-latency telemetry and WebSocket master clock synchronization',
        description: 'Architected a real-time live performance synchronization engine. Implements WebSocket telemetry broadcasts, dynamic waveform rendering, cue advancement, and synchronized playback across distributed presentation displays.',
        shortDescription: 'Architected a sub-15ms WebSocket master clock and telemetry distribution layer to synchronize multitrack playback with live presentation cues.',
        shortTech: 'Tech: TypeScript, React, WebSockets, Web Audio API, Node.js',
        detailTech: 'TypeScript, React, WebSockets, Web Audio API, Node.js, Vitest',
        category: 'Full Stack',
        detailCategory: 'Real-Time Systems & Audio DSP',
        domainId: 'realtime',
        domain: 'Real-Time & Audio',
        status: 'Active',
        year: '2026',
        connections: ['audio-lab', 'saas-portal'],
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
        statValue: '<15ms',
        statLabel: 'Telemetry Sync Latency',
        secondaryStatValue: '100%',
        secondaryStatLabel: 'Cue Advancement Accuracy',
        metrics: '<15ms Latency',
        metricsSub: 'Bi-directional WebSocket Telemetry',
        challenge: 'Live production environments required tight synchronization between audio stems playback and visual lyric/presentation screens across local networks without relying on high-latency cloud roundtrips.',
        whatIDid: [
            'Architected the Resonance Bridge WebSocket synchronization protocol for bidirectional master/slave clock orchestration',
            'Built a responsive, zero-jank audio waveform visualizer and multitrack channel mixer in React',
            'Implemented automated offline-first fallback and heartbeat recovery for network dropouts',
            'Created strict telemetry payload validators to prevent state drift during rapid live tempo and cue changes'
        ],
        results: 'Delivered a resilient, low-latency live stage synchronization system that keeps audio playback and visual displays locked in sync within 15 milliseconds.',
        tags: ['TypeScript', 'React', 'WebSockets', 'Web Audio API', 'Node.js', 'State Sync'],
        featured: true
    },
    {
        id: 'saas-portal',
        title: 'Modular SaaS & Multi-Tenant API Suite',
        detailTitle: 'Modular SaaS & Multi-Tenant API Suite',
        listTitle: 'Modular SaaS Portal — Enterprise RBAC & Stripe Billing',
        subtitle: 'Scalable subscription infrastructure with RBAC and payment orchestration',
        description: 'Built a resilient multi-tenant SaaS foundation featuring role-based access control (RBAC), idempotent Stripe webhook reconciliation, automated transactional invoicing, and automated Vitest verification suites.',
        shortDescription: 'Built a multi-tenant web application architecture with role-based access control, idempotent Stripe subscription pipelines, and automated test coverage.',
        shortTech: 'Tech: React, Node.js, PostgreSQL, Stripe API, Vitest, Docker',
        detailTech: 'React, TypeScript, Node.js, Express, PostgreSQL, Stripe API, Docker, Vitest',
        category: 'Full Stack',
        detailCategory: 'Full Stack Architecture',
        domainId: 'fintech',
        domain: 'SaaS & Fintech',
        status: 'Production',
        year: '2025',
        connections: ['trade-platform', 'audio-engine'],
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
        statValue: '99.9%',
        statLabel: 'Platform Availability',
        secondaryStatValue: '94%',
        secondaryStatLabel: 'Automated Test Coverage',
        metrics: '99.9% Uptime',
        metricsSub: 'Zero-downtime Stripe billing',
        challenge: 'Growing software platforms require secure multi-tenant isolation, granular user role permissions, and bulletproof billing webhooks that handle edge cases like failed renewals and plan upgrades gracefully.',
        whatIDid: [
            'Architected a 6-tier Role-Based Access Control (RBAC) middleware and client route guard system',
            'Integrated Stripe Billing with idempotent webhook handlers, automated receipt generation, and dunning retry logic',
            'Designed a responsive modern UI interface with fluid theme customization and keyboard accessibility',
            'Authored a comprehensive test suite across API contracts and frontend workflows with Vitest and React Testing Library'
        ],
        results: 'Established a clean, zero-technical-debt platform architecture that enables rapid feature expansion while maintaining rock-solid security and financial audit trails.',
        tags: ['React', 'Node.js', 'PostgreSQL', 'Stripe API', 'Vitest', 'Docker'],
        featured: true
    },
    {
        id: 'audio-lab',
        title: 'Audio Lab — Live DSP & Module Testbed',
        detailTitle: 'Audio Lab — Live DSP & Module Testbed',
        listTitle: 'Audio Lab — Pro-Audio DSP & Module Testbed',
        subtitle: 'Browser-based audio processing test harness and state machine bench',
        description: 'Interactive developer testbed for validating pro-audio DSP algorithms, audio graph buffer routing, Web Audio API latency benchmarks, and WebSocket telemetry stream integrity.',
        shortDescription: 'Interactive developer testbed for validating pro-audio DSP algorithms, Web Audio latency, and telemetry stream integrity.',
        shortTech: 'Tech: TypeScript, Web Audio API, Audio DSP, Vitest',
        detailTech: 'TypeScript, Web Audio API, Audio DSP, Vitest, State Machines',
        category: 'Full Stack',
        detailCategory: 'Developer Tooling & Audio DSP',
        domainId: 'tooling',
        domain: 'Developer Tooling',
        status: 'Open Source',
        year: '2026',
        connections: ['audio-engine'],
        filename: 'dsp-routing.ts',
        language: 'TypeScript',
        code: `// Dynamic Audio Node Routing & Low-Pass Filter Chain
export function createAudioFilterChain(ctx: AudioContext, inputNode: AudioNode) {
  const biquadFilter = ctx.createBiquadFilter()
  biquadFilter.type = 'lowpass'
  biquadFilter.frequency.setValueAtTime(1000, ctx.currentTime)
  biquadFilter.Q.setValueAtTime(1.5, ctx.currentTime)

  inputNode.connect(biquadFilter)
  biquadFilter.connect(ctx.destination)
  return { filter: biquadFilter }
}`,
        statValue: '>95%',
        statLabel: 'Test Coverage',
        secondaryStatValue: '<1ms',
        secondaryStatLabel: 'Audio Graph Overhead',
        metrics: '>95% Coverage',
        metricsSub: 'Comprehensive Vitest test suite',
        challenge: 'Validating Web Audio API buffer processing and state transitions required an isolated test bench with precise timing inspection and zero UI-thread blocking.',
        whatIDid: [
            'Built an interactive audio node graph test harness for real-time DSP filter chain profiling',
            'Implemented headless Vitest test suites simulating Web Audio buffer streams and latency drift',
            'Designed reusable state machines for audio cue scheduling and hardware clock handshakes',
            'Integrated real-time parameter sweeps and visual spectrum analyzers for DSP debugging'
        ],
        results: 'Created a developer testbed providing real-time audio graph debugging and benchmark harnesses for complex DSP algorithms.',
        tags: ['TypeScript', 'Web Audio API', 'Audio DSP', 'Vitest', 'State Machines'],
        featured: true
    }
]
