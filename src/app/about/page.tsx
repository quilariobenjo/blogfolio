import {
  AboutMeSection,
  WorkExperienceSection,
  EducationSection,
  TechSectionClient,
} from "./components"

const About = async () => {
  return (
    <section className="mb-12 w-full space-y-8">
      {/* About Me Section */}
      <AboutMeSection />

      {/* Work Experience Section */}
      <WorkExperienceSection />

      {/* Education Section */}
      <EducationSection />

      {/* Technology Section */}
      <TechSectionClient />
    </section>
  )
}

export default About
