import { Article, ArticleCard, Character, Category } from "@/types";

// ============================================================
// CHARACTERS — seed data (replace with DB queries later)
// ============================================================
export const CHARACTERS: Character[] = [
  {
    id: "dave-the-database",
    slug: "dave-the-database",
    name: "Dave the Database",
    role: "Database",
    bio: "Dave has seen it all. Millions of queries, accidental DROPs, unindexed JOINs that took 47 seconds, and developers who think 'SELECT *' is totally fine. He has trust issues — specifically ACID trust issues. Dave doesn't commit until he's absolutely sure.",
    avatarUrl: "/characters/dave.svg",
    personality: "Paranoid, methodical, holds grudges about missing indexes.",
    catchphrase: "I don't commit unless I'm sure. Unlike some people.",
    emoji: "🗄️",
    color: "#10b981",
  },
  {
    id: "cathy-cache",
    slug: "cathy-cache",
    name: "Cathy Cache",
    role: "Cache Layer",
    bio: "Cathy is fast. Dangerously fast. She remembers everything — sometimes for too long. She's been accused of giving stale answers but she prefers the term 'optimistically persistent'. Her motto: why ask Dave when you can just remember?",
    avatarUrl: "/characters/cathy.svg",
    personality: "Confident, occasionally outdated, obsessed with speed.",
    catchphrase: "Why bother asking Dave? I already know the answer. Probably.",
    emoji: "⚡",
    color: "#f59e0b",
  },
  {
    id: "polly-api",
    slug: "polly-api",
    name: "Polly API",
    role: "REST API",
    bio: "Polly is the social butterfly of the system. Everyone talks to her, she talks to everyone. She's stateless — every request is a fresh start. Some call it professional; she calls it healthy boundaries. She speaks JSON fluently and HTTP natively.",
    avatarUrl: "/characters/polly.svg",
    personality: "Social, stateless, extremely well-documented.",
    catchphrase: "200 OK! Unless you did something wrong. Then it's 400. Or 500. I'm not judging.",
    emoji: "🔌",
    color: "#0ea5c9",
  },
  {
    id: "larry-load-balancer",
    slug: "larry-load-balancer",
    name: "Larry Load Balancer",
    role: "Load Balancer",
    bio: "Larry's entire job is to make sure no one gets too much work. He used to be a school principal. Coincidence? He doesn't think so. He distributes, he redirects, he health-checks — and he never, ever overloads a single server while he's in charge.",
    avatarUrl: "/characters/larry.svg",
    personality: "Fair, stern, deeply committed to equal distribution.",
    catchphrase: "Round robin? Least connections? Either way, nobody gets overloaded on my watch.",
    emoji: "⚖️",
    color: "#7c3aed",
  },
];

// ============================================================
// ARTICLES — seed data
// ============================================================

const AUTHOR = {
  id: "author-1",
  name: "DevLore Team",
  email: "hello@devlore.io",
  avatar: "/team/avatar.svg",
  role: "admin" as const,
};

