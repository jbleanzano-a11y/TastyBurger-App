"use client"

import { useEffect } from "react"
import { usePathname } from "@/components/compat/navigation"

export default function RouteScrollHandler() {
  const pathname = usePathname()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [pathname])

  return null
}
