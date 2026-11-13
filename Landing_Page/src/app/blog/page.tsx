"use client";

import { useEffect, useState } from "react";
import { BlogIndexView } from "@/components/site/BlogViews";
import { pages } from "@/content/pages";
import { fetchPublishedPosts, type BlogPost } from "@/lib/api-blogs";

const page = pages.blog;

export default function BlogRoute() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    fetchPublishedPosts()
      .then((data) => {
        if (alive) setPosts(data);
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, []);

  if (loading) {
    return (
      <BlogIndexView
        eyebrow={page.eyebrow}
        title="Stories & research"
        intro="Loading stories…"
        posts={[]}
      />
    );
  }

  return (
    <BlogIndexView
      eyebrow={page.eyebrow}
      title="Stories & research"
      intro="Published notes on workforce intelligence, migration, hiring, and public employment initiatives across India."
      posts={posts}
    />
  );
}
