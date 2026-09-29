"use client"

import { motion } from "framer-motion"
import type React from "react"

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
}

export default function Card({ children, className = "", hover = true }: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -8 } : undefined}
      className={`bg-surface rounded-xl shadow-md hover:shadow-xl transition-shadow ${className}`}
    >
      {children}
    </motion.div>
  )
}
