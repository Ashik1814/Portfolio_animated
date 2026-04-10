"use client";

import {
  Paintbrush,
  Code2,
  Bot,
  User,
  Lightbulb,
  Target,
  Handshake,
  GraduationCap,
  Briefcase,
  Sparkles,
  Award,
} from "lucide-react";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { MovingBorderIcon } from "@/components/ui/moving-border-icon";

const skills = [
  {
    icon: Paintbrush,
    title: "UI/UX Design",
    description:
      "Crafting intuitive and visually stunning user interfaces with a focus on user experience and accessibility. I believe great design is both functional and beautiful.",
    metric: "50+",
    metricLabel: "Design Projects",
    color: "#a78bfa",
  },
  {
    icon: Code2,
    title: "Frontend Development",
    description:
      "Building responsive, performant web applications using modern technologies like React, TypeScript, and Tailwind CSS. Clean code is my priority.",
    metric: "30+",
    metricLabel: "Projects Built",
    color: "#00e5ff",
  },
  {
    icon: Bot,
    title: "n8n Automation",
    description:
      "Designing and implementing intelligent automation solutions to streamline business processes and save countless hours of manual work.",
    metric: "80%",
    metricLabel: "Efficiency Gained",
    color: "#2dd4bf",
  },
];

const coreValues = [
  {
    icon: User,
    title: "User-Centered",
    description: "Every decision starts with the user in mind.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Always exploring new technologies and approaches.",
  },
  {
    icon: Target,
    title: "Goal-Oriented",
    description: "Focused on achieving measurable results.",
  },
  {
    icon: Handshake,
    title: "Collaboration",
    description: "Working closely with teams and stakeholders.",
  },
];

const journeyItems = [
  {
    year: "2019",
    title: "Started CSE Journey",
    description:
      "Began my bachelor's in Computer Science Engineering, discovering my passion for web development and design.",
  },
  {
    year: "2021",
    title: "First Freelance Project",
    description:
      "Completed my first freelance project: a responsive website for a local business, sparking my entrepreneurial spirit.",
  },
  {
    year: "2022",
    title: "Deep Dive into UI/UX",
    description:
      "Pursued advanced training in design principles, Figma, and user research methodologies. Won college hackathon with innovative design.",
  },
  {
    year: "2023",
    title: "Graduated & Specialized",
    description:
      "Completed my B.Tech in Computer Science and began specializing in frontend development and n8n automation workflows.",
  },
  {
    year: "2024",
    title: "Full-Stack Growth",
    description:
      "Expanded into backend integration, API development, and building end-to-end automation solutions for clients worldwide.",
  },
];

const techTags = [
  "React",
  "TypeScript",
  "Figma",
  "Tailwind CSS",
  "n8n",
  "Node.js",
];

export function About() {
  return (
    <section id="about" className="py-20 section-padding">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="gradient-text-cyan">About Me</span>
          </h2>
          <p className="dark:text-[#94a3b8] text-gray-600 max-w-2xl mx-auto text-base leading-relaxed">
            I&apos;m a passionate CSE graduate who loves turning ideas into
            reality through design and code. With a unique blend of creative
            design thinking and technical expertise, I create digital
            experiences that users love and businesses value.
          </p>
        </div>

        {/* Skills Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {skills.map((skill) => {
            const Icon = skill.icon;
            return (
              <CardSpotlight
                key={skill.title}
                className="glass-card-solid dark:hover:border-[#64b5f6]/15 hover:border-[#00a8cc]/20 transition-all duration-300 group"
              >
                <div className="p-6 space-y-4">
                  <MovingBorderIcon borderRadius="0.75rem" className="w-12 h-12" duration={5}>
                    <div className="absolute inset-0 rounded-[inherit]" style={{ backgroundColor: `${skill.color}18` }} />
                    <Icon
                      className="w-6 h-6 relative"
                      style={{ color: skill.color }}
                    />
                  </MovingBorderIcon>
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
            <MovingBorderIcon borderRadius="9999px" className="w-12 h-12 mx-auto mb-4" duration={5}>
              <div className="absolute inset-0 rounded-[inherit] dark:bg-[#00e5ff]/15 bg-[#00a8cc]/15" />
              <Sparkles className="w-6 h-6 dark:text-[#00e5ff] text-[#00a8cc] relative" />
            </MovingBorderIcon>
            <h3 className="text-xl font-bold dark:text-white text-gray-900 mb-4">My Approach</h3>
            <p className="dark:text-[#94a3b8] text-gray-600 text-sm leading-relaxed mb-4">
              I believe that great digital products are born at the intersection
              of beautiful design, clean code, and smart automation. My approach
              is user-centered, data-driven, and driven by a passion for
              continuous learning and improvement.
            </p>
            <p className="dark:text-[#94a3b8] text-gray-600 text-sm leading-relaxed">
              Whether I&apos;m designing an interface, writing code, or setting
              up an automation workflow, I always ask: &apos;How can this create
              the most value for users while maintaining technical
              excellence?&apos; This philosophy guides every project I take on.
            </p>
          </div>
        </CardSpotlight>

        {/* Tech Tags */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {techTags.map((tag) => (
            <span
              key={tag}
              className="px-4 py-2 rounded-full text-sm font-medium glass-card dark:text-[#94a3b8] text-gray-600 dark:hover:text-[#00e5ff] hover:text-[#00a8cc] dark:hover:border-[#00e5ff]/20 hover:border-[#00a8cc]/20 transition-all duration-200"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Core Values */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold dark:text-white text-gray-900">Core Values</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {coreValues.map((value) => {
            const Icon = value.icon;
            return (
              <CardSpotlight
                key={value.title}
                className="glass-card-solid dark:hover:border-[#64b5f6]/15 hover:border-[#00a8cc]/20 transition-all duration-300 text-center"
              >
                <div className="p-5 space-y-2">
                  <MovingBorderIcon borderRadius="9999px" className="w-10 h-10 mx-auto" duration={5}>
                    <div className="absolute inset-0 rounded-[inherit] bg-[#64b5f6]/15" />
                    <Icon className="w-5 h-5 text-[#64b5f6] relative" />
                  </MovingBorderIcon>
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
              key={item.year}
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
