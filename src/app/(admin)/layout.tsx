"use client";

import { useEffect } from "react";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";

export default function AdminGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const handleBeforeUnload = () => {
      fetch("/api/admin/auth?action=signout", { method: "POST", keepalive: true }).catch(() => {});
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