import type { Metadata } from "next";
import { EmployersPage } from "@/components/site/EmployersPage";
import { pages } from "@/content/pages";
import { pageJsonLd, pageMetadata } from "@/lib/page-meta";

const page = pages["for-employers"];

export const metadata: Metadata = pageMetadata(page);

export default function ForEmployersRoute() {
  const jsonLd = pageJsonLd(page);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <EmployersPage />
    </>
  );
}
