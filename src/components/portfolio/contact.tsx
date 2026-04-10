"use client";

import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Github,
  Linkedin,
  Youtube,
  MessageCircle,
  Facebook,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const contactCards = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@ashik.dev",
    href: "mailto:hello@ashik.dev",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "@ashik-rahman",
    href: "https://github.com",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "Connect with me",
    href: "https://linkedin.com",
  },
  {
    icon: Youtube,
    label: "YouTube",
    value: "Subscribe",
    href: "https://youtube.com",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Chat with me",
    href: "https://wa.me/1234567890",
  },
  {
    icon: Facebook,
    label: "Facebook",
    value: "Follow me",
    href: "https://facebook.com",
  },
];

const footerNavLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

const footerSocials = [
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
];

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <>
      {/* Contact Section */}
      <section id="contact" className="pt-20 pb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Let&apos;s work together
            </h2>
            <p className="text-[#b0b0b0] max-w-xl mx-auto text-base leading-relaxed">
              I&apos;m always open to discussing new projects, creative ideas, or
              opportunities to be part of your vision.
            </p>
          </div>

          {/* Contact Grid */}
          <div className="grid lg:grid-cols-2 gap-8 pb-16">
            {/* Left Column - Social Cards Grid */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {contactCards.map((card) => {
                  const Icon = card.icon;
                  return (
                    <a
                      key={card.label}
                      href={card.href}
                      target={card.href.startsWith("http") ? "_blank" : undefined}
                      rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="group"
                    >
                      <div className="p-4 rounded-lg bg-[#1a1a2e] border border-[#2a2a3e] hover:bg-[#17172a] hover:border-[#3a3a5e] transition-all duration-200">
                        <div className="flex items-start gap-3">
                          <div className="w-9 h-9 rounded-lg bg-[#00e5ff]/10 flex items-center justify-center shrink-0 group-hover:bg-[#00e5ff]/15 transition-colors">
                            <Icon className="w-4 h-4 text-[#00e5ff]" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs text-[#9ca3af] mb-0.5">
                              {card.label}
                            </p>
                            <p className="text-sm font-medium text-white truncate group-hover:text-[#00e5ff] transition-colors">
                              {card.value}
                            </p>
                          </div>
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>

              {/* Availability Badge */}
              <div className="flex items-center gap-2 pt-3">
                <MapPin className="w-4 h-4 text-[#00e5ff]" />
                <span className="text-sm text-[#b0b0b0]">
                  Available for remote work worldwide
                </span>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="p-6 rounded-lg bg-[#1a1a2e] border border-[#2a2a3e]">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm text-[#9ca3af]">Your Name</label>
                  <Input
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="bg-[#12122a] border-[#2a2a3e] text-white placeholder:text-[#6b7280] focus:border-[#00e5ff]/50 rounded-lg h-11"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-[#9ca3af]">Your Email</label>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="bg-[#12122a] border-[#2a2a3e] text-white placeholder:text-[#6b7280] focus:border-[#00e5ff]/50 rounded-lg h-11"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-[#9ca3af]">Your Message</label>
                  <Textarea
                    placeholder="Tell me about your project..."
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="bg-[#12122a] border-[#2a2a3e] text-white placeholder:text-[#6b7280] focus:border-[#00e5ff]/50 rounded-lg resize-none"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-[#00e5ff] hover:bg-[#00c2e5] text-[#0a0a1a] font-semibold rounded-lg h-11 shadow-lg shadow-[#00e5ff]/20 transition-all duration-200"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#2a2a3e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid md:grid-cols-3 gap-8 items-start">
            {/* Left - Logo & Copyright */}
            <div className="space-y-3">
              <a
                href="#home"
                className="text-lg font-bold inline-block hover:scale-105 transition-transform duration-200"
              >
                <span className="text-[#64b5f6]">Ashik</span>
                <span className="text-white">.dev</span>
              </a>
              <p className="text-sm text-[#6b7280] leading-relaxed max-w-xs">
                &copy; {new Date().getFullYear()} Md. Ashikur Rahman Ashik. All rights reserved.
              </p>
            </div>

            {/* Center - Quick Links */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-white">Quick Links</h4>
              <nav className="grid grid-cols-2 gap-x-6 gap-y-2">
                {footerNavLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-sm text-[#9ca3af] hover:text-[#00e5ff] transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>

            {/* Right - Social Icons */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-white">Connect</h4>
              <div className="flex items-center gap-3">
                {footerSocials.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="w-9 h-9 rounded-lg border border-[#2a2a3e] flex items-center justify-center text-[#9ca3af] hover:text-[#00e5ff] hover:border-[#00e5ff]/30 hover:bg-[#00e5ff]/5 transition-all duration-200"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
