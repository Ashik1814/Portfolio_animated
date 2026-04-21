"use client";

import { cn } from "@/lib/utils";

interface LoadingPlaceholderProps {
  variant?: "default" | "hero" | "cards" | "list" | "compact";
  className?: string;
}

function HeroSkeleton({ className }: { className?: string }) {
  return (
    <section className={cn("min-h-screen flex items-center pt-16", className)}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="animate-pulse space-y-4 max-w-lg">
          <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-10 w-64 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-6 w-48 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
      </div>
    </section>
  );
}

function DefaultSkeleton({ className }: { className?: string }) {
  return (
    <section className={cn("py-20 section-padding", className)}>
      <div className="max-w-7xl mx-auto">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-32 mx-auto bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
      </div>
    </section>
  );
}

function CardsSkeleton({ className }: { className?: string }) {
  return (
    <section className={cn("py-20 section-padding", className)}>
      <div className="max-w-7xl mx-auto">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-48 mx-auto bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-48 bg-gray-200 dark:bg-gray-700 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ListSkeleton({ className }: { className?: string }) {
  return (
    <section className={cn("py-20 section-padding", className)}>
      <div className="max-w-7xl mx-auto">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-40 mx-auto bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="grid gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-gray-200 dark:bg-gray-700 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CompactSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("animate-pulse", className)}>
      <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded-lg" />
    </div>
  );
}

export function LoadingPlaceholder({ variant = "default", className }: LoadingPlaceholderProps) {
  switch (variant) {
    case "hero":
      return <HeroSkeleton className={className} />;
    case "cards":
      return <CardsSkeleton className={className} />;
    case "list":
      return <ListSkeleton className={className} />;
    case "compact":
      return <CompactSkeleton className={className} />;
    default:
      return <DefaultSkeleton className={className} />;
  }
}