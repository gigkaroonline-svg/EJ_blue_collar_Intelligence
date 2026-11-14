import type { Metadata } from "next";
import Script from "next/script";
import { ContentPage } from "@/components/site/ContentPage";
import { theProblemPageJsonLd } from "@/lib/json-ld";
import { ogImage, SITE_ORIGIN } from "@/lib/site-url";

const url = `${SITE_ORIGIN}/the-problem`;

const title = "India's Workforce Visibility Problem | Why RojMitra Exists";
const description =
  "India has millions of skilled workers, but their experience, skills and availability remain difficult to discover. Learn why village-level workforce intelligence matters.";

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
    title: "India's Workforce Is Everywhere. The Intelligence About It Is Not.",
    description:
      "Understand India's workforce visibility gap and why village-level workforce intelligence matters for workers, employers and institutions.",
    url,
    siteName: "RojMitra by EarlyJobs",
    locale: "en_IN",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "India's Workforce Visibility Problem | RojMitra",
    description: "The talent is already there. It is time to make it visible.",
    images: [ogImage.url],
  },
};

export default function TheProblemRoute() {
  return (
    <>
      <Script
        id="the-problem-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(theProblemPageJsonLd) }}
      />
      <ContentPage slug="the-problem" />
    </>
  );
}
