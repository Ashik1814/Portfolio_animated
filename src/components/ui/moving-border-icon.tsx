"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface MovingBorderIconProps extends React.ComponentProps<"div"> {
  /** Border radius CSS value. Defaults to "9999px" (circle). */
  borderRadius?: string;
  /** Duration of the main rotation in seconds. Defaults to 4. */
  duration?: number;
  /** Custom background for the inner content area. Defaults to near-opaque theme background. */
  innerBackground?: string;
}

export function MovingBorderIcon({
  children,
  className,
  borderRadius = "9999px",
  duration = 4,
  innerBackground,
  ...props
}: MovingBorderIconProps) {
  const [isDark, setIsDark] = useState(true);

  // Track theme
  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains("dark"));
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const bg = innerBackground ?? (isDark ? "rgba(8, 5, 15, 0.92)" : "rgba(248, 249, 252, 0.94)");

  // Smaller arcs than CardSpotlight for subtle icon borders
  const borderGradient = isDark
    ? "conic-gradient(from 0deg, transparent 0%, #00e5ff 5%, #a78bfa 10%, #2dd4bf 14%, transparent 18%)"
    : "conic-gradient(from 0deg, transparent 0%, #00a8cc 5%, #7c3aed 10%, #14b8a6 14%, transparent 18%)";

  const borderGradient2 = isDark
    ? "conic-gradient(from 180deg, transparent 0%, #d946ef 3%, #f472b6 6%, transparent 9%)"
    : "conic-gradient(from 180deg, transparent 0%, #c026d3 3%, #e879a8 6%, transparent 9%)";

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
