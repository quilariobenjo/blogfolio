import { Metadata } from "next"
import "./globals.css"
import { Geist, Geist_Mono } from "next/font/google"
import Header from "@/components/header"
import ThemeProvider from "@/components/theme-provider"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { siteConfig } from "@/config/site"
import Footer from "@/components/site-footer"
import { Toaster } from "@/components/ui/toaster"
import { Analytics } from "@vercel/analytics/react"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  alternates: {
    canonical: "/",
  },
  metadataBase: new URL("https://benjoquilario.site"),
  description: siteConfig.description,
  authors: {
    name: siteConfig.username,
  },
  creator: siteConfig.username,
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
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.username,
  },
  icons: {
    icon: "/favicon.ico",
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiase min-h-screen`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="mx-auto max-w-3xl p-4">
            <Header />
            <main>{children}</main>
            <Footer />
          </div>
          <Toaster />
          <TailwindIndicator />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
