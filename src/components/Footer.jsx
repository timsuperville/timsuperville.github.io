import React from 'react'
import { isOptedOut, optIn, optOut } from '../analytics'

export default function Footer() {
    const [optedOut, setOptedOut] = React.useState(isOptedOut())

    return (
        <footer className="bg-white border-t py-6">
            <div className="max-w-6xl mx-auto px-5 text-center">
                <p className="text-sm text-gray-600">© 2025 Tim Superville</p>
                <nav className="mt-2">
                    <a href="#contact" className="text-sky-600">Contact</a>
                </nav>
                <div className="mt-3">
                    <span className="mr-2 text-sm text-gray-600">Analytics:</span>
                    {optedOut ? (
                        <button className="px-3 py-1 border rounded" onClick={() => { optIn(); setOptedOut(false) }}>Enable</button>
                    ) : (
                        <button className="px-3 py-1 border rounded" onClick={() => { optOut(); setOptedOut(true) }}>Disable</button>
                    )}
                </div>
            </div>
        </footer>
    )
}
