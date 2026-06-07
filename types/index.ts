// ============================================================
// CORE TYPES
// ============================================================

export type ArticleStatus = "draft" | "published" | "scheduled";

export type Category =
  | "AI & LLMs"
  | "Backend Engineering"
  | "Databases"
  | "System Design"
  | "Networking"
  | "Developer Humor";

export interface Author {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: "admin" | "editor";
}

export interface Character {
  id: string;
  slug: string;
  name: string;       // e.g. "Dave the Database"
  role: string;       // e.g. "Database"
  bio: string;
  avatarUrl: string;
  personality: string;
  catchphrase: string;
  emoji: string;
  color: string;      // CSS color for card accent
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  hook: string;       // Opening analogy sentence
  content: string;    // MDX source
  status: ArticleStatus;
  category: Category;
  tags: string[];
  featured: boolean;
  coverImage: string;
  readingTime: number; // minutes
  author: Author;
  characters: Character[];
  publishedAt: string | null;
  scheduledAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ArticleCard {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  hook: string;
  category: Category;
  tags: string[];
  featured: boolean;
  coverImage: string;
  readingTime: number;
  author: Author;
  publishedAt: string | null;
}

export interface SearchResult {
  type: "article" | "character" | "tag";
  id: string;
  slug: string;
  title: string;
  description: string;
  category?: Category;
  emoji?: string;
}

export interface CategoryMeta {
  name: Category;
  slug: string;
  description: string;
  emoji: string;
  colorClass: string;
  gradient: string;
}

export const CATEGORIES: CategoryMeta[] = [
  {
    name: "AI & LLMs",
    slug: "ai-llms",
    description: "Transformers, attention mechanisms, LLMs, and the AI revolution — explained through stories.",
    emoji: "🤖",
    colorClass: "cat-ai",
    gradient: "from-violet-600 to-purple-500",
  },
  {
    name: "Backend Engineering",
    slug: "backend-engineering",
    description: "APIs, microservices, queues, and everything that happens after you press Enter.",
    emoji: "⚙️",
    colorClass: "cat-backend",
    gradient: "from-cyan-500 to-teal-400",
  },
  {
    name: "Databases",
    slug: "databases",
    description: "SQL, NoSQL, ACID, indexes, and why Dave the Database has trust issues.",
    emoji: "🗄️",
    colorClass: "cat-databases",
    gradient: "from-emerald-500 to-green-400",
  },
  {
    name: "System Design",
    slug: "system-design",
    description: "Scaling to millions, distributed systems, and architecture that doesn't crumble at 3 AM.",
    emoji: "🏗️",
    colorClass: "cat-system-design",
    gradient: "from-amber-500 to-yellow-400",
  },
  {
    name: "Networking",
    slug: "networking",
    description: "TCP/IP, DNS, HTTP, TLS — the invisible plumbing that holds the internet together.",
    emoji: "🌐",
    colorClass: "cat-networking",
    gradient: "from-red-500 to-rose-400",
  },
  {
    name: "Developer Humor",
    slug: "developer-humor",
    description: "Memes, war stories, and the tragicomedy of shipping code on Friday afternoons.",
    emoji: "😂",
    colorClass: "cat-humor",
    gradient: "from-pink-500 to-rose-400",
  },
];

export function getCategoryMeta(name: string): CategoryMeta | undefined {
  return CATEGORIES.find((c) => c.name === name || c.slug === name);
}

export function getCategorySlug(name: Category): string {
  return CATEGORIES.find((c) => c.name === name)?.slug ?? name.toLowerCase().replace(/\s+/g, "-");
}
