import type { Metadata } from "next"
import { CustomMDX } from "@/components/mdx-content"
import { RelatedPosts } from "@/components/shared/related-posts"
import { BlogPostJsonLd, BreadcrumbJsonLd } from "@/components/structured-data"
import { notFound } from "next/navigation"
import { Calendar, Clock, User, Tag } from "lucide-react"
import { relativeDate } from "@/lib/date"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { siteConfig } from "@/config/site"
import { env } from "@/env.mjs"
import { getAllBlogs, getBlogBySlug, getAllBlogSlugs } from "@/lib/blog"
import { getRelatedBlogs } from "@/lib/blog-tags"
import remarkGfm from "remark-gfm"

interface BlogProps {
  params: Promise<{
    slug: string[]
  }>
}

export async function generateStaticParams() {
  const slugs = getAllBlogSlugs()
  return slugs.map((slug) => ({
    slug: [slug],
  }))
}

export async function generateMetadata({
  params,
}: BlogProps): Promise<Metadata | undefined> {
  const { slug } = await params
  const blogSlug = slug?.[0]

  if (!blogSlug) {
    return
  }

  const blog = getBlogBySlug(blogSlug)

  if (!blog) {
    return
  }

  const {
    title,
    date: publishedTime,
    description,
    slugAsParams,
    tags = [],
  } = blog

  return {
    title,
    description,
    keywords:
      tags.length > 0
        ? tags
        : [
            "web development",
            "programming",
            "tutorial",
            "javascript",
            "react",
            "nextjs",
          ],
    authors: [
      {
        name: siteConfig.name,
        url: siteConfig.url,
      },
    ],
    alternates: {
      canonical: `/blog/${slugAsParams}`,
    },
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      authors: [siteConfig.name],
      url: `${env.NEXT_PUBLIC_APP_URL}/blog/${slugAsParams}`,
      images: [
        {
          url: `${env.NEXT_PUBLIC_APP_URL}/og.jpeg`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${env.NEXT_PUBLIC_APP_URL}/og.jpeg`],
    },
    publisher: `${siteConfig.name}`,
  }
}

export default async function ArticlePage({ params }: BlogProps) {
  const { slug } = await params
  const blogSlug = slug?.[0]

  if (!blogSlug) {
    notFound()
  }

  const blog = getBlogBySlug(blogSlug)

  if (!blog) {
    notFound()
  }

  const relatedPosts = getRelatedBlogs(blog, 3)

  const breadcrumbItems = [
    {
      name: "Home",
      item: siteConfig.url,
    },
    {
      name: "Blog",
      item: `${siteConfig.url}/blog`,
    },
    {
      name: blog.title,
      item: `${siteConfig.url}/blog/${blog.slugAsParams}`,
    },
  ]

  return (
    <div className="container mx-auto">
      <BlogPostJsonLd
        title={blog.title}
        description={blog.description || ""}
        datePublished={blog.date}
        url={`${siteConfig.url}/blog/${blog.slugAsParams}`}
        keywords={blog.tags || []}
      />
      <BreadcrumbJsonLd items={breadcrumbItems} />

      <article className="max-w-none break-words">
        <Link
          href="/blog"
          className="text-muted-foreground hover:text-foreground mb-6 flex items-center space-x-2 py-2 text-sm transition hover:underline hover:underline-offset-2"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to blogs
        </Link>

        <header className="mb-8">
          <h1 className="mb-4 text-4xl font-bold tracking-tight lg:text-5xl">
            {blog.title}
          </h1>

          {blog.description && (
            <p className="text-muted-foreground mb-6 text-xl leading-relaxed">
              {blog.description}
            </p>
          )}

          <div className="text-muted-foreground flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <time dateTime={blog.date}>{relativeDate(blog.date)}</time>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{blog.readingTime.text}</span>
            </div>

            {blog.author && (
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>By {blog.author}</span>
              </div>
            )}
          </div>

          {blog.tags && blog.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              <Tag className="text-muted-foreground h-4 w-4" />
              {blog.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, "-")}`}
                  className="bg-muted hover:bg-muted/80 rounded-full px-3 py-1 text-xs font-medium transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}
        </header>

        <hr className="mb-8" />

        <div className="prose prose-gray dark:prose-invert">
          <CustomMDX source={blog.content} />
        </div>

        <RelatedPosts posts={relatedPosts} />
      </article>
    </div>
  )
}
