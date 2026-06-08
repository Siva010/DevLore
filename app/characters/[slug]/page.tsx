import { notFound } from "next/navigation";
import Link from "next/link";
import { Clock, ArrowLeft, ArrowRight } from "lucide-react";
import { type Metadata } from "next";
import { getCharacterBySlug, getArticlesByCharacter, CHARACTERS } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";
import { formatDistanceToNow } from "date-fns";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const character = getCharacterBySlug(slug);
  if (!character) return { title: "Not Found | DevLore" };
  return buildMetadata({
    title: character.name,
    description: character.bio,
    slug: `characters/${slug}`,
  });
}

export async function generateStaticParams() {
  return CHARACTERS.map((c) => ({ slug: c.slug }));
}

export default async function CharacterProfilePage({ params }: PageProps) {
  const { slug } = await params;
  const character = getCharacterBySlug(slug);
  if (!character) notFound();

  const articles = getArticlesByCharacter(slug);

  return (
    <div>
      {/* Profile Hero */}
      <section
        style={{
          padding: "5rem 0 4rem",
          background: "var(--color-bg)",
          borderBottom: "1px solid var(--color-border)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative orb */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "-30%",
            right: "-5%",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${character.color}08 0%, transparent 70%)`,
            pointerEvents: "none",
          }}
        />

        <div className="container">
          <Link
            href="/characters"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "5px",
              fontSize: "0.78rem",
              color: "var(--color-text-3)",
              fontWeight: 500,
              marginBottom: "2.5rem",
              transition: "color var(--transition-fast)",
            }}
            className="back-link"
          >
            <ArrowLeft size={13} /> All Characters
          </Link>

          <div className="profile-grid">
            {/* Avatar */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div
                className="animate-float"
                style={{
                  width: 140,
                  height: 140,
                  borderRadius: "50%",
                  background: `${character.color}10`,
                  border: `2px solid ${character.color}25`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "5rem",
                  boxShadow: `0 0 60px ${character.color}15`,
                }}
              >
                {character.emoji}
              </div>
            </div>

            {/* Info */}
            <div>
              <span
                className="badge"
                style={{
                  background: `${character.color}10`,
                  color: character.color,
                  borderColor: `${character.color}30`,
                  marginBottom: "1rem",
                  fontSize: "0.68rem",
                  display: "inline-flex",
                }}
              >
                {character.role}
              </span>

              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2rem, 4vw, 2.75rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.04em",
                  color: "var(--color-text-1)",
                  marginBottom: "1rem",
                  lineHeight: 1.1,
                }}
              >
                {character.name}
              </h1>

              <p
                style={{
                  fontSize: "0.95rem",
                  lineHeight: 1.8,
                  color: "var(--color-text-2)",
                  maxWidth: "560px",
                  marginBottom: "1.75rem",
                }}
              >
                {character.bio}
              </p>

              {/* Personality */}
              <div
                style={{
                  display: "inline-flex",
                  flexDirection: "column",
                  gap: "4px",
                  padding: "0.9rem 1.1rem",
                  background: "var(--color-surface-2)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-md)",
                  marginBottom: "1.5rem",
                }}
              >
                <div
                  style={{
                    fontSize: "0.6rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "var(--color-text-3)",
                  }}
                >
                  Personality
                </div>
                <div style={{ fontSize: "0.85rem", color: "var(--color-text-1)", fontWeight: 500 }}>
                  {character.personality}
                </div>
              </div>

              {/* Catchphrase */}
              <blockquote
                style={{
                  fontStyle: "italic",
                  fontFamily: "var(--font-display)",
                  fontSize: "1.05rem",
                  color: "var(--color-text-1)",
                  borderLeft: `2px solid ${character.color}`,
                  paddingLeft: "1rem",
                  lineHeight: 1.65,
                  maxWidth: "520px",
                }}
              >
                &ldquo;{character.catchphrase}&rdquo;
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Articles */}
      <section style={{ padding: "4rem 0 7rem" }}>
        <div className="container">
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.25rem",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: "var(--color-text-1)",
              marginBottom: "2rem",
            }}
          >
            Stories featuring {character.name.split(" ")[0]}
          </h2>

          {articles.length === 0 ? (
            <div
              style={{
                padding: "4rem 2rem",
                textAlign: "center",
                color: "var(--color-text-3)",
                background: "var(--color-surface-2)",
                borderRadius: "var(--radius-lg)",
                border: "1px solid var(--color-border)",
              }}
            >
              <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>{character.emoji}</div>
              <p style={{ fontSize: "0.875rem" }}>
                {character.name} is preparing their debut. Check back soon.
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
                  style={{ textDecoration: "none" }}
                >
                  <div
                    className="article-item card"
                    style={{ overflow: "hidden", display: "flex", flexDirection: "column" }}
                  >
                    <div style={{ position: "relative", aspectRatio: "16/10", overflow: "hidden", background: "var(--color-surface-2)" }}>
                    </div>
                    <div style={{ padding: "1.25rem", flex: 1, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
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
                      <h3
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "1rem",
                          fontWeight: 700,
                          color: "var(--color-text-1)",
                          lineHeight: 1.3,
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {article.title}
                      </h3>
                      <p
                        style={{
                          fontSize: "0.78rem",
                          color: "var(--color-text-2)",
                          lineHeight: 1.6,
                          flex: 1,
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {article.hook}
                      </p>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto", paddingTop: "0.5rem" }}>
                        <span style={{ fontSize: "0.68rem", color: "var(--color-text-3)" }}>
                          {article.publishedAt
                            ? formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })
                            : "Draft"}
                        </span>
                        <span
                          style={{
                            fontSize: "0.75rem",
                            fontWeight: 600,
                            color: character.color,
                            display: "flex",
                            alignItems: "center",
                            gap: "3px",
                          }}
                        >
                          Read <ArrowRight size={11} />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <style>{`
        .back-link:hover { color: var(--color-text-1) !important; }

        .profile-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
          align-items: flex-start;
        }
        @media (min-width: 768px) {
          .profile-grid {
            grid-template-columns: 180px 1fr !important;
            gap: 3rem;
          }
        }

        .article-item:hover .article-img {
          transform: scale(1.04);
        }
      `}</style>
    </div>
  );
}
