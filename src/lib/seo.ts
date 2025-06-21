import { Metadata } from "next"

interface SEOProps {
  title: string
  description: string
  keywords?: string[]
  canonical?: string
  image?: string
  type?: "website" | "article"
  publishedTime?: string
  authors?: string[]
}

export function generateSEOMetadata({
  title,
  description,
  keywords = [],
  canonical,
  image = "/og.jpeg",
  type = "website",
  publishedTime,
  authors = ["Benjo M. Quilario"],
}: SEOProps): Metadata {
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://benjoquilario.me"

  return {
    title,
    description,
    keywords:
      keywords.length > 0
        ? keywords
        : [
            "web development",
            "frontend developer",
            "react",
            "nextjs",
            "typescript",
          ],
    authors: authors.map((name) => ({ name, url: siteUrl })),
    alternates: {
      canonical: canonical ? `${siteUrl}${canonical}` : undefined,
    },
    openGraph: {
      title,
      description,
      type,
      url: canonical ? `${siteUrl}${canonical}` : siteUrl,
      images: [
        {
          url: `${siteUrl}${image}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      publishedTime,
      authors: type === "article" ? authors : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${siteUrl}${image}`],
    },
  }
}

export const defaultSEO: Partial<SEOProps> = {
  keywords: [
    "Benjo Quilario",
    "Frontend Developer",
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Web Development",
    "Portfolio",
    "Blog",
    "Software Engineer",
    "Philippines",
    "TailwindCSS",
    "Full Stack Developer",
  ],
}
