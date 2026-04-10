"use client";

import { type VariantProps } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";

/* Size-only extraction from buttonVariants so we don't get conflicting
   variant backgrounds (bg-primary, hover:bg-accent, etc.) that fight
   with custom className styling. */
const sizeOnly = (size: VariantProps<typeof buttonVariants>["size"]) => {
  const full = buttonVariants({ size });
  // buttonVariants always outputs: base + variant + size
  // We keep the base (flex, whitespace, etc.) and size (h-9, px-4, etc.)
  // but discard variant-specific bg/text/shadow/hover classes.
  // Easiest approach: generate with a neutral variant and no variant classes.
  return buttonVariants({ variant: "ghost", size, className: "" });
};

interface AnimatedBorderButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  /** Gradient colors for the animated border. Defaults to primary. */
  gradientFrom?: string;
  gradientVia?: string;
  gradientTo?: string;
  /** Animation duration in seconds. Defaults to 5. */
  duration?: number;
  /** Size of the traveling light dot. Defaults to 20. */
  dotSize?: number;
}

function AnimatedBorderOverlay({
  gradientFrom,
  gradientVia,
  gradientTo,
  duration,
  dotSize,
}: {
  gradientFrom: string;
  gradientVia: string;
  gradientTo: string;
  duration: number;
  dotSize: number;
}) {
  return (
    <div
      className={cn(
        "-inset-px pointer-events-none absolute rounded-[inherit] border-2 border-transparent border-inset [mask-clip:padding-box,border-box]",
        "[mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]"
      )}
    >
      <motion.div
        className="absolute aspect-square"
        style={{
          width: dotSize,
          background: `linear-gradient(to right, ${gradientFrom}, ${gradientVia}, ${gradientTo})`,
          offsetPath: `rect(0 auto auto 0 round ${dotSize}px)`,
        }}
        animate={{
          offsetDistance: ["0%", "100%"],
        }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration,
          ease: "linear",
        }}
      />
    </div>
  );
}

export function AnimatedBorderButton({
  className,
  variant,
  size,
  asChild = false,
  children,
  gradientFrom = "transparent",
  gradientVia = "var(--primary)",
  gradientTo = "var(--primary)",
  duration = 5,
  dotSize = 20,
  ...props
}: AnimatedBorderButtonProps) {
  const overlay = (
    <AnimatedBorderOverlay
      gradientFrom={gradientFrom}
      gradientVia={gradientVia}
      gradientTo={gradientTo}
      duration={duration}
      dotSize={dotSize}
    />
  );

  /* Base button classes: layout + sizing only.
     All color/bg/hover styling comes from the consumer's className. */
  const baseClasses = cn(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all shrink-0 outline-none relative",
    sizeOnly(size),
    className
  );

  if (asChild && React.isValidElement(children)) {
    const child = React.Children.only(children) as React.ReactElement<Record<string, unknown>>;
    return React.cloneElement(child, {
      className: cn(
        baseClasses,
        (child.props as Record<string, unknown>).className as string | undefined
      ),
      ...props,
      children: (
        <>
          {overlay}
          {(child.props as Record<string, unknown>).children as React.ReactNode}
        </>
      ),
    });
  }

  return (
    <button
      data-slot="button"
      className={baseClasses}
      {...props}
    >
      {overlay}
      {children}
    </button>
  );
}
