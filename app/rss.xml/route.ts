import { getRecentArticles } from "@/lib/data";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/seo";

export async function GET() {
  const articles = getRecentArticles(20);

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${SITE_NAME}</title>
    <link>${SITE_URL}</link>
    <description>${SITE_DESCRIPTION}</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${SITE_URL}/logo.svg</url>
      <title>${SITE_NAME}</title>
      <link>${SITE_URL}</link>
    </image>
${articles
  .map(
    (article) => `    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>${SITE_URL}/articles/${article.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/articles/${article.slug}</guid>
      <description><![CDATA[${article.subtitle}]]></description>
      <content:encoded><![CDATA[<p>${article.hook}</p>]]></content:encoded>
      <pubDate>${article.publishedAt ? new Date(article.publishedAt).toUTCString() : new Date().toUTCString()}</pubDate>
      <category>${article.category}</category>
      ${article.tags.map((tag) => `<category>${tag}</category>`).join("\n      ")}
    </item>`
  )
  .join("\n")}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate",
    },
  });
}
