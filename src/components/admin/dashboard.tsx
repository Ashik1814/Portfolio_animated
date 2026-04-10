"use client";

import type { ContentData } from "@/components/admin/types";
import { Card, CardContent } from "@/components/ui/card";
import {
  Briefcase,
  Target,
  User,
  GraduationCap,
  Phone,
  Navigation,
  Swords,
  Search,
} from "lucide-react";

interface DashboardViewProps {
  data: ContentData;
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: string;
  sectionId: string;
}

function StatCard({ icon, label, value, color, sectionId }: StatCardProps) {
  return (
    <Card className="bg-[#0d1525] border-white/5 hover:border-white/10 transition-colors cursor-pointer group">
      <CardContent className="p-5">
        <div className="flex items-center gap-4">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
            style={{ backgroundColor: `${color}15` }}
          >
            <span style={{ color }} className="group-hover:scale-110 transition-transform">
              {icon}
            </span>
          </div>
          <div>
            <p className="text-2xl font-bold text-white">{value}</p>
            <p className="text-sm text-gray-400">{label}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function DashboardView({ data }: DashboardViewProps) {
  const stats: StatCardProps[] = [
    {
      icon: <Swords className="w-5 h-5" />,
      label: "Hero Stats",
      value: data.heroStats.length,
      color: "#00e5ff",
      sectionId: "hero-stats",
    },
    {
      icon: <Navigation className="w-5 h-5" />,
      label: "Nav Items",
      value: data.navItems.length,
      color: "#64b5f6",
      sectionId: "nav-items",
    },
    {
      icon: <User className="w-5 h-5" />,
      label: "About Skills",
      value: data.aboutSkills.length,
      color: "#a78bfa",
      sectionId: "about-skills",
    },
    {
      icon: <Target className="w-5 h-5" />,
      label: "Skill Categories",
      value: data.skillCategories.length,
      color: "#2dd4bf",
      sectionId: "skill-categories",
    },
    {
      icon: <Briefcase className="w-5 h-5" />,
      label: "Projects",
      value: data.projects.length,
      color: "#f472b6",
      sectionId: "projects",
    },
    {
      icon: <GraduationCap className="w-5 h-5" />,
      label: "Degrees",
      value: data.degrees.length,
      color: "#fbbf24",
      sectionId: "degrees",
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: "Contact Cards",
      value: data.contactCards.length,
      color: "#34d399",
      sectionId: "contact-cards",
    },
    {
      icon: <Search className="w-5 h-5" />,
      label: "Social Links",
      value: data.socialLinks.length,
      color: "#f97316",
      sectionId: "social-links",
    },
  ];

  const totalItems = stats.reduce((sum, s) => sum + s.value, 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          📊 Dashboard
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Overview of your portfolio content — {totalItems} total items managed
        </p>
      </div>

      {/* Site Info Card */}
      <Card className="bg-[#0d1525] border-white/5">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center border border-cyan-500/20">
              <span className="text-xl">🏠</span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">
                {data.siteConfig?.siteName || "Your Site"}
              </h2>
              <p className="text-sm text-gray-400">
                {data.siteConfig?.heroTitle || "Configure your site"}
              </p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2 text-gray-400">
              <span className="text-gray-500">Logo:</span>
              <span className="text-gray-200">{data.siteConfig?.logoText || "Not set"}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <span className="text-gray-500">CV URL:</span>
              <span className="text-gray-200">{data.siteConfig?.cvUrl ? "Set ✓" : "Not set"}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <span className="text-gray-500">Profile Image:</span>
              <span className="text-gray-200">{data.siteConfig?.heroProfileImage ? "Set ✓" : "Not set"}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <span className="text-gray-500">SEO:</span>
              <span className="text-gray-200">{data.siteConfig?.seoTitle ? "Configured ✓" : "Not configured"}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-4">Content Overview</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <StatCard key={stat.sectionId} {...stat} />
          ))}
        </div>
      </div>

      {/* Quick Tips */}
      <Card className="bg-[#0d1525] border-white/5">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold text-white mb-4">💡 Quick Tips</h2>
          <div className="space-y-3 text-sm text-gray-400">
            <div className="flex items-start gap-2">
              <span className="text-cyan-400 mt-0.5">•</span>
              <span>Use <strong className="text-gray-200">Site Config</strong> to update your name, logo, hero text, and all section descriptions in one place.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-cyan-400 mt-0.5">•</span>
              <span>Manage navigation links under <strong className="text-gray-200">Navigation → Nav Items</strong>. Reorder with the order field.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-cyan-400 mt-0.5">•</span>
              <span>The floating stats on the hero section are managed under <strong className="text-gray-200">Hero → Hero Stats</strong>.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-cyan-400 mt-0.5">•</span>
              <span>Set your profile image URL in <strong className="text-gray-200">Site Config → Hero Section → Profile Image URL</strong>.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-cyan-400 mt-0.5">•</span>
              <span>SEO meta tags can be configured in <strong className="text-gray-200">Site Config → SEO & Meta Tags</strong>.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-cyan-400 mt-0.5">•</span>
              <span>Change your admin password under <strong className="text-gray-200">Security → Change Password</strong>.</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
