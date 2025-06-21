import Link from "next/link"
import Image from "next/image"
import { MDXRemote } from "next-mdx-remote/rsc"
import { highlight } from "sugar-high"
import React from "react"
import { cn } from "@/lib/utils"

interface TableData {
  headers: string[]
  rows: string[][]
}

function Table({ data }: { data: TableData }) {
  let headers = data.headers.map((header, index) => (
    <th
      key={index}
      className={cn(
        "border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right"
      )}
    >
      {header}
    </th>
  ))
  let rows = data.rows.map((row, index) => (
    <tr key={index} className={cn("even:bg-muted m-0 border-t p-0")}>
      {row.map((cell, cellIndex) => (
        <td
          key={cellIndex}
          className={cn(
            "border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"
          )}
        >
          {cell}
        </td>
      ))}
    </tr>
  ))

  return (
    <div className="my-6 w-full overflow-y-auto">
      <table className={cn("w-full")}>
        <thead>
          <tr>{headers}</tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  )
}

function CustomLink(
  props: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }
) {
  const { href, className, ...restProps } = props

  if (href.startsWith("/")) {
    return (
      <Link
        href={href}
        className={cn("font-medium underline underline-offset-4", className)}
        {...restProps}
      >
        {props.children}
      </Link>
    )
  }

  if (href.startsWith("#")) {
    return (
      <a
        className={cn("font-medium underline underline-offset-4", className)}
        {...props}
      />
    )
  }

  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className={cn("font-medium underline underline-offset-4", className)}
      {...props}
    />
  )
}

function RoundedImage(props: React.ComponentProps<typeof Image>) {
  const { className, alt, ...restProps } = props
  return (
    <Image
      className={cn("rounded-md border", className)}
      alt={alt}
      {...restProps}
    />
  )
}

function Code({
  children,
  className,
  ...props
}: { children: string } & React.HTMLAttributes<HTMLElement>) {
  let codeHTML = highlight(children)
  return (
    <code
      className={cn(
        "relative rounded border px-[0.3rem] py-[0.2rem] font-mono text-sm",
        className
      )}
      dangerouslySetInnerHTML={{ __html: codeHTML }}
      {...props}
    />
  )
}

function slugify(str: string): string {
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters except for -
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
}

function createHeading(level: number) {
  const Heading = ({
    children,
    className,
    ...props
  }: {
    children: React.ReactNode
  } & React.HTMLAttributes<HTMLHeadingElement>) => {
    let slug = slugify(children as string)

    const headingClasses = {
      1: "mt-2 scroll-m-20 text-4xl font-bold tracking-tight",
      2: "mt-10 scroll-m-20 border-b pb-1 text-3xl font-semibold tracking-tight first:mt-0",
      3: "mt-8 scroll-m-20 text-2xl font-semibold tracking-tight",
      4: "mt-8 scroll-m-20 text-xl font-semibold tracking-tight",
      5: "mt-8 scroll-m-20 text-lg font-semibold tracking-tight",
      6: "mt-8 scroll-m-20 text-base font-semibold tracking-tight",
    }

    return React.createElement(
      `h${level}`,
      {
        id: slug,
        className: cn(
          headingClasses[level as keyof typeof headingClasses],
          className
        ),
        ...props,
      },
      [
        React.createElement("a", {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: "anchor",
        }),
      ],
      children
    )
  }

  Heading.displayName = `Heading${level}`

  return Heading
}

let components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className={cn("leading-7 [&:not(:first-child)]:mt-5", className)}
      {...props}
    />
  ),
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className={cn("my-6 ml-6 list-disc", className)} {...props} />
  ),
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className={cn("my-6 ml-6 list-decimal", className)} {...props} />
  ),
  li: ({ className, ...props }: any) => (
    <li className={cn("mt-2", className)} {...props} />
  ),
  blockquote: ({ className, ...props }: any) => (
    <blockquote
      className={cn(
        "[&>*]:text-muted-foreground mt-6 border-l-2 pl-6 italic",
        className
      )}
      {...props}
    />
  ),
  hr: ({ ...props }) => <hr className="my-4 md:my-8" {...props} />,
  pre: ({ className, ...props }: any) => (
    <pre
      className={cn(
        "mb-4 mt-6 overflow-x-auto rounded-lg border bg-zinc-950 px-3 py-4 text-zinc-50 dark:bg-zinc-900",
        className
      )}
      {...props}
    />
  ),
  Image: RoundedImage,
  a: CustomLink,
  code: Code,
  Table,
}

export function CustomMDX(props: React.ComponentProps<typeof MDXRemote>) {
  return <MDXRemote {...props} components={components} />
}
