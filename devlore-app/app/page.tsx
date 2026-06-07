import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, TrendingUp, Sparkles, BookOpen, Users } from "lucide-react";
import { getFeaturedArticles, getRecentArticles, getTrendingArticles, CHARACTERS, toArticleCard } from "@/lib/data";
import { CATEGORIES, type ArticleCard } from "@/types";
import { formatDistanceToNow } from "date-fns";

function CategoryBadge({ category }: { category: string }) {
  const meta = CATEGORIES.find(c => c.name === category);
  return (
    <span
      className="badge"
      style={{
        background: `color-mix(in srgb, var(--color-accent) 12%, transparent)`,
        color: "var(--color-accent)",
        borderColor: `color-mix(in srgb, var(--color-accent) 25%, transparent)`,
        fontSize: "0.68rem",
      }}
    >
      {meta?.emoji} {category}
    </span>
  );
}

function ArticleCard({ article, large }: { article: ArticleCard; large?: boolean }) {
  return (
    <Link href={`/articles/${article.slug}`} style={{ display: "block", textDecoration: "none" }}>
      <article
        className="card"
        style={{
          overflow: "hidden",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ position: "relative", overflow: "hidden", aspectRatio: large ? "16/9" : "16/10" }}>
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            style={{ objectFit: "cover", transition: "transform 0.4s ease" }}
            className="card-image"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {article.featured && (
            <div
              style={{
                position: "absolute", top: "12px", left: "12px",
                background: "linear-gradient(135deg, var(--color-accent), var(--color-purple))",
                color: "white",
                padding: "3px 10px",
                borderRadius: "var(--radius-pill)",
                fontSize: "0.68rem",
                fontWeight: 700,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              ✦ Featured
            </div>
          )}
        </div>

        <div style={{ padding: large ? "1.5rem" : "1.25rem", flex: 1, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
            <CategoryBadge category={article.category} />
            <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "0.75rem", color: "var(--color-text-muted)" }}>
              <Clock size={12} />
              {article.readingTime} min read
            </span>
          </div>

          <h3
            className="font-display"
            style={{
              fontSize: large ? "1.35rem" : "1.1rem",
              fontWeight: 700,
              lineHeight: 1.25,
              color: "var(--color-text-primary)",
            }}
          >
            {article.title}
          </h3>

          <p style={{ fontSize: "0.875rem", lineHeight: 1.6, color: "var(--color-text-secondary)", flex: 1 }}>
            {article.hook}
          </p>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto" }}>
            <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>
              {article.publishedAt
                ? formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })
                : "Draft"}
            </span>
            <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--color-accent)", display: "flex", alignItems: "center", gap: "4px" }}>
              Read more <ArrowRight size={13} />
            </span>
          </div>
        </div>

        <style>{`
          article:hover .card-image {
            transform: scale(1.04);
          }
        `}</style>
      </article>
    </Link>
  );
}

