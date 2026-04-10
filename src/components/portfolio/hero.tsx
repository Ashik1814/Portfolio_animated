"use client";

import { ArrowRight, Github, Linkedin, Twitter, MessagesSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-16 overflow-hidden"
    >
      {/* Background gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#ff6b9d]/10 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#4dabf7]/10 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#a855f7]/8 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#ff6b9d]/20 bg-[#ff6b9d]/5">
              <span className="w-2 h-2 bg-[#2dd4bf] rounded-full animate-pulse" />
              <span className="text-sm text-[#a0a0b0]">
                Welcome to my portfolio
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Hi, I&apos;m{" "}
              <span className="gradient-text">Creative</span>
            </h1>

            <p className="text-lg text-[#ff6b9d] font-medium">
              UI/UX Designer &bull; Frontend Developer &bull; n8n Automation
              Specialist
            </p>

            <p className="text-[#a0a0b0] text-base leading-relaxed max-w-lg">
              I transform ideas into exceptional digital experiences. With a
              unique blend of creative design thinking and technical expertise, I
              create interfaces that users love and businesses value.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-[#ff6b9d] hover:bg-[#e55a8a] text-white font-medium rounded-full px-8 shadow-lg shadow-[#ff6b9d]/20"
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
                className="border-[#ff6b9d]/30 text-[#ff6b9d] hover:bg-[#ff6b9d]/10 font-medium rounded-full px-8"
                asChild
              >
                <a href="#projects">View Projects</a>
              </Button>
            </div>

            <div className="flex items-center gap-4 pt-2">
              <span className="text-sm text-[#a0a0b0]">Follow me:</span>
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
                    className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-[#a0a0b0] hover:text-white hover:border-[#ff6b9d]/40 transition-all duration-200"
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
              <div className="absolute -inset-8 bg-gradient-to-r from-[#ff6b9d]/20 via-[#a855f7]/20 to-[#4dabf7]/20 rounded-full blur-2xl" />

              {/* Rotating gradient border ring */}
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full p-1 bg-gradient-to-br from-[#ff6b9d] via-[#a855f7] to-[#4dabf7]">
                {/* Inner dark circle */}
                <div className="w-full h-full rounded-full bg-[#0f0a1e] flex items-center justify-center overflow-hidden p-1">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-[#1a1333] to-[#2a1f45] flex items-center justify-center overflow-hidden">
                    {/*
                      ============================================
                      👤 YOUR PROFILE IMAGE GOES HERE
                      ============================================
                      Replace the placeholder below with your image.
                      Option 1: Place your image at /public/profile.jpg
                                and use: <img src="/profile.jpg" alt="Profile" className="w-full h-full object-cover" />
                      Option 2: Import from next/image:
                                <Image src="/profile.jpg" alt="Profile" fill className="object-cover" />
                    */}
                    <div className="flex flex-col items-center justify-center gap-3 text-center p-6">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#ff6b9d]/20 to-[#a855f7]/20 flex items-center justify-center">
                        <svg
                          className="w-10 h-10 text-[#a0a0b0]/50"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                      </div>
                      <p className="text-xs text-[#a0a0b0]/50 leading-relaxed">
                        Add your photo<br />at <code className="text-[#ff6b9d]/60">/public/profile.jpg</code>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating stat badges */}
              <div className="absolute -left-4 top-1/4 glass-card px-4 py-3 animate-bounce" style={{ animationDuration: '3s' }}>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#ff6b9d]/15 flex items-center justify-center">
                    <span className="text-sm font-bold text-[#ff6b9d]">50+</span>
                  </div>
                  <span className="text-xs text-[#a0a0b0] whitespace-nowrap">Projects</span>
                </div>
              </div>

              <div className="absolute -right-4 top-1/2 glass-card px-4 py-3 animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '0.5s' }}>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#4dabf7]/15 flex items-center justify-center">
                    <span className="text-sm font-bold text-[#4dabf7]">30+</span>
                  </div>
                  <span className="text-xs text-[#a0a0b0] whitespace-nowrap">Clients</span>
                </div>
              </div>

              <div className="absolute -left-2 bottom-1/4 glass-card px-4 py-3 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#2dd4bf]/15 flex items-center justify-center">
                    <span className="text-sm font-bold text-[#2dd4bf]">4+</span>
                  </div>
                  <span className="text-xs text-[#a0a0b0] whitespace-nowrap">Years</span>
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
