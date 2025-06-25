import { ImageResponse } from "next/og"
import { NextRequest } from "next/server"
import { siteConfig } from "@/config/site"

export const runtime = "edge"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    // Get parameters from URL
    const title = searchParams.get("title") || "Untitled"
    const date = searchParams.get("date") || new Date().toLocaleDateString()
    const type = searchParams.get("type") || "Blog" // 'Blog' or 'Project'

    // Try to load fonts, but don't fail if they're not available
    let geistSans = null
    try {
      geistSans = await fetch(
        new URL("/assets/fonts/GeistVF.woff", request.url)
      ).then((res) => res.arrayBuffer())
    } catch (error) {
      console.warn("Could not load Geist font, using fallback")
    }

    const fonts = geistSans
      ? [
          {
            name: "Geist",
            data: geistSans,
            style: "normal" as const,
            weight: 400 as const,
          },
        ]
      : []

    return new ImageResponse(
      (
        <div
          style={{
            background:
              "linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "60px",
            color: "white",
            fontFamily: geistSans
              ? "Geist"
              : 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            position: "relative",
          }}
        >
          {/* Background pattern */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              opacity: 0.1,
              background: `url("data:image/svg+xml,${encodeURIComponent(
                '<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="%23ffffff" fill-opacity="0.1"><circle cx="30" cy="30" r="4"/></g></svg>'
              )}")`,
            }}
          />

          {/* Header with type badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              position: "relative",
              zIndex: 1,
            }}
          >
            <div
              style={{
                background:
                  type === "Blog"
                    ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                    : "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                padding: "12px 24px",
                borderRadius: "30px",
                fontSize: "18px",
                fontWeight: "600",
                border: "1px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              {type}
            </div>
            <div
              style={{
                fontSize: "18px",
                opacity: 0.7,
                fontWeight: "400",
              }}
            >
              {date}
            </div>
          </div>

          {/* Main title */}
          <div
            style={{
              fontSize:
                title.length > 50
                  ? "48px"
                  : title.length > 30
                    ? "56px"
                    : "64px",
              fontWeight: "800",
              lineHeight: "1.1",
              textAlign: "center",
              maxWidth: "900px",
              margin: "0 auto",
              background: "linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              textShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
              position: "relative",
              zIndex: 1,
            }}
          >
            {title}
          </div>

          {/* Footer with site URL and author */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: "20px",
              opacity: 0.8,
              position: "relative",
              zIndex: 1,
            }}
          >
            <div
              style={{
                fontWeight: "500",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              {siteConfig.url?.replace("https://", "").replace("http://", "") ||
                "benjoquilario.me"}
            </div>
            <div style={{ fontWeight: "600" }}>{siteConfig.name}</div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts,
      }
    )
  } catch (e: any) {
    console.error("Failed to generate OG image:", e.message)
    return new Response("Failed to generate image", {
      status: 500,
    })
  }
}
