"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Clock, X } from "lucide-react";
import { ARTICLES, CHARACTERS } from "@/lib/data";
import { CATEGORIES } from "@/types";
import { formatDistanceToNow } from "date-fns";

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return { articles: [], characters: [], categories: [] };

    const articles = ARTICLES.filter(
      (a) =>
        a.status === "published" &&
        (a.title.toLowerCase().includes(q) ||
          a.subtitle.toLowerCase().includes(q) ||
          a.hook.toLowerCase().includes(q) ||
          a.tags.some((t) => t.toLowerCase().includes(q)) ||
          a.category.toLowerCase().includes(q))
    );

    const characters = CHARACTERS.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.role.toLowerCase().includes(q) ||
        c.bio.toLowerCase().includes(q) ||
        c.personality.toLowerCase().includes(q)
    );

    const categories = CATEGORIES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q)
    );

    return { articles, characters, categories };
  }, [query]);

  const hasResults = results.articles.length > 0 || results.characters.length > 0 || results.categories.length > 0;
  const showEmpty = query.length > 1 && !hasResults;

  return (
    <div style={{ minHeight: "80vh", padding: "4rem 0" }}>
      <div className="container" style={{ maxWidth: "800px" }}>
        {/* Search Input */}
        <div style={{ marginBottom: "3rem" }}>
          <h1 className="font-display" style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "0.5rem" }}>
            🔍 Search DevLore
          </h1>
          <p style={{ color: "var(--color-text-secondary)", marginBottom: "1.5rem" }}>
            Search across articles, characters, and topics.
          </p>
          <div style={{ position: "relative" }}>
            <Search
              size={18}
              style={{
                position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)",
                color: "var(--color-text-muted)",
              }}
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles, characters, topics…"
              autoFocus
              style={{
                width: "100%",
                padding: "1rem 1rem 1rem 3rem",
                borderRadius: "var(--radius-md)",
                border: "2px solid var(--color-border)",
                background: "var(--color-surface)",
                color: "var(--color-text-primary)",
                fontSize: "1rem",
                outline: "none",
                transition: "border-color var(--transition-fast)",
              }}
              onFocus={(e) => (e.target.style.borderColor = "var(--color-teal)")}
              onBlur={(e) => (e.target.style.borderColor = "var(--color-border)")}
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                style={{
                  position: "absolute", right: "1rem", top: "50%", transform: "translateY(-50%)",
                  background: "none", border: "none", cursor: "pointer", color: "var(--color-text-muted)",
                  display: "flex", alignItems: "center",
                }}
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Default state */}
        {!query && (
          <div>
            <h2 className="font-display" style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1rem", color: "var(--color-text-muted)" }}>
              Popular Topics
            </h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {["ACID", "TLS", "Load Balancing", "Caching", "Transformers", "REST API", "Docker", "Kubernetes", "Git", "SQL"].map((t) => (
                <button
                  key={t}
                  onClick={() => setQuery(t)}
                  className="badge badge-muted"
                  style={{ cursor: "pointer", fontSize: "0.8rem", padding: "6px 14px" }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {showEmpty && (
          <div style={{ textAlign: "center", padding: "3rem 0", color: "var(--color-text-muted)" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🤔</div>
            <h3 className="font-display" style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>No results for &ldquo;{query}&rdquo;</h3>
            <p style={{ fontSize: "0.875rem" }}>Try a different keyword — or maybe that article is still being written.</p>
          </div>
        )}

        {/* Results */}
        {hasResults && (
          <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
            {/* Articles */}
            {results.articles.length > 0 && (
              <section>
                <h2 className="font-display" style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "1rem", color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  📖 Articles ({results.articles.length})
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {results.articles.map((article) => (
                    <Link key={article.slug} href={`/articles/${article.slug}`} style={{ textDecoration: "none" }}>
                      <div
                        style={{
                          display: "flex", gap: "1rem", padding: "1rem",
                          borderRadius: "var(--radius-md)",
                          border: "1px solid var(--color-border)",
                          background: "var(--color-surface)",
                          transition: "all var(--transition-fast)",
                          cursor: "pointer",
                        }}
                        className="search-result"
                      >
                        <div style={{ position: "relative", width: 80, height: 60, borderRadius: "var(--radius-sm)", overflow: "hidden", flexShrink: 0 }}>
                          <Image src={article.coverImage} alt={article.title} fill style={{ objectFit: "cover" }} sizes="80px" />
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: "flex", gap: "6px", alignItems: "center", marginBottom: "4px" }}>
                            <span style={{ fontSize: "0.68rem", color: "var(--color-accent)", fontWeight: 600 }}>
                              {CATEGORIES.find(c => c.name === article.category)?.emoji} {article.category}
                            </span>
                            <span style={{ fontSize: "0.68rem", color: "var(--color-text-muted)", display: "flex", alignItems: "center", gap: "2px" }}>
                              <Clock size={10} /> {article.readingTime}m
                            </span>
                          </div>
                          <h3 className="font-display" style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--color-text-primary)", lineHeight: 1.3, marginBottom: "4px" }}>
                            {article.title}
                          </h3>
                          <p style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)", lineHeight: 1.4, margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {article.hook}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Characters */}
            {results.characters.length > 0 && (
              <section>
                <h2 className="font-display" style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "1rem", color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  🎭 Characters ({results.characters.length})
                </h2>
                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                  {results.characters.map((char) => (
                    <Link key={char.slug} href={`/characters/${char.slug}`} style={{ textDecoration: "none" }}>
                      <div
                        style={{
                          display: "flex", alignItems: "center", gap: "12px",
                          padding: "10px 16px",
                          borderRadius: "var(--radius-md)",
                          border: "1px solid var(--color-border)",
                          background: "var(--color-surface)",
                          transition: "all var(--transition-fast)",
                          cursor: "pointer",
                        }}
                        className="search-result"
                      >
                        <span style={{ fontSize: "1.5rem" }}>{char.emoji}</span>
                        <div>
                          <div style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--color-text-primary)" }}>{char.name}</div>
                          <div style={{ fontSize: "0.72rem", color: "var(--color-text-muted)" }}>{char.role}</div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Topics */}
            {results.categories.length > 0 && (
              <section>
                <h2 className="font-display" style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "1rem", color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  📚 Topics ({results.categories.length})
                </h2>
                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                  {results.categories.map((cat) => (
                    <Link key={cat.slug} href={`/topics/${cat.slug}`} style={{ textDecoration: "none" }}>
                      <div
                        style={{
                          display: "flex", alignItems: "center", gap: "10px",
                          padding: "10px 16px",
                          borderRadius: "var(--radius-md)",
                          border: "1px solid var(--color-border)",
                          background: "var(--color-surface)",
                          transition: "all var(--transition-fast)",
                          cursor: "pointer",
                        }}
                        className="search-result"
                      >
                        <span style={{ fontSize: "1.5rem" }}>{cat.emoji}</span>
                        <div>
                          <div style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--color-text-primary)" }}>{cat.name}</div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>

      <style>{`
        .search-result:hover {
          border-color: var(--color-border-dark);
          box-shadow: var(--shadow-card);
          transform: translateX(3px);
        }
      `}</style>
    </div>
  );
}
