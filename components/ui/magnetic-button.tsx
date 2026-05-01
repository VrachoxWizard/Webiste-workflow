"use client"

import * as React from "react"
import { motion, useMotionValue, useSpring, useTransform } from "motion/react"

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  distance?: number
}

export function MagneticButton({ children, className, distance = 0.5 }: MagneticButtonProps) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e
    const { left, top, width, height } = currentTarget.getBoundingClientRect()
    const centerX = left + width / 2
    const centerY = top + height / 2
    
    mouseX.set((clientX - centerX) * distance)
    mouseY.set((clientY - centerY) * distance)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
