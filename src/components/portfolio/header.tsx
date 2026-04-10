"use client";

import { useState, useEffect } from "react";
import { Menu, X, Download, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [darkMode, setDarkMode] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);

      const sections = navLinks.map((link) => link.href.replace("#", ""));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#06080f]/80 backdrop-blur-xl border-b border-[#1e3a5f]/30 shadow-lg shadow-black/30"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="#home"
            className="text-xl font-bold transition-all duration-200 hover:scale-105"
          >
            <span className="text-[#64b5f6]">Ashik</span>
            <span className="text-white">.dev</span>
          </a>

          {/* Desktop Nav - Centered */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const sectionId = link.href.replace("#", "");
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-200 rounded-md ${
                    isActive
                      ? "text-[#64b5f6]"
                      : "text-[#b0b0b0] hover:text-[#64b5f6]"
                  }`}
                >
                  {link.label}
                  {/* Active underline */}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-[#64b5f6] rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="w-9 h-9 rounded-full bg-transparent border border-white/20 flex items-center justify-center text-[#ffd54f] hover:bg-white/10 transition-all duration-200"
              aria-label="Toggle theme"
            >
              {darkMode ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>

            {/* CV Download Button */}
            <Button
              size="sm"
              className="bg-gradient-to-r from-[#00e5ff] to-[#64b5f6] hover:from-[#00c2e5] hover:to-[#5aa3e0] text-[#0a0a1a] font-semibold rounded-full px-5 gap-1.5 shadow-lg shadow-[#00e5ff]/20 transition-all duration-200 hover:scale-105"
            >
              <Download className="w-4 h-4" />
              CV
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden w-9 h-9 rounded-lg border border-white/20 flex items-center justify-center text-[#b0b0b0] hover:text-[#64b5f6] hover:border-[#64b5f6]/40 transition-all duration-200"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#06080f]/95 backdrop-blur-xl border-t border-[#1e3a5f]/30">
          <nav className="flex flex-col py-2 px-4">
            {navLinks.map((link) => {
              const sectionId = link.href.replace("#", "");
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`py-3 px-3 text-sm font-medium rounded-lg transition-colors duration-200 flex items-center gap-3 ${
                    isActive
                      ? "text-[#64b5f6] bg-[#64b5f6]/5"
                      : "text-[#b0b0b0] hover:text-[#64b5f6] hover:bg-[#64b5f6]/5"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#64b5f6] ml-auto" />
                  )}
                </a>
              );
            })}
            <div className="flex items-center gap-3 pt-4 mt-2 border-t border-[#1e3a5f]/30">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-[#ffd54f]"
              >
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <Button
                size="sm"
                className="bg-gradient-to-r from-[#00e5ff] to-[#64b5f6] hover:from-[#00c2e5] hover:to-[#5aa3e0] text-[#0a0a1a] font-semibold rounded-full px-4 gap-1.5 flex-1"
              >
                <Download className="w-4 h-4" />
                Download CV
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
