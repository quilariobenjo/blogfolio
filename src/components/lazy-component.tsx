"use client"

import { useEffect, useRef, useState } from "react"
import { createIntersectionObserver } from "@/lib/performance"

interface LazyComponentProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  rootMargin?: string
  threshold?: number
  className?: string
}

export default function LazyComponent({
  children,
  fallback = null,
  rootMargin = "50px",
  threshold = 0.1,
  className,
}: LazyComponentProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = createIntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer?.unobserve(entry.target)
          }
        })
      },
      {
        rootMargin,
        threshold,
      }
    )

    if (observer) {
      observer.observe(element)
    } else {
      // Fallback for browsers without IntersectionObserver
      setIsVisible(true)
    }

    return () => {
      if (observer && element) {
        observer.unobserve(element)
      }
    }
  }, [rootMargin, threshold])

  return (
    <div ref={ref} className={className}>
      {isVisible ? children : fallback}
    </div>
  )
}
