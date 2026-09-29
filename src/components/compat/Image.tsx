import type React from "react"

export interface CompatImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fill?: boolean
  priority?: boolean
}

export default function Image({ fill, priority: _priority, className = "", style, ...props }: CompatImageProps) {
  return (
    <img
      {...props}
      className={`${fill ? "absolute inset-0 w-full h-full" : ""} ${className}`}
      style={fill ? { objectFit: "cover", ...style } : style}
    />
  )
}
