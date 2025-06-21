import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import BlogItem from "@/components/shared/blog-item"
import { getBlogsByTag, getAllTags } from "@/lib/blog-tags"

interface TagPageProps {
  params: Promise<{
    tag: string
  }>
}

export async function generateStaticParams() {
  const tags = getAllTags()
  return tags.map((tag) => ({
    tag: tag.slug,
  }))
}

export async function generateMetadata({
  params,
}: TagPageProps): Promise<Metadata | undefined> {
  const { tag } = await params
  const blogs = getBlogsByTag(tag)

  if (blogs.length === 0) {
    return
  }

  const tagName = tag
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase())

  return {
    title: `Posts tagged "${tagName}"`,
    description: `All blog posts tagged with ${tagName}. ${blogs.length} posts found.`,
  }
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params
  const blogs = getBlogsByTag(tag)

  if (blogs.length === 0) {
    notFound()
  }

  const tagName = tag
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase())

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <Link
        href="/blog"
        className="text-muted-foreground hover:text-foreground mb-6 flex items-center space-x-2 py-2 text-sm transition hover:underline hover:underline-offset-2"
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        Back to blogs
      </Link>

      <header className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Posts tagged "{tagName}"</h1>
        <p className="text-muted-foreground">
          {blogs.length} {blogs.length === 1 ? "post" : "posts"} found
        </p>
      </header>

      <div className="space-y-4">
        {blogs.map((blog) => (
          <BlogItem key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  )
}
