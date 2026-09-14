/* eslint-disable react-refresh/only-export-components */
import React, { forwardRef } from 'react'

const motionKeys = new Set([
  'initial', 'animate', 'transition', 'whileInView', 'whileHover', 'whileTap',
  'viewport', 'variants', 'exit', 'custom', 'onAnimationStart', 'onAnimationComplete',
  'onLayoutAnimationStart', 'onLayoutAnimationComplete', 'layout'
])

const motion = new Proxy({}, {
  get: (_target, prop) => {
    return forwardRef(function MotionComponent({ children, ...props }, ref) {
      const validProps = {}
      for (const [key, value] of Object.entries(props)) {
        if (!motionKeys.has(key)) {
          validProps[key] = value
        }
      }
      return React.createElement(prop, { ...validProps, ref }, children)
    })
  }
})

export { motion }
export const AnimatePresence = ({ children }) => <>{children}</>
