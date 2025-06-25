import { type MetadataRoute } from "next"

import { siteConfig } from "@/config/site"
import { getAllBlogs } from "@/lib/blog"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allBlogs = getAllBlogs()

  const blogs = allBlogs.map((blog) => ({
    url: `${siteConfig.url}/blog/${blog.slug}`,
    lastModified: new Date(blog.date),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }))

  const routes = [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    ...siteConfig.mainNav.map(({ href }) => ({
      url: `${siteConfig.url}${href}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...siteConfig.otherNav.map(({ href }) => ({
      url: `${siteConfig.url}${href}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ]

  return [...routes, ...blogs]
}
