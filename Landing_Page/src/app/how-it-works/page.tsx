import type { Metadata } from "next";
import Script from "next/script";
import { HowItWorksPage } from "@/components/site/InsightPages";
import { howItWorksPageJsonLd } from "@/lib/json-ld";
import { ogImage, SITE_ORIGIN } from "@/lib/site-url";

const url = `${SITE_ORIGIN}/how-it-works`;

const title = "How RojMitra Works | Village-Level Workforce Mapping in India";
const description =
  "Discover how RojMitra builds village-level workforce intelligence through local partners, consent-based worker registration, structured profiles and employer requirements.";

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
    title: "How RojMitra Builds Village-Level Workforce Intelligence",
    description:
      "People, information and technology come together to make India's local workforce more visible and accessible.",
    url,
    siteName: "RojMitra by EarlyJobs",
    locale: "en_IN",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "How RojMitra Works",
    description: "From village-level worker engagement to structured workforce intelligence.",
    images: [ogImage.url],
  },
};

export default function HowItWorksRoute() {
  return (
    <>
      <Script
        id="how-it-works-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howItWorksPageJsonLd) }}
      />
      <HowItWorksPage />
    </>
  );
}
