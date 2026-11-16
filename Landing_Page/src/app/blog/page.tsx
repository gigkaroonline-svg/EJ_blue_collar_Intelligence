import type { Metadata } from "next";
import Script from "next/script";
import { BlogIndexClient } from "@/app/blog/blog-index-client";
import { blogPageJsonLd } from "@/lib/json-ld";
import { ogImage, SITE_ORIGIN } from "@/lib/site-url";

const url = `${SITE_ORIGIN}/blog`;

const title = "India Workforce Research & Labour Insights | RojMitra";
const description =
  "Explore research, insights and stories on India's workforce, labour migration, gig economy, worker skills, employment trends and village-level workforce intelligence by RojMitra.";

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
      "Research and stories on India's workforce, migration, employment, gig economy and village-level workforce intelligence.",
    url,
    siteName: "RojMitra by EarlyJobs",
    locale: "en_IN",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: "Explore India's changing workforce through research, stories and labour intelligence.",
    images: [ogImage.url],
  },
};

export default function BlogRoute() {
  return (
    <>
      <Script
        id="blog-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPageJsonLd) }}
      />
      <BlogIndexClient />
    </>
  );
}
