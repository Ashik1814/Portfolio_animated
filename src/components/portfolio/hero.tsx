"use client";

import { ArrowRight, Briefcase, Github, Linkedin, Twitter, MessagesSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-16 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full dark:border-[#00e5ff]/20 border-[#00a8cc]/20 dark:bg-[#00e5ff]/5 bg-[#00a8cc]/5">
              <span className="w-2 h-2 bg-[#2dd4bf] rounded-full animate-pulse" />
              <span className="text-sm dark:text-[#94a3b8] text-gray-600">
                Welcome to my portfolio
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight dark:text-white text-gray-900">
              Hi, I&apos;m{" "}
              <span className="gradient-text-cyan">Ashik</span>
            </h1>

            <p className="text-lg text-[#64b5f6] font-medium">
              UI/UX Designer &bull; Frontend Developer &bull; n8n Automation
              Specialist
            </p>

            <p className="dark:text-[#94a3b8] text-gray-600 text-base leading-relaxed max-w-lg">
              I transform ideas into exceptional digital experiences. With a
              unique blend of creative design thinking and technical expertise, I
              create interfaces that users love and businesses value.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="rainbow-border rainbow-border-full dark:bg-[#08050f] bg-white dark:text-white text-gray-900 font-bold rounded-full px-8 transition-all duration-200 hover:scale-105"
                asChild
              >
                <a href="#contact">
                  Get In Touch
                  <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              </Button>
              <Button
                size="lg"
                className="rainbow-border rainbow-border-full dark:bg-[#08050f] bg-white dark:text-white text-gray-900 font-bold rounded-full px-8 transition-all duration-200 hover:scale-105"
                asChild
              >
                <a href="#projects">View Projects</a>
              </Button>
            </div>

            <div className="flex items-center gap-4 pt-2">
              <span className="text-sm dark:text-[#64748b] text-gray-500">Follow me:</span>
              <div className="flex gap-3">
                {[
                  { icon: Github, href: "https://github.com" },
                  { icon: Linkedin, href: "https://linkedin.com" },
                  { icon: Twitter, href: "https://twitter.com" },
                  { icon: MessagesSquare, href: "https://discord.com" },
                ].map(({ icon: Icon, href }) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full border dark:border-[#64b5f6]/15 border-gray-300 dark:text-[#64748b] text-gray-500 dark:hover:text-[#00e5ff] hover:text-[#00a8cc] dark:hover:border-[#00e5ff]/40 hover:border-[#00a8cc]/40 transition-all duration-200"
                  >
                    <Icon className="w-4 h-4 mx-auto" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Content - Profile Image + Stats */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Outer glow ring */}
              <div className="absolute -inset-8 bg-gradient-to-r from-[#00e5ff]/15 dark:from-[#00e5ff]/15 from-[#00a8cc]/10 via-[#64b5f6]/15 dark:via-[#64b5f6]/15 via-[#64b5f6]/10 to-[#a78bfa]/15 dark:to-[#a78bfa]/15 to-[#a78bfa]/10 rounded-full blur-2xl" />

              {/* Rotating gradient border ring */}
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full p-1 bg-gradient-to-br from-[#00e5ff] via-[#64b5f6] to-[#a78bfa]">
                {/* Inner circle */}
                <div className="w-full h-full rounded-full dark:bg-[#06080f] bg-white flex items-center justify-center overflow-hidden p-1">
                  <div className="w-full h-full rounded-full dark:bg-gradient-to-br dark:from-[#0a0f1e] dark:to-[#0d1525] bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden">
                    {/*
                      ============================================
                      👤 YOUR PROFILE IMAGE GOES HERE
                      ============================================
                      Place your image at /public/profile.jpg
                      Then replace the placeholder below with:
                      <img src="/profile.jpg" alt="Ashik" className="w-full h-full object-cover rounded-full" />
                    */}
                    <div className="flex flex-col items-center justify-center gap-3 text-center p-6">
                      <div className="w-20 h-20 rounded-full dark:bg-gradient-to-br dark:from-[#00e5ff]/15 dark:to-[#64b5f6]/15 bg-gradient-to-br from-[#00a8cc]/10 to-[#64b5f6]/10 flex items-center justify-center">
                        <svg
                          className="w-10 h-10 dark:text-[#64748b]/60 text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                      </div>
                      <p className="text-xs dark:text-[#64748b]/60 text-gray-400 leading-relaxed">
                        Add your photo<br />at <code className="dark:text-[#00e5ff]/60 text-[#00a8cc]">/public/profile.jpg</code>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating stat badges */}
              <div className="absolute -left-4 top-1/4 glass-card px-4 py-3 animate-bounce" style={{ animationDuration: '3s' }}>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg dark:bg-[#00e5ff]/10 bg-[#00a8cc]/10 flex items-center justify-center">
                    <span className="text-sm font-bold dark:text-[#00e5ff] text-[#00a8cc]">50+</span>
                  </div>
                  <span className="text-xs dark:text-[#94a3b8] text-gray-600 whitespace-nowrap">Projects</span>
                </div>
              </div>

              <div className="absolute -right-4 top-1/2 glass-card px-4 py-3 animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '0.5s' }}>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#64b5f6]/10 flex items-center justify-center">
                    <span className="text-sm font-bold text-[#64b5f6]">30+</span>
                  </div>
                  <span className="text-xs dark:text-[#94a3b8] text-gray-600 whitespace-nowrap">Clients</span>
                </div>
              </div>

              <div className="absolute -left-2 bottom-1/4 glass-card px-4 py-3 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#2dd4bf]/10 flex items-center justify-center">
                    <span className="text-sm font-bold text-[#2dd4bf]">4+</span>
                  </div>
                  <span className="text-xs dark:text-[#94a3b8] text-gray-600 whitespace-nowrap">Years</span>
                </div>
              </div>

              {/* Available badge */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 glass-card px-4 py-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#2dd4bf] rounded-full animate-pulse" />
                  <span className="text-xs font-medium text-[#2dd4bf]">Available for work</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
