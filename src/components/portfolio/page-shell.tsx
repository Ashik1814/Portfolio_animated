"use client";

import { ReactNode } from "react";
import { Header } from "@/components/portfolio/header";
import { Footer } from "@/components/portfolio/footer";
import { DottedSurface } from "@/components/ui/dotted-surface";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col relative">
      <DottedSurface />
      <div className="relative z-10">
        <Header />
        <main className="flex-1 pt-16">{children}</main>
      </div>
      <div className="relative z-10 mt-auto">
        <Footer />
      </div>
    </div>
  );
}
