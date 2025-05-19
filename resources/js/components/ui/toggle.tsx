"use client"

import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const toggleVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: `
          bg-gray-800 hover:bg-gray-700 text-gray-200
          data-[state=on]:bg-gray-700 data-[state=on]:text-white
          data-[state=on]:shadow-inner data-[state=on]:ring-1
          data-[state=on]:ring-gray-500/30
          border border-gray-700
        `,
        elegant: `
          bg-gray-900 hover:bg-gray-800 text-gray-300
          data-[state=on]:bg-gradient-to-br data-[state=on]:from-gray-800 data-[state=on]:to-gray-900
          data-[state=on]:text-white data-[state=on]:shadow-lg
          data-[state=on]:border-gray-600 data-[state=on]:ring-1
          data-[state=on]:ring-gray-400/20
          border border-gray-800
        `,
        glow: `
          bg-gray-900 text-gray-400 hover:text-gray-300
          data-[state=on]:text-white data-[state=on]:bg-gray-800
          data-[state=on]:shadow-glow data-[state=on]:shadow-blue-500/20
          border border-gray-800
          relative overflow-hidden
          data-[state=on]:before:absolute data-[state=on]:before:inset-0
          data-[state=on]:before:bg-blue-500/10 data-[state=on]:before:animate-[pulse_3s_infinite]
        `
      },
      size: {
        default: "h-9 px-3",
        sm: "h-8 px-2 text-xs",
        lg: "h-10 px-4",
        icon: "h-9 w-9"
      },
    },
    defaultVariants: {
      variant: "elegant",
      size: "default",
    },
  }
)

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size, className }))}
    {...props}
  />
))

Toggle.displayName = TogglePrimitive.Root.displayName

export { Toggle, toggleVariants }
