"use client";

import { useState } from "react";
import {
  ShoppingBag,
  Palette,
  Zap,
  BarChart3,
  Smartphone,
  Bot,
  Briefcase,
  Utensils,
  CheckSquare,
  ExternalLink,
  Github,
} from "lucide-react";
import { AnimatedBorderButton } from "@/components/ui/animated-border-button";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const filters = ["All", "Development", "Design", "Automation"];

interface TagConfig {
  name: string;
  bg: string;
  text: string;
}

const projects: {
  icon: typeof ShoppingBag;
  title: string;
  description: string;
  tags: TagConfig[];
  category: string;
  gradient: string;
  accentColor: string;
}[] = [
  {
    icon: ShoppingBag,
    title: "E-Commerce Platform",
    description: "Modern e-commerce solution with seamless checkout, inventory management, and integrated payments.",
    tags: [
      { name: "React", bg: "bg-blue-500/20", text: "text-blue-300 dark:text-blue-300" },
      { name: "Node.js", bg: "bg-green-500/20", text: "text-green-300 dark:text-green-300" },
      { name: "MongoDB", bg: "bg-yellow-500/20", text: "text-yellow-300 dark:text-yellow-300" },
    ],
    category: "Development",
    gradient: "from-[#ff6b6b] to-[#ff8e53]",
    accentColor: "#ff6b6b",
  },
  {
    icon: Palette,
    title: "Design System",
    description: "Comprehensive component library with guidelines, documentation, and accessibility standards.",
    tags: [
      { name: "Figma", bg: "bg-purple-500/20", text: "text-purple-300 dark:text-purple-300" },
      { name: "Storybook", bg: "bg-orange-500/20", text: "text-orange-300 dark:text-orange-300" },
      { name: "Sketch", bg: "bg-pink-500/20", text: "text-pink-300 dark:text-pink-300" },
    ],
    category: "Design",
    gradient: "from-[#667eea] to-[#764ba2]",
    accentColor: "#667eea",
  },
  {
    icon: Zap,
    title: "Workflow Automation System",
    description: "Automated business processes reducing manual work by 80% using AI and custom integrations.",
    tags: [
      { name: "Python", bg: "bg-yellow-500/20", text: "text-yellow-200 dark:text-yellow-200" },
      { name: "Airflow", bg: "bg-blue-500/20", text: "text-blue-300 dark:text-blue-300" },
      { name: "AWS", bg: "bg-orange-500/20", text: "text-orange-300 dark:text-orange-300" },
    ],
    category: "Automation",
    gradient: "from-[#f093fb] to-[#f5576c]",
    accentColor: "#f093fb",
  },
  {
    icon: BarChart3,
    title: "SaaS Analytics Dashboard",
    description: "Real-time analytics dashboard with data visualization and customizable reporting features.",
    tags: [
      { name: "React", bg: "bg-blue-500/20", text: "text-blue-300 dark:text-blue-300" },
      { name: "D3.js", bg: "bg-orange-500/20", text: "text-orange-300 dark:text-orange-300" },
      { name: "PostgreSQL", bg: "bg-sky-500/20", text: "text-sky-300 dark:text-sky-300" },
    ],
    category: "Development",
    gradient: "from-[#4facfe] to-[#00f2fe]",
    accentColor: "#4facfe",
  },
  {
    icon: Smartphone,
    title: "Mobile App Design",
    description: "User-centered mobile application with intuitive navigation and modern aesthetics.",
    tags: [
      { name: "Figma", bg: "bg-purple-500/20", text: "text-purple-300 dark:text-purple-300" },
      { name: "Prototyping", bg: "bg-pink-500/20", text: "text-pink-300 dark:text-pink-300" },
      { name: "User Research", bg: "bg-green-500/20", text: "text-green-300 dark:text-green-300" },
    ],
    category: "Design",
    gradient: "from-[#43e97b] to-[#38f9d7]",
    accentColor: "#43e97b",
  },
  {
    icon: Bot,
    title: "AI Integration Tool",
    description: "Seamless integration of AI capabilities into existing platforms with custom solutions.",
    tags: [
      { name: "Python", bg: "bg-yellow-500/20", text: "text-yellow-200 dark:text-yellow-200" },
      { name: "TensorFlow", bg: "bg-orange-500/20", text: "text-orange-300 dark:text-orange-300" },
      { name: "API", bg: "bg-purple-500/20", text: "text-purple-300 dark:text-purple-300" },
    ],
    category: "Automation",
    gradient: "from-[#fa709a] to-[#fee140]",
    accentColor: "#fa709a",
  },
  {
    icon: Briefcase,
    title: "Portfolio Website",
    description: "Modern portfolio website with glassmorphism effects, smooth animations, and responsive design.",
    tags: [
      { name: "React", bg: "bg-blue-500/20", text: "text-blue-300 dark:text-blue-300" },
      { name: "Tailwind CSS", bg: "bg-teal-500/20", text: "text-teal-300 dark:text-teal-300" },
      { name: "Framer", bg: "bg-purple-500/20", text: "text-purple-300 dark:text-purple-300" },
    ],
    category: "Development",
    gradient: "from-[#30cfd0] to-[#330867]",
    accentColor: "#30cfd0",
  },
  {
    icon: Utensils,
    title: "Restaurant Landing Page",
    description: "Beautiful landing page for a restaurant with online ordering, menu display, and gallery.",
    tags: [
      { name: "Next.js", bg: "bg-gray-500/20", text: "text-gray-200 dark:text-gray-200" },
      { name: "Tailwind CSS", bg: "bg-teal-500/20", text: "text-teal-300 dark:text-teal-300" },
      { name: "Figma", bg: "bg-purple-500/20", text: "text-purple-300 dark:text-purple-300" },
    ],
    category: "Design",
    gradient: "from-[#a8edea] to-[#fed6e3]",
    accentColor: "#a8edea",
  },
  {
    icon: CheckSquare,
    title: "Task Management App",
    description: "Productivity app with kanban boards, task lists, and team collaboration features.",
    tags: [
      { name: "Vue.js", bg: "bg-green-500/20", text: "text-green-300 dark:text-green-300" },
      { name: "Firebase", bg: "bg-orange-500/20", text: "text-orange-300 dark:text-orange-300" },
      { name: "PWA", bg: "bg-yellow-500/20", text: "text-yellow-200 dark:text-yellow-200" },
    ],
    category: "Development",
    gradient: "from-[#ffecd2] to-[#fcb69f]",
    accentColor: "#fcb69f",
  },
];

