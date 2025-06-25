"use client"

import { useState, useEffect, useRef } from "react"
import { Search, X } from "lucide-react"
import { searchBlogs, type SearchResult } from "@/lib/blog-search"
import Link from "next/link"
import { relativeDate } from "@/lib/date"

interface BlogSearchProps {
  placeholder?: string
  className?: string
}

export function BlogSearch({
  placeholder = "Search blog posts...",
  className,
}: BlogSearchProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([])
      setIsOpen(false)
      return
    }

    setIsLoading(true)
    const timeoutId = setTimeout(() => {
      const searchResults = searchBlogs(query)
      setResults(searchResults)
      setIsOpen(true)
      setIsLoading(false)
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [query])

  const handleClear = () => {
    setQuery("")
    setResults([])
    setIsOpen(false)
    inputRef.current?.focus()
  }

  const handleResultClick = () => {
    setQuery("")
    setResults([])
    setIsOpen(false)
  }

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <div className="relative">
        <Search className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border-input bg-background placeholder:text-muted-foreground focus:border-ring focus:ring-ring w-full rounded-lg border px-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
        />
        {query && (
          <button
            onClick={handleClear}
            className="text-muted-foreground hover:text-foreground absolute right-3 top-1/2 -translate-y-1/2"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {isOpen && (
        <div className="bg-popover absolute top-full z-50 mt-1 w-full rounded-lg border shadow-lg">
          {isLoading ? (
            <div className="text-muted-foreground p-4 text-center text-sm">
              Searching...
            </div>
          ) : results.length > 0 ? (
            <div className="max-h-96 overflow-y-auto">
              {results.slice(0, 10).map((result) => (
                <Link
                  key={result.blog.slug}
                  href={`/blog/${result.blog.slug}`}
                  onClick={handleResultClick}
                  className="hover:bg-muted/50 block border-b p-4 transition-colors last:border-b-0"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <h3 className="text-foreground line-clamp-1 font-medium">
                        {result.blog.title}
                      </h3>
                      <p className="text-muted-foreground line-clamp-2 text-sm">
                        {result.blog.description}
                      </p>
                      <div className="text-muted-foreground mt-2 flex items-center gap-2 text-xs">
                        <span>{relativeDate(result.blog.date)}</span>
                        <span>•</span>
                        <span className="capitalize">
                          {result.matchType} match
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
              {results.length > 10 && (
                <div className="text-muted-foreground p-3 text-center text-sm">
                  {results.length - 10} more results available
                </div>
              )}
            </div>
          ) : (
            <div className="text-muted-foreground p-4 text-center text-sm">
              No posts found for "{query}"
            </div>
          )}
        </div>
      )}
    </div>
  )
}
