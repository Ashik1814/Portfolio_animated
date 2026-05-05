"use client";

import { ReactNode, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Header } from "@/components/portfolio/header";
import { Footer } from "@/components/portfolio/footer";
import { MatrixBackground } from "@/components/portfolio/matrix-background";
import { CrtFlicker } from "@/components/portfolio/crt-flicker";
import { useContent } from "@/stores/content-store";
import { AnimatePresence, motion } from "framer-motion";

export function AppShell({ children }: { children: ReactNode }) {
  const fetchContent = useContent((s) => s.fetch);
  const pathname = usePathname();
  const [transitionKey, setTransitionKey] = useState(0);

  // Fetch content once for client-side pages that use the store
  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  // Trigger view update after CRT flicker completes (450ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setTransitionKey((k) => k + 1);
    }, 450);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Matrix Data Stream background — persists across all routes */}
      <MatrixBackground />

      {/* CRT Flicker Overlay – highest z-index, pointer-events none */}
      <CrtFlicker />

      {/* All content sits above the matrix background */}
      <div className="relative z-10">
        <Header />
        <main className="flex-1 pt-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${pathname}-${transitionKey}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{
                opacity: { duration: 0.25, ease: "easeOut" },
                y: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
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

