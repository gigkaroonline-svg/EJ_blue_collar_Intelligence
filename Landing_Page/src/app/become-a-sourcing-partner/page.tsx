import type { Metadata } from "next";
import { PartnerPage } from "@/components/site/StoryPages";
import { pages } from "@/content/pages";
import { pageJsonLd, pageMetadata } from "@/lib/page-meta";

const page = pages["become-a-sourcing-partner"];

export const metadata: Metadata = pageMetadata(page);

export default function BecomePartnerRoute() {
  const jsonLd = pageJsonLd(page);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PartnerPage />
    </>
  );
}
