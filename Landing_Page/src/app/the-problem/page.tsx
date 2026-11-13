import type { Metadata } from "next";
import { ContentPage } from "@/components/site/ContentPage";
import { pages } from "@/content/pages";
import { pageJsonLd, pageMetadata } from "@/lib/page-meta";

const page = pages["the-problem"];

export const metadata: Metadata = pageMetadata(page);

export default function TheProblemRoute() {
  const jsonLd = pageJsonLd(page);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ContentPage slug="the-problem" />
    </>
  );
}
