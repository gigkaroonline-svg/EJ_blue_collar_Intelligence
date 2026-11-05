import { Card } from "@/components/ui/Card";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { trust } from "@/content/site";

export function BuiltOnTrust() {
  return (
    <section
      id="trust"
      aria-labelledby="trust-heading"
      className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-3xl text-center">
        <SectionLabel>{trust.label}</SectionLabel>
        <h2
          id="trust-heading"
          className="text-3xl font-semibold tracking-tight text-rm-ink sm:text-4xl"
        >
          {trust.headline}
        </h2>
        <p className="mt-4 text-base leading-relaxed text-rm-muted sm:text-lg">
          {trust.body}
        </p>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {trust.pillars.map((pillar) => (
          <Card key={pillar.title} as="article">
            <h3 className="text-xl font-semibold tracking-tight text-rm-ink">
              {pillar.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-rm-muted sm:text-base">
              {pillar.body}
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
}
