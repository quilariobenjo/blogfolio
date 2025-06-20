import fs from "fs"
import path from "path"
import matter from "gray-matter"

export interface BlogPost {
  id: string
  slug: string
  title: string
  description: string
  date: string
  content: string
  [key: string]: any
}

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
        content,
        ...data,
      } as BlogPost
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return blogs
}
