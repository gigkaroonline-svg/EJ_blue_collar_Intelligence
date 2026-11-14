import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { organizationJsonLd } from "@/lib/json-ld";
import { ogImage, SITE_ORIGIN } from "@/lib/site-url";
import "./globals.css";

const GTM_ID = "GTM-WFNQMJVF";

const title = "RojMitra | Village-Level Workforce Intelligence Mapping System in India";
const description =
  "RojMitra by EarlyJobs is building India's Labour Intelligence Mapping System, documenting workers' skills, experience, availability and employment journeys at village level.";
const ogTitle = "RojMitra | India's Labour Intelligence Mapping System";
const ogDescription =
  "Building village-level workforce intelligence infrastructure to help employers and institutions understand India's local workforce.";
const twitterDescription =
  "Building village-level workforce intelligence infrastructure across India.";

export const metadata: Metadata = {
  title,
  description,
  authors: [{ name: "EarlyJobs" }],
  metadataBase: new URL(SITE_ORIGIN),
  alternates: {
    canonical: `${SITE_ORIGIN}/`,
  },
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
    title: ogTitle,
    description: ogDescription,
    url: `${SITE_ORIGIN}/`,
    siteName: "RojMitra by EarlyJobs",
    locale: "en_IN",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: ogTitle,
    description: twitterDescription,
    images: [ogImage.url],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-48.png", type: "image/png", sizes: "48x48" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0B2A5B",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500&display=swap"
        />
      </head>
      <body className="min-h-full bg-background text-foreground">
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
          id="organization-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />

        {children}
      </body>
    </html>
  );
}
