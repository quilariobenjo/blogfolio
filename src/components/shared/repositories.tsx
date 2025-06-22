import { Book, Lock, GitFork, Star, ExternalLink } from "lucide-react"
import { TypographyH3, TypographyP } from "../typography"
import { Badge } from "@/components/ui/badge"
import { FloatingAction } from "./external-link"

export const Repository = ({
  description,
  name,
  isPrivate = false,
  language,
  stars = 0,
  forks = 0,
  topics = [],
  hasExternalLink = false,
}: {
  description: string | null
  name: string
  isPrivate?: boolean
  language?: string | null
  stars?: number
  forks?: number
  topics?: string[]
  hasExternalLink?: boolean
}) => {
  return (
    <li className="group relative -mx-4 md:-mx-0">
      <div className="group-hover:bg-accent flex rounded-sm p-4 transition-colors">
        <article className="flex w-full flex-col gap-2 rounded-sm">
          <header className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Book
                className="text-muted-foreground h-6 w-6 shrink-0"
                aria-hidden="true"
              />
              <TypographyH3 className="text-base font-bold lowercase md:text-lg">
                {name}
              </TypographyH3>
              {isPrivate && (
                <Badge
                  variant="secondary"
                  className="ml-2 flex items-center gap-1 text-xs"
                  aria-label="Private repository"
                >
                  <Lock className="h-3 w-3" aria-hidden="true" />
                  Private
                </Badge>
              )}
            </div>
          </header>

          {description && (
            <TypographyP className="text-foreground/90 mt-2 line-clamp-3 text-[13px] leading-7 md:text-[14px]">
              {description}
            </TypographyP>
          )}

          {topics.length > 0 && (
            <div
              className="flex flex-wrap gap-1"
              role="list"
              aria-label="Repository topics"
            >
              {topics.slice(0, 5).map((topic) => (
                <Badge key={topic} variant="outline" className="text-xs">
                  {topic}
                </Badge>
              ))}
              {topics.length > 5 && (
                <Badge variant="outline" className="text-xs">
                  +{topics.length - 5} more
                </Badge>
              )}
            </div>
          )}

          {/* Repository Stats */}
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

          {/* External Link Status */}
          {!hasExternalLink && (
            <div className="text-muted-foreground mt-2 flex items-center gap-1">
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
              <span className="text-sm">No external link available</span>
            </div>
          )}
        </article>
      </div>

      {/* Private Repository Indicator - Floating */}
      <FloatingAction
        url={`/projects/${name}`}
        label="View more details about this project "
      />
    </li>
  )
}
