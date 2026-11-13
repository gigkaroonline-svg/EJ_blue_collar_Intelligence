import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogArticleView } from "@/components/site/BlogViews";
import { fetchPublishedPost } from "@/lib/api-blogs";
import { articleJsonLdGraph, articlePageMetadata } from "@/lib/blog-json-ld";
import { renderBlogBody } from "@/lib/blog-html";

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchPublishedPost(slug);
  if (!post) {
    return { title: "Story", robots: { index: false, follow: false } };
  }
  return articlePageMetadata(post);
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await fetchPublishedPost(slug);
  if (!post) notFound();

  const bodyHtml = renderBlogBody(post.body || "", post.title);
  const jsonLd = articleJsonLdGraph(post);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogArticleView post={post} bodyHtml={bodyHtml} />
    </>
  );
}
