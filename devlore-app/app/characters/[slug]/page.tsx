import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
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
          background: `linear-gradient(135deg, ${character.color}10 0%, var(--color-paper) 100%)`,
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <div className="container">
          <Link href="/characters" className="btn btn-ghost" style={{ padding: "6px 12px", fontSize: "0.82rem", marginBottom: "2rem" }}>
            <ArrowLeft size={14} /> All Characters
          </Link>

          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2rem", alignItems: "center" }} className="profile-grid">
            {/* Avatar */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div
                style={{
                  width: 140, height: 140,
                  borderRadius: "50%",
                  background: `${character.color}18`,
                  border: `4px solid ${character.color}40`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "5rem",
                  boxShadow: `0 0 40px ${character.color}25`,
                }}
                className="animate-float"
              >
                {character.emoji}
              </div>
            </div>

            {/* Info */}
            <div>
              <span
                className="badge"
                style={{ background: `${character.color}18`, color: character.color, borderColor: `${character.color}35`, marginBottom: "1rem" }}
              >
                {character.role}
              </span>
              <h1 className="font-display" style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 900, marginBottom: "1rem" }}>
                {character.name}
              </h1>
              <p style={{ fontSize: "1rem", lineHeight: 1.75, color: "var(--color-text-secondary)", maxWidth: "580px", marginBottom: "1.5rem" }}>
                {character.bio}
              </p>
              <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
                <div>
                  <div style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-text-muted)", marginBottom: "4px" }}>
                    Personality
                  </div>
                  <div style={{ fontSize: "0.875rem", color: "var(--color-text-primary)" }}>{character.personality}</div>
                </div>
              </div>
              <blockquote
                style={{
                  marginTop: "1.5rem",
                  fontStyle: "italic",
                  fontFamily: "var(--font-display)",
                  fontSize: "1rem",
                  color: "var(--color-text-primary)",
                  borderLeft: `3px solid ${character.color}`,
                  paddingLeft: "1rem",
                }}
              >
                &ldquo;{character.catchphrase}&rdquo;
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Articles featuring this character */}
      <section style={{ padding: "4rem 0 6rem" }}>
        <div className="container">
          <h2 className="font-display" style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: "2rem" }}>
            Stories featuring {character.name.split(" ")[0]}
          </h2>

          {articles.length === 0 ? (
            <p style={{ color: "var(--color-text-muted)" }}>No stories yet — {character.name} is preparing their debut.</p>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.25rem" }}>
              {articles.map((article) => (
                <Link key={article.slug} href={`/articles/${article.slug}`} style={{ textDecoration: "none" }}>
                  <div className="card" style={{ overflow: "hidden", display: "flex", flexDirection: "column" }}>
                    <div style={{ position: "relative", aspectRatio: "16/10", overflow: "hidden" }}>
                      <Image
                        src={article.coverImage}
                        alt={article.title}
                        fill
                        style={{ objectFit: "cover" }}
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      <span style={{ fontSize: "0.72rem", color: "var(--color-text-muted)", display: "flex", alignItems: "center", gap: "4px" }}>
                        <Clock size={11} /> {article.readingTime} min read
                      </span>
                      <h3 className="font-display" style={{ fontSize: "1rem", fontWeight: 700, color: "var(--color-text-primary)", lineHeight: 1.3 }}>
                        {article.title}
                      </h3>
                      <p style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)", lineHeight: 1.5 }}>
                        {article.hook.slice(0, 90)}...
                      </p>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <span style={{ fontSize: "0.72rem", color: "var(--color-text-muted)" }}>
                          {article.publishedAt ? formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true }) : "Draft"}
                        </span>
                        <span style={{ fontSize: "0.78rem", fontWeight: 600, color: character.color, display: "flex", alignItems: "center", gap: "3px" }}>
                          Read <ArrowRight size={12} />
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
        @media (min-width: 768px) {
          .profile-grid {
            grid-template-columns: 220px 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
