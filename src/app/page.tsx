"use client";

import { Header } from "@/components/portfolio/header";
import { Hero } from "@/components/portfolio/hero";
import { Footer } from "@/components/portfolio/footer";
import { DottedSurface } from "@/components/ui/dotted-surface";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { AnimatedBorderButton } from "@/components/ui/animated-border-button";
import {
  Paintbrush,
  Code2,
  Bot,
  ShoppingBag,
  Palette,
  Zap,
  Shield,
  GraduationCap,
  Mail,
  Github,
  Linkedin,
  Youtube,
  ArrowRight,
} from "lucide-react";

/* ───────── About Preview Data ───────── */
const aboutSkills = [
  {
    icon: Paintbrush,
    title: "UI/UX Design",
    metric: "50+",
    metricLabel: "Design Projects",
    color: "#a78bfa",
  },
  {
    icon: Code2,
    title: "Frontend Development",
    metric: "30+",
    metricLabel: "Projects Built",
    color: "#00e5ff",
  },
  {
    icon: Bot,
    title: "n8n Automation",
    metric: "80%",
    metricLabel: "Efficiency Gained",
    color: "#2dd4bf",
  },
];

/* ───────── Skills Preview Data ───────── */
const skillCategories = [
  {
    icon: Paintbrush,
    title: "Design",
    color: "#a78bfa",
    skills: [
      { name: "Figma", percentage: 95 },
      { name: "Adobe XD", percentage: 88 },
    ],
  },
  {
    icon: Code2,
    title: "Development",
    color: "#00e5ff",
    skills: [
      { name: "React", percentage: 96 },
      { name: "TypeScript", percentage: 83 },
    ],
  },
  {
    icon: Bot,
    title: "Automation",
    color: "#2dd4bf",
    skills: [
      { name: "n8n", percentage: 94 },
      { name: "Zapier", percentage: 88 },
    ],
  },
];

/* ───────── Projects Preview Data ───────── */
const projects = [
  {
    icon: ShoppingBag,
    title: "E-Commerce Platform",
    description:
      "Modern e-commerce solution with seamless checkout, inventory management, and integrated payments.",
    tags: [
      { name: "React", bg: "bg-blue-500/20", text: "text-blue-300" },
      { name: "Node.js", bg: "bg-green-500/20", text: "text-green-300" },
      { name: "MongoDB", bg: "bg-yellow-500/20", text: "text-yellow-300" },
    ],
    gradient: "from-[#ff6b6b] to-[#ff8e53]",
    accentColor: "#ff6b6b",
  },
  {
    icon: Palette,
    title: "Design System",
    description:
      "Comprehensive component library with guidelines, documentation, and accessibility standards.",
    tags: [
      { name: "Figma", bg: "bg-purple-500/20", text: "text-purple-300" },
      { name: "Storybook", bg: "bg-orange-500/20", text: "text-orange-300" },
      { name: "Sketch", bg: "bg-pink-500/20", text: "text-pink-300" },
    ],
    gradient: "from-[#667eea] to-[#764ba2]",
    accentColor: "#667eea",
  },
  {
    icon: Zap,
    title: "Workflow Automation System",
    description:
      "Automated business processes reducing manual work by 80% using AI and custom integrations.",
    tags: [
      { name: "Python", bg: "bg-yellow-500/20", text: "text-yellow-200" },
      { name: "Airflow", bg: "bg-blue-500/20", text: "text-blue-300" },
      { name: "AWS", bg: "bg-orange-500/20", text: "text-orange-300" },
    ],
    gradient: "from-[#f093fb] to-[#f5576c]",
    accentColor: "#f093fb",
  },
];

/* ───────── Education Preview Data ───────── */
const degrees = [
  {
    icon: Shield,
    title: "Bachelor of Technology in Computer Science",
    institution: "University Name",
    period: "2019 - 2023",
    gpa: "8.5/10",
    gpaColor: "#00e5ff",
  },
  {
    icon: GraduationCap,
    title: "Higher Secondary Education",
    institution: "School Name",
    period: "2017 - 2019",
    gpa: "92%",
    gpaColor: "#2dd4bf",
  },
];

