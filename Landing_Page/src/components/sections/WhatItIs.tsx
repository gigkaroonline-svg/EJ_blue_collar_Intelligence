import { ComparisonTable } from "@/components/ComparisonTable";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { whatItIs } from "@/content/site";

export function WhatItIs() {
  return (
    <section
      id="what-it-is"
      aria-labelledby="what-heading"
      className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-3xl text-center">
        <SectionLabel>{whatItIs.label}</SectionLabel>
        <h2
          id="what-heading"
          className="text-3xl font-semibold tracking-tight text-rm-ink sm:text-4xl"
        >
          {whatItIs.headline}
        </h2>
        <p className="mt-4 text-base leading-relaxed text-rm-muted sm:text-lg">
          {whatItIs.body}
        </p>
      </div>

      <div className="mt-10">
        <ComparisonTable />
      </div>
    </section>
  );
}
