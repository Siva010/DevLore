import { ReactNode } from "react";
import Link from "next/link";
import { Settings, LogOut, Database } from "lucide-react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  // In a real application, you would check auth here:
  // const session = await auth();
  // if (!session) redirect("/login");

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--color-paper)" }}>
      {/* Sidebar Navigation */}
      <aside
        style={{
          width: "240px",
          background: "var(--color-surface)",
          borderRight: "1px solid var(--color-border)",
          display: "flex",
          flexDirection: "column",
          padding: "1.5rem",
        }}
      >
        <Link
          href="/admin/dashboard"
          style={{
            fontSize: "1.25rem",
            fontWeight: 800,
            color: "var(--color-text-primary)",
            textDecoration: "none",
            marginBottom: "2rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            fontFamily: "var(--font-display)",
          }}
        >
          ⚡ DevLore
        </Link>

        <nav style={{ display: "flex", flexDirection: "column", gap: "0.5rem", flex: 1 }}>
          <Link
            href="/admin/dashboard"
            style={{
              padding: "0.75rem 1rem",
              borderRadius: "var(--radius-md)",
              background: "var(--color-surface-2)",
              color: "var(--color-text-primary)",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: "0.875rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <Database size={16} /> Dashboard
          </Link>
          <Link
            href="/admin/articles/new"
            style={{
              padding: "0.75rem 1rem",
              borderRadius: "var(--radius-md)",
              color: "var(--color-text-secondary)",
              textDecoration: "none",
              fontWeight: 500,
              fontSize: "0.875rem",
            }}
          >
            New Article
          </Link>
        </nav>

        <div style={{ marginTop: "auto", borderTop: "1px solid var(--color-border)", paddingTop: "1.5rem" }}>
          <Link
            href="/"
            style={{
              color: "var(--color-text-muted)",
              textDecoration: "none",
              fontSize: "0.8rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "1rem",
            }}
          >
            <LogOut size={14} /> Exit Admin
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--color-text-secondary)" }}>
            <Settings size={14} />
            <span style={{ fontSize: "0.8rem" }}>Settings</span>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, minWidth: 0 }}>
        {children}
      </main>
    </div>
  );
}
