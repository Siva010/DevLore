import { NextRequest, NextResponse } from "next/server";
import {
  ARTICLES,
  getArticleBySlug,
  toArticleCard,
  getRecentArticles,
  getFeaturedArticles,
  getTrendingArticles,
  getArticlesByCategory,
} from "@/lib/data";
import { type Category } from "@/types";

// GET /api/articles — list articles with optional filters
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");
  const category = searchParams.get("category") as Category | null;
  const featured = searchParams.get("featured");
  const trending = searchParams.get("trending");
  const limit = parseInt(searchParams.get("limit") ?? "20");

  // Single article by slug
  if (slug) {
    const article = getArticleBySlug(slug);
    if (!article) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(article);
  }

  // Filtered lists
  if (category) {
    const articles = getArticlesByCategory(category).map(toArticleCard).slice(0, limit);
    return NextResponse.json({ articles, total: articles.length });
  }

  if (featured === "true") {
    const articles = getFeaturedArticles().map(toArticleCard).slice(0, limit);
    return NextResponse.json({ articles, total: articles.length });
  }

  if (trending === "true") {
    const articles = getTrendingArticles(limit).map(toArticleCard);
    return NextResponse.json({ articles, total: articles.length });
  }

  // Default: recent published articles
  const articles = getRecentArticles(limit).map(toArticleCard);
  return NextResponse.json({ articles, total: articles.length });
}

// POST /api/articles — create article (CMS, requires auth in production)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate required fields
    const required = ["title", "slug", "subtitle", "hook", "content", "category"];
    for (const field of required) {
      if (!body[field]) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 });
      }
    }

    // In production: save to DB via Prisma
    // For MVP: return the payload with generated metadata
    const article = {
      id: crypto.randomUUID(),
      ...body,
      status: body.status ?? "draft",
      featured: body.featured ?? false,
      readingTime: Math.ceil((body.content?.split(/\s+/).length ?? 0) / 200),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json(article, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}

// PATCH /api/articles — update article
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: "Missing article id" }, { status: 400 });
    }

    // In production: update in DB via Prisma
    return NextResponse.json({
      ...updates,
      id,
      updatedAt: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}
