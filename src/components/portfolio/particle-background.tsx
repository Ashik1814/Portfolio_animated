"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/* ──────────────────────────────────────────────
   Data Erosion Blueprint — Three.js
   • 5000 data-point particles with life cycle
   • Healthy → smooth directional flow (cyan)
   • Eroding → jitter / fragment (amber → red)
   • Dead → respawn at random edge
   • Mouse: attract nearby, repel on proximity
   • Subtle connection mesh between close particles
   ────────────────────────────────────────────── */

const PARTICLE_COUNT = 5000;
const CONNECTION_DISTANCE = 1.2;
const MAX_CONNECTIONS = 300;
const MOUSE_ATTRACT_RADIUS = 4.0;
const MOUSE_REPEL_RADIUS = 0.8;
const MOUSE_ATTRACT_FORCE = 0.004;
const MOUSE_REPEL_FORCE = 0.02;

export function ParticleBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    /* ── Scene ── */
    const scene = new THREE.Scene();

    /* ── Camera ── */
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      50,
    );
    camera.position.set(0, 0, 8);

    /* ── Renderer ── */
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    /* ── Particle Data ── */
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const velocities = new Float32Array(PARTICLE_COUNT * 3);
    const life = new Float32Array(PARTICLE_COUNT);
    const aLife = new Float32Array(PARTICLE_COUNT); // for shader

    const BOUNDS_X = 10;
    const BOUNDS_Y = 7;
    const BOUNDS_Z = 4;

    function randomPosition(i3: number) {
      positions[i3] = (Math.random() - 0.5) * BOUNDS_X * 2;
      positions[i3 + 1] = (Math.random() - 0.5) * BOUNDS_Y * 2;
      positions[i3 + 2] = (Math.random() - 0.5) * BOUNDS_Z * 2;
    }

    function randomVelocity(i3: number) {
      velocities[i3] = (Math.random() - 0.3) * 0.008; // bias rightward
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.004;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.002;
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      randomPosition(i3);
      randomVelocity(i3);
      life[i] = Math.random(); // stagger initial life
      aLife[i] = life[i];
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("aLife", new THREE.BufferAttribute(aLife, 1));

    /* ── Particle Shader ── */
    const particleMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uPixelRatio: { value: renderer.getPixelRatio() },
        uTime: { value: 0 },
      },
      vertexShader: `
        attribute float aLife;
        uniform float uPixelRatio;
        uniform float uTime;
        varying float vLife;
        varying float vDist;

        void main() {
          vLife = aLife;
          vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
          vDist = -mvPos.z;

          // Size: healthy particles are small & clean; eroding ones flicker larger
          float baseSize = 2.0;
          float erosionPulse = (1.0 - aLife) * sin(uTime * 12.0 + position.x * 5.0) * 2.0;
          float s = baseSize + max(erosionPulse, 0.0);

          gl_PointSize = s * uPixelRatio * (5.0 / vDist);
          gl_PointSize = clamp(gl_PointSize, 0.5, 8.0);
          gl_Position = projectionMatrix * mvPos;
        }
      `,
      fragmentShader: `
        varying float vLife;
        varying float vDist;

        void main() {
          float d = length(gl_PointCoord - vec2(0.5));
          if (d > 0.5) discard;

          float glow = 1.0 - smoothstep(0.0, 0.5, d);
          glow = pow(glow, 2.0);

          // Color based on life: healthy=cyan → eroding=amber → dying=dim red
          vec3 healthy = vec3(0.0, 0.9, 1.0);     // #00e5ff
          vec3 eroding = vec3(1.0, 0.75, 0.0);     // amber
          vec3 dying   = vec3(0.6, 0.1, 0.1);      // dim red

          vec3 col;
          if (vLife > 0.5) {
            col = mix(eroding, healthy, (vLife - 0.5) * 2.0);
          } else {
            col = mix(dying, eroding, vLife * 2.0);
          }

          float alpha = glow * smoothstep(12.0, 3.0, vDist) * (0.3 + vLife * 0.5);
          gl_FragColor = vec4(col, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(geometry, particleMaterial);
    scene.add(particleSystem);

    /* ── Connection Lines ── */
    const linePositions = new Float32Array(MAX_CONNECTIONS * 6);
    const lineColors = new Float32Array(MAX_CONNECTIONS * 6);
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(linePositions, 3),
    );
    lineGeometry.setAttribute("color", new THREE.BufferAttribute(lineColors, 3));
    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const lineSystem = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineSystem);

    /* ── Mouse Tracking ── */
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    const handleMouseLeave = () => {
      mouseRef.current.x = -10; // move far away
      mouseRef.current.y = -10;
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    /* ── Resize ── */
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      particleMaterial.uniforms.uPixelRatio.value = renderer.getPixelRatio();
    };
    window.addEventListener("resize", handleResize);

    /* ── Spatial Grid for connections (simple bucket) ── */
    const GRID_SIZE = 1.5;
    const gridMap = new Map<string, number[]>();

    function gridKey(x: number, y: number): string {
      return `${Math.floor(x / GRID_SIZE)},${Math.floor(y / GRID_SIZE)}`;
    }

    function buildGrid() {
      gridMap.clear();
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const i3 = i * 3;
        const key = gridKey(positions[i3], positions[i3 + 1]);
        let bucket = gridMap.get(key);
        if (!bucket) {
          bucket = [];
          gridMap.set(key, bucket);
        }
        bucket.push(i);
      }
    }

    function getNeighborIndices(x: number, y: number): number[] {
      const result: number[] = [];
      const gx = Math.floor(x / GRID_SIZE);
      const gy = Math.floor(y / GRID_SIZE);
      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          const bucket = gridMap.get(`${gx + dx},${gy + dy}`);
          if (bucket) {
            for (const idx of bucket) result.push(idx);
          }
        }
      }
      return result;
    }

    /* ── Animation Loop ── */
    const clock = new THREE.Clock();
    let frameCount = 0;

    const animate = () => {
      rafRef.current = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();
      const dt = Math.min(clock.getDelta(), 0.05);
      frameCount++;

      const mouse = mouseRef.current;
      const mouseWorld = new THREE.Vector3(mouse.x * BOUNDS_X * 0.5, mouse.y * BOUNDS_Y * 0.5, 0);

      const posAttr = geometry.getAttribute("position");
      const lifeAttr = geometry.getAttribute("aLife");

      /* ── Update Particles ── */
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const i3 = i * 3;

        // Drain life
        const drainRate = 0.001 + Math.sin(elapsed * 0.5 + i * 0.1) * 0.0003;
        life[i] -= drainRate;

        if (life[i] <= 0) {
          // EROSION: jitter the dying particle
          positions[i3] += (Math.random() - 0.5) * 0.04;
          positions[i3 + 1] += (Math.random() - 0.5) * 0.04;
          positions[i3 + 2] += (Math.random() - 0.5) * 0.02;

          // Respawn when deeply dead
          if (life[i] < -0.5) {
            life[i] = 1.0;
            // Respawn at left edge for directional flow
            positions[i3] = -BOUNDS_X + Math.random() * 2;
            positions[i3 + 1] = (Math.random() - 0.5) * BOUNDS_Y * 2;
            positions[i3 + 2] = (Math.random() - 0.5) * BOUNDS_Z;
            randomVelocity(i3);
          }
        } else {
          // HEALTHY: smooth linear flow
          positions[i3] += velocities[i3];
          positions[i3 + 1] += velocities[i3 + 1] + Math.sin(elapsed * 0.3 + i * 0.01) * 0.001;
          positions[i3 + 2] += velocities[i3 + 2];
        }

        // ── Mouse Interaction ──
        const dx = positions[i3] - mouseWorld.x;
        const dy = positions[i3 + 1] - mouseWorld.y;
        const dz = positions[i3 + 2] - mouseWorld.z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < MOUSE_ATTRACT_RADIUS && dist > MOUSE_REPEL_RADIUS) {
          // Attract: pull toward cursor
          const force = MOUSE_ATTRACT_FORCE * (1.0 - dist / MOUSE_ATTRACT_RADIUS);
          positions[i3] -= dx * force;
          positions[i3 + 1] -= dy * force;
          positions[i3 + 2] -= dz * force * 0.3;
          // Revive nearby particles (mouse "heals" data)
          life[i] = Math.min(life[i] + 0.005, 1.0);
        } else if (dist <= MOUSE_REPEL_RADIUS && dist > 0.01) {
          // Repel: push away from cursor on very close approach
          const force = MOUSE_REPEL_FORCE * (1.0 - dist / MOUSE_REPEL_RADIUS);
          positions[i3] += (dx / dist) * force;
          positions[i3 + 1] += (dy / dist) * force;
          positions[i3 + 2] += (dz / dist) * force * 0.3;
        }

        // Wrap boundaries
        if (positions[i3] > BOUNDS_X) { positions[i3] = -BOUNDS_X; }
        if (positions[i3] < -BOUNDS_X) { positions[i3] = BOUNDS_X; }
        if (positions[i3 + 1] > BOUNDS_Y) { positions[i3 + 1] = -BOUNDS_Y; }
        if (positions[i3 + 1] < -BOUNDS_Y) { positions[i3 + 1] = BOUNDS_Y; }
        if (positions[i3 + 2] > BOUNDS_Z) { positions[i3 + 2] = -BOUNDS_Z; }
        if (positions[i3 + 2] < -BOUNDS_Z) { positions[i3 + 2] = BOUNDS_Z; }

        aLife[i] = Math.max(life[i], 0);
      }

      posAttr.needsUpdate = true;
      lifeAttr.needsUpdate = true;
      particleMaterial.uniforms.uTime.value = elapsed;

      /* ── Connection Lines (update every 2 frames for perf) ── */
      if (frameCount % 2 === 0) {
        buildGrid();
        const linePosAttr = lineGeometry.getAttribute("position");
        const lineColAttr = lineGeometry.getAttribute("color");
        const lArr = linePosAttr.array as Float32Array;
        const cArr = lineColAttr.array as Float32Array;
        let lineIdx = 0;

        for (let i = 0; i < PARTICLE_COUNT && lineIdx < MAX_CONNECTIONS; i++) {
          const i3 = i * 3;
          if (life[i] < 0.3) continue; // skip dying particles

          const neighbors = getNeighborIndices(positions[i3], positions[i3 + 1]);
          for (const j of neighbors) {
            if (j <= i || lineIdx >= MAX_CONNECTIONS) break;
            if (life[j] < 0.3) continue;

            const j3 = j * 3;
            const dx = positions[i3] - positions[j3];
            const dy = positions[i3 + 1] - positions[j3 + 1];
            const dz = positions[i3 + 2] - positions[j3 + 2];
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

            if (dist < CONNECTION_DISTANCE) {
              const li = lineIdx * 6;
              lArr[li] = positions[i3];
              lArr[li + 1] = positions[i3 + 1];
              lArr[li + 2] = positions[i3 + 2];
              lArr[li + 3] = positions[j3];
              lArr[li + 4] = positions[j3 + 1];
              lArr[li + 5] = positions[j3 + 2];

              // Color: blend cyan based on life
              const avgLife = (life[i] + life[j]) * 0.5;
              const r = avgLife > 0.5 ? 0.0 : 0.4 * (1.0 - avgLife * 2.0);
              const g = avgLife * 0.56;
              const b = avgLife * 0.63;
              cArr[li] = r; cArr[li + 1] = g; cArr[li + 2] = b;
              cArr[li + 3] = r; cArr[li + 4] = g; cArr[li + 5] = b;

              lineIdx++;
            }
          }
        }

        // Zero out unused
        for (let i = lineIdx * 6; i < MAX_CONNECTIONS * 6; i++) {
          lArr[i] = 0;
          cArr[i] = 0;
        }
        linePosAttr.needsUpdate = true;
        lineColAttr.needsUpdate = true;
        lineGeometry.setDrawRange(0, lineIdx * 2);
      }

      /* ── Subtle camera sway ── */
      camera.position.x = Math.sin(elapsed * 0.1) * 0.2;
      camera.position.y = Math.cos(elapsed * 0.08) * 0.15;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    /* ── Cleanup ── */
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);

      geometry.dispose();
      particleMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0"
      style={{ background: "#06080f" }}
    />
  );
}
