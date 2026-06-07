import { Lightbulb, AlertTriangle, HelpCircle, Star, CheckCircle2 } from "lucide-react";

// ============================================================
// STORY PANEL
// ============================================================
export function StoryPanel({ children, title }: { children: React.ReactNode; title?: string }) {
  return (
    <div className="story-panel">
      {title && (
        <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "0.9rem" }}>
          <Star size={13} style={{ color: "var(--color-accent)" }} />
          <span
            style={{
              fontSize: "0.65rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "var(--color-accent)",
            }}
          >
            {title}
          </span>
        </div>
      )}
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "1.05rem",
          lineHeight: 1.75,
          color: "var(--color-text-1)",
        }}
      >
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
        <Lightbulb
          size={16}
          style={{ color: "var(--color-gold)", flexShrink: 0, marginTop: "3px" }}
        />
        <div>
          <div
            style={{
              fontSize: "0.62rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "var(--color-gold)",
              marginBottom: "5px",
            }}
          >
            Fun Fact
          </div>
          <div
            style={{
              fontSize: "0.875rem",
              lineHeight: 1.75,
              color: "var(--color-text-1)",
            }}
          >
            {children}
          </div>
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
        <AlertTriangle
          size={16}
          style={{ color: "var(--color-red)", flexShrink: 0, marginTop: "3px" }}
        />
        <div>
          <div
            style={{
              fontSize: "0.62rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "var(--color-red)",
              marginBottom: "5px",
            }}
          >
            Common Mistake{title ? ` — ${title}` : ""}
          </div>
          <div
            style={{
              fontSize: "0.875rem",
              lineHeight: 1.75,
              color: "var(--color-text-1)",
            }}
          >
            {children}
          </div>
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
  color = "var(--color-accent)",
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
          width: 40,
          height: 40,
          borderRadius: "50%",
          background: `${color}12`,
          border: `1.5px solid ${color}30`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          fontSize: "1.25rem",
        }}
      >
        {emoji ?? "💬"}
      </div>
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontSize: "0.62rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: color,
            marginBottom: "7px",
          }}
        >
          {character} says:
        </div>
        <blockquote
          style={{
            margin: 0,
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontSize: "1rem",
            lineHeight: 1.7,
            color: "var(--color-text-1)",
            borderLeft: `2px solid ${color}40`,
            paddingLeft: "0.9rem",
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
export function InterviewQuestion({
  question,
  children,
}: {
  question: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="interview-question">
      <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
        <HelpCircle
          size={16}
          style={{ color: "var(--color-teal)", flexShrink: 0, marginTop: "3px" }}
        />
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontSize: "0.62rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "var(--color-teal)",
              marginBottom: "7px",
            }}
          >
            Interview Question
          </div>
          <div
            style={{
              fontWeight: 650,
              fontFamily: "var(--font-display)",
              color: "var(--color-text-1)",
              marginBottom: children ? "0.75rem" : 0,
              fontSize: "0.925rem",
              lineHeight: 1.5,
            }}
          >
            {question}
          </div>
          {children && (
            <div
              style={{
                fontSize: "0.85rem",
                lineHeight: 1.75,
                color: "var(--color-text-2)",
              }}
            >
              {children}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// COMIC STRIP
// ============================================================
export function ComicStrip({
  panels,
}: {
  panels: { emoji: string; caption: string; speaker?: string }[];
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${Math.min(panels.length, 3)}, 1fr)`,
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        border: "1px solid var(--color-border-2)",
        margin: "2rem 0",
        background: "var(--color-surface)",
      }}
    >
      {panels.map((panel, i) => (
        <div
          key={i}
          style={{
            background: i % 2 === 0 ? "var(--color-surface-2)" : "var(--color-surface-3)",
            padding: "1.25rem 1rem",
            textAlign: "center",
            borderRight: i < panels.length - 1 ? "1px solid var(--color-border-2)" : "none",
          }}
        >
          <div style={{ fontSize: "2.25rem", marginBottom: "0.6rem" }}>{panel.emoji}</div>
          {panel.speaker && (
            <div
              style={{
                fontSize: "0.6rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "var(--color-text-3)",
                marginBottom: "5px",
              }}
            >
              {panel.speaker}
            </div>
          )}
          <p
            style={{
              fontSize: "0.78rem",
              lineHeight: 1.55,
              color: "var(--color-text-2)",
              margin: 0,
            }}
          >
            {panel.caption}
          </p>
        </div>
      ))}
    </div>
  );
}

// ============================================================
// QUICK REVISION
// ============================================================
export function QuickRevision({
  title = "Quick Revision",
  items,
}: {
  title?: string;
  items: string[];
}) {
  return (
    <div
      style={{
        background: "var(--color-text-1)",
        borderRadius: "var(--radius-lg)",
        padding: "1.75rem",
        margin: "2.5rem 0",
      }}
    >
      <div
        style={{
          fontSize: "0.65rem",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          color: "var(--color-accent)",
          marginBottom: "1.1rem",
        }}
      >
        📋 {title}
      </div>
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "flex",
          flexDirection: "column",
          gap: "0.6rem",
        }}
      >
        {items.map((item, i) => (
          <li
            key={i}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "10px",
              fontSize: "0.875rem",
              color: "rgba(250,250,250,0.8)",
              lineHeight: 1.6,
            }}
          >
            <CheckCircle2
              size={14}
              style={{ color: "var(--color-accent)", flexShrink: 0, marginTop: "3px" }}
            />
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
export function MemeSection({
  children,
  caption,
}: {
  children: React.ReactNode;
  caption?: string;
}) {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "1.75rem",
        background: "var(--color-surface-2)",
        borderRadius: "var(--radius-lg)",
        border: "1px solid var(--color-border)",
        margin: "2rem 0",
      }}
    >
      <div
        style={{
          fontSize: "0.62rem",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          color: "var(--color-text-3)",
          marginBottom: "1rem",
        }}
      >
        Developer Humor
      </div>
      {children}
      {caption && (
        <p
          style={{
            fontSize: "0.78rem",
            color: "var(--color-text-3)",
            marginTop: "0.75rem",
            fontStyle: "italic",
          }}
        >
          {caption}
        </p>
      )}
    </div>
  );
}
