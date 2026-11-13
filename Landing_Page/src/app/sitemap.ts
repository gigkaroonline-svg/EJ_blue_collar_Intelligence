import type { MetadataRoute } from "next";
import { pages } from "@/content/pages";
import { SITE_ORIGIN } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = Object.values(pages).map((page) => ({
    url: page.path === "/" ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${page.path}`,
    lastModified: new Date(),
    changeFrequency: (page.path === "/" ? "weekly" : "monthly") as "weekly" | "monthly",
    priority: page.path === "/" ? 1 : 0.7,
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
  ];
}
