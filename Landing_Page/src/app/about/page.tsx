import type { Metadata } from "next";
import { AboutPage } from "@/components/site/StoryPages";
import { pages } from "@/content/pages";
import { pageJsonLd, pageMetadata } from "@/lib/page-meta";

const page = pages.about;

export const metadata: Metadata = pageMetadata(page);

export default function AboutRoute() {
  const jsonLd = pageJsonLd(page);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <AboutPage />
    </>
  );
}
