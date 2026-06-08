import Link from "next/link";
import { FileText, TrendingUp, Clock, Star, Plus, Edit3, Users } from "lucide-react";
import { ARTICLES, CHARACTERS } from "@/lib/data";

export default function AdminDashboard() {
  const published = ARTICLES.filter((a) => a.status === "published");
  const drafts = ARTICLES.filter((a) => a.status === "draft");
  const featured = ARTICLES.filter((a) => a.featured);

  const stats = [
    { label: "Total Articles", value: ARTICLES.length, icon: FileText, color: "var(--color-teal)" },
    { label: "Published", value: published.length, icon: TrendingUp, color: "var(--color-green)" },
    { label: "Drafts", value: drafts.length, icon: Clock, color: "var(--color-gold)" },
    { label: "Featured", value: featured.length, icon: Star, color: "var(--color-purple)" },
    { label: "Characters", value: CHARACTERS.length, icon: Users, color: "var(--color-accent)" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-paper)" }}>
      {/* Admin header */}
      <div style={{ borderBottom: "1px solid var(--color-border)", background: "var(--color-surface)", padding: "1.25rem 0" }}>
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <h1 className="font-display" style={{ fontSize: "1.35rem", fontWeight: 800 }}>
              ⚡ DevLore CMS
            </h1>
            <p style={{ fontSize: "0.8rem", color: "var(--color-text-muted)" }}>Admin Dashboard</p>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <Link href="/" className="btn btn-secondary" style={{ fontSize: "0.82rem" }}>
              View Site
            </Link>
            <Link href="/admin/articles/new" className="btn btn-primary" style={{ fontSize: "0.82rem" }}>
              <Plus size={15} /> New Article
            </Link>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: "2rem 1.5rem" }}>
        {/* Stats Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "1rem", marginBottom: "2.5rem" }}>
          {stats.map((stat) => (
            <div
              key={stat.label}
              style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-md)",
                padding: "1.25rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <stat.icon size={18} style={{ color: stat.color }} />
                <span style={{ fontSize: "1.75rem", fontFamily: "var(--font-display)", fontWeight: 900, color: "var(--color-text-primary)" }}>
                  {stat.value}
                </span>
              </div>
              <span style={{ fontSize: "0.78rem", color: "var(--color-text-muted)", fontWeight: 500 }}>{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Recent Articles */}
        <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-lg)", overflow: "hidden" }}>
          <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid var(--color-border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h2 className="font-display" style={{ fontSize: "1rem", fontWeight: 700 }}>Recent Articles</h2>
            <Link href="/admin/articles/new" className="btn btn-primary" style={{ fontSize: "0.78rem", padding: "6px 14px" }}>
              <Plus size={13} /> New
            </Link>
          </div>
          <div>
            {ARTICLES.slice(0, 8).map((article, idx) => (
              <div
                key={article.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr auto auto",
                  gap: "1rem",
                  alignItems: "center",
                  padding: "1rem 1.5rem",
                  borderBottom: idx < ARTICLES.length - 1 ? "1px solid var(--color-border)" : "none",
                }}
              >
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: "0.875rem", color: "var(--color-text-primary)", marginBottom: "2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {article.title}
                  </div>
                  <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                    <span style={{ fontSize: "0.7rem", color: "var(--color-text-muted)" }}>{article.category}</span>
                    <span style={{ fontSize: "0.7rem", color: "var(--color-text-muted)", display: "flex", alignItems: "center", gap: "2px" }}>
                      <Clock size={9} /> {article.readingTime}m
                    </span>
                  </div>
                </div>
                <span
                  className="badge"
                  style={{
                    background: article.status === "published"
                      ? "color-mix(in srgb, var(--color-green) 12%, transparent)"
                      : "color-mix(in srgb, var(--color-gold) 12%, transparent)",
                    color: article.status === "published" ? "var(--color-green)" : "var(--color-gold)",
                    borderColor: article.status === "published"
                      ? "color-mix(in srgb, var(--color-green) 25%, transparent)"
                      : "color-mix(in srgb, var(--color-gold) 25%, transparent)",
                    fontSize: "0.65rem",
                    whiteSpace: "nowrap",
                  }}
                >
                  {article.status}
                </span>
                <Link
                  href={`/admin/articles/${article.id}/edit`}
                  className="btn btn-ghost"
                  style={{ padding: "6px 10px", fontSize: "0.75rem", gap: "4px" }}
                >
                  <Edit3 size={13} /> Edit
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
