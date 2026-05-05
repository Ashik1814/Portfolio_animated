/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * CRT Flicker Overlay – hardware-refresh visual transition
 *
 * Runs a 3-phase sequence on route change:
 * Phase 1 (0-200ms):   Scanline pulse – 2px white/cyan horizontal line sweeps
 * Phase 2 (200-400ms): Film grain/static overlay obscures content swap
 * Phase 3 (400-450ms): Content glitch – brief horizontal offset before snap
 */
export function CrtFlicker() {
  const [phase, setPhase] = useState<0 | 1 | 2 | 3>(0);
  const [active, setActive] = useState(false);
  const pathname = usePathname();

  // Trigger flicker sequence when pathname changes
  useEffect(() => {
    setActive(true);
    setPhase(1);

    const t2 = setTimeout(() => setPhase(2), 200);
    const t3 = setTimeout(() => setPhase(3), 400);
    const t4 = setTimeout(() => {
      setPhase(0);
      setActive(false);
    }, 450);

    return () => {
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  if (!active && phase === 0) {
    return null;
  }

  return (
    <div className="crt-flicker-overlay">
      {/* Phase 1: Scanline Pulse */}
      <div className={`scanline-pulse ${phase >= 1 ? "active" : ""}`} />

      {/* Phase 2: Film Grain / Digital Noise */}
      <div className={`film-grain ${phase >= 2 ? "active" : ""}`} />

      {/* Phase 3: Content Glitch Offset */}
      <div className={`content-glitch ${phase >= 3 ? "active" : ""}`} />
    </div>
  );
}

