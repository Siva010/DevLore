"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Clock, Sparkles, Moon, Sun } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { getRecentArticles, CHARACTERS, toArticleCard } from "@/lib/data";
import { CATEGORIES, type ArticleCard } from "@/types";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", bounce: 0.4, duration: 0.8 } }
};

const listItemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { type: "spring", bounce: 0.4 } }
};

/* ============================================================
   MINI ARTICLE CARD — for "Begin from here" row
   ============================================================ */
function BeginCard({ article }: { article: ArticleCard }) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      style={{ textDecoration: "none", display: "block", flex: "1 1 0", minWidth: 0 }}
    >
      <motion.article
        variants={cardVariants}
        whileHover={{ y: -6, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="begin-card"
        style={{
          borderRadius: "var(--radius-lg)",
          border: "1px solid var(--color-border)",
          background: "var(--color-surface)",
          overflow: "hidden",
          cursor: "pointer",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Cover - Kept blank */}
        <div style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden", flexShrink: 0, background: "var(--color-surface-2)" }}>
        </div>
        {/* Body */}
        <div style={{ padding: "0.9rem 1rem", flex: 1, display: "flex", flexDirection: "column", gap: "0.4rem" }}>
          <span
            style={{
              fontSize: "0.62rem",
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "var(--color-accent)",
            }}
          >
            {article.category}
          </span>
          <h4
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "0.875rem",
              fontWeight: 700,
              lineHeight: 1.25,
              letterSpacing: "-0.01em",
              color: "var(--color-text-1)",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {article.title}
          </h4>
          <span
            style={{
              marginTop: "auto",
              fontSize: "0.68rem",
              color: "var(--color-text-3)",
              display: "flex",
              alignItems: "center",
              gap: "3px",
            }}
          >
            <Clock size={10} /> {article.readingTime} min read
          </span>
        </div>
      </motion.article>
    </Link>
  );
}

/* ============================================================
   HOMEPAGE
   ============================================================ */
export default function HomePage() {
  const recent = getRecentArticles(6).map(toArticleCard);
  const beginCards = recent.slice(0, 4);

  const [query, setQuery] = useState("");
  const [isDark, setIsDark] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  const toggleTheme = () => {
    const currentlyDark = document.documentElement.classList.contains("dark");
    if (currentlyDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("devlore-theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("devlore-theme", "dark");
      setIsDark(true);
    }
  };

  return (
    <div style={{ background: "var(--color-bg)" }}>

      {/* ============================================================
          STICKY TRIANGULAR NAVBAR
          ============================================================ */}
      <section
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          /* A strong drop shadow that will perfectly trace the triangular clip-path! */
          filter: "drop-shadow(0 15px 25px rgba(0,0,0,0.2))",
        }}
      >
        <div
          style={{
            /* Use surface color instead of bg to create distinction */
            background: "color-mix(in srgb, var(--color-surface) 90%, transparent)",
            backdropFilter: "blur(24px) saturate(180%)",
            WebkitBackdropFilter: "blur(24px) saturate(180%)",
            /* The shape: Flat top, down left and right, peaking up in the center */
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% calc(100% - 25px), 0 100%)",
            paddingBottom: "2.5rem",
          }}
        >
        {/* ── Peak: logo centered at top ── */}
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", bounce: 0.5, delay: 0.1 }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: "0.75rem",
            position: "relative",
            zIndex: 10,
            width: "max-content",
            margin: "0 auto",
          }}
        >
          {/* Brand name */}
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--color-text-2)",
              marginBottom: "0.2rem",
            }}
          >
            Devlore
          </div>

          {/* Theme Toggle Button */}
          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.15, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
            style={{
              width: 40,
              height: 40,
              borderRadius: "var(--radius-md)",
              background: "var(--color-text-1)",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.2rem",
              boxShadow: "none",
              cursor: "pointer",
              color: "var(--color-bg)",
            }}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button>
        </motion.div>

        {/* ── Read / Write flanking labels ── */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            padding: "0 clamp(1.5rem, 6vw, 6rem)",
            marginTop: "-2rem", /* Pull up to fit under the cut better */
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* LEFT: Read */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", bounce: 0.5 }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
          >
            <Link href="/topics" style={{ textDecoration: "none" }}>
              <motion.span
                whileHover={{ scale: 1.05, color: "var(--color-accent)" }}
                className="read-write-label"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2rem, 4vw, 3.25rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.04em",
                  color: "var(--color-text-1)",
                  lineHeight: 1,
                  display: "block",
                  transform: "rotate(-3deg)",
                }}
              >
                Read
              </motion.span>
            </Link>
          </motion.div>

          {/* RIGHT: Write */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", bounce: 0.5 }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
          >
            <Link href="/admin/articles/new" style={{ textDecoration: "none" }}>
              <motion.span
                whileHover={{ scale: 1.05, color: "var(--color-accent)" }}
                className="read-write-label"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2rem, 4vw, 3.25rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.04em",
                  color: "var(--color-text-1)",
                  lineHeight: 1,
                  display: "block",
                  transform: "rotate(3deg)",
                }}
              >
                Write
              </motion.span>
            </Link>
          </motion.div>
        </div>
        </div>
      </section>

      {/* ============================================================
          QUOTE & SEARCH SECTION
          ============================================================ */}
      <section style={{ paddingBottom: "2rem", borderBottom: "1px solid var(--color-border)", marginTop: "2rem" }}>
        {/* ── Central Quote ── */}
        <div
          style={{
            textAlign: "center",
            padding: "0 clamp(1.5rem, 8vw, 12rem) 1.5rem",
          }}
        >
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", bounce: 0.4 }}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.25rem, 3.5vw, 2rem)",
              fontWeight: 700,
              lineHeight: 1.35,
              letterSpacing: "-0.03em",
              color: "var(--color-text-1)",
              margin: 0,
              fontStyle: "normal",
            }}
          >
            &ldquo; Every Lore that you need to know
            <br />
            about development &rdquo;
          </motion.blockquote>
        </div>

        {/* ── Search Bar ── */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "0 1.5rem",
          }}
        >
          <motion.form
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", bounce: 0.5, delay: 0.1 }}
            onSubmit={handleSearch}
            style={{
              width: "100%",
              maxWidth: "480px",
              display: "flex",
            }}
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
              className="hero-search"
              style={{
                width: "100%",
                padding: "12px 20px",
                fontSize: "1rem",
                fontFamily: "var(--font-body)",
                border: "1.5px solid var(--color-border-2)",
                borderRadius: "var(--radius-md)",
                background: "var(--color-surface)",
                color: "var(--color-text-1)",
                outline: "none",
                textAlign: "center",
                letterSpacing: "0.01em",
                transition: "border-color var(--transition-fast), box-shadow var(--transition-fast)",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "var(--color-accent)";
                e.currentTarget.style.boxShadow = "0 0 0 3px var(--color-accent-subtle)";
                e.currentTarget.style.textAlign = "left";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "var(--color-border-2)";
                e.currentTarget.style.boxShadow = "none";
                if (!query) e.currentTarget.style.textAlign = "center";
              }}
            />
          </motion.form>
        </div>
      </section>

      {/* ============================================================
          BEGIN FROM HERE — 4-card horizontal row
          ============================================================ */}
      <section style={{ padding: "2.5rem 0", borderBottom: "1px solid var(--color-border)" }}>
        <div className="container">
          <div
            style={{
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-xl)",
              padding: "1.25rem",
              background: "var(--color-surface)",
            }}
          >
            <p
              style={{
                fontSize: "0.72rem",
                fontWeight: 600,
                letterSpacing: "0.04em",
                color: "var(--color-text-3)",
                marginBottom: "1rem",
                textTransform: "uppercase",
                fontFamily: "var(--font-mono)",
              }}
            >
              Begin from here
            </p>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "0.875rem",
              }}
              className="begin-grid"
            >
              {beginCards.map((article) => (
                <BeginCard key={article.slug} article={article} />
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================================
          TOPICS + CHARACTERS — two-column plain list
          ============================================================ */}
      <section style={{ padding: "3.5rem 0", borderBottom: "1px solid var(--color-border)" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "4rem",
              textAlign: "center",
            }}
            className="tc-grid"
          >
            {/* Topics */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                  color: "var(--color-text-1)",
                  marginBottom: "2rem",
                }}
              >
                Topics
              </h2>
              <motion.ul 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "1rem", alignItems: "center" }}
              >
                {CATEGORIES.map((cat) => (
                  <motion.li key={cat.slug} variants={listItemVariants} whileHover={{ x: 5 }}>
                    <Link
                      href={`/topics/${cat.slug}`}
                      className="tc-link"
                      style={{
                        textDecoration: "none",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        fontSize: "1.25rem",
                        color: "var(--color-text-2)",
                        fontFamily: "var(--font-mono)",
                        transition: "color var(--transition-fast)",
                      }}
                    >
                      {cat.name}
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            </div>

            {/* Characters */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                  color: "var(--color-text-1)",
                  marginBottom: "2rem",
                }}
              >
                Characters
              </h2>
              <motion.ul 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "1rem", alignItems: "center" }}
              >
                {CHARACTERS.map((char) => (
                  <motion.li key={char.slug} variants={listItemVariants} whileHover={{ x: 5 }}>
                    <Link
                      href={`/characters/${char.slug}`}
                      className="tc-link"
                      style={{
                        textDecoration: "none",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        fontSize: "1.25rem",
                        color: "var(--color-text-2)",
                        fontFamily: "var(--font-mono)",
                        transition: "color var(--transition-fast)",
                      }}
                    >
                      {char.name}
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          NEWSLETTER CTA
          ============================================================ */}
      <section style={{ padding: "5rem 0" }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ type: "spring", bounce: 0.4 }}
            style={{
              maxWidth: "640px",
              margin: "0 auto",
              borderRadius: "var(--radius-xl)",
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              padding: "3.5rem 2.5rem",
              textAlign: "center",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            {/* Badge */}
            <div
              className="badge badge-accent"
              style={{ display: "inline-flex", marginBottom: "1.5rem", gap: "5px" }}
            >
              <Sparkles size={10} /> Weekly Digest
            </div>

            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                fontWeight: 800,
                letterSpacing: "-0.04em",
                color: "var(--color-text-1)",
                marginBottom: "0.75rem",
                lineHeight: 1.1,
              }}
            >
              Never Miss a Story
            </h2>
            <p
              style={{
                fontSize: "0.9rem",
                color: "var(--color-text-2)",
                lineHeight: 1.75,
                maxWidth: "380px",
                margin: "0 auto 2rem",
              }}
            >
              Join developers who get the best technical stories in their inbox. One email a week. No fluff.
            </p>

            {/* Email row */}
            <div
              style={{
                display: "flex",
                gap: "8px",
                maxWidth: "380px",
                margin: "0 auto",
              }}
            >
              <input
                type="email"
                placeholder="your@email.com"
                style={{
                  flex: 1,
                  padding: "11px 14px",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--color-border)",
                  background: "var(--color-bg)",
                  color: "var(--color-text-1)",
                  fontSize: "0.875rem",
                  fontFamily: "var(--font-body)",
                  outline: "none",
                  minWidth: 0,
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "var(--color-accent)";
                  e.currentTarget.style.boxShadow = "0 0 0 3px var(--color-accent-subtle)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "var(--color-border)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
              <button className="btn btn-accent" style={{ whiteSpace: "nowrap" }}>
                Subscribe
              </button>
            </div>

            <p style={{ color: "var(--color-text-3)", fontSize: "0.7rem", marginTop: "0.875rem" }}>
              No spam. Unsubscribe anytime.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Scoped styles ── */}
      <style>{`
        .read-write-label:hover { color: var(--color-accent) !important; }
        .tc-link:hover { color: var(--color-text-1) !important; }

        @media (max-width: 700px) {
          .begin-grid { grid-template-columns: 1fr 1fr !important; }
          .tc-grid    { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
        }
        @media (max-width: 420px) {
          .begin-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
