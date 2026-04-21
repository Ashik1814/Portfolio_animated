'use client';

import { cn } from '@/lib/utils';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useTheme } from 'next-themes';

type DottedSurfaceProps = Omit<React.ComponentProps<'div'>, 'ref'>;

export function DottedSurface({ className, ...props }: DottedSurfaceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    animationId: number;
    count: number;
  } | null>(null);
  const { theme } = useTheme();
  const themeRef = useRef(theme);

  // Keep themeRef in sync
  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    if (!containerRef.current) return;

    const SEPARATION = 150;
    const AMOUNTX = 40;
    const AMOUNTY = 60;
    const TOTAL = AMOUNTX * AMOUNTY;

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x08050f, 3500, 12000);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      12000,
    );
    camera.position.set(0, 355, 1220);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    containerRef.current.appendChild(renderer.domElement);

    // Store base X/Z positions (these never change)
    const baseX = new Float32Array(TOTAL);
    const baseZ = new Float32Array(TOTAL);

    // Velocity accumulators for smooth displacement
    const velX = new Float32Array(TOTAL);
    const velY = new Float32Array(TOTAL);
    const velZ = new Float32Array(TOTAL);

    // Current displacement from base position
    const dispX = new Float32Array(TOTAL);
    const dispY = new Float32Array(TOTAL);
    const dispZ = new Float32Array(TOTAL);

    // Create geometry for all particles
    const geometry = new THREE.BufferGeometry();
    const positions: number[] = [];
    const colors: number[] = [];
    const sizes: number[] = [];

    // Dark mode: INTENSE neon palette — ultra saturated, high luminance
    const darkPalette = {
      aR: 200 / 255, aG: 50 / 255,  aB: 255 / 255,   // electric violet  #c832ff
      bR: 255 / 255, bG: 0 / 255,   bB: 200 / 255,    // neon magenta     #ff00c8
      cR: 0 / 255,   cG: 255 / 255, cB: 255 / 255,    // blazing cyan     #00ffff
      dR: 120 / 255, dG: 80 / 255,  dB: 255 / 255,    // neon indigo      #7850ff
    };

    // Light mode: PUNCHY neon palette — high contrast against white
    const lightPalette = {
      aR: 220 / 255, aG: 0 / 255,   aB: 180 / 255,    // vivid magenta    #dc00b4
      bR: 255 / 255, bG: 40 / 255,  bB: 100 / 255,    // hot neon pink    #ff2864
      cR: 0 / 255,   cG: 200 / 255, cB: 255 / 255,    // electric sky     #00c8ff
      dR: 255 / 255, dG: 100 / 255, dB: 0 / 255,       // neon orange      #ff6400
    };

    let idx = 0;
    for (let ix = 0; ix < AMOUNTX; ix++) {
      for (let iy = 0; iy < AMOUNTY; iy++) {
        const x = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
        const y = 0;
        const z = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2;
        positions.push(x, y, z);
        baseX[idx] = x;
        baseZ[idx] = z;
        colors.push(0.6, 0.3, 0.8); // initial placeholder
        sizes.push(35); // base size
        idx++;
      }
    }

    geometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(positions, 3),
    );
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));

    // Custom shader material — INTENSE neon glow with multi-layered bloom
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uPixelRatio: { value: renderer.getPixelRatio() },
        uIsDark: { value: 1.0 },
      },
      vertexShader: `
        attribute float size;
        varying vec3 vColor;
        uniform float uPixelRatio;
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * uPixelRatio * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        uniform float uIsDark;
        void main() {
          float d = length(gl_PointCoord - vec2(0.5));
          if (d > 0.5) discard;

          // === Multi-layered neon glow ===
          // Blazing white-hot core
          float core = 1.0 - smoothstep(0.0, 0.08, d);
          // Bright inner neon glow
          float inner = 1.0 - smoothstep(0.0, 0.22, d);
          // Mid glow ring
          float mid = 1.0 - smoothstep(0.0, 0.35, d);
          // Wide outer glow halo
          float outer = 1.0 - smoothstep(0.02, 0.5, d);

          // Color layers — increasingly overbright toward center
          vec3 coreColor = vec3(1.0, 1.0, 1.0);              // pure white center
          vec3 innerColor = vColor * 4.0 + vec3(0.5);         // blazing neon
          vec3 midColor = vColor * 2.5;                        // bright colored glow
          vec3 outerColor = vColor * 1.2;                      // soft neon halo

          vec3 finalColor = core * coreColor
                          + (inner - core) * innerColor
                          + (mid - inner) * midColor
                          + (outer - mid) * outerColor;

          // Alpha — solid core, gradual fade
          float alpha = core * 1.0
                      + (inner - core) * 0.95
                      + (mid - inner) * 0.7
                      + (outer - mid) * 0.4;

          // Boost alpha in light mode for visibility
          if (uIsDark < 0.5) {
            alpha = core * 1.0
                  + (inner - core) * 1.0
                  + (mid - inner) * 0.85
                  + (outer - mid) * 0.6;
          }

          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
      transparent: true,
      vertexColors: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Raycaster for accurate mouse-to-world mapping
    const raycaster = new THREE.Raycaster();
    const mouseNdc = new THREE.Vector2();
    const mousePlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    const mouseWorldPos = new THREE.Vector3(-9999, 0, -9999);

    let count = 0;
    let animationId: number = 0;

    // Helper: bilinear interpolation between 4 palette corners with flowing animation
    function colorAt(
      fx: number,
      fy: number,
      timeShift: number,
      palette: typeof darkPalette,
    ): [number, number, number] {
      const sfx = (fx + Math.sin(timeShift) * 0.2 + 1) % 1;
      const sfy = (fy + Math.cos(timeShift * 0.7) * 0.15 + 1) % 1;

      const r = palette.aR * (1 - sfx) * (1 - sfy)
              + palette.bR * sfx * (1 - sfy)
              + palette.cR * (1 - sfx) * sfy
              + palette.dR * sfx * sfy;
      const g = palette.aG * (1 - sfx) * (1 - sfy)
              + palette.bG * sfx * (1 - sfy)
              + palette.cG * (1 - sfx) * sfy
              + palette.dG * sfx * sfy;
      const b = palette.aB * (1 - sfx) * (1 - sfy)
              + palette.bB * sfx * (1 - sfy)
              + palette.cB * (1 - sfx) * sfy
              + palette.dB * sfx * sfy;
      return [r, g, b];
    }

    // Animation function
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      const posAttr = geometry.attributes.position;
      const posArr = posAttr.array as Float32Array;
      const colAttr = geometry.attributes.color;
      const colArr = colAttr.array as Float32Array;
      const sizeAttr = geometry.attributes.size;
      const sizeArr = sizeAttr.array as Float32Array;

      // Determine current theme
      const isDark = themeRef.current === 'dark';

      // Update uniforms
      material.uniforms.uIsDark.value = isDark ? 1.0 : 0.0;

      // Update fog to match page background
      const fogColor = isDark ? 0x08050f : 0xf8f9fc;
      scene.fog = new THREE.Fog(fogColor, 3500, 12000);

      // Always use AdditiveBlending for neon glow
      material.blending = THREE.AdditiveBlending;

      // Base sizes — MUCH larger for visibility
      const baseSize = isDark ? 35 : 48;

      // Highlight colors near cursor — even more intense
      const highlightR = isDark ? 1.0 : 1.0;
      const highlightG = isDark ? 1.0 : 0.85;
      const highlightB = isDark ? 1.0 : 1.0;

      // Convert mouse screen position to world coordinates using raycasting
      const mouse = mouseRef.current;
      if (mouse.x > -1000) {
        mouseNdc.x = (mouse.x / window.innerWidth) * 2 - 1;
        mouseNdc.y = -(mouse.y / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouseNdc, camera);
        raycaster.ray.intersectPlane(mousePlane, mouseWorldPos);
      } else {
        mouseWorldPos.set(-9999, 0, -9999);
      }

      const mwx = mouseWorldPos.x;
      const mwz = mouseWorldPos.z;

      // Detect touch device — use much stronger interaction for fat-finger touch
      const isTouchDevice = 'ontouchstart' in window;
      const MOUSE_RADIUS = isTouchDevice ? 1800 : 1200;
      const MOUSE_PUSH_STRENGTH = isTouchDevice ? 12.0 : 6.0;
      const MOUSE_UP_FORCE = isTouchDevice ? 8.0 : 4.5;
      const DAMPING = 0.86;
      const RETURN_FORCE = 0.03;

      let i = 0;
      for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
          const index = i * 3;

          // Base wave animation
          const waveY =
            Math.sin((ix + count) * 0.3) * 50 +
            Math.sin((iy + count) * 0.5) * 50;

          // Current world position of this dot (base + displacement)
          const wx = baseX[i] + dispX[i];
          const wz = baseZ[i] + dispZ[i];

          // Distance from mouse on the XZ plane
          const dx = wx - mwx;
          const dz = wz - mwz;
          const dist = Math.sqrt(dx * dx + dz * dz);

          // Determine base color for this particle — flowing gradient for BOTH modes
          const fx = ix / (AMOUNTX - 1);
          const fy = iy / (AMOUNTY - 1);
          const palette = isDark ? darkPalette : lightPalette;
          const [bR, bG, bB] = colorAt(fx, fy, count * 0.08, palette);

          // Current target size
          let targetSize = baseSize;

          // Mouse repulsion force
          if (dist < MOUSE_RADIUS && dist > 1) {
            const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
            const forceSq = force * force;

            // Push away from mouse in XZ plane
            const dirX = dx / dist;
            const dirZ = dz / dist;

            velX[i] += dirX * forceSq * MOUSE_PUSH_STRENGTH;
            velZ[i] += dirZ * forceSq * MOUSE_PUSH_STRENGTH;
            // Push upward
            velY[i] += forceSq * MOUSE_UP_FORCE;

            // Brighten dots near mouse — lerp toward highlight color
            const t = forceSq;
            colArr[index] = bR + t * (highlightR - bR);
            colArr[index + 1] = bG + t * (highlightG - bG);
            colArr[index + 2] = bB + t * (highlightB - bB);

            // Grow dots near mouse even MORE — bigger boost on touch
            const sizeBoost = isTouchDevice ? (isDark ? 55 : 65) : (isDark ? 35 : 45);
            targetSize = baseSize + forceSq * sizeBoost;
          } else {
            // Smoothly fade back to base color
            colArr[index] += (bR - colArr[index]) * 0.06;
            colArr[index + 1] += (bG - colArr[index + 1]) * 0.06;
            colArr[index + 2] += (bB - colArr[index + 2]) * 0.06;
          }

          // Smoothly interpolate size
          sizeArr[i] += (targetSize - sizeArr[i]) * 0.1;

          // Spring force to return displacement to zero
          velX[i] += -dispX[i] * RETURN_FORCE;
          velY[i] += -dispY[i] * RETURN_FORCE;
          velZ[i] += -dispZ[i] * RETURN_FORCE;

          // Apply damping
          velX[i] *= DAMPING;
          velY[i] *= DAMPING;
          velZ[i] *= DAMPING;

          // Update displacement
          dispX[i] += velX[i];
          dispY[i] += velY[i];
          dispZ[i] += velZ[i];

          // Final position = base + wave + displacement
          posArr[index] = baseX[i] + dispX[i];
          posArr[index + 1] = waveY + dispY[i];
          posArr[index + 2] = baseZ[i] + dispZ[i];

          i++;
        }
      }

      posAttr.needsUpdate = true;
      colAttr.needsUpdate = true;
      sizeAttr.needsUpdate = true;

      renderer.render(scene, camera);
      count += 0.1;
    };

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const handleMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    // Touch tracking — map touch to the same mouseRef
    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) {
        mouseRef.current = { x: touch.clientX, y: touch.clientY };
      }
    };
    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) {
        mouseRef.current = { x: touch.clientX, y: touch.clientY };
      }
    };
    const handleTouchEnd = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      material.uniforms.uPixelRatio.value = renderer.getPixelRatio();
    };

    window.addEventListener('resize', handleResize);

    // Start animation
    animate();

    // Store references
    sceneRef.current = {
      scene,
      camera,
      renderer,
      animationId,
      count,
    };

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);

      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.animationId);

        sceneRef.current.scene.traverse((object) => {
          if (object instanceof THREE.Points) {
            object.geometry.dispose();
            if (Array.isArray(object.material)) {
              object.material.forEach((m) => m.dispose());
            } else {
              object.material.dispose();
            }
          }
        });

        sceneRef.current.renderer.dispose();

        if (containerRef.current && sceneRef.current.renderer.domElement) {
          containerRef.current.removeChild(
            sceneRef.current.renderer.domElement,
          );
        }
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn('pointer-events-none fixed inset-0 -z-1', className)}
      {...props}
    />
  );
}
