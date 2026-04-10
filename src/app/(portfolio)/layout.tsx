import { AppShell } from "@/components/portfolio/app-shell";

/**
 * Portfolio route group layout — wraps all portfolio pages
 * with the Three.js background, Header, and Footer.
 */
export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppShell>{children}</AppShell>;
}
