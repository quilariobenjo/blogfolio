import { notFound } from "next/navigation"
import { Calendar, Clock, User, Tag } from "lucide-react"
import { relativeDate } from "@/lib/date"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import {
  getAllProjects,
  getAllProjectSlugs,
  getProjectBySlug,
} from "@/lib/projects"
import { siteConfig } from "@/config/site"
import { CustomMDX } from "@/components/mdx-content"
import { BlogPostJsonLd, BreadcrumbJsonLd } from "@/components/structured-data"

interface ProjectProps {
  params: Promise<{
    slug: string[]
  }>
}

export async function generateStaticParams() {
  const slugs = getAllProjectSlugs()
  return slugs.map((slug) => ({
    id: [slug],
  }))
}

export default async function ProjectPage({ params }: ProjectProps) {
  const { slug } = await params

  const projectSlug = slug?.[0]

  if (!projectSlug) {
    notFound()
  }

  const project = getProjectBySlug(projectSlug)

  if (!project) {
    notFound()
  }

  const breadcrumbItems = [
    {
      name: "Home",
      item: siteConfig.url,
    },
    {
      name: "Projects",
      item: `${siteConfig.url}/projects`,
    },
    {
      name: project.title,
      item: `${siteConfig.url}/blog/${project.slugAsParams}`,
    },
  ]

  return (
    <div className="container mx-auto">
      <BlogPostJsonLd
        title={project.title}
        description={project.description || ""}
        datePublished={project.date}
        url={`${siteConfig.url}/blog/${project.slugAsParams}`}
        keywords={project.tags || []}
      />
      <BreadcrumbJsonLd items={breadcrumbItems} />

      <article className="max-w-none break-words">
        <Link
          href="/projects"
          className="text-muted-foreground hover:text-foreground mb-6 flex items-center space-x-2 py-2 text-sm transition hover:underline hover:underline-offset-2"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to projects
        </Link>

        <header className="mb-8">
          <h1 className="mb-4 text-xl font-bold tracking-tight lg:text-3xl">
            {project.title}
          </h1>

          {project.description && (
            <p className="text-muted-foreground mb-6 text-base leading-relaxed md:text-lg">
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

          {/* {project.tags && project.tags.length > 0 && (
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
          )} */}
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
