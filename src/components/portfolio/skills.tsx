"use client";

import {
  Cog,
  Paintbrush,
  Code2,
  Bot,
  Puzzle,
  MessageCircle,
  Users,
  Clock,
  Lightbulb,
  Target,
  TrendingUp,
  Crown,
  BookOpen,
} from "lucide-react";
import { CardSpotlight } from "@/components/ui/card-spotlight";

interface SkillBarProps {
  name: string;
  percentage: number;
  color: string;
}

function SkillBar({ name, percentage, color }: SkillBarProps) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="text-sm dark:text-white text-gray-900 font-medium">{name}</span>
        <span className="text-xs dark:text-[#64748b] text-gray-500">{percentage}%</span>
      </div>
      <div className="h-2 dark:bg-[#0d1525] bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{
            width: `${percentage}%`,
            background: `linear-gradient(90deg, ${color}, ${color}99)`,
          }}
        />
      </div>
    </div>
  );
}

const skillCategories = [
  {
    icon: Paintbrush,
    title: "Design",
    color: "#a78bfa",
    skills: [
      { name: "Figma", percentage: 95 },
      { name: "Adobe XD", percentage: 88 },
      { name: "Prototyping", percentage: 82 },
      { name: "UI/UX Design", percentage: 76 },
      { name: "Design Systems", percentage: 68 },
    ],
  },
  {
    icon: Code2,
    title: "Development",
    color: "#00e5ff",
    skills: [
      { name: "React", percentage: 96 },
      { name: "TypeScript", percentage: 83 },
      { name: "Tailwind CSS", percentage: 87 },
      { name: "Next.js", percentage: 90 },
      { name: "JavaScript", percentage: 85 },
    ],
  },
  {
    icon: Bot,
    title: "Automation",
    color: "#2dd4bf",
    skills: [
      { name: "n8n", percentage: 94 },
      { name: "Zapier", percentage: 88 },
      { name: "API Integration", percentage: 82 },
      { name: "Workflow Design", percentage: 76 },
      { name: "Make (Integromat)", percentage: 68 },
    ],
  },
];

const softSkills = [
  { icon: Puzzle, name: "Problem Solving", percentage: 95, color: "#00e5ff" },
  { icon: MessageCircle, name: "Communication", percentage: 88, color: "#64b5f6" },
  { icon: Users, name: "Team Collaboration", percentage: 82, color: "#a78bfa" },
  { icon: Clock, name: "Time Management", percentage: 76, color: "#2dd4bf" },
  { icon: Lightbulb, name: "Creativity", percentage: 90, color: "#fbbf24" },
  { icon: Target, name: "Critical Thinking", percentage: 84, color: "#00e5ff" },
  { icon: TrendingUp, name: "Adaptability", percentage: 78, color: "#64b5f6" },
  { icon: Crown, name: "Leadership", percentage: 72, color: "#a78bfa" },
];

const additionalTech = [
  "JavaScript", "HTML/CSS", "Git", "REST APIs", "GraphQL",
  "Responsive Design", "Accessibility", "Performance Optimization",
  "Design Systems", "Agile/Scrum", "CI/CD", "Testing",
  "Node.js", "MongoDB", "PostgreSQL", "Docker",
];

const currentlyLearning = [
  { name: "Web3 & Blockchain", percentage: 40, color: "#64b5f6" },
  { name: "Advanced AI Integration", percentage: 20, color: "#a78bfa" },
];

export function Skills() {
  return (
    <section id="skills" className="py-20 section-padding">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="w-12 h-12 rounded-full bg-[#64b5f6]/10 flex items-center justify-center mx-auto mb-4">
            <Cog className="w-6 h-6 text-[#64b5f6]" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="gradient-text-cyan">Skills & Expertise</span>
          </h2>
          <p className="dark:text-[#94a3b8] text-gray-600 max-w-2xl mx-auto text-base">
            A comprehensive toolkit of design, development, and automation
            skills honed through years of passionate work and continuous learning
          </p>
        </div>

        {/* Main Skill Categories */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {skillCategories.map((category) => {
            const Icon = category.icon;
            return (
              <CardSpotlight key={category.title} className="glass-card-solid dark:hover:border-[#64b5f6]/15 hover:border-[#00a8cc]/20 transition-all duration-300">
                <div className="p-6 space-y-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${category.color}12` }}>
                      <Icon className="w-5 h-5" style={{ color: category.color }} />
                    </div>
                    <h3 className="text-lg font-bold dark:text-white text-gray-900">{category.title}</h3>
                  </div>
                  <div className="space-y-3">
                    {category.skills.map((skill) => (
                      <SkillBar key={skill.name} name={skill.name} percentage={skill.percentage} color={category.color} />
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {softSkills.map((skill) => {
            const Icon = skill.icon;
            return (
              <CardSpotlight key={skill.name} className="glass-card-solid dark:hover:border-[#64b5f6]/15 hover:border-[#00a8cc]/20 transition-all duration-300 text-center">
                <div className="p-4 space-y-2">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center mx-auto" style={{ backgroundColor: `${skill.color}12` }}>
                    <Icon className="w-5 h-5" style={{ color: skill.color }} />
                  </div>
                  <h4 className="text-xs font-bold dark:text-white text-gray-900">{skill.name}</h4>
                  <span className="text-lg font-bold" style={{ color: skill.color }}>{skill.percentage}%</span>
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
            <span key={tech} className="px-4 py-2 rounded-full text-sm glass-card dark:text-[#94a3b8] text-gray-600 dark:hover:text-[#00e5ff] hover:text-[#00a8cc] dark:hover:border-[#00e5ff]/20 hover:border-[#00a8cc]/20 transition-all duration-200 cursor-default">
              {tech}
            </span>
          ))}
        </div>

        {/* Currently Learning */}
        <div className="max-w-md mx-auto">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2">
              <BookOpen className="w-5 h-5 text-[#64b5f6]" />
              <h3 className="text-xl font-bold dark:text-white text-gray-900">Currently Learning</h3>
            </div>
          </div>
          <CardSpotlight className="glass-card-solid">
            <div className="p-6 space-y-4">
              {currentlyLearning.map((item) => (
                <SkillBar key={item.name} name={item.name} percentage={item.percentage} color={item.color} />
              ))}
            </div>
          </CardSpotlight>
        </div>
      </div>
    </section>
  );
}
