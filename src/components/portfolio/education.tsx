"use client";

import {
  GraduationCap,
  Award,
} from "lucide-react";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { MovingBorderIcon } from "@/components/ui/moving-border-icon";
import { useContent } from "@/stores/content-store";
import { getIcon } from "@/lib/get-icon";

export function Education() {
  const siteConfig = useContent((s) => s.siteConfig);
  const degrees = useContent((s) => s.degrees);
  const certifications = useContent((s) => s.certifications);
  const coursework = useContent((s) => s.coursework);

  if (!siteConfig) return <section className="py-20" />;

  return (
    <section id="education" className="py-20 section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="w-12 h-12 rounded-full bg-[#64b5f6]/15 flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="w-6 h-6 text-[#64b5f6]" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="gradient-text-cyan">Education</span>
          </h2>
          <p className="dark:text-[#94a3b8] text-gray-600 max-w-2xl mx-auto text-base">
            {siteConfig.educationDescription}
          </p>
        </div>

        {/* Degree Cards */}
        <div className="space-y-6 mb-16">
          {degrees.map((degree) => {
            const Icon = getIcon(degree.icon);
            const achievementList = degree.achievements ? degree.achievements.split(',').filter(Boolean) : [];
            return (
              <CardSpotlight key={degree.id} className="glass-card-solid dark:hover:border-[#64b5f6]/15 hover:border-[#00a8cc]/20 transition-all duration-300">
                <div className="p-6 sm:p-8">
                  <div className="flex items-start gap-4 mb-4">
                    <MovingBorderIcon borderRadius="0.75rem" className="w-12 h-12 shrink-0" duration={5}>
                      <div className="absolute inset-0 rounded-[inherit] bg-[#64b5f6]/15" />
                      <Icon className="w-6 h-6 text-[#64b5f6] relative" />
                    </MovingBorderIcon>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold dark:text-white text-gray-900 mb-1">{degree.title}</h3>
                      <p className="dark:text-[#94a3b8] text-gray-600 text-sm">{degree.institution}{degree.location ? ` • ${degree.location}` : ''}</p>
                      <div className="flex flex-wrap items-center gap-3 mt-2">
                        <span className="text-sm dark:text-[#94a3b8] text-gray-600">{degree.period}</span>
                        <span className="text-sm font-bold" style={{ color: degree.gpaColor }}>GPA: {degree.gpa}</span>
                      </div>
                    </div>
                  </div>
                  <p className="dark:text-[#94a3b8] text-gray-600 text-sm leading-relaxed mb-4 ml-0 sm:ml-16">{degree.description}</p>
                  {achievementList.length > 0 && (
                    <div className="ml-0 sm:ml-16">
                      <h4 className="text-sm font-semibold dark:text-white text-gray-900 mb-2">Key Achievements</h4>
                      <ul className="space-y-1.5">
                        {achievementList.map((achievement, i) => (
                          <li key={i} className="text-sm dark:text-[#94a3b8] text-gray-600 flex items-start gap-2">
                            <Award className="w-4 h-4 text-[#fbbf24] shrink-0 mt-0.5" />
                            {achievement.trim()}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </CardSpotlight>
            );
          })}
        </div>

        {/* Certifications */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold"><span className="gradient-text-purple-blue">Certifications</span></h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {certifications.map((cert) => {
            const Icon = getIcon(cert.icon);
            return (
              <CardSpotlight key={cert.id} className="glass-card-solid dark:hover:border-[#64b5f6]/15 hover:border-[#00a8cc]/20 transition-all duration-300 group">
                <div className="p-5 flex items-start gap-4">
                  <MovingBorderIcon borderRadius="0.5rem" className="w-10 h-10 shrink-0" duration={5}>
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
        <div className="flex flex-wrap justify-center gap-3">
          {coursework.map((course) => (
            <span key={course.id} className="px-4 py-2 rounded-lg text-sm glass-card dark:text-[#94a3b8] text-gray-600 dark:hover:text-[#00e5ff] hover:text-[#00a8cc] dark:hover:border-[#00e5ff]/20 hover:border-[#00a8cc]/20 transition-all duration-200 cursor-default">
              {course.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
