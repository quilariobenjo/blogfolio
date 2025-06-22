import { cn } from "@/lib/utils"

type TypographyProps = {
  className?: string
  children: React.ReactNode
}

export function TypographyH2({ className, children }: TypographyProps) {
  return (
    <h2
      className={cn(
        "bg-gradient-stop from-foreground via-foreground to-foreground/30 font-heading scroll-m-20 text-pretty bg-gradient-to-br via-30% bg-clip-text text-2xl font-semibold tracking-tighter text-transparent md:text-3xl",
        className
      )}
    >
      {children}
    </h2>
  )
}

export function TypographyH3({ className, children }: TypographyProps) {
  return (
    <h3
      className={cn(
        "bg-gradient-stop from-foreground via-foreground to-foreground/30 font-heading scroll-m-20 text-pretty bg-gradient-to-br via-30% bg-clip-text text-2xl font-semibold tracking-tighter text-transparent",
        className
      )}
    >
      {children}
    </h3>
  )
}

export function TypographyP({ className, children }: TypographyProps) {
  return (
    <p className={cn("leading-7 [&:not(:first-child)]:mt-4", className)}>
      {children}
    </p>
  )
}
