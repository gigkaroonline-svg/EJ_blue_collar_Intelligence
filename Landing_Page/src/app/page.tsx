import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Architecture } from "@/components/sections/Architecture";
import { BuiltOnTrust } from "@/components/sections/BuiltOnTrust";
import { DashboardSection } from "@/components/sections/DashboardSection";
import { Ecosystem } from "@/components/sections/Ecosystem";
import { Employers } from "@/components/sections/Employers";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Grassroots } from "@/components/sections/Grassroots";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Legal } from "@/components/sections/Legal";
import { Mobility } from "@/components/sections/Mobility";
import { Partners } from "@/components/sections/Partners";
import { TheProblem } from "@/components/sections/TheProblem";
import { WhatWeDo } from "@/components/sections/WhatWeDo";

export default function HomePage() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:m-0 focus:inline-flex focus:h-auto focus:w-auto focus:overflow-visible focus:whitespace-nowrap focus:rounded-full focus:border-0 focus:bg-rm-green focus:px-4 focus:py-2 focus:text-xs focus:font-semibold focus:uppercase focus:tracking-wider focus:text-white focus:shadow-lg"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <TheProblem />
        <WhatWeDo />
        <Architecture />
        <DashboardSection />
        <HowItWorks />
        <Mobility />
        <Grassroots />
        <Partners />
        <Employers />
        <Ecosystem />
        <BuiltOnTrust />
        <FinalCTA />
        <Legal />
      </main>
      <Footer />
    </>
  );
}
