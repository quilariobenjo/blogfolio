import BlogItem from "@/components/shared/blog-item"
import { TypographyH2 } from "@/components/typography"
import { getAllBlogs } from "@/lib/blog"

export default function Blogs() {
  const allBlogs = getAllBlogs()

  return (
    <section className="mb-12 flex flex-col items-start justify-start">
      <TypographyH2>
        <span className="text-4xl">L</span>
        atest Posts
      </TypographyH2>
      <ul className="mt-6 w-full">
        {allBlogs.map((blog) => (
          <BlogItem key={blog.id} blog={blog} />
        ))}
      </ul>
    </section>
  )
}
