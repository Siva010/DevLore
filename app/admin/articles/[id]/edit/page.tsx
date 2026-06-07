import { notFound } from "next/navigation";
import { ARTICLES } from "@/lib/data";
import ArticleEditorClient from "./ArticleEditorClient";

type PageProps = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
  return ARTICLES.map((a) => ({ id: a.id }));
}

export default async function EditArticlePage({ params }: PageProps) {
  const { id } = await params;
  const article = ARTICLES.find((a) => a.id === id);
  if (!article) notFound();

  return <ArticleEditorClient article={article} />;
}
