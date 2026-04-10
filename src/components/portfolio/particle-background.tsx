"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/* ──────────────────────────────────────────────
   Nebula Smoke Flow — Three.js
   Wispy, amorphous smoke/cloud formations
   in deep magenta/pink/purple with cyan accents
   Mouse repulsion — clouds flee from cursor
   ────────────────────────────────────────────── */

/* Simplex-like noise for smoke shape */
function hash(n: number): number {
  return Math.abs(Math.sin(n) * 43758.5453) % 1;
}

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

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 120);
    camera.position.set(0, 0, 14);

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    /* ═══════════════════════════════════════
       SMOKE CLOUDS — Large wispy formations
       The main visual element: amorphous,
       flowing smoke in magenta/pink/purple
    ═══════════════════════════════════════ */
    const CLOUD_COUNT = 60;
    const cloudPositions = new Float32Array(CLOUD_COUNT * 3);
    const cloudSizes = new Float32Array(CLOUD_COUNT);
    const cloudColorType = new Float32Array(CLOUD_COUNT); // 0=magenta, 1=purple, 2=pink, 3=dark
    const cloudSeed = new Float32Array(CLOUD_COUNT);
    const cloudVels: { bx: number; by: number; vx: number; vy: number; ph: number; ax: number; ay: number }[] = [];

    for (let i = 0; i < CLOUD_COUNT; i++) {
      const x = (Math.random() - 0.5) * 28;
      const y = (Math.random() - 0.5) * 20;
      const z = -Math.random() * 8 - 2;
      cloudPositions[i * 3] = x;
      cloudPositions[i * 3 + 1] = y;
      cloudPositions[i * 3 + 2] = z;
      cloudSizes[i] = 80 + Math.random() * 200;
      cloudColorType[i] = Math.random();
      cloudSeed[i] = Math.random() * 100;

      cloudVels.push({
        bx: x, by: y,
        vx: (Math.random() - 0.4) * 0.004,
        vy: (Math.random() - 0.3) * 0.003,
        ph: Math.random() * Math.PI * 2,
        ax: 0.5 + Math.random() * 1.5,
        ay: 0.3 + Math.random() * 1.0,
      });
    }

    const cloudGeo = new THREE.BufferGeometry();
    cloudGeo.setAttribute("position", new THREE.BufferAttribute(cloudPositions, 3));
    cloudGeo.setAttribute("aSize", new THREE.BufferAttribute(cloudSizes, 1));
    cloudGeo.setAttribute("aColorType", new THREE.BufferAttribute(cloudColorType, 1));
    cloudGeo.setAttribute("aSeed", new THREE.BufferAttribute(cloudSeed, 1));

    const cloudMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: renderer.getPixelRatio() },
        uMouse: { value: new THREE.Vector2(-10, -10) },
      },
      vertexShader: `
        attribute float aSize;
        attribute float aColorType;
        attribute float aSeed;
        uniform float uPixelRatio;
        uniform float uTime;
        uniform vec2 uMouse;
        varying float vColorType;
        varying float vAlpha;
        varying vec2 vUv;
        varying float vSeed;

        void main() {
          vColorType = aColorType;
          vSeed = aSeed;
          vec3 p = position;

          // Mouse repulsion
          vec2 mouseWorld = uMouse * vec2(14.0, 10.0);
          float dist = distance(p.xy, mouseWorld);
          float mouseForce = 0.0;
          if (dist < 5.0 && dist > 0.01) {
            vec2 dir = normalize(p.xy - mouseWorld);
            mouseForce = (5.0 - dist) / 5.0;
            mouseForce = mouseForce * mouseForce;
            p.xy += dir * mouseForce * 3.0;
          }

          vec4 mvPos = modelViewMatrix * vec4(p, 1.0);
          float depth = -mvPos.z;
          vAlpha = smoothstep(18.0, 5.0, depth) * (0.08 + mouseForce * 0.04);
          vUv = gl_PointCoord;

          gl_PointSize = aSize * uPixelRatio * (8.0 / depth);
          gl_PointSize = clamp(gl_PointSize, 4.0, 400.0);
          gl_Position = projectionMatrix * mvPos;
        }
      `,
      fragmentShader: `
        varying float vColorType;
        varying float vAlpha;
        varying vec2 vUv;
        varying float vSeed;

        // Simple noise for wispy shape
        float noise(vec2 p) {
          return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
        }

        float smoothNoise(vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          f = f * f * (3.0 - 2.0 * f);
          float a = noise(i);
          float b = noise(i + vec2(1.0, 0.0));
          float c = noise(i + vec2(0.0, 1.0));
          float d = noise(i + vec2(1.0, 1.0));
          return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
        }

        float fbm(vec2 p) {
          float val = 0.0;
          float amp = 0.5;
          for (int i = 0; i < 5; i++) {
            val += amp * smoothNoise(p);
            p *= 2.0;
            amp *= 0.5;
          }
          return val;
        }

        void main() {
          vec2 uv = vUv - 0.5;

          // Distance from center
          float d = length(uv);

          // Wispy smoke shape using FBM noise
          vec2 noiseCoord = uv * 3.0 + vSeed;
          float n = fbm(noiseCoord);
          float shape = 1.0 - smoothstep(0.0, 0.5, d);
          shape *= n * 1.5;
          shape = clamp(shape, 0.0, 1.0);
          shape = pow(shape, 1.5);

          if (shape < 0.01) discard;

          // Deep magenta / pink / purple / dark palette
          vec3 deepMagenta = vec3(0.55, 0.05, 0.4);
          vec3 vibrantPink = vec3(0.75, 0.12, 0.5);
          vec3 darkPurple = vec3(0.15, 0.05, 0.25);
          vec3 deepWine = vec3(0.3, 0.02, 0.2);

          vec3 col;
          if (vColorType < 0.33) {
            col = mix(deepMagenta, vibrantPink, vColorType * 3.0);
          } else if (vColorType < 0.66) {
            col = mix(vibrantPink, darkPurple, (vColorType - 0.33) * 3.0);
          } else {
            col = mix(darkPurple, deepWine, (vColorType - 0.66) * 3.0);
          }

          // Brighter at the core of each cloud wisp
          col = mix(col, vibrantPink * 1.3, shape * shape * 0.3);

          gl_FragColor = vec4(col, shape * vAlpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const cloudPoints = new THREE.Points(cloudGeo, cloudMat);
    scene.add(cloudPoints);

    /* ═══════════════════════════════════════
       MEDIUM SMOKE WISPS — More defined,
       faster flowing, colored particles
    ═══════════════════════════════════════ */
    const WISP_COUNT = 800;
    const wispPositions = new Float32Array(WISP_COUNT * 3);
    const wispSizes = new Float32Array(WISP_COUNT);
    const wispColorType = new Float32Array(WISP_COUNT);
    const wispSeed = new Float32Array(WISP_COUNT);
    const wispVels: number[] = [];

    for (let i = 0; i < WISP_COUNT; i++) {
      const i3 = i * 3;
      wispPositions[i3] = (Math.random() - 0.5) * 26;
      wispPositions[i3 + 1] = (Math.random() - 0.5) * 18;
      wispPositions[i3 + 2] = (Math.random() - 0.5) * 6 - 1;
      wispSizes[i] = 8 + Math.random() * 30;
      wispColorType[i] = Math.random();
      wispSeed[i] = Math.random() * 100;
      wispVels.push(
        (Math.random() - 0.35) * 0.005,
        (Math.random() - 0.45) * 0.003,
        (Math.random() - 0.5) * 0.001,
      );
    }

    const wispGeo = new THREE.BufferGeometry();
    wispGeo.setAttribute("position", new THREE.BufferAttribute(wispPositions, 3));
    wispGeo.setAttribute("aSize", new THREE.BufferAttribute(wispSizes, 1));
    wispGeo.setAttribute("aColorType", new THREE.BufferAttribute(wispColorType, 1));
    wispGeo.setAttribute("aSeed", new THREE.BufferAttribute(wispSeed, 1));

    const wispMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: renderer.getPixelRatio() },
        uMouse: { value: new THREE.Vector2(-10, -10) },
      },
      vertexShader: `
        attribute float aSize;
        attribute float aColorType;
        attribute float aSeed;
        uniform float uPixelRatio;
        uniform float uTime;
        uniform vec2 uMouse;
        varying float vColorType;
        varying float vAlpha;
        varying float vSeed;

        void main() {
          vColorType = aColorType;
          vSeed = aSeed;
          vec3 p = position;

          // Mouse repulsion
          vec2 mouseWorld = uMouse * vec2(13.0, 9.0);
          float dist = distance(p.xy, mouseWorld);
          float mouseForce = 0.0;
          if (dist < 4.0 && dist > 0.01) {
            vec2 dir = normalize(p.xy - mouseWorld);
            mouseForce = (4.0 - dist) / 4.0;
            mouseForce = mouseForce * mouseForce;
            p.xy += dir * mouseForce * 2.5;
          }

          vec4 mvPos = modelViewMatrix * vec4(p, 1.0);
          float depth = -mvPos.z;
          vAlpha = smoothstep(16.0, 4.0, depth) * (0.15 + mouseForce * 0.15);

          float s = aSize + mouseForce * 15.0;
          gl_PointSize = s * uPixelRatio * (6.0 / depth);
          gl_PointSize = clamp(gl_PointSize, 1.0, 80.0);
          gl_Position = projectionMatrix * mvPos;
        }
      `,
      fragmentShader: `
        varying float vColorType;
        varying float vAlpha;
        varying float vSeed;

        float noise(vec2 p) {
          return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
        }

        float smoothNoise(vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          f = f * f * (3.0 - 2.0 * f);
          float a = noise(i);
          float b = noise(i + vec2(1.0, 0.0));
          float c = noise(i + vec2(0.0, 1.0));
          float d = noise(i + vec2(1.0, 1.0));
          return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
        }

        float fbm(vec2 p) {
          float val = 0.0;
          float amp = 0.5;
          for (int i = 0; i < 4; i++) {
            val += amp * smoothNoise(p);
            p *= 2.0;
            amp *= 0.5;
          }
          return val;
        }

        void main() {
          vec2 uv = gl_PointCoord - 0.5;
          float d = length(uv);

          // Wispy shape
          vec2 nc = uv * 4.0 + vSeed;
          float n = fbm(nc);
          float shape = 1.0 - smoothstep(0.0, 0.5, d);
          shape *= n * 1.8;
          shape = clamp(shape, 0.0, 1.0);
          shape = pow(shape, 1.2);

          if (shape < 0.01) discard;

          // Color: mix of magenta, pink, purple
          vec3 magenta = vec3(0.6, 0.08, 0.45);
          vec3 pink = vec3(0.85, 0.15, 0.55);
          vec3 purple = vec3(0.35, 0.08, 0.5);
          vec3 hotPink = vec3(0.9, 0.2, 0.5);

          vec3 col;
          if (vColorType < 0.25) {
            col = mix(magenta, pink, vColorType * 4.0);
          } else if (vColorType < 0.5) {
            col = mix(pink, purple, (vColorType - 0.25) * 4.0);
          } else if (vColorType < 0.75) {
            col = mix(purple, hotPink, (vColorType - 0.5) * 4.0);
          } else {
            col = mix(hotPink, magenta, (vColorType - 0.75) * 4.0);
          }

          col = mix(col, hotPink, shape * shape * 0.2);

          gl_FragColor = vec4(col, shape * vAlpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const wispPoints = new THREE.Points(wispGeo, wispMat);
    scene.add(wispPoints);

    /* ═══════════════════════════════════════
       SPARKLE DOTS — Tiny bright cyan/pink
       Scattered accent dots
    ═══════════════════════════════════════ */
    const DOT_COUNT = 2000;
    const dotPositions = new Float32Array(DOT_COUNT * 3);
    const dotSizes = new Float32Array(DOT_COUNT);
    const dotColorType = new Float32Array(DOT_COUNT);
    const dotPhase = new Float32Array(DOT_COUNT);

    for (let i = 0; i < DOT_COUNT; i++) {
      const i3 = i * 3;
      dotPositions[i3] = (Math.random() - 0.5) * 30;
      dotPositions[i3 + 1] = (Math.random() - 0.5) * 22;
      dotPositions[i3 + 2] = (Math.random() - 0.5) * 10;
      dotSizes[i] = 0.5 + Math.random() * 2.0;
      dotColorType[i] = Math.random();
      dotPhase[i] = Math.random() * Math.PI * 2;
    }

    const dotGeo = new THREE.BufferGeometry();
    dotGeo.setAttribute("position", new THREE.BufferAttribute(dotPositions, 3));
    dotGeo.setAttribute("aSize", new THREE.BufferAttribute(dotSizes, 1));
    dotGeo.setAttribute("aColorType", new THREE.BufferAttribute(dotColorType, 1));
    dotGeo.setAttribute("aPhase", new THREE.BufferAttribute(dotPhase, 1));

    const dotMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: renderer.getPixelRatio() },
        uMouse: { value: new THREE.Vector2(-10, -10) },
      },
      vertexShader: `
        attribute float aSize;
        attribute float aColorType;
        attribute float aPhase;
        uniform float uPixelRatio;
        uniform float uTime;
        uniform vec2 uMouse;
        varying float vColorType;
        varying float vTwinkle;

        void main() {
          vColorType = aColorType;
          vec3 p = position;

          // Mouse repulsion
          vec2 mouseWorld = uMouse * vec2(15.0, 11.0);
          float dist = distance(p.xy, mouseWorld);
          if (dist < 3.0 && dist > 0.01) {
            vec2 dir = normalize(p.xy - mouseWorld);
            float force = (3.0 - dist) / 3.0;
            p.xy += dir * force * force * 1.5;
          }

          vTwinkle = 0.2 + 0.8 * abs(sin(uTime * 1.2 + aPhase));

          vec4 mvPos = modelViewMatrix * vec4(p, 1.0);
          float depth = -mvPos.z;
          gl_PointSize = aSize * uPixelRatio * (4.0 / depth);
          gl_PointSize = clamp(gl_PointSize, 0.3, 5.0);
          gl_Position = projectionMatrix * mvPos;
        }
      `,
      fragmentShader: `
        varying float vColorType;
        varying float vTwinkle;

        void main() {
          float d = length(gl_PointCoord - vec2(0.5));
          if (d > 0.5) discard;
          float glow = 1.0 - smoothstep(0.0, 0.5, d);
          glow = pow(glow, 2.0);

          // Mix of cyan, pink, and white dots
          vec3 cyan = vec3(0.0, 0.9, 1.0);
          vec3 pink = vec3(0.9, 0.2, 0.6);
          vec3 white = vec3(1.0, 0.95, 0.95);

          vec3 col;
          if (vColorType < 0.4) {
            col = mix(cyan, white, vColorType * 2.5);
          } else {
            col = mix(pink, white, (vColorType - 0.4) * 1.7);
          }

          gl_FragColor = vec4(col, glow * vTwinkle * 0.5);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const dotPoints = new THREE.Points(dotGeo, dotMat);
    scene.add(dotPoints);

    /* ── Mouse ── */
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
      cloudMat.uniforms.uPixelRatio.value = pr;
      wispMat.uniforms.uPixelRatio.value = pr;
      dotMat.uniforms.uPixelRatio.value = pr;
    };
    window.addEventListener("resize", handleResize);

    /* ── Animate ── */
    const clock = new THREE.Clock();

    const animate = () => {
      rafRef.current = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();
      const mouse = mouseRef.current;

      // Cloud drift
      const cPos = cloudGeo.getAttribute("position");
      const cArr = cPos.array as Float32Array;
      for (let i = 0; i < CLOUD_COUNT; i++) {
        const v = cloudVels[i];
        const i3 = i * 3;
        v.bx += v.vx;
        v.by += v.vy;
        if (v.bx > 15) v.bx = -15;
        if (v.bx < -15) v.bx = 15;
        if (v.by > 11) v.by = -11;
        if (v.by < -11) v.by = 11;
        cArr[i3] = v.bx + Math.sin(elapsed * 0.12 + v.ph) * v.ax;
        cArr[i3 + 1] = v.by + Math.cos(elapsed * 0.09 + v.ph * 1.3) * v.ay;
      }
      cPos.needsUpdate = true;
      cloudMat.uniforms.uTime.value = elapsed;
      cloudMat.uniforms.uMouse.value.set(mouse.x, mouse.y);

      // Wisp flow
      const wPos = wispGeo.getAttribute("position");
      const wArr = wPos.array as Float32Array;
      for (let i = 0; i < WISP_COUNT; i++) {
        const i3 = i * 3;
        wArr[i3] += wispVels[i3] + Math.sin(elapsed * 0.25 + i * 0.003) * 0.003;
        wArr[i3 + 1] += wispVels[i3 + 1] + Math.cos(elapsed * 0.18 + i * 0.005) * 0.002;
        wArr[i3 + 2] += wispVels[i3 + 2];
        if (wArr[i3] > 14) wArr[i3] = -14;
        if (wArr[i3] < -14) wArr[i3] = 14;
        if (wArr[i3 + 1] > 10) wArr[i3 + 1] = -10;
        if (wArr[i3 + 1] < -10) wArr[i3 + 1] = 10;
        if (wArr[i3 + 2] > 4) wArr[i3 + 2] = -4;
        if (wArr[i3 + 2] < -4) wArr[i3 + 2] = 4;
      }
      wPos.needsUpdate = true;
      wispMat.uniforms.uTime.value = elapsed;
      wispMat.uniforms.uMouse.value.set(mouse.x, mouse.y);

      // Dot twinkle
      dotMat.uniforms.uTime.value = elapsed;
      dotMat.uniforms.uMouse.value.set(mouse.x, mouse.y);

      // Camera breathing
      camera.position.x = Math.sin(elapsed * 0.06) * 0.25;
      camera.position.y = Math.cos(elapsed * 0.04) * 0.15;
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
      cloudGeo.dispose(); cloudMat.dispose();
      wispGeo.dispose(); wispMat.dispose();
      dotGeo.dispose(); dotMat.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0"
      style={{ background: "#08050f" }}
    />
  );
}
