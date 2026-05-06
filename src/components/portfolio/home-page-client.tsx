"use client";

import { useState } from "react";
import { HeroContent } from "@/components/portfolio/hero";
import { LiveClockCalendar } from "@/components/portfolio/live-clock-calendar";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { AnimatedBorderButton } from "@/components/ui/animated-border-button";
import { ProjectModal } from "@/components/portfolio/project-gallery-modal";
import { TechIcon } from "@/components/ui/tech-icon";
import {
  ArrowRight,
  ExternalLink,
  Eye,
  Image,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { getIcon } from "@/lib/get-icon";
import type { ContentData } from "@/components/admin/types";

const projectFilters = ["All", "Design", "Development", "Automation"];

function FilterButton({ active, onClick, children }: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300",
        active
          ? "bg-gradient-to-r from-[#00e5ff] to-[#64b5f6] dark:text-[#06080f] text-white shadow-lg dark:shadow-[#00e5ff]/25 shadow-[#00a8cc]/20 border-0"
          : "bg-transparent dark:border-[#64b5f6]/30 border-[#00a8cc]/30 border dark:text-[#64b5f6] text-[#00a8cc] dark:hover:bg-[#64b5f6]/10 hover:bg-[#00a8cc]/10 dark:hover:border-[#64b5f6]/50 hover:border-[#00a8cc]/50"
      )}
    >
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
            animate={{ offsetDistance: ["0%", "100%"] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 5, ease: "linear" }}
          />
        </div>
      )}
      {children}
    </button>
  );
}

function buildImageUrl(path: string): string {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return `https://ithjvuazalnpowimfzke.supabase.co/storage/v1/object/public/portfolio-files/${path}`;
}

function gradientFromAccent(color: string): string {
  const hex = color.replace('#', '');
  if (hex.length !== 6) return 'from-[#00e5ff] to-[#64b5f6]';
  
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  const lr = Math.min(255, Math.floor(r + (255 - r) * 0.5));
  const lg = Math.min(255, Math.floor(g + (255 - g) * 0.5));
  const lb = Math.min(255, Math.floor(b + (255 - b) * 0.5));
  
  const lighter = `#${lr.toString(16).padStart(2, '0')}${lg.toString(16).padStart(2, '0')}${lb.toString(16).padStart(2, '0')}`;
  return `from-[${color}] to-[${lighter}]`;
}

