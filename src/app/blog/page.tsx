import type { Metadata } from "next"
import { TypographyH3 } from "@/components/typography"
import BlogItem from "@/components/shared/blog-item"
import { BlogSearch } from "@/components/shared/blog-search"
import { getAllBlogs } from "@/lib/blog"
import { getAllTags } from "@/lib/blog-tags"
import { BlogJsonLd, BreadcrumbJsonLd } from "@/components/structured-data"
import { siteConfig } from "@/config/site"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Read my thoughts on software development, design, and more. Explore articles about React, Next.js, TypeScript, and modern web development.",
  keywords: [
    "blog",
    "articles",
    "web development",
    "software development",
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "programming",
    "tutorials",
    "tech blog",
  ],
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog - Benjo M. Quilario",
    description: "Read my thoughts on software development, design, and more.",
    url: `${process.env.NEXT_PUBLIC_APP_URL || "https://benjoquilario.me"}/blog`,
  },
}

export default function BlogsPage() {
  const allBlogs = getAllBlogs()
  const allTags = getAllTags()

  const breadcrumbItems = [
    {
      name: "Home",
      item: siteConfig.url,
    },
    {
      name: "Blog",
      item: `${siteConfig.url}/blog`,
    },
  ]

  return (
    <div className="container">
      <BlogJsonLd />
      <BreadcrumbJsonLd items={breadcrumbItems} />

      <header className="mb-8">
        <TypographyH3 className="mb-2 text-3xl font-bold">
          <span className="text-4xl">B</span>log
        </TypographyH3>
        <p className="text-muted-foreground mb-6">
          Explore various software development articles, tutorials, and
          insights.
        </p>

        {/* Search */}
        {/* <div className="mb-6">
          <BlogSearch className="max-w-md" />
        </div> */}

        {/* Popular Tags */}
        {allTags.length > 0 && (
          <div className="mb-6">
            <h3 className="text-muted-foreground mb-3 text-sm font-medium">
              Popular Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {allTags.slice(0, 8).map((tag) => (
                <Link
                  key={tag.slug}
                  href={`/blog/tag/${tag.slug}`}
                  className="bg-muted hover:bg-muted/80 rounded-full px-3 py-1 text-xs font-medium transition-colors"
                >
                  {tag.name} ({tag.count})
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      {allBlogs.length === 0 ? (
        <div className="text-muted-foreground py-12 text-center">
          <p>No blog posts found. Check back later for new content!</p>
        </div>
      ) : (
        <div className="space-y-4">
          <ul>
            {allBlogs.map((blog) => (
              <BlogItem key={blog.id} blog={blog} />
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
