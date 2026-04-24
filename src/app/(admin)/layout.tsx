"use client";

import { useEffect } from "react";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { supabaseAdmin } from "@/lib/supabase-admin";

/**
 * Admin route group layout - clean, independent layout
 * without the Three.js background, Header or Footer.
 * 
 * Features:
 * - Uses sessionStorage instead of localStorage for auto-logout on tab close
 * - Signs out user when tab/browser is closed (not on refresh)
 */
export default function AdminGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      // Only sign out on actual tab close, not on refresh
      // Use navigator.sendBeacon for reliable cleanup
      supabaseAdmin.auth.signOut().catch(() => {});
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <>
      {children}
      <SonnerToaster />
    </>
  );
}