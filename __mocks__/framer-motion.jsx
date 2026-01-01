import React, { forwardRef } from 'react'

const motion = new Proxy({}, {
    get: (target, prop) => {
        // eslint-disable-next-line react/display-name
        return forwardRef(({ children, ...props }, ref) => {
            // Strip framer-motion specific props to avoid React warnings
            // eslint-disable-next-line no-unused-vars
            const {
                initial, animate, transition, whileInView, viewport, variants,
                exit, custom, onAnimationStart, onAnimationComplete, onLayoutAnimationStart, onLayoutAnimationComplete,
                ...validProps
            } = props

            return React.createElement(prop, { ...validProps, ref }, children)
        })
    }
})

export { motion }
export const AnimatePresence = ({ children }) => <>{children}</>
