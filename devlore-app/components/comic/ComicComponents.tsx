import { Lightbulb, AlertTriangle, HelpCircle, Mic, Star } from "lucide-react";

// ============================================================
// STORY PANEL
// ============================================================
export function StoryPanel({ children, title }: { children: React.ReactNode; title?: string }) {
  return (
    <div className="story-panel">
      {title && (
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "1rem" }}>
          <Star size={15} style={{ color: "var(--color-accent)" }} />
          <span style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "var(--color-accent)" }}>
            {title}
          </span>
        </div>
      )}
      <div style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem", lineHeight: 1.7, color: "var(--color-text-primary)" }}>
        {children}
      </div>
    </div>
  );
}

// ============================================================
// FUN FACT
// ============================================================
export function FunFact({ children }: { children: React.ReactNode }) {
  return (
    <div className="fun-fact">
      <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
        <Lightbulb size={18} style={{ color: "var(--color-gold)", flexShrink: 0, marginTop: "2px" }} />
        <div>
          <div style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-gold)", marginBottom: "6px" }}>
            Fun Fact
          </div>
          <div style={{ fontSize: "0.9rem", lineHeight: 1.7, color: "var(--color-text-primary)" }}>{children}</div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// COMMON MISTAKE
// ============================================================
export function CommonMistake({ children, title }: { children: React.ReactNode; title?: string }) {
  return (
    <div className="common-mistake">
      <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
        <AlertTriangle size={18} style={{ color: "var(--color-accent)", flexShrink: 0, marginTop: "2px" }} />
        <div>
          <div style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-accent)", marginBottom: "6px" }}>
            ⚠️ Common Mistake {title ? `— ${title}` : ""}
          </div>
          <div style={{ fontSize: "0.9rem", lineHeight: 1.7, color: "var(--color-text-primary)" }}>{children}</div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// CHARACTER QUOTE
// ============================================================
export function CharacterQuote({
  children,
  character,
  emoji,
  color = "var(--color-purple)",
}: {
  children: React.ReactNode;
  character: string;
  emoji?: string;
  color?: string;
}) {
  return (
    <div className="character-quote">
      <div
        style={{
          width: 44, height: 44,
          borderRadius: "50%",
          background: `${color}20`,
          border: `2px solid ${color}40`,
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
          fontSize: "1.4rem",
        }}
      >
        {emoji ?? "💬"}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: color, marginBottom: "6px" }}>
          {character} says:
        </div>
        <blockquote
          style={{
            margin: 0,
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontSize: "1rem",
            lineHeight: 1.65,
            color: "var(--color-text-primary)",
          }}
        >
          {children}
        </blockquote>
      </div>
    </div>
  );
}

// ============================================================
// INTERVIEW QUESTION
// ============================================================
export function InterviewQuestion({ question, children }: { question: string; children?: React.ReactNode }) {
  return (
    <div className="interview-question">
      <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
        <HelpCircle size={18} style={{ color: "var(--color-teal)", flexShrink: 0, marginTop: "2px" }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-teal)", marginBottom: "8px" }}>
            🎤 Interview Question
          </div>
          <div style={{ fontWeight: 600, color: "var(--color-text-primary)", marginBottom: children ? "0.75rem" : 0, fontSize: "0.95rem" }}>
            {question}
          </div>
          {children && (
            <div style={{ fontSize: "0.875rem", lineHeight: 1.7, color: "var(--color-text-secondary)" }}>
              {children}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// COMIC STRIP (Simple panel layout)
// ============================================================
export function ComicStrip({ panels }: { panels: { emoji: string; caption: string; speaker?: string }[] }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${Math.min(panels.length, 3)}, 1fr)`,
        gap: "1px",
        borderRadius: "var(--radius-md)",
        overflow: "hidden",
        border: "2px solid var(--color-border-dark)",
        margin: "1.5rem 0",
      }}
    >
      {panels.map((panel, i) => (
        <div
          key={i}
          style={{
            background: i % 2 === 0 ? "var(--color-surface-2)" : "var(--color-surface-3)",
            padding: "1.25rem",
            textAlign: "center",
            borderRight: i < panels.length - 1 ? "1px solid var(--color-border-dark)" : "none",
          }}
        >
          <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>{panel.emoji}</div>
          {panel.speaker && (
            <div style={{ fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", color: "var(--color-text-muted)", marginBottom: "6px" }}>
              {panel.speaker}
            </div>
          )}
          <p style={{ fontSize: "0.8rem", lineHeight: 1.5, color: "var(--color-text-secondary)", margin: 0 }}>
            {panel.caption}
          </p>
        </div>
      ))}
    </div>
  );
}

// ============================================================
// QUICK REVISION (summary bullets)
// ============================================================
export function QuickRevision({ title = "Quick Revision", items }: { title?: string; items: string[] }) {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, color-mix(in srgb, var(--color-teal) 8%, var(--color-surface)), color-mix(in srgb, var(--color-purple) 8%, var(--color-surface)))",
        border: "1px solid color-mix(in srgb, var(--color-teal) 25%, transparent)",
        borderRadius: "var(--radius-lg)",
        padding: "1.5rem",
        margin: "2rem 0",
      }}
    >
      <div style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-teal)", marginBottom: "1rem" }}>
        📋 {title}
      </div>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
        {items.map((item, i) => (
          <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "0.9rem", color: "var(--color-text-primary)" }}>
            <span style={{ color: "var(--color-teal)", fontWeight: 700, flexShrink: 0 }}>✓</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ============================================================
// MEME SECTION
// ============================================================
export function MemeSection({ children, caption }: { children: React.ReactNode; caption?: string }) {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "1.5rem",
        background: "var(--color-surface-2)",
        borderRadius: "var(--radius-lg)",
        border: "1px solid var(--color-border)",
        margin: "1.5rem 0",
      }}
    >
      <div style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-text-muted)", marginBottom: "1rem" }}>
        😂 Developer Humor
      </div>
      {children}
      {caption && (
        <p style={{ fontSize: "0.8rem", color: "var(--color-text-muted)", marginTop: "0.75rem", fontStyle: "italic", margin: "0.75rem 0 0" }}>
          {caption}
        </p>
      )}
    </div>
  );
}
