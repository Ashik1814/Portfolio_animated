"use client";

import { useContent } from "@/stores/content-store";
import { getIcon } from "@/lib/get-icon";

export function Footer() {
  const socialLinks = useContent((s) => s.socialLinks);
  const siteConfig = useContent((s) => s.siteConfig);
  const navItems = useContent((s) => s.navItems);

  const logoAccent = siteConfig?.logoText ? siteConfig.logoText.split('.')[0] : 'Alchemist';
  const logoSuffix = siteConfig?.logoText ? '.' + siteConfig.logoText.split('.').slice(1).join('.') : '.io';

  return (
    <footer className="dark:border-t-[#00e5ff]/8 border-t-gray-200/60 dark:bg-[#06080f]/40 bg-gray-50/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid md:grid-cols-3 gap-8 items-start">
          {/* Left - Logo & Copyright */}
          <div className="space-y-3">
            <a href="/" className="flex items-center gap-2 group inline-flex hover:scale-105 transition-transform duration-200">
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
                <span className="dark:text-[#00e5ff] text-[#00a8cc]">{logoAccent}</span>
                <span className="dark:text-white text-gray-900">{logoSuffix}</span>
              </span>
            </a>
            <p className="text-sm dark:text-[#475569] text-gray-500 leading-relaxed max-w-xs">
              {siteConfig?.footerCopyright || `© ${new Date().getFullYear()} Alchemist. All rights reserved.`}
            </p>
          </div>

          {/* Center - Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold dark:text-white text-gray-900">Quick Links</h4>
            <nav className="grid grid-cols-2 gap-x-6 gap-y-2">
              {navItems.map((link) => (
                <a key={link.id} href={link.href} className="text-sm dark:text-[#64748b] text-gray-500 dark:hover:text-[#00e5ff] hover:text-[#00a8cc] transition-colors duration-200">{link.label}</a>
              ))}
            </nav>
          </div>

          {/* Right - Social Icons */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold dark:text-white text-gray-900">Connect</h4>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = getIcon(social.icon);
                return (
                  <a key={social.id} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label} className="w-9 h-9 rounded-lg dark:border-[#00e5ff]/10 border-gray-300/80 border flex items-center justify-center dark:text-[#64748b] text-gray-500 dark:hover:text-[#00e5ff] hover:text-[#00a8cc] dark:hover:border-[#00e5ff]/25 hover:border-[#00a8cc]/25 dark:hover:bg-[#00e5ff]/5 hover:bg-[#00a8cc]/5 transition-all duration-200">
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom bar with admin link */}
        <div className="mt-8 pt-6 dark:border-t-[#00e5ff]/8 border-t-gray-200/60 flex items-center justify-between">
          <p className="text-xs dark:text-[#334155] text-gray-400">
            {siteConfig?.footerCopyright || `© ${new Date().getFullYear()} All rights reserved.`}
          </p>
          <a
            href="/admin"
            className="text-xs dark:text-[#334155] text-gray-400 dark:hover:text-[#00e5ff] hover:text-[#00a8cc] transition-colors duration-200 flex items-center gap-1.5 group"
          >
            <svg className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Admin
          </a>
        </div>
      </div>
    </footer>
  );
}
