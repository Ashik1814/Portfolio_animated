"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { SiteConfig } from "@/components/admin/types";
import { Save, ChevronDown, ChevronUp, Upload, X, FileText, Link } from "lucide-react";

interface SiteConfigEditorProps {
  config: SiteConfig | null;
  onSave: (body: Record<string, unknown>) => Promise<boolean>;
  defaultCollapsed?: string;
}

interface FieldGroup {
  id: string;
  title: string;
  fields: { key: keyof SiteConfig; label: string; type: "input" | "textarea" | "file"; accept?: string }[];
}

const FIELD_GROUPS: FieldGroup[] = [
  {
    id: "general",
    title: "General Settings",
    fields: [
      { key: "siteName", label: "Site Name", type: "input" },
      { key: "logoText", label: "Logo Text (e.g. Alchemist.io)", type: "input" },
      { key: "cvUrl", label: "CV / Resume", type: "file", accept: ".pdf,.doc,.docx" },
      { key: "footerCopyright", label: "Footer Copyright Text", type: "input" },
    ],
  },
  {
    id: "hero",
    title: "Hero Section",
    fields: [
      { key: "heroWelcomeText", label: "Welcome Badge Text", type: "input" },
      { key: "heroName", label: "Your Name", type: "input" },
      { key: "heroTitle", label: "Your Title / Role", type: "input" },
      { key: "heroDescription", label: "Hero Description", type: "textarea" },
      { key: "heroCtaText", label: "Primary Button Text", type: "input" },
      { key: "heroCtaLink", label: "Primary Button Link", type: "input" },
      { key: "heroSecondaryCtaText", label: "Secondary Button Text", type: "input" },
      { key: "heroSecondaryCtaLink", label: "Secondary Button Link", type: "input" },
      { key: "heroFollowText", label: '"Follow me" Label', type: "input" },
      { key: "heroAvailableText", label: "Availability Badge Text", type: "input" },
      { key: "heroProfileImage", label: "Profile Image URL", type: "input" },
    ],
  },
  {
    id: "about",
    title: "About Section",
    fields: [
      { key: "aboutDescription", label: "About Description", type: "textarea" },
      { key: "approachTitle", label: "Approach Title", type: "input" },
      { key: "approachText1", label: "Approach Text 1", type: "textarea" },
      { key: "approachText2", label: "Approach Text 2", type: "textarea" },
    ],
  },
  {
    id: "descriptions",
    title: "Section Descriptions",
    fields: [
      { key: "skillsDescription", label: "Skills Description", type: "textarea" },
      { key: "projectsDescription", label: "Projects Description", type: "textarea" },
      { key: "educationDescription", label: "Education Description", type: "textarea" },
      { key: "contactDescription", label: "Contact Description", type: "textarea" },
      { key: "contactLocationText", label: "Contact Location Text", type: "input" },
    ],
  },
  {
    id: "seo",
    title: "SEO & Meta Tags",
    fields: [
      { key: "seoTitle", label: "Page Title", type: "input" },
      { key: "seoDescription", label: "Meta Description", type: "textarea" },
      { key: "seoKeywords", label: "Keywords (comma-separated)", type: "input" },
      { key: "seoOgTitle", label: "Open Graph Title", type: "input" },
      { key: "seoOgDescription", label: "Open Graph Description", type: "textarea" },
    ],
  },
];

/** File upload field component */
function FileField({
  value,
  onChange,
  accept,
  label,
}: {
  value: string;
  onChange: (val: string) => void;
  accept?: string;
  label: string;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [showManualUrl, setShowManualUrl] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      if (!res.ok) {
        const data = await res.json();
        alert(data.error || "Upload failed");
        return;
      }
      const data = await res.json();
      onChange(data.url);
    } catch {
      alert("Upload failed");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleRemove = () => {
    onChange("");
  };

  // Extract filename from URL path
  const fileName = value ? decodeURIComponent(value.split("/").pop() || "") : "";

  return (
    <div className="space-y-2">
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileUpload}
        className="hidden"
      />

      {value ? (
        /* Currently has a file */
        <div className="flex items-center gap-3 p-3 rounded-lg bg-[#06080f] border border-white/10">
          <FileText className="w-8 h-8 text-cyan-400 shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-200 truncate">{fileName}</p>
            <p className="text-xs text-gray-500">Uploaded file</p>
          </div>
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-cyan-400 hover:text-cyan-300 shrink-0"
          >
            Open
          </a>
          <button
            onClick={handleRemove}
            className="p-1 rounded hover:bg-white/10 text-gray-500 hover:text-red-400 transition-colors"
            title="Remove file"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        /* No file yet */
        <div className="space-y-2">
          <div
            onClick={() => fileInputRef.current?.click()}
            className={`flex items-center justify-center gap-2 p-4 rounded-lg border-2 border-dashed border-white/10 hover:border-cyan-500/30 hover:bg-cyan-500/5 cursor-pointer transition-all ${uploading ? "opacity-50 pointer-events-none" : ""}`}
          >
            <Upload className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-gray-400">
              {uploading ? "Uploading..." : `Click to upload ${label}`}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setShowManualUrl(!showManualUrl)}
            className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-cyan-400 transition-colors"
          >
            <Link className="w-3 h-3" />
            {showManualUrl ? "Hide URL input" : "Or paste URL manually"}
          </button>
          {showManualUrl && (
            <Input
              placeholder="https://example.com/resume.pdf"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="bg-[#06080f] border-white/10 text-gray-200 focus:border-cyan-500/50 focus:ring-cyan-500/20"
            />
          )}
        </div>
      )}
    </div>
  );
}

