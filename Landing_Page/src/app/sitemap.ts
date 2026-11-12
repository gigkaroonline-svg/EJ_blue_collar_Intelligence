import type { MetadataRoute } from "next";
import { pages } from "@/content/pages";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://rojmitra.in";
  const staticRoutes = Object.values(pages).map((page) => ({
    url: `${base}${page.path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: page.path === "/" ? 1 : 0.7,
  }));
  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...staticRoutes,
  ];
}
