import { useState, useEffect } from 'react'
import { ROUTE_META, INTAKE_ROUTES, MAIN_PAGE_ROUTES } from '../routes'

// ─── useRoute ─────────────────────────────────────────────────────────────────
// Tracks window.location.hash and syncs document <title> / meta description
// based on the current route. Returns { route } for the consuming component.

function syncDocumentMeta(route) {
    const setMeta = (title, description) => {
        document.title = title
        if (description) {
            document.querySelector('meta[name="description"]')?.setAttribute('content', description)
        }
    }

    if (!route || route === '#home' || route === '') {
        const { title, description } = ROUTE_META.default
        setMeta(title, description)
    } else if (INTAKE_ROUTES.has(route)) {
        const { title, description } = ROUTE_META.intake
        setMeta(title, description)
    } else if (ROUTE_META[route]) {
        const { title, description } = ROUTE_META[route]
        setMeta(title, description)
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
    const isCaseStudy = route.startsWith('#case/')
    const isIntake = INTAKE_ROUTES.has(route)
    const showNotFound = !isMainPage && !isCaseStudy && route !== '#resume' && route !== '#privacy' && !isIntake

    return { route, isMainPage, isCaseStudy, isIntake, showNotFound }
}
