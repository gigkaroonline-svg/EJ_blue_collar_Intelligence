import type { Metadata } from "next";
import { HowItWorksPage } from "@/components/site/InsightPages";
import { pages } from "@/content/pages";
import { pageJsonLd, pageMetadata } from "@/lib/page-meta";

const page = pages["how-it-works"];

export const metadata: Metadata = pageMetadata(page);

export default function HowItWorksRoute() {
  const jsonLd = pageJsonLd(page);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HowItWorksPage />
    </>
  );
}
