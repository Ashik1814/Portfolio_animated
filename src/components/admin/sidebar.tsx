"use client";

import {
  LayoutDashboard,
  Settings,
  Swords,
  Navigation,
  User,
  Target,
  Briefcase,
  GraduationCap,
  Phone,
  Search,
  Lock,
  LogOut,
  ExternalLink,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";

interface AdminSidebarProps {
  activeSection: string;
  onSelectSection: (id: string) => void;
  isOpen: boolean;
  onToggle: () => void;
  onLogout: () => void;
}

interface SubSection {
  id: string;
  label: string;
}

interface SidebarSection {
  id: string;
  label: string;
  icon: React.ReactNode;
  subSections?: SubSection[];
}

const SECTIONS: SidebarSection[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: <LayoutDashboard className="w-4 h-4" />,
  },
  {
    id: "site-config",
    label: "Site Config",
    icon: <Settings className="w-4 h-4" />,
  },
  {
    id: "hero",
    label: "Hero",
    icon: <Swords className="w-4 h-4" />,
    subSections: [
      { id: "hero-stats", label: "Hero Stats" },
    ],
  },
  {
    id: "nav",
    label: "Navigation",
    icon: <Navigation className="w-4 h-4" />,
    subSections: [
      { id: "nav-items", label: "Nav Items" },
    ],
  },
  {
    id: "about",
    label: "About",
    icon: <User className="w-4 h-4" />,
    subSections: [
      { id: "about-skills", label: "About Skills" },
      { id: "core-values", label: "Core Values" },
      { id: "journey-items", label: "Journey" },
      { id: "about-tech-tags", label: "Tech Tags" },
    ],
  },
  {
    id: "skills",
    label: "Skills",
    icon: <Target className="w-4 h-4" />,
    subSections: [
      { id: "skill-categories", label: "Categories" },
      { id: "skills", label: "Skills" },
      { id: "soft-skills", label: "Soft Skills" },
      { id: "additional-tech", label: "Additional Tech" },
      { id: "currently-learning", label: "Currently Learning" },
    ],
  },
  {
    id: "projects",
    label: "Projects",
    icon: <Briefcase className="w-4 h-4" />,
    subSections: [
      { id: "projects", label: "Projects" },
      { id: "project-tags", label: "Project Tags" },
    ],
  },
  {
    id: "education",
    label: "Education",
    icon: <GraduationCap className="w-4 h-4" />,
    subSections: [
      { id: "degrees", label: "Degrees" },
      { id: "certifications", label: "Certifications" },
      { id: "coursework", label: "Coursework" },
    ],
  },
  {
    id: "contact",
    label: "Contact",
    icon: <Phone className="w-4 h-4" />,
    subSections: [
      { id: "contact-cards", label: "Contact Cards" },
      { id: "social-links", label: "Social Links" },
    ],
  },
  {
    id: "seo",
    label: "SEO Settings",
    icon: <Search className="w-4 h-4" />,
    subSections: [
      { id: "seo-settings", label: "SEO & Meta" },
    ],
  },
  {
    id: "security",
    label: "Security",
    icon: <Lock className="w-4 h-4" />,
    subSections: [
      { id: "change-password", label: "Change Password" },
    ],
  },
];

export function AdminSidebar({
  activeSection,
  onSelectSection,
  isOpen,
  onLogout,
}: AdminSidebarProps) {
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    hero: true,
    nav: true,
    about: true,
    skills: true,
    projects: true,
    education: true,
    contact: true,
    seo: true,
    security: true,
  });

  const toggleGroup = (id: string) => {
    setExpandedGroups((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const isActive = (id: string) => activeSection === id;

  return (
    <aside
      className={`fixed top-0 left-0 z-40 h-screen w-64 bg-[#0a0f1e] border-r border-white/5 flex flex-col transition-transform duration-200 lg:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Header */}
      <div className="px-5 py-5 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center border border-cyan-500/20">
            <Settings className="w-4 h-4 text-cyan-400" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-white">Admin Panel</h2>
            <p className="text-xs text-gray-500">Content Management</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 px-3 scrollbar-thin">
        {SECTIONS.map((section) => (
          <div key={section.id} className="mb-0.5">
            {section.subSections ? (
              <div>
                <button
                  onClick={() => toggleGroup(section.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-colors ${
                    section.subSections.some((sub) => isActive(sub.id))
                      ? "text-cyan-400"
                      : "text-gray-500 hover:text-gray-300"
                  }`}
                >
                  <span className="shrink-0">{section.icon}</span>
                  <span className="flex-1">{section.label}</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform ${
                      expandedGroups[section.id] ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {expandedGroups[section.id] && (
                  <div className="ml-3 space-y-0.5 mt-0.5">
                    {section.subSections.map((sub) => (
                      <button
                        key={sub.id}
                        onClick={() => onSelectSection(sub.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                          isActive(sub.id)
                            ? "bg-cyan-500/15 text-cyan-400 font-medium"
                            : "text-gray-400 hover:bg-white/5 hover:text-gray-200"
                        }`}
                      >
                        {sub.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => onSelectSection(section.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 ${
                  isActive(section.id)
                    ? "bg-cyan-500/15 text-cyan-400 font-medium"
                    : "text-gray-400 hover:bg-white/5 hover:text-gray-200"
                }`}
              >
                <span className="shrink-0">{section.icon}</span>
                <span>{section.label}</span>
              </button>
            )}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-3 py-3 border-t border-white/5 space-y-1">
        <button
          onClick={onLogout}
          className="w-full text-left px-3 py-2 rounded-lg text-sm text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-colors flex items-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
        <a
          href="/"
          className="text-xs text-gray-500 hover:text-gray-300 transition-colors flex items-center gap-1.5 px-3 py-1.5"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          Back to Portfolio
        </a>
      </div>
    </aside>
  );
}