/** Animated border filter button */
function AnimatedFilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300",
        active
          ? "bg-gradient-to-r from-[#00e5ff] to-[#64b5f6] dark:text-[#06080f] text-white shadow-lg dark:shadow-[#00e5ff]/25 shadow-[#00a8cc]/20 border-0"
          : "bg-transparent dark:border-[#64b5f6]/30 border-[#00a8cc]/30 border dark:text-[#64b5f6] text-[#00a8cc] dark:hover:bg-[#64b5f6]/10 hover:bg-[#00a8cc]/10 dark:hover:border-[#64b5f6]/50 hover:border-[#00a8cc]/50"
      )}
    >
      {/* Animated border overlay - only show for inactive (outline) buttons */}
      {!active && (
        <div
          className={cn(
            "-inset-px pointer-events-none absolute rounded-[inherit] border-2 border-transparent border-inset [mask-clip:padding-box,border-box]",
            "[mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]"
          )}
        >
          <motion.div
            className="absolute aspect-square"
            style={{
              width: 20,
              background: "linear-gradient(to right, transparent, #00e5ff, #64b5f6)",
              offsetPath: "rect(0 auto auto 0 round 20px)",
            }}
            animate={{
              offsetDistance: ["0%", "100%"],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 5,
              ease: "linear",
            }}
          />
        </div>
      )}
      {children}
    </button>
  );
}

export function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects = activeFilter === "All" ? projects : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="py-20 section-padding">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="gradient-text-cyan">Featured Projects</span>
          </h2>
          <p className="dark:text-[#94a3b8] text-gray-600 max-w-2xl mx-auto text-base leading-relaxed">
            A collection of my recent work showcasing expertise in design, development, and automation. Each project represents a unique challenge and learning opportunity.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map((filter) => (
            <AnimatedFilterButton
              key={filter}
              active={activeFilter === filter}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </AnimatedFilterButton>
          ))}
        </div>

        {/* Project Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => {
            const Icon = project.icon;
            return (
              <div
                key={project.title}
                className="group glass-card-solid dark:hover:border-[#64b5f6]/15 hover:border-[#00a8cc]/20 overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl dark:hover:shadow-[#00e5ff]/5 hover:shadow-[#00a8cc]/5"
              >
                {/* Gradient Banner */}
                <div className={`h-32 bg-gradient-to-br ${project.gradient} flex items-center justify-center relative`}>
                  <Icon className="w-14 h-14 text-white/90 drop-shadow-lg" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </div>

                {/* Card Body */}
                <div className="p-5 space-y-3">
                  <h3 className="text-lg font-bold dark:text-white text-gray-900">{project.title}</h3>
                  <p className="text-sm dark:text-[#94a3b8] text-gray-600 leading-relaxed line-clamp-2">{project.description}</p>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {project.tags.map((tag) => (
                      <span key={tag.name} className={`px-3 py-1 rounded-full text-xs font-medium ${tag.bg} ${tag.text}`}>
                        {tag.name}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-3">
                    <AnimatedBorderButton
                      size="sm"
                      className="flex-1 dark:bg-white bg-gray-900 dark:text-[#06080f] text-white dark:hover:bg-white/90 hover:bg-gray-800 font-medium text-xs rounded-md h-9"
                      style={{ color: project.accentColor }}
                      gradientVia={project.accentColor}
                      gradientTo={project.accentColor}
                    >
                      <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                      Live Demo
                    </AnimatedBorderButton>
                    <AnimatedBorderButton
                      size="sm"
                      variant="outline"
                      className="flex-1 dark:border-white/20 border-gray-300 dark:text-white text-gray-900 dark:hover:bg-white hover:bg-gray-100 dark:hover:text-[#06080f] hover:text-gray-900 font-medium text-xs rounded-md h-9 transition-all duration-300"
                      gradientVia="#a78bfa"
                      gradientTo="#64b5f6"
                    >
                      <Github className="w-3.5 h-3.5 mr-1.5" />
                      View Code
                    </AnimatedBorderButton>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-14">
          <AnimatedBorderButton
            size="lg"
            variant="outline"
            className="dark:border-[#00e5ff]/30 border-[#00a8cc]/30 dark:text-[#00e5ff] text-[#00a8cc] dark:hover:bg-[#00e5ff]/10 hover:bg-[#00a8cc]/10 font-medium rounded-full px-8 transition-all duration-300"
            gradientVia="#00e5ff"
            gradientTo="#64b5f6"
          >
            View All Projects
          </AnimatedBorderButton>
        </div>
      </div>
    </section>
  );
}
