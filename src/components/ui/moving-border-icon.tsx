"use client";

import { cn } from "@/lib/utils";
import { useIsDark } from "@/hooks/use-is-dark";

interface MovingBorderIconProps extends React.ComponentProps<"div"> {
  /** Border radius CSS value. Defaults to "9999px" (circle). */
  borderRadius?: string;
  /** Duration of the main rotation in seconds. Defaults to 4. */
  duration?: number;
  /** Custom background for the inner content area. Defaults to opaque theme background. */
  innerBackground?: string;
  /** Use very muted gradient colors so the border animation is barely visible. Defaults to false. */
  subtle?: boolean;
}

export function MovingBorderIcon({
  children,
  className,
  borderRadius = "9999px",
  duration = 4,
  innerBackground,
  subtle = false,
  ...props
}: MovingBorderIconProps) {
  const isDark = useIsDark();

  const bg = innerBackground ?? (isDark ? "rgba(8, 5, 15, 1)" : "rgba(248, 249, 252, 1)");

  // Default: vivid neon arcs
  const defaultGradient1 = isDark
    ? "conic-gradient(from 0deg, transparent 0%, #00e5ff 5%, #a78bfa 10%, #2dd4bf 14%, transparent 18%)"
    : "conic-gradient(from 0deg, transparent 0%, #00a8cc 5%, #7c3aed 10%, #14b8a6 14%, transparent 18%)";

  const defaultGradient2 = isDark
    ? "conic-gradient(from 180deg, transparent 0%, #d946ef 3%, #f472b6 6%, transparent 9%)"
    : "conic-gradient(from 180deg, transparent 0%, #c026d3 3%, #e879a8 6%, transparent 9%)";

  // Subtle: very muted arcs — just a faint shimmer
  const subtleGradient1 = isDark
    ? "conic-gradient(from 0deg, transparent 0%, rgba(0,229,255,0.12) 5%, rgba(167,139,250,0.08) 10%, rgba(45,212,191,0.10) 14%, transparent 18%)"
    : "conic-gradient(from 0deg, transparent 0%, rgba(0,168,204,0.10) 5%, rgba(124,58,237,0.07) 10%, rgba(20,184,166,0.08) 14%, transparent 18%)";

  const subtleGradient2 = isDark
    ? "conic-gradient(from 180deg, transparent 0%, rgba(217,70,239,0.06) 3%, rgba(244,114,182,0.05) 6%, transparent 9%)"
    : "conic-gradient(from 180deg, transparent 0%, rgba(192,38,211,0.05) 3%, rgba(232,121,168,0.04) 6%, transparent 9%)";

  const borderGradient = subtle ? subtleGradient1 : defaultGradient1;
  const borderGradient2 = subtle ? subtleGradient2 : defaultGradient2;

  return (
    <div
      className="relative overflow-hidden p-[1px]"
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
      {/* Inner content — blocks gradient, leaves 1px border */}
      <div
        className={cn("relative z-[1] flex items-center justify-center", className)}
        style={{
          borderRadius: `calc(${borderRadius} - 1px)`,
          background: bg,
        }}
      >
        {children}
      </div>
    </div>
  );
}
