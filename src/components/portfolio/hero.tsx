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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00e5ff]/20 bg-[#00e5ff]/5">
              <span className="w-2 h-2 bg-[#2dd4bf] rounded-full animate-pulse" />
              <span className="text-sm text-[#94a3b8]">
                Welcome to my portfolio
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-white">
              Hi, I&apos;m{" "}
              <span className="gradient-text-cyan">Ashik</span>
            </h1>

            <p className="text-lg text-[#64b5f6] font-medium">
              UI/UX Designer &bull; Frontend Developer &bull; n8n Automation
              Specialist
            </p>

            <p className="text-[#94a3b8] text-base leading-relaxed max-w-lg">
              I transform ideas into exceptional digital experiences. With a
              unique blend of creative design thinking and technical expertise, I
              create interfaces that users love and businesses value.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-[#00e5ff] hover:bg-[#00c2e5] text-[#06080f] font-medium rounded-full px-8 shadow-lg shadow-[#00e5ff]/25"
                asChild
              >
                <a href="#contact">
                  Get In Touch
                  <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-[#00e5ff]/30 text-[#00e5ff] hover:bg-[#00e5ff]/10 font-medium rounded-full px-8"
                asChild
              >
                <a href="#projects">View Projects</a>
              </Button>
            </div>

            <div className="flex items-center gap-4 pt-2">
              <span className="text-sm text-[#64748b]">Follow me:</span>
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
                    className="w-9 h-9 rounded-full border border-[#64b5f6]/15 flex items-center justify-center text-[#64748b] hover:text-[#00e5ff] hover:border-[#00e5ff]/40 transition-all duration-200"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Content - Profile Image + Stats */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Outer glow ring */}
              <div className="absolute -inset-8 bg-gradient-to-r from-[#00e5ff]/15 via-[#64b5f6]/15 to-[#a78bfa]/15 rounded-full blur-2xl" />

              {/* Rotating gradient border ring */}
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full p-1 bg-gradient-to-br from-[#00e5ff] via-[#64b5f6] to-[#a78bfa]">
                {/* Inner dark circle */}
                <div className="w-full h-full rounded-full bg-[#06080f] flex items-center justify-center overflow-hidden p-1">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-[#0a0f1e] to-[#0d1525] flex items-center justify-center overflow-hidden">
                    {/*
                      ============================================
                      👤 YOUR PROFILE IMAGE GOES HERE
                      ============================================
                      Place your image at /public/profile.jpg
                      Then replace the placeholder below with:
                      <img src="/profile.jpg" alt="Ashik" className="w-full h-full object-cover rounded-full" />
                    */}
                    <div className="flex flex-col items-center justify-center gap-3 text-center p-6">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#00e5ff]/15 to-[#64b5f6]/15 flex items-center justify-center">
                        <svg
                          className="w-10 h-10 text-[#64748b]/60"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                      </div>
                      <p className="text-xs text-[#64748b]/60 leading-relaxed">
                        Add your photo<br />at <code className="text-[#00e5ff]/60">/public/profile.jpg</code>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating stat badges */}
              <div className="absolute -left-4 top-1/4 glass-card px-4 py-3 animate-bounce" style={{ animationDuration: '3s' }}>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#00e5ff]/10 flex items-center justify-center">
                    <span className="text-sm font-bold text-[#00e5ff]">50+</span>
                  </div>
                  <span className="text-xs text-[#94a3b8] whitespace-nowrap">Projects</span>
                </div>
              </div>

              <div className="absolute -right-4 top-1/2 glass-card px-4 py-3 animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '0.5s' }}>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#64b5f6]/10 flex items-center justify-center">
                    <span className="text-sm font-bold text-[#64b5f6]">30+</span>
                  </div>
                  <span className="text-xs text-[#94a3b8] whitespace-nowrap">Clients</span>
                </div>
              </div>

              <div className="absolute -left-2 bottom-1/4 glass-card px-4 py-3 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#2dd4bf]/10 flex items-center justify-center">
                    <span className="text-sm font-bold text-[#2dd4bf]">4+</span>
                  </div>
                  <span className="text-xs text-[#94a3b8] whitespace-nowrap">Years</span>
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
