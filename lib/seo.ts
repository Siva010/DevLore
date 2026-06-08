import { type Metadata } from "next";
import { Article, ArticleCard } from "@/types";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://devlore.io";
const SITE_NAME = "DevLore";
const SITE_DESCRIPTION =
  "DevLore teaches software engineering, computer science, AI, and system design through humor, storytelling, comics, and analogies that make technical concepts impossible to forget.";

export function buildMetadata({
  title,
  description,
  slug,
  image,
  type = "website",
}: {
  title: string;
  description?: string;
  slug?: string;
  image?: string;
  type?: "website" | "article";
}): Metadata {
  const fullTitle = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`;
  const desc = description ?? SITE_DESCRIPTION;
  const url = slug ? `${SITE_URL}/${slug}` : SITE_URL;
  const ogImage = image ?? `${SITE_URL}/api/og?title=${encodeURIComponent(title)}`;

  return {
    title: fullTitle,
    description: desc,
    metadataBase: new URL(SITE_URL),
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description: desc,
      url,
      siteName: SITE_NAME,
      type,
      images: [{ url: ogImage, width: 1200, height: 630, alt: fullTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: desc,
      images: [ogImage],
    },
    robots: { index: true, follow: true },
  };
}

export function buildArticleMetadata(article: Article | ArticleCard): Metadata {
  return buildMetadata({
    title: article.title,
    description: article.subtitle,
    slug: `articles/${article.slug}`,
    image: article.coverImage,
    type: "article",
  });
}

export function buildArticleJsonLd(article: Article) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.subtitle,
    image: article.coverImage,
    author: {
      "@type": "Person",
      name: article.author.name,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.svg` },
    },
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/articles/${article.slug}` },
    keywords: article.tags.join(", "),
    articleSection: article.category,
  };
}

export function buildCategoryMetadata(category: string, description: string): Metadata {
  return buildMetadata({
    title: category,
    description,
    slug: `topics/${category.toLowerCase().replace(/\s+/g, "-")}`,
  });
}

export { SITE_URL, SITE_NAME, SITE_DESCRIPTION };
