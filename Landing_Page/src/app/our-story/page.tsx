import type { Metadata } from "next";
import { OurStoryPage } from "@/components/site/StoryPages";
import { pages } from "@/content/pages";
import { pageJsonLd, pageMetadata } from "@/lib/page-meta";

const page = pages["our-story"];

export const metadata: Metadata = pageMetadata(page);

export default function OurStoryRoute() {
  const jsonLd = pageJsonLd(page);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <OurStoryPage />
    </>
  );
}
