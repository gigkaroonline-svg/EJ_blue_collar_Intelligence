"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Card, Reveal, SectionLabel } from "@/components/site/primitives";
import { Crumb, Shell, wrap } from "@/components/site/StoryPages";
import type { BlogPost } from "@/lib/api-blogs";
import { formatBlogDate } from "@/lib/api-blogs";
import { cn } from "@/lib/utils";

export function BlogIndexView({
  eyebrow,
  title,
  intro,
  posts,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  posts: BlogPost[];
}) {
  return (
    <Shell>
      <section className="border-b border-border bg-surface py-12 sm:py-16">
        <div className={wrap}>
          <Reveal>
            <Crumb label="Blog" />
            <SectionLabel>{eyebrow}</SectionLabel>
            <h1 className="display-type max-w-3xl text-3xl text-foreground sm:text-4xl lg:text-[2.65rem]">
              {title}
            </h1>
            {intro ? (
              <p className="page-copy mt-4 max-w-2xl text-muted-foreground">{intro}</p>
            ) : null}
          </Reveal>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className={wrap}>
          {posts.length === 0 ? (
            <Reveal className="rounded-2xl border border-dashed border-border bg-card px-6 py-14 text-center shadow-soft sm:px-10">
              <h2 className="text-xl font-semibold text-foreground">No stories yet</h2>
              <p className="page-copy mx-auto mt-3 max-w-md text-muted-foreground">
                When RojMitra publishes research and workforce notes, they will appear here.
              </p>
            </Reveal>
          ) : (
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, index) => (
                <Reveal key={post.id} as="li" delay={Math.min(index * 0.05, 0.2)}>
                  <BlogCard post={post} />
                </Reveal>
              ))}
            </ul>
          )}
        </div>
      </section>
    </Shell>
  );
}

function BlogCard({ post }: { post: BlogPost }) {
  const author = post.authorName?.trim() || "RojMitra";
  const date = formatBlogDate(post.publishedAt);
  return (
    <Card as="article" className="flex h-full flex-col overflow-hidden p-0">
      {post.coverUrl ? (
        <Link href={`/blog/${post.slug}`} className="block overflow-hidden">
          <img
            src={post.coverUrl}
            alt={post.coverAlt?.trim() || post.title}
            width={800}
            height={520}
            loading="lazy"
            decoding="async"
            className="aspect-[16/10] w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
          />
        </Link>
      ) : null}
      <div className="flex flex-1 flex-col p-6">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.08em] text-muted-foreground">
          {date}
          {date ? " · " : ""}
          {author}
        </p>
        <h2 className="mt-3 text-lg font-semibold leading-snug text-foreground">
          <Link href={`/blog/${post.slug}`} className="hover:text-brand">
            {post.title}
          </Link>
        </h2>
        <p className="page-copy mt-3 flex-1 text-sm text-muted-foreground">{post.excerpt}</p>
        <Link
          href={`/blog/${post.slug}`}
          className="mono-label mt-5 inline-flex items-center gap-1 text-brand hover:underline"
        >
          Read story
          <ChevronRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
      </div>
    </Card>
  );
}

function ArticleCrumb({ title }: { title: string }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-6 flex flex-wrap items-center gap-2 text-xs text-muted-foreground"
    >
      <Link href="/" className="hover:text-foreground">
        Home
      </Link>
      <ChevronRight className="h-3 w-3" aria-hidden />
      <Link href="/blog" className="hover:text-foreground">
        Blog
      </Link>
      <ChevronRight className="h-3 w-3" aria-hidden />
      <span aria-current="page" className="line-clamp-1 text-foreground">
        {title}
      </span>
    </nav>
  );
}

export function BlogArticleView({
  post,
  bodyHtml,
}: {
  post: BlogPost;
  bodyHtml: string;
}) {
  const author = post.authorName?.trim() || "RojMitra";
  const published = post.publishedAt || "";
  const updated = post.updatedAt || published;
  const authorHref =
    post.authorUrl?.trim() ||
    (/^rojmitra$/i.test(author) ? "/about" : "");

  return (
    <Shell>
      <article className="py-10 sm:py-14">
        <div className={cn(wrap, "mx-auto max-w-3xl")}>
          <Reveal>
            <ArticleCrumb title={post.title} />
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.08em] text-muted-foreground">
              {published ? (
                <>
                  Published{" "}
                  <time dateTime={published}>{formatBlogDate(published)}</time>
                </>
              ) : null}
              {updated && updated !== published ? (
                <>
                  {published ? " · " : ""}
                  Updated <time dateTime={updated}>{formatBlogDate(updated)}</time>
                </>
              ) : null}
              {" · "}
              {authorHref ? (
                <Link href={authorHref} className="text-brand hover:underline">
                  {author}
                </Link>
              ) : (
                author
              )}
            </p>
            <h1 className="display-type mt-4 text-3xl text-foreground sm:text-4xl lg:text-[2.75rem]">
              {post.title}
            </h1>
            {post.excerpt ? (
              <p className="page-copy mt-4 text-lg text-muted-foreground">{post.excerpt}</p>
            ) : null}
          </Reveal>

          {post.coverUrl ? (
            <Reveal delay={0.06} className="mt-8 overflow-hidden rounded-2xl shadow-soft">
              <img
                src={post.coverUrl}
                alt={post.coverAlt?.trim() || post.title}
                width={1200}
                height={675}
                fetchPriority="high"
                decoding="async"
                className="aspect-[16/9] w-full object-cover"
              />
            </Reveal>
          ) : null}

          <Reveal delay={0.1} className="mt-10">
            <div
              className="blog-prose"
              dangerouslySetInnerHTML={{ __html: bodyHtml }}
            />
          </Reveal>

          <div className="mt-12 border-t border-border pt-8">
            <Link href="/blog" className="mono-label text-brand hover:underline">
              ← All stories
            </Link>
          </div>
        </div>
      </article>
    </Shell>
  );
}
