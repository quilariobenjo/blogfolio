import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { cache } from "react"

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

// Cache for blog data to avoid repeated file system operations
let blogCache: BlogPost[] | null = null
let cacheTimestamp: number = 0
const CACHE_DURATION = 1000 * 60 * 5 // 5 minutes in development, longer in production

// Cached version of getAllBlogs to minimize main-thread work
export const getAllBlogs = cache((): BlogPost[] => {
  // This function should only run on the server
  if (typeof window !== "undefined") {
    return []
  }

  const now = Date.now()
  
  // Return cached data if it's still valid
  if (blogCache && (now - cacheTimestamp) < CACHE_DURATION) {
    return blogCache
  }

  const blogDirectory = path.join(process.cwd(), "src/content/blog")

  if (!fs.existsSync(blogDirectory)) {
    return []
  }

  try {
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

    // Update cache
    blogCache = blogs
    cacheTimestamp = now
    
    return blogs
  } catch (error) {
    console.error("Error reading blog files:", error)
    return []
  }
})

export function getBlogBySlug(slug: string): BlogPost | null {
  const allBlogs = getAllBlogs()
  return allBlogs.find((blog) => blog.slug === slug) || null
}

export function getAllBlogSlugs(): string[] {
  const allBlogs = getAllBlogs()
  return allBlogs.map((blog) => blog.slug)
}
