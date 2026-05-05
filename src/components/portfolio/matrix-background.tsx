'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface Stream {
  x: number;
  y: number;
  speed: number;
  isPaused: boolean;
  chars: string[];
  writeHead: number;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  alpha: number;
}

const COLUMN_WIDTH = 14;
const FONT_SIZE = 14;
const FONT = `${FONT_SIZE}px 'Courier New', 'Courier', monospace`;
const COLOR_HEAD = '#ffffff';
const COLOR_TAIL = '#00d4aa';
const GLOW_BLUR = 12;
const BACKGROUND_COLOR = '#000000';
const TRAIL_ALPHA = 0.12;
const CHAR_SET = ['0', '1'];
const TAIL_ROWS = 10;
const SPEED_MIN = 0.6;
const SPEED_MAX = 1.2;

export function MatrixBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ripplesRef = useRef<Ripple[]>([]);
  const scrollVelocityRef = useRef(0);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Track scroll velocity for speed boost
    const handleScroll = () => {
      const currentY = window.scrollY;
      scrollVelocityRef.current = Math.abs(currentY - lastScrollYRef.current);
      lastScrollYRef.current = currentY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    const columnCount = Math.ceil(canvas.width / COLUMN_WIDTH);
    const lineHeight = FONT_SIZE + 2;
    const streams: Stream[] = Array.from({ length: columnCount }, (_, i) => ({
      x: i * COLUMN_WIDTH,
      y: Math.random() * -canvas.height * 0.3,
      speed: SPEED_MIN + Math.random() * (SPEED_MAX - SPEED_MIN),
      isPaused: false,
      chars: Array(TAIL_ROWS).fill('').map(() => CHAR_SET[Math.floor(Math.random() * CHAR_SET.length)]),
      writeHead: 0,
    }));

    // Click: toggle pause + 3 concentric ripples
    const handleClick = (e: MouseEvent) => {
      const colIndex = Math.floor(e.clientX / COLUMN_WIDTH);
      if (colIndex >= 0 && colIndex < streams.length) {
        streams[colIndex].isPaused = !streams[colIndex].isPaused;
      }
      // Add 3 ripples with different starting offsets for shockwave
      ripplesRef.current.push(
        { x: e.clientX, y: e.clientY, radius: 0, alpha: 0.95 },
        { x: e.clientX, y: e.clientY, radius: 20, alpha: 0.75 },
        { x: e.clientX, y: e.clientY, radius: 40, alpha: 0.55 }
      );
    };
    window.addEventListener('click', handleClick);

    let animationId: number;
    let scrollDecay = 0.92; // How quickly scroll boost fades

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;

      // Decay scroll velocity (smooth return to normal speed)
      scrollVelocityRef.current *= scrollDecay;
      if (scrollVelocityRef.current < 0.1) scrollVelocityRef.current = 0;

      // Calculate scroll speed multiplier (1x base, up to 3x boost)
      const scrollMultiplier = 1 + Math.min(scrollVelocityRef.current * 0.05, 2);

      // 1. Trail fade
      ctx.fillStyle = `rgba(0, 0, 0, ${TRAIL_ALPHA})`;
      ctx.fillRect(0, 0, width, height);

      // 2. Draw ripples (behind streams) — each expands independently
      for (let r = ripplesRef.current.length - 1; r >= 0; r--) {
        const ripple = ripplesRef.current[r];
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 212, 170, ${ripple.alpha})`;
        ctx.lineWidth = 2.5;
        ctx.stroke();
        ripple.radius += 3.5;
        ripple.alpha -= 0.018;
      }
      // Remove faded ripples
      ripplesRef.current = ripplesRef.current.filter((r) => r.alpha > 0);

      // 3. Draw streams
      ctx.font = FONT;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';

      for (let i = 0; i < streams.length; i++) {
        const stream = streams[i];
        if (stream.isPaused) continue;

        const centerX = stream.x + COLUMN_WIDTH / 2;

        // Advance write head (scaled by scroll for faster character changes)
        stream.writeHead += stream.speed * scrollMultiplier;

        if (stream.writeHead >= lineHeight) {
          const rowsPassed = Math.floor(stream.writeHead / lineHeight);
          if (rowsPassed >= 1 && rowsPassed <= TAIL_ROWS) {
            const rowIndex = TAIL_ROWS - rowsPassed;
            stream.chars[rowIndex] = CHAR_SET[Math.floor(Math.random() * CHAR_SET.length)];
          }
          stream.writeHead -= lineHeight;
        }

        // Draw rows
        for (let row = 0; row < TAIL_ROWS; row++) {
          const charY = stream.y - (TAIL_ROWS - 1 - row) * lineHeight;
          if (charY < -FONT_SIZE || charY > height + FONT_SIZE) continue;

          const char = stream.chars[row];
          const isHead = row === TAIL_ROWS - 1;

          if (isHead) {
            ctx.fillStyle = COLOR_HEAD;
            ctx.shadowColor = COLOR_TAIL;
            ctx.shadowBlur = GLOW_BLUR;
            ctx.fillText(char, centerX, charY);
            ctx.shadowBlur = 0;
          } else {
            const fade = Math.max(0.25, 1 - (TAIL_ROWS - row) / TAIL_ROWS);
            ctx.fillStyle = COLOR_TAIL;
            ctx.globalAlpha = fade * 0.85;
            ctx.fillText(char, centerX, charY);
            ctx.globalAlpha = 1;
          }
        }

        stream.y += stream.speed * scrollMultiplier;

        if (stream.y > height + lineHeight * TAIL_ROWS + 20) {
          stream.y = -lineHeight * 2;
          stream.writeHead = 0;
          stream.chars = Array(TAIL_ROWS).fill('').map(() => CHAR_SET[Math.floor(Math.random() * CHAR_SET.length)]);
        }
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      className="fixed inset-0 -z-10"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ backgroundColor: BACKGROUND_COLOR }}
      />
    </motion.div>
  );
}
