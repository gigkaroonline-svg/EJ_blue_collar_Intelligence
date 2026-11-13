import type { MetadataRoute } from "next";
import { pages } from "@/content/pages";
import { fetchPublishedPosts } from "@/lib/api-blogs";
import { SITE_ORIGIN } from "@/lib/site-url";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = Object.values(pages).map((page) => ({
    url: page.path === "/" ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${page.path}`,
    lastModified: new Date(),
    changeFrequency: (page.path === "/" ? "weekly" : "monthly") as "weekly" | "monthly",
    priority: page.path === "/" ? 1 : 0.7,
  }));

  const posts = await fetchPublishedPosts();
  const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_ORIGIN}/blog/${post.slug}`,
    lastModified: post.updatedAt || post.publishedAt
      ? new Date(post.updatedAt || post.publishedAt!)
      : new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  // Homepage is not in `pages` — add once, then all content routes.
  return [
    {
      url: `${SITE_ORIGIN}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...routes.filter((route) => route.url !== `${SITE_ORIGIN}/`),
    ...blogEntries,
  ];
}
