import type { Metadata } from "next";
import Script from "next/script";
import { PartnerPage } from "@/components/site/StoryPages";
import { becomeSourcingPartnerPageJsonLd } from "@/lib/json-ld";
import { ogImage, SITE_ORIGIN } from "@/lib/site-url";

const url = `${SITE_ORIGIN}/become-a-sourcing-partner`;

const title = "Become a Village Workforce Sourcing Partner | RojMitra";
const description =
  "Become a RojMitra sourcing partner. Connect with workers in your village, document skills and work experience, and help build India's village-level workforce intelligence network.";

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
      "Use your local community connections to help build village-level workforce intelligence with RojMitra by EarlyJobs.",
    url,
    siteName: "RojMitra by EarlyJobs",
    locale: "en_IN",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description:
      "Join the RojMitra network and help connect local workforce knowledge with employment opportunities.",
    images: [ogImage.url],
  },
};

export default function BecomePartnerRoute() {
  return (
    <>
      <Script
        id="become-sourcing-partner-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(becomeSourcingPartnerPageJsonLd) }}
      />
      <PartnerPage />
    </>
  );
}
