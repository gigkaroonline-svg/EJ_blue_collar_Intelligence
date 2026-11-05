import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { businessModel } from "@/content/site";

export function BusinessModel() {
  return (
    <section
      id="business"
      aria-labelledby="business-heading"
      className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-3xl text-center">
        <SectionLabel>{businessModel.label}</SectionLabel>
        <h2
          id="business-heading"
          className="text-3xl font-semibold tracking-tight text-rm-ink sm:text-4xl"
        >
          {businessModel.headline}
        </h2>
        <p className="mt-4 text-base leading-relaxed text-rm-muted sm:text-lg">
          {businessModel.body}
        </p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {businessModel.cards.map((card) => (
          <Card key={card.title} as="article">
            <h3 className="text-xl font-semibold tracking-tight text-rm-ink">
              {card.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-rm-muted sm:text-base">
              {card.body}
            </p>
          </Card>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <Button href={businessModel.cta.href} variant="blue" arrow>
          {businessModel.cta.label}
        </Button>
      </div>
    </section>
  );
}
