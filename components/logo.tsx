"use client"

import { Shield } from "lucide-react"
import Link from "next/link"

export function Logo({ size = "default" }: { size?: "sm" | "default" | "lg" }) {
  const sizes = {
    sm: { icon: 20, text: "text-lg" },
    default: { icon: 28, text: "text-2xl" },
    lg: { icon: 36, text: "text-3xl" },
  }

  const { icon, text } = sizes[size]

  return (
    <Link href="/" className="flex items-center gap-2 group">
      <div className="relative">
        <Shield 
          size={icon} 
          className="text-primary transition-all duration-300 group-hover:scale-110" 
          strokeWidth={2}
        />
        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <span className={`${text} font-bold tracking-tight`}>
        <span className="text-primary">Cyber</span>
        <span className="text-foreground">Sync</span>
      </span>
    </Link>
  )
}
