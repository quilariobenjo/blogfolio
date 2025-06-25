import { siteConfig } from "@/config/site"
import type { Metadata } from "next"

interface LayoutProps {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: "About",
  description:
    "About Benjo M. Quilario - A passionate 23-year-old Frontend Developer from the Philippines specializing in React, Next.js, and modern web development.",
  keywords: [
    "about",
    "benjo quilario",
    "frontend developer",
    "philippines",
    "react developer",
    "nextjs developer",
    "web developer",
    "software engineer",
  ],
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About - Benjo M. Quilario",
    description:
      "Learn more about Benjo M. Quilario, a Frontend Developer from the Philippines.",
    url: `${siteConfig.url}/about`,
  },
}

export default function layout({ children }: LayoutProps) {
  return <>{children}</>
}
