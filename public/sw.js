// Service Worker for aggressive caching and performance optimization
const CACHE_NAME = 'blogfolio-v1'
const STATIC_CACHE_NAME = 'blogfolio-static-v1'
const DYNAMIC_CACHE_NAME = 'blogfolio-dynamic-v1'

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/about',
  '/blog',
  '/projects',
  '/contact',
  '/manifest.json',
  '/favicon.ico',
]

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS)
    })
  )
  self.skipWaiting()
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (
            cacheName !== STATIC_CACHE_NAME &&
            cacheName !== DYNAMIC_CACHE_NAME
          ) {
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
  self.clients.claim()
})

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-GET requests
  if (request.method !== 'GET') return

  // Skip external requests
  if (url.origin !== location.origin) return

  // Handle different types of requests
  if (request.destination === 'image') {
    // Images: Cache first, then network
    event.respondWith(cacheFirst(request, DYNAMIC_CACHE_NAME))
  } else if (
    request.url.includes('/api/') ||
    request.url.includes('github.com/repos')
  ) {
    // API requests: Network first, then cache
    event.respondWith(networkFirst(request, DYNAMIC_CACHE_NAME))
  } else {
    // Pages and other assets: Stale while revalidate
    event.respondWith(staleWhileRevalidate(request, STATIC_CACHE_NAME))
  }
})

// Cache strategies
async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName)
  const cached = await cache.match(request)
  
  if (cached) {
    return cached
  }
  
  try {
    const response = await fetch(request)
    if (response.status === 200) {
      cache.put(request, response.clone())
    }
    return response
  } catch (error) {
    console.error('Cache first failed:', error)
    return new Response('Network error', { status: 408 })
  }
}

async function networkFirst(request, cacheName) {
  const cache = await caches.open(cacheName)
  
  try {
    const response = await fetch(request)
    if (response.status === 200) {
      cache.put(request, response.clone())
    }
    return response
  } catch (error) {
    const cached = await cache.match(request)
    if (cached) {
      return cached
    }
    return new Response('Network error', { status: 408 })
  }
}

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName)
  const cached = await cache.match(request)
  
  const fetchPromise = fetch(request).then((response) => {
    if (response.status === 200) {
      cache.put(request, response.clone())
    }
    return response
  })
  
  return cached || fetchPromise
}

// Background sync for offline functionality
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync())
  }
})

async function doBackgroundSync() {
  // Implement background sync logic here
  console.log('Background sync triggered')
}

// Push notifications (if needed in the future)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json()
    event.waitUntil(
      self.registration.showNotification(data.title, {
        body: data.body,
        icon: '/favicon.ico',
        badge: '/favicon.ico',
      })
    )
  }
})
