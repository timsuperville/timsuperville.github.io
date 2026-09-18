import { useState, useEffect } from 'react'
import { ROUTE_META, INTAKE_ROUTES, MAIN_PAGE_ROUTES, isHighwaterRoute, isHighwaterV2Route, isAllHighwaterRoute } from '../routes'

// ─── useRoute ─────────────────────────────────────────────────────────────────
// Tracks window.location.hash and syncs document <title> / meta description
// based on the current route. Returns { route } for the consuming component.

function syncDocumentMeta(route) {
    const setMeta = (title, description, favicon = './favicon.svg') => {
        document.title = title
        if (description) {
            document.querySelector('meta[name="description"]')?.setAttribute('content', description)
        }
        const faviconEl = document.querySelector('link[rel="icon"]')
        if (faviconEl) {
            faviconEl.setAttribute('href', favicon)
        }
    }

    if (!route || route === '#home' || route === '') {
        const { title, description } = ROUTE_META.default
        setMeta(title, description, './favicon.svg')
    } else if (INTAKE_ROUTES.has(route)) {
        const { title, description } = ROUTE_META.intake
        setMeta(title, description, './favicon.svg')
    } else if (isHighwaterV2Route(route)) {
        const { title, description } = ROUTE_META.highwater_v2
        setMeta(title, description, '/images/highwater-favicon-32.png')
    } else if (isHighwaterRoute(route)) {
        const { title, description } = ROUTE_META.highwater
        setMeta(title, description, '/images/highwater-favicon-32.png')
    } else if (ROUTE_META[route]) {
        const { title, description } = ROUTE_META[route]
        setMeta(title, description, './favicon.svg')
    }
}

export function useRoute() {
    const [route, setRoute] = useState(window.location.hash || '#home')

    useEffect(() => {
        const onHash = () => setRoute(window.location.hash || '#home')
        window.addEventListener('hashchange', onHash)
        return () => window.removeEventListener('hashchange', onHash)
    }, [])

    useEffect(() => {
        syncDocumentMeta(route)
    }, [route])

    const isMainPage = MAIN_PAGE_ROUTES.has(route)
    const isCaseStudy = typeof route === 'string' && route.startsWith('#case/')
    const isIntake = INTAKE_ROUTES.has(route)
    const isHighwater = isHighwaterRoute(route)
    const isHighwaterV2 = isHighwaterV2Route(route)
    const isAnyHighwater = isAllHighwaterRoute(route)
    const showNotFound = !isMainPage && !isCaseStudy && route !== '#resume' && route !== '#privacy' && !isIntake && !isAnyHighwater

    return { route, isMainPage, isCaseStudy, isIntake, isHighwater, isHighwaterV2, isAnyHighwater, showNotFound }
}

