import type { Metadata } from "next";
import Script from "next/script";
import { AboutPage } from "@/components/site/StoryPages";
import { pages } from "@/content/pages";
import { aboutPageJsonLd } from "@/lib/json-ld";
import { ogImage, SITE_ORIGIN } from "@/lib/site-url";

const page = pages.about;
const url = `${SITE_ORIGIN}/about`;

const title = "About RojMitra | Village-Level Workforce Intelligence by EarlyJobs";
const description =
  "Discover why EarlyJobs built RojMitra, India's village-level workforce intelligence initiative, to document workers' skills, experience, availability and employment journeys.";

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
    title: "About RojMitra | Built from Recruitment Experience",
    description:
      "Learn how RojMitra by EarlyJobs is building village-level workforce intelligence infrastructure, starting from Bihar.",
    url,
    siteName: "RojMitra by EarlyJobs",
    locale: "en_IN",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "About RojMitra | Village-Level Workforce Intelligence",
    description: "The story behind RojMitra, India's village-first workforce intelligence initiative.",
    images: [ogImage.url],
  },
};

export default function AboutRoute() {
  const faqs = page.sections.flatMap((section) => section.faq ?? []);
  const jsonLd =
    faqs.length === 0
      ? aboutPageJsonLd
      : {
          ...aboutPageJsonLd,
          "@graph": [
            ...aboutPageJsonLd["@graph"],
            {
              "@type": "FAQPage",
              "@id": `${url}#faq`,
              mainEntity: faqs.map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: { "@type": "Answer", text: item.answer },
              })),
            },
          ],
        };

  return (
    <>
      <Script
        id="about-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AboutPage />
    </>
  );
}
