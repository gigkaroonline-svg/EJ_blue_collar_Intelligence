import type { Metadata } from "next";
import type { ContentPageData } from "@/content/pages";
import type { BlogPost } from "@/lib/api-blogs";
import { absoluteUrl, SITE_ORIGIN } from "@/lib/site-url";

export function blogCollectionJsonLd(page: ContentPageData, posts: BlogPost[]) {
  const url = absoluteUrl(page.path);
  return [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${url.replace(/\/$/, "")}#webpage`,
      url,
      name: page.title,
      description: page.description,
      isPartOf: { "@id": `${SITE_ORIGIN}/#website` },
      about: { "@id": `${SITE_ORIGIN}/#organization` },
      inLanguage: "en-IN",
      hasPart: posts.map((post, index) => ({
        "@type": "BlogPosting",
        "@id": absoluteUrl(`/blog/${post.slug}`),
        name: post.title,
        headline: post.title,
        position: index + 1,
        datePublished: post.publishedAt || undefined,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_ORIGIN },
        { "@type": "ListItem", position: 2, name: page.eyebrow, item: url },
      ],
    },
  ];
}

function authorName(post: BlogPost) {
  return post.authorName?.trim() || "RojMitra";
}

export function articleJsonLdGraph(post: BlogPost) {
  const url = absoluteUrl(`/blog/${post.slug}`);
  const image = post.coverUrl?.trim() || undefined;
  return [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "@id": `${url}#article`,
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      url,
      headline: post.title,
      name: post.title,
      description: post.metaDescription?.trim() || post.excerpt,
      image: image ? [image] : undefined,
      datePublished: post.publishedAt || undefined,
      dateModified: post.updatedAt || post.publishedAt || undefined,
      author: {
        "@type": "Organization",
        name: authorName(post),
        url: post.authorUrl?.trim() || `${SITE_ORIGIN}/`,
      },
      publisher: { "@id": `${SITE_ORIGIN}/#organization` },
      inLanguage: "en-IN",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_ORIGIN },
        { "@type": "ListItem", position: 2, name: "Blog", item: absoluteUrl("/blog") },
        { "@type": "ListItem", position: 3, name: post.title, item: url },
      ],
    },
  ];
}

export function articlePageMetadata(post: BlogPost): Metadata {
  const url = absoluteUrl(`/blog/${post.slug}`);
  const description = post.metaDescription?.trim() || post.excerpt;
  const image = post.coverUrl?.trim() || undefined;
  return {
    title: `${post.title} | RojMitra`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description,
      type: "article",
      url,
      publishedTime: post.publishedAt || undefined,
      modifiedTime: post.updatedAt || post.publishedAt || undefined,
      authors: [authorName(post)],
      images: image ? [{ url: image, alt: post.coverAlt?.trim() || post.title }] : undefined,
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title: post.title,
      description,
      images: image ? [image] : undefined,
    },
  };
}
