import Link from "next/link";
import { CHARACTERS } from "@/lib/data";
import { type Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Characters",
  description: "Meet Dave the Database, Cathy Cache, Polly API, Larry Load Balancer and all the recurring characters of DevLore.",
  slug: "characters",
});

export default function CharactersPage() {
  return (
    <div>
      <section
        style={{
          padding: "5rem 0 3rem",
          borderBottom: "1px solid var(--color-border)",
          background: "linear-gradient(180deg, color-mix(in srgb, var(--color-purple) 4%, var(--color-paper)) 0%, var(--color-paper) 100%)",
        }}
      >
        <div className="container" style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto" }}>
          <div style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>🎭</div>
          <h1 className="font-display" style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 900, marginBottom: "1rem" }}>
            Meet the Characters
          </h1>
          <p style={{ fontSize: "1.05rem", color: "var(--color-text-secondary)", lineHeight: 1.7 }}>
            DevLore&apos;s recurring cast of technical characters. Each one embodies a concept — and once you&apos;ve met them, you&apos;ll never forget how the concept works.
          </p>
        </div>
      </section>

      <section style={{ padding: "4rem 0 6rem" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem" }}>
            {CHARACTERS.map((character) => (
              <Link key={character.slug} href={`/characters/${character.slug}`} style={{ textDecoration: "none" }}>
                <div
                  className="card"
                  style={{ padding: "2rem", cursor: "pointer", position: "relative", overflow: "hidden" }}
                >
                  {/* Color accent top bar */}
                  <div
                    style={{
                      position: "absolute", top: 0, left: 0, right: 0, height: 3,
                      background: `linear-gradient(90deg, ${character.color}, ${character.color}60)`,
                    }}
                  />

                  {/* Avatar */}
                  <div
                    style={{
                      width: 72, height: 72,
                      borderRadius: "50%",
                      background: `${character.color}18`,
                      border: `2px solid ${character.color}40`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "2.5rem",
                      marginBottom: "1.25rem",
                    }}
                    className="animate-float"
                  >
                    {character.emoji}
                  </div>

                  <h2 className="font-display" style={{ fontSize: "1.15rem", fontWeight: 800, marginBottom: "4px" }}>
                    {character.name}
                  </h2>
                  <span
                    className="badge"
                    style={{
                      background: `${character.color}18`,
                      color: character.color,
                      borderColor: `${character.color}35`,
                      marginBottom: "1rem",
                      fontSize: "0.68rem",
                    }}
                  >
                    {character.role}
                  </span>

                  <p style={{ fontSize: "0.875rem", lineHeight: 1.6, color: "var(--color-text-secondary)", marginBottom: "1rem" }}>
                    {character.bio.slice(0, 120)}...
                  </p>

                  <blockquote
                    style={{
                      fontStyle: "italic",
                      fontFamily: "var(--font-display)",
                      fontSize: "0.85rem",
                      color: "var(--color-text-primary)",
                      borderLeft: `2px solid ${character.color}`,
                      paddingLeft: "10px",
                      margin: 0,
                    }}
                  >
                    &ldquo;{character.catchphrase}&rdquo;
                  </blockquote>

                  <div style={{ marginTop: "1.25rem", display: "flex", alignItems: "center", gap: "4px", fontSize: "0.8rem", fontWeight: 600, color: character.color }}>
                    View profile →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
