"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save, Send, Tag, Star, Image as ImageIcon, Users } from "lucide-react";
import { CATEGORIES } from "@/types";
import { CHARACTERS as CHAR_DATA } from "@/lib/data";

const SAMPLE_MDX = `## The Hook

<StoryPanel title="Scene Setup">
  Imagine a nightclub with the world's most paranoid bouncer...
</StoryPanel>

## The Story

<CharacterQuote character="Dave the Database" emoji="🗄️" color="var(--color-green)">
  I don't commit unless I'm absolutely certain.
</CharacterQuote>

## Technical Explanation

Your explanation here...

<FunFact>
  Interesting fact about the topic...
</FunFact>

## Common Mistakes

<CommonMistake title="The Classic Error">
  What developers get wrong...
</CommonMistake>

## Interview Question

<InterviewQuestion question="How does X work?">
  The answer...
</InterviewQuestion>

## Quick Revision

<QuickRevision items={[
  "Point one",
  "Point two",
  "Point three",
]} />
`;

export default function ArticleEditorPage() {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [hook, setHook] = useState("");
  const [content, setContent] = useState(SAMPLE_MDX);
  const [category, setCategory] = useState<string>(CATEGORIES[0].name);
  const [tags, setTags] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [featured, setFeatured] = useState(false);
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [selectedChars, setSelectedChars] = useState<string[]>([]);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<"write" | "preview">("write");

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const toggleChar = (slug: string) => {
    setSelectedChars((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-paper)", display: "flex", flexDirection: "column" }}>
      {/* Top Bar */}
      <div style={{ borderBottom: "1px solid var(--color-border)", background: "var(--color-surface)", padding: "0.875rem 0", position: "sticky", top: 0, zIndex: 50 }}>
        <div className="container" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Link href="/admin/dashboard" className="btn btn-ghost" style={{ padding: "6px 10px", fontSize: "0.8rem" }}>
            <ArrowLeft size={14} /> Dashboard
          </Link>
          <div style={{ flex: 1, fontWeight: 600, fontSize: "0.875rem", color: "var(--color-text-muted)" }}>
            New Article
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <button onClick={handleSave} className="btn btn-secondary" style={{ fontSize: "0.8rem", padding: "7px 14px" }}>
              <Save size={14} /> {saved ? "Saved!" : "Save Draft"}
            </button>
            <button
              onClick={() => setStatus("published")}
              className="btn btn-primary"
              style={{ fontSize: "0.8rem", padding: "7px 14px" }}
            >
              <Send size={14} /> Publish
            </button>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 300px", gap: "1.5rem", padding: "1.5rem", alignItems: "start" }} className="editor-grid container">
        {/* Editor Panel */}
        <div>
          {/* Title */}
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Article title..."
            style={{
              width: "100%",
              border: "none",
              background: "transparent",
              fontSize: "clamp(1.5rem, 4vw, 2rem)",
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              color: "var(--color-text-primary)",
              outline: "none",
              marginBottom: "0.75rem",
              padding: "0.5rem 0",
              borderBottom: "2px solid var(--color-border)",
            }}
          />

          {/* Subtitle */}
          <input
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            placeholder="Subtitle — one sentence that sells the story..."
            style={{
              width: "100%",
              border: "none",
              background: "transparent",
              fontSize: "1rem",
              color: "var(--color-text-secondary)",
              outline: "none",
              marginBottom: "0.75rem",
              padding: "0.5rem 0",
              borderBottom: "1px solid var(--color-border)",
            }}
          />

          {/* Hook */}
          <textarea
            value={hook}
            onChange={(e) => setHook(e.target.value)}
            placeholder="The opening hook — one funny/memorable analogy sentence..."
            rows={2}
            style={{
              width: "100%",
              border: "none",
              background: "transparent",
              fontSize: "0.9rem",
              fontStyle: "italic",
              color: "var(--color-text-secondary)",
              outline: "none",
              resize: "none",
              marginBottom: "1rem",
              padding: "0.5rem 0",
              borderBottom: "1px solid var(--color-border)",
              fontFamily: "var(--font-display)",
            }}
          />

          {/* Editor tabs */}
          <div style={{ display: "flex", gap: "4px", marginBottom: "1rem", borderBottom: "1px solid var(--color-border)", paddingBottom: "0" }}>
            {(["write", "preview"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: "8px 16px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  color: activeTab === tab ? "var(--color-accent)" : "var(--color-text-muted)",
                  borderBottom: activeTab === tab ? "2px solid var(--color-accent)" : "2px solid transparent",
                  marginBottom: "-1px",
                  textTransform: "capitalize",
                  transition: "color var(--transition-fast)",
                }}
              >
                {tab === "write" ? "✏️ Write" : "👁 Preview"}
              </button>
            ))}
          </div>

          {activeTab === "write" ? (
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your article in MDX..."
              style={{
                width: "100%",
                minHeight: "60vh",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-md)",
                background: "var(--color-surface)",
                color: "var(--color-text-primary)",
                fontFamily: "var(--font-mono)",
                fontSize: "0.875rem",
                lineHeight: 1.7,
                padding: "1.25rem",
                outline: "none",
                resize: "vertical",
                transition: "border-color var(--transition-fast)",
              }}
              onFocus={(e) => (e.target.style.borderColor = "var(--color-teal)")}
              onBlur={(e) => (e.target.style.borderColor = "var(--color-border)")}
            />
          ) : (
            <div
              className="prose"
              style={{
                padding: "1.5rem",
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-md)",
                minHeight: "60vh",
              }}
            >
              <pre style={{ whiteSpace: "pre-wrap", fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--color-text-secondary)" }}>
                {content || "Nothing to preview yet..."}
              </pre>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", position: "sticky", top: "72px" }}>
          {/* Status */}
          <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)", padding: "1rem" }}>
            <h3 style={{ fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--color-text-muted)", marginBottom: "0.75rem" }}>
              Status
            </h3>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as "draft" | "published")}
              style={{
                width: "100%",
                padding: "8px 10px",
                borderRadius: "var(--radius-sm)",
                border: "1px solid var(--color-border)",
                background: "var(--color-surface-2)",
                color: "var(--color-text-primary)",
                fontSize: "0.85rem",
                outline: "none",
                cursor: "pointer",
              }}
            >
              <option value="draft">📝 Draft</option>
              <option value="published">✅ Published</option>
              <option value="scheduled">🕐 Scheduled</option>
            </select>
          </div>

          {/* Category */}
          <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)", padding: "1rem" }}>
            <h3 style={{ fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--color-text-muted)", marginBottom: "0.75rem" }}>
              Category
            </h3>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{
                width: "100%",
                padding: "8px 10px",
                borderRadius: "var(--radius-sm)",
                border: "1px solid var(--color-border)",
                background: "var(--color-surface-2)",
                color: "var(--color-text-primary)",
                fontSize: "0.85rem",
                outline: "none",
                cursor: "pointer",
              }}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.slug} value={cat.name}>{cat.emoji} {cat.name}</option>
              ))}
            </select>
          </div>

          {/* Tags */}
          <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)", padding: "1rem" }}>
            <h3 style={{ fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--color-text-muted)", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "5px" }}>
              <Tag size={12} /> Tags
            </h3>
            <input
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="ACID, PostgreSQL, Transactions"
              style={{
                width: "100%",
                padding: "8px 10px",
                borderRadius: "var(--radius-sm)",
                border: "1px solid var(--color-border)",
                background: "var(--color-surface-2)",
                color: "var(--color-text-primary)",
                fontSize: "0.85rem",
                outline: "none",
              }}
            />
            <p style={{ fontSize: "0.7rem", color: "var(--color-text-muted)", marginTop: "4px" }}>Comma-separated</p>
          </div>

          {/* Cover Image */}
          <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)", padding: "1rem" }}>
            <h3 style={{ fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--color-text-muted)", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "5px" }}>
              <ImageIcon size={12} /> Cover Image
            </h3>
            <input
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              placeholder="https://..."
              style={{
                width: "100%",
                padding: "8px 10px",
                borderRadius: "var(--radius-sm)",
                border: "1px solid var(--color-border)",
                background: "var(--color-surface-2)",
                color: "var(--color-text-primary)",
                fontSize: "0.85rem",
                outline: "none",
              }}
            />
          </div>

          {/* Characters */}
          <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)", padding: "1rem" }}>
            <h3 style={{ fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--color-text-muted)", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "5px" }}>
              <Users size={12} /> Characters
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {CHAR_DATA.map((char) => (
                <label
                  key={char.slug}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    cursor: "pointer",
                    padding: "5px 8px",
                    borderRadius: "var(--radius-sm)",
                    background: selectedChars.includes(char.slug) ? `${char.color}12` : "transparent",
                    border: `1px solid ${selectedChars.includes(char.slug) ? char.color + "35" : "transparent"}`,
                    transition: "all var(--transition-fast)",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={selectedChars.includes(char.slug)}
                    onChange={() => toggleChar(char.slug)}
                    style={{ accentColor: char.color }}
                  />
                  <span style={{ fontSize: "0.875rem" }}>{char.emoji}</span>
                  <span style={{ fontSize: "0.8rem", color: "var(--color-text-primary)" }}>{char.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Featured */}
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "1rem",
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-md)",
              cursor: "pointer",
            }}
          >
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              style={{ accentColor: "var(--color-gold)", width: 16, height: 16 }}
            />
            <Star size={15} style={{ color: "var(--color-gold)" }} />
            <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--color-text-primary)" }}>
              Featured Article
            </span>
          </label>
        </div>
      </div>

      <style>{`
        .editor-grid {
          grid-template-columns: 1fr !important;
        }
        @media (min-width: 900px) {
          .editor-grid {
            grid-template-columns: 1fr 300px !important;
          }
        }
      `}</style>
    </div>
  );
}
