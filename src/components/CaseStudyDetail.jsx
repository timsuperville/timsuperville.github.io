import React, { useEffect } from 'react'
import { caseStudies } from '../data/caseStudies'

export default function CaseStudyDetail({ id }) {
    const study = caseStudies.find(s => s.id === id)

    useEffect(() => {
        if (study) {
            document.title = `${study.detailTitle} — Tim Superville`
        }
    }, [study])

    if (!study) return null

    return (
        <section id={`case-${study.id}`} className="py-16 bg-white">
            <div className="max-w-4xl mx-auto px-5">
                <a href="#home" className="text-sm text-sky-600">← Back</a>
                <h2 className="text-3xl font-bold mt-4 mb-3">{study.detailTitle}</h2>
                <p className="text-gray-700 mb-4">Challenge: {study.challenge}</p>
                <h3 className="font-semibold">What I did</h3>
                <ul className="list-disc ml-6 mb-3 text-gray-700">
                    {study.whatIDid.map((item, i) => (
                        <li key={i}>{item}</li>
                    ))}
                </ul>
                <h3 className="font-semibold">Results</h3>
                <p className="text-gray-700 mb-3">{study.results}</p>
                <p className="text-xs text-gray-500">{study.detailTech}</p>
            </div>
        </section>
    )
}
