import React from "react"
import dynamic from "next/dynamic"

const AspectRatio = dynamic(
  () => import("@/components/ui/aspect-ratio").then((mod) => mod.AspectRatio),
  { ssr: false }
)

const Image = dynamic(() => import("next/image"), { ssr: false })
import avatar from "../../app/avatar.jpeg"

const AvatarSection = () => (
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
)

export default AvatarSection
