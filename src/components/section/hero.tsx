"use client"

import React, { Suspense, useMemo } from "react"
import { TypographyP } from "../typography"
import { FadeText } from "../ui/fade-text-"
import { CORE_TECHNOLOGIES } from "../tech"
import { Badge } from "../ui/badge"
const AvatarSection = React.lazy(() => import("./hero-avatar-section"))

const Hero = () => {
  const badges = useMemo(
    () =>
      CORE_TECHNOLOGIES.map((tech) => (
        <Badge
          key={tech.name}
          variant="secondary"
          className="text-xs font-medium"
        >
          {tech.name}
        </Badge>
      )),
    []
  )

  return (
    <section className="mb-12 flex flex-col">
      <div className="flex w-full flex-col-reverse items-center gap-4">
        <div className="flex flex-wrap gap-2 self-start">
          <h4 className="font-heading scroll-m-20 text-lg font-medium tracking-tight">
            Here are a few technologies that are my cup of tea ☕
          </h4>
          <div className="flex flex-wrap items-center gap-2">{badges}</div>
        </div>
        <div className="flex w-full flex-col">
          <h1 className="bg-gradient-stop from-foreground via-foreground to-foreground/30 font-heading mt-2 scroll-m-20 text-pretty bg-gradient-to-br via-30% bg-clip-text text-4xl font-extrabold tracking-tighter text-transparent md:text-5xl">
            hey, I'm benjo 👋
          </h1>
          <TypographyP>
            I am a frontend developer specializing in frontend integration.
            Recently, I have expanded my skill set to include backend API
            development and UX/UI design
          </TypographyP>
        </div>
        <Suspense fallback={null}>
          <AvatarSection />
        </Suspense>
      </div>
    </section>
  )
}

export default Hero
