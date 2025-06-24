import { TypographyH3, TypographyP } from "@/components/typography"
import CodeSpan from "./code-span"
import {
  PERSONAL_INFO,
  LEARNING_FOCUS,
  HOBBIES,
  MEETUP_ACTIVITIES,
} from "./constants"
import { Fragment } from "react"

const AboutMeSection: React.FC = () => {
  return (
    <div>
      <TypographyH3 className="mb-6 text-3xl">
        <span className="text-4xl">A</span>bout me.
      </TypographyH3>

      <div className="space-y-5 text-sm leading-7 md:text-[15px]">
        <TypographyP>
          I'm a passionate front-end web developer based in{" "}
          {PERSONAL_INFO.location}.
        </TypographyP>

        <TypographyP>
          My journey into web development started back when I was a Grade 10
          high school student. I became fascinated with how websites were built
          and decided to do some research. That's when I first encountered the
          terms <CodeSpan>HTML</CodeSpan> and <CodeSpan>CSS</CodeSpan>. The real
          magic happened when I discovered the browser's "Inspect Element"
          feature—seeing the code behind websites was mind-blowing! From that
          moment, I was completely hooked on web development.
        </TypographyP>

        <TypographyP>
          What started as teenage curiosity has evolved into over{" "}
          {PERSONAL_INFO.experience} of coding and developing front-end
          applications. I've completed several freelance projects, each one
          teaching me something new about creating digital experiences that
          users love. Currently, I'm a {PERSONAL_INFO.yearLevel} at{" "}
          {PERSONAL_INFO.university}, where I continue to deepen my
          understanding of technology and software development.
        </TypographyP>

        <TypographyP>
          My passion lies in front-end development and creating exceptional user
          experiences. Recently, I've expanded my skills to include backend API
          development and UX/UI design principles, working toward becoming a
          well-rounded full-stack developer.
        </TypographyP>

        <TypographyP>
          I'm currently focused on learning{" "}
          {LEARNING_FOCUS.map((item, index) => (
            <Fragment key={item}>
              <CodeSpan>{item}</CodeSpan>
              {index < LEARNING_FOCUS.length - 1 &&
                (index === LEARNING_FOCUS.length - 2 ? " and " : ", ")}
            </Fragment>
          ))}
          .
        </TypographyP>

        <TypographyP>
          Since technology evolves rapidly, I'm committed to continuous learning
          and staying current with the latest developments and best practices in
          the field.
        </TypographyP>

        <TypographyP>
          When I'm not coding, I enjoy a variety of hobbies:
        </TypographyP>

        <ul className="my-6 ml-6 list-disc space-y-2">
          {HOBBIES.map((hobby, index) => (
            <li key={index}>{hobby}</li>
          ))}
        </ul>

        <TypographyP>
          If you're in the {PERSONAL_INFO.meetupLocation} area, I'd love to
          connect! We could:
        </TypographyP>

        <ul className="my-6 ml-6 list-disc space-y-2">
          {MEETUP_ACTIVITIES.map((activity, index) => (
            <li key={index}>{activity}</li>
          ))}
        </ul>

        <TypographyP>
          I thrive both in independent work environments and collaborative team
          settings, and I'm always eager to take on new challenges and learn
          from different perspectives.
        </TypographyP>

        <TypographyP>
          I believe in the power of connection and knowledge sharing within the
          developer community. Let's build something amazing together!
        </TypographyP>
      </div>
    </div>
  )
}

export default AboutMeSection
