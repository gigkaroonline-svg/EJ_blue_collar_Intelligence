import type { Metadata } from "next";
import { WorkforceIntelligencePage } from "@/components/site/InsightPages";
import { pages } from "@/content/pages";
import { pageJsonLd, pageMetadata } from "@/lib/page-meta";

const page = pages["workforce-intelligence"];

export const metadata: Metadata = pageMetadata(page);

export default function WorkforceIntelligenceRoute() {
  const jsonLd = pageJsonLd(page);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <WorkforceIntelligencePage />
    </>
  );
}
