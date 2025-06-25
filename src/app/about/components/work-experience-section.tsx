import { TypographyH3 } from "@/components/typography"
import ExperienceItem from "./experience-item"
import { WORK_EXPERIENCE } from "./constants"

const WorkExperienceSection = () => {
  return (
    <div>
      <TypographyH3 className="mb-6 text-2xl font-bold">
        <span className="text-4xl">W</span>ork Experience.
      </TypographyH3>

      <ExperienceItem
        title={WORK_EXPERIENCE.company}
        subtitle={WORK_EXPERIENCE.position}
        duration={WORK_EXPERIENCE.duration}
        logoSrc={WORK_EXPERIENCE.logo}
        logoAlt={WORK_EXPERIENCE.company}
      />
    </div>
  )
}

export default WorkExperienceSection
