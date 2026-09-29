"use client"

import { motion } from "framer-motion"

interface SectionHeaderProps {
  subtitle?: string
  title: string
  description?: string
  centered?: boolean
  className?: string
}

export default function SectionHeader({
  subtitle,
  title,
  description,
  centered = true,
  className = "",
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true }}
      className={`${centered ? "text-center" : "text-left"} ${className}`}
    >
      {subtitle && (
        <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
          {subtitle}
        </p>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-gray-100 mb-2">
        {title}
      </h2>
      {description && (
        <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto mb-6">
          {description}
        </p>
      )}
    </motion.div>
  )
}
