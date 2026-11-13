import type { Metadata } from "next";
import { ContactPage } from "@/components/site/ContactPage";
import { absoluteUrl } from "@/lib/site-url";

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
