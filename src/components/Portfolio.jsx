
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { projects } from '../data/projects'
import Skeleton from './Skeleton'

export default function Portfolio() {
    const [filter, setFilter] = useState('All')
    const categories = ['All', 'Full Stack', 'Frontend', 'Design']

    const filteredProjects = projects.filter(p => filter === 'All' || p.category === filter)

    return (
        <section id="portfolio" className="py-24 bg-dark-900/50">
            <div className="section-container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6"
                >
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Recent <span className="text-gradient">Work</span>
                        </h2>
                        <p className="text-slate-400 max-w-lg mb-6">
                            A selection of projects that showcase my passion for building high-quality web experiences.
                        </p>

                        {/* Filter Buttons */}
                        <div className="flex flex-wrap gap-2">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setFilter(cat)}
                                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 border
                                        ${filter === cat
                                            ? 'bg-primary/20 border-primary text-white shadow-[0_0_15px_rgba(56,189,248,0.3)]'
                                            : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-white'}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    layout
                    className="grid gap-8 md:grid-cols-2 lg:gap-12"
                >
                    <AnimatePresence mode='popLayout'>
                        {filteredProjects.map((p) => (
                            <PortfolioItem key={p.id} project={p} />
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    )
}

function PortfolioItem({ project }) {
    const [isLoaded, setIsLoaded] = useState(false)

    return (
        <motion.article
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="group relative rounded-2xl overflow-hidden bg-dark-800 border border-white/5"
        >
            {/* Image Container */}
            <div className="aspect-video overflow-hidden relative">
                {!isLoaded && <Skeleton className="absolute inset-0 w-full h-full z-10" />}
                <img
                    src={project.image}
                    alt={project.alt}
                    loading="lazy"
                    onLoad={() => setIsLoaded(true)}
                    className={`w-full h-full object-cover transition-all duration-700 
                        ${isLoaded ? 'opacity-100 group-hover:scale-110 group-hover:opacity-80' : 'opacity-0'}`}
                />
            </div>

            {/* Content Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                <h3 className="text-2xl font-bold text-white mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{project.title}</h3>
                <p className="text-slate-300 mb-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">{project.description}</p>
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">
                    <a href={`#case/${project.id}`} className="inline-flex items-center gap-2 text-primary-glow font-medium hover:text-white transition-colors">
                        View Case Study <ExternalLink className="w-4 h-4" />
                    </a>
                </div>
            </div>
        </motion.article>
    )
}
