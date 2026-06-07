import Link from "next/link";
import { BookOpen, ExternalLink, Share2, Radio } from "lucide-react";
import { CATEGORIES } from "@/types";

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--color-border)",
        background: "var(--color-surface-2)",
        marginTop: "5rem",
        padding: "4rem 0 2rem",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "2.5rem",
            marginBottom: "3rem",
          }}
        >
          {/* Brand */}
          <div style={{ gridColumn: "span 1" }}>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "1rem" }}>
              <div
                style={{
                  width: 32, height: 32,
                  background: "linear-gradient(135deg, var(--color-accent), var(--color-purple))",
                  borderRadius: "8px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >
                <BookOpen size={16} color="white" />
              </div>
              <span
                className="font-display"
                style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--color-text-primary)" }}
              >
                Dev<span style={{ color: "var(--color-accent)" }}>Lore</span>
              </span>
            </Link>
            <p style={{ fontSize: "0.875rem", lineHeight: 1.7, maxWidth: "220px" }}>
              Making technical concepts impossible to forget — through stories, humor, and unforgettable characters.
            </p>
            <div style={{ display: "flex", gap: "8px", marginTop: "1.25rem" }}>
              <a href="https://twitter.com/devlore_io" target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{ padding: "8px" }} aria-label="Twitter">
                <Share2 size={16} />
              </a>
              <a href="https://github.com/devlore-io" target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{ padding: "8px" }} aria-label="GitHub">
                <ExternalLink size={16} />
              </a>
              <a href="/rss.xml" className="btn btn-ghost" style={{ padding: "8px" }} aria-label="RSS Feed">
                <Radio size={16} />
              </a>
            </div>
          </div>

          {/* Topics */}
          <div>
            <h4 style={{ fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "1rem", color: "var(--color-text-muted)" }}>
              Topics
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "8px" }}>
              {CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/topics/${cat.slug}`}
                    style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)", display: "flex", alignItems: "center", gap: "6px" }}
                  >
                    <span>{cat.emoji}</span> {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform */}
          <div>
            <h4 style={{ fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "1rem", color: "var(--color-text-muted)" }}>
              Platform
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "8px" }}>
              {[
                { label: "Characters", href: "/characters" },
                { label: "Search", href: "/search" },
                { label: "RSS Feed", href: "/rss.xml" },
                { label: "Sitemap", href: "/sitemap.xml" },
                { label: "Admin", href: "/admin/dashboard" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter teaser */}
          <div>
            <h4 style={{ fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "1rem", color: "var(--color-text-muted)" }}>
              Newsletter
            </h4>
            <p style={{ fontSize: "0.875rem", marginBottom: "1rem" }}>
              Get the best stories delivered to your inbox. No spam, only lore.
            </p>
            <div style={{ display: "flex", gap: "8px" }}>
              <input
                type="email"
                placeholder="you@example.com"
                style={{
                  flex: 1,
                  padding: "9px 12px",
                  borderRadius: "var(--radius-sm)",
                  border: "1px solid var(--color-border)",
                  background: "var(--color-surface)",
                  color: "var(--color-text-primary)",
                  fontSize: "0.875rem",
                  outline: "none",
                  minWidth: 0,
                }}
              />
              <button className="btn btn-primary" style={{ padding: "9px 14px", fontSize: "0.82rem" }}>
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid var(--color-border)",
            paddingTop: "1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <p style={{ fontSize: "0.8rem" }}>
            © {new Date().getFullYear()} DevLore. Built with stories, caffeine, and questionable commit messages.
          </p>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {["Privacy", "Terms", "Contact"].map((item) => (
              <Link key={item} href="#" style={{ fontSize: "0.8rem", color: "var(--color-text-muted)" }}>
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
