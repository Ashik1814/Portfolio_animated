"use client";

import { Hero } from "@/components/portfolio/hero";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { AnimatedBorderButton } from "@/components/ui/animated-border-button";
import { TechIcon } from "@/components/ui/tech-icon";
import {
  ArrowRight,
} from "lucide-react";
import { useContent } from "@/stores/content-store";
import { getIcon } from "@/lib/get-icon";

export default function Home() {
  const siteConfig = useContent((s) => s.siteConfig);
  const aboutSkills = useContent((s) => s.aboutSkills);
  const skillCategories = useContent((s) => s.skillCategories);
  const projects = useContent((s) => s.projects);
  const degrees = useContent((s) => s.degrees);
  const socialLinks = useContent((s) => s.socialLinks);

  if (!siteConfig) {
    return <Hero />;
  }

  // Preview data: take first 3 projects, first 2 degrees
  const previewProjects = projects.slice(0, 3);
  const previewDegrees = degrees.slice(0, 2);

  return (
    <>
      <Hero />

      {/* ──────────────── About Preview ──────────────── */}
      <section className="py-20 section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold dark:text-white text-gray-900 mb-4">
              What I <span className="gradient-text-cyan">Do</span>
            </h2>
            <p className="dark:text-[#94a3b8] text-gray-600 max-w-2xl mx-auto">
              {siteConfig.aboutDescription}
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
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold" style={{ color: skill.color }}>
                          {skill.metric}
                        </span>
                        <span className="text-sm dark:text-[#94a3b8] text-gray-600">
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
              <a href="/about">
                Learn More
                <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </AnimatedBorderButton>
          </div>
        </div>
      </section>

      {/* ──────────────── Skills Preview ──────────────── */}
      <section className="py-20 section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold dark:text-white text-gray-900 mb-4">
              My <span className="gradient-text-purple-blue">Skills</span>
            </h2>
            <p className="dark:text-[#94a3b8] text-gray-600 max-w-2xl mx-auto">
              {siteConfig.skillsDescription}
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
              <a href="/skills">
                View All Skills
                <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </AnimatedBorderButton>
          </div>
        </div>
      </section>

      {/* ──────────────── Projects Preview ──────────────── */}
      <section className="py-20 section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold dark:text-white text-gray-900 mb-4">
              Featured <span className="gradient-text-pink-blue">Projects</span>
            </h2>
            <p className="dark:text-[#94a3b8] text-gray-600 max-w-2xl mx-auto">
              {siteConfig.projectsDescription}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {previewProjects.map((project) => {
              const Icon = getIcon(project.icon);
              return (
                <CardSpotlight key={project.id} className="overflow-hidden">
                  <div
                    className={`h-32 bg-gradient-to-br ${project.gradient} flex items-center justify-center relative`}
                  >
                    <Icon className="w-12 h-12 text-white/80" />
                    <div className="absolute inset-0 bg-black/10" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold dark:text-white text-gray-900 text-lg mb-2">
                      {project.title}
                    </h3>
                    <p className="text-sm dark:text-[#94a3b8] text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag.id}
                          className={`text-xs px-2.5 py-1 rounded-full font-medium ${tag.bgLight} dark:${tag.bgDark} ${tag.textLight} dark:${tag.textDark}`}
                        >
                          {tag.name}
                        </span>
                      ))}
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
              className="bg-gradient-to-r from-[#00e5ff]/15 to-[#64b5f6]/15 dark:from-[#00e5ff]/15 dark:to-[#64b5f6]/15 border dark:border-[#00e5ff]/35 border-[#00a8cc]/35 dark:text-[#00e5ff] text-[#00a8cc] dark:hover:from-[#00e5ff]/40 dark:hover:to-[#64b5f6]/40 hover:from-[#00a8cc]/35 hover:to-[#64b5f6]/35 dark:hover:border-[#00e5ff]/70 hover:border-[#00a8cc]/70 font-medium rounded-full px-6 shadow-sm dark:shadow-[#00e5ff]/10 shadow-[#00a8cc]/5"
            >
              <a href="/projects">
                View All Projects
                <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </AnimatedBorderButton>
          </div>
        </div>
      </section>

      {/* ──────────────── Education Preview ──────────────── */}
      <section className="py-20 section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold dark:text-white text-gray-900 mb-4">
              My <span className="gradient-text-cyan">Education</span>
            </h2>
            <p className="dark:text-[#94a3b8] text-gray-600 max-w-2xl mx-auto">
              {siteConfig.educationDescription}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 mb-10 max-w-4xl mx-auto">
            {previewDegrees.map((degree) => {
              const Icon = getIcon(degree.icon);
              return (
                <CardSpotlight key={degree.id} className="p-6">
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${degree.gpaColor}15` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: degree.gpaColor }} />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold dark:text-white text-gray-900 text-base mb-1 leading-snug">
                        {degree.title}
                      </h3>
                      <p className="text-sm dark:text-[#94a3b8] text-gray-600 mb-2">
                        {degree.institution}
                      </p>
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="text-xs dark:text-[#64748b] text-gray-500">
                          {degree.period}
                        </span>
                        <span className="text-sm font-bold" style={{ color: degree.gpaColor }}>
                          GPA: {degree.gpa}
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
              gradientVia="#00e5ff"
              gradientTo="#2dd4bf"
              className="bg-gradient-to-r from-[#00e5ff]/15 to-[#2dd4bf]/15 dark:from-[#00e5ff]/15 dark:to-[#2dd4bf]/15 border dark:border-[#00e5ff]/35 border-[#00a8cc]/35 dark:text-[#00e5ff] text-[#00a8cc] dark:hover:from-[#00e5ff]/40 dark:hover:to-[#2dd4bf]/40 hover:from-[#00a8cc]/35 hover:to-[#2dd4bf]/35 dark:hover:border-[#00e5ff]/70 hover:border-[#00a8cc]/70 font-medium rounded-full px-6 shadow-sm dark:shadow-[#00e5ff]/10 shadow-[#00a8cc]/5"
            >
              <a href="/education">
                View All
                <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </AnimatedBorderButton>
          </div>
        </div>
      </section>

      {/* ──────────────── Contact Preview ──────────────── */}
      <section className="py-20 section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold dark:text-white text-gray-900 mb-4">
              Let&apos;s <span className="gradient-text-pink-blue">Connect</span>
            </h2>
          </div>

          <div className="max-w-2xl mx-auto">
            <CardSpotlight className="p-8 sm:p-10 text-center">
              <h3 className="text-2xl sm:text-3xl font-bold dark:text-white text-gray-900 mb-3">
                Let&apos;s work together
              </h3>
              <p className="dark:text-[#94a3b8] text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
                {siteConfig.contactDescription}
              </p>

              <div className="flex items-center justify-center gap-4 mb-8">
                {socialLinks.map((social) => {
                  const Icon = getIcon(social.icon);
                  return (
                    <a
                      key={social.id}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="w-12 h-12 rounded-xl dark:border-[#1e3a5f]/50 border-gray-300 border flex items-center justify-center dark:text-[#64748b] text-gray-500 dark:hover:text-[#00e5ff] hover:text-[#00a8cc] dark:hover:border-[#00e5ff]/30 hover:border-[#00a8cc]/30 dark:hover:bg-[#00e5ff]/5 hover:bg-[#00a8cc]/5 transition-all duration-200"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>

              <AnimatedBorderButton
                asChild
                gradientVia="#00e5ff"
                gradientTo="#64b5f6"
                className="bg-[#00e5ff] dark:bg-[#00e5ff] hover:bg-[#00c2e5] dark:hover:bg-[#00c2e5] dark:text-[#06080f] text-white font-semibold rounded-full px-8 shadow-lg dark:shadow-[#00e5ff]/25 shadow-[#00a8cc]/20"
              >
                <a href="/contact">
                  Get In Touch
                  <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              </AnimatedBorderButton>
            </CardSpotlight>
          </div>
        </div>
      </section>
    </>
  );
}
