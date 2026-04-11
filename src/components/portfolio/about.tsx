"use client";

import {
  User,
  Lightbulb,
  Target,
  Handshake,
  Sparkles,
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

export function About() {
  const siteConfig = useContent((s) => s.siteConfig);
  const aboutSkills = useContent((s) => s.aboutSkills);
  const coreValues = useContent((s) => s.coreValues);
  const journeyItems = useContent((s) => s.journeyItems);
  const aboutTechTags = useContent((s) => s.aboutTechTags);
  const coursework = useContent((s) => s.coursework);

  if (!siteConfig) return null;

  return (
    <section id="about" className="py-20 section-padding">
      <div className="max-w-7xl mx-auto">
        {/* Profile Image + Section Header */}
        <div className="text-center mb-16">
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 mx-auto mb-6">
            {/* Glow ring */}
            <div className="absolute -inset-3 bg-gradient-to-r from-[#00e5ff]/20 via-[#64b5f6]/20 to-[#a78bfa]/20 rounded-full blur-xl" />
            {/* Moving border profile ring */}
            <MovingBorderIcon borderRadius="9999px" className="w-full h-full" duration={6}>
              {siteConfig.heroProfileImage ? (
                <img
                  src={siteConfig.heroProfileImage}
                  alt={siteConfig.heroName}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <div className="w-full h-full rounded-full dark:bg-gradient-to-br dark:from-[#0a0f1e] dark:to-[#0d1525] bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                  <User className="w-10 h-10 dark:text-[#64748b]/60 text-gray-400" />
                </div>
              )}
            </MovingBorderIcon>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="gradient-text-cyan">About Me</span>
          </h2>
          <p className="dark:text-[#94a3b8] text-gray-600 max-w-2xl mx-auto text-base leading-relaxed">
            {siteConfig.aboutDescription}
          </p>
        </div>

        {/* Skills Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {aboutSkills.map((skill) => {
            const Icon = getIcon(skill.icon);
            return (
              <CardSpotlight
                key={skill.id}
                className="glass-card-solid dark:hover:border-[#64b5f6]/15 hover:border-[#00a8cc]/20 transition-all duration-300 group"
              >
                <div className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${skill.color}18` }}>
                    <Icon className="w-6 h-6" style={{ color: skill.color }} />
                  </div>
                  <h3 className="text-lg font-bold dark:text-white text-gray-900">
                    {skill.title}
                  </h3>
                  <p className="text-sm dark:text-[#94a3b8] text-gray-600 leading-relaxed">
                    {skill.description}
                  </p>
                  <div className="pt-2">
                    <span
                      className="text-2xl font-bold"
                      style={{ color: skill.color }}
                    >
                      {skill.metric}
                    </span>
                    <span className="text-sm dark:text-[#64748b] text-gray-500 ml-2">
                      {skill.metricLabel}
                    </span>
                  </div>
                </div>
              </CardSpotlight>
            );
          })}
        </div>

        {/* My Approach */}
        <CardSpotlight className="glass-card-solid mb-12">
          <div className="p-8 text-center max-w-3xl mx-auto">
            <div className="w-12 h-12 rounded-full dark:bg-[#00e5ff]/10 bg-[#00a8cc]/10 flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-6 h-6 dark:text-[#00e5ff] text-[#00a8cc]" />
            </div>
            <h3 className="text-xl font-bold dark:text-white text-gray-900 mb-4">{siteConfig.approachTitle}</h3>
            <p className="dark:text-[#94a3b8] text-gray-600 text-sm leading-relaxed mb-4">
              {siteConfig.approachText1}
            </p>
            <p className="dark:text-[#94a3b8] text-gray-600 text-sm leading-relaxed">
              {siteConfig.approachText2}
            </p>
          </div>
        </CardSpotlight>

        {/* Relevant Coursework */}
        {coursework.length > 0 && (
          <>
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold"><span className="gradient-text-pink-blue">Relevant Coursework</span></h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mb-16">
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
          </>
        )}

        {/* Tech Tags */}
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold dark:text-white/60 text-gray-500">Technologies I Work With</h3>
        </div>
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {aboutTechTags.map((tag) => (
            <span
              key={tag.id}
              className="px-4 py-2 rounded-full text-sm font-medium glass-card dark:text-[#94a3b8] text-gray-600 dark:hover:text-[#00e5ff] hover:text-[#00a8cc] dark:hover:border-[#00e5ff]/20 hover:border-[#00a8cc]/20 transition-all duration-200"
            >
              {tag.name}
            </span>
          ))}
        </div>

        {/* Core Values */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold dark:text-white text-gray-900">Core Values</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {coreValues.map((value) => {
            const Icon = getIcon(value.icon);
            return (
              <CardSpotlight
                key={value.id}
                className="glass-card-solid dark:hover:border-[#64b5f6]/15 hover:border-[#00a8cc]/20 transition-all duration-300 text-center"
              >
                <div className="p-5 space-y-2">
                  <div className="w-10 h-10 rounded-full bg-[#64b5f6]/15 flex items-center justify-center mx-auto">
                    <Icon className="w-5 h-5 text-[#64b5f6]" />
                  </div>
                  <h4 className="text-sm font-bold dark:text-white text-gray-900">
                    {value.title}
                  </h4>
                  <p className="text-xs dark:text-[#94a3b8] text-gray-600">{value.description}</p>
                </div>
              </CardSpotlight>
            );
          })}
        </div>

        {/* My Journey Timeline */}
        <div className="text-center mb-10">
          <h3 className="text-2xl font-bold dark:text-white text-gray-900">My Journey</h3>
        </div>
        <div className="max-w-2xl mx-auto relative">
          {/* Timeline line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#00e5ff] via-[#64b5f6] to-[#a78bfa]" />

          {journeyItems.map((item, index) => (
            <div
              key={item.id}
              className={`relative flex items-start mb-8 last:mb-0 ${
                index % 2 === 0
                  ? "md:flex-row"
                  : "md:flex-row-reverse"
              }`}
            >
              {/* Timeline dot */}
              <MovingBorderIcon borderRadius="9999px" className="absolute left-6 md:left-1/2 -translate-x-1/2 w-10 h-10 z-10" duration={5}>
                <div className="absolute inset-0 rounded-[inherit] dark:bg-[#08050f] bg-[#f8f9fc]" />
                <span className="text-xs font-bold dark:text-[#00e5ff] text-[#00a8cc] relative">
                  {item.year}
                </span>
              </MovingBorderIcon>

              {/* Content */}
              <div
                className={`ml-20 md:ml-0 md:w-[calc(50%-2rem)] ${
                  index % 2 === 0
                    ? "md:pr-8 md:text-right"
                    : "md:pl-8 md:ml-auto"
                }`}
              >
                <CardSpotlight className="glass-card-solid">
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="md:hidden text-xs font-bold dark:text-[#00e5ff] text-[#00a8cc]">
                        {item.year}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold dark:text-white text-gray-900 mb-1">
                      {item.title}
                    </h4>
                    <p className="text-xs dark:text-[#94a3b8] text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </CardSpotlight>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
