"use client";

import { useState } from "react";
import { Check, Copy, Share2, ExternalLink } from "lucide-react";

export default function ShareButtons({ title, url }: { title: string; url: string }) {
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="share-btn"
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 34,
          height: 34,
          borderRadius: "var(--radius-sm)",
          border: "1px solid var(--color-border)",
          background: "var(--color-surface)",
          color: "var(--color-text-2)",
          transition: "all var(--transition-fast)",
          cursor: "pointer",
        }}
        aria-label="Share on Twitter"
      >
        <Share2 size={14} />
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="share-btn"
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 34,
          height: 34,
          borderRadius: "var(--radius-sm)",
          border: "1px solid var(--color-border)",
          background: "var(--color-surface)",
          color: "var(--color-text-2)",
          transition: "all var(--transition-fast)",
          cursor: "pointer",
        }}
        aria-label="Share on LinkedIn"
      >
        <ExternalLink size={14} />
      </a>
      <button
        onClick={copyLink}
        className="share-btn"
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "5px",
          height: 34,
          padding: "0 12px",
          borderRadius: "var(--radius-sm)",
          border: "1px solid var(--color-border)",
          background: copied ? "var(--color-accent)" : "var(--color-surface)",
          color: copied ? "white" : "var(--color-text-2)",
          transition: "all var(--transition-fast)",
          cursor: "pointer",
          fontSize: "0.75rem",
          fontWeight: 500,
          fontFamily: "var(--font-body)",
        }}
        aria-label="Copy link"
      >
        {copied ? (
          <>
            <Check size={13} />
            Copied!
          </>
        ) : (
          <>
            <Copy size={13} />
            Copy link
          </>
        )}
      </button>

      <style>{`
        .share-btn:hover:not([style*="background: var(--color-accent)"]) {
          border-color: var(--color-border-2) !important;
          color: var(--color-text-1) !important;
          background: var(--color-surface-2) !important;
        }
      `}</style>
    </div>
  );
}
