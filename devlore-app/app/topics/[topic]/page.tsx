import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Clock, ArrowRight } from "lucide-react";
import { type Metadata } from "next";
import { getArticlesByCategory } from "@/lib/data";
import { CATEGORIES, type Category } from "@/types";
import { buildCategoryMetadata } from "@/lib/seo";
import { formatDistanceToNow } from "date-fns";

type PageProps = { params: Promise<{ topic: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { topic } = await params;
  const cat = CATEGORIES.find((c) => c.slug === topic);
  if (!cat) return { title: "Not Found | DevLore" };
  return buildCategoryMetadata(cat.name, cat.description);
}

export async function generateStaticParams() {
  return CATEGORIES.map((c) => ({ topic: c.slug }));
}

export default async function TopicPage({ params }: PageProps) {
  const { topic } = await params;
  const cat = CATEGORIES.find((c) => c.slug === topic);
  if (!cat) notFound();

  const articles = getArticlesByCategory(cat.name as Category);

  return (
    <div>
      {/* Topic Hero */}
      <section
        style={{
          padding: "5rem 0 3rem",
          background: `linear-gradient(135deg, color-mix(in srgb, var(--color-accent) 5%, var(--color-paper)) 0%, var(--color-paper) 100%)`,
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <div className="container">
          <div style={{ maxWidth: "680px" }}>
            <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>{cat.emoji}</div>
            <h1 className="font-display" style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 900, marginBottom: "1rem" }}>
              {cat.name}
            </h1>
            <p style={{ fontSize: "1.1rem", lineHeight: 1.7, color: "var(--color-text-secondary)", maxWidth: "540px" }}>
              {cat.description}
            </p>
            <div style={{ marginTop: "1.5rem" }}>
              <span className="badge badge-muted" style={{ fontSize: "0.8rem" }}>
                {articles.length} {articles.length === 1 ? "article" : "articles"}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Articles */}
      <section style={{ padding: "3rem 0 5rem" }}>
        <div className="container">
          {articles.length === 0 ? (
            <div style={{ textAlign: "center", padding: "4rem 0", color: "var(--color-text-muted)" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✍️</div>
              <h3 className="font-display" style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>Coming Soon</h3>
              <p>We&apos;re working on stories for this topic. Check back soon!</p>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
              {articles.map((article) => (
                <Link key={article.slug} href={`/articles/${article.slug}`} style={{ textDecoration: "none" }}>
                  <article className="card" style={{ overflow: "hidden", height: "100%", display: "flex", flexDirection: "column" }}>
                    <div style={{ position: "relative", aspectRatio: "16/10", overflow: "hidden" }}>
                      <Image
                        src={article.coverImage}
                        alt={article.title}
                        fill
                        style={{ objectFit: "cover" }}
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      {article.featured && (
                        <div style={{ position: "absolute", top: "12px", left: "12px", background: "linear-gradient(135deg, var(--color-accent), var(--color-purple))", color: "white", padding: "3px 10px", borderRadius: "999px", fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase" }}>
                          ✦ Featured
                        </div>
                      )}
                    </div>
                    <div style={{ padding: "1.25rem", flex: 1, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ fontSize: "0.72rem", color: "var(--color-text-muted)", display: "flex", alignItems: "center", gap: "4px" }}>
                          <Clock size={11} /> {article.readingTime} min read
                        </span>
                      </div>
                      <h2 className="font-display" style={{ fontSize: "1.1rem", fontWeight: 700, lineHeight: 1.25, color: "var(--color-text-primary)" }}>
                        {article.title}
                      </h2>
                      <p style={{ fontSize: "0.875rem", lineHeight: 1.6, color: "var(--color-text-secondary)", flex: 1 }}>
                        {article.hook}
                      </p>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto" }}>
                        <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>
                          {article.publishedAt ? formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true }) : "Draft"}
                        </span>
                        <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--color-accent)", display: "flex", alignItems: "center", gap: "4px" }}>
                          Read <ArrowRight size={12} />
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
