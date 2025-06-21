import Link from "next/link"
import { Calendar, Clock } from "lucide-react"
import { relativeDate } from "@/lib/date"
import { type BlogPost } from "@/lib/blog"

interface RelatedPostsProps {
  posts: BlogPost[]
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) {
    return null
  }

  return (
    <section className="mt-12 border-t pt-8">
      <h2 className="mb-6 text-2xl font-bold">Related Posts</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <article key={post.slug} className="group">
            <Link href={`/blog/${post.slug}`} className="block">
              <div className="hover:bg-accent rounded-lg border p-4 transition-colors">
                <h3 className="group-hover:text-primary mb-2 line-clamp-2 font-semibold">
                  {post.title}
                </h3>
                <p className="text-muted-foreground mb-3 line-clamp-2 text-sm">
                  {post.description}
                </p>
                <div className="text-muted-foreground flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {relativeDate(post.date)}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {post.readingTime.text}
                  </div>
                </div>
                {post.tags && post.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="bg-muted rounded px-2 py-1 text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                    {post.tags.length > 2 && (
                      <span className="bg-muted rounded px-2 py-1 text-xs">
                        +{post.tags.length - 2}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  )
}
