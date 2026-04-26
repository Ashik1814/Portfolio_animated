"use client";

import { useState } from "react";
import {
  ExternalLink,
  Eye,
  Image,
} from "lucide-react";
import { AnimatedBorderButton } from "@/components/ui/animated-border-button";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useContent } from "@/stores/content-store";
import { getIcon } from "@/lib/get-icon";
import { ProjectGalleryModal } from "./project-gallery-modal";

const filters = ["All", "Development", "Design", "Automation"];

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

function ProjectImage({
  imageUrl,
  title,
  gradient,
  fallbackIcon: FallbackIcon,
}: {
  imageUrl: string;
  title: string;
  gradient: string;
  fallbackIcon: React.ElementType;
}) {
  const [imgError, setImgError] = useState(false);
  const imageSrc = buildImageUrl(imageUrl);

  if (!imageSrc || imgError) {
    return (
      <div className={`h-32 bg-gradient-to-br ${gradient} flex items-center justify-center relative`}>
        <FallbackIcon className="w-14 h-14 text-white/90 drop-shadow-lg" />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </div>
    );
  }

  return (
    <div className="h-32 relative overflow-hidden">
      <img
        src={imageSrc}
        alt={title}
        className="w-full h-full object-cover"
        onError={() => setImgError(true)}
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
    </div>
  );
}

export function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const siteConfig = useContent((s) => s.siteConfig);
  const projects = useContent((s) => s.projects);
  const loading = useContent((s) => s.loading);

  if (loading) {
    return (
      <section id="projects" className="py-20 section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 w-40 mx-auto bg-gray-200 dark:bg-gray-700 rounded" />
          </div>
        </div>
      </section>
    );
  }
  if (!siteConfig) return null;

  const filteredProjects = activeFilter === "All" ? projects : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="py-20 section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="gradient-text-cyan">Featured Projects</span>
          </h2>
          <p className="dark:text-[#94a3b8] text-gray-600 max-w-2xl mx-auto text-base leading-relaxed">
            {siteConfig.projectsDescription}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map((filter) => (
            <AnimatedFilterButton key={filter} active={activeFilter === filter} onClick={() => setActiveFilter(filter)}>
              {filter}
            </AnimatedFilterButton>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => {
            const Icon = getIcon(project.icon);
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
                  <div className={`h-32 bg-gradient-to-br ${project.gradient} flex items-center justify-center relative`}>
                    <Icon className="w-14 h-14 text-white/90 drop-shadow-lg" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  </div>
                )}

                <div className="p-5 space-y-3">
                  <h3 className="text-lg font-bold dark:text-white text-gray-900">{project.title}</h3>
                  <p className="text-sm dark:text-[#94a3b8] text-gray-600 leading-relaxed line-clamp-2">{project.description}</p>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {project.tags.map((tag) => (
                      <span key={tag.id} className={`px-3 py-1 rounded-full text-xs font-medium ${tag.bgLight} dark:${tag.bgDark} ${tag.textLight} dark:${tag.textDark}`}>
                        {tag.name}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3 pt-3">
                    <AnimatedBorderButton
                      size="sm"
                      className={`flex-1 bg-gradient-to-r from-[#00e5ff] to-[#64b5f6] hover:from-[#00c2e5] hover:to-[#5ba3e0] dark:text-[#06080f] text-white font-medium text-xs rounded-md h-9 shadow-md dark:shadow-[#00e5ff]/15 shadow-[#00a8cc]/10 transition-all duration-200 ${(!project.liveUrl || project.liveUrl === "#") ? "opacity-50 cursor-not-allowed" : ""}`}
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
                      className={`flex-1 bg-transparent dark:bg-transparent border dark:border-[#00e5ff]/30 border-[#00a8cc]/30 dark:text-[#00e5ff] text-[#00a8cc] dark:hover:bg-[#00e5ff]/25 hover:bg-[#00a8cc]/25 dark:hover:border-[#00e5ff]/60 hover:border-[#00a8cc]/60 dark:hover:text-[#00e5ff] hover:text-[#0088a3] font-medium text-xs rounded-md h-9 transition-all duration-200 ${(!project.imageUrl && !project.videoUrl) ? "opacity-50 cursor-not-allowed" : ""}`}
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

        <div className="text-center mt-14">
          <AnimatedBorderButton
            size="lg"
            className="bg-transparent dark:bg-transparent border dark:border-[#00e5ff]/30 border-[#00a8cc]/30 dark:text-[#00e5ff] text-[#00a8cc] dark:hover:bg-[#00e5ff]/25 hover:bg-[#00a8cc]/25 dark:hover:border-[#00e5ff]/60 hover:border-[#00a8cc]/60 dark:hover:text-[#00e5ff] hover:text-[#0088a3] font-medium rounded-full px-8 transition-all duration-300 shadow-sm dark:shadow-[#00e5ff]/10 shadow-[#00a8cc]/5"
            gradientVia="#00e5ff"
            gradientTo="#64b5f6"
          >
            View All Projects
          </AnimatedBorderButton>
        </div>

        <ProjectGalleryModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      </div>
    </section>
  );
}
