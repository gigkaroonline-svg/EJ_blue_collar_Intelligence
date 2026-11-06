import { BuildingBadge } from "@/components/ui/BuildingBadge";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { intelligence } from "@/content/site";

export function WhatWeDo() {
  return (
    <Section
      id={intelligence.id}
      label={intelligence.eyebrow}
      headline={intelligence.headline}
      body={intelligence.intro}
      tone="surface"
    >
      <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {intelligence.cards.map((card) => (
          <Card key={card.step} as="article">
            <div className="flex items-start justify-between gap-3">
              <p className="mono-label text-rm-green">{card.step}</p>
              {"building" in card && card.building ? <BuildingBadge /> : null}
            </div>
            <h3 className="mt-3 text-xl font-semibold text-rm-navy">{card.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-rm-muted">{card.body}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {card.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-rm-border bg-rm-surface px-2.5 py-1 text-[0.68rem] font-medium text-rm-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Card>
        ))}
      </div>
      <p className="mt-10 max-w-3xl text-base font-medium text-rm-navy sm:text-lg">
        {intelligence.closer}
      </p>
    </Section>
  );
}
