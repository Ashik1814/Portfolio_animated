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
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface SkillBarProps {
  name: string;
  percentage: number;
  color: string;
}

function SkillBar({ name, percentage, color }: SkillBarProps) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="text-sm text-white font-medium">{name}</span>
        <span className="text-xs text-[#a0a0b0]">{percentage}%</span>
      </div>
      <div className="h-2 bg-[#2a1f45] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{
            width: `${percentage}%`,
            background: `linear-gradient(90deg, ${color}, ${color}cc)`,
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
    color: "#ff6b9d",
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
    color: "#4dabf7",
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
  { icon: Puzzle, name: "Problem Solving", percentage: 95, color: "#ff6b9d" },
  { icon: MessageCircle, name: "Communication", percentage: 88, color: "#4dabf7" },
  { icon: Users, name: "Team Collaboration", percentage: 82, color: "#a855f7" },
  { icon: Clock, name: "Time Management", percentage: 76, color: "#2dd4bf" },
  { icon: Lightbulb, name: "Creativity", percentage: 90, color: "#fbbf24" },
  { icon: Target, name: "Critical Thinking", percentage: 84, color: "#ff6b9d" },
  { icon: TrendingUp, name: "Adaptability", percentage: 78, color: "#4dabf7" },
  { icon: Crown, name: "Leadership", percentage: 72, color: "#a855f7" },
];

const additionalTech = [
  "JavaScript", "HTML/CSS", "Git", "REST APIs", "GraphQL",
  "Responsive Design", "Accessibility", "Performance Optimization",
  "Design Systems", "Agile/Scrum", "CI/CD", "Testing",
  "Node.js", "MongoDB", "PostgreSQL", "Docker",
];

const currentlyLearning = [
  { name: "Web3 & Blockchain", percentage: 40, color: "#4dabf7" },
  { name: "Advanced AI Integration", percentage: 20, color: "#a855f7" },
];

export function Skills() {
  return (
    <section id="skills" className="py-20 section-padding">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="w-12 h-12 rounded-full bg-[#a855f7]/15 flex items-center justify-center mx-auto mb-4">
            <Cog className="w-6 h-6 text-[#a855f7]" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="gradient-text">Skills & Expertise</span>
          </h2>
          <p className="text-[#a0a0b0] max-w-2xl mx-auto text-base">
            A comprehensive toolkit of design, development, and automation
            skills honed through years of passionate work and continuous learning
          </p>
        </div>

        {/* Main Skill Categories */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {skillCategories.map((category) => {
            const Icon = category.icon;
            return (
              <Card
                key={category.title}
                className="bg-[#1a1333] border-white/5 hover:border-white/10 transition-all duration-300"
              >
                <CardContent className="p-6 space-y-5">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${category.color}15` }}
                    >
                      <Icon
                        className="w-5 h-5"
                        style={{ color: category.color }}
                      />
                    </div>
                    <h3 className="text-lg font-bold text-white">
                      {category.title}
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {category.skills.map((skill) => (
                      <SkillBar
                        key={skill.name}
                        name={skill.name}
                        percentage={skill.percentage}
                        color={category.color}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Soft Skills */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold">
            <span className="gradient-text-purple-blue">Soft Skills</span>
          </h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {softSkills.map((skill) => {
            const Icon = skill.icon;
            return (
              <Card
                key={skill.name}
                className="bg-[#1a1333] border-white/5 hover:border-white/10 transition-all duration-300 text-center"
              >
                <CardContent className="p-4 space-y-2">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center mx-auto"
                    style={{ backgroundColor: `${skill.color}15` }}
                  >
                    <Icon
                      className="w-5 h-5"
                      style={{ color: skill.color }}
                    />
                  </div>
                  <h4 className="text-xs font-bold text-white">{skill.name}</h4>
                  <span
                    className="text-lg font-bold"
                    style={{ color: skill.color }}
                  >
                    {skill.percentage}%
                  </span>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Additional Technologies */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold">
            <span className="gradient-text">Additional Technologies</span>
          </h3>
        </div>
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {additionalTech.map((tech) => (
            <span
              key={tech}
              className="px-4 py-2 rounded-full text-sm bg-[#1a1333] border border-white/5 text-[#a0a0b0] hover:text-white hover:border-[#a855f7]/30 transition-all duration-200 cursor-default"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Currently Learning */}
        <div className="max-w-md mx-auto">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2">
              <BookOpen className="w-5 h-5 text-[#4dabf7]" />
              <h3 className="text-xl font-bold text-white">Currently Learning</h3>
            </div>
          </div>
          <Card className="bg-[#1a1333] border-white/5">
            <CardContent className="p-6 space-y-4">
              {currentlyLearning.map((item) => (
                <SkillBar
                  key={item.name}
                  name={item.name}
                  percentage={item.percentage}
                  color={item.color}
                />
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