/* ───────── Contact Preview Data ───────── */
const socialLinks = [
  { icon: Mail, href: "mailto:hello@alchemist.io", label: "Email" },
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
];

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  HOME PAGE                                                                 */
/* ═══════════════════════════════════════════════════════════════════════════ */
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Interactive dotted wave surface background */}
      <DottedSurface />

      {/* All content sits above the dotted surface */}
      <div className="relative z-10">
        <Header />
        <main className="flex-1">
          <Hero />

          {/* ──────────────── About Preview ──────────────── */}
          <section className="py-20 section-padding">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold dark:text-white text-gray-900 mb-4">
                  What I <span className="gradient-text-cyan">Do</span>
                </h2>
                <p className="dark:text-[#94a3b8] text-gray-600 max-w-2xl mx-auto">
                  Combining design, development, and automation to create
                  impactful digital solutions.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                {aboutSkills.map((skill) => {
                  const Icon = skill.icon;
                  return (
                    <CardSpotlight key={skill.title} className="p-6">
                      <div className="flex items-start gap-4">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                          style={{
                            backgroundColor: `${skill.color}15`,
                          }}
                        >
                          <Icon
                            className="w-6 h-6"
                            style={{ color: skill.color }}
                          />
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-semibold dark:text-white text-gray-900 text-lg mb-1">
                            {skill.title}
                          </h3>
                          <div className="flex items-baseline gap-2">
                            <span
                              className="text-3xl font-bold"
                              style={{ color: skill.color }}
                            >
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
                  className="bg-gradient-to-r from-[#a78bfa]/10 to-[#00e5ff]/10 dark:from-[#a78bfa]/10 dark:to-[#00e5ff]/10 border dark:border-[#a78bfa]/30 border-[#a78bfa]/30 dark:text-[#a78bfa] text-[#7c3aed] dark:hover:from-[#a78bfa]/20 dark:hover:to-[#00e5ff]/20 hover:from-[#a78bfa]/20 hover:to-[#00e5ff]/20 font-medium rounded-full px-6"
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
                  My{" "}
                  <span className="gradient-text-purple-blue">Skills</span>
                </h2>
                <p className="dark:text-[#94a3b8] text-gray-600 max-w-2xl mx-auto">
                  A snapshot of my core competencies across design, development,
                  and automation.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                {skillCategories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <CardSpotlight key={category.title} className="p-6">
                      <div className="flex items-center gap-3 mb-5">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center"
                          style={{
                            backgroundColor: `${category.color}15`,
                          }}
                        >
                          <Icon
                            className="w-5 h-5"
                            style={{ color: category.color }}
                          />
                        </div>
                        <h3
                          className="font-semibold text-lg"
                          style={{ color: category.color }}
                        >
                          {category.title}
                        </h3>
                      </div>
                      <div className="space-y-4">
                        {category.skills.map((skill) => (
                          <div key={skill.name}>
                            <div className="flex justify-between items-center mb-1.5">
                              <span className="text-sm font-medium dark:text-white text-gray-900">
                                {skill.name}
                              </span>
                              <span
                                className="text-xs font-semibold"
                                style={{ color: category.color }}
                              >
                                {skill.percentage}%
                              </span>
                            </div>
                            <div className="w-full h-2 dark:bg-[#1e293b] bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="h-full rounded-full transition-all duration-700"
                                style={{
                                  width: `${skill.percentage}%`,
                                  background: `linear-gradient(90deg, ${category.color}, ${category.color}88)`,
                                }}
                              />
                            </div>
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
                  className="bg-gradient-to-r from-[#a78bfa]/10 to-[#64b5f6]/10 dark:from-[#a78bfa]/10 dark:to-[#64b5f6]/10 border dark:border-[#a78bfa]/30 border-[#a78bfa]/30 dark:text-[#a78bfa] text-[#7c3aed] dark:hover:from-[#a78bfa]/20 dark:hover:to-[#64b5f6]/20 hover:from-[#a78bfa]/20 hover:to-[#64b5f6]/20 font-medium rounded-full px-6"
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
                  Featured{" "}
                  <span className="gradient-text-pink-blue">Projects</span>
                </h2>
                <p className="dark:text-[#94a3b8] text-gray-600 max-w-2xl mx-auto">
                  A selection of my recent work spanning web development, design
                  systems, and automation.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                {projects.map((project) => {
                  const Icon = project.icon;
                  return (
                    <CardSpotlight key={project.title} className="overflow-hidden">
                      {/* Gradient header */}
                      <div
                        className={`h-32 bg-gradient-to-br ${project.gradient} flex items-center justify-center relative`}
                      >
                        <Icon className="w-12 h-12 text-white/80" />
                        <div className="absolute inset-0 bg-black/10" />
                      </div>
                      {/* Card body */}
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
                              key={tag.name}
                              className={`text-xs px-2.5 py-1 rounded-full font-medium ${tag.bg} ${tag.text}`}
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
                  gradientVia="#f472b6"
                  gradientTo="#64b5f6"
                  className="bg-gradient-to-r from-[#f472b6]/10 to-[#64b5f6]/10 dark:from-[#f472b6]/10 dark:to-[#64b5f6]/10 border dark:border-[#f472b6]/30 border-[#f472b6]/30 dark:text-[#f472b6] text-[#db2777] dark:hover:from-[#f472b6]/20 dark:hover:to-[#64b5f6]/20 hover:from-[#f472b6]/20 hover:to-[#64b5f6]/20 font-medium rounded-full px-6"
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
                  My{" "}
                  <span className="gradient-text-cyan">Education</span>
                </h2>
                <p className="dark:text-[#94a3b8] text-gray-600 max-w-2xl mx-auto">
                  Academic foundation that shaped my technical and creative
                  expertise.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6 mb-10 max-w-4xl mx-auto">
                {degrees.map((degree) => {
                  const Icon = degree.icon;
                  return (
                    <CardSpotlight key={degree.title} className="p-6">
                      <div className="flex items-start gap-4">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                          style={{
                            backgroundColor: `${degree.gpaColor}15`,
                          }}
                        >
                          <Icon
                            className="w-6 h-6"
                            style={{ color: degree.gpaColor }}
                          />
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
                            <span
                              className="text-sm font-bold"
                              style={{ color: degree.gpaColor }}
                            >
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
                  className="bg-gradient-to-r from-[#00e5ff]/10 to-[#2dd4bf]/10 dark:from-[#00e5ff]/10 dark:to-[#2dd4bf]/10 border dark:border-[#00e5ff]/30 border-[#00e5ff]/30 dark:text-[#00e5ff] text-[#00a8cc] dark:hover:from-[#00e5ff]/20 dark:hover:to-[#2dd4bf]/20 hover:from-[#00a8cc]/20 hover:to-[#2dd4bf]/20 font-medium rounded-full px-6"
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
                  Let&apos;s{" "}
                  <span className="gradient-text-pink-blue">Connect</span>
                </h2>
              </div>

              <div className="max-w-2xl mx-auto">
                <CardSpotlight className="p-8 sm:p-10 text-center">
                  <h3 className="text-2xl sm:text-3xl font-bold dark:text-white text-gray-900 mb-3">
                    Let&apos;s work together
                  </h3>
                  <p className="dark:text-[#94a3b8] text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
                    Have a project in mind or just want to say hello? I&apos;d
                    love to hear from you. Let&apos;s create something amazing.
                  </p>

                  {/* Social icons row */}
                  <div className="flex items-center justify-center gap-4 mb-8">
                    {socialLinks.map((social) => {
                      const Icon = social.icon;
                      return (
                        <a
                          key={social.label}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={social.label}
                          className="w-12 h-12 rounded-xl dark:border-[#1e3a5f]/50 border-gray-300 border flex items-center justify-center dark:text-[#64748b] text-gray-500 dark:hover:text-[#f472b6] hover:text-[#db2777] dark:hover:border-[#f472b6]/30 hover:border-[#db2777]/30 dark:hover:bg-[#f472b6]/5 hover:bg-[#db2777]/5 transition-all duration-200"
                        >
                          <Icon className="w-5 h-5" />
                        </a>
                      );
                    })}
                  </div>

                  <AnimatedBorderButton
                    asChild
                    gradientVia="#f472b6"
                    gradientTo="#64b5f6"
                    className="bg-[#f472b6] dark:bg-[#f472b6] hover:bg-[#e879a8] dark:hover:bg-[#e879a8] dark:text-[#06080f] text-white font-semibold rounded-full px-8 shadow-lg dark:shadow-[#f472b6]/25 shadow-[#db2777]/20"
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
        </main>
      </div>

      <div className="relative z-10 mt-auto">
        <Footer />
      </div>
    </div>
  );
}
