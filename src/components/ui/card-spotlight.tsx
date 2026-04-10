"use client";

import { cn } from "@/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";

interface CardSpotlightProps extends React.ComponentProps<"div"> {
  /** Spotlight radius in px. Defaults to 350. */
  radius?: number;
  /** Spotlight color — any CSS color. Defaults to rgba(0,229,255,0.12) for dark / rgba(0,168,204,0.08) for light. */
  color?: string;
  /** Spotlight color in light mode. Defaults to rgba(0,168,204,0.08). */
  colorLight?: string;
}

export function CardSpotlight({
  children,
  className,
  radius = 350,
  color,
  colorLight,
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

  return (
    <div
      ref={divRef}
      className={cn(
        "relative overflow-hidden rounded-xl border",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      onTouchMove={handleTouchMove}
      onTouchStart={() => setOpacity(1)}
      onTouchEnd={() => setOpacity(0)}
      {...props}
    >
      {/* Spotlight gradient overlay */}
      <div
        className="pointer-events-none absolute -z-0 transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(${radius}px circle at ${position.x}px ${position.y}px, ${isDark ? spotlightColor : spotlightColorLight}, transparent 70%)`,
        }}
      />
      {/* Content sits above the spotlight */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
