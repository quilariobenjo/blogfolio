import { siteConfig } from "@/config/site"

export function generateOGImageUrl({
  title,
  date,
  type = "Blog",
}: {
  title: string
  date: string
  type?: "Blog" | "Project"
}) {
  const baseUrl = siteConfig.url || "http://localhost:3000"
  const params = new URLSearchParams({
    title: title.slice(0, 100), // Limit title length
    date: new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    type,
  })

  return `${baseUrl}/api/og?${params.toString()}`
}
