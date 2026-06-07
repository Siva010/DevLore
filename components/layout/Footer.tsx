import Link from "next/link";
import { Share2, Globe, Radio } from "lucide-react";
import { CATEGORIES } from "@/types";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        borderTop: "1px solid var(--color-border)",
        background: "var(--color-surface)",
        paddingTop: "4rem",
        paddingBottom: "2rem",
        marginTop: "6rem",
      }}
    >
      <div className="container">
        {/* Main grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "3rem",
            marginBottom: "3rem",
          }}
          className="footer-grid"
        >
          {/* Brand */}
          <div style={{ gridColumn: "span 1" }} className="footer-brand">
            <Link
              href="/"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginBottom: "1rem" }}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "var(--radius-sm)",
                  background: "var(--color-text-1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "0.62rem",
                    fontWeight: 800,
                    color: "var(--color-bg)",
                    letterSpacing: "-0.03em",
                  }}
                >
                  DL
                </span>
              </div>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1rem",
                  fontWeight: 700,
                  letterSpacing: "-0.03em",
                  color: "var(--color-text-1)",
                }}
              >
                DevLore
              </span>
            </Link>
            <p
              style={{
                fontSize: "0.82rem",
                lineHeight: 1.75,
                color: "var(--color-text-2)",
                maxWidth: "200px",
                marginBottom: "1.25rem",
              }}
            >
              Technical concepts made impossible to forget — through stories, characters, and a healthy dose of absurdity.
            </p>
            <div style={{ display: "flex", gap: "4px" }}>
              <a
                href="https://twitter.com/devlore_io"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
                style={{ padding: "7px", borderRadius: "var(--radius-sm)" }}
                aria-label="Twitter"
              >
                <Share2 size={15} />
              </a>
              <a
                href="https://github.com/Siva010/DevLore"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
                style={{ padding: "7px", borderRadius: "var(--radius-sm)" }}
                aria-label="GitHub"
              >
                <Globe size={15} />
              </a>
              <a
                href="/rss.xml"
                className="btn btn-ghost"
                style={{ padding: "7px", borderRadius: "var(--radius-sm)" }}
                aria-label="RSS Feed"
              >
                <Radio size={15} />
              </a>
            </div>
          </div>

          {/* Topics */}
          <div>
            <h4
              style={{
                fontSize: "0.68rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "var(--color-text-3)",
                marginBottom: "1rem",
                fontFamily: "var(--font-body)",
              }}
            >
              Topics
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/topics/${cat.slug}`}
                    style={{
                      fontSize: "0.82rem",
                      color: "var(--color-text-2)",
                      transition: "color var(--transition-fast)",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                    className="footer-link"
                  >
                    <span style={{ fontSize: "0.9rem" }}>{cat.emoji}</span>
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform */}
          <div>
            <h4
              style={{
                fontSize: "0.68rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "var(--color-text-3)",
                marginBottom: "1rem",
                fontFamily: "var(--font-body)",
              }}
            >
              Platform
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {[
                { label: "Characters", href: "/characters" },
                { label: "Search", href: "/search" },
                { label: "RSS Feed", href: "/rss.xml" },
                { label: "Admin", href: "/admin/dashboard" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    style={{ fontSize: "0.82rem", color: "var(--color-text-2)", transition: "color var(--transition-fast)" }}
                    className="footer-link"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4
              style={{
                fontSize: "0.68rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "var(--color-text-3)",
                marginBottom: "1rem",
                fontFamily: "var(--font-body)",
              }}
            >
              Newsletter
            </h4>
            <p style={{ fontSize: "0.82rem", lineHeight: 1.7, color: "var(--color-text-2)", marginBottom: "0.75rem" }}>
              The best stories, once a week.
            </p>
            <div style={{ display: "flex", gap: "6px" }}>
              <input
                type="email"
                placeholder="you@example.com"
                style={{
                  flex: 1,
                  padding: "8px 10px",
                  borderRadius: "var(--radius-sm)",
                  border: "1px solid var(--color-border)",
                  background: "var(--color-bg-2)",
                  color: "var(--color-text-1)",
                  fontSize: "0.8rem",
                  outline: "none",
                  minWidth: 0,
                  fontFamily: "var(--font-body)",
                }}
              />
              <button
                className="btn btn-primary"
                style={{ padding: "8px 12px", fontSize: "0.78rem" }}
              >
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
            gap: "0.75rem",
          }}
        >
          <p style={{ fontSize: "0.75rem", color: "var(--color-text-3)" }}>
            © {year} DevLore. Built with Next.js, Prisma, and questionable commit messages.
          </p>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {["Privacy", "Terms", "Contact"].map((item) => (
              <Link
                key={item}
                href="#"
                style={{ fontSize: "0.75rem", color: "var(--color-text-3)", transition: "color var(--transition-fast)" }}
                className="footer-link"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .footer-link:hover { color: var(--color-text-1) !important; }
        @media (min-width: 900px) {
          .footer-grid { grid-template-columns: 2fr 1fr 1fr 2fr !important; }
        }
      `}</style>
    </footer>
  );
}
