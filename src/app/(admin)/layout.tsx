"use client";

import { useEffect, useRef } from "react";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { supabaseAdmin } from "@/lib/supabase-admin";

export default function AdminGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isClient = useRef(false);

  useEffect(() => {
    isClient.current = true;
    const handleBeforeUnload = () => {
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