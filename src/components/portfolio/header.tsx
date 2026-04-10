"use client";

import { useState, useEffect } from "react";
import { Menu, X, Download, Sun, Moon } from "lucide-react";
import { AnimatedBorderButton } from "@/components/ui/animated-border-button";
import { useTheme } from "next-themes";

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
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // Prevent hydration mismatch for theme icon
  useEffect(() => {
    setMounted(true); // eslint-disable-line react-hooks/set-state-in-effect
  }, []);

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

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "dark:bg-[#08050f]/40 bg-white/60 backdrop-blur-xl dark:border-b-[#d946ef]/10 border-b-gray-200/50 shadow-lg dark:shadow-black/20 shadow-gray-200/30"
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
            <span className="text-[#f472b6]">Ashik</span>
            <span className="dark:text-white text-gray-900">.dev</span>
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
                      ? "text-[#f472b6]"
                      : "dark:text-[#b0b0b0] text-gray-600 hover:text-[#f472b6]"
                  }`}
                >
                  {link.label}
                  {/* Active underline */}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-[#f472b6] rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-full dark:bg-transparent bg-gray-100 dark:border-white/20 border-gray-300 border flex items-center justify-center dark:text-[#fbbf24] text-amber-500 hover:dark:bg-white/10 hover:bg-gray-200 transition-all duration-200"
              aria-label="Toggle theme"
            >
              {mounted && (theme === "dark" ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              ))}
            </button>

            {/* CV Download Button */}
            <AnimatedBorderButton
              size="sm"
              className="bg-gradient-to-r from-[#d946ef] to-[#f472b6] hover:from-[#c026d3] hover:to-[#e879a8] dark:text-[#0a0a1a] text-white font-semibold rounded-full px-5 gap-1.5 shadow-lg shadow-[#d946ef]/20 transition-all duration-200 hover:scale-105"
            >
              <Download className="w-4 h-4" />
              CV
            </AnimatedBorderButton>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden w-9 h-9 rounded-lg dark:border-white/20 border-gray-300 border flex items-center justify-center dark:text-[#b0b0b0] text-gray-600 hover:text-[#f472b6] hover:border-[#f472b6]/40 transition-all duration-200"
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
        <div className="md:hidden dark:bg-[#08050f]/50 bg-white/70 backdrop-blur-xl dark:border-t-[#d946ef]/10 border-t-gray-200/50">
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
                      ? "text-[#f472b6] dark:bg-[#f472b6]/5 bg-[#f472b6]/5"
                      : "dark:text-[#b0b0b0] text-gray-600 hover:text-[#f472b6] hover:bg-[#f472b6]/5"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#f472b6] ml-auto" />
                  )}
                </a>
              );
            })}
            <div className="flex items-center gap-3 pt-4 mt-2 dark:border-t-[#3b1a5e]/30 border-t-gray-200">
              <button
                onClick={toggleTheme}
                className="w-9 h-9 rounded-full dark:border-white/20 border-gray-300 border flex items-center justify-center dark:text-[#fbbf24] text-amber-500"
              >
                {mounted && (theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />)}
              </button>
              <AnimatedBorderButton
                size="sm"
                className="bg-gradient-to-r from-[#d946ef] to-[#f472b6] hover:from-[#c026d3] hover:to-[#e879a8] dark:text-[#0a0a1a] text-white font-semibold rounded-full px-4 gap-1.5 flex-1"
              >
                <Download className="w-4 h-4" />
                Download CV
              </AnimatedBorderButton>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
