import type { Metadata } from "next";
import type { ContentPageData } from "@/content/pages";

export function pageMetadata(page: ContentPageData): Metadata {
  const url = `https://rojmitra.in${page.path}`;
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
  const url = `https://rojmitra.in${page.path}`;
  const faqs = page.sections.flatMap((section) => section.faq ?? []);
  const structured: object[] = [
    {
      "@context": "https://schema.org",
      "@type":
        page.path === "/about" || page.path === "/our-story"
          ? "AboutPage"
          : page.path === "/government-initiatives" || page.path === "/blog"
            ? "CollectionPage"
            : "WebPage",
      name: page.title,
      description: page.description,
      url,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://rojmitra.in" },
        { "@type": "ListItem", position: 2, name: page.eyebrow, item: url },
      ],
    },
  ];
  if (faqs.length) {
    structured.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    });
  }
  return structured;
}
