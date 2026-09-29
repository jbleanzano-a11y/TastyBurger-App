"use client"

import { motion } from "framer-motion"

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 0.9, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full"
      />
    </div>
  )
}
