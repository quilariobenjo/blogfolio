// Performance utilities for monitoring and optimization
"use client"

// Web Vitals monitoring
export function reportWebVitals(metric: any) {
  if (typeof window !== 'undefined') {
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Web Vital:', metric)
    }
    
    // Send to analytics in production
    if (process.env.NODE_ENV === 'production') {
      // You can send to your analytics service here
      // Example: gtag('event', metric.name, { value: metric.value })
    }
  }
}

// Intersection Observer for lazy loading
export function createIntersectionObserver(
  callback: IntersectionObserverCallback,
  options: IntersectionObserverInit = {}
): IntersectionObserver | null {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return null
  }

  const defaultOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1,
    ...options,
  }

  return new IntersectionObserver(callback, defaultOptions)
}

// Debounce function for performance optimization
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout)
    }
    
    timeout = setTimeout(() => {
      func(...args)
    }, wait)
  }
}

// Throttle function for performance optimization
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => {
        inThrottle = false
      }, limit)
    }
  }
}

// Preload resources
export function preloadResource(href: string, as: string, type?: string) {
  if (typeof window === 'undefined') return

  const link = document.createElement('link')
  link.rel = 'preload'
  link.href = href
  link.as = as
  if (type) link.type = type
  
  document.head.appendChild(link)
}

// Prefetch resources
export function prefetchResource(href: string) {
  if (typeof window === 'undefined') return

  const link = document.createElement('link')
  link.rel = 'prefetch'
  link.href = href
  
  document.head.appendChild(link)
}

// Service Worker registration
export function registerServiceWorker() {
  if (
    typeof window !== 'undefined' &&
    'serviceWorker' in navigator &&
    process.env.NODE_ENV === 'production'
  ) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration)
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError)
        })
    })
  }
}

// Performance observer for monitoring
export function observePerformance() {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
    return
  }

  // Observe Long Tasks
  try {
    const longTaskObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.duration > 50) {
          console.warn('Long task detected:', entry)
        }
      }
    })
    longTaskObserver.observe({ entryTypes: ['longtask'] })
  } catch (e) {
    // Long task API not supported
  }

  // Observe Layout Shifts
  try {
    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if ((entry as any).hadRecentInput) continue
        console.log('Layout shift:', entry)
      }
    })
    clsObserver.observe({ entryTypes: ['layout-shift'] })
  } catch (e) {
    // Layout shift API not supported
  }
}

// Memory usage monitoring
export function monitorMemoryUsage() {
  if (typeof window === 'undefined' || !('memory' in performance)) {
    return
  }

  const memory = (performance as any).memory
  console.log('Memory usage:', {
    used: Math.round(memory.usedJSHeapSize / 1048576) + ' MB',
    total: Math.round(memory.totalJSHeapSize / 1048576) + ' MB',
    limit: Math.round(memory.jsHeapSizeLimit / 1048576) + ' MB',
  })
}

// Image optimization helper
export function optimizeImage(src: string, width?: number, quality?: number) {
  if (typeof window === 'undefined') return src

  const url = new URL(src, window.location.origin)
  
  if (width) {
    url.searchParams.set('w', width.toString())
  }
  
  if (quality) {
    url.searchParams.set('q', quality.toString())
  }
  
  return url.toString()
}

// Critical resource hints
export function addCriticalResourceHints() {
  if (typeof window === 'undefined') return

  // Preconnect to external domains
  const preconnectDomains = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    'https://api.github.com',
  ]

  preconnectDomains.forEach((domain) => {
    const link = document.createElement('link')
    link.rel = 'preconnect'
    link.href = domain
    link.crossOrigin = 'anonymous'
    document.head.appendChild(link)
  })
}
