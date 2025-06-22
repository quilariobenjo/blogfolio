"use client"

import React from "react"
import Image from "next/image"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { TypographyP } from "../typography"
import avatar from "../../app/avatar.jpeg"
import { FadeText } from "../ui/fade-text-"
import { CORE_TECHNOLOGIES } from "../tech"
import { Badge } from "../ui/badge"

const Hero = () => {
  return (
    <section className="mb-12 flex flex-col">
      <div className="flex w-full flex-col-reverse items-center gap-4">
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
        <div className="flex w-full flex-col">
          <h1 className="bg-gradient-stop from-foreground via-foreground to-foreground/30 font-heading mt-2 scroll-m-20 text-pretty bg-gradient-to-br via-30% bg-clip-text text-4xl font-extrabold tracking-tighter text-transparent md:text-5xl">
            hey, I'm benjo 👋
          </h1>
          <TypographyP className="text-foreground/90 mt-2 text-sm leading-6 md:text-[15px]">
            I am a frontend developer specializing in frontend integration.
            Recently, I have expanded my skill set to include backend API
            development and UX/UI design. I am passionate about building
            seamless user experiences and enjoy bridging the gap between design
            and development to create intuitive, high-quality web applications.
          </TypographyP>
        </div>
        <div className="relative w-full">
          <div className="relative h-[125px] w-[125px] rounded-md p-1 shadow-md">
            <AspectRatio className="bg-muted relative rounded-md">
              <Image
                src={avatar}
                alt="Benjo Quilario"
                fill
                style={{ objectFit: "cover" }}
                className="rounded-md shadow-lg"
              />
            </AspectRatio>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
