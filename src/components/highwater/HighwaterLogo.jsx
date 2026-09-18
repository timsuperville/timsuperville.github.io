import React from 'react'

// ─── Highwater Logo Mark (Official Mountain & Wave Emblem) ────────────────────
export function HighwaterLogo({ className = "w-10 h-10", alt = "Highwater Counselling Company Logo" }) {
  return (
    <img 
      src="/images/highwater-logo.png" 
      alt={alt} 
      className={`object-contain select-none shrink-0 ${className}`}
      loading="eager"
      decoding="async"
    />
  )
}

export default HighwaterLogo