export const ARTICLES: Article[] = [
  {
    id: "article-1",
    slug: "https-tls-nightclub-bouncer",
    title: "The Nightclub Bouncer: Understanding HTTPS & TLS",
    subtitle: "How your browser proves it's talking to the right server — and not a convincing impostor",
    hook: "Imagine a nightclub with the world's most paranoid bouncer. He doesn't just check your ID — he verifies it with the ID office, checks for watermarks, and calls three references. That's TLS.",
    content: "",
    status: "published",
    category: "Networking",
    tags: ["HTTPS", "TLS", "Security", "Certificates"],
    featured: true,
    coverImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=450&fit=crop",
    readingTime: 8,
    author: AUTHOR,
    characters: [CHARACTERS[2], CHARACTERS[0]],
    publishedAt: "2026-05-28T10:00:00Z",
    scheduledAt: null,
    createdAt: "2026-05-20T10:00:00Z",
    updatedAt: "2026-05-28T10:00:00Z",
  },
  {
    id: "article-2",
    slug: "why-your-database-has-trust-issues",
    title: "Why Your Database Has Trust Issues: ACID Explained",
    subtitle: "Dave the Database has seen things. Incomplete writes, dirty reads, phantom rows. He never commits lightly.",
    hook: "Dave the Database has a rule: Never. Commit. Until. You're. Certain. He learned this the hard way in 2018 during the Great Bank Transfer Incident.",
    content: "",
    status: "published",
    category: "Databases",
    tags: ["ACID", "Transactions", "PostgreSQL", "Consistency"],
    featured: true,
    coverImage: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&h=450&fit=crop",
    readingTime: 10,
    author: AUTHOR,
    characters: [CHARACTERS[0]],
    publishedAt: "2026-06-01T10:00:00Z",
    scheduledAt: null,
    createdAt: "2026-05-25T10:00:00Z",
    updatedAt: "2026-06-01T10:00:00Z",
  },
  {
    id: "article-3",
    slug: "larrys-terrible-day-load-balancing",
    title: "Larry's Terrible, No-Good, Very Bad Day: Load Balancing",
    subtitle: "One server got 94% of the traffic. Larry resigned — briefly. Then he came back and implemented round-robin.",
    hook: "Picture a restaurant where all the customers queue for one waiter while three others stand idle. That's what happens without a load balancer. That's why Larry exists.",
    content: "",
    status: "published",
    category: "System Design",
    tags: ["Load Balancing", "Scalability", "Distributed Systems"],
    featured: false,
    coverImage: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=450&fit=crop",
    readingTime: 7,
    author: AUTHOR,
    characters: [CHARACTERS[3]],
    publishedAt: "2026-06-04T10:00:00Z",
    scheduledAt: null,
    createdAt: "2026-05-30T10:00:00Z",
    updatedAt: "2026-06-04T10:00:00Z",
  },
  {
    id: "article-4",
    slug: "cathy-cache-stale-data-problem",
    title: "Cathy's Dirty Secret: When Cache Goes Stale",
    subtitle: "Caching is fast. Caching is beautiful. Caching will also serve you yesterday's data with complete confidence.",
    hook: "Cathy remembered the answer perfectly. The problem? The answer changed six hours ago. She didn't know. She served it anyway, with absolute confidence.",
    content: "",
    status: "published",
    category: "Backend Engineering",
    tags: ["Caching", "Redis", "Cache Invalidation", "Performance"],
    featured: false,
    coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=450&fit=crop",
    readingTime: 9,
    author: AUTHOR,
    characters: [CHARACTERS[1], CHARACTERS[0]],
    publishedAt: "2026-06-05T10:00:00Z",
    scheduledAt: null,
    createdAt: "2026-06-02T10:00:00Z",
    updatedAt: "2026-06-05T10:00:00Z",
  },
  {
    id: "article-5",
    slug: "attention-mechanism-explained-cocktail-party",
    title: "The Cocktail Party: How Transformers Learned to Focus",
    subtitle: "At a cocktail party, you can tune out the noise and focus on one conversation. Transformers learned to do the same — at terrifying scale.",
    hook: "You're at a crowded party. Music blasting, dozens of conversations. But somehow you still hear your name across the room. That selective attention? It's the entire secret to why GPT works.",
    content: "",
    status: "published",
    category: "AI & LLMs",
    tags: ["Transformers", "Attention", "LLMs", "NLP"],
    featured: true,
    coverImage: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&h=450&fit=crop",
    readingTime: 12,
    author: AUTHOR,
    characters: [],
    publishedAt: "2026-06-06T10:00:00Z",
    scheduledAt: null,
    createdAt: "2026-06-03T10:00:00Z",
    updatedAt: "2026-06-06T10:00:00Z",
  },
  {
    id: "article-6",
    slug: "git-blame-and-the-scapegoat-protocol",
    title: "git blame and the Scapegoat Protocol",
    subtitle: "A comedy in three acts: commit, regret, blame someone who left the company.",
    hook: "Every team has a codebase comment that reads: '// TODO: fix this properly'. That comment is from 2017. The author has left the company. git blame knows who they are. git blame always knows.",
    content: "",
    status: "published",
    category: "Developer Humor",
    tags: ["Git", "Developer Culture", "Version Control", "Comedy"],
    featured: false,
    coverImage: "https://images.unsplash.com/photo-1607706189992-eae578626c86?w=800&h=450&fit=crop",
    readingTime: 5,
    author: AUTHOR,
    characters: [],
    publishedAt: "2026-06-06T12:00:00Z",
    scheduledAt: null,
    createdAt: "2026-06-05T10:00:00Z",
    updatedAt: "2026-06-06T12:00:00Z",
  },
];

// ============================================================
// HELPERS
// ============================================================

export function toArticleCard(a: Article): ArticleCard {
  const { content, characters, ...card } = a;
  return card;
}

export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export function getArticlesByCategory(category: Category): Article[] {
  return ARTICLES.filter((a) => a.category === category && a.status === "published");
}

export function getFeaturedArticles(): Article[] {
  return ARTICLES.filter((a) => a.featured && a.status === "published");
}

export function getRecentArticles(limit = 6): Article[] {
  return ARTICLES
    .filter((a) => a.status === "published")
    .sort((a, b) => new Date(b.publishedAt!).getTime() - new Date(a.publishedAt!).getTime())
    .slice(0, limit);
}

export function getTrendingArticles(limit = 4): Article[] {
  return ARTICLES
    .filter((a) => a.status === "published")
    .slice(0, limit);
}

export function getCharacterBySlug(slug: string): Character | undefined {
  return CHARACTERS.find((c) => c.slug === slug);
}

export function getArticlesByCharacter(characterSlug: string): Article[] {
  return ARTICLES.filter((a) =>
    a.status === "published" &&
    a.characters.some((c) => c.slug === characterSlug)
  );
}

export function searchContent(query: string) {
  const q = query.toLowerCase();
  const articles = ARTICLES.filter(
    (a) =>
      a.status === "published" &&
      (a.title.toLowerCase().includes(q) ||
        a.subtitle.toLowerCase().includes(q) ||
        a.hook.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q)) ||
        a.category.toLowerCase().includes(q))
  );
  const characters = CHARACTERS.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.role.toLowerCase().includes(q) ||
      c.bio.toLowerCase().includes(q)
  );
  return { articles, characters };
}
