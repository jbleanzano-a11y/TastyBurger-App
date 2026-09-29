import type React from "react"

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
}

export default function Link({ href, onClick, children, ...props }: LinkProps) {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(event)
    if (event.defaultPrevented || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:") || href === "#") return
    if (href.startsWith("/#")) return
    event.preventDefault()
    window.history.pushState({}, "", href)
    window.dispatchEvent(new PopStateEvent("popstate"))
  }
  return <a href={href} onClick={handleClick} {...props}>{children}</a>
}
