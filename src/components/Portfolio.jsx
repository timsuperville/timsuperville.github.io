import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
    ArrowRight, 
    TrendingUp, 
    Code2, 
    Search, 
    LayoutGrid, 
    ListFilter, 
    CheckCircle2, 
    Filter
} from 'lucide-react'
import { projects } from '../data/projects'
import CodeTerminal from './CodeTerminal'

export default function Portfolio() {
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [searchQuery, setSearchQuery] = useState('')
    const [viewMode, setViewMode] = useState('grid') // 'grid' | 'table'

    const categories = ['All', 'Full Stack', 'Frontend']

    // Filter projects based on category and search query
    const filteredProjects = useMemo(() => {
        return projects.filter(p => {
            const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory
            const matchesSearch = !searchQuery.trim() || 
                p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))

            return matchesCategory && matchesSearch
        })
    }, [selectedCategory, searchQuery])

    return (
        <section id="portfolio" className="py-24 relative overflow-hidden bg-dark-900/40">
            {/* Subtle Ambient Radial */}
            <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[140px] pointer-events-none"></div>

            <div className="section-container relative z-10">
                {/* Section Header & Top Controls */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6"
                >
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary-glow text-xs font-mono uppercase tracking-wider mb-4">
                            <Code2 className="w-3.5 h-3.5" />
                            <span>Featured Projects</span>
                        </div>
                        <h2 className="text-3xl sm:text-5xl font-bold mb-4 tracking-tight">
                            Recent <span className="text-gradient">Work</span>
                        </h2>
                        <p className="text-slate-400 max-w-xl text-base sm:text-lg">
                            Real-world web applications, custom business tools, and verified production code.
                        </p>
                    </div>

                    {/* Filter Pills & View Switcher */}
                    <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                        {/* Category Pills */}
                        <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-dark-950/60 border border-white/10 backdrop-blur-md">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium transition-all duration-200 ${
                                        selectedCategory === cat
                                            ? 'bg-primary/20 border border-primary-glow/50 text-white shadow-glow-primary shadow-sm'
                                            : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        {/* View Switcher */}
                        <div className="flex items-center gap-1 p-1 rounded-xl bg-dark-950/60 border border-white/10 backdrop-blur-md">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-1.5 rounded-lg transition-colors ${
                                    viewMode === 'grid' 
                                        ? 'bg-primary/20 text-white border border-primary-glow/40' 
                                        : 'text-slate-400 hover:text-white'
                                }`}
                                title="Grid View"
                                aria-label="Switch to Grid View"
                            >
                                <LayoutGrid className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setViewMode('table')}
                                className={`p-1.5 rounded-lg transition-colors ${
                                    viewMode === 'table' 
                                        ? 'bg-primary/20 text-white border border-primary-glow/40' 
                                        : 'text-slate-400 hover:text-white'
                                }`}
                                title="High-Density Table View"
                                aria-label="Switch to Table View"
                            >
                                <ListFilter className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* Compact Search Bar & Stats */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
                    <div className="relative w-full sm:max-w-xs">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Filter by keyword or stack..."
                            className="w-full pl-9 pr-8 py-2 rounded-xl bg-dark-950/60 border border-white/10 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-primary transition-colors"
                        />
                        {searchQuery && (
                            <button 
                                onClick={() => setSearchQuery('')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-500 hover:text-white"
                            >
                                ×
                            </button>
                        )}
                    </div>

                    <div className="text-xs font-mono text-slate-400 self-start sm:self-center">
                        Showing <span className="text-white font-bold">{filteredProjects.length}</span> of {projects.length} systems
                    </div>
                </div>

                {/* Empty State */}
                {filteredProjects.length === 0 && (
                    <div className="glass-card p-12 text-center border border-white/10 my-8">
                        <Filter className="w-8 h-8 text-slate-500 mx-auto mb-3" />
                        <h4 className="text-lg font-bold text-white mb-2 font-mono">No systems match your filter</h4>
                        <p className="text-xs text-slate-400 mb-6 max-w-sm mx-auto">
                            Try clearing your search query or selecting &quot;All&quot;.
                        </p>
                        <button
                            onClick={() => {
                                setSelectedCategory('All')
                                setSearchQuery('')
                            }}
                            className="btn-primary text-xs font-mono uppercase"
                        >
                            View All Projects
                        </button>
                    </div>
                )}

                {/* View Mode: Grid View */}
                {viewMode === 'grid' && (
                    <motion.div
                        layout
                        className="grid gap-8 lg:gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredProjects.map((p) => (
                                <PortfolioCard key={p.id} project={p} />
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}

                {/* View Mode: High-Density Table View */}
                {viewMode === 'table' && (
                    <div className="glass-card overflow-x-auto border border-white/10 p-0 rounded-2xl">
                        <table className="w-full text-left text-xs font-mono border-collapse">
                            <thead>
                                <tr className="border-b border-white/10 bg-white/[0.03] text-slate-400">
                                    <th className="p-4 font-medium uppercase tracking-wider">System</th>
                                    <th className="p-4 font-medium uppercase tracking-wider">Category</th>
                                    <th className="p-4 font-medium uppercase tracking-wider">Status</th>
                                    <th className="p-4 font-medium uppercase tracking-wider">Benchmark Metric</th>
                                    <th className="p-4 font-medium uppercase tracking-wider">Tech Stack</th>
                                    <th className="p-4 font-medium uppercase tracking-wider text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {filteredProjects.map((p) => (
                                    <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                                        <td className="p-4">
                                            <div className="font-bold text-white text-sm">{p.title}</div>
                                            <div className="text-[11px] text-slate-400 max-w-xs truncate">{p.subtitle}</div>
                                        </td>
                                        <td className="p-4 text-slate-300 whitespace-nowrap">
                                            {p.category}
                                        </td>
                                        <td className="p-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] border ${
                                                p.status === 'Production'
                                                    ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                                                    : p.status === 'Active'
                                                    ? 'bg-primary/10 border-primary/20 text-primary-glow'
                                                    : 'bg-amber-500/10 border-amber-500/20 text-amber-300'
                                            }`}>
                                                <CheckCircle2 className="w-3 h-3" />
                                                <span>{p.status}</span>
                                            </span>
                                        </td>
                                        <td className="p-4 whitespace-nowrap">
                                            <div className="text-primary-glow font-bold">{p.metrics}</div>
                                            <div className="text-[10px] text-slate-500">{p.metricsSub}</div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex flex-wrap gap-1 max-w-xs">
                                                {p.tags.slice(0, 3).map((tag, idx) => (
                                                    <span key={idx} className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-slate-400 border border-white/5">
                                                        {tag}
                                                    </span>
                                                ))}
                                                {p.tags.length > 3 && (
                                                    <span className="text-[10px] text-slate-500">+{p.tags.length - 3}</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="p-4 text-right whitespace-nowrap">
                                            <a
                                                href={`#case/${p.id}`}
                                                className="inline-flex items-center gap-1 text-primary-glow hover:text-white hover:underline font-semibold"
                                            >
                                                <span>Case Study</span>
                                                <ArrowRight className="w-3.5 h-3.5" />
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </section>
    )
}

function PortfolioCard({ project }) {
    return (
        <motion.article
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.35 }}
            className="group glass-card flex flex-col justify-between overflow-hidden p-0 border border-white/10 hover:border-primary/40"
        >
            {/* Real Code Architecture Terminal */}
            <div className="p-3 sm:p-4 bg-dark-950/70 border-b border-white/5 relative">
                <CodeTerminal 
                    filename={project.filename}
                    language={project.language}
                    code={project.code}
                    maxHeight="220px"
                />

                {/* Metric Badge */}
                {project.metrics && (
                    <div className="absolute top-6 right-6 z-20 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-dark-950/90 backdrop-blur-md border border-primary/30 text-primary-glow text-xs font-mono font-semibold shadow-lg">
                        <TrendingUp className="w-3.5 h-3.5" />
                        <span>{project.metrics}</span>
                    </div>
                )}
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-7 flex flex-col justify-between flex-grow">
                <div>
                    <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-slate-500 mb-2">
                        <span>{project.category}</span>
                        <span className="flex items-center gap-1 text-slate-400">
                            <Code2 className="w-3.5 h-3.5 text-primary-glow" />
                            <span>Architecture</span>
                        </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-glow transition-colors">
                        {project.title}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed mb-6">
                        {project.description}
                    </p>
                </div>

                <div>
                    {/* Tech Pills */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                        {project.tags.map((tag, idx) => (
                            <span
                                key={idx}
                                className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/[0.04] border border-white/5 text-slate-400"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Action */}
                    <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                        <a
                            href={`#case/${project.id}`}
                            className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-primary-glow group-hover:text-white transition-colors"
                        >
                            <span>Read Full Case Study</span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>
                </div>
            </div>
        </motion.article>
    )
}
