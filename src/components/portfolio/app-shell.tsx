"use client";

import { ReactNode, useEffect } from "react";
import { Header } from "@/components/portfolio/header";
import { Footer } from "@/components/portfolio/footer";
import { DottedSurface } from "@/components/ui/dotted-surface";
import { useContent } from "@/stores/content-store";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Persistent shell that lives across page navigations.
 * Contains the Three.js background, header, and footer —
 * none of these are destroyed/recreated when the route changes.
 *
 * Page content crossfades smoothly using framer-motion AnimatePresence.
 */
export function AppShell({ children }: { children: ReactNode }) {
  const fetchContent = useContent((s) => s.fetch);
  const pathname = usePathname();

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Single Three.js instance — persists across all routes */}
      <DottedSurface />

      {/* All content sits above the dotted surface */}
      <div className="relative z-10">
        <Header />
        <main className="flex-1 pt-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{
                type: "tween",
                duration: 0.2,
                ease: "easeInOut",
              }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <div className="relative z-10 mt-auto">
        <Footer />
      </div>
    </div>
  );
}
