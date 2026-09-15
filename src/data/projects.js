export const domains = [
    {
        id: 'all',
        name: 'All Systems',
        description: 'Entire catalog across all engineering domains and architectures',
        icon: 'Layers'
    },
    {
        id: 'edge',
        name: 'Edge & Performance',
        description: 'Zero-server static platforms, sub-second LCP, and Schema.org SEO',
        icon: 'Globe'
    },
    {
        id: 'realtime',
        name: 'Real-Time & Audio',
        description: 'WebSocket master clock sync, low-latency telemetry, and Web Audio DSP',
        icon: 'Radio'
    },
    {
        id: 'fintech',
        name: 'SaaS & Fintech',
        description: 'Multi-tenant RBAC, Stripe subscription billing, and idempotent webhooks',
        icon: 'CreditCard'
    },
    {
        id: 'tooling',
        name: 'Developer Tooling',
        description: 'Automated test harnesses, modular architectures, and CI/CD pipelines',
        icon: 'Terminal'
    }
]

export const projects = [
    {
        id: 'trade-platform',
        title: 'High-Performance Trade & Local Web Platform',
        subtitle: 'Sub-second edge architecture with automated Local SEO and conversion pipelines',
        description: 'Engineered an ultra-fast, mobile-first web platform for local service and trade businesses. Features Schema.org structured data, edge deployment on Cloudflare Pages, and streamlined customer inquiry workflows.',
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
        category: 'Frontend',
        metrics: '100/100 Lighthouse',
        metricsSub: 'Sub-1s Largest Contentful Paint',
        tags: ['React', 'Vite', 'Tailwind CSS', 'Cloudflare Pages', 'Schema.org', 'Technical SEO'],
        featured: true
    },
    {
        id: 'audio-engine',
        title: 'Resonance — Real-Time Audio & Media Sync',
        subtitle: 'Low-latency telemetry and WebSocket master clock synchronization',
        description: 'Architected a real-time live performance synchronization engine. Implements WebSocket telemetry broadcasts, dynamic waveform rendering, cue advancement, and synchronized playback across distributed presentation displays.',
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
        category: 'Full Stack',
        metrics: '<15ms Latency',
        metricsSub: 'Bi-directional WebSocket Telemetry',
        tags: ['TypeScript', 'React', 'WebSockets', 'Web Audio API', 'Node.js', 'State Sync'],
        featured: true
    },
    {
        id: 'saas-portal',
        title: 'Modular SaaS & Multi-Tenant API Suite',
        subtitle: 'Scalable subscription infrastructure with RBAC and payment orchestration',
        description: 'Built a resilient multi-tenant SaaS foundation featuring role-based access control (RBAC), idempotent Stripe webhook reconciliation, automated transactional invoicing, and automated Vitest verification suites.',
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
        category: 'Full Stack',
        metrics: '99.9% Uptime',
        metricsSub: 'Zero-downtime Stripe billing',
        tags: ['React', 'Node.js', 'PostgreSQL', 'Stripe API', 'Vitest', 'Docker'],
        featured: true
    },
    {
        id: 'audio-lab',
        title: 'Audio Lab — Live DSP & Module Testbed',
        subtitle: 'Browser-based audio processing test harness and state machine bench',
        description: 'Interactive developer testbed for validating pro-audio DSP algorithms, audio graph buffer routing, Web Audio API latency benchmarks, and WebSocket telemetry stream integrity.',
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
        category: 'Full Stack',
        metrics: '>95% Coverage',
        metricsSub: 'Comprehensive Vitest test suite',
        tags: ['TypeScript', 'Web Audio API', 'Audio DSP', 'Vitest', 'State Machines'],
        featured: true
    }
]
