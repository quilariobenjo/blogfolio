"use client"

import { useEffect } from "react"
import {
  registerServiceWorker,
  observePerformance,
  addCriticalResourceHints,
  reportWebVitals,
} from "@/lib/performance"

interface PerformanceProviderProps {
  children: React.ReactNode
}

export default function PerformanceProvider({
  children,
}: PerformanceProviderProps) {
  useEffect(() => {
    // Register service worker for caching
    registerServiceWorker()

    // Add critical resource hints
    addCriticalResourceHints()

    // Start performance monitoring
    observePerformance()

    // Report web vitals
    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      window.requestIdleCallback(() => {
        // Use dynamic import with proper error handling
        try {
          import("web-vitals").then((module) => {
            const webVitals = module as any
            if (webVitals.getCLS) webVitals.getCLS(reportWebVitals)
            if (webVitals.getFID) webVitals.getFID(reportWebVitals)
            if (webVitals.getFCP) webVitals.getFCP(reportWebVitals)
            if (webVitals.getLCP) webVitals.getLCP(reportWebVitals)
            if (webVitals.getTTFB) webVitals.getTTFB(reportWebVitals)
          }).catch(() => {
            // Silently fail if web-vitals is not available
          })
        } catch {
          // Silently fail if web-vitals is not available
        }
      })
    }
  }, [])

  return <>{children}</>
}
