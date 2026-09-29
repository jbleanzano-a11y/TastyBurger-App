"use client"

import { motion } from "framer-motion"
import type React from "react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary"
  children: React.ReactNode
}

export default function Button({ variant = "primary", children, className = "", ...props }: ButtonProps) {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-300 active:scale-95 ${className}`}
        {...props}
      >
        {children}
      </motion.button>
    )
  }

  const isPrimary = variant === "primary"
  const isDark = theme === "dark"

  // Primary button styles
  const primaryStyles = isDark
    ? {
        backgroundColor: "#ffd700",
        color: "#000000",
      }
    : {
        backgroundColor: "#d0d0d0",
        color: "#000000",
      }

  // Secondary button styles
  const secondaryStyles = {
    backgroundColor: "#ffffff",
    color: "#000000",
    border: isDark ? "1px solid #ffffff" : "1px solid #d0d0d0",
  }

  const buttonStyles = isPrimary ? primaryStyles : secondaryStyles

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={buttonStyles}
      className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-300 active:scale-95 hover:shadow-lg ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  )
}
