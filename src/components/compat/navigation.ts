import { useCallback, useEffect, useState } from "react"

export function usePathname() {
  const [pathname, setPathname] = useState(() => window.location.pathname)
  useEffect(() => {
    const update = () => setPathname(window.location.pathname)
    window.addEventListener("popstate", update)
    return () => window.removeEventListener("popstate", update)
  }, [])
  return pathname
}

export function useRouter() {
  const push = useCallback((path: string) => {
    window.history.pushState({}, "", path)
    window.dispatchEvent(new PopStateEvent("popstate"))
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])
  return { push }
}