function TrendingCard({ article, index }: { article: ArticleCard; index: number }) {
  const meta = CATEGORIES.find(c => c.name === article.category);
  return (
    <Link href={`/articles/${article.slug}`} style={{ textDecoration: "none" }}>
      <div
        style={{
          display: "flex",
          gap: "1rem",
          padding: "1rem",
          borderRadius: "var(--radius-md)",
          border: "1px solid var(--color-border)",
          background: "var(--color-surface)",
          transition: "all var(--transition-base)",
          cursor: "pointer",
        }}
        className="trending-row"
      >
        <div
          style={{
            fontSize: "1.5rem",
            fontFamily: "var(--font-display)",
            fontWeight: 900,
            color: "var(--color-border-dark)",
            minWidth: "2rem",
            lineHeight: 1,
            paddingTop: "2px",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
            <span style={{ fontSize: "0.75rem" }}>{meta?.emoji}</span>
            <span style={{ fontSize: "0.72rem", color: "var(--color-text-muted)", fontWeight: 500 }}>{article.category}</span>
          </div>
          <h4
            className="font-display"
            style={{
              fontSize: "0.95rem",
              fontWeight: 700,
              color: "var(--color-text-primary)",
              lineHeight: 1.3,
              marginBottom: "4px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {article.title}
          </h4>
          <span style={{ fontSize: "0.72rem", color: "var(--color-text-muted)", display: "flex", alignItems: "center", gap: "3px" }}>
            <Clock size={10} /> {article.readingTime} min
          </span>
        </div>
      </div>
      <style>{`
        .trending-row:hover {
          border-color: var(--color-border-dark);
          transform: translateX(3px);
          box-shadow: var(--shadow-card);
        }
      `}</style>
    </Link>
  );
}

export default function HomePage() {
  const featured = getFeaturedArticles().map(toArticleCard);
  const recent = getRecentArticles(6).map(toArticleCard);
  const trending = getTrendingArticles(4).map(toArticleCard);
  const heroArticle = featured[0];
  const secondaryFeatured = featured.slice(1, 3);

  return (
    <div>
      {/* ============================================================
          HERO SECTION
          ============================================================ */}
      <section
        style={{
          padding: "4rem 0 3rem",
          background: "linear-gradient(180deg, color-mix(in srgb, var(--color-accent) 4%, var(--color-paper)) 0%, var(--color-paper) 100%)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <div className="container">
          {/* Eyebrow */}
          <div
            style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "1.5rem" }}
            className="animate-fade-up"
          >
            <div
              className="badge badge-accent"
              style={{ fontSize: "0.7rem" }}
            >
              <Sparkles size={11} /> New Platform
            </div>
            <span style={{ fontSize: "0.8rem", color: "var(--color-text-muted)" }}>
              Technical concepts through stories
            </span>
          </div>

          {/* Headline */}
          <div style={{ maxWidth: "700px", marginBottom: "3rem" }} className="animate-fade-up stagger-1">
            <h1
              className="font-display"
              style={{ fontSize: "clamp(2.25rem, 6vw, 4rem)", fontWeight: 900, lineHeight: 1.08, letterSpacing: "-0.03em", marginBottom: "1rem" }}
            >
              Learn Complex Tech
              <br />
              <span className="text-gradient">Through Stories.</span>
            </h1>
            <p style={{ fontSize: "1.1rem", lineHeight: 1.7, maxWidth: "560px", color: "var(--color-text-secondary)" }}>
              DevLore explains software engineering, AI, and system design through humor, unforgettable characters, and analogies that actually stick.
            </p>
            <div style={{ display: "flex", gap: "12px", marginTop: "1.5rem", flexWrap: "wrap" }}>
              <Link href="/topics/ai-llms" className="btn btn-primary" style={{ fontSize: "0.9rem" }}>
                <BookOpen size={16} />
                Start Reading
              </Link>
              <Link href="/characters" className="btn btn-secondary" style={{ fontSize: "0.9rem" }}>
                <Users size={16} />
                Meet the Characters
              </Link>
            </div>
          </div>

          {/* Featured articles grid */}
          {heroArticle && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: "1rem",
              }}
              className="hero-feature-grid animate-fade-up stagger-2"
            >
              <div style={{ gridColumn: "span 1" }}>
                <ArticleCard article={heroArticle} large />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                {secondaryFeatured.map((a) => (
                  <ArticleCard key={a.slug} article={a} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ============================================================
          TRENDING + CATEGORY GRID
          ============================================================ */}
      <section style={{ padding: "4rem 0" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "3rem" }} className="split-section">
            {/* Trending */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "1.5rem" }}>
                <TrendingUp size={18} style={{ color: "var(--color-accent)" }} />
                <h2 className="font-display" style={{ fontSize: "1.4rem", fontWeight: 700 }}>
                  Trending Stories
                </h2>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {trending.map((a, i) => (
                  <TrendingCard key={a.slug} article={a} index={i} />
                ))}
              </div>
            </div>

            {/* Categories */}
            <div>
              <h2 className="font-display" style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: "1.5rem" }}>
                Explore Topics
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                {CATEGORIES.map((cat) => (
                  <Link key={cat.slug} href={`/topics/${cat.slug}`} style={{ textDecoration: "none" }}>
                    <div
                      className="cat-card"
                      style={{
                        padding: "1.25rem",
                        borderRadius: "var(--radius-md)",
                        background: "var(--color-surface)",
                        border: "1px solid var(--color-border)",
                        transition: "all var(--transition-base)",
                        cursor: "pointer",
                      }}
                    >
                      <div style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}>{cat.emoji}</div>
                      <h4 className="font-display" style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--color-text-primary)", marginBottom: "4px" }}>
                        {cat.name}
                      </h4>
                      <p style={{ fontSize: "0.75rem", lineHeight: 1.5, color: "var(--color-text-muted)" }}>
                        {cat.description.slice(0, 60)}...
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          NEW ARTICLES
          ============================================================ */}
      <section
        style={{
          padding: "4rem 0",
          background: "var(--color-surface-2)",
          borderTop: "1px solid var(--color-border)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <div className="container">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem" }}>
            <h2 className="font-display" style={{ fontSize: "1.4rem", fontWeight: 700 }}>
              ✨ New Articles
            </h2>
            <Link href="/topics" className="btn btn-ghost" style={{ fontSize: "0.82rem", gap: "4px" }}>
              View all <ArrowRight size={14} />
            </Link>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {recent.slice(0, 6).map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          CHARACTER SPOTLIGHT
          ============================================================ */}
      <section style={{ padding: "5rem 0" }}>
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: "540px", margin: "0 auto 3rem" }}>
            <h2 className="font-display" style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "0.75rem" }}>
              Meet the Cast
            </h2>
            <p style={{ color: "var(--color-text-secondary)" }}>
              Recurring characters that appear across hundreds of articles. You&apos;ll never forget a concept once you&apos;ve met the characters living it.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "1.25rem" }}>
            {CHARACTERS.map((character) => (
              <Link key={character.slug} href={`/characters/${character.slug}`} style={{ textDecoration: "none" }}>
                <div
                  className="card"
                  style={{ padding: "1.5rem", textAlign: "center", cursor: "pointer" }}
                >
                  <div
                    style={{
                      width: 64, height: 64,
                      borderRadius: "50%",
                      background: `${character.color}20`,
                      border: `2px solid ${character.color}40`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      margin: "0 auto 1rem",
                      fontSize: "2rem",
                    }}
                    className="animate-float"
                  >
                    {character.emoji}
                  </div>
                  <h3 className="font-display" style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "4px" }}>
                    {character.name}
                  </h3>
                  <span
                    className="badge badge-muted"
                    style={{ marginBottom: "0.75rem" }}
                  >
                    {character.role}
                  </span>
                  <p style={{ fontSize: "0.8rem", lineHeight: 1.6, color: "var(--color-text-secondary)", fontStyle: "italic" }}>
                    &ldquo;{character.catchphrase}&rdquo;
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          NEWSLETTER CTA
          ============================================================ */}
      <section
        style={{
          padding: "5rem 0",
          background: "linear-gradient(135deg, var(--color-ink) 0%, #1a1245 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* decorative blur */}
        <div
          style={{
            position: "absolute", top: "-50%", right: "-10%",
            width: 400, height: 400,
            background: "radial-gradient(circle, rgba(255,107,53,0.15) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />
        <div
          style={{
            position: "absolute", bottom: "-50%", left: "5%",
            width: 350, height: 350,
            background: "radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />

        <div className="container" style={{ position: "relative", textAlign: "center" }}>
          <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>📬</div>
          <h2
            className="font-display"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 800, color: "white", marginBottom: "1rem" }}
          >
            Never Miss a Story
          </h2>
          <p style={{ color: "rgba(255,255,255,0.65)", maxWidth: "480px", margin: "0 auto 2rem", lineHeight: 1.7 }}>
            Join thousands of developers who get the best technical stories delivered to their inbox. One email a week. No fluff.
          </p>
          <div style={{ display: "flex", gap: "10px", justifyContent: "center", maxWidth: "440px", margin: "0 auto" }}>
            <input
              type="email"
              placeholder="your@email.com"
              style={{
                flex: 1,
                padding: "12px 16px",
                borderRadius: "var(--radius-md)",
                border: "1px solid rgba(255,255,255,0.15)",
                background: "rgba(255,255,255,0.08)",
                color: "white",
                fontSize: "0.9rem",
                outline: "none",
                minWidth: 0,
              }}
            />
            <button className="btn btn-primary" style={{ whiteSpace: "nowrap" }}>
              Subscribe Free
            </button>
          </div>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.75rem", marginTop: "1rem" }}>
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </section>

      <style>{`
        @media (min-width: 768px) {
          .hero-feature-grid {
            grid-template-columns: 3fr 2fr !important;
          }
          .split-section {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        .cat-card:hover {
          border-color: var(--color-border-dark);
          transform: translateY(-3px);
          box-shadow: var(--shadow-card-hover);
        }
      `}</style>
    </div>
  );
}
