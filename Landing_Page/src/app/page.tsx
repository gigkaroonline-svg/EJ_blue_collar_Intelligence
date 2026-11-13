import Script from "next/script";
import { AboutStatement } from "@/components/site/AboutStatement";
import { Ecosystem, FAQSection, FinalCTA, Legal } from "@/components/site/ClosingSections";
import { Footer } from "@/components/site/Footer";
import { Hero } from "@/components/site/Hero";
import { Navbar } from "@/components/site/Navbar";
import {
  BuiltOnTrust,
  BusinessModel,
  HowItWorks,
  Impact,
  WhatWeMap,
  WhoItServes,
} from "@/components/site/PlatformSections";
import {
  BentoGrid,
  NetworkStrip,
  OurStory,
  TheProblem,
  WhatItIs,
} from "@/components/site/StorySections";
import { faq } from "@/content/site";
import { webPageJsonLd } from "@/lib/json-ld";
import { SITE_ORIGIN } from "@/lib/site-url";

const title = "Village-Level Workforce Intelligence India | RojMitra";
const description =
  "RojMitra by EarlyJobs maps village-level workforce skills, experience and availability to support enterprise hiring and institutional workforce planning.";

const homeJsonLd = [
  webPageJsonLd({ path: "/", name: title, description }),
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_ORIGIN}/#faq`,
    mainEntity: faq.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  },
];

export default function HomePage() {
  return (
    <>
      <Script
        id="homepage-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-brand focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:uppercase focus:tracking-wider focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <NetworkStrip />
        <AboutStatement />
        <BentoGrid />
        <OurStory />
        <TheProblem />
        <WhatItIs />
        <HowItWorks />
        <WhatWeMap />
        <WhoItServes />
        <BuiltOnTrust />
        <Impact />
        <BusinessModel />
        <Ecosystem />
        <FAQSection />
        <FinalCTA />
        <Legal />
      </main>
      <Footer />
    </>
  );
}
