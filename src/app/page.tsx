import Hero from "@/components/section/hero"
import { BreadcrumbJsonLd } from "@/components/structured-data"
import { siteConfig } from "@/config/site"
import { Metadata } from "next"
import * as React from "react"
import LazyComponent from "@/components/lazy-component"
import dynamic from "next/dynamic"

// Dynamically import heavy components to reduce initial bundle size
const Articles = dynamic(() => import("@/components/section/blogs"), {
  ssr: true,
})

const Repositories = dynamic(() => import("@/components/section/repositories"), {
  ssr: true,
})

const QuestionAnswer = dynamic(() => import("@/components/section/qa"), {
  ssr: true,
})

export const metadata: Metadata = {
  title: "Home",
  description: `${siteConfig.description} - Explore my portfolio, latest blog posts, and projects.`,
  alternates: {
    canonical: "/",
  },
}

export default function Home() {
  const breadcrumbItems = [
    {
      name: "Home",
      item: siteConfig.url,
    },
  ]

  return (
    <React.Fragment>
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <Hero />
      <LazyComponent>
        <Repositories />
      </LazyComponent>
      <LazyComponent>
        <Articles />
      </LazyComponent>
      <LazyComponent>
        <QuestionAnswer />
      </LazyComponent>
    </React.Fragment>
  )
}
