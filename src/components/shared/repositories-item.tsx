import { Book, GitFork, Star, ExternalLink } from "lucide-react"
import React from "react"
import { Badge } from "@/components/ui/badge"
import { TypographyH3, TypographyP } from "@/components/typography"
import Link from "next/link"
import { Button } from "../ui/button"
import { ExternalLinkButton, FloatingAction } from "./external-link"
import { env } from "@/env.mjs"

// Type definitions for better type safety
interface GitHubRepository {
  name: string
  description: string | null
  topics: string[]
  language: string | null
  stargazers_count: number
  forks_count: number
  homepage: string | null
  html_url: string
}

interface RepositoryItemProps {
  repoName: string
}

// Enhanced fetch function with better error handling and caching
async function getRepos(repo: string): Promise<GitHubRepository> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/benjoquilario/${repo}`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          // Add user agent for better API compliance
          "User-Agent": "benjoquilario-portfolio",
        },
        next: {
          revalidate: 3600, // Cache for 1 hour
          tags: [`repo-${repo}`], // Add cache tags for selective revalidation
        },
      }
    )

    if (!res.ok) {
      // More descriptive error messages
      if (res.status === 404) {
        throw new Error(`Repository "${repo}" not found`)
      }
      if (res.status === 403) {
        throw new Error("GitHub API rate limit exceeded")
      }
      throw new Error(
        `Failed to fetch repository data: ${res.status} ${res.statusText}`
      )
    }

    const data = await res.json()
    return data as GitHubRepository
  } catch (error) {
    console.error(`Error fetching repository ${repo}:`, error)
    throw error
  }
}

// Reusable components for better code organization
const RepositoryStats = ({
  language,
  stars,
  forks,
}: {
  language: string | null
  stars: number
  forks: number
}) => (
  <div className="font-1 text-2 mt-auto flex items-center gap-4 pt-1 text-xs">
    {language && (
      <div className="flex items-center gap-2">
        <div
          className="h-3 w-3 shrink-0 rounded-full bg-current"
          aria-hidden="true"
        />
        <span>{language}</span>
      </div>
    )}
    <div className="flex items-center gap-2">
      <Star className="h-4 w-4 shrink-0" aria-hidden="true" />
      <span>{stars.toLocaleString()}</span>
    </div>
    <div className="flex items-center gap-2">
      <GitFork className="h-4 w-4 shrink-0" aria-hidden="true" />
      <span>{forks.toLocaleString()}</span>
    </div>
  </div>
)

export default async function RepositoriesItem({
  repoName,
}: RepositoryItemProps) {
  try {
    const repository = await getRepos(repoName)

    // Primary URL priority: homepage > html_url
    const primaryUrl = repository.homepage || repository.html_url
    const displayUrl = repository.homepage || repository.html_url

    return (
      <li className="group relative -mx-4 md:-mx-0">
        <Link href={`/projects/${repoName}`} className="block">
          <div className="group-hover:bg-accent flex rounded-sm p-4 transition-colors">
            <article className="flex w-full flex-col gap-2 rounded-sm">
              <header className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Book
                    className="text-muted-foreground h-6 w-6 shrink-0"
                    aria-hidden="true"
                  />
                  <TypographyH3 className="text-base font-bold lowercase md:text-lg">
                    {repository.name}
                  </TypographyH3>
                </div>
              </header>

              {repository.description && (
                <TypographyP className="text-foreground/90 mt-2 line-clamp-3 text-[13px] leading-7 md:text-[14px]">
                  {repository.description}
                </TypographyP>
              )}

              {repository.topics.length > 0 && (
                <div
                  className="flex flex-wrap gap-1"
                  role="list"
                  aria-label="Repository topics"
                >
                  {repository.topics.slice(0, 5).map((topic) => (
                    <Badge key={topic} variant="outline" className="text-xs">
                      {topic}
                    </Badge>
                  ))}
                  {repository.topics.length > 5 && (
                    <Badge variant="outline" className="text-xs">
                      +{repository.topics.length - 5} more
                    </Badge>
                  )}
                </div>
              )}

              <RepositoryStats
                language={repository.language}
                stars={repository.stargazers_count}
                forks={repository.forks_count}
              />

              {/* {repository.homepage && ( */}
              {/* <ExternalLinkButton
              href={`${env.NEXT_PUBLIC_APP_URL}projects/${repoName}`}
              label={`${env.NEXT_PUBLIC_APP_URL}projects/${repoName}`}
            /> */}
              {/* )} */}
            </article>
          </div>

          {/* <FloatingAction
            url={`/projects/${repoName}`}
            label={`Visit ${repository.name} on GitHub`}
          /> */}
        </Link>
      </li>
    )
  } catch (error) {
    // Error fallback UI
    return (
      <li className="group relative -mx-4 md:-mx-0">
        <div className="flex rounded-sm p-4 transition-colors">
          <article className="flex w-full flex-col gap-2 rounded-sm">
            <div className="flex items-center gap-2">
              <Book
                className="text-muted-foreground h-6 w-6 shrink-0"
                aria-hidden="true"
              />
              <TypographyH3 className="text-muted-foreground text-base font-bold lowercase md:text-lg">
                {repoName}
              </TypographyH3>
            </div>
            <TypographyP className="text-muted-foreground mt-2 text-[13px] leading-7 md:text-[14px]">
              Failed to load repository information
            </TypographyP>
          </article>
        </div>
      </li>
    )
  }
}
