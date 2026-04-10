"use client";

import { ReactNode } from "react";

/**
 * Thin wrapper for sub-pages.
 * The persistent shell (DottedSurface, Header, Footer) lives in AppShell at layout level,
 * so this just renders children directly.
 */
export function PageShell({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
