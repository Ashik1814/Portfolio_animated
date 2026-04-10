"use client";

import {
  GraduationCap,
  Shield,
  Award,
  BookOpen,
  Code2,
  Palette,
  Bot,
  Cpu,
  Zap,
  Monitor,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const degrees = [
  {
    icon: Shield,
    title: "Bachelor of Technology in Computer Science",
    institution: "University Name",
    location: "City, State",
    period: "2019 - 2023",
    gpa: "8.5/10",
    gpaColor: "#00e5ff",
    description:
      "Specialized in Software Engineering and Web Technologies. Completed coursework in Data Structures, Algorithms, Database Management, and Web Development.",
    achievements: [
      "Dean's List for Academic Excellence",
      "First Prize in College Hackathon 2022",
      "President of Coding Club",
      "Published research paper on Web Optimization",
    ],
  },
  {
    icon: GraduationCap,
    title: "Higher Secondary Education",
    institution: "School Name",
    location: "City, State",
    period: "2017 - 2019",
    gpa: "92%",
    gpaColor: "#2dd4bf",
    description:
      "Focused on Science stream with Computer Science as an elective. Developed strong foundation in Mathematics and Computer Programming.",
    achievements: [
      "School Topper in Computer Science",
      "Science Fair Winner",
      "Participated in National Science Olympiad",
    ],
  },
];

const certifications = [
  { icon: Code2, name: "Advanced React Development", issuer: "Meta", year: "2023", color: "#a78bfa" },
  { icon: Palette, name: "UI/UX Design Specialization", issuer: "Google", year: "2022", color: "#00e5ff" },
  { icon: Bot, name: "n8n Automation Expert", issuer: "n8n", year: "2024", color: "#2dd4bf" },
  { icon: Cpu, name: "TypeScript Advanced", issuer: "Microsoft", year: "2023", color: "#64b5f6" },
  { icon: Zap, name: "Web Performance Optimization", issuer: "Google", year: "2023", color: "#fbbf24" },
  { icon: Monitor, name: "Responsive Web Design", issuer: "freeCodeCamp", year: "2021", color: "#f97316" },
];

const coursework = [
  "Data Structures & Algorithms", "Object-Oriented Programming", "Database Management Systems", "Web Development",
  "Software Engineering", "Operating Systems", "Computer Networks", "Machine Learning Basics",
  "Mobile App Development", "Cloud Computing", "Cybersecurity Fundamentals", "Human-Computer Interaction",
];

export function Education() {
  return (
    <section id="education" className="py-20 section-padding">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="w-12 h-12 rounded-full bg-[#64b5f6]/10 flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="w-6 h-6 text-[#64b5f6]" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="gradient-text-cyan">Education</span>
          </h2>
          <p className="dark:text-[#94a3b8] text-gray-600 max-w-2xl mx-auto text-base">
            My academic journey and continual learning path in computer science and technology
          </p>
        </div>

        {/* Degree Cards */}
        <div className="space-y-6 mb-16">
          {degrees.map((degree) => {
            const Icon = degree.icon;
            return (
              <Card key={degree.title} className="glass-card-solid dark:hover:border-[#64b5f6]/15 hover:border-[#00a8cc]/20 transition-all duration-300">
                <CardContent className="p-6 sm:p-8">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#64b5f6]/10 flex items-center justify-center shrink-0">
                      <Icon className="w-6 h-6 text-[#64b5f6]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold dark:text-white text-gray-900 mb-1">{degree.title}</h3>
                      <p className="dark:text-[#94a3b8] text-gray-600 text-sm">{degree.institution} &bull; {degree.location}</p>
                      <div className="flex flex-wrap items-center gap-3 mt-2">
                        <span className="text-sm dark:text-[#94a3b8] text-gray-600">{degree.period}</span>
                        <span className="text-sm font-bold" style={{ color: degree.gpaColor }}>GPA: {degree.gpa}</span>
                      </div>
                    </div>
                  </div>
                  <p className="dark:text-[#94a3b8] text-gray-600 text-sm leading-relaxed mb-4 ml-0 sm:ml-16">{degree.description}</p>
                  <div className="ml-0 sm:ml-16">
                    <h4 className="text-sm font-semibold dark:text-white text-gray-900 mb-2">Key Achievements</h4>
                    <ul className="space-y-1.5">
                      {degree.achievements.map((achievement) => (
                        <li key={achievement} className="text-sm dark:text-[#94a3b8] text-gray-600 flex items-start gap-2">
                          <Award className="w-4 h-4 text-[#fbbf24] shrink-0 mt-0.5" />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Certifications */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold"><span className="gradient-text-purple-blue">Certifications</span></h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {certifications.map((cert) => {
            const Icon = cert.icon;
            return (
              <Card key={cert.name} className="glass-card-solid dark:hover:border-[#64b5f6]/15 hover:border-[#00a8cc]/20 transition-all duration-300 group">
                <CardContent className="p-5 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${cert.color}12` }}>
                    <Icon className="w-5 h-5" style={{ color: cert.color }} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold dark:text-white text-gray-900 mb-0.5">{cert.name}</h4>
                    <p className="text-xs dark:text-[#94a3b8] text-gray-600">{cert.issuer} &bull; {cert.year}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Relevant Coursework */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold"><span className="gradient-text-pink-blue">Relevant Coursework</span></h3>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {coursework.map((course) => (
            <span key={course} className="px-4 py-2 rounded-lg text-sm glass-card dark:text-[#94a3b8] text-gray-600 dark:hover:text-[#00e5ff] hover:text-[#00a8cc] dark:hover:border-[#00e5ff]/20 hover:border-[#00a8cc]/20 transition-all duration-200 cursor-default">
              {course}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