export function SiteConfigEditor({ config, onSave, defaultCollapsed }: SiteConfigEditorProps) {
  const [form, setForm] = useState<Record<string, string>>(() => {
    if (!config) return {};
    const result: Record<string, string> = {};
    for (const group of FIELD_GROUPS) {
      for (const f of group.fields) {
        result[f.key] = (config[f.key] as string) ?? "";
      }
    }
    return result;
  });
  const [saving, setSaving] = useState(false);
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>(() => {
    if (defaultCollapsed) {
      const collapsed: Record<string, boolean> = {};
      for (const group of FIELD_GROUPS) {
        if (group.id !== defaultCollapsed) {
          collapsed[group.id] = true;
        }
      }
      return collapsed;
    }
    return {};
  });

  const toggleGroup = (id: string) => {
    setCollapsedGroups((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSave = async () => {
    setSaving(true);
    await onSave({ id: "site-config", ...form });
    setSaving(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <Settings2Icon />
            Site Configuration
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Manage all site-wide settings, hero content, SEO, and more
          </p>
        </div>
        <Button
          onClick={handleSave}
          disabled={saving}
          className="bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 border border-cyan-500/30"
        >
          <Save className="w-4 h-4 mr-2" />
          {saving ? "Saving..." : "Save All Changes"}
        </Button>
      </div>

      {/* Field Groups */}
      {FIELD_GROUPS.map((group) => (
        <Card key={group.id} className="bg-[#0d1525] border-white/5">
          <CardHeader
            className="cursor-pointer hover:bg-white/[0.02] transition-colors"
            onClick={() => toggleGroup(group.id)}
          >
            <CardTitle className="text-white text-base flex items-center justify-between">
              <span>{group.title}</span>
              {collapsedGroups[group.id] ? (
                <ChevronDown className="w-4 h-4 text-gray-500" />
              ) : (
                <ChevronUp className="w-4 h-4 text-gray-500" />
              )}
            </CardTitle>
          </CardHeader>
          {!collapsedGroups[group.id] && (
            <CardContent className="space-y-5">
              {group.fields.map((f) => (
                <div key={f.key} className="space-y-1.5">
                  <Label className="text-gray-300 text-sm">{f.label}</Label>
                  {f.type === "file" ? (
                    <FileField
                      value={form[f.key] ?? ""}
                      onChange={(val) => setForm((prev) => ({ ...prev, [f.key]: val }))}
                      accept={f.accept}
                      label={f.label}
                    />
                  ) : f.type === "textarea" ? (
                    <Textarea
                      value={form[f.key] ?? ""}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, [f.key]: e.target.value }))
                      }
                      className="bg-[#06080f] border-white/10 text-gray-200 min-h-[80px] focus:border-cyan-500/50 focus:ring-cyan-500/20"
                    />
                  ) : (
                    <Input
                      value={form[f.key] ?? ""}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, [f.key]: e.target.value }))
                      }
                      className="bg-[#06080f] border-white/10 text-gray-200 focus:border-cyan-500/50 focus:ring-cyan-500/20"
                    />
                  )}
                </div>
              ))}
            </CardContent>
          )}
        </Card>
      ))}

      {/* Bottom Save */}
      <div className="flex justify-end pt-4">
        <Button
          onClick={handleSave}
          disabled={saving}
          size="lg"
          className="bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 border border-cyan-500/30"
        >
          <Save className="w-4 h-4 mr-2" />
          {saving ? "Saving..." : "Save All Changes"}
        </Button>
      </div>
    </div>
  );
}

function Settings2Icon() {
  return (
    <svg
      className="w-5 h-5 text-cyan-400"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
}
