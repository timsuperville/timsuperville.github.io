import React, { useEffect, useState } from 'react'

export default function EventDebug(){
  const [calls, setCalls] = useState(() => window.__analyticsCalls || [])

  useEffect(() => {
    const int = setInterval(() => {
      setCalls(window.__analyticsCalls || [])
    }, 800)
    return () => clearInterval(int)
  }, [])

  if (!import.meta.env.DEV) return null

  return (
    <div style={{position:'fixed', right:12, bottom:12, zIndex:9999, width:360, maxHeight:'50vh', overflow:'auto', background:'#fff', border:'1px solid #eee', borderRadius:8, boxShadow:'0 6px 18px rgba(0,0,0,0.08)', fontSize:12}}>
      <div style={{padding:8, borderBottom:'1px solid #eee', fontWeight:700}}>Analytics Debug</div>
      <div style={{padding:8}}>
        {calls.length === 0 && <div style={{color:'#666'}}>No events yet</div>}
        {calls.map((c,i) => (
          <div key={i} style={{padding:'6px 0', borderBottom:'1px dashed #f0f0f0'}}>
            <div><strong>{c.name}</strong> <span style={{color:'#666', fontSize:11}}>— {new Date(c.ts).toLocaleTimeString()}</span></div>
            <pre style={{whiteSpace:'pre-wrap', margin:0}}>{JSON.stringify(c.props)}</pre>
          </div>
        ))}
      </div>
    </div>
  )
}
