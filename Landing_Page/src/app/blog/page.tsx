import type { Metadata } from "next";
import { BlogIndexView } from "@/components/site/BlogViews";
import { pages } from "@/content/pages";
import { fetchPublishedPosts } from "@/lib/api-blogs";
import { blogCollectionJsonLd } from "@/lib/blog-json-ld";
import { pageMetadata } from "@/lib/page-meta";

const page = pages.blog;

export const metadata: Metadata = pageMetadata(page);

export const revalidate = 3600;

export default async function BlogRoute() {
  const posts = await fetchPublishedPosts();
  const jsonLd = blogCollectionJsonLd(page, posts);
  const intro =
    "Published notes on workforce intelligence, migration, hiring, and public employment initiatives across India.";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogIndexView
        eyebrow={page.eyebrow}
        title="Stories & research"
        intro={intro}
        posts={posts}
      />
    </>
  );
}
