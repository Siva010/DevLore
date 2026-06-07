import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Clock, ArrowLeft, Calendar } from "lucide-react";
import { type Metadata } from "next";
import { getArticleBySlug, ARTICLES } from "@/lib/data";
import { buildArticleMetadata, buildArticleJsonLd, SITE_URL } from "@/lib/seo";
import { CATEGORIES } from "@/types";
import { formatDistanceToNow, format } from "date-fns";
import ReadingProgressBar from "@/components/reader/ReadingProgressBar";
import ShareButtons from "@/components/reader/ShareButtons";
import {
  StoryPanel, FunFact, CommonMistake, CharacterQuote,
  InterviewQuestion, ComicStrip, QuickRevision, MemeSection
} from "@/components/comic/ComicComponents";

// Article MDX content — inline for MVP (would come from DB/files in production)
const ARTICLE_CONTENT: Record<string, React.ReactNode> = {
  "https-tls-nightclub-bouncer": (
    <>
      <StoryPanel title="The Hook">
        Imagine a nightclub called <strong>The Internet</strong>. It&apos;s a great club. Anyone can go. But there&apos;s a catch: there&apos;s also a fake club next door called <strong>The Internet (but evil)</strong> — and it looks identical from the outside.
        <br /><br />
        How do you know you&apos;re in the right one? That&apos;s where <strong>HTTPS and TLS</strong> come in.
      </StoryPanel>

      <h2>🚪 The Bouncer: TLS Handshake</h2>
      <p>
        TLS (Transport Layer Security) is the protocol that runs underneath HTTPS. Every time you visit <code>https://</code> anything, a TLS handshake happens — a quick, cryptographic conversation between your browser and the server.
      </p>

      <CharacterQuote character="Polly API" emoji="🔌" color="var(--color-teal)">
        Before we talk, I need you to prove you&apos;re really you. Here&apos;s a challenge. Solve it with your private key. I&apos;ll wait.
      </CharacterQuote>

      <h3>Step 1: Client Hello</h3>
      <p>Your browser sends a "hello" to the server with a list of cipher suites it supports — basically saying <em>"here are the encryption algorithms I know. Pick one."</em></p>

      <h3>Step 2: Server Hello + Certificate</h3>
      <p>The server responds with the cipher suite it chose and hands over its <strong>SSL/TLS certificate</strong>. This certificate is like a government-issued ID.</p>

      <ComicStrip panels={[
        { emoji: "🌐", speaker: "Your Browser", caption: "Hey server! Here are the encryption methods I support. Want to chat securely?" },
        { emoji: "🔐", speaker: "Server", caption: "Sure! Let's use AES-256. Here's my certificate proving I'm legit. Check with the bouncer." },
        { emoji: "✅", speaker: "Certificate Authority", caption: "Yeah, I signed that cert. They're legit. You can trust them." },
      ]} />

      <h3>Step 3: Certificate Verification</h3>
      <p>
        Your browser doesn&apos;t just trust the certificate. It checks with a <strong>Certificate Authority (CA)</strong> — a trusted third party (like DigiCert, Let&apos;s Encrypt, or Google) that has digitally signed the certificate.
      </p>

      <FunFact>
        Let&apos;s Encrypt has issued over 3 billion certificates since 2016. It&apos;s completely free, automated, and runs on about 300 million websites.
      </FunFact>

      <h3>Step 4: Session Keys</h3>
      <p>
        Once the certificate is verified, browser and server use <strong>asymmetric cryptography</strong> (RSA or ECDH) to agree on a <strong>session key</strong>. From here on, everything is encrypted using faster <strong>symmetric encryption</strong> (AES).
      </p>

      <h2>🔑 Public Keys vs Private Keys</h2>
      <p>Think of public key cryptography like a padlock system:</p>
      <ul>
        <li><strong>Public key</strong> = the open padlock you give to everyone</li>
        <li><strong>Private key</strong> = the key only you keep</li>
      </ul>
      <p>Anyone can lock something with your public key. Only you can unlock it with your private key.</p>

      <CommonMistake title="SSL vs TLS">
        People say &ldquo;SSL certificate&rdquo; everywhere, but SSL is actually deprecated. We&apos;ve been using TLS (1.2 and 1.3) for years. SSL is dead. TLS is the protocol. The certificate is just the certificate.
      </CommonMistake>

      <h2>🏭 Real World Usage</h2>
      <ul>
        <li><strong>Banking</strong>: Every transaction is over TLS 1.3</li>
        <li><strong>APIs</strong>: All production APIs must use HTTPS</li>
        <li><strong>SPAs</strong>: React/Next.js apps served over HTTPS by default on Vercel/Netlify</li>
        <li><strong>Mobile apps</strong>: App Transport Security (iOS) forces HTTPS</li>
      </ul>

      <InterviewQuestion question="What is the difference between TLS 1.2 and TLS 1.3?">
        TLS 1.3 is faster (1-RTT handshake vs 2-RTT), removes weak cipher suites, and supports zero round-trip resumption (0-RTT) for returning connections. It&apos;s significantly more secure and should be preferred in all new deployments.
      </InterviewQuestion>

      <QuickRevision items={[
        "HTTPS = HTTP + TLS encryption",
        "TLS handshake verifies server identity via certificates",
        "Certificate Authorities (CAs) are the trusted third parties",
        "Public key encrypts, private key decrypts",
        "After handshake, symmetric encryption (AES) is used for speed",
        "TLS 1.3 is current standard — faster and more secure",
      ]} />
    </>
  ),

  "why-your-database-has-trust-issues": (
    <>
      <StoryPanel title="The Hook">
        It&apos;s 2018. Dave the Database is happily running transactions when suddenly — a power outage mid-write. Half the data is written. Half isn&apos;t. The bank&apos;s books are now in a state of quantum superposition: both balanced and catastrophically unbalanced.
        <br /><br />
        This is why Dave developed trust issues. And why we have <strong>ACID</strong>.
      </StoryPanel>

      <CharacterQuote character="Dave the Database" emoji="🗄️" color="var(--color-green)">
        I don&apos;t commit unless I&apos;m absolutely certain every part of this transaction has succeeded. Every. Single. Part. You try committing halfway through a bank transfer and see how that works out for you.
      </CharacterQuote>

      <h2>🧪 What is ACID?</h2>
      <p>
        ACID is a set of properties that guarantee database transactions are processed reliably — even in the face of crashes, errors, or concurrent access.
      </p>

      <h2>⚛️ Atomicity — All or Nothing</h2>
      <p>
        A transaction is an atomic unit. Either <strong>everything succeeds</strong> or <strong>nothing is applied</strong>.
      </p>
      <p>
        Transfer $100 from Account A to Account B:
      </p>
      <ul>
        <li>Debit Account A: $100 ✓</li>
        <li>Credit Account B: $100 ✗ (server crashes)</li>
      </ul>
      <p>Without atomicity, Account A is $100 poorer but Account B never got it. Dave would never allow this.</p>

      <FunFact>
        The word &ldquo;atomic&rdquo; here doesn&apos;t mean nuclear. It comes from the Greek word <em>atomos</em> meaning &ldquo;indivisible&rdquo;.
      </FunFact>

      <h2>🔒 Consistency — Rules Always Apply</h2>
      <p>
        A transaction brings the database from one valid state to another. All defined rules (constraints, cascades, triggers) must be satisfied.
      </p>

      <ComicStrip panels={[
        { emoji: "🗄️", speaker: "Dave", caption: "Before the transfer: Account A has $100, Account B has $50. Total: $150." },
        { emoji: "⚡", speaker: "Transaction", caption: "Move $100 from A to B. A now has $0, B has $150. Total: $150." },
        { emoji: "✅", speaker: "Dave", caption: "Total is still $150. Rules satisfied. Consistency maintained. Committing." },
      ]} />

      <h2>🔍 Isolation — One at a Time (Sort Of)</h2>
      <p>
        Concurrent transactions shouldn&apos;t see each other&apos;s intermediate states. The result should be as if they ran sequentially.
      </p>

      <CommonMistake title="Dirty Reads">
        A dirty read is when Transaction A reads data written by Transaction B — which hasn&apos;t committed yet. If B then rolls back, A has read data that never officially existed. This is why isolation levels exist.
      </CommonMistake>

      <h2>💾 Durability — Once Committed, Always Committed</h2>
      <p>
        Once a transaction is committed, it stays committed — even through crashes, power failures, or server restarts. This is typically implemented via <strong>Write-Ahead Logging (WAL)</strong>.
      </p>

      <InterviewQuestion question="What are the four isolation levels in SQL?">
        READ UNCOMMITTED (allows dirty reads), READ COMMITTED (default in PostgreSQL), REPEATABLE READ (prevents dirty and non-repeatable reads), and SERIALIZABLE (highest isolation, prevents phantom reads). Higher isolation = more safety, but also more locking and lower throughput.
      </InterviewQuestion>

      <QuickRevision items={[
        "ACID = Atomicity, Consistency, Isolation, Durability",
        "Atomicity: all-or-nothing transactions",
        "Consistency: data always valid after transaction",
        "Isolation: concurrent transactions don't interfere",
        "Durability: committed data survives crashes (via WAL)",
        "NoSQL databases often trade ACID for performance (BASE model)",
      ]} />
    </>
  ),

  "larrys-terrible-day-load-balancing": (
    <>
      <StoryPanel title="The Hook">
        Tuesday, 2:47 PM. Larry Load Balancer is having what he would later describe as &ldquo;the worst day of my professional career.&rdquo; Server 1 is at 94% CPU. Servers 2, 3, and 4 are sitting at 12%. Why? Because Larry&apos;s predecessor had literally hardcoded every user to Server 1. Larry took over at 2:30 PM. He fixed it by 2:48 PM. He has not forgiven that developer.
      </StoryPanel>

      <CharacterQuote character="Larry Load Balancer" emoji="⚖️" color="var(--color-purple)">
        Nobody gets overloaded on my watch. That is a promise and a threat.
      </CharacterQuote>

      <h2>⚖️ What Does a Load Balancer Do?</h2>
      <p>A load balancer sits between your users and your servers. It receives requests and distributes them across multiple backend servers based on an algorithm.</p>

      <ComicStrip panels={[
        { emoji: "👥", speaker: "Users", caption: "10,000 requests arrive simultaneously wanting the homepage." },
        { emoji: "⚖️", speaker: "Larry", caption: "Calm down everyone. You — Server 1. You — Server 2. You — Server 3. Nice and even." },
        { emoji: "✅", speaker: "All Servers", caption: "3,333 requests each. CPU at 35%. We can breathe." },
      ]} />

      <h2>🔄 Load Balancing Algorithms</h2>

      <h3>Round Robin</h3>
      <p>Requests are distributed sequentially: Request 1 → Server A, Request 2 → Server B, Request 3 → Server C, Request 4 → Server A...</p>
      <p>Simple and effective when all servers are equally powerful.</p>

      <h3>Least Connections</h3>
      <p>The next request goes to the server with the fewest active connections. Better when requests have variable processing times.</p>

      <h3>IP Hash</h3>
      <p>The client&apos;s IP address is hashed to always route them to the same server. Useful for session affinity (sticky sessions).</p>

      <FunFact>
        NGINX is one of the most popular load balancers in the world. It&apos;s used by Netflix, Dropbox, and roughly 400 million websites.
      </FunFact>

      <h2>❤️ Health Checks</h2>
      <p>Larry is very paranoid about server health. He sends periodic health check requests to every server. If a server stops responding, Larry immediately stops sending it traffic — no matter what round-robin says.</p>

      <CommonMistake title="No Health Checks">
        Running a load balancer without health checks means traffic gets routed to dead servers. Users get errors. Larry would be appalled.
      </CommonMistake>

      <h2>🏭 Real World Usage</h2>
      <ul>
        <li><strong>AWS</strong>: Application Load Balancer (ALB) for HTTP/HTTPS</li>
        <li><strong>Google Cloud</strong>: Cloud Load Balancing (global anycast)</li>
        <li><strong>NGINX</strong>: Open source, widely used</li>
        <li><strong>Kubernetes</strong>: Built-in Service load balancing across pods</li>
      </ul>

      <InterviewQuestion question="What is the difference between Layer 4 and Layer 7 load balancing?">
        Layer 4 (Transport) load balancers operate on TCP/UDP — they distribute based on IP and port without looking at content. Layer 7 (Application) load balancers can inspect HTTP headers, cookies, and paths — enabling path-based routing (e.g., /api → server A, /static → CDN) and cookie-based sticky sessions.
      </InterviewQuestion>

      <QuickRevision items={[
        "Load balancers distribute traffic across multiple servers",
        "Round Robin: sequential distribution",
        "Least Connections: routes to least busy server",
        "IP Hash: same user always hits same server (sticky)",
        "Health checks detect dead servers and remove them from rotation",
        "Layer 7 load balancers can route based on URL paths and headers",
      ]} />
    </>
  ),
};

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "Not Found | DevLore" };
  return buildArticleMetadata(article);
}

