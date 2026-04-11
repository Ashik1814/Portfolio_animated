"use client";

import {
  User,
  Sparkles,
} from "lucide-react";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { MovingBorderIcon } from "@/components/ui/moving-border-icon";
import { useContent } from "@/stores/content-store";
import { getIcon } from "@/lib/get-icon";

export function About() {
  const siteConfig = useContent((s) => s.siteConfig);
  const aboutSkills = useContent((s) => s.aboutSkills);
  const coreValues = useContent((s) => s.coreValues);
  const journeyItems = useContent((s) => s.journeyItems);
  const aboutTechTags = useContent((s) => s.aboutTechTags);

  if (!siteConfig) return null;

  return (
    <section id="about" className="py-20 section-padding">
      <div className="max-w-7xl mx-auto">
        {/* Profile Image + Section Header */}
        <div className="text-center mb-16">
          <div className="relative w-48 h-56 sm:w-56 sm:h-64 mx-auto mb-6">
            {/* Glow */}
            <div className="absolute -inset-3 bg-gradient-to-r from-[#00e5ff]/15 via-[#64b5f6]/15 to-[#a78bfa]/15 rounded-2xl blur-xl" />
            {/* Rectangular card with moving border */}
            <MovingBorderIcon borderRadius="1rem" className="w-full h-full" duration={6}>
              {siteConfig.heroProfileImage ? (
                <img
                  src={siteConfig.heroProfileImage}
                  alt={siteConfig.heroName}
                  className="w-full h-full rounded-[calc(1rem-1px)] object-cover object-top"
                />
              ) : (
                <div className="w-full h-full rounded-[calc(1rem-1px)] dark:bg-gradient-to-br dark:from-[#0a0f1e] dark:to-[#0d1525] bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                  <User className="w-12 h-12 dark:text-[#64748b]/60 text-gray-400" />
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
