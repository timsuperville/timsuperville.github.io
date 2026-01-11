
import { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { projects } from '../data/projects'
import Skeleton from './Skeleton'

export default function Portfolio() {
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
                        <p className="text-slate-400 max-w-lg">
                            A selection of projects that showcase my passion for building high-quality web experiences.
                        </p>
                    </div>
                    {/* Optional View All Button */}
                    <a href="#portfolio" className="text-primary-glow hover:text-white transition-colors flex items-center gap-2 font-medium">
                        View all projects <ExternalLink className="w-4 h-4" />
                    </a>
                </motion.div>

                <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
                    {projects.map((p, i) => (
                        <PortfolioItem key={i} project={p} index={i} />
                    ))}
                </div>
            </div>
        </section>
    )
}

function PortfolioItem({ project, index }) {
    const [isLoaded, setIsLoaded] = useState(false)

    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
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
                    <span className="inline-flex items-center gap-2 text-primary-glow font-medium">
                        View Case Study <ExternalLink className="w-4 h-4" />
                    </span>
                </div>
            </div>
        </motion.article>
    )
}
