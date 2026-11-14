import type { Metadata } from "next";
import Script from "next/script";
import { GovernmentPage } from "@/components/site/InsightPages";
import { governmentInitiativesPageJsonLd } from "@/lib/json-ld";
import { ogImage, SITE_ORIGIN } from "@/lib/site-url";

const url = `${SITE_ORIGIN}/government-initiatives`;

const title = "Government Labour & Gig Worker Initiatives in India | RojMitra";
const description =
  "Explore India's government initiatives for unorganised workers, e-Shram registration, gig worker welfare and labour policies. Follow official updates with RojMitra by EarlyJobs.";

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
      "Track government initiatives shaping worker registration, gig worker welfare, social security and workforce visibility in India.",
    url,
    siteName: "RojMitra by EarlyJobs",
    locale: "en_IN",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description:
      "Understand India's evolving labour policies, worker registration systems and gig workforce initiatives.",
    images: [ogImage.url],
  },
};

export default function GovernmentInitiativesRoute() {
  return (
    <>
      <Script
        id="government-initiatives-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(governmentInitiativesPageJsonLd) }}
      />
      <GovernmentPage />
    </>
  );
}
