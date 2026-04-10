import { Toaster as SonnerToaster } from "@/components/ui/sonner";

/**
 * Admin route group layout — clean, independent layout
 * without the Three.js background, Header, or Footer.
 */
export default function AdminGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <SonnerToaster />
    </>
  );
}
