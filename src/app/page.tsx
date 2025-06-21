import Hero from "@/components/section/hero"
import Articles from "@/components/section/blogs"
import Repositories from "@/components/section/repositories"
import QuestionAnswer from "@/components/section/qa"
import { BreadcrumbJsonLd } from "@/components/structured-data"
import { siteConfig } from "@/config/site"
import { Metadata } from "next"
import * as React from "react"

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
      <Repositories />
      <Articles />
      <QuestionAnswer />
    </React.Fragment>
  )
}
