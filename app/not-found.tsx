import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        textAlign: "center",
        gap: "1rem",
        padding: "4rem 2rem",
      }}
    >
      <div style={{ fontSize: "5rem", marginBottom: "0.5rem" }}>🗺️</div>
      <h1 className="font-display" style={{ fontSize: "clamp(1.75rem, 5vw, 3rem)", fontWeight: 900 }}>
        404 — Lore Not Found
      </h1>
      <p style={{ color: "var(--color-text-secondary)", maxWidth: "420px", lineHeight: 1.7 }}>
        Dave the Database searched everywhere. Cathy Cache came up empty. Polly API returned a 404. This page doesn&apos;t exist.
      </p>
      <div style={{ display: "flex", gap: "12px", marginTop: "1rem" }}>
        <Link href="/" className="btn btn-primary">Back to DevLore</Link>
        <Link href="/search" className="btn btn-secondary">Search Articles</Link>
      </div>
    </div>
  );
}
