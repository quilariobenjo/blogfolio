import { TypographyH3 } from "@/components/typography"
import ExperienceItem from "./experience-item"
import { EDUCATION } from "./constants"

const EducationSection: React.FC = () => {
  return (
    <div>
      <TypographyH3 className="mb-6 text-2xl font-bold">
        <span className="text-4xl">E</span>ducation.
      </TypographyH3>

      <div className="space-y-4">
        {EDUCATION.map((edu) => (
          <ExperienceItem
            key={edu.school}
            title={edu.school}
            subtitle={edu.level}
            duration={edu.duration}
            logoSrc={edu.logo}
            logoAlt={edu.school}
          />
        ))}
      </div>
    </div>
  )
}

export default EducationSection
