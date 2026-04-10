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
    <footer className="dark:border-t-[#00e5ff]/10 border-t-gray-200 dark:bg-[#06080f]/30 bg-gray-50/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid md:grid-cols-3 gap-8 items-start">
          {/* Left - Logo & Copyright */}
          <div className="space-y-3">
            <a href="/" className="text-lg font-bold inline-block hover:scale-105 transition-transform duration-200">
              <span className="text-[#64b5f6]">Alchemist</span><span className="dark:text-white text-gray-900">.io</span>
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
                  <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label} className="w-9 h-9 rounded-lg dark:border-[#1e3a5f]/50 border-gray-300 border flex items-center justify-center dark:text-[#64748b] text-gray-500 dark:hover:text-[#00e5ff] hover:text-[#00a8cc] dark:hover:border-[#00e5ff]/30 hover:border-[#00a8cc]/30 dark:hover:bg-[#00e5ff]/5 hover:bg-[#00a8cc]/5 transition-all duration-200">
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
