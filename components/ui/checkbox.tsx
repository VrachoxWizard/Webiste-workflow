"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  onCheckedChange?: (checked: boolean) => void
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, onCheckedChange, ...props }, ref) => {
    return (
      <input
        type="checkbox"
        className={cn(
          "peer border-muted-foreground/30 ring-offset-background focus-visible:ring-primary/20 checked:bg-primary checked:border-primary checked:after:text-primary-foreground flex h-5 w-5 shrink-0 cursor-pointer appearance-none items-center justify-center rounded-sm border transition-all checked:after:text-[10px] checked:after:font-black checked:after:content-['✓'] focus-visible:ring-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
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
