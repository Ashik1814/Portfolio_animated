"use client";

import { useState, useEffect } from "react";
import { Menu, X, Download, Sun, Moon } from "lucide-react";
import { AnimatedBorderButton } from "@/components/ui/animated-border-button";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { useContent } from "@/stores/content-store";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const navItems = useContent((s) => s.navItems);
  const siteConfig = useContent((s) => s.siteConfig);

  const logoAccent = siteConfig?.logoText ? siteConfig.logoText.split('.')[0] : 'Alchemist';
  const logoSuffix = siteConfig?.logoText ? '.' + siteConfig.logoText.split('.').slice(1).join('.') : '.io';

  useEffect(() => {
    setMounted(true); // eslint-disable-line react-hooks/set-state-in-effect
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mobile menu closes via onClick handlers on nav links

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "dark:bg-[#08050f]/70 bg-white/70 backdrop-blur-2xl dark:border-b dark:border-[#00e5ff]/8 border-b border-gray-200/60 shadow-lg dark:shadow-black/30 shadow-gray-200/20"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="/"
            className="flex items-center gap-2 group"
          >
            {/* Logo icon */}
            <div className="w-8 h-8 rounded-lg dark:bg-gradient-to-br dark:from-[#00e5ff]/20 dark:to-[#a78bfa]/20 bg-gradient-to-br from-[#00a8cc]/15 to-[#a78bfa]/15 flex items-center justify-center dark:group-hover:from-[#00e5ff]/30 dark:group-hover:to-[#a78bfa]/30 group-hover:from-[#00a8cc]/25 group-hover:to-[#a78bfa]/25 transition-all duration-300">
              <svg
                className="w-4 h-4 dark:text-[#00e5ff] text-[#00a8cc]"
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
            <span className="text-xl font-bold tracking-tight">
              <span className="dark:text-[#00e5ff] text-[#00a8cc]">{logoAccent}</span>
              <span className="dark:text-white text-gray-900">{logoSuffix}</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1.5">
            {navItems.map((link) => {
              const active = isActive(link.href);
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-300 border ${
                    active
                      ? "dark:text-[#00e5ff] text-[#00a8cc] dark:border-[#00e5ff]/35 border-[#00a8cc]/35 dark:bg-[#00e5ff]/6 bg-[#00a8cc]/6 dark:shadow-[0_0_12px_rgba(0,229,255,0.1)] shadow-[0_0_12px_rgba(0,168,204,0.08)]"
                      : "dark:text-[#94a3b8] text-gray-500 dark:border-transparent border-transparent dark:hover:text-[#00e5ff] hover:text-[#00a8cc] dark:hover:border-[#00e5ff]/20 hover:border-[#00a8cc]/20 dark:hover:bg-[#00e5ff]/4 hover:bg-[#00a8cc]/4"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="w-9 h-9 rounded-full dark:border dark:border-[#00e5ff]/15 border border-[#00a8cc]/15 flex items-center justify-center dark:text-[#fbbf24] text-amber-500 dark:hover:border-[#00e5ff]/30 hover:border-[#00a8cc]/30 dark:hover:bg-[#00e5ff]/5 hover:bg-[#00a8cc]/5 transition-all duration-300"
            >
              {mounted && (theme === "dark" ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              ))}
            </button>

            {/* CV Download Button */}
            <a href={siteConfig?.cvUrl || '#'}>
              <AnimatedBorderButton
                size="sm"
                className="bg-gradient-to-r from-[#00e5ff] to-[#64b5f6] hover:from-[#00c2e5] hover:to-[#5ba3e0] dark:text-[#06080f] text-white font-semibold rounded-full px-5 gap-1.5 shadow-lg dark:shadow-[#00e5ff]/15 shadow-[#00a8cc]/10 transition-all duration-300 hover:scale-105"
                gradientVia="#64b5f6"
                gradientTo="#a78bfa"
              >
                <Download className="w-4 h-4" />
                CV
              </AnimatedBorderButton>
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden w-9 h-9 rounded-lg dark:border dark:border-[#00e5ff]/15 border border-[#00a8cc]/15 flex items-center justify-center dark:text-[#94a3b8] text-gray-500 dark:hover:border-[#00e5ff]/30 hover:border-[#00a8cc]/30 dark:hover:text-[#00e5ff] hover:text-[#00a8cc] dark:hover:bg-[#00e5ff]/5 hover:bg-[#00a8cc]/5 transition-all duration-300"
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
        <div className="md:hidden dark:bg-[#08050f]/80 bg-white/85 backdrop-blur-2xl dark:border-t dark:border-[#00e5ff]/8 border-t border-gray-200/60">
          <nav className="flex flex-col py-3 px-4">
            {navItems.map((link) => {
              const active = isActive(link.href);
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`py-2.5 px-4 text-sm font-medium rounded-full transition-all duration-200 flex items-center border ${
                    active
                      ? "dark:text-[#00e5ff] text-[#00a8cc] dark:border-[#00e5ff]/35 border-[#00a8cc]/35 dark:bg-[#00e5ff]/6 bg-[#00a8cc]/6 dark:shadow-[0_0_12px_rgba(0,229,255,0.1)] shadow-[0_0_12px_rgba(0,168,204,0.08)]"
                      : "dark:text-[#94a3b8] text-gray-500 dark:border-transparent border-transparent dark:hover:text-[#00e5ff] hover:text-[#00a8cc] dark:hover:border-[#00e5ff]/20 hover:border-[#00a8cc]/20 dark:hover:bg-[#00e5ff]/4 hover:bg-[#00a8cc]/4"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              );
            })}
            <div className="flex items-center gap-3 pt-4 mt-2 dark:border-t-[#00e5ff]/8 border-t-gray-200/60 border-t">
              <button
                onClick={toggleTheme}
                className="w-9 h-9 rounded-full dark:border dark:border-[#00e5ff]/15 border border-[#00a8cc]/15 flex items-center justify-center dark:text-[#fbbf24] text-amber-500 dark:hover:border-[#00e5ff]/30 hover:border-[#00a8cc]/30 dark:hover:bg-[#00e5ff]/5 hover:bg-[#00a8cc]/5 transition-all duration-300"
              >
                {mounted && (theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />)}
              </button>
              <a href={siteConfig?.cvUrl || '#'} className="flex-1">
                <AnimatedBorderButton
                  size="sm"
                  className="bg-gradient-to-r from-[#00e5ff] to-[#64b5f6] hover:from-[#00c2e5] hover:to-[#5ba3e0] dark:text-[#06080f] text-white font-semibold rounded-full px-4 gap-1.5 flex-1 shadow-lg dark:shadow-[#00e5ff]/15 shadow-[#00a8cc]/10"
                  gradientVia="#64b5f6"
                  gradientTo="#a78bfa"
                >
                  <Download className="w-4 h-4" />
                  Download CV
                </AnimatedBorderButton>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
