import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { AboutStatement } from "@/components/sections/AboutStatement";
import { BentoGrid } from "@/components/sections/BentoGrid";
import { BuiltOnTrust } from "@/components/sections/BuiltOnTrust";
import { BusinessModel } from "@/components/sections/BusinessModel";
import { Ecosystem } from "@/components/sections/Ecosystem";
import { FAQSection } from "@/components/sections/FAQSection";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Impact } from "@/components/sections/Impact";
import { Legal } from "@/components/sections/Legal";
import { NetworkStrip } from "@/components/sections/NetworkStrip";
import { OurStory } from "@/components/sections/OurStory";
import { TheProblem } from "@/components/sections/TheProblem";
import { VisionMission } from "@/components/sections/VisionMission";
import { WhatItIs } from "@/components/sections/WhatItIs";
import { WhatWeMap } from "@/components/sections/WhatWeMap";
import { WhoItServes } from "@/components/sections/WhoItServes";

export default function HomePage() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:m-0 focus:inline-flex focus:h-auto focus:w-auto focus:overflow-visible focus:whitespace-nowrap focus:rounded-full focus:border-0 focus:bg-rm-blue focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:uppercase focus:tracking-wider focus:text-white focus:shadow-lg"
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
        <VisionMission />
        <FAQSection />
        <FinalCTA />
        <Legal />
      </main>
      <Footer />
    </>
  );
}
