"use client";

import { buttonVariants, type VariantProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";

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

  if (asChild && React.isValidElement(children)) {
    // When asChild, clone the single child element and inject the overlay into it
    const child = React.Children.only(children) as React.ReactElement<Record<string, unknown>>;
    return React.cloneElement(child, {
      className: cn(
        buttonVariants({ variant, size }),
        "relative",
        className,
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
      className={cn(buttonVariants({ variant, size, className }), "relative")}
      {...props}
    >
      {overlay}
      {children}
    </button>
  );
}
