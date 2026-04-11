"use client";

import {
  Cog,
  BookOpen,
} from "lucide-react";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { MovingBorderIcon } from "@/components/ui/moving-border-icon";
import { TechIcon } from "@/components/ui/tech-icon";
import { useContent } from "@/stores/content-store";
import { getIcon } from "@/lib/get-icon";

export function Skills() {
  const siteConfig = useContent((s) => s.siteConfig);
  const skillCategories = useContent((s) => s.skillCategories);
  const softSkills = useContent((s) => s.softSkills);
  const additionalTech = useContent((s) => s.additionalTech);
  const currentlyLearning = useContent((s) => s.currentlyLearning);

  if (!siteConfig) return null;

  return (
    <section id="skills" className="py-20 section-padding">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="w-12 h-12 rounded-full bg-[#64b5f6]/15 flex items-center justify-center mx-auto mb-4">
            <Cog className="w-6 h-6 text-[#64b5f6]" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="gradient-text-cyan">Skills & Expertise</span>
          </h2>
          <p className="dark:text-[#94a3b8] text-gray-600 max-w-2xl mx-auto text-base">
            {siteConfig.skillsDescription}
          </p>
        </div>

        {/* Main Skill Categories — Logo + Name Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {skillCategories.map((category) => {
            const Icon = getIcon(category.icon);
            return (
              <CardSpotlight key={category.id} className="glass-card-solid dark:hover:border-[#64b5f6]/15 hover:border-[#00a8cc]/20 transition-all duration-300">
                <div className="p-6 space-y-5">
                  <div className="flex items-center gap-3">
                    <MovingBorderIcon borderRadius="0.5rem" className="w-12 h-12" duration={5}>
                      <div className="absolute inset-0 rounded-[inherit]" style={{ backgroundColor: `${category.color}18` }} />
                      <Icon className="w-6 h-6 relative" style={{ color: category.color }} />
                    </MovingBorderIcon>
                    <h3 className="text-lg font-bold dark:text-white text-gray-900">{category.title}</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {category.skills.map((skill) => (
                      <div
                        key={skill.id}
                        className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl dark:bg-white/[0.04] bg-gray-50 dark:hover:bg-white/[0.08] hover:bg-gray-100 transition-colors duration-200 group"
                      >
                        <TechIcon
                          name={skill.name}
                          size={28}
                          className="shrink-0 transition-colors duration-200"
                        />
                        <span className="text-sm font-medium dark:text-white text-gray-900 truncate group-hover:dark:text-[#00e5ff] group-hover:text-[#00a8cc] transition-colors duration-200">
                          {skill.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardSpotlight>
            );
          })}
        </div>

        {/* Soft Skills */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold"><span className="gradient-text-purple-blue">Soft Skills</span></h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-16">
          {softSkills.map((skill) => {
            const Icon = getIcon(skill.icon);
            return (
              <CardSpotlight key={skill.id} className="glass-card-solid dark:hover:border-[#64b5f6]/15 hover:border-[#00a8cc]/20 transition-all duration-300 text-center">
                <div className="p-4 flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: `${skill.color}18` }}>
                    <Icon className="w-6 h-6" style={{ color: skill.color }} />
                  </div>
                  <h4 className="text-sm font-bold dark:text-white text-gray-900">{skill.name}</h4>
                </div>
              </CardSpotlight>
            );
          })}
        </div>

        {/* Additional Technologies */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold"><span className="gradient-text-cyan">Additional Technologies</span></h3>
        </div>
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {additionalTech.map((tech) => (
            <span key={tech.id} className="flex items-center gap-2 px-4 py-2 rounded-full text-sm glass-card dark:text-[#94a3b8] text-gray-600 dark:hover:text-[#00e5ff] hover:text-[#00a8cc] dark:hover:border-[#00e5ff]/20 hover:border-[#00a8cc]/20 transition-all duration-200 cursor-default">
              <TechIcon name={tech.name} size={20} />
              {tech.name}
            </span>
          ))}
        </div>

        {/* Currently Learning */}
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2">
              <MovingBorderIcon borderRadius="0.375rem" className="w-7 h-7" duration={5}>
                <div className="absolute inset-0 rounded-[inherit] bg-[#64b5f6]/15" />
                <BookOpen className="w-4 h-4 text-[#64b5f6] relative" />
              </MovingBorderIcon>
              <h3 className="text-xl font-bold dark:text-white text-gray-900">Currently Learning</h3>
            </div>
          </div>
          <CardSpotlight className="glass-card-solid">
            <div className="p-6">
              <div className="flex flex-wrap justify-center gap-4">
                {currentlyLearning.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-2.5 px-4 py-3 rounded-xl dark:bg-white/[0.04] bg-gray-50 transition-colors duration-200"
                  >
                    <TechIcon name={item.name} size={28} />
                    <span className="text-sm font-medium dark:text-white text-gray-900">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardSpotlight>
        </div>
      </div>
    </section>
  );
}
