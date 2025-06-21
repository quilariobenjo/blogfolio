import Image from "next/image"

interface ExperienceItemProps {
  title: string
  subtitle: string
  duration: string
  logoSrc: string
  logoAlt: string
}

const ExperienceItem: React.FC<ExperienceItemProps> = ({
  title,
  subtitle,
  duration,
  logoSrc,
  logoAlt,
}) => (
  <div className="flex gap-3">
    <div className="bg-muted relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full border">
      <Image fill style={{ objectFit: "cover" }} src={logoSrc} alt={logoAlt} />
    </div>
    <div className="flex grow flex-col">
      <div className="flex items-center justify-between">
        <h4 className="text-[15px] font-medium">{title}</h4>
        <div className="text-muted-foreground/80 text-sm">{duration}</div>
      </div>
      <p className="text-foreground/60 text-sm">{subtitle}</p>
    </div>
  </div>
)

export default ExperienceItem
