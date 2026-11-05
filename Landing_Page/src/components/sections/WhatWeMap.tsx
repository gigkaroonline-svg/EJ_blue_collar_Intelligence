import { BuildingBadge } from "@/components/ui/BuildingBadge";
import { Card } from "@/components/ui/Card";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { whatWeMap } from "@/content/site";

export function WhatWeMap() {
  return (
    <section
      id="what-we-map"
      aria-labelledby="map-heading"
      className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-3xl text-center">
        <SectionLabel>{whatWeMap.label}</SectionLabel>
        <h2
          id="map-heading"
          className="text-3xl font-semibold tracking-tight text-rm-ink sm:text-4xl"
        >
          {whatWeMap.headline}
        </h2>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {whatWeMap.items.map((item) => (
          <Card key={item.title} as="article">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-xl font-semibold tracking-tight text-rm-ink">
                {item.title}
              </h3>
              {item.building ? <BuildingBadge /> : null}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-rm-muted sm:text-base">
              {item.body}
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
}
