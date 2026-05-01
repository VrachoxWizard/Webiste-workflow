import * as React from "react"
import { cn } from "@/lib/utils"

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, as: Component = "section", ...props }, ref) => {
    return <Component ref={ref} className={cn("py-16 md:py-24 lg:py-32", className)} {...props} />
  }
)
Section.displayName = "Section"

export { Section }
