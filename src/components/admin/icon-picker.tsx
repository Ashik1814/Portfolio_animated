"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { cn } from "@/lib/utils";

interface IconPickerProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const ESSENTIAL_ICONS = [
  "GraduationCap", "Briefcase", "Code", "User", "Mail", "Globe",
  "Github", "Smartphone", "Layout", "Database", "Server", "Cpu",
  "Palette", "Terminal", "Award", "Book", "Microscope", "Pencil",
  "Image", "Video", "MessageSquare", "Heart", "Star", "Settings",
  "Zap", "Monitor", "Laptop", "Tablet", "Wifi", "Cloud",
  "Folder", "File", "FileText", "Music", "Camera", "Mic"
];

export function IconPicker({ value, onChange, className }: IconPickerProps) {
  const [open, setOpen] = useState(false);

  const IconComponent = value 
    ? (LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[value]
    : null;

  return (
    <div className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          "flex items-center justify-between w-full px-3 py-2 rounded-md",
          "bg-[#06080f] border border-white/10 text-gray-200",
          "hover:bg-white/5 transition-colors min-h-[40px]"
        )}
      >
        <span className="flex items-center gap-2">
          {IconComponent ? (
            <>
              <IconComponent className="w-4 h-4" />
              <span>{value}</span>
            </>
          ) : (
            <span className="text-gray-500">Select an icon...</span>
          )}
        </span>
        <ChevronDown className={cn("w-4 h-4 transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div className="absolute z-50 w-full mt-1 bg-[#06080f] border border-white/10 rounded-md shadow-xl">
          <div className="grid grid-cols-6 gap-1 p-2">
            {ESSENTIAL_ICONS.map((iconName) => {
              const IconMap = LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>;
              const Icon = IconMap[iconName];
              if (!Icon) return null;
              const isSelected = value === iconName;
              return (
                <button
                  key={iconName}
                  type="button"
                  onClick={() => {
                    onChange(iconName);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex flex-col items-center gap-1 p-2 rounded-md transition-colors",
                    isSelected 
                      ? "bg-cyan-500/20 border border-cyan-500/30" 
                      : "hover:bg-white/10"
                  )}
                  title={iconName}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-[10px] text-gray-400 truncate w-full text-center">{iconName}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {open && (
        <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
      )}
    </div>
  );
}