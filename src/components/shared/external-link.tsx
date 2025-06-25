"use client"

import { ExternalLink } from "lucide-react"
import Link from "next/link"
import { env } from "@/env.mjs"

export const ExternalLinkButton = ({
  href,
  label,
}: {
  href: string | null
  label: string
}) => {
  if (!href) return null

  return (
    <Link
      href={`https://${env.NEXT_PUBLIC_APP_URL}projects/${label}`}
      className="text-foreground/80 hover:text-foreground focus:text-foreground focus:ring-ring mt-2 flex items-center gap-1 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
      aria-label={label}
    >
      <ExternalLink className="h-4 w-4" />
      <span className="truncate text-sm">{label}</span>
    </Link>
  )
}

export const FloatingAction = ({
  url,
  label,
}: {
  url: string
  label: string
}) => (
  <Link
    href={url}
    className="absolute right-0 top-0 z-50 flex h-8 w-8 -translate-y-1/4 items-center justify-center rounded-full opacity-0 transition-all group-hover:-translate-y-1/3 group-hover:opacity-100"
    aria-label={label}
  >
    <span className="bg-foreground text-primary-foreground hover:bg-foreground/90 focus:bg-foreground/90 focus:ring-ring h-8 rounded-full p-2 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2">
      <ExternalLink className="h-4 w-4" />
    </span>
  </Link>
)
