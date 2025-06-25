"use client"

import { useState } from "react"
import { generateOGImageUrl } from "@/lib/og-image"

export default function OGPreviewPage() {
  const [title, setTitle] = useState(
    "Building a Modern Blog with Next.js and MDX"
  )
  const [date, setDate] = useState("2025-06-18")
  const [type, setType] = useState<"Blog" | "Project">("Blog")

  const ogImageUrl = generateOGImageUrl({ title, date, type })

  return (
    <div className="container mx-auto max-w-4xl p-8">
      <h1 className="mb-8 text-3xl font-bold">OG Image Preview</h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="mb-1 block text-sm font-medium">
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-md border border-gray-300 p-2"
              placeholder="Enter title..."
            />
          </div>

          <div>
            <label htmlFor="date" className="mb-1 block text-sm font-medium">
              Date
            </label>
            <input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-md border border-gray-300 p-2"
            />
          </div>

          <div>
            <label htmlFor="type" className="mb-1 block text-sm font-medium">
              Type
            </label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value as "Blog" | "Project")}
              className="w-full rounded-md border border-gray-300 p-2"
            >
              <option value="Blog">Blog</option>
              <option value="Project">Project</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Generated URL
            </label>
            <code className="block break-all rounded bg-gray-100 p-2 text-xs">
              {ogImageUrl}
            </code>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="mb-2 text-lg font-semibold">Preview (1200x630)</h3>
            <div className="overflow-hidden rounded-lg border border-gray-300">
              <img
                src={ogImageUrl}
                alt="OG Image Preview"
                className="h-auto w-full"
                style={{ aspectRatio: "1200/630" }}
              />
            </div>
          </div>

          <div>
            <h3 className="mb-2 text-lg font-semibold">Twitter Card Preview</h3>
            <div className="max-w-sm rounded-lg border border-gray-300 p-4">
              <img
                src={ogImageUrl}
                alt="Twitter Card Preview"
                className="h-auto w-full rounded"
                style={{ aspectRatio: "1200/630" }}
              />
              <div className="mt-2">
                <div className="text-sm text-gray-500">benjoquilario.me</div>
                <div className="font-medium">{title}</div>
                <div className="text-sm text-gray-600">
                  I am a frontend developer specializing in frontend
                  integration...
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
