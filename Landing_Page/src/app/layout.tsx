import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import { site } from "@/content/site";
import "./globals.css";

const GTM_ID = "GTM-WFNQMJVF";

const heading = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${site.name} by EarlyJobs | Village-Level Workforce Intelligence`,
  description:
    "RojMitra by EarlyJobs is India's village-level workforce intelligence infrastructure. Making India's workforce visible, village by village.",
  metadataBase: new URL(site.url),
  openGraph: {
    title: `${site.name} by EarlyJobs`,
    description: site.positioning,
    type: "website",
  },
  robots: { index: true, follow: true },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.brandLine,
  url: site.url,
  description: site.tagline,
  parentOrganization: {
    "@type": "Organization",
    name: "EarlyJobs",
    url: "https://www.earlyjobs.ai",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is RojMitra?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "RojMitra by EarlyJobs is village-level workforce intelligence infrastructure that maps, verifies and connects India's workforce at the grassroots.",
      },
    },
    {
      "@type": "Question",
      name: "Is RojMitra a job listing platform?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. RojMitra builds the intelligence layer that helps understand where India's workforce lives, what it can do, how it moves and when it is available.",
      },
    },
    {
      "@type": "Question",
      name: "How can organisations partner with RojMitra?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Village partners, employers and institutional collaborators can submit an enquiry through the website forms. Submissions do not guarantee partnership, income or employment.",
      },
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>

        <Script id="gtm-datalayer" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          `}
        </Script>
        <Script
          id="gtm-script"
          src={`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`}
          strategy="afterInteractive"
        />
        <Script
          id="org-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <Script
          id="faq-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />

        {children}
      </body>
    </html>
  );
}
