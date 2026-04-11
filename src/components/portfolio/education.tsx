"use client";

import {
  GraduationCap,
  Award,
  BookOpen,
  Code2,
  Database,
  Globe,
  Wrench,
  Monitor,
  Wifi,
  Brain,
  GitBranch,
  Cpu,
  Shield,
  BarChart3,
  FileCode,
  Layers,
  MapPin,
  Calendar,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { MovingBorderIcon } from "@/components/ui/moving-border-icon";
import { useContent } from "@/stores/content-store";
import { getIcon } from "@/lib/get-icon";

/** Map coursework keywords to a matching icon + tint color */
function getCourseworkIcon(name: string): { Icon: LucideIcon; color: string } {
  const lower = name.toLowerCase();
  const map: { keywords: string[]; Icon: LucideIcon; color: string }[] = [
    { keywords: ["data structure", "algorithm", "dsa"], Icon: GitBranch, color: "#00e5ff" },
    { keywords: ["object-oriented", "oop", "programming"], Icon: Code2, color: "#64b5f6" },
    { keywords: ["database", "dbms", "sql"], Icon: Database, color: "#2dd4bf" },
    { keywords: ["web", "frontend", "fullstack", "full-stack"], Icon: Globe, color: "#38bdf8" },
    { keywords: ["software engineering", "software eng", "swe"], Icon: Wrench, color: "#a78bfa" },
    { keywords: ["operating system", "os"], Icon: Monitor, color: "#f472b6" },
    { keywords: ["network", "computer network"], Icon: Wifi, color: "#fb923c" },
    { keywords: ["machine learning", "ml", "ai", "deep learning"], Icon: Brain, color: "#c084fc" },
    { keywords: ["computer architecture", "architecture", "hardware"], Icon: Cpu, color: "#34d399" },
    { keywords: ["security", "cyber", "crypto"], Icon: Shield, color: "#f87171" },
    { keywords: ["statistics", "statistic", "probability", "data science"], Icon: BarChart3, color: "#fbbf24" },
    { keywords: ["compiler", "automata", "theory"], Icon: FileCode, color: "#22d3ee" },
    { keywords: ["design", "ui", "ux", "graphic"], Icon: Layers, color: "#e879f9" },
  ];

  for (const entry of map) {
    if (entry.keywords.some((k) => lower.includes(k))) {
      return { Icon: entry.Icon, color: entry.color };
    }
  }
  return { Icon: BookOpen, color: "#94a3b8" };
}

export function Education() {
  const siteConfig = useContent((s) => s.siteConfig);
  const degrees = useContent((s) => s.degrees);
  const certifications = useContent((s) => s.certifications);
  const coursework = useContent((s) => s.coursework);

  if (!siteConfig) return null;

  return (
    <section id="education" className="py-20 section-padding">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="w-14 h-14 rounded-full bg-[#64b5f6]/15 flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="w-7 h-7 text-[#64b5f6]" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="gradient-text-cyan">Education</span>
          </h2>
          <p className="dark:text-[#94a3b8] text-gray-600 max-w-2xl mx-auto text-base">
            {siteConfig.educationDescription}
          </p>
        </div>

        {/* Degree Cards — Timeline style */}
        <div className="relative max-w-4xl mx-auto mb-20">
          {/* Vertical timeline line */}
          <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[#00e5ff] via-[#64b5f6] to-[#a78bfa]" />

          <div className="space-y-8">
            {degrees.map((degree, index) => {
              const Icon = getIcon(degree.icon);
              const achievementList = degree.achievements ? degree.achievements.split(',').filter(Boolean) : [];
              const colors = ["#00e5ff", "#2dd4bf", "#a78bfa"];
              const accentColor = colors[index % colors.length];

              return (
                <div key={degree.id} className="relative flex gap-5 sm:gap-7">
                  {/* Timeline dot */}
                  <MovingBorderIcon borderRadius="9999px" className="absolute left-6 sm:left-8 -translate-x-1/2 w-12 h-12 sm:w-14 sm:h-14 z-10 shrink-0" duration={5}>
                    <div className="absolute inset-0 rounded-[inherit]" style={{ backgroundColor: `${accentColor}18` }} />
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 relative" style={{ color: accentColor }} />
                  </MovingBorderIcon>

                  {/* Card */}
                  <CardSpotlight className="glass-card-solid dark:hover:border-[#64b5f6]/15 hover:border-[#00a8cc]/20 transition-all duration-300 flex-1 ml-16 sm:ml-20">
                    <div className="p-5 sm:p-7 space-y-4">
                      {/* Title row */}
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold dark:text-white text-gray-900 mb-2">
                          {degree.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
                          <span className="flex items-center gap-1.5 text-sm dark:text-[#94a3b8] text-gray-600">
                            <MapPin className="w-3.5 h-3.5 shrink-0" />
                            {degree.institution}{degree.location ? ` • ${degree.location}` : ''}
                          </span>
                        </div>
                      </div>

                      {/* Meta chips */}
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium dark:bg-white/[0.05] bg-gray-100 dark:text-[#94a3b8] text-gray-600">
                          <Calendar className="w-3.5 h-3.5" />
                          {degree.period}
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold" style={{ backgroundColor: `${accentColor}15`, color: accentColor }}>
                          <TrendingUp className="w-3.5 h-3.5" />
                          GPA: {degree.gpa}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="dark:text-[#94a3b8] text-gray-600 text-sm leading-relaxed">
                        {degree.description}
                      </p>

                      {/* Achievements */}
                      {achievementList.length > 0 && (
                        <div>
                          <h4 className="text-sm font-semibold dark:text-white text-gray-900 mb-2.5">Key Achievements</h4>
                          <div className="grid sm:grid-cols-2 gap-2">
                            {achievementList.map((achievement, i) => (
                              <div key={i} className="flex items-start gap-2 text-sm dark:text-[#94a3b8] text-gray-600">
                                <Award className="w-4 h-4 text-[#fbbf24] shrink-0 mt-0.5" />
                                <span>{achievement.trim()}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardSpotlight>
                </div>
              );
            })}
          </div>
        </div>

        {/* Certifications */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold"><span className="gradient-text-purple-blue">Certifications</span></h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
          {certifications.map((cert) => {
            const Icon = getIcon(cert.icon);
            return (
              <CardSpotlight key={cert.id} className="glass-card-solid dark:hover:border-[#64b5f6]/15 hover:border-[#00a8cc]/20 transition-all duration-300 group">
                <div className="p-5 flex items-start gap-4">
                  <MovingBorderIcon borderRadius="0.5rem" className="w-12 h-12 shrink-0" duration={5}>
                    <div className="absolute inset-0 rounded-[inherit]" style={{ backgroundColor: `${cert.color}18` }} />
                    <Icon className="w-5 h-5 relative" style={{ color: cert.color }} />
                  </MovingBorderIcon>
                  <div>
                    <h4 className="text-sm font-bold dark:text-white text-gray-900 mb-0.5">{cert.name}</h4>
                    <p className="text-xs dark:text-[#94a3b8] text-gray-600">{cert.issuer} • {cert.year}</p>
                  </div>
                </div>
              </CardSpotlight>
            );
          })}
        </div>

        {/* Relevant Coursework */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold"><span className="gradient-text-pink-blue">Relevant Coursework</span></h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {coursework.map((course) => {
            const { Icon, color } = getCourseworkIcon(course.name);
            return (
              <div
                key={course.id}
                className="group flex items-center gap-3 px-4 py-3 rounded-lg border dark:border-white/[0.06] border-gray-200/60 dark:bg-white/[0.02] bg-gray-50/50 dark:hover:border-white/[0.12] hover:border-gray-300/60 dark:hover:bg-white/[0.04] hover:bg-gray-100/50 transition-all duration-200 cursor-default"
              >
                <div
                  className="w-8 h-8 rounded-md flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${color}15` }}
                >
                  <Icon className="w-4 h-4" style={{ color }} />
                </div>
                <span className="text-sm font-medium dark:text-[#94a3b8] text-gray-600 dark:group-hover:text-white group-hover:text-gray-900 transition-colors duration-200">
                  {course.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
