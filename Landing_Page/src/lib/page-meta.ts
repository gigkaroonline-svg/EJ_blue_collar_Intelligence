import type { Metadata } from "next";
import type { ContentPageData } from "@/content/pages";
import { webPageJsonLd } from "@/lib/json-ld";
import { absoluteUrl, SITE_ORIGIN } from "@/lib/site-url";

export function pageMetadata(page: ContentPageData): Metadata {
  const url = absoluteUrl(page.path);
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: url },
    openGraph: {
      title: page.title,
      description: page.description,
      type: "website",
      url,
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
    },
  };
}

export function pageJsonLd(page: ContentPageData) {
  const url = absoluteUrl(page.path);
  const faqs = page.sections.flatMap((section) => section.faq ?? []);
  const structured: object[] = [
    webPageJsonLd({
      path: page.path,
      name: page.title,
      description: page.description,
    }),
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_ORIGIN },
        { "@type": "ListItem", position: 2, name: page.eyebrow, item: url },
      ],
    },
  ];
  if (faqs.length) {
    structured.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${url.replace(/\/$/, "")}#faq`,
      mainEntity: faqs.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    });
  }
  return structured;
}
