import React, { useState } from 'react'
import { Copy, Check, Terminal } from 'lucide-react'

export default function CodeTerminal({ filename, language = 'TypeScript', code, maxHeight = '260px' }) {
    const [copied, setCopied] = useState(false)

    const handleCopy = (e) => {
        e.preventDefault()
        e.stopPropagation()
        navigator.clipboard.writeText(code)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const lines = code.trim().split('\n')

    return (
        <div className="rounded-xl overflow-hidden border border-white/10 bg-dark-950/90 shadow-2xl font-mono text-xs flex flex-col text-left">
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-white/[0.03] border-b border-white/10 select-none">
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
                    </div>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1.5 ml-2 font-medium">
                        <Terminal className="w-3.5 h-3.5 text-primary-glow" />
                        {filename}
                    </span>
                </div>

                <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 px-2 py-0.5 rounded bg-white/5 border border-white/5">
                        {language}
                    </span>
                    <button
                        onClick={handleCopy}
                        className="text-slate-400 hover:text-white transition-colors p-1 rounded hover:bg-white/10"
                        title="Copy code"
                        aria-label="Copy code snippet"
                    >
                        {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                </div>
            </div>

            {/* Code Lines Body */}
            <div 
                className="p-4 overflow-x-auto overflow-y-auto leading-relaxed text-[11px] sm:text-xs"
                style={{ maxHeight }}
            >
                <table className="w-full border-collapse">
                    <tbody>
                        {lines.map((line, idx) => (
                            <tr key={idx} className="hover:bg-white/[0.02]">
                                <td className="pr-4 text-slate-600 select-none text-right w-6 align-top font-mono">
                                    {idx + 1}
                                </td>
                                <td className="text-slate-300 font-mono whitespace-pre">
                                    <SyntaxHighlight line={line} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

function SyntaxHighlight({ line }) {
    // Basic resilient token highlighter
    if (line.trim().startsWith('//')) {
        return <span className="text-slate-500 italic">{line}</span>
    }
    if (line.trim().startsWith('import') || line.trim().startsWith('export')) {
        return <span className="text-secondary-glow font-medium">{line}</span>
    }
    if (line.includes('async function') || line.includes('function ') || line.includes('const ') || line.includes('let ')) {
        const parts = line.split(/(async function|function|const|let|return|await|if)/g)
        return (
            <span>
                {parts.map((part, i) => {
                    if (['async function', 'function', 'const', 'let', 'return', 'await', 'if'].includes(part)) {
                        return <span key={i} className="text-primary-glow font-semibold">{part}</span>
                    }
                    if (part.includes('"') || part.includes("'") || part.includes('`')) {
                        return <span key={i} className="text-amber-300">{part}</span>
                    }
                    return <span key={i}>{part}</span>
                })}
            </span>
        )
    }
    if (line.includes('"') || line.includes("'")) {
        return <span className="text-amber-300/90">{line}</span>
    }
    return <span>{line}</span>
}
