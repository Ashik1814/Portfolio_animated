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
    scene.fog = new THREE.Fog(0x08050f, 2000, 8000);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      10000,
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

    // Dark mode: uniform muted magenta base
    const darkBaseR = 0.55, darkBaseG = 0.25, darkBaseB = 0.65;

    // Light mode: vivid RGB gradient palette
    // Flowing rainbow gradient across the grid:
    //   Corner A (0,0) = vivid violet    rgb(139, 92, 246)  → #8b5cf6
    //   Corner B (1,0) = hot pink        rgb(236, 72, 153)  → #ec4899
    //   Corner C (0,1) = electric cyan   rgb(6, 182, 212)   → #06b6d4
    //   Corner D (1,1) = emerald green   rgb(16, 185, 129)  → #10b981
    //   Plus an intermediate orange-amber  rgb(245, 158, 11) → #f59e0b
    const lightPalette = {
      aR: 139 / 255, aG: 92 / 255, aB: 246 / 255,   // violet
      bR: 236 / 255, bG: 72 / 255, bB: 153 / 255,    // hot pink
      cR: 6 / 255,   cG: 182 / 255, cB: 212 / 255,   // cyan
      dR: 16 / 255,  dG: 185 / 255, dB: 129 / 255,   // emerald
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
        colors.push(darkBaseR, darkBaseG, darkBaseB);
        sizes.push(8); // base size
        idx++;
      }
    }

    geometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(positions, 3),
    );
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));

    // Custom shader material for variable point sizes
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uPixelRatio: { value: renderer.getPixelRatio() },
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
        void main() {
          // Soft circle shape
          float d = length(gl_PointCoord - vec2(0.5));
          if (d > 0.5) discard;
          float alpha = 1.0 - smoothstep(0.3, 0.5, d);
          gl_FragColor = vec4(vColor, alpha);
        }
      `,
      transparent: true,
      vertexColors: true,
      depthWrite: false,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Raycaster for accurate mouse-to-world mapping
    const raycaster = new THREE.Raycaster();
    const mouseNdc = new THREE.Vector2();
    const mousePlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    const mouseWorldPos = new THREE.Vector3(-9999, 0, -9999);

    let count = 0;
    let animationId: number;

    // Helper: bilinear interpolation between 4 palette corners
    function lightColorAt(
      fx: number, // 0..1 along X axis
      fy: number, // 0..1 along Y axis
      timeShift: number, // animated shift for flowing effect
    ): [number, number, number] {
      // Shift the gradient coordinates over time for a flowing effect
      const sfx = (fx + Math.sin(timeShift) * 0.2 + 1) % 1;
      const sfy = (fy + Math.cos(timeShift * 0.7) * 0.15 + 1) % 1;

      // Bilinear interpolation across 4 corners
      const r = lightPalette.aR * (1 - sfx) * (1 - sfy)
              + lightPalette.bR * sfx * (1 - sfy)
              + lightPalette.cR * (1 - sfx) * sfy
              + lightPalette.dR * sfx * sfy;
      const g = lightPalette.aG * (1 - sfx) * (1 - sfy)
              + lightPalette.bG * sfx * (1 - sfy)
              + lightPalette.cG * (1 - sfx) * sfy
              + lightPalette.dG * sfx * sfy;
      const b = lightPalette.aB * (1 - sfx) * (1 - sfy)
              + lightPalette.bB * sfx * (1 - sfy)
              + lightPalette.cB * (1 - sfx) * sfy
              + lightPalette.dB * sfx * sfy;
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
      const fogColor = isDark ? 0x08050f : 0xf8f9fc;
      scene.fog = new THREE.Fog(fogColor, 2000, 8000);

      // Dark mode base size, light mode gets bigger particles
      const baseSize = isDark ? 8 : 12;

      // Light mode highlight: shift to bright warm gold near cursor
      const highlightR = isDark ? 1.0 : 1.0;
      const highlightG = isDark ? 0.45 : 0.92;
      const highlightB = isDark ? 1.0 : 0.6;

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
      const MOUSE_RADIUS = 900;
      const MOUSE_PUSH_STRENGTH = 2.5;
      const MOUSE_UP_FORCE = 1.8;
      const DAMPING = 0.88;
      const RETURN_FORCE = 0.04;

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

          // Determine base color for this particle
          let bR: number, bG: number, bB: number;
          if (isDark) {
            bR = darkBaseR;
            bG = darkBaseG;
            bB = darkBaseB;
          } else {
            // Light mode: each particle gets a vivid gradient color based on its grid position
            const fx = ix / (AMOUNTX - 1);
            const fy = iy / (AMOUNTY - 1);
            [bR, bG, bB] = lightColorAt(fx, fy, count * 0.08);
          }

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

            // Grow dots near mouse
            targetSize = baseSize + forceSq * (isDark ? 6 : 10);
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

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

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
