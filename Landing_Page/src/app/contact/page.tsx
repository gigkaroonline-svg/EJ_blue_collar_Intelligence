import type { Metadata } from "next";
import { ContactPage } from "@/components/site/ContactPage";
import { absoluteUrl, ogImage } from "@/lib/site-url";

const title = "Contact RojMitra | Village Workforce Intelligence";
const description =
  "Contact RojMitra by EarlyJobs with your enquiry. Share your name, mobile number, email and message — attachments optional.";
const path = "/contact";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: absoluteUrl(path) },
  openGraph: {
    title,
    description,
    type: "website",
    url: absoluteUrl(path),
    siteName: "RojMitra by EarlyJobs",
    locale: "en_IN",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [ogImage.url],
  },
};

export default function ContactRoute() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      name: title,
      description,
      url: absoluteUrl(path),
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ContactPage />
    </>
  );
}
