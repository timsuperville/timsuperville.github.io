import React from 'react'
import { testimonials } from '../data/testimonials'

export default function Testimonials() {
    return (
        <section id="testimonials" className="py-12 bg-white">
            <div className="max-w-4xl mx-auto px-5 text-center">
                <h2 className="text-2xl font-bold mb-4">Testimonials</h2>
                <div className="space-y-4">
                    {testimonials.map((t, i) => (
                        <blockquote key={i} className="p-4 border rounded">
                            <p className="text-gray-700 mb-2">“{t.quote}”</p>
                            <footer className="text-sm text-gray-500">— {t.author}</footer>
                        </blockquote>
                    ))}
                </div>
            </div>
        </section>
    )
}
