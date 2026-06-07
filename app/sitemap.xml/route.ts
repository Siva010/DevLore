import { ARTICLES } from "@/lib/data";
import { CATEGORIES } from "@/types";
import { SITE_URL } from "@/lib/seo";

export async function GET() {
  const publishedArticles = ARTICLES.filter((a) => a.status === "published");

  const staticPages = [
    { url: SITE_URL, lastMod: new Date().toISOString(), priority: "1.0", changefreq: "daily" },
    { url: `${SITE_URL}/characters`, lastMod: new Date().toISOString(), priority: "0.8", changefreq: "weekly" },
    { url: `${SITE_URL}/search`, lastMod: new Date().toISOString(), priority: "0.6", changefreq: "monthly" },
    ...CATEGORIES.map((cat) => ({
      url: `${SITE_URL}/topics/${cat.slug}`,
      lastMod: new Date().toISOString(),
      priority: "0.8",
      changefreq: "weekly",
    })),
  ];

  const articlePages = publishedArticles.map((article) => ({
    url: `${SITE_URL}/articles/${article.slug}`,
    lastMod: article.updatedAt,
    priority: article.featured ? "0.9" : "0.7",
    changefreq: "monthly",
  }));

  const allPages = [...staticPages, ...articlePages];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastMod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate",
    },
  });
}
