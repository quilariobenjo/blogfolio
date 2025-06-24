import { Metadata } from "next"
import "./globals.css"
import { Geist, Geist_Mono } from "next/font/google"
import Header from "@/components/header"
import ThemeProvider from "@/components/theme-provider"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { siteConfig } from "@/config/site"
import Footer from "@/components/site-footer"
import { Toaster } from "@/components/ui/toaster"
import { Analytics } from "@vercel/analytics/next"
import { PersonJsonLd, WebsiteJsonLd } from "@/components/structured-data"
import { SpeedInsights } from "@vercel/speed-insights/next"
import PerformanceProvider from "@/components/performance-provider"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
})

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  alternates: {
    canonical: "/",
  },
  metadataBase: new URL(siteConfig.url),
  description: siteConfig.description,
  keywords: [
    "Benjo Quilario",
    "Frontend Developer",
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Web Development",
    "Portfolio",
    "Blog",
    "Software Engineer",
    "Philippines",
    "TailwindCSS",
    "Full Stack Developer",
  ],
  authors: [
    {
      name: siteConfig.username,
      url: siteConfig.url,
    },
  ],
  creator: siteConfig.username,
  publisher: siteConfig.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.url}/og.jpeg`,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    site: "@iam_benjo",
    creator: "@iam_benjo",
    images: [`${siteConfig.url}/og.jpeg`],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  manifest: "/manifest.json",
  category: "technology",
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <PersonJsonLd />
        <WebsiteJsonLd />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://api.github.com" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiase min-h-screen`}
      >
        <PerformanceProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="mx-auto max-w-4xl p-4">
              <Header />
              <main>{children}</main>
              <Footer />
            </div>
            <Toaster />
            <TailwindIndicator />
            <Analytics />
            <SpeedInsights />
          </ThemeProvider>
        </PerformanceProvider>
      </body>
    </html>
  )
}
