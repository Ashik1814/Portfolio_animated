"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/* ──────────────────────────────────────────────
   Nebula Flow — Three.js
   Inspired by gaseous nebula / cosmic smoke aesthetic

   Layer 1: Large soft gaseous blobs (deep teal/navy + magenta/pink)
   Layer 2: Medium flowing particles (cyan + pink drift)
   Layer 3: Fine glitter sparkles (white/cyan dots)
   Mouse: repulsion — particles flee from cursor
   ────────────────────────────────────────────── */

export function ParticleBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -10, y: -10 });
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const W = window.innerWidth;
    const H = window.innerHeight;

    /* ── Scene ── */
    const scene = new THREE.Scene();

    /* ── Camera ── */
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 100);
    camera.position.set(0, 0, 10);

    /* ── Renderer ── */
    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    /* ═══════════════════════════════════════
       Layer 1 — Gaseous Nebula Blobs
       Large, soft, slow-moving volumetric clouds
    ═══════════════════════════════════════ */
    const GAS_COUNT = 180;
    const gasPositions = new Float32Array(GAS_COUNT * 3);
    const gasSizes = new Float32Array(GAS_COUNT);
    const gasColorMix = new Float32Array(GAS_COUNT); // 0=teal, 1=pink
    const gasVelocities: { vx: number; vy: number; baseX: number; baseY: number; phase: number; ampX: number; ampY: number }[] = [];

    for (let i = 0; i < GAS_COUNT; i++) {
      const x = (Math.random() - 0.5) * 22;
      const y = (Math.random() - 0.5) * 16;
      const z = (Math.random() - 0.5) * 6 - 2;
      gasPositions[i * 3] = x;
      gasPositions[i * 3 + 1] = y;
      gasPositions[i * 3 + 2] = z;
      gasSizes[i] = 40 + Math.random() * 80; // big soft blobs
      gasColorMix[i] = Math.random();

      gasVelocities.push({
        vx: (Math.random() - 0.5) * 0.003,
        vy: (Math.random() - 0.3) * 0.002, // slight upward drift
        baseX: x,
        baseY: y,
        phase: Math.random() * Math.PI * 2,
        ampX: 0.3 + Math.random() * 0.8,
        ampY: 0.2 + Math.random() * 0.6,
      });
    }

    const gasGeo = new THREE.BufferGeometry();
    gasGeo.setAttribute("position", new THREE.BufferAttribute(gasPositions, 3));
    gasGeo.setAttribute("aSize", new THREE.BufferAttribute(gasSizes, 1));
    gasGeo.setAttribute("aColorMix", new THREE.BufferAttribute(gasColorMix, 1));

    const gasMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: renderer.getPixelRatio() },
        uMouse: { value: new THREE.Vector2(-10, -10) },
      },
      vertexShader: `
        attribute float aSize;
        attribute float aColorMix;
        uniform float uPixelRatio;
        uniform float uTime;
        uniform vec2 uMouse;
        varying float vColorMix;
        varying float vAlpha;

        void main() {
          vColorMix = aColorMix;
          vec3 p = position;

          // Mouse repulsion
          vec2 mouseWorld = uMouse * vec2(11.0, 8.0);
          float dist = distance(p.xy, mouseWorld);
          if (dist < 4.0 && dist > 0.01) {
            vec2 dir = normalize(p.xy - mouseWorld);
            float force = (4.0 - dist) / 4.0;
            force = force * force; // quadratic falloff
            p.xy += dir * force * 2.5;
          }

          vec4 mvPos = modelViewMatrix * vec4(p, 1.0);
          float depth = -mvPos.z;
          vAlpha = smoothstep(12.0, 4.0, depth) * 0.12;

          gl_PointSize = aSize * uPixelRatio * (6.0 / depth);
          gl_PointSize = clamp(gl_PointSize, 2.0, 200.0);
          gl_Position = projectionMatrix * mvPos;
        }
      `,
      fragmentShader: `
        varying float vColorMix;
        varying float vAlpha;

        void main() {
          float d = length(gl_PointCoord - vec2(0.5));
          if (d > 0.5) discard;

          // Ultra-soft gaussian falloff — gaseous look
          float glow = 1.0 - smoothstep(0.0, 0.5, d);
          glow = pow(glow, 3.0); // very soft edges

          // Deep teal/navy → vibrant magenta/pink
          vec3 teal = vec3(0.0, 0.35, 0.45);
          vec3 navy = vec3(0.04, 0.08, 0.22);
          vec3 pink = vec3(0.7, 0.15, 0.45);
          vec3 magenta = vec3(0.55, 0.05, 0.55);

          vec3 coolBase = mix(navy, teal, vColorMix * 0.6 + 0.2);
          vec3 warmAccent = mix(pink, magenta, vColorMix);
          vec3 col = mix(coolBase, warmAccent, vColorMix * 0.5);

          gl_FragColor = vec4(col, glow * vAlpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const gasPoints = new THREE.Points(gasGeo, gasMat);
    scene.add(gasPoints);

    /* ═══════════════════════════════════════
       Layer 2 — Medium Flowing Particles
       More defined, directional drift with color
    ═══════════════════════════════════════ */
    const FLOW_COUNT = 3000;
    const flowPositions = new Float32Array(FLOW_COUNT * 3);
    const flowSizes = new Float32Array(FLOW_COUNT);
    const flowColorMix = new Float32Array(FLOW_COUNT);
    const flowVels: number[] = [];

    for (let i = 0; i < FLOW_COUNT; i++) {
      const i3 = i * 3;
      flowPositions[i3] = (Math.random() - 0.5) * 22;
      flowPositions[i3 + 1] = (Math.random() - 0.5) * 16;
      flowPositions[i3 + 2] = (Math.random() - 0.5) * 8 - 1;
      flowSizes[i] = 1.5 + Math.random() * 3.0;
      flowColorMix[i] = Math.random();
      flowVels.push(
        (Math.random() - 0.3) * 0.006,
        (Math.random() - 0.5) * 0.004,
        (Math.random() - 0.5) * 0.001,
      );
    }

    const flowGeo = new THREE.BufferGeometry();
    flowGeo.setAttribute("position", new THREE.BufferAttribute(flowPositions, 3));
    flowGeo.setAttribute("aSize", new THREE.BufferAttribute(flowSizes, 1));
    flowGeo.setAttribute("aColorMix", new THREE.BufferAttribute(flowColorMix, 1));

    const flowMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: renderer.getPixelRatio() },
        uMouse: { value: new THREE.Vector2(-10, -10) },
      },
      vertexShader: `
        attribute float aSize;
        attribute float aColorMix;
        uniform float uPixelRatio;
        uniform float uTime;
        uniform vec2 uMouse;
        varying float vColorMix;
        varying float vAlpha;

        void main() {
          vColorMix = aColorMix;
          vec3 p = position;

          // Mouse repulsion — stronger for these particles
          vec2 mouseWorld = uMouse * vec2(11.0, 8.0);
          float dist = distance(p.xy, mouseWorld);
          float mouseInfluence = 0.0;
          if (dist < 3.5 && dist > 0.01) {
            vec2 dir = normalize(p.xy - mouseWorld);
            float force = (3.5 - dist) / 3.5;
            mouseInfluence = force;
            p.xy += dir * force * force * 2.0;
          }

          vec4 mvPos = modelViewMatrix * vec4(p, 1.0);
          float depth = -mvPos.z;
          vAlpha = smoothstep(14.0, 3.0, depth) * (0.3 + mouseInfluence * 0.4);

          float s = aSize;
          if (mouseInfluence > 0.1) s += mouseInfluence * 3.0; // glow near mouse

          gl_PointSize = s * uPixelRatio * (5.0 / depth);
          gl_PointSize = clamp(gl_PointSize, 0.5, 12.0);
          gl_Position = projectionMatrix * mvPos;
        }
      `,
      fragmentShader: `
        varying float vColorMix;
        varying float vAlpha;

        void main() {
          float d = length(gl_PointCoord - vec2(0.5));
          if (d > 0.5) discard;

          float glow = 1.0 - smoothstep(0.0, 0.5, d);
          glow = pow(glow, 1.5);

          // Cyan → pink/magenta range
          vec3 cyan = vec3(0.0, 0.9, 1.0);
          vec3 pink = vec3(0.9, 0.2, 0.55);
          vec3 blue = vec3(0.39, 0.71, 0.96);
          vec3 magenta = vec3(0.7, 0.1, 0.7);

          vec3 col;
          if (vColorMix < 0.5) {
            col = mix(cyan, blue, vColorMix * 2.0);
          } else {
            col = mix(blue, mix(pink, magenta, vColorMix), (vColorMix - 0.5) * 2.0);
          }

          // Bright core
          col = mix(col, vec3(1.0), glow * glow * 0.15);

          gl_FragColor = vec4(col, glow * vAlpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const flowPoints = new THREE.Points(flowGeo, flowMat);
    scene.add(flowPoints);

    /* ═══════════════════════════════════════
       Layer 3 — Fine Glitter Sparkles
       Tiny bright white/cyan dots
    ═══════════════════════════════════════ */
    const SPARKLE_COUNT = 1500;
    const sparklePositions = new Float32Array(SPARKLE_COUNT * 3);
    const sparkleSizes = new Float32Array(SPARKLE_COUNT);
    const sparklePhase = new Float32Array(SPARKLE_COUNT);

    for (let i = 0; i < SPARKLE_COUNT; i++) {
      const i3 = i * 3;
      sparklePositions[i3] = (Math.random() - 0.5) * 24;
      sparklePositions[i3 + 1] = (Math.random() - 0.5) * 18;
      sparklePositions[i3 + 2] = (Math.random() - 0.5) * 10;
      sparkleSizes[i] = 0.5 + Math.random() * 1.5;
      sparklePhase[i] = Math.random() * Math.PI * 2;
    }

    const sparkleGeo = new THREE.BufferGeometry();
    sparkleGeo.setAttribute("position", new THREE.BufferAttribute(sparklePositions, 3));
    sparkleGeo.setAttribute("aSize", new THREE.BufferAttribute(sparkleSizes, 1));
    sparkleGeo.setAttribute("aPhase", new THREE.BufferAttribute(sparklePhase, 1));

    const sparkleMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: renderer.getPixelRatio() },
        uMouse: { value: new THREE.Vector2(-10, -10) },
      },
      vertexShader: `
        attribute float aSize;
        attribute float aPhase;
        uniform float uPixelRatio;
        uniform float uTime;
        uniform vec2 uMouse;
        varying float vTwinkle;

        void main() {
          vec3 p = position;

          // Mouse repulsion
          vec2 mouseWorld = uMouse * vec2(12.0, 9.0);
          float dist = distance(p.xy, mouseWorld);
          if (dist < 3.0 && dist > 0.01) {
            vec2 dir = normalize(p.xy - mouseWorld);
            float force = (3.0 - dist) / 3.0;
            p.xy += dir * force * force * 1.5;
          }

          // Twinkle
          vTwinkle = 0.3 + 0.7 * abs(sin(uTime * 1.5 + aPhase));

          vec4 mvPos = modelViewMatrix * vec4(p, 1.0);
          float depth = -mvPos.z;
          gl_PointSize = aSize * uPixelRatio * (4.0 / depth);
          gl_PointSize = clamp(gl_PointSize, 0.3, 4.0);
          gl_Position = projectionMatrix * mvPos;
        }
      `,
      fragmentShader: `
        varying float vTwinkle;

        void main() {
          float d = length(gl_PointCoord - vec2(0.5));
          if (d > 0.5) discard;

          float glow = 1.0 - smoothstep(0.0, 0.5, d);
          glow = pow(glow, 2.0);

          // White with slight cyan tint
          vec3 col = vec3(0.85, 0.95, 1.0);

          gl_FragColor = vec4(col, glow * vTwinkle * 0.6);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const sparklePoints = new THREE.Points(sparkleGeo, sparkleMat);
    scene.add(sparklePoints);

    /* ── Mouse Tracking ── */
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    const handleMouseLeave = () => {
      mouseRef.current.x = -10;
      mouseRef.current.y = -10;
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    /* ── Resize ── */
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      const pr = renderer.getPixelRatio();
      gasMat.uniforms.uPixelRatio.value = pr;
      flowMat.uniforms.uPixelRatio.value = pr;
      sparkleMat.uniforms.uPixelRatio.value = pr;
    };
    window.addEventListener("resize", handleResize);

    /* ── Animation Loop ── */
    const clock = new THREE.Clock();

    const animate = () => {
      rafRef.current = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();
      const mouse = mouseRef.current;

      /* Update gas layer — gentle floating drift */
      const gasPos = gasGeo.getAttribute("position");
      const gasArr = gasPos.array as Float32Array;
      for (let i = 0; i < GAS_COUNT; i++) {
        const v = gasVelocities[i];
        const i3 = i * 3;
        gasArr[i3] = v.baseX + Math.sin(elapsed * 0.15 + v.phase) * v.ampX;
        gasArr[i3 + 1] = v.baseY + Math.cos(elapsed * 0.12 + v.phase * 1.3) * v.ampY;
        // Slow drift
        v.baseX += v.vx;
        v.baseY += v.vy;
        // Wrap
        if (v.baseX > 12) v.baseX = -12;
        if (v.baseX < -12) v.baseX = 12;
        if (v.baseY > 9) v.baseY = -9;
        if (v.baseY < -9) v.baseY = 9;
      }
      gasPos.needsUpdate = true;
      gasMat.uniforms.uTime.value = elapsed;
      gasMat.uniforms.uMouse.value.set(mouse.x, mouse.y);

      /* Update flow layer — directional flowing motion */
      const flowPos = flowGeo.getAttribute("position");
      const flowArr = flowPos.array as Float32Array;
      for (let i = 0; i < FLOW_COUNT; i++) {
        const i3 = i * 3;
        flowArr[i3] += flowVels[i3] + Math.sin(elapsed * 0.3 + i * 0.005) * 0.002;
        flowArr[i3 + 1] += flowVels[i3 + 1] + Math.cos(elapsed * 0.2 + i * 0.008) * 0.001;
        flowArr[i3 + 2] += flowVels[i3 + 2];
        // Wrap
        if (flowArr[i3] > 12) flowArr[i3] = -12;
        if (flowArr[i3] < -12) flowArr[i3] = 12;
        if (flowArr[i3 + 1] > 9) flowArr[i3 + 1] = -9;
        if (flowArr[i3 + 1] < -9) flowArr[i3 + 1] = 9;
        if (flowArr[i3 + 2] > 5) flowArr[i3 + 2] = -5;
        if (flowArr[i3 + 2] < -5) flowArr[i3 + 2] = 5;
      }
      flowPos.needsUpdate = true;
      flowMat.uniforms.uTime.value = elapsed;
      flowMat.uniforms.uMouse.value.set(mouse.x, mouse.y);

      /* Sparkles — very slow drift */
      const sparkPos = sparkleGeo.getAttribute("position");
      const sparkArr = sparkPos.array as Float32Array;
      for (let i = 0; i < SPARKLE_COUNT; i++) {
        const i3 = i * 3;
        sparkArr[i3] += Math.sin(elapsed * 0.1 + i * 0.02) * 0.001;
        sparkArr[i3 + 1] += Math.cos(elapsed * 0.08 + i * 0.03) * 0.0008;
      }
      sparkPos.needsUpdate = true;
      sparkleMat.uniforms.uTime.value = elapsed;
      sparkleMat.uniforms.uMouse.value.set(mouse.x, mouse.y);

      /* Gentle camera breathing */
      camera.position.x = Math.sin(elapsed * 0.07) * 0.3;
      camera.position.y = Math.cos(elapsed * 0.05) * 0.2;
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

      gasGeo.dispose();
      gasMat.dispose();
      flowGeo.dispose();
      flowMat.dispose();
      sparkleGeo.dispose();
      sparkleMat.dispose();
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
      style={{ background: "#060810" }}
    />
  );
}
