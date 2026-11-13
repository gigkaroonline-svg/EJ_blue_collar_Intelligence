import { absoluteUrl, SITE_ORIGIN } from "@/lib/site-url";

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_ORIGIN}/#organization`,
      name: "RojMitra",
      url: `${SITE_ORIGIN}/`,
      description:
        "RojMitra is a village-level workforce intelligence initiative by EarlyJobs.",
      areaServed: {
        "@type": "Country",
        name: "India",
      },
      parentOrganization: {
        "@type": "Organization",
        "@id": "https://www.earlyjobs.ai/#organization",
        name: "EarlyJobs",
        url: "https://www.earlyjobs.ai/",
      },
      contactPoint: {
        "@type": "ContactPoint",
        email: "info@earlyjobs.in",
        contactType: "general enquiries",
        areaServed: "IN",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_ORIGIN}/#website`,
      url: `${SITE_ORIGIN}/`,
      name: "RojMitra by EarlyJobs",
      publisher: {
        "@id": `${SITE_ORIGIN}/#organization`,
      },
      inLanguage: "en-IN",
    },
  ],
};

export function webPageJsonLd(input: {
  path: string;
  name: string;
  description: string;
}) {
  const url = absoluteUrl(input.path);
  return {
    "@type": "WebPage",
    "@id": `${url.replace(/\/$/, "")}#webpage`,
    url,
    name: input.name,
    description: input.description,
    isPartOf: {
      "@id": `${SITE_ORIGIN}/#website`,
    },
    about: {
      "@id": `${SITE_ORIGIN}/#organization`,
    },
    inLanguage: "en-IN",
  };
}
