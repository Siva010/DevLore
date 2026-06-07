import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") ?? "DevLore";
  const category = searchParams.get("category") ?? "";
  const emoji = searchParams.get("emoji") ?? "📖";
  const readingTime = searchParams.get("rt") ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(135deg, #0f0e17 0%, #1a1245 100%)",
          padding: "60px",
          fontFamily: "Georgia, serif",
          position: "relative",
        }}
      >
        {/* Top accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0, left: 0, right: 0,
            height: "6px",
            background: "linear-gradient(90deg, #ff6b35, #7c3aed)",
          }}
        />

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "auto" }}>
          <div
            style={{
              width: 44, height: 44,
              background: "linear-gradient(135deg, #ff6b35, #7c3aed)",
              borderRadius: "10px",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "20px",
            }}
          >
            📖
          </div>
          <span style={{ fontSize: "24px", fontWeight: 700, color: "white", letterSpacing: "-0.02em" }}>
            Dev<span style={{ color: "#ff6b35" }}>Lore</span>
          </span>
        </div>

        {/* Category badge */}
        {category && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "24px",
              background: "rgba(255,107,53,0.15)",
              border: "1px solid rgba(255,107,53,0.3)",
              borderRadius: "999px",
              padding: "6px 16px",
              width: "fit-content",
              fontSize: "16px",
              color: "#ff7a4a",
              fontWeight: 600,
              letterSpacing: "0.04em",
            }}
          >
            {emoji} {category}
          </div>
        )}

        {/* Title */}
        <div
          style={{
            fontSize: title.length > 60 ? "42px" : "52px",
            fontWeight: 900,
            color: "white",
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            maxWidth: "900px",
            marginBottom: "32px",
          }}
        >
          {title}
        </div>

        {/* Bottom row */}
        <div style={{ display: "flex", alignItems: "center", gap: "24px", marginTop: "auto" }}>
          {readingTime && (
            <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "18px" }}>
              ⏱ {readingTime} min read
            </span>
          )}
          <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "18px" }}>
            devlore.io
          </span>
        </div>

        {/* Decorative blob */}
        <div
          style={{
            position: "absolute",
            top: "-100px", right: "-100px",
            width: "400px", height: "400px",
            background: "radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-80px", left: "40%",
            width: "350px", height: "350px",
            background: "radial-gradient(circle, rgba(255,107,53,0.15) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
