import type { Metadata } from "next";
import Script from "next/script";
import { EmployersPage } from "@/components/site/EmployersPage";
import { forEmployersPageJsonLd } from "@/lib/json-ld";
import { ogImage, SITE_ORIGIN } from "@/lib/site-url";

const url = `${SITE_ORIGIN}/for-employers`;

const title = "Frontline Workforce Intelligence for Employers | RojMitra";
const description =
  "Discover frontline workforce intelligence for manufacturing, logistics, warehousing, construction and retail. Understand local workers by location, skills and experience with RojMitra by EarlyJobs.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  openGraph: {
    type: "website",
    title,
    description:
      "Understand the workforce around your hiring locations. Explore local skills, experience and workforce availability with RojMitra by EarlyJobs.",
    url,
    siteName: "RojMitra by EarlyJobs",
    locale: "en_IN",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description:
      "Understand local and returning frontline workforce through village-level workforce intelligence.",
    images: [ogImage.url],
  },
};

export default function ForEmployersRoute() {
  return (
    <>
      <Script
        id="for-employers-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(forEmployersPageJsonLd) }}
      />
      <EmployersPage />
    </>
  );
}
