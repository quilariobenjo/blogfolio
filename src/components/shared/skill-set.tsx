"use client"

import type { SkillSet } from "@/lib/types"
import React from "react"

interface SkillSetProps {
  title: string
  skillSets: SkillSet[]
}

const SkillSet: React.FC<SkillSetProps> = ({ title, skillSets }) => {
  return (
    <section className="space-y-3">
      <header>
        <h3 className="text-foreground text-sm font-semibold md:text-base">
          {title}
        </h3>
      </header>

      <div className="border-border grid grid-cols-2 gap-3 border-t pt-4">
        {skillSets.map((skill, index) => (
          <div
            key={`${skill.name}-${index}`}
            className="text-primary flex items-center gap-2"
          >
            <skill.icon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
            <span className="text-muted-foreground truncate text-sm font-light">
              {skill.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default SkillSet
