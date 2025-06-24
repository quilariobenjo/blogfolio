"use client"

import React from "react"
import { ExternalLink } from "lucide-react"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"

// Optimize bundle size by only importing icon names, not the actual icons
export const CORE_TECHNOLOGIES = [
  { name: "Next.js" },
  { name: "React" },
  { name: "JavaScript" },
  { name: "TypeScript" },
  { name: "HTML5" },
  { name: "CSS3" },
  { name: "Node.js" },
  { name: "Tailwind CSS" },
  { name: "PostgreSQL" },
] as const

interface TechProps {
  onShowFullSkills: () => void
}

const Tech: React.FC<TechProps> = ({ onShowFullSkills }) => {
  return (
    <section className="mt-6 space-y-4">
      <header>
        <h4 className="font-heading scroll-m-20 text-lg font-medium tracking-tight">
          Here are a few technologies that are my cup of tea ☕
        </h4>
      </header>

      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {CORE_TECHNOLOGIES.map((tech) => (
            <Badge
              key={tech.name}
              variant="secondary"
              className="text-xs font-medium"
            >
              {tech.name}
            </Badge>
          ))}
        </div>

        <Button
          variant="link"
          onClick={onShowFullSkills}
          className="text-muted-foreground hover:text-foreground h-auto p-0 text-sm font-normal transition-colors"
        >
          See my full arsenal
          <ExternalLink className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </section>
  )
}

export default Tech
