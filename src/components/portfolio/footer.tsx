"use client";

import { Github, Linkedin, Youtube, Facebook } from "lucide-react";

const footerNavLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Skills", href: "/skills" },
  { label: "Projects", href: "/projects" },
  { label: "Education", href: "/education" },
  { label: "Contact", href: "/contact" },
];

const footerSocials = [
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
];

export function Footer() {
  return (
    <footer className="dark:border-t-[#00e5ff]/8 border-t-gray-200/60 dark:bg-[#06080f]/40 bg-gray-50/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid md:grid-cols-3 gap-8 items-start">
          {/* Left - Logo & Copyright */}
          <div className="space-y-3">
            <a href="/" className="flex items-center gap-2 group inline-flex hover:scale-105 transition-transform duration-200">
              {/* Logo icon matching header */}
              <div className="w-7 h-7 rounded-md dark:bg-gradient-to-br dark:from-[#00e5ff]/20 dark:to-[#a78bfa]/20 bg-gradient-to-br from-[#00a8cc]/15 to-[#a78bfa]/15 flex items-center justify-center transition-all duration-300">
                <svg
                  className="w-3.5 h-3.5 dark:text-[#00e5ff] text-[#00a8cc]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
                  />
                </svg>
              </div>
              <span className="text-lg font-bold tracking-tight">
                <span className="dark:text-[#00e5ff] text-[#00a8cc]">Alchemist</span>
                <span className="dark:text-white text-gray-900">.io</span>
              </span>
            </a>
            <p className="text-sm dark:text-[#475569] text-gray-500 leading-relaxed max-w-xs">
              &copy; {new Date().getFullYear()} Alchemist. All rights reserved.
            </p>
          </div>

          {/* Center - Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold dark:text-white text-gray-900">Quick Links</h4>
            <nav className="grid grid-cols-2 gap-x-6 gap-y-2">
              {footerNavLinks.map((link) => (
                <a key={link.label} href={link.href} className="text-sm dark:text-[#64748b] text-gray-500 dark:hover:text-[#00e5ff] hover:text-[#00a8cc] transition-colors duration-200">{link.label}</a>
              ))}
            </nav>
          </div>

          {/* Right - Social Icons */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold dark:text-white text-gray-900">Connect</h4>
            <div className="flex items-center gap-3">
              {footerSocials.map((social) => {
                const Icon = social.icon;
                return (
                  <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label} className="w-9 h-9 rounded-lg dark:border-[#00e5ff]/10 border-gray-300/80 border flex items-center justify-center dark:text-[#64748b] text-gray-500 dark:hover:text-[#00e5ff] hover:text-[#00a8cc] dark:hover:border-[#00e5ff]/25 hover:border-[#00a8cc]/25 dark:hover:bg-[#00e5ff]/5 hover:bg-[#00a8cc]/5 transition-all duration-200">
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
