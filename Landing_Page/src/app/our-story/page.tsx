import type { Metadata } from "next";
import Script from "next/script";
import { OurStoryPage } from "@/components/site/StoryPages";
import { ourStoryPageJsonLd } from "@/lib/json-ld";
import { ogImage, SITE_ORIGIN } from "@/lib/site-url";

const url = `${SITE_ORIGIN}/our-story`;

const title = "Why We Built RojMitra | A Worker's Experience Should Travel With Them";
const description =
  "Discover why EarlyJobs built RojMitra: to make workers' skills, employment experience and work journeys visible through village-level workforce intelligence in India.";

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
    type: "article",
    title: "Why We Built RojMitra: A Worker's Experience Should Travel With Them",
    description:
      "The story behind RojMitra and the effort to make India's workforce experience visible, understood and recognised.",
    url,
    siteName: "RojMitra by EarlyJobs",
    locale: "en_IN",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Why We Built RojMitra",
    description: "A worker's experience should travel with them. Discover the story behind RojMitra.",
    images: [ogImage.url],
  },
};

export default function OurStoryRoute() {
  return (
    <>
      <Script
        id="our-story-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ourStoryPageJsonLd) }}
      />
      <OurStoryPage />
    </>
  );
}
