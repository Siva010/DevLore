import { notFound } from "next/navigation";
import Link from "next/link";
import { Clock, ArrowRight, ArrowLeft } from "lucide-react";
import { type Metadata } from "next";
import { getArticlesByCategory } from "@/lib/data";
import { CATEGORIES, type Category } from "@/types";
import { buildCategoryMetadata } from "@/lib/seo";
import { formatDistanceToNow } from "date-fns";

const CATEGORY_COLORS: Record<string, string> = {
  "AI & LLMs":            "cat-ai",
  "Backend Engineering":  "cat-backend",
  "Databases":            "cat-databases",
  "System Design":        "cat-system-design",
  "Networking":           "cat-networking",
  "Developer Humor":      "cat-humor",
};

type PageProps = { params: Promise<{ topic: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { topic } = await params;
  const cat = CATEGORIES.find((c) => c.slug === topic);
  if (!cat) return { title: "Not Found | DevLore" };
  return buildCategoryMetadata(cat.name, cat.description);
}

export async function generateStaticParams() {
  return CATEGORIES.map((c) => ({ topic: c.slug }));
}

export default async function TopicPage({ params }: PageProps) {
  const { topic } = await params;
  const cat = CATEGORIES.find((c) => c.slug === topic);
  if (!cat) notFound();

  const articles = getArticlesByCategory(cat.name as Category);
  const catColorClass = CATEGORY_COLORS[cat.name] ?? "badge-default";

  return (
    <div>
      {/* Topic Hero */}
      <section
        style={{
          padding: "5rem 0 4rem",
          background: "var(--color-bg)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <div className="container">
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "5px",
              fontSize: "0.78rem",
              color: "var(--color-text-3)",
              fontWeight: 500,
              marginBottom: "2rem",
              transition: "color var(--transition-fast)",
            }}
            className="back-link"
          >
            <ArrowLeft size={13} /> Home
          </Link>

          <div style={{ maxWidth: "640px" }}>
            <div style={{ fontSize: "3.5rem", marginBottom: "1rem", lineHeight: 1 }}>
              {cat.emoji}
            </div>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 5vw, 3rem)",
                fontWeight: 800,
                letterSpacing: "-0.04em",
                color: "var(--color-text-1)",
                marginBottom: "1rem",
                lineHeight: 1.08,
              }}
            >
              {cat.name}
            </h1>
            <p
              style={{
                fontSize: "1rem",
                lineHeight: 1.75,
                color: "var(--color-text-2)",
                maxWidth: "520px",
                marginBottom: "1.5rem",
              }}
            >
              {cat.description}
            </p>
            <span className={`badge ${catColorClass}`} style={{ fontSize: "0.72rem" }}>
              {articles.length} {articles.length === 1 ? "article" : "articles"}
            </span>
          </div>
        </div>
      </section>

      {/* Articles */}
      <section style={{ padding: "4rem 0 7rem" }}>
        <div className="container">
          {articles.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "5rem 2rem",
                color: "var(--color-text-3)",
                background: "var(--color-surface-2)",
                borderRadius: "var(--radius-xl)",
                border: "1px solid var(--color-border)",
              }}
            >
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>{cat.emoji}</div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.25rem",
                  color: "var(--color-text-1)",
                  marginBottom: "0.5rem",
                  letterSpacing: "-0.02em",
                }}
              >
                Coming Soon
              </h3>
              <p style={{ fontSize: "0.875rem" }}>
                We&apos;re working on stories for this topic. Check back soon!
              </p>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "1.25rem",
              }}
            >
              {articles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/articles/${article.slug}`}
                  style={{ textDecoration: "none", height: "100%" }}
                >
                  <article
                    className="card topic-article-card"
                    style={{
                      overflow: "hidden",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    {/* Cover */}
                    <div style={{ position: "relative", aspectRatio: "16/10", overflow: "hidden", background: "var(--color-surface-2)" }}>
                      {article.featured && (
                        <div
                          style={{
                            position: "absolute",
                            top: "12px",
                            left: "12px",
                            background: "var(--color-text-1)",
                            color: "var(--color-bg)",
                            padding: "3px 9px",
                            borderRadius: "var(--radius-pill)",
                            fontSize: "0.62rem",
                            fontWeight: 700,
                            letterSpacing: "0.06em",
                            textTransform: "uppercase",
                          }}
                        >
                          Featured
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div
                      style={{
                        padding: "1.25rem",
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.6rem",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.68rem",
                          color: "var(--color-text-3)",
                          display: "flex",
                          alignItems: "center",
                          gap: "3px",
                        }}
                      >
                        <Clock size={11} /> {article.readingTime} min read
                      </span>
                      <h2
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "1rem",
                          fontWeight: 700,
                          lineHeight: 1.25,
                          letterSpacing: "-0.02em",
                          color: "var(--color-text-1)",
                        }}
                      >
                        {article.title}
                      </h2>
                      <p
                        style={{
                          fontSize: "0.82rem",
                          lineHeight: 1.65,
                          color: "var(--color-text-2)",
                          flex: 1,
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {article.hook}
                      </p>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginTop: "auto",
                          paddingTop: "0.5rem",
                        }}
                      >
                        <span style={{ fontSize: "0.7rem", color: "var(--color-text-3)" }}>
                          {article.publishedAt
                            ? formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })
                            : "Draft"}
                        </span>
                        <span
                          style={{
                            fontSize: "0.75rem",
                            fontWeight: 600,
                            color: "var(--color-accent)",
                            display: "flex",
                            alignItems: "center",
                            gap: "3px",
                          }}
                        >
                          Read <ArrowRight size={12} />
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <style>{`
        .back-link:hover { color: var(--color-text-1) !important; }
        .topic-article-card:hover .topic-card-img { transform: scale(1.03); }
      `}</style>
    </div>
  );
}