export async function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const catMeta = CATEGORIES.find((c) => c.name === article.category);
  const relatedArticles = ARTICLES.filter(
    (a) => a.slug !== slug && a.status === "published" && a.category === article.category
  ).slice(0, 3);

  const jsonLd = buildArticleJsonLd(article);
  const articleUrl = `${SITE_URL}/articles/${slug}`;

  return (
    <>
      <ReadingProgressBar />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* HERO */}
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          minHeight: 420,
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        <Image
          src={article.coverImage}
          alt={article.title}
          fill
          priority
          style={{ objectFit: "cover", filter: "brightness(0.35)" }}
          sizes="100vw"
        />
        <div
          style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to top, rgba(15,14,23,0.95) 0%, rgba(15,14,23,0.3) 100%)",
          }}
        />
        <div className="container" style={{ position: "relative", paddingTop: "5rem", paddingBottom: "3rem", zIndex: 1 }}>
          <Link
            href="/"
            className="btn btn-ghost"
            style={{ color: "rgba(255,255,255,0.7)", marginBottom: "1.5rem", padding: "6px 12px", fontSize: "0.82rem" }}
          >
            <ArrowLeft size={14} /> Back to DevLore
          </Link>

          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "1rem", flexWrap: "wrap" }}>
            <span className="badge" style={{ background: "rgba(255,255,255,0.12)", color: "white", border: "1px solid rgba(255,255,255,0.2)" }}>
              {catMeta?.emoji} {article.category}
            </span>
            {article.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="badge" style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.65)", border: "1px solid rgba(255,255,255,0.12)", fontSize: "0.65rem" }}>
                {tag}
              </span>
            ))}
          </div>

          <h1
            className="font-display"
            style={{
              fontSize: "clamp(1.75rem, 5vw, 3rem)",
              fontWeight: 900,
              color: "white",
              lineHeight: 1.1,
              maxWidth: "800px",
              marginBottom: "1rem",
            }}
          >
            {article.title}
          </h1>

          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1.1rem", maxWidth: "680px", lineHeight: 1.6, marginBottom: "1.5rem" }}>
            {article.subtitle}
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem" }}>
                ✍️
              </div>
              <span style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.875rem" }}>{article.author.name}</span>
            </div>
            <span style={{ display: "flex", alignItems: "center", gap: "5px", color: "rgba(255,255,255,0.6)", fontSize: "0.8rem" }}>
              <Calendar size={13} />
              {article.publishedAt ? format(new Date(article.publishedAt), "MMM d, yyyy") : "Draft"}
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "5px", color: "rgba(255,255,255,0.6)", fontSize: "0.8rem" }}>
              <Clock size={13} />
              {article.readingTime} min read
            </span>
          </div>
        </div>
      </div>

      {/* CONTENT AREA */}
      <div className="container" style={{ paddingTop: "3rem", paddingBottom: "4rem" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "3rem",
          }}
          className="article-layout"
        >
          {/* Main Content */}
          <article>
            {/* Opening hook */}
            <blockquote
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.2rem",
                fontStyle: "italic",
                lineHeight: 1.65,
                color: "var(--color-text-primary)",
                borderLeft: "3px solid var(--color-accent)",
                paddingLeft: "1.25rem",
                marginBottom: "2.5rem",
              }}
            >
              {article.hook}
            </blockquote>

            {/* Characters in this story */}
            {article.characters.length > 0 && (
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  flexWrap: "wrap",
                  padding: "1rem 1.25rem",
                  background: "var(--color-surface-2)",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--color-border)",
                  marginBottom: "2.5rem",
                  alignItems: "center",
                }}
              >
                <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", fontWeight: 600 }}>Characters in this story:</span>
                {article.characters.map((char) => (
                  <Link key={char.slug} href={`/characters/${char.slug}`} style={{ textDecoration: "none" }}>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "5px",
                        padding: "3px 10px",
                        borderRadius: "var(--radius-pill)",
                        background: `${char.color}18`,
                        border: `1px solid ${char.color}35`,
                        fontSize: "0.78rem",
                        fontWeight: 600,
                        color: char.color,
                      }}
                    >
                      {char.emoji} {char.name}
                    </span>
                  </Link>
                ))}
              </div>
            )}

            {/* MDX Content */}
            <div className="prose">
              {ARTICLE_CONTENT[slug] ?? (
                <p style={{ color: "var(--color-text-muted)", fontStyle: "italic" }}>
                  Content coming soon...
                </p>
              )}
            </div>

            {/* Tags */}
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid var(--color-border)" }}>
              {article.tags.map((tag) => (
                <span key={tag} className="badge badge-muted">{tag}</span>
              ))}
            </div>

            {/* Share */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "1rem",
                marginTop: "2rem",
                padding: "1.25rem",
                background: "var(--color-surface-2)",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--color-border)",
              }}
            >
              <span style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>
                Enjoyed this story? Share it 👇
              </span>
              <ShareButtons title={article.title} url={articleUrl} />
            </div>
          </article>

          {/* Sidebar */}
          <aside>
            {/* Related Articles */}
            {relatedArticles.length > 0 && (
              <div
                style={{
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-lg)",
                  padding: "1.5rem",
                  position: "sticky",
                  top: "80px",
                }}
              >
                <h3 className="font-display" style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "1.25rem" }}>
                  Related Stories
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {relatedArticles.map((rel) => (
                    <Link key={rel.slug} href={`/articles/${rel.slug}`} style={{ textDecoration: "none" }}>
                      <div
                        style={{
                          display: "flex",
                          gap: "10px",
                          padding: "10px",
                          borderRadius: "var(--radius-md)",
                          transition: "background var(--transition-fast)",
                          cursor: "pointer",
                        }}
                        className="related-item"
                      >
                        <div style={{ position: "relative", width: 60, height: 45, borderRadius: "var(--radius-sm)", overflow: "hidden", flexShrink: 0 }}>
                          <Image src={rel.coverImage} alt={rel.title} fill style={{ objectFit: "cover" }} sizes="60px" />
                        </div>
                        <div>
                          <h4 style={{ fontSize: "0.82rem", fontWeight: 600, lineHeight: 1.35, color: "var(--color-text-primary)", marginBottom: "4px" }}>
                            {rel.title}
                          </h4>
                          <span style={{ fontSize: "0.72rem", color: "var(--color-text-muted)", display: "flex", alignItems: "center", gap: "3px" }}>
                            <Clock size={10} /> {rel.readingTime} min
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .article-layout {
            grid-template-columns: 1fr 300px !important;
          }
        }
        .related-item:hover {
          background: var(--color-surface-2);
        }
      `}</style>
    </>
  );
}
