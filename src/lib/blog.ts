import fs from "fs"
import path from "path"
import matter from "gray-matter"

import { calculateReadingTime } from "./utils"
export interface ReadingTime {
  text: string
  minutes: number
  time: number
  words: number
}

export interface BlogPost {
  id: string
  slug: string
  slugAsParams: string
  title: string
  description: string
  date: string
  content: string
  body: string
  readingTime: ReadingTime
  tags?: string[]
  author?: string
  published?: boolean
  [key: string]: any
}

// Calculate reading time for blog content

export function getAllBlogs(): BlogPost[] {
  // This function should only run on the server
  if (typeof window !== "undefined") {
    return []
  }

  const blogDirectory = path.join(process.cwd(), "src/content/blog")

  if (!fs.existsSync(blogDirectory)) {
    return []
  }

  const filenames = fs.readdirSync(blogDirectory)
  const blogs = filenames
    .filter((name) => name.endsWith(".mdx") || name.endsWith(".md"))
    .map((name) => {
      const filePath = path.join(blogDirectory, name)
      const fileContents = fs.readFileSync(filePath, "utf8")
      const { data, content } = matter(fileContents)
      const slug = name.replace(/\.(mdx|md)$/, "")

      return {
        id: slug,
        slug,
        slugAsParams: slug,
        content,
        body: content, // Keep raw content for processing
        readingTime: calculateReadingTime(content),
        published: data.published ?? true, // Default to published
        ...data,
      } as BlogPost
    })
    .filter((blog) => blog.published) // Only return published blogs
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return blogs
}

export function getBlogBySlug(slug: string): BlogPost | null {
  const allBlogs = getAllBlogs()
  return allBlogs.find((blog) => blog.slug === slug) || null
}

export function getAllBlogSlugs(): string[] {
  const allBlogs = getAllBlogs()
  return allBlogs.map((blog) => blog.slug)
}
