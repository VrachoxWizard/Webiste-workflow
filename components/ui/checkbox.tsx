"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onCheckedChange?: (checked: boolean) => void
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, onCheckedChange, ...props }, ref) => {
    return (
      <input
        type="checkbox"
        className={cn(
          "peer border-muted-foreground/30 ring-offset-background focus-visible:ring-primary/20 checked:bg-primary checked:border-primary h-5 w-5 shrink-0 rounded-sm border focus-visible:ring-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 transition-all cursor-pointer appearance-none checked:after:content-['✓'] checked:after:text-primary-foreground checked:after:text-[10px] checked:after:font-black flex items-center justify-center",
          className
        )}
        ref={ref}
        onChange={(e) => onCheckedChange?.(e.target.checked)}
        {...props}
      />
    )
  }
)
Checkbox.displayName = "Checkbox"

export { Checkbox }
