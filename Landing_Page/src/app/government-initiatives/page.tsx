import type { Metadata } from "next";
import { GovernmentPage } from "@/components/site/InsightPages";
import { pages } from "@/content/pages";
import { pageJsonLd, pageMetadata } from "@/lib/page-meta";

const page = pages["government-initiatives"];

export const metadata: Metadata = pageMetadata(page);

export default function GovernmentInitiativesRoute() {
  const jsonLd = pageJsonLd(page);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <GovernmentPage />
    </>
  );
}
