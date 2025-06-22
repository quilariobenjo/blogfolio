import { notFound } from "next/navigation"
import { Calendar, Clock, User, Tag } from "lucide-react"
import { relativeDate } from "@/lib/date"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import {
  getAllProjects,
  getAllProjectSlugs,
  getProjectById,
} from "@/lib/projects"
import { siteConfig } from "@/config/site"
import { CustomMDX } from "@/components/mdx-content"

interface ProjectProps {
  params: Promise<{
    id: string
  }>
}

export async function generateStaticParams() {
  const slugs = getAllProjectSlugs()
  return slugs.map((slug) => ({
    id: slug,
  }))
}

export default async function ProjectPage({ params }: ProjectProps) {
  const { id } = await params

  console.log(id)

  if (!id) {
    notFound()
  }

  const projects = getAllProjects()

  console.log(projects)

  const project = getProjectById(id)

  console.log(project)

  if (!project) {
    notFound()
  }

  // const breadcrumbItems = [
  //   {
  //     name: "Home",
  //     item: siteConfig.url,
  //   },
  //   {
  //     name: "Blog",
  //     item: `${siteConfig.url}/blog`,
  //   },
  //   {
  //     name: blog.title,
  //     item: `${siteConfig.url}/blog/${blog.slugAsParams}`,
  //   },
  // ]

  return (
    <div className="container mx-auto">
      {/* <BlogPostJsonLd
        title={blog.title}
        description={blog.description || ""}
        datePublished={blog.date}
        url={`${siteConfig.url}/blog/${blog.slugAsParams}`}
        keywords={blog.tags || []}
      />
      <BreadcrumbJsonLd items={breadcrumbItems} /> */}

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
            {project.title}
          </h1>

          {project.description && (
            <p className="text-muted-foreground mb-6 text-xl leading-relaxed">
              {project.description}
            </p>
          )}

          <div className="text-muted-foreground flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <time dateTime={project.date}>{relativeDate(project.date)}</time>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{project.readingTime.text}</span>
            </div>

            {project.author && (
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>By {project.author}</span>
              </div>
            )}
          </div>

          {project.tags && project.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              <Tag className="text-muted-foreground h-4 w-4" />
              {project.tags.map((tag) => (
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
          <CustomMDX source={project.content} />
        </div>

        {/* <RelatedPosts posts={relatedPosts} /> */}
      </article>
    </div>
  )
}
