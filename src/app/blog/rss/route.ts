import { getAllBlogs } from "@/lib/blog"
import { siteConfig } from "@/config/site"
import { env } from "@/env.mjs"

export async function GET() {
  const allBlogs = getAllBlogs()

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${siteConfig.name} Blog</title>
    <description>${siteConfig.description}</description>
    <link>${env.NEXT_PUBLIC_APP_URL}/blog</link>
    <atom:link href="${env.NEXT_PUBLIC_APP_URL}/blog/rss" rel="self" type="application/rss+xml" />
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${allBlogs
      .slice(0, 20) // Limit to 20 most recent posts
      .map(
        (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.description || ""}]]></description>
      <link>${env.NEXT_PUBLIC_APP_URL}/blog/${post.slug}</link>
      <guid isPermaLink="true">${env.NEXT_PUBLIC_APP_URL}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      ${post.author ? `<author>${post.author}</author>` : ""}
      ${post.tags ? post.tags.map((tag) => `<category>${tag}</category>`).join("") : ""}
    </item>`
      )
      .join("")}
  </channel>
</rss>`

  return new Response(rssXml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  })
}
