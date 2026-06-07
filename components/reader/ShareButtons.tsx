"use client";

import { useState } from "react";
import { Share2, ExternalLink, Link2, Check } from "lucide-react";

export default function ShareButtons({ title, url }: { title: string; url: string }) {
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", marginRight: "4px" }}>Share</span>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-ghost"
        style={{ padding: "8px", borderRadius: "var(--radius-sm)", border: "1px solid var(--color-border)" }}
        aria-label="Share on Twitter"
      >
        <Share2 size={15} />
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-ghost"
        style={{ padding: "8px", borderRadius: "var(--radius-sm)", border: "1px solid var(--color-border)" }}
        aria-label="Share on LinkedIn"
      >
        <ExternalLink size={15} />
      </a>
      <button
        onClick={copyLink}
        className="btn btn-ghost"
        style={{ padding: "8px", borderRadius: "var(--radius-sm)", border: "1px solid var(--color-border)" }}
        aria-label="Copy link"
      >
        {copied ? <Check size={15} style={{ color: "var(--color-green)" }} /> : <Link2 size={15} />}
      </button>
    </div>
  );
}
