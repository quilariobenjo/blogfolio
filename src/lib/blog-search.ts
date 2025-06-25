import { getAllBlogs, type BlogPost } from "./blog"

export interface SearchResult {
  blog: BlogPost
  relevance: number
  matchType: "title" | "description" | "content" | "tags"
}

export function searchBlogs(query: string): SearchResult[] {
  if (!query || query.trim().length < 2) {
    return []
  }

  const allBlogs = getAllBlogs()
  const searchTerm = query.toLowerCase().trim()
  const results: SearchResult[] = []

  allBlogs.forEach((blog) => {
    let relevance = 0
    let matchType: SearchResult["matchType"] = "content"

    // Check title (highest priority)
    if (blog.title.toLowerCase().includes(searchTerm)) {
      relevance += 10
      matchType = "title"
    }

    // Check description (high priority)
    if (blog.description?.toLowerCase().includes(searchTerm)) {
      relevance += 7
      if (matchType === "content") matchType = "description"
    }

    // Check tags (medium priority)
    if (blog.tags?.some((tag) => tag.toLowerCase().includes(searchTerm))) {
      relevance += 5
      if (matchType === "content") matchType = "tags"
    }

    // Check content (lower priority)
    if (blog.content.toLowerCase().includes(searchTerm)) {
      relevance += 3
    }

    // Add partial word matches with lower relevance
    const words = searchTerm.split(" ")
    words.forEach((word) => {
      if (word.length > 2) {
        if (blog.title.toLowerCase().includes(word)) relevance += 2
        if (blog.description?.toLowerCase().includes(word)) relevance += 1
        if (blog.content.toLowerCase().includes(word)) relevance += 1
      }
    })

    if (relevance > 0) {
      results.push({ blog, relevance, matchType })
    }
  })

  return results.sort((a, b) => b.relevance - a.relevance)
}

export function getPopularTags(limit = 10) {
  const allBlogs = getAllBlogs()
  const tagCount: Record<string, number> = {}

  allBlogs.forEach((blog) => {
    blog.tags?.forEach((tag) => {
      tagCount[tag] = (tagCount[tag] || 0) + 1
    })
  })

  return Object.entries(tagCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, limit)
    .map(([tag, count]) => ({ tag, count }))
}
