"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Clock, X, ArrowRight } from "lucide-react";
import { ARTICLES, CHARACTERS } from "@/lib/data";
import { CATEGORIES } from "@/types";

const POPULAR_TAGS = ["ACID", "TLS", "Load Balancing", "Caching", "Transformers", "REST API", "Docker", "Git", "SQL"];

const CATEGORY_COLORS: Record<string, string> = {
  "AI & LLMs":            "cat-ai",
  "Backend Engineering":  "cat-backend",
  "Databases":            "cat-databases",
  "System Design":        "cat-system-design",
  "Networking":           "cat-networking",
  "Developer Humor":      "cat-humor",
};

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
      (c) => c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q)
    );

    return { articles, characters, categories };
  }, [query]);

  const hasResults = results.articles.length > 0 || results.characters.length > 0 || results.categories.length > 0;
  const showEmpty = query.length > 1 && !hasResults;
  const totalResults = results.articles.length + results.characters.length + results.categories.length;

  return (
    <div style={{ minHeight: "85vh", padding: "4rem 0 7rem" }}>
      <div className="container" style={{ maxWidth: "760px" }}>

        {/* Header */}
        <div className="animate-fade-up" style={{ marginBottom: "2.5rem" }}>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              color: "var(--color-text-1)",
              marginBottom: "0.5rem",
            }}
          >
            Search DevLore
          </h1>
          <p style={{ fontSize: "0.875rem", color: "var(--color-text-3)" }}>
            Search across articles, characters, and topics.
          </p>
        </div>

        {/* Search input */}
        <div
          className="animate-fade-up stagger-1"
          style={{ position: "relative", marginBottom: "2rem" }}
        >
          <Search
            size={17}
            style={{
              position: "absolute",
              left: "1rem",
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--color-text-3)",
              pointerEvents: "none",
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
              padding: "0.9rem 2.75rem 0.9rem 2.75rem",
              borderRadius: "var(--radius-lg)",
              border: "1px solid var(--color-border-2)",
              background: "var(--color-surface)",
              color: "var(--color-text-1)",
              fontSize: "1rem",
              fontFamily: "var(--font-body)",
              outline: "none",
              transition: "border-color var(--transition-fast), box-shadow var(--transition-fast)",
              boxShadow: "var(--shadow-sm)",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "var(--color-accent)";
              e.target.style.boxShadow = "0 0 0 3px var(--color-accent-subtle)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "var(--color-border-2)";
              e.target.style.boxShadow = "var(--shadow-sm)";
            }}
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              style={{
                position: "absolute",
                right: "0.75rem",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "var(--color-text-3)",
                display: "flex",
                alignItems: "center",
                padding: "4px",
                borderRadius: "var(--radius-xs)",
                transition: "color var(--transition-fast)",
              }}
            >
              <X size={15} />
            </button>
          )}
        </div>

        {/* Result count */}
        {query && hasResults && (
          <p style={{ fontSize: "0.78rem", color: "var(--color-text-3)", marginBottom: "1.75rem" }}>
            {totalResults} result{totalResults !== 1 ? "s" : ""} for &ldquo;{query}&rdquo;
          </p>
        )}

        {/* Popular tags — default state */}
        {!query && (
          <div className="animate-fade-up stagger-2">
            <div
              style={{
                fontSize: "0.65rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "var(--color-text-3)",
                marginBottom: "0.75rem",
              }}
            >
              Popular Searches
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {POPULAR_TAGS.map((t) => (
                <button
                  key={t}
                  onClick={() => setQuery(t)}
                  className="tag-btn"
                  style={{
                    cursor: "pointer",
                    fontSize: "0.78rem",
                    padding: "5px 12px",
                    border: "1px solid var(--color-border)",
                    background: "var(--color-surface)",
                    transition: "all var(--transition-fast)",
                    fontFamily: "var(--font-body)",
                    borderRadius: "var(--radius-pill)",
                    color: "var(--color-text-2)",
                    fontWeight: 500,
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {showEmpty && (
          <div style={{ textAlign: "center", padding: "4rem 0", color: "var(--color-text-3)" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🤔</div>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.1rem",
                color: "var(--color-text-1)",
                marginBottom: "0.5rem",
                letterSpacing: "-0.02em",
              }}
            >
              No results for &ldquo;{query}&rdquo;
            </h3>
            <p style={{ fontSize: "0.82rem" }}>
              Try a different keyword — or maybe that story is still being written.
            </p>
          </div>
        )}

        {/* Results */}
        {hasResults && (
          <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>

            {/* Articles */}
            {results.articles.length > 0 && (
              <section>
                <div
                  style={{
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "var(--color-text-3)",
                    marginBottom: "0.75rem",
                  }}
                >
                  Articles ({results.articles.length})
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
                  {results.articles.map((article) => {
                    const catColorClass = CATEGORY_COLORS[article.category] ?? "badge-default";
                    return (
                      <Link
                        key={article.slug}
                        href={`/articles/${article.slug}`}
                        style={{ textDecoration: "none" }}
                      >
                        <div
                          className="search-result"
                          style={{
                            display: "flex",
                            gap: "1rem",
                            padding: "0.9rem",
                            borderRadius: "var(--radius-md)",
                            transition: "background var(--transition-fast)",
                            cursor: "pointer",
                            alignItems: "flex-start",
                          }}
                        >
                          <div
                            style={{
                              position: "relative",
                              width: 72,
                              height: 54,
                              borderRadius: "var(--radius-sm)",
                              overflow: "hidden",
                              flexShrink: 0,
                              border: "1px solid var(--color-border)",
                              background: "var(--color-surface-2)",
                            }}
                          >
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ display: "flex", gap: "6px", alignItems: "center", marginBottom: "4px" }}>
                              <span className={`badge ${catColorClass}`} style={{ fontSize: "0.6rem" }}>
                                {CATEGORIES.find((c) => c.name === article.category)?.emoji} {article.category}
                              </span>
                              <span
                                style={{
                                  fontSize: "0.65rem",
                                  color: "var(--color-text-3)",
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "2px",
                                }}
                              >
                                <Clock size={10} /> {article.readingTime}m
                              </span>
                            </div>
                            <h3
                              style={{
                                fontFamily: "var(--font-display)",
                                fontSize: "0.9rem",
                                fontWeight: 700,
                                color: "var(--color-text-1)",
                                lineHeight: 1.3,
                                letterSpacing: "-0.01em",
                                marginBottom: "3px",
                              }}
                            >
                              {article.title}
                            </h3>
                            <p
                              style={{
                                fontSize: "0.75rem",
                                color: "var(--color-text-3)",
                                lineHeight: 1.4,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {article.hook}
                            </p>
                          </div>
                          <ArrowRight size={13} style={{ color: "var(--color-text-3)", flexShrink: 0, marginTop: "4px" }} />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Characters */}
            {results.characters.length > 0 && (
              <section>
                <div
                  style={{
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "var(--color-text-3)",
                    marginBottom: "0.75rem",
                  }}
                >
                  Characters ({results.characters.length})
                </div>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {results.characters.map((char) => (
                    <Link key={char.slug} href={`/characters/${char.slug}`} style={{ textDecoration: "none" }}>
                      <div
                        className="search-result"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          padding: "10px 14px",
                          borderRadius: "var(--radius-md)",
                          border: "1px solid var(--color-border)",
                          background: "var(--color-surface)",
                          borderLeft: `2px solid ${char.color}`,
                          transition: "all var(--transition-fast)",
                          cursor: "pointer",
                        }}
                      >
                        <span style={{ fontSize: "1.25rem" }}>{char.emoji}</span>
                        <div>
                          <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--color-text-1)" }}>
                            {char.name}
                          </div>
                          <div style={{ fontSize: "0.68rem", color: "var(--color-text-3)" }}>{char.role}</div>
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
                <div
                  style={{
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "var(--color-text-3)",
                    marginBottom: "0.75rem",
                  }}
                >
                  Topics ({results.categories.length})
                </div>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {results.categories.map((cat) => (
                    <Link key={cat.slug} href={`/topics/${cat.slug}`} style={{ textDecoration: "none" }}>
                      <div
                        className="search-result"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          padding: "10px 14px",
                          borderRadius: "var(--radius-md)",
                          border: "1px solid var(--color-border)",
                          background: "var(--color-surface)",
                          transition: "all var(--transition-fast)",
                          cursor: "pointer",
                        }}
                      >
                        <span style={{ fontSize: "1.25rem" }}>{cat.emoji}</span>
                        <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--color-text-1)" }}>
                          {cat.name}
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
          background: var(--color-surface-2) !important;
        }
        .tag-btn:hover {
          background: var(--color-surface-2) !important;
          border-color: var(--color-border-2) !important;
          color: var(--color-text-1) !important;
        }
      `}</style>
    </div>
  );
}
