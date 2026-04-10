"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";

interface AnimatedBorderButtonProps
  extends React.ComponentProps<typeof Button> {
  /** Gradient colors for the animated border. Defaults to primary. */
  gradientFrom?: string;
  gradientVia?: string;
  gradientTo?: string;
  /** Animation duration in seconds. Defaults to 5. */
  duration?: number;
  /** Size of the traveling light dot. Defaults to 20. */
  dotSize?: number;
}

export function AnimatedBorderButton({
  className,
  children,
  gradientFrom = "transparent",
  gradientVia = "var(--primary)",
  gradientTo = "var(--primary)",
  duration = 5,
  dotSize = 20,
  ...props
}: AnimatedBorderButtonProps) {
  return (
    <Button className={cn("relative", className)} {...props}>
      {/* Animated border overlay */}
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
      {children}
    </Button>
  );
}
