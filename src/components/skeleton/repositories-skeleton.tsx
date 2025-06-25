import { Book } from "lucide-react"
import React from "react"

// Shimmer animation component
const Shimmer = ({ className = "" }: { className?: string }) => (
  <div
    className={`bg-muted animate-pulse rounded ${className}`}
    aria-hidden="true"
  />
)

// Individual skeleton components matching the real structure
const SkeletonHeader = () => (
  <header className="flex items-center justify-between">
    <div className="flex items-center gap-2">
      <Book className="text-muted-foreground h-6 w-6 shrink-0 opacity-50" />
      <Shimmer className="h-6 w-32 md:w-40" />
    </div>
  </header>
)

const SkeletonDescription = () => (
  <div className="mt-6 space-y-2">
    <Shimmer className="h-4 w-full" />
    <Shimmer className="h-4 w-3/4" />
    <Shimmer className="h-4 w-1/2" />
  </div>
)

const SkeletonTopics = () => (
  <div className="flex flex-wrap gap-1" role="list" aria-label="Loading topics">
    {Array.from({ length: 3 }).map((_, index) => (
      <Shimmer
        key={index}
        className="border-border h-6 w-16 rounded-full border"
      />
    ))}
    <Shimmer className="border-border h-6 w-12 rounded-full border" />
  </div>
)

const SkeletonStats = () => (
  <div className="mt-auto flex items-center gap-4 pt-1">
    {/* Language */}
    <div className="flex items-center gap-2">
      <Shimmer className="h-3 w-3 rounded-full" />
      <Shimmer className="h-3 w-16" />
    </div>
    {/* Stars */}
    <div className="flex items-center gap-2">
      <Shimmer className="h-4 w-4" />
      <Shimmer className="h-3 w-8" />
    </div>
    {/* Forks */}
    <div className="flex items-center gap-2">
      <Shimmer className="h-4 w-4" />
      <Shimmer className="h-3 w-6" />
    </div>
  </div>
)

const SkeletonExternalLink = () => (
  <div className="mt-2 flex items-center gap-1">
    <Shimmer className="h-4 w-4" />
    <Shimmer className="h-4 w-48 truncate" />
  </div>
)

const SkeletonFloatingAction = () => (
  <span className="absolute right-0 top-0 z-50 flex h-8 w-8 -translate-y-1/4 items-center justify-center rounded-full opacity-30">
    <div className="bg-muted h-8 w-8 animate-pulse rounded-full" />
  </span>
)

export default function RepositorySkeleton() {
  return (
    <li className="group relative -mx-4 md:-mx-0">
      <div className="flex rounded-sm p-4 transition-colors">
        <article className="flex w-full flex-col gap-2 rounded-sm">
          <SkeletonHeader />
          <SkeletonDescription />
          <SkeletonTopics />
          <SkeletonStats />
          <SkeletonExternalLink />
        </article>
      </div>
      <SkeletonFloatingAction />
    </li>
  )
}
