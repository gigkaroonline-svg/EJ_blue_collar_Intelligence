"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { BlogArticleView } from "@/components/site/BlogViews";
import { Shell, wrap } from "@/components/site/StoryPages";
import { fetchPublishedPost, type BlogPost } from "@/lib/api-blogs";
import { renderBlogBody } from "@/lib/blog-html";

export default function BlogPostPage() {
  const params = useParams<{ slug: string }>();
  const slug = typeof params?.slug === "string" ? params.slug : "";
  const [post, setPost] = useState<BlogPost | null | undefined>(undefined);

  useEffect(() => {
    if (!slug) return;
    let alive = true;
    fetchPublishedPost(slug).then((data) => {
      if (alive) setPost(data ?? null);
    });
    return () => {
      alive = false;
    };
  }, [slug]);

  if (post === undefined) {
    return (
      <Shell>
        <div className={`${wrap} py-16`}>
          <p className="text-muted-foreground">Loading story…</p>
        </div>
      </Shell>
    );
  }

  if (!post) {
    return (
      <Shell>
        <div className={`${wrap} py-16`}>
          <h1 className="text-2xl font-semibold text-foreground">Story not found</h1>
          <Link href="/blog" className="mono-label mt-4 inline-block text-brand hover:underline">
            ← All stories
          </Link>
        </div>
      </Shell>
    );
  }

  return <BlogArticleView post={post} bodyHtml={renderBlogBody(post.body || "", post.title)} />;
}
