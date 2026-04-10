"use client";

import { ArrowRight, Briefcase, Github, Linkedin, Twitter, MessagesSquare } from "lucide-react";
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

          {/* Right Content - Decorative Card */}
          <div className="hidden lg:flex justify-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#ff6b9d]/20 via-[#a855f7]/20 to-[#4dabf7]/20 rounded-3xl blur-xl" />
              <div className="relative glass-card p-8 w-80 space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#ff6b9d] to-[#a855f7] flex items-center justify-center">
                  <Briefcase className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">
                  Let&apos;s Build Together
                </h3>
                <p className="text-[#a0a0b0] text-sm leading-relaxed">
                  Ready to bring your ideas to life? I specialize in creating
                  digital products that are both beautiful and functional.
                </p>
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center p-3 rounded-xl bg-[#ff6b9d]/10 border border-[#ff6b9d]/20">
                    <div className="text-lg font-bold text-[#ff6b9d]">50+</div>
                    <div className="text-xs text-[#a0a0b0]">Projects</div>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-[#4dabf7]/10 border border-[#4dabf7]/20">
                    <div className="text-lg font-bold text-[#4dabf7]">30+</div>
                    <div className="text-xs text-[#a0a0b0]">Clients</div>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-[#2dd4bf]/10 border border-[#2dd4bf]/20">
                    <div className="text-lg font-bold text-[#2dd4bf]">4+</div>
                    <div className="text-xs text-[#a0a0b0]">Years</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