export function HomePageClient({ data }: { data: ContentData }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<typeof data.projects[0] | null>(null);

  const siteConfig = data.siteConfig;
  const aboutSkills = data.aboutSkills;
  const skillCategories = data.skillCategories;
  const projects = data.projects;
  const socialLinks = data.socialLinks;

  const filteredProjects = activeFilter === "All" ? projects : projects.filter((p) => p.category === activeFilter);

  return (
    <>
      <HeroContent siteConfig={siteConfig} socialLinks={socialLinks} heroStats={data.heroStats} />
      <LiveClockCalendar />

      {/* About Preview */}
      <section className="py-20 section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold dark:text-white text-gray-900 mb-4">
              What I <span className="gradient-text-cyan">Do</span>
            </h2>
            <p className="dark:text-[#cbd5e1] text-gray-600 max-w-2xl mx-auto">
              {siteConfig?.aboutDescription}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {aboutSkills.map((skill) => {
              const Icon = getIcon(skill.icon);
              return (
                <CardSpotlight key={skill.id} className="p-6">
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${skill.color}15` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: skill.color }} />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold dark:text-white text-gray-900 text-lg mb-1">
                        {skill.title}
                      </h3>
                      <div className="flex items-center gap-2.5">
                        <span className="text-3xl font-bold" style={{ color: skill.color }}>
                          {skill.metric}
                        </span>
                        <span className="text-sm dark:text-[#cbd5e1] text-gray-600">
                          {skill.metricLabel}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardSpotlight>
              );
            })}
          </div>

          <div className="text-center">
            <AnimatedBorderButton
              asChild
              gradientVia="#a78bfa"
              gradientTo="#00e5ff"
              className="bg-gradient-to-r from-[#a78bfa]/15 to-[#00e5ff]/15 dark:from-[#a78bfa]/15 dark:to-[#00e5ff]/15 border dark:border-[#a78bfa]/35 border-[#a78bfa]/35 dark:text-[#a78bfa] text-[#7c3aed] dark:hover:from-[#a78bfa]/40 dark:hover:to-[#00e5ff]/40 hover:from-[#a78bfa]/35 hover:to-[#00e5ff]/35 dark:hover:border-[#a78bfa]/70 hover:border-[#a78bfa]/70 font-medium rounded-full px-6 shadow-sm dark:shadow-[#a78bfa]/10 shadow-[#a78bfa]/5"
            >
              <Link href="/about">
                Learn More
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </AnimatedBorderButton>
          </div>
        </div>
      </section>

      {/* Skills Preview */}
      <section className="py-20 section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold dark:text-white text-gray-900 mb-4">
              My <span className="gradient-text-purple-blue">Skills</span>
            </h2>
            <p className="dark:text-[#cbd5e1] text-gray-600 max-w-2xl mx-auto">
              {siteConfig?.skillsDescription}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {skillCategories.map((category) => {
              const Icon = getIcon(category.icon);
              return (
                <CardSpotlight key={category.id} className="p-6">
                  <div className="flex items-center gap-3 mb-5">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${category.color}15` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: category.color }} />
                    </div>
                    <h3 className="font-semibold text-lg" style={{ color: category.color }}>
                      {category.title}
                    </h3>
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    {category.skills.map((skill) => (
                      <div
                        key={skill.id}
                        className="flex items-center gap-2 px-2.5 py-2 rounded-lg dark:bg-white/[0.04] bg-gray-50 dark:hover:bg-white/[0.08] hover:bg-gray-100 transition-colors duration-200 group"
                      >
                        <TechIcon name={skill.name} size={18} className="shrink-0" />
                        <span className="text-xs font-medium dark:text-white text-gray-900 truncate group-hover:dark:text-[#00e5ff] group-hover:text-[#00a8cc] transition-colors duration-200">
                          {skill.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardSpotlight>
              );
            })}
          </div>

          <div className="text-center">
            <AnimatedBorderButton
              asChild
              gradientVia="#a78bfa"
              gradientTo="#64b5f6"
              className="bg-gradient-to-r from-[#a78bfa]/15 to-[#64b5f6]/15 dark:from-[#a78bfa]/15 dark:to-[#64b5f6]/15 border dark:border-[#a78bfa]/35 border-[#a78bfa]/35 dark:text-[#a78bfa] text-[#7c3aed] dark:hover:from-[#a78bfa]/40 dark:hover:to-[#64b5f6]/40 hover:from-[#a78bfa]/35 hover:to-[#64b5f6]/35 dark:hover:border-[#a78bfa]/70 hover:border-[#a78bfa]/70 font-medium rounded-full px-6 shadow-sm dark:shadow-[#a78bfa]/10 shadow-[#a78bfa]/5"
            >
              <Link href="/skills">
                View All Skills
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </AnimatedBorderButton>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold dark:text-white text-gray-900 mb-4">
              Featured <span className="gradient-text-pink-blue">Projects</span>
            </h2>
            <p className="dark:text-[#cbd5e1] text-gray-600 max-w-2xl mx-auto">
              {siteConfig?.projectsDescription}
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {projectFilters.map((filter) => (
              <FilterButton key={filter} active={activeFilter === filter} onClick={() => setActiveFilter(filter)}>
                {filter}
              </FilterButton>
            ))}
          </div>

          {/* Project cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {filteredProjects.map((project) => {
              const hasMedia = project.videoUrl || (project.imageUrl && project.imageUrl.length > 0);
              return (
                <CardSpotlight
                  key={project.id}
                  className="glass-card-solid dark:hover:border-[#64b5f6]/15 hover:border-[#00a8cc]/20 overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl dark:hover:shadow-[#00e5ff]/5 hover:shadow-[#00a8cc]/5 group h-auto"
                >
                  {/* Media header */}
                  {project.videoUrl ? (
                    <div className="h-32 relative overflow-hidden bg-black">
                      <video
                        src={project.videoUrl}
                        className="w-full h-full object-cover"
                        muted
                        loop
                        playsInline
                        onMouseEnter={(e) => (e.target as HTMLVideoElement).play()}
                        onMouseLeave={(e) => (e.target as HTMLVideoElement).pause()}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                    </div>
                  ) : (project.imageUrl && project.imageUrl.length > 0) ? (
                    <div className="relative h-32 overflow-hidden">
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-32 object-cover"
                      />
                      {(() => {
                        try {
                          const imagesArr = JSON.parse(project.images || "[]");
                          const count = imagesArr.length;
                          if (count > 0) {
                            return (
                              <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 rounded-full bg-black/60 text-white text-xs font-medium">
                                <Image className="w-3 h-3" />
                                +{count}
                              </div>
                            );
                          }
                        } catch {}
                        return null;
                      })()}
                    </div>
                  ) : (
                    <div className="h-32 bg-gradient-to-br from-[#00e5ff] to-[#64b5f6] flex items-center justify-center relative">
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                    </div>
                  )}

                  <div className="p-5 space-y-3">
                    <h3 className="text-lg font-bold dark:text-white text-gray-900">{project.title}</h3>
                    <p className="text-sm dark:text-[#cbd5e1] text-gray-600 leading-relaxed line-clamp-2">{project.description}</p>

                    <div className="flex flex-wrap gap-2 pt-1">
                      {project.tags.map((tag) => (
                        <span key={tag.id} className="project-tag px-3 py-1 rounded-full text-xs font-medium" style={{ "--tag-bg": tag.bgLight, "--tag-text": tag.textLight, "--tag-bg-dark": tag.bgDark, "--tag-text-dark": tag.textDark } as React.CSSProperties}>
                          {tag.name}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-3 pt-2">
                      <AnimatedBorderButton
                        size="sm"
                        className="flex-1 bg-gradient-to-r from-[#00e5ff] to-[#64b5f6] hover:from-[#00c2e5] hover:to-[#5ba3e0] dark:text-[#06080f] text-white font-medium text-xs rounded-md h-9 shadow-md dark:shadow-[#00e5ff]/15 shadow-[#00a8cc]/10 transition-all duration-200"
                        gradientVia="#64b5f6"
                        gradientTo="#a78bfa"
                        disabled={!project.liveUrl || project.liveUrl === "#"}
                        onClick={() => project.liveUrl && project.liveUrl !== "#" && window.open(project.liveUrl, "_blank")}
                      >
                        <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                        Live Demo
                      </AnimatedBorderButton>
                      <AnimatedBorderButton
                        size="sm"
                        className="flex-1 bg-transparent dark:bg-transparent border dark:border-[#00e5ff]/30 border-[#00a8cc]/30 dark:text-[#00e5ff] text-[#00a8cc] dark:hover:bg-[#00e5ff]/25 hover:bg-[#00a8cc]/25 dark:hover:border-[#00e5ff]/60 hover:border-[#00a8cc]/60 dark:hover:text-[#00e5ff] hover:text-[#0088a3] font-medium text-xs rounded-md h-9 transition-all duration-200"
                        gradientVia="#a78bfa"
                        gradientTo="#64b5f6"
                        disabled={!project.imageUrl && !project.videoUrl}
                        onClick={() => setSelectedProject(project)}
                      >
                        <Eye className="w-3.5 h-3.5 mr-1.5" />
                        View
                      </AnimatedBorderButton>
                    </div>
                  </div>
                </CardSpotlight>
              );
            })}
          </div>

          <div className="text-center">
            <AnimatedBorderButton
              asChild
              gradientVia="#00e5ff"
              gradientTo="#64b5f6"
              className="bg-gradient-to-r from-[#00e5ff]/15 to-[#64b5f6]/15 dark:from-[#00e5ff]/15 dark:to-[#64b5f6]/15 border dark:border-[#00e5ff]/35 border-[#00a8cc]/35 dark:text-[#00e5ff] text-[#00a8cc] dark:hover:from-[#00e5ff]/40 hover:from-[#00a8cc]/35 hover:to-[#64b5f6]/35 dark:hover:border-[#00e5ff]/70 hover:border-[#00a8cc]/70 font-medium rounded-full px-6 shadow-sm dark:shadow-[#00e5ff]/10 shadow-[#00a8cc]/5"
            >
              <Link href="/projects">
                View All Projects
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </AnimatedBorderButton>
          </div>

          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        </div>
      </section>
    </>
  );
}
