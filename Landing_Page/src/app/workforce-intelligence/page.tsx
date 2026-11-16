import type { Metadata } from "next";
import Script from "next/script";
import { WorkforceIntelligencePage } from "@/components/site/InsightPages";
import { workforceIntelligencePageJsonLd } from "@/lib/json-ld";
import { ogImage, SITE_ORIGIN } from "@/lib/site-url";

const url = `${SITE_ORIGIN}/workforce-intelligence`;

const title = "Village-Level Workforce Intelligence in India | RojMitra";
const description =
  "Understand village-level workforce intelligence in India. RojMitra maps worker skills, occupations, employment experience, migration and availability from villages upward.";

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
    title: "Village-Level Workforce Intelligence for India | RojMitra",
    description:
      "Understand where workers are, what skills and experience they have, and when they may be available. RojMitra is building India's village-level workforce intelligence infrastructure.",
    url,
    siteName: "RojMitra by EarlyJobs",
    locale: "en_IN",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Village-Level Workforce Intelligence | RojMitra",
    description: "Making India's workforce more visible, from village to national level.",
    images: [ogImage.url],
  },
};

export default function WorkforceIntelligenceRoute() {
  return (
    <>
      <Script
        id="workforce-intelligence-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(workforceIntelligencePageJsonLd) }}
      />
      <WorkforceIntelligencePage />
    </>
  );
}
