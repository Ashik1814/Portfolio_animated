"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { useIsDark } from "@/hooks/use-is-dark";

interface MovingBorderButtonProps extends React.ComponentProps<"button"> {
  /** Border radius CSS value. Defaults to "1.75rem". */
  borderRadius?: string;
  /** Duration of the border rotation in seconds. Defaults to 4. */
  duration?: number;
  /** Container class for the outer wrapper */
  containerClassName?: string;
  /** Whether to use the moving border effect. Defaults to true. */
  as?: React.ElementType;
}

/**
 * Aceternity-style moving border button.
 * A spinning conic-gradient creates a traveling light effect around the button border,
 * similar to the CardSpotlight and MovingBorderIcon components.
 *
 * Usage:
 * ```tsx
 * <MovingBorderButton
 *   borderRadius="1.75rem"
 *   className="bg-white dark:bg-slate-900 text-black dark:text-white"
 * >
 *   Borders are cool
 * </MovingBorderButton>
 * ```
 */
export function MovingBorderButton({
  children,
  className,
  containerClassName,
  borderRadius = "1.75rem",
  duration = 4,
  as: Component = "button",
  ...props
}: MovingBorderButtonProps) {
  const isDark = useIsDark();

  // Theme-aware neon gradient arcs
  const borderGradient = isDark
    ? "conic-gradient(from 0deg, transparent 0%, #00e5ff 8%, #a78bfa 16%, #2dd4bf 22%, transparent 28%)"
    : "conic-gradient(from 0deg, transparent 0%, #00a8cc 8%, #7c3aed 16%, #14b8a6 22%, transparent 28%)";

  const borderGradient2 = isDark
    ? "conic-gradient(from 180deg, transparent 0%, #d946ef 4%, #f472b6 8%, transparent 12%)"
    : "conic-gradient(from 180deg, transparent 0%, #c026d3 4%, #e879a8 8%, transparent 12%)";

  return (
    <Component
      className={cn(
        "relative overflow-hidden p-[1.5px] shrink-0",
        containerClassName
      )}
      style={{ borderRadius }}
      {...props}
    >
      {/* Spinning gradient #1 — main arc */}
      <div
        className="absolute"
        style={{
          inset: "-200%",
          background: borderGradient,
          animation: `card-border-rotate ${duration}s linear infinite`,
          willChange: "transform",
        }}
      />
      {/* Spinning gradient #2 — accent arc, reverse */}
      <div
        className="absolute"
        style={{
          inset: "-200%",
          background: borderGradient2,
          animation: `card-border-rotate ${duration * 1.5}s linear infinite reverse`,
          willChange: "transform",
        }}
      />
      {/* Inner content — blocks gradient, leaves 1.5px border */}
      <span
        className={cn(
          "relative z-[1] flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all",
          className
        )}
        style={{
          borderRadius: `calc(${borderRadius} - 1.5px)`,
        }}
      >
        {children}
      </span>
    </Component>
  );
}
