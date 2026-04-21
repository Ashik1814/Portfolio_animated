"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Pencil, Trash2, AlertTriangle, X, Image as ImageIcon, Upload } from "lucide-react";
import type { ContentData } from "@/components/admin/types";

/* ───── Entity definitions ───── */

interface FieldDef {
  key: string;
  label: string;
  type: "text" | "number" | "textarea" | "color" | "select" | "file";
  options?: { value: string; label: string }[];
  selectDataKey?: string; // key in ContentData to use for select options
  selectLabelKey?: string; // field to use as label from selectData
  accept?: string; // for file type fields, e.g. "image/*" or "video/*"
}

interface EntityDef {
  title: string;
  icon: string;
  dataKey: keyof ContentData;
  apiPath: string;
  fields: FieldDef[];
  displayFields: { key: string; label: string; type?: "badge" | "color" | "text" | "image" }[];
  isList?: boolean;
}

const ENTITY_DEFS: Record<string, EntityDef> = {
  "about-skills": {
    title: "About Skills",
    icon: "👤",
    dataKey: "aboutSkills",
    apiPath: "about-skills",
    fields: [
      { key: "icon", label: "Icon (Lucide name)", type: "text" },
      { key: "title", label: "Title", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "metric", label: "Metric", type: "text" },
      { key: "metricLabel", label: "Metric Label", type: "text" },
      { key: "color", label: "Color", type: "color" },
      { key: "order", label: "Order", type: "number" },
    ],
    displayFields: [
      { key: "title", label: "Title" },
      { key: "icon", label: "Icon" },
      { key: "metric", label: "Metric" },
      { key: "color", label: "Color", type: "color" },
      { key: "order", label: "Order" },
    ],
  },
  "core-values": {
    title: "Core Values",
    icon: "👤",
    dataKey: "coreValues",
    apiPath: "core-values",
    fields: [
      { key: "icon", label: "Icon (Lucide)", type: "text" },
      { key: "title", label: "Title", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "order", label: "Order", type: "number" },
    ],
    displayFields: [
      { key: "title", label: "Title" },
      { key: "icon", label: "Icon" },
      { key: "order", label: "Order" },
    ],
  },
  "journey-items": {
    title: "Journey Items",
    icon: "👤",
    dataKey: "journeyItems",
    apiPath: "journey-items",
    fields: [
      { key: "year", label: "Year", type: "text" },
      { key: "title", label: "Title", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "order", label: "Order", type: "number" },
    ],
    displayFields: [
      { key: "year", label: "Year" },
      { key: "title", label: "Title" },
      { key: "order", label: "Order" },
    ],
  },
  "about-tech-tags": {
    title: "About Tech Tags",
    icon: "👤",
    dataKey: "aboutTechTags",
    apiPath: "about-tech-tags",
    fields: [
      { key: "name", label: "Name", type: "text" },
      { key: "order", label: "Order", type: "number" },
    ],
    displayFields: [
      { key: "name", label: "Name", type: "badge" },
      { key: "order", label: "Order" },
    ],
  },
  "skill-categories": {
    title: "Skill Categories",
    icon: "🎯",
    dataKey: "skillCategories",
    apiPath: "skill-categories",
    fields: [
      { key: "icon", label: "Icon (Lucide name)", type: "text" },
      { key: "title", label: "Title", type: "text" },
      { key: "color", label: "Color", type: "color" },
      { key: "order", label: "Order", type: "number" },
    ],
    displayFields: [
      { key: "title", label: "Title" },
      { key: "icon", label: "Icon" },
      { key: "color", label: "Color", type: "color" },
      { key: "order", label: "Order" },
    ],
  },
  skills: {
    title: "Skills",
    icon: "🎯",
    dataKey: "skillCategories",
    apiPath: "skills",
    fields: [
      { key: "name", label: "Name", type: "text" },
      { key: "percentage", label: "Percentage (0-100)", type: "number" },
      {
        key: "categoryId",
        label: "Category",
        type: "select",
        selectDataKey: "skillCategories",
        selectLabelKey: "title",
      },
      { key: "order", label: "Order", type: "number" },
    ],
    displayFields: [
      { key: "name", label: "Name" },
      { key: "percentage", label: "%" },
      { key: "order", label: "Order" },
    ],
    // Special: flat list of all skills from categories
    isList: false,
  },
  "soft-skills": {
    title: "Soft Skills",
    icon: "🎯",
    dataKey: "softSkills",
    apiPath: "soft-skills",
    fields: [
      { key: "icon", label: "Icon (Lucide)", type: "text" },
      { key: "name", label: "Name", type: "text" },
      { key: "percentage", label: "Percentage (0-100)", type: "number" },
      { key: "color", label: "Color", type: "color" },
      { key: "order", label: "Order", type: "number" },
    ],
    displayFields: [
      { key: "name", label: "Name" },
      { key: "percentage", label: "%" },
      { key: "color", label: "Color", type: "color" },
      { key: "order", label: "Order" },
    ],
  },
  "additional-tech": {
    title: "Additional Tech",
    icon: "🎯",
    dataKey: "additionalTech",
    apiPath: "additional-tech",
    fields: [
      { key: "name", label: "Name", type: "text" },
      { key: "order", label: "Order", type: "number" },
    ],
    displayFields: [
      { key: "name", label: "Name", type: "badge" },
      { key: "order", label: "Order" },
    ],
  },
  "currently-learning": {
    title: "Currently Learning",
    icon: "🎯",
    dataKey: "currentlyLearning",
    apiPath: "currently-learning",
    fields: [
      { key: "name", label: "Name", type: "text" },
      { key: "percentage", label: "Percentage (0-100)", type: "number" },
      { key: "color", label: "Color", type: "color" },
      { key: "order", label: "Order", type: "number" },
    ],
    displayFields: [
      { key: "name", label: "Name" },
      { key: "percentage", label: "%" },
      { key: "color", label: "Color", type: "color" },
      { key: "order", label: "Order" },
    ],
  },
  projects: {
    title: "Projects",
    icon: "💼",
    dataKey: "projects",
    apiPath: "projects",
    fields: [
      { key: "icon", label: "Icon (Lucide)", type: "text" },
      { key: "title", label: "Title", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
      {
        key: "category",
        label: "Category",
        type: "select",
        options: [
          { value: "Development", label: "Development" },
          { value: "Design", label: "Design" },
          { value: "Automation", label: "Automation" },
        ],
      },
      { key: "gradient", label: "Gradient", type: "text" },
      { key: "accentColor", label: "Accent Color", type: "color" },
      { key: "liveUrl", label: "Live URL", type: "text" },
      { key: "codeUrl", label: "Code URL", type: "text" },
      { key: "imageUrl", label: "Project Image", type: "file", accept: "image/*" },
      { key: "videoUrl", label: "Project Video", type: "file", accept: "video/*" },
      { key: "order", label: "Order", type: "number" },
    ],
    displayFields: [
      { key: "title", label: "Title" },
      { key: "category", label: "Category", type: "badge" },
      { key: "accentColor", label: "Accent", type: "color" },
      { key: "imageUrl", label: "Image", type: "image" },
      { key: "order", label: "Order" },
    ],
  },
  "project-tags": {
    title: "Project Tags",
    icon: "💼",
    dataKey: "projects",
    apiPath: "project-tags",
    fields: [
      { key: "name", label: "Name", type: "text" },
      { key: "bgLight", label: "BG Light Class", type: "text" },
      { key: "bgDark", label: "BG Dark Class", type: "text" },
      { key: "textLight", label: "Text Light Class", type: "text" },
      { key: "textDark", label: "Text Dark Class", type: "text" },
      {
        key: "projectId",
        label: "Project",
        type: "select",
        selectDataKey: "projects",
        selectLabelKey: "title",
      },
      { key: "order", label: "Order", type: "number" },
    ],
    displayFields: [
      { key: "name", label: "Name" },
      { key: "projectId", label: "Project" },
      { key: "order", label: "Order" },
    ],
    isList: false,
  },
  degrees: {
    title: "Degrees",
    icon: "🎓",
    dataKey: "degrees",
    apiPath: "degrees",
    fields: [
      { key: "icon", label: "Icon (Lucide)", type: "text" },
      { key: "title", label: "Title", type: "text" },
      { key: "institution", label: "Institution", type: "text" },
      { key: "location", label: "Location", type: "text" },
      { key: "period", label: "Period", type: "text" },
      { key: "gpa", label: "GPA", type: "text" },
      { key: "gpaColor", label: "GPA Color", type: "color" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "achievements", label: "Achievements (comma-separated)", type: "textarea" },
      { key: "order", label: "Order", type: "number" },
    ],
    displayFields: [
      { key: "title", label: "Title" },
      { key: "institution", label: "Institution" },
      { key: "period", label: "Period" },
      { key: "order", label: "Order" },
    ],
  },
  certifications: {
    title: "Certifications",
    icon: "🎓",
    dataKey: "certifications",
    apiPath: "certifications",
    fields: [
      { key: "icon", label: "Icon (Lucide)", type: "text" },
      { key: "name", label: "Name", type: "text" },
      { key: "issuer", label: "Issuer", type: "text" },
      { key: "year", label: "Year", type: "text" },
      { key: "color", label: "Color", type: "color" },
      { key: "order", label: "Order", type: "number" },
    ],
    displayFields: [
      { key: "name", label: "Name" },
      { key: "issuer", label: "Issuer" },
      { key: "year", label: "Year" },
      { key: "color", label: "Color", type: "color" },
      { key: "order", label: "Order" },
    ],
  },
  coursework: {
    title: "Coursework",
    icon: "🎓",
    dataKey: "coursework",
    apiPath: "coursework",
    fields: [
      { key: "name", label: "Name", type: "text" },
      { key: "order", label: "Order", type: "number" },
    ],
    displayFields: [
      { key: "name", label: "Name", type: "badge" },
      { key: "order", label: "Order" },
    ],
  },
  "contact-cards": {
    title: "Contact Cards",
    icon: "📞",
    dataKey: "contactCards",
    apiPath: "contact-cards",
    fields: [
      {
        key: "icon",
        label: "Icon",
        type: "select",
        options: [
          // Lucide icons (commonly used)
          { value: "Mail", label: "✉️ Mail" },
          { value: "Phone", label: "📞 Phone" },
          { value: "MapPin", label: "📍 MapPin" },
          { value: "Globe", label: "🌐 Globe" },
          { value: "Link", label: "🔗 Link" },
          { value: "Github", label: "🐙 Github (Lucide)" },
          { value: "Linkedin", label: "💼 Linkedin (Lucide)" },
          { value: "Youtube", label: "▶️ Youtube (Lucide)" },
          { value: "Facebook", label: "📘 Facebook (Lucide)" },
          { value: "Twitter", label: "🐦 Twitter (Lucide)" },
          { value: "Instagram", label: "📷 Instagram (Lucide)" },
          // Brand icons (react-icons/fa)
          { value: "FaWhatsapp", label: "💬 WhatsApp" },
          { value: "FaFacebookF", label: "📘 Facebook" },
          { value: "FaGithub", label: "🐙 GitHub" },
          { value: "FaLinkedinIn", label: "💼 LinkedIn" },
          { value: "FaYoutube", label: "▶️ YouTube" },
          { value: "FaTwitter", label: "🐦 Twitter/X" },
          { value: "FaInstagram", label: "📷 Instagram" },
          { value: "FaTelegram", label: "✈️ Telegram" },
          { value: "FaDiscord", label: "🎮 Discord" },
          { value: "FaTiktok", label: "🎵 TikTok" },
          { value: "FaMedium", label: "📝 Medium" },
          { value: "FaDribbble", label: "🏀 Dribbble" },
          { value: "FaBehance", label: "🎨 Behance" },
          { value: "FaPinterest", label: "📌 Pinterest" },
          // Brand icons (react-icons/si)
          { value: "SiGmail", label: "📧 Gmail" },
          { value: "SiGoogle", label: "🔍 Google" },
          { value: "SiSlack", label: "💬 Slack" },
          { value: "SiStackoverflow", label: "📚 Stack Overflow" },
          { value: "SiFigma", label: "🎨 Figma" },
          { value: "SiSpotify", label: "🎵 Spotify" },
          { value: "SiDevdotto", label: "👩‍💻 Dev.to" },
        ],
      },
      { key: "label", label: "Label", type: "text" },
      { key: "value", label: "Value", type: "text" },
      { key: "href", label: "Link (href)", type: "text" },
      { key: "order", label: "Order", type: "number" },
    ],
    displayFields: [
      { key: "label", label: "Label" },
      { key: "value", label: "Value" },
      { key: "icon", label: "Icon" },
      { key: "order", label: "Order" },
    ],
  },
  "social-links": {
    title: "Social Links",
    icon: "📞",
    dataKey: "socialLinks",
    apiPath: "social-links",
    fields: [
      {
        key: "icon",
        label: "Icon",
        type: "select",
        options: [
          // Lucide icons (commonly used)
          { value: "Mail", label: "✉️ Mail" },
          { value: "Phone", label: "📞 Phone" },
          { value: "MapPin", label: "📍 MapPin" },
          { value: "Globe", label: "🌐 Globe" },
          { value: "Link", label: "🔗 Link" },
          { value: "Github", label: "🐙 Github (Lucide)" },
          { value: "Linkedin", label: "💼 Linkedin (Lucide)" },
          { value: "Youtube", label: "▶️ Youtube (Lucide)" },
          { value: "Facebook", label: "📘 Facebook (Lucide)" },
          { value: "Twitter", label: "🐦 Twitter (Lucide)" },
          { value: "Instagram", label: "📷 Instagram (Lucide)" },
          // Brand icons (react-icons/fa)
          { value: "FaWhatsapp", label: "💬 WhatsApp" },
          { value: "FaFacebookF", label: "📘 Facebook" },
          { value: "FaGithub", label: "🐙 GitHub" },
          { value: "FaLinkedinIn", label: "💼 LinkedIn" },
          { value: "FaYoutube", label: "▶️ YouTube" },
          { value: "FaTwitter", label: "🐦 Twitter/X" },
          { value: "FaInstagram", label: "📷 Instagram" },
          { value: "FaTelegram", label: "✈️ Telegram" },
          { value: "FaDiscord", label: "🎮 Discord" },
          { value: "FaTiktok", label: "🎵 TikTok" },
          { value: "FaMedium", label: "📝 Medium" },
          { value: "FaDribbble", label: "🏀 Dribbble" },
          { value: "FaBehance", label: "🎨 Behance" },
          { value: "FaPinterest", label: "📌 Pinterest" },
          // Brand icons (react-icons/si)
          { value: "SiGmail", label: "📧 Gmail" },
          { value: "SiGoogle", label: "🔍 Google" },
          { value: "SiSlack", label: "💬 Slack" },
          { value: "SiStackoverflow", label: "📚 Stack Overflow" },
          { value: "SiFigma", label: "🎨 Figma" },
          { value: "SiSpotify", label: "🎵 Spotify" },
          { value: "SiDevdotto", label: "👩‍💻 Dev.to" },
        ],
      },
      { key: "href", label: "URL", type: "text" },
      { key: "label", label: "Label", type: "text" },
      { key: "order", label: "Order", type: "number" },
    ],
    displayFields: [
      { key: "label", label: "Label" },
      { key: "href", label: "URL" },
      { key: "icon", label: "Icon" },
      { key: "order", label: "Order" },
    ],
  },
  "nav-items": {
    title: "Navigation Items",
    icon: "🧭",
    dataKey: "navItems",
    apiPath: "nav-items",
    fields: [
      { key: "label", label: "Label", type: "text" },
      { key: "href", label: "Link (href)", type: "text" },
      { key: "order", label: "Order", type: "number" },
    ],
    displayFields: [
      { key: "label", label: "Label" },
      { key: "href", label: "Link" },
      { key: "order", label: "Order" },
    ],
  },
  "hero-stats": {
    title: "Hero Stats",
    icon: "🎯",
    dataKey: "heroStats",
    apiPath: "hero-stats",
    fields: [
      { key: "value", label: "Value (e.g. 50+)", type: "text" },
      { key: "label", label: "Label (e.g. Projects)", type: "text" },
      { key: "color", label: "Color", type: "color" },
      {
        key: "position",
        label: "Position",
        type: "select",
        options: [
          { value: "left-top", label: "Left Top" },
          { value: "right-middle", label: "Right Middle" },
          { value: "left-bottom", label: "Left Bottom" },
        ],
      },
      { key: "order", label: "Order", type: "number" },
    ],
    displayFields: [
      { key: "value", label: "Value" },
      { key: "label", label: "Label" },
      { key: "color", label: "Color", type: "color" },
      { key: "position", label: "Position" },
      { key: "order", label: "Order" },
    ],
  },
};

/* ───── Helpers ───── */

function getFlatItems(entityKey: string, data: ContentData): Record<string, unknown>[] {
  const def = ENTITY_DEFS[entityKey];
  if (!def) return [];

  if (entityKey === "skills") {
    const categories = data.skillCategories as { id: string; title: string; skills: { id: string; name: string; percentage: number; categoryId: string; order: number }[] }[];
    return categories.flatMap((cat) =>
      cat.skills.map((s) => ({ ...s, _categoryName: cat.title }))
    );
  }

  if (entityKey === "project-tags") {
    const projects = data.projects as { id: string; title: string; tags: { id: string; name: string; bgLight: string; bgDark: string; textLight: string; textDark: string; projectId: string; order: number }[] }[];
    return projects.flatMap((p) =>
      p.tags.map((t) => ({ ...t, _projectName: p.title }))
    );
  }

  const items = data[def.dataKey] as unknown as Record<string, unknown>[];
  if (Array.isArray(items)) return items;
  return [];
}

/* ───── Main Component ───── */

interface EntityEditorProps {
  entityKey: string;
  data: ContentData;
  onCrud: (
    method: "POST" | "PUT" | "DELETE",
    entity: string,
    body: Record<string, unknown>
  ) => Promise<boolean>;
}

export function EntityEditor({ entityKey, data, onCrud }: EntityEditorProps) {
  const def = ENTITY_DEFS[entityKey];
  const items = useMemo(() => getFlatItems(entityKey, data), [entityKey, data]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Record<string, unknown> | null>(null);
  const [deletingItem, setDeletingItem] = useState<Record<string, unknown> | null>(null);
  const [formState, setFormState] = useState<Record<string, unknown>>({});
  const [submitting, setSubmitting] = useState(false);

  if (!def) {
    return (
      <div className="text-gray-400 text-center py-20">
        Unknown section: {entityKey}
      </div>
    );
  }

  const openAddDialog = () => {
    const defaults: Record<string, unknown> = {};
    for (const f of def.fields) {
      if (f.type === "number") defaults[f.key] = 0;
      else if (f.type === "select" && f.options?.[0]) defaults[f.key] = f.options[0].value;
      else if (f.type === "select" && f.selectDataKey) {
        const selectItems = data[f.selectDataKey as keyof ContentData];
        if (Array.isArray(selectItems) && selectItems.length > 0) {
          defaults[f.key] = (selectItems[0] as { id: string }).id;
        }
      } else if (f.type === "file") defaults[f.key] = "";
      else defaults[f.key] = "";
    }
    setFormState(defaults);
    setEditingItem(null);
    setDialogOpen(true);
  };

  const openEditDialog = (item: Record<string, unknown>) => {
    const form: Record<string, unknown> = {};
    for (const f of def.fields) {
      form[f.key] = item[f.key] ?? (f.type === "number" ? 0 : "");
    }
    setFormState(form);
    setEditingItem(item);
    setDialogOpen(true);
  };

  const openDeleteDialog = (item: Record<string, unknown>) => {
    setDeletingItem(item);
    setDeleteDialogOpen(true);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    const body: Record<string, unknown> = { ...formState };
    // Convert number fields
    for (const f of def.fields) {
      if (f.type === "number") {
        body[f.key] = Number(body[f.key]) || 0;
      }
    }
    if (editingItem) {
      body.id = editingItem.id;
      await onCrud("PUT", def.apiPath, body);
    } else {
      await onCrud("POST", def.apiPath, body);
    }
    setSubmitting(false);
    setDialogOpen(false);
  };

  const handleDelete = async () => {
    if (!deletingItem) return;
    setSubmitting(true);
    await onCrud("DELETE", def.apiPath, { id: deletingItem.id });
    setSubmitting(false);
    setDeleteDialogOpen(false);
    setDeletingItem(null);
  };

  const getDisplayValue = (item: Record<string, unknown>, df: { key: string; type?: string }) => {
    if (df.key === "projectId" && item._projectName) return item._projectName as string;
    if (df.key === "categoryId" && item._categoryName) return item._categoryName as string;
    const val = item[df.key];
    if (val === null || val === undefined) return "—";
    return String(val);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">
            {def.icon} {def.title}
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            {items.length} item{items.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Button
          onClick={openAddDialog}
          className="bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 border border-cyan-500/30"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New
        </Button>
      </div>

      {/* Items list */}
      {items.length === 0 ? (
        <Card className="bg-[#0d1525] border-white/5">
          <CardContent className="py-12 text-center">
            <p className="text-gray-500">No items yet. Click &quot;Add New&quot; to create one.</p>
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-[#0d1525] border-white/5 overflow-hidden">
          {/* Table header */}
          <div className="grid gap-4 px-6 py-3 border-b border-white/5 bg-[#0a0f1e] text-xs font-medium text-gray-400 uppercase tracking-wider"
            style={{
              gridTemplateColumns: `repeat(${def.displayFields.length}, minmax(0, 1fr)) 100px`,
            }}
          >
            {def.displayFields.map((df) => (
              <span key={df.key}>{df.label}</span>
            ))}
            <span className="text-right">Actions</span>
          </div>

          {/* Table rows */}
          <div className="max-h-[calc(100vh-300px)] overflow-y-auto">
            {items.map((item) => (
              <div
                key={item.id as string}
                className="grid gap-4 px-6 py-3 border-b border-white/5 hover:bg-white/[0.02] transition-colors items-center"
                style={{
                  gridTemplateColumns: `repeat(${def.displayFields.length}, minmax(0, 1fr)) 100px`,
                }}
              >
                {def.displayFields.map((df) => (
                  <span key={df.key} className="text-sm text-gray-300 truncate">
                    {df.type === "badge" ? (
                      <Badge variant="secondary" className="bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 text-xs">
                        {getDisplayValue(item, df)}
                      </Badge>
                    ) : df.type === "color" ? (
                      <div className="flex items-center gap-2">
                        <div
                          className="w-4 h-4 rounded-full border border-white/20 shrink-0"
                          style={{ backgroundColor: String(item[df.key] ?? "#666") }}
                        />
                        <span className="text-xs text-gray-500 font-mono">
                          {String(item[df.key] ?? "")}
                        </span>
                      </div>
                    ) : df.type === "image" ? (
                      <div className="flex items-center gap-2">
                        {item[df.key] ? (
                          <img src={String(item[df.key])} alt="" className="w-8 h-8 rounded object-cover border border-white/10" />
                        ) : (
                          <div className="w-8 h-8 rounded bg-[#06080f] border border-white/5 flex items-center justify-center">
                            <ImageIcon className="w-3.5 h-3.5 text-gray-600" />
                          </div>
                        )}
                      </div>
                    ) : (
                      getDisplayValue(item, df)
                    )}
                  </span>
                ))}
                <div className="flex items-center justify-end gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openEditDialog(item)}
                    className="h-8 w-8 p-0 text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openDeleteDialog(item)}
                    className="h-8 w-8 p-0 text-gray-400 hover:text-red-400 hover:bg-red-500/10"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-[#0d1525] border-white/10 text-white max-h-[85vh] overflow-y-auto sm:max-w-xl">
          <DialogHeader>
            <DialogTitle className="text-white">
              {editingItem ? "Edit" : "Add"} {def.title.replace(/s$/, "")}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            {def.fields.map((f) => (
              <div key={f.key} className="space-y-1.5">
                <Label className="text-gray-300 text-sm">{f.label}</Label>

                {f.type === "textarea" ? (
                  <Textarea
                    value={String(formState[f.key] ?? "")}
                    onChange={(e) =>
                      setFormState((prev) => ({ ...prev, [f.key]: e.target.value }))
                    }
                    className="bg-[#06080f] border-white/10 text-gray-200 min-h-[80px] focus:border-cyan-500/50 focus:ring-cyan-500/20"
                  />
                ) : f.type === "color" ? (
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={String(formState[f.key] ?? "#666666")}
                      onChange={(e) =>
                        setFormState((prev) => ({ ...prev, [f.key]: e.target.value }))
                      }
                      className="w-10 h-10 rounded border border-white/10 bg-transparent cursor-pointer"
                    />
                    <Input
                      value={String(formState[f.key] ?? "")}
                      onChange={(e) =>
                        setFormState((prev) => ({ ...prev, [f.key]: e.target.value }))
                      }
                      className="bg-[#06080f] border-white/10 text-gray-200 focus:border-cyan-500/50 focus:ring-cyan-500/20 flex-1"
                    />
                  </div>
                ) : f.type === "select" && f.options ? (
                  <Select
                    value={String(formState[f.key] ?? "")}
                    onValueChange={(val) =>
                      setFormState((prev) => ({ ...prev, [f.key]: val }))
                    }
                  >
                    <SelectTrigger className="bg-[#06080f] border-white/10 text-gray-200 focus:border-cyan-500/50 focus:ring-cyan-500/20 w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0d1525] border-white/10">
                      {f.options.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : f.type === "select" && f.selectDataKey ? (
                  <Select
                    value={String(formState[f.key] ?? "")}
                    onValueChange={(val) =>
                      setFormState((prev) => ({ ...prev, [f.key]: val }))
                    }
                  >
                    <SelectTrigger className="bg-[#06080f] border-white/10 text-gray-200 focus:border-cyan-500/50 focus:ring-cyan-500/20 w-full">
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0d1525] border-white/10">
                      {(
                        data[f.selectDataKey as keyof ContentData] as unknown as { id: string; [k: string]: unknown }[]
                      )?.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          {String(item[f.selectLabelKey ?? "id"])}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : f.type === "file" ? (
                  <div className="space-y-2">
                    {/* Current file preview */}
                    {formState[f.key] ? (
                      <div className="flex items-center gap-2 p-2 rounded-lg bg-[#06080f] border border-white/10">
                        {String(formState[f.key]).match(/\.(mp4|webm|ogg)$/i) ? (
                          <div className="flex items-center gap-2 text-sm text-gray-300">
                            <Upload className="w-4 h-4 text-[#00e5ff]" />
                            <span className="truncate">Video uploaded</span>
                          </div>
                        ) : (
                          <img
                            src={String(formState[f.key])}
                            alt="Preview"
                            className="w-16 h-16 object-cover rounded-md border border-white/10"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-gray-400 truncate">{String(formState[f.key]).split('/').pop()}</p>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setFormState((prev) => ({ ...prev, [f.key]: "" }))}
                          className="h-7 w-7 p-0 text-gray-400 hover:text-red-400 hover:bg-red-500/10"
                        >
                          <X className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    ) : null}

                    {/* File upload */}
                    <div className="flex gap-2">
                      <label className="flex-1 cursor-pointer">
                        <div className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border border-dashed border-white/20 hover:border-[#00e5ff]/40 bg-[#06080f] transition-colors text-sm text-gray-400 hover:text-[#00e5ff]">
                          <div className="w-6 h-6 rounded-full bg-[#00e5ff]/10 flex items-center justify-center shrink-0">
                            <Plus className="w-3.5 h-3.5 text-[#00e5ff]" />
                          </div>
                          <span>Add File</span>
                        </div>
                        <input
                          type="file"
                          accept={f.accept || "*"}
                          className="hidden"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            const fd = new FormData();
                            fd.append("file", file);
                            try {
                              const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
                              const respData = await res.json();
                              if (respData.url) {
                                setFormState((prev) => ({ ...prev, [f.key]: respData.url }));
                              }
                            } catch (err) {
                              console.error("Upload failed:", err);
                            }
                          }}
                        />
                      </label>
                    </div>

                    {/* Manual URL input */}
                    <div className="relative">
                      <Input
                        placeholder="Or paste URL manually..."
                        value={String(formState[f.key] ?? "")}
                        onChange={(e) => setFormState((prev) => ({ ...prev, [f.key]: e.target.value }))}
                        className="bg-[#06080f] border-white/10 text-gray-200 focus:border-cyan-500/50 focus:ring-cyan-500/20 pr-8"
                      />
                      {!!formState[f.key] && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setFormState((prev) => ({ ...prev, [f.key]: "" }))}
                          className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 p-0 text-gray-400 hover:text-red-400"
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                ) : (
                  <Input
                    type={f.type === "number" ? "number" : "text"}
                    value={String(formState[f.key] ?? "")}
                    onChange={(e) =>
                      setFormState((prev) => ({
                        ...prev,
                        [f.key]: f.type === "number" ? Number(e.target.value) : e.target.value,
                      }))
                    }
                    className="bg-[#06080f] border-white/10 text-gray-200 focus:border-cyan-500/50 focus:ring-cyan-500/20"
                  />
                )}
              </div>
            ))}
          </div>

          <DialogFooter className="gap-2">
            <Button
              variant="ghost"
              onClick={() => setDialogOpen(false)}
              className="text-gray-400 hover:text-white hover:bg-white/5"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={submitting}
              className="bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 border border-cyan-500/30"
            >
              {submitting ? "Saving..." : editingItem ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="bg-[#0d1525] border-white/10 text-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              Confirm Delete
            </DialogTitle>
          </DialogHeader>
          <p className="text-gray-300 text-sm">
            Are you sure you want to delete this item? This action cannot be undone.
          </p>
          <DialogFooter className="gap-2">
            <Button
              variant="ghost"
              onClick={() => setDeleteDialogOpen(false)}
              className="text-gray-400 hover:text-white hover:bg-white/5"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              disabled={submitting}
              className="bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30"
            >
              {submitting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
