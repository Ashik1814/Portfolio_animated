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
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const filters = ["All", "Development", "Design", "Automation"];

const projects = [
  {
    icon: ShoppingBag,
    title: "E-Commerce Platform",
    description:
      "A modern e-commerce solution with seamless user experience, real-time inventory management, and integrated payments.",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    category: "Development",
    gradient: "from-[#ff6b9d] to-[#a855f7]",
  },
  {
    icon: Palette,
    title: "Design System",
    description:
      "Comprehensive component library with guidelines, documentation, and accessibility features. Created for a future design system.",
    tags: ["Figma", "Storybook", "CSS Variables"],
    category: "Design",
    gradient: "from-[#a855f7] to-[#4dabf7]",
  },
  {
    icon: Zap,
    title: "Workflow Automation System",
    description:
      "Automated business processes reducing manual work by 80% using custom integrations. Connected multiple tools and platforms.",
    tags: ["Python", "Zapier", "AWS Lambda"],
    category: "Automation",
    gradient: "from-[#2dd4bf] to-[#4dabf7]",
  },
  {
    icon: BarChart3,
    title: "SaaS Analytics Dashboard",
    description:
      "Real-time analytics dashboard with data visualization and customizable reporting features. Designed for tracking KPIs.",
    tags: ["React", "D3.js", "PostgreSQL"],
    category: "Development",
    gradient: "from-[#4dabf7] to-[#a855f7]",
  },
  {
    icon: Smartphone,
    title: "Mobile App Design",
    description:
      "User-centered mobile application design with intuitive navigation and modern aesthetics. Conducted user research and usability testing.",
    tags: ["Figma", "Adobe XD", "UserTesting"],
    category: "Design",
    gradient: "from-[#ff6b9d] to-[#fbbf24]",
  },
  {
    icon: Bot,
    title: "AI Integration Tool",
    description:
      "Seamless integration of AI capabilities into existing workflows using automation platforms. Built custom solutions for clients.",
    tags: ["Python", "TensorFlow", "AWS"],
    category: "Automation",
    gradient: "from-[#a855f7] to-[#2dd4bf]",
  },
  {
    icon: Briefcase,
    title: "Portfolio Website",
    description:
      "Modern portfolio website with glassmorphism effects, smooth animations, and responsive design. Built with React and Tailwind CSS.",
    tags: ["React", "Tailwind CSS", "Framer Motion"],
    category: "Development",
    gradient: "from-[#ff6b9d] to-[#4dabf7]",
  },
  {
    icon: Utensils,
    title: "Restaurant Landing Page",
    description:
      "Beautiful landing page for a restaurant with online ordering, menu showcase, and gallery. Focus on visual appeal and conversion optimization.",
    tags: ["Next.js", "Sanity", "Framer"],
    category: "Design",
    gradient: "from-[#fbbf24] to-[#ff6b9d]",
  },
  {
    icon: CheckSquare,
    title: "Task Management App",
    description:
      "Productivity app with Kanban boards, task lists, and team collaboration features. Built for remote teams and agile workflows.",
    tags: ["Vue.js", "Firebase", "Tailwind CSS"],
    category: "Development",
    gradient: "from-[#2dd4bf] to-[#a855f7]",
  },
];

export function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="py-20 section-padding">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="gradient-text">Featured Projects</span>
          </h2>
          <p className="text-[#a0a0b0] max-w-2xl mx-auto text-base">
            A collection of my recent work showcasing expertise in design,
            development, and automation. Each project represents a unique
            challenge and learning opportunity.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-3 mb-12">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeFilter === filter
                  ? "bg-gradient-to-r from-[#ff6b9d] to-[#a855f7] text-white shadow-lg shadow-[#ff6b9d]/20"
                  : "bg-[#1a1333] border border-white/5 text-[#a0a0b0] hover:text-white hover:border-white/10"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => {
            const Icon = project.icon;
            return (
              <Card
                key={project.title}
                className="bg-[#1a1333] border-white/5 hover:border-white/10 transition-all duration-300 group overflow-hidden"
              >
                {/* Gradient Header */}
                <div
                  className={`h-32 bg-gradient-to-br ${project.gradient} flex items-center justify-center relative`}
                >
                  <Icon className="w-12 h-12 text-white/90" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </div>
                <CardContent className="p-5 space-y-3">
                  <h3 className="text-base font-bold text-white">
                    {project.title}
                  </h3>
                  <p className="text-sm text-[#a0a0b0] leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md text-xs bg-[#2a1f45] text-[#a0a0b0]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {/* Actions */}
                  <div className="flex gap-3 pt-2">
                    <Button
                      size="sm"
                      className="flex-1 bg-[#2a1f45] hover:bg-[#3a2f55] text-white text-xs rounded-lg"
                    >
                      <ExternalLink className="w-3 h-3 mr-1.5" />
                      View Project
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 border-white/10 text-[#a0a0b0] hover:text-white hover:border-white/20 text-xs rounded-lg"
                    >
                      <Github className="w-3 h-3 mr-1.5" />
                      GitHub
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12">
          <Button
            size="lg"
            variant="outline"
            className="border-[#ff6b9d]/30 text-[#ff6b9d] hover:bg-[#ff6b9d]/10 font-medium rounded-full px-8"
          >
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
}
