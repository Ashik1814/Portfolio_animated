"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import type { ContentData } from "@/components/admin/types";
import { AdminSidebar } from "@/components/admin/sidebar";
import { SiteConfigEditor } from "@/components/admin/site-config-editor";
import { EntityEditor } from "@/components/admin/entity-editor";
import { DashboardView } from "@/components/admin/dashboard";
import { ChangePassword } from "@/components/admin/change-password";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Lock, Eye, EyeOff, Loader2 } from "lucide-react";

/* ─── Login Screen ─── */
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Invalid password");
        return;
      }
      toast.success("Welcome to the Admin Panel!");
      onLogin();
    } catch {
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#06080f] p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <Card className="w-full max-w-md bg-[#0d1525]/80 border-white/10 backdrop-blur-xl relative z-10">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center mx-auto mb-4 border border-cyan-500/20">
              <Lock className="w-8 h-8 text-cyan-400" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Admin Access</h1>
            <p className="text-sm text-gray-400">Enter your password to manage the site</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="bg-[#06080f] border-white/10 text-gray-200 focus:border-cyan-500/50 focus:ring-cyan-500/20 pr-10 h-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3 text-sm text-red-400">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading || !password}
              className="w-full h-11 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-400 hover:from-cyan-500/30 hover:to-purple-500/30 border border-cyan-500/30 font-medium"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Lock className="w-4 h-4 mr-2" />
              )}
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <p className="text-xs text-gray-500 text-center mt-6">
            Default password: <code className="text-cyan-400/70 bg-cyan-500/10 px-1.5 py-0.5 rounded">admin123</code>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

/* ─── Loading Screen ─── */
function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#06080f]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
        <p className="text-cyan-400 text-sm">Loading admin panel...</p>
      </div>
    </div>
  );
}

/* ─── Section Renderer ─── */
function renderSection(
  activeSection: string,
  data: ContentData,
  crudOperation: (method: "POST" | "PUT" | "DELETE", entity: string, body: Record<string, unknown>) => Promise<boolean>
) {
  if (activeSection === "dashboard") {
    return <DashboardView data={data} />;
  }

  if (activeSection === "site-config" || activeSection === "seo-settings") {
    return (
      <SiteConfigEditor
        config={data.siteConfig}
        onSave={(body) => crudOperation("PUT", "site-config", body)}
        defaultCollapsed={activeSection === "seo-settings" ? "seo" : undefined}
      />
    );
  }

  if (activeSection === "change-password") {
    return <ChangePassword />;
  }

  // All entity-based sections
  return (
    <EntityEditor
      entityKey={activeSection}
      data={data}
      onCrud={crudOperation}
    />
  );
}

/* ─── Main Admin Page ─── */
export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [data, setData] = useState<ContentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Check auth on load
  useEffect(() => {
    fetch("/api/admin/auth")
      .then((res) => res.json())
      .then((json) => {
        setAuthenticated(json.authenticated);
        setCheckingAuth(false);
      })
      .catch(() => {
        setCheckingAuth(false);
      });
  }, []);

  // Fetch content data
  const fetchData = useCallback(async () => {
    try {
      const res = await fetch("/api/content");
      if (!res.ok) throw new Error("Failed to fetch");
      const json = await res.json();
      setData(json);
    } catch {
      toast.error("Failed to load content data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authenticated) fetchData();
  }, [authenticated, fetchData]);

  // CRUD operation
  const crudOperation = useCallback(
    async (
      method: "POST" | "PUT" | "DELETE",
      entity: string,
      body: Record<string, unknown>
    ) => {
      try {
        const url =
          method === "DELETE"
            ? `/api/admin/${entity}?id=${body.id}`
            : `/api/admin/${entity}`;
        const res = await fetch(url, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || "Operation failed");
        }
        await fetchData();
        toast.success(
          `${method === "POST" ? "Created" : method === "PUT" ? "Updated" : "Deleted"} successfully`
        );
        return true;
      } catch (err) {
        toast.error(
          err instanceof Error ? err.message : "Operation failed"
        );
        return false;
      }
    },
    [fetchData]
  );

  if (checkingAuth) {
    return <LoadingScreen />;
  }

  if (!authenticated) {
    return (
      <LoginScreen
        onLogin={() => {
          setAuthenticated(true);
          setLoading(true);
        }}
      />
    );
  }

  if (loading || !data) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen flex bg-[#06080f]">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <AdminSidebar
        activeSection={activeSection}
        onSelectSection={(id) => {
          setActiveSection(id);
          setSidebarOpen(false);
        }}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        onLogout={async () => {
          await fetch("/api/admin/auth", { method: "DELETE" });
          setAuthenticated(false);
          toast.success("Logged out successfully");
        }}
      />

      {/* Main content */}
      <div className="flex-1 lg:ml-64">
        {/* Top bar for mobile */}
        <div className="sticky top-0 z-30 bg-[#0a0f1e]/90 backdrop-blur-md border-b border-white/5 px-4 py-3 flex items-center gap-3 lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <h1 className="text-sm font-medium text-gray-300">Admin Panel</h1>
        </div>

        <div className="p-4 md:p-6 lg:p-8 max-w-6xl mx-auto">
          {renderSection(activeSection, data, crudOperation)}
        </div>
      </div>
    </div>
  );
}
