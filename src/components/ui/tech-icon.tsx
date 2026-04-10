"use client";

import {
  SiFigma,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiNextdotjs,
  SiJavascript,
  SiN8N,
  SiZapier,
  SiNodedotjs,
  SiMongodb,
  SiPostgresql,
  SiDocker,
  SiGit,
  SiGraphql,
  SiFirebase,
  SiVuedotjs,
  SiPython,
  SiTensorflow,
  SiSketch,
  SiStorybook,
  SiFramer,
  SiApacheairflow,
  SiHtml5,
  SiCss3,
} from "react-icons/si";
import {
  Paintbrush,
  Layers,
  Puzzle,
  Workflow,
  Plug,
  Layout,
  Code2,
  Cpu,
  Gauge,
  Unplug,
  BookOpen,
  Shield,
  TestTube,
  RefreshCcw,
  Users,
  Handshake,
  type LucideIcon,
} from "lucide-react";
import type { IconType } from "react-icons";

interface TechIconProps {
  name: string;
  className?: string;
  size?: number;
}

// Map tech names to their brand SVG icons (react-icons/si)
const brandIconMap: Record<string, IconType> = {
  // Design
  figma: SiFigma,

  sketch: SiSketch,
  // Development
  react: SiReact,
  typescript: SiTypescript,
  "tailwind css": SiTailwindcss,
  tailwindcss: SiTailwindcss,
  "next.js": SiNextdotjs,
  nextjs: SiNextdotjs,
  javascript: SiJavascript,
  "node.js": SiNodedotjs,
  nodejs: SiNodedotjs,
  "html/css": SiHtml5,
  html: SiHtml5,
  css: SiCss3,
  vue: SiVuedotjs,
  "vue.js": SiVuedotjs,
  vuejs: SiVuedotjs,
  python: SiPython,
  // Databases
  mongodb: SiMongodb,
  postgresql: SiPostgresql,
  firebase: SiFirebase,
  // DevOps & Tools
  docker: SiDocker,
  git: SiGit,
  graphql: SiGraphql,
  // Automation
  n8n: SiN8N,
  zapier: SiZapier,
  // AI/ML
  tensorflow: SiTensorflow,
  // Other tools
  storybook: SiStorybook,
  framer: SiFramer,
  airflow: SiApacheairflow,
};

// Map non-brand skill names to Lucide icons as fallback
const lucideFallbackMap: Record<string, LucideIcon> = {
  // Design (no brand icon)
  "adobe xd": Paintbrush,
  prototyping: Layers,
  "ui/ux design": Paintbrush,
  "ui ux design": Paintbrush,
  "design systems": Layout,
  // Automation (no brand icon)
  "api integration": Plug,
  "workflow design": Workflow,
  "make (integromat)": RefreshCcw,
  make: RefreshCcw,
  integromat: RefreshCcw,
  // DevOps & general
  "rest apis": Unplug,
  "responsive design": Layout,
  accessibility: Shield,
  "performance optimization": Gauge,
  testing: TestTube,
  "ci/cd": RefreshCcw,
  "agile/scrum": Users,
  aws: Cpu,
  "web3 & blockchain": Shield,
  "advanced ai integration": Cpu,
  pwa: Cpu,
  "user research": Users,
};

// Default fallback icon
const DefaultIcon = Code2;

function normalizeKey(name: string): string {
  return name.toLowerCase().trim();
}

export function TechIcon({ name, className, size = 20 }: TechIconProps) {
  const key = normalizeKey(name);

  // Try brand icon first
  const BrandIcon = brandIconMap[key];
  if (BrandIcon) {
    return <BrandIcon className={className} size={size} />;
  }

  // Try Lucide fallback
  const LucideIcon = lucideFallbackMap[key] || DefaultIcon;
  return <LucideIcon className={className} size={size} />;
}

/**
 * Check if a given tech name has a brand SVG icon available.
 */
export function hasBrandIcon(name: string): boolean {
  return normalizeKey(name) in brandIconMap;
}
