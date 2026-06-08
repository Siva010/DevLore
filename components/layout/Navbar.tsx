"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Search, Moon, Sun, Menu, X, Zap } from "lucide-react";
import { CATEGORIES } from "@/types";

export default function Navbar() {
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("devlore-theme");
    const isThemeDark = saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches);
    if (isThemeDark) {
      const frame = requestAnimationFrame(() => {
        setDark(true);
      });
      document.documentElement.classList.add("dark");
      return () => cancelAnimationFrame(frame);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("devlore-theme", next ? "dark" : "light");
  };

  return (
    <>
      <nav
        className="navbar"
        style={{
          boxShadow: scrolled ? "var(--shadow-sm)" : "none",
        }}
      >
        <div
          className="container"
          style={{ display: "flex", alignItems: "center", height: "64px", gap: "0.5rem" }}
        >
          {/* Logo */}
          <Link
            href="/"
            style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0, marginRight: "1rem" }}
          >
            {/* Monogram */}
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: "var(--radius-sm)",
                background: "var(--color-text-1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "0.7rem",
                  fontWeight: 800,
                  color: "var(--color-bg)",
                  letterSpacing: "-0.03em",
                }}
              >
                DL
              </span>
            </div>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.05rem",
                fontWeight: 700,
                letterSpacing: "-0.04em",
                color: "var(--color-text-1)",
              }}
            >
              DevLore
            </span>
          </Link>

          {/* Desktop nav links */}
          <div
            style={{ display: "flex", alignItems: "center", gap: "2px", flex: 1 }}
            className="desktop-nav"
          >
            {CATEGORIES.slice(0, 5).map((cat) => (
              <Link
                key={cat.slug}
                href={`/topics/${cat.slug}`}
                className="nav-link"
                style={{
                  padding: "5px 11px",
                  borderRadius: "var(--radius-sm)",
                  fontSize: "0.82rem",
                  fontWeight: 500,
                  color: "var(--color-text-2)",
                  transition: "all var(--transition-fast)",
                  whiteSpace: "nowrap",
                }}
              >
                {cat.name}
              </Link>
            ))}
            <Link
              href="/characters"
              className="nav-link"
              style={{
                padding: "5px 11px",
                borderRadius: "var(--radius-sm)",
                fontSize: "0.82rem",
                fontWeight: 500,
                color: "var(--color-text-2)",
                transition: "all var(--transition-fast)",
              }}
            >
              Characters
            </Link>
          </div>

          {/* Right actions */}
          <div style={{ display: "flex", alignItems: "center", gap: "4px", flexShrink: 0 }}>
            <Link
              href="/search"
              className="btn btn-ghost"
              style={{ padding: "7px 10px", gap: "6px", fontSize: "0.8rem", borderRadius: "var(--radius-sm)" }}
              aria-label="Search"
            >
              <Search size={15} />
              <span className="search-label">Search</span>
            </Link>
            <button
              onClick={toggleDark}
              className="btn btn-ghost"
              style={{ padding: "7px", borderRadius: "var(--radius-sm)" }}
              aria-label="Toggle dark mode"
            >
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <Link
              href="/admin/dashboard"
              className="btn btn-primary"
              style={{ padding: "7px 14px", fontSize: "0.8rem", gap: "5px" }}
            >
              <Zap size={13} />
              Write
            </Link>
            {/* Mobile menu toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="btn btn-ghost mobile-menu-btn"
              style={{ padding: "7px" }}
              aria-label="Menu"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay menu */}
      {menuOpen && (
        <div
          className="mobile-overlay"
          onClick={() => setMenuOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99,
            background: "rgba(0,0,0,0.4)",
          }}
        />
      )}
      <div
        className={`mobile-menu ${menuOpen ? "mobile-menu-open" : ""}`}
        style={{
          position: "fixed",
          top: "64px",
          left: 0,
          right: 0,
          zIndex: 100,
          background: "var(--color-bg)",
          borderBottom: "1px solid var(--color-border)",
          padding: "1.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "2px",
          boxShadow: "var(--shadow-lg)",
          transform: menuOpen ? "translateY(0)" : "translateY(-100%)",
          opacity: menuOpen ? 1 : 0,
          transition: "transform var(--transition-base), opacity var(--transition-base)",
          pointerEvents: menuOpen ? "all" : "none",
        }}
      >
        <div
          style={{
            fontSize: "0.65rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "var(--color-text-3)",
            marginBottom: "0.5rem",
            paddingLeft: "10px",
          }}
        >
          Topics
        </div>
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.slug}
            href={`/topics/${cat.slug}`}
            onClick={() => setMenuOpen(false)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px 10px",
              borderRadius: "var(--radius-md)",
              fontSize: "0.9rem",
              fontWeight: 500,
              color: "var(--color-text-2)",
              transition: "all var(--transition-fast)",
            }}
            className="mobile-nav-link"
          >
            <span style={{ fontSize: "1.1rem" }}>{cat.emoji}</span>
            {cat.name}
          </Link>
        ))}
        <div style={{ margin: "0.75rem 0", borderTop: "1px solid var(--color-border)" }} />
        <Link
          href="/characters"
          onClick={() => setMenuOpen(false)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "10px 10px",
            borderRadius: "var(--radius-md)",
            fontSize: "0.9rem",
            fontWeight: 500,
            color: "var(--color-text-2)",
          }}
          className="mobile-nav-link"
        >
          <span style={{ fontSize: "1.1rem" }}>🎭</span>
          Characters
        </Link>
        <Link
          href="/search"
          onClick={() => setMenuOpen(false)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "10px 10px",
            borderRadius: "var(--radius-md)",
            fontSize: "0.9rem",
            fontWeight: 500,
            color: "var(--color-text-2)",
          }}
          className="mobile-nav-link"
        >
          <Search size={16} />
          Search
        </Link>
      </div>

      <style>{`
        .desktop-nav { display: none; }
        .mobile-menu-btn { display: flex; }
        .search-label { display: none; }
        @media (min-width: 900px) {
          .desktop-nav { display: flex; }
          .mobile-menu-btn { display: none; }
          .mobile-menu { display: none !important; }
          .mobile-overlay { display: none !important; }
          .search-label { display: inline; }
        }
        .nav-link:hover {
          background: var(--color-surface-2);
          color: var(--color-text-1);
        }
        .mobile-nav-link:hover {
          background: var(--color-surface-2);
          color: var(--color-text-1);
        }
      `}</style>
    </>
  );
}
