import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Benjo M. Quilario. Contact information and social media links for collaboration and networking opportunities.",
  keywords: [
    "contact",
    "get in touch",
    "collaboration",
    "hire developer",
    "freelance",
    "networking",
    "email",
    "social media",
  ],
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact - Benjo M. Quilario",
    description:
      "Get in touch with Benjo M. Quilario for collaboration opportunities.",
    url: `${process.env.NEXT_PUBLIC_APP_URL || "https://benjoquilario.me"}/contact`,
  },
}

interface LayoutProps {
  children: React.ReactNode
}

export default function layout({ children }: LayoutProps) {
  return <div>{children}</div>
}
