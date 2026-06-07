"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Search, Moon, Sun, Menu, X, BookOpen, Zap } from "lucide-react";
import { CATEGORIES } from "@/types";

export default function Navbar() {
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("devlore-theme");
    if (saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      setDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("devlore-theme", next ? "dark" : "light");
  };

  return (
    <nav
      className="navbar"
      style={{ boxShadow: scrolled ? "var(--shadow-card)" : "none" }}
    >
      <div className="container" style={{ display: "flex", alignItems: "center", height: "64px", gap: "1rem" }}>
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
          <div
            style={{
              width: 32, height: 32,
              background: "linear-gradient(135deg, var(--color-accent), var(--color-purple))",
              borderRadius: "8px",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <BookOpen size={16} color="white" strokeWidth={2.5} />
          </div>
          <span
            className="font-display"
            style={{ fontSize: "1.25rem", fontWeight: 700, letterSpacing: "-0.03em", color: "var(--color-text-primary)" }}
          >
            Dev<span style={{ color: "var(--color-accent)" }}>Lore</span>
          </span>
        </Link>

        {/* Desktop nav links */}
        <div
          style={{ display: "flex", alignItems: "center", gap: "0.25rem", marginLeft: "1rem", flex: 1 }}
          className="desktop-nav"
        >
          {CATEGORIES.slice(0, 5).map((cat) => (
            <Link
              key={cat.slug}
              href={`/topics/${cat.slug}`}
              style={{
                padding: "6px 12px",
                borderRadius: "var(--radius-sm)",
                fontSize: "0.82rem",
                fontWeight: 500,
                color: "var(--color-text-secondary)",
                transition: "all var(--transition-fast)",
                whiteSpace: "nowrap",
              }}
              className="nav-link"
            >
              {cat.emoji} {cat.name}
            </Link>
          ))}
          <Link
            href="/characters"
            style={{
              padding: "6px 12px",
              borderRadius: "var(--radius-sm)",
              fontSize: "0.82rem",
              fontWeight: 500,
              color: "var(--color-text-secondary)",
              transition: "all var(--transition-fast)",
            }}
            className="nav-link"
          >
            🎭 Characters
          </Link>
        </div>

        {/* Right actions */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
          <Link
            href="/search"
            className="btn btn-ghost"
            style={{ padding: "8px", borderRadius: "var(--radius-sm)" }}
            aria-label="Search"
          >
            <Search size={18} />
          </Link>
          <button
            onClick={toggleDark}
            className="btn btn-ghost"
            style={{ padding: "8px", borderRadius: "var(--radius-sm)" }}
            aria-label="Toggle dark mode"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <Link href="/admin/dashboard" className="btn btn-primary" style={{ padding: "8px 16px", fontSize: "0.82rem" }}>
            <Zap size={14} />
            Write
          </Link>
          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="btn btn-ghost mobile-menu-btn"
            style={{ padding: "8px" }}
            aria-label="Menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            borderTop: "1px solid var(--color-border)",
            background: "var(--color-paper)",
            padding: "1rem",
          }}
        >
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/topics/${cat.slug}`}
              onClick={() => setMenuOpen(false)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 8px",
                borderRadius: "var(--radius-sm)",
                fontSize: "0.9rem",
                color: "var(--color-text-secondary)",
              }}
            >
              {cat.emoji} {cat.name}
            </Link>
          ))}
          <Link
            href="/characters"
            onClick={() => setMenuOpen(false)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 8px",
              borderRadius: "var(--radius-sm)",
              fontSize: "0.9rem",
              color: "var(--color-text-secondary)",
            }}
          >
            🎭 Characters
          </Link>
        </div>
      )}

      <style jsx>{`
        .desktop-nav { display: none; }
        .mobile-menu-btn { display: flex; }
        @media (min-width: 900px) {
          .desktop-nav { display: flex; }
          .mobile-menu-btn { display: none; }
        }
        .nav-link:hover {
          background: var(--color-surface-2);
          color: var(--color-text-primary);
        }
      `}</style>
    </nav>
  );
}
