import { getAllBlogs, type BlogPost } from "./blog"

export interface TagWithCount {
  name: string
  count: number
  slug: string
}

export function getAllTags(): TagWithCount[] {
  const allBlogs = getAllBlogs()
  const tagCounts: Record<string, number> = {}

  allBlogs.forEach((blog) => {
    if (blog.tags) {
      blog.tags.forEach((tag) => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1
      })
    }
  })

  return Object.entries(tagCounts)
    .map(([name, count]) => ({
      name,
      count,
      slug: name.toLowerCase().replace(/\s+/g, "-"),
    }))
    .sort((a, b) => b.count - a.count)
}

export function getBlogsByTag(tag: string): BlogPost[] {
  const allBlogs = getAllBlogs()
  return allBlogs.filter((blog) =>
    blog.tags?.some((t) => t.toLowerCase() === tag.toLowerCase())
  )
}

export function getRelatedBlogs(currentBlog: BlogPost, limit = 3): BlogPost[] {
  const allBlogs = getAllBlogs()

  if (!currentBlog.tags || currentBlog.tags.length === 0) {
    return allBlogs
      .filter((blog) => blog.slug !== currentBlog.slug)
      .slice(0, limit)
  }

  const related = allBlogs
    .filter((blog) => blog.slug !== currentBlog.slug)
    .map((blog) => {
      const commonTags =
        blog.tags?.filter((tag) => currentBlog.tags?.includes(tag)) || []
      return {
        blog,
        relevance: commonTags.length,
      }
    })
    .filter((item) => item.relevance > 0)
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, limit)
    .map((item) => item.blog)

  // If we don't have enough related posts, fill with recent posts
  if (related.length < limit) {
    const remainingSlots = limit - related.length
    const recentPosts = allBlogs
      .filter(
        (blog) =>
          blog.slug !== currentBlog.slug &&
          !related.some((relatedBlog) => relatedBlog.slug === blog.slug)
      )
      .slice(0, remainingSlots)

    return [...related, ...recentPosts]
  }

  return related
}
