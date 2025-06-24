import { REPOS } from "@/config/config"
import { TypographyH2 } from "@/components/typography"
import RepositorySkeleton from "@/components/skeleton/repositories-skeleton"
import React, { Suspense } from "react"
import { Repository } from "../shared/repositories"
import dynamic from "next/dynamic"

// Dynamically import RepositoriesItem to reduce initial bundle size
const RepositoriesItem = dynamic(
  () => import("@/components/shared/repositories-item"),
  {
    loading: () => <RepositorySkeleton />,
    ssr: true,
  }
)

const Repositories = () => {
  return (
    <section className="mb-12 flex flex-col items-start justify-start">
      <TypographyH2>
        <span className="text-4xl">F</span>
        eatured <span className="text-4xl">R</span>epositories
      </TypographyH2>
      <p className="text-muted-foreground/80 text-xs">
        Click a project to view more detailed information.
      </p>
      <ul className="mx-0 mt-6 grid w-full grid-cols-1 gap-2.5 md:-mx-4 md:grid-cols-2">
        <Repository
          name="Horfi"
          description="A web-based management system designed to streamline operations and improve efficiency for the House of Refuge Foundation Inc."
          topics={["non-profit", "charity", "children", "shelter"]}
          language="TypeScript"
          isPrivate={true}
          hasExternalLink={true}
        />
        {REPOS.map((repo) => (
          <Suspense key={repo} fallback={<RepositorySkeleton />}>
            <RepositoriesItem repoName={repo} />
          </Suspense>
        ))}
      </ul>
    </section>
  )
}

export default Repositories
