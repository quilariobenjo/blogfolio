# Comprehensive Blog System with Next.js and MDX

A modern, feature-rich blog system built with Next.js, MDX, TypeScript, and Tailwind CSS. This system provides everything you need for a professional blog with excellent performance and SEO.

## ✨ Features

### Core Functionality

- 📝 **MDX Support** - Write blog posts in Markdown with React components
- 🚀 **Static Generation** - All blog posts are statically generated for optimal performance
- 🔍 **Full-Text Search** - Real-time search across all blog content
- 🏷️ **Tag System** - Organize posts with tags and browse by category
- ⏱️ **Reading Time** - Automatic reading time calculation
- 📱 **Responsive Design** - Mobile-first, fully responsive layout

### Advanced Features

- 🎨 **Syntax Highlighting** - Beautiful code highlighting with rehype-pretty-code
- 📊 **Related Posts** - Smart related post recommendations
- 🔗 **Auto-linking Headings** - Automatic anchor links for all headings
- 📄 **SEO Optimized** - Meta tags, Open Graph, and structured data
- 📡 **RSS Feed** - Automatic RSS feed generation
- 🗺️ **Sitemap** - XML sitemap for search engines
- 🌙 **Dark Mode** - Built-in dark mode support

## 📁 Project Structure

```
src/
├── app/
│   ├── blog/
│   │   ├── page.tsx              # Blog listing page
│   │   ├── [...slug]/
│   │   │   └── page.tsx          # Individual blog post pages
│   │   ├── tag/
│   │   │   └── [tag]/
│   │   │       └── page.tsx      # Tag-specific blog listings
│   │   ├── rss/
│   │   │   └── route.ts          # RSS feed
│   │   └── sitemap.xml/
│   │       └── route.ts          # XML sitemap
├── components/
│   ├── mdx-content.tsx           # MDX rendering component
│   ├── mdx-components.tsx        # Original MDX components
│   └── shared/
│       ├── blog-item.tsx         # Blog post card component
│       ├── blog-search.tsx       # Search functionality
│       └── related-posts.tsx     # Related posts component
├── content/
│   └── blog/
│       ├── *.mdx                 # Blog post files
├── lib/
│   ├── blog.ts                   # Core blog utilities
│   ├── blog-tags.ts              # Tag-related utilities
│   └── blog-search.ts            # Search functionality
└── ...
```

## 🚀 Getting Started

### 1. Install Dependencies

The system uses the following key packages:

```bash
pnpm add next-mdx-remote @mdx-js/loader @mdx-js/react remark remark-gfm unified
```

### 2. Create Blog Posts

Create MDX files in `src/content/blog/` with frontmatter:

````mdx
---
title: "Your Blog Post Title"
description: "A brief description of your post"
date: "2025-01-21"
author: "Your Name"
tags: ["Next.js", "React", "TypeScript"]
published: true
---

# Your Blog Post Content

Write your content here using **Markdown** and React components!

```jsx
function CustomComponent() {
  return <div>This is a React component in MDX!</div>
}
```
````

<CustomComponent />
```

### 3. Configure Your Site

Update your site configuration in `src/config/site.ts` and environment variables.

## 📝 Writing Blog Posts

### Frontmatter Options

```yaml
---
title: "Required - Post title"
description: "Required - Post description for SEO"
date: "Required - Publication date (YYYY-MM-DD)"
author: "Optional - Author name"
tags: ["Optional", "Array", "Of", "Tags"]
published: true # Optional - defaults to true
---
```

### Supported Content

- **Markdown** - All standard Markdown syntax
- **React Components** - Import and use React components
- **Code Blocks** - Syntax highlighting for 100+ languages
- **Tables** - GitHub-flavored tables
- **Images** - Optimized image handling
- **Links** - Auto-linking headings with anchors

## 🎨 Customization

### Custom MDX Components

Add custom components to `src/components/mdx-content.tsx`:

```tsx
const components = {
  // Custom components
  Callout: ({ type, children }) => (
    <div className={`callout callout-${type}`}>{children}</div>
  ),
  // ... other components
}
```

### Styling

The system uses Tailwind CSS with prose classes for optimal typography. Customize styles in your Tailwind configuration or component classes.

## 🔍 Search Functionality

The blog includes a powerful search system that searches:

- Post titles (highest priority)
- Post descriptions
- Post content
- Tags
- Partial word matches

Search results are ranked by relevance and match type.

## 🏷️ Tag System

- Automatic tag extraction from frontmatter
- Tag-based filtering and navigation
- Popular tags display
- Tag count statistics

## 📊 Performance

- **Static Generation** - All pages pre-rendered at build time
- **Image Optimization** - Next.js Image component
- **Code Splitting** - Automatic code splitting
- **Caching** - Aggressive caching strategies

## 🔧 Configuration

### Environment Variables

```env
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

### Next.js Configuration

The system works with your existing `next.config.mjs` setup with MDX support.

## 📈 SEO Features

- Meta tags for all pages
- Open Graph protocol support
- Twitter Card support
- Structured data (JSON-LD)
- Automatic sitemap generation
- RSS feed support
- Canonical URLs

## 🚀 Deployment

The blog system works with any Next.js hosting provider:

- **Vercel** (recommended)
- **Netlify**
- **AWS Amplify**
- **Self-hosted**

Simply deploy your Next.js application and all blog functionality will work out of the box.

## 🤝 Contributing

Feel free to contribute improvements to this blog system:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This blog system is open source and available under the MIT License.

---

Built with ❤️ using Next.js, MDX, TypeScript, and Tailwind CSS.
