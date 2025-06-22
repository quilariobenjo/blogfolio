import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { type BlogPost } from "./blog"
import { calculateReadingTime } from "./utils"

export function getAllProjects(): BlogPost[] {
  // This function should only run on the server
  if (typeof window !== "undefined") {
    return []
  }

  const projectDirectory = path.join(process.cwd(), "src/content/projects")

  if (!fs.existsSync(projectDirectory)) {
    return []
  }

  const filenames = fs.readdirSync(projectDirectory)
  const projects = filenames
    .filter((name) => name.endsWith(".mdx") || name.endsWith(".md"))
    .map((name) => {
      const filePath = path.join(projectDirectory, name)
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

  return projects
}

export function getProjectById(id: string): BlogPost | null {
  const allProjects = getAllProjects()
  return allProjects.find((project) => project.id === id) || null
}

export function getAllProjectSlugs(): string[] {
  const allProjects = getAllProjects()
  return allProjects.map((project) => project.slug)
}
