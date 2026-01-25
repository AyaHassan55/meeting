import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "gradient-bg text-primary-foreground shadow-soft hover:shadow-elevated hover:-translate-y-0.5 active:translate-y-0",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border-2 border-primary/20 bg-transparent text-foreground hover:bg-primary/5 hover:border-primary/40",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent/10 hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        hero: "gradient-bg text-primary-foreground shadow-lg hover:shadow-xl hover:-translate-y-1 active:translate-y-0 text-base",
        "hero-outline": "border-2 border-foreground/20 bg-transparent text-foreground hover:bg-foreground/5 hover:border-foreground/40 text-base",
        accent: "gradient-accent-bg text-accent-foreground shadow-soft hover:shadow-elevated hover:-translate-y-0.5",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-9 rounded-lg px-4",
        lg: "h-12 rounded-xl px-8 text-base",
        xl: "h-14 rounded-2xl px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

  // "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  // {
  //   variants: {
  //     variant: {
  //       default: "gradient-bg text-primary-foreground shadow-soft hover:shadow-elevated hover:-translate-y-0.5 active:translate-y-0",
  //       destructive:
  //         "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
  //       outline:
  //         "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
  //       secondary:
  //         "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  //       ghost:
  //         "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
  //       link: "text-primary underline-offset-4 hover:underline",
  //     },
  //     size: {
  //       default: "h-9 px-4 py-2 has-[>svg]:px-3",
  //       xs: "h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
  //       sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
  //       lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
  //       icon: "size-9",
  //       "icon-xs": "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
  //       "icon-sm": "size-8",
  //       "icon-lg": "size-10",
  //     },
  //   },
  //   defaultVariants: {
  //     variant: "default",
  //     size: "default",
  //   },
  // }


function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size }), className)}
    
      {...props} />
  );
}

export { Button, buttonVariants }
