import { NextRequest, NextResponse } from "next/server";
import { searchContent } from "@/lib/data";
import { CATEGORIES } from "@/types";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q")?.trim() ?? "";
  const limit = parseInt(searchParams.get("limit") ?? "10");

  if (!query || query.length < 2) {
    return NextResponse.json({ articles: [], characters: [], categories: [], query });
  }

  const { articles, characters } = searchContent(query);

  // Also search categories
  const q = query.toLowerCase();
  const categories = CATEGORIES.filter(
    (c) => c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q)
  );

  return NextResponse.json({
    query,
    articles: articles.slice(0, limit),
    characters: characters.slice(0, limit),
    categories: categories.slice(0, limit),
    total: articles.length + characters.length + categories.length,
  });
}
