"use client";

import { cn } from "@/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";

interface CardSpotlightProps extends React.ComponentProps<"div"> {
  /** Spotlight radius in px. Defaults to 350. */
  radius?: number;
  /** Spotlight color in dark mode */
  color?: string;
  /** Spotlight color in light mode */
  colorLight?: string;
  /** Duration of the moving border rotation in seconds. Defaults to 6. */
  movingBorderDuration?: number;
  /** Whether to enable the moving border effect. Defaults to true. */
  enableMovingBorder?: boolean;
}

export function CardSpotlight({
  children,
  className,
  radius = 350,
  color,
  colorLight,
  movingBorderDuration = 6,
  enableMovingBorder = true,
  ...props
}: CardSpotlightProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [isDark, setIsDark] = useState(true);

  // Track theme
  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains("dark"));
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const spotlightColor = color ?? (isDark ? "rgba(0,229,255,0.12)" : "rgba(0,168,204,0.08)");
  const spotlightColorLight = colorLight ?? "rgba(0,168,204,0.08)";

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!divRef.current) return;
      const rect = divRef.current.getBoundingClientRect();
      setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    },
    []
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (!divRef.current || !e.touches[0]) return;
      const rect = divRef.current.getBoundingClientRect();
      setPosition({ x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top });
    },
    []
  );

  // Spotlight overlay element
  const spotlightOverlay = (
    <div
      className="pointer-events-none absolute transition-opacity duration-300"
      style={{
        opacity,
        background: `radial-gradient(${radius}px circle at ${position.x}px ${position.y}px, ${isDark ? spotlightColor : spotlightColorLight}, transparent 70%)`,
      }}
    />
  );

  // Fallback: original behavior without moving border
  if (!enableMovingBorder) {
    return (
      <div
        ref={divRef}
        className={cn("relative overflow-hidden rounded-xl border", className)}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setOpacity(1)}
        onMouseLeave={() => setOpacity(0)}
        onTouchMove={handleTouchMove}
        onTouchStart={() => setOpacity(1)}
        onTouchEnd={() => setOpacity(0)}
        {...props}
      >
        {spotlightOverlay}
        <div className="relative z-10">{children}</div>
      </div>
    );
  }

  // Moving border gradients — theme-aware neon colors
  const borderGradient = isDark
    ? "conic-gradient(from 0deg, transparent 0%, #00e5ff 10%, #a78bfa 20%, #2dd4bf 30%, transparent 40%)"
    : "conic-gradient(from 0deg, transparent 0%, #00a8cc 10%, #7c3aed 20%, #14b8a6 30%, transparent 40%)";

  const borderGradient2 = isDark
    ? "conic-gradient(from 180deg, transparent 0%, #d946ef 5%, #f472b6 10%, transparent 15%)"
    : "conic-gradient(from 180deg, transparent 0%, #c026d3 5%, #e879a8 10%, transparent 15%)";

  return (
    <div
      className="relative overflow-hidden rounded-[1rem] p-[1px]"
      {...props}
    >
      {/* Moving border: spinning gradient #1 (main arc) */}
      <div
        className="absolute"
        style={{
          inset: "-100%",
          background: borderGradient,
          animation: `card-border-rotate ${movingBorderDuration}s linear infinite`,
        }}
      />
      {/* Moving border: spinning gradient #2 (smaller accent arc, reverse direction) */}
      <div
        className="absolute"
        style={{
          inset: "-100%",
          background: borderGradient2,
          animation: `card-border-rotate ${movingBorderDuration * 1.5}s linear infinite reverse`,
        }}
      />
      {/* Inner card content — covers gradient center, leaves 1px border visible */}
      <div
        ref={divRef}
        className={cn("relative z-[1] h-full w-full overflow-hidden", className)}
        style={{
          borderRadius: "calc(1rem - 1px)",
          border: "none",
          // Override semi-transparent glass backgrounds with near-opaque fill
          // so the spinning gradient only shows through the 1px border gap
          background: isDark
            ? "rgba(8, 5, 15, 0.92)"
            : "rgba(248, 249, 252, 0.94)",
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setOpacity(1)}
        onMouseLeave={() => setOpacity(0)}
        onTouchMove={handleTouchMove}
        onTouchStart={() => setOpacity(1)}
        onTouchEnd={() => setOpacity(0)}
      >
        {spotlightOverlay}
        <div className="relative z-10">{children}</div>
      </div>
    </div>
  );
}
