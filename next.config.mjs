import "./src/env.mjs"

import createMDX from "@next/mdx"
import withBundleAnalyzer from "@next/bundle-analyzer"

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/**",
      },
    ],
    minimumCacheTTL: 60 * 60 * 24 * 7, // 1 week
  },
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  serverExternalPackages: ["gray-matter"],
  experimental: {
    optimizePackageImports: ["lucide-react", "react-icons"],
  },
  compress: true,
}

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  extension: /\.(md|mdx)$/,
})

export default () => {
  const plugins = [withMDX, bundleAnalyzer]
  return plugins.reduce((acc, plugin) => plugin(acc), nextConfig)
}
