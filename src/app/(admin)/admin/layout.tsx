/**
 * Admin layout — bypasses the main AppShell (Three.js bg, Header, Footer)
 * so the admin panel has its own clean, independent layout.
 */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
