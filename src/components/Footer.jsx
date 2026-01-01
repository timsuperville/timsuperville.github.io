import React from 'react'
import { isOptedOut, optIn, optOut } from '../analytics'

export default function Footer() {
    const [optedOut, setOptedOut] = React.useState(isOptedOut())

    return (
        <footer className="bg-white border-t py-6">
            <div className="max-w-6xl mx-auto px-5 text-center">
                <div className="flex justify-center gap-6 mb-4">
                    <a href="https://github.com/timsuperville" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-sky-600 transition-colors">GitHub</a>
                    <a href="https://www.linkedin.com/in/timsuperville" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-sky-600 transition-colors">LinkedIn</a>
                </div>
                <p className="text-sm text-gray-400">© 2025 Tim Superville. All rights reserved.</p>
                <div className="mt-4 flex justify-center items-center gap-2 text-xs text-gray-400">
                    <span>Analytics:</span>
                    {optedOut ? (
                        <button className="text-gray-500 underline hover:text-sky-600" onClick={() => { optIn(); setOptedOut(false) }}>Enable</button>
                    ) : (
                        <button className="text-gray-500 underline hover:text-sky-600" onClick={() => { optOut(); setOptedOut(true) }}>Disable</button>
                    )}
                </div>
            </div>
        </footer>
    )
}
