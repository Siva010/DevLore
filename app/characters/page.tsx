import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CHARACTERS } from "@/lib/data";
import { type Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Characters",
  description:
    "Meet Dave the Database, Cathy Cache, Polly API, Larry Load Balancer and all the recurring characters of DevLore.",
  slug: "characters",
});

export default function CharactersPage() {
  return (
    <div>
      {/* Hero */}
      <section
        style={{
          padding: "5rem 0 4rem",
          borderBottom: "1px solid var(--color-border)",
          background: "var(--color-bg)",
        }}
      >
        <div className="container" style={{ maxWidth: "640px" }}>
          <div className="animate-fade-up">
            <span
              className="badge badge-default"
              style={{ marginBottom: "1.25rem", display: "inline-flex" }}
            >
              🎭 The Cast
            </span>
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
              Meet the Characters
            </h1>
            <p
              style={{
                fontSize: "1rem",
                color: "var(--color-text-2)",
                lineHeight: 1.75,
                maxWidth: "520px",
              }}
            >
              DevLore&apos;s recurring cast of technical personalities. Each one embodies a concept — and once you&apos;ve met them, you&apos;ll never forget how it works.
            </p>
          </div>
        </div>
      </section>

      {/* Characters grid */}
      <section style={{ padding: "4rem 0 7rem" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {CHARACTERS.map((character, i) => (
              <Link
                key={character.slug}
                href={`/characters/${character.slug}`}
                style={{ textDecoration: "none" }}
              >
                <div
                  className={`character-detail-card animate-fade-up stagger-${i + 1}`}
                  style={{
                    padding: "2rem",
                    borderRadius: "var(--radius-lg)",
                    background: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                    borderLeft: `3px solid ${character.color}`,
                    cursor: "pointer",
                    position: "relative",
                    overflow: "hidden",
                    transition: "all var(--transition-base)",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {/* Header row */}
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", marginBottom: "1.25rem" }}>
                    <div
                      className="animate-float"
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: "50%",
                        background: `${character.color}10`,
                        border: `1.5px solid ${character.color}25`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "2rem",
                        flexShrink: 0,
                      }}
                    >
                      {character.emoji}
                    </div>
                    <div>
                      <h2
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "1.1rem",
                          fontWeight: 800,
                          color: "var(--color-text-1)",
                          letterSpacing: "-0.02em",
                          marginBottom: "4px",
                        }}
                      >
                        {character.name}
                      </h2>
                      <span
                        className="badge"
                        style={{
                          background: `${character.color}10`,
                          color: character.color,
                          borderColor: `${character.color}30`,
                          fontSize: "0.65rem",
                        }}
                      >
                        {character.role}
                      </span>
                    </div>
                  </div>

                  {/* Bio */}
                  <p
                    style={{
                      fontSize: "0.82rem",
                      lineHeight: 1.7,
                      color: "var(--color-text-2)",
                      marginBottom: "1.1rem",
                      flex: 1,
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {character.bio}
                  </p>

                  {/* Catchphrase */}
                  <blockquote
                    style={{
                      fontStyle: "italic",
                      fontFamily: "var(--font-display)",
                      fontSize: "0.82rem",
                      color: "var(--color-text-1)",
                      borderLeft: `2px solid ${character.color}40`,
                      paddingLeft: "0.75rem",
                      margin: "0 0 1.25rem",
                      lineHeight: 1.6,
                    }}
                  >
                    &ldquo;{character.catchphrase}&rdquo;
                  </blockquote>

                  {/* CTA */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      fontSize: "0.78rem",
                      fontWeight: 600,
                      color: character.color,
                    }}
                  >
                    View profile <ArrowRight size={12} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .character-detail-card:hover {
          box-shadow: var(--shadow-lg);
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
}
