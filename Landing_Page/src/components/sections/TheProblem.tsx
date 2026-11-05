import { Card } from "@/components/ui/Card";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { problem } from "@/content/site";

export function TheProblem() {
  return (
    <section
      id="problem"
      aria-labelledby="problem-heading"
      className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-3xl text-center">
        <SectionLabel>{problem.label}</SectionLabel>
        <h2
          id="problem-heading"
          className="text-3xl font-semibold tracking-tight text-rm-ink sm:text-4xl"
        >
          {problem.headline}
        </h2>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {problem.cards.map((card) => (
          <Card key={card.audience} as="article">
            <p className="mono-label text-rm-orange">{card.audience}</p>
            <h3 className="mt-3 text-xl font-semibold tracking-tight text-rm-ink">
              {card.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-rm-muted sm:text-base">
              {card.body}
            </p>
          </Card>
        ))}
      </div>

      <p className="mx-auto mt-12 max-w-3xl text-center text-2xl font-semibold tracking-tight text-rm-ink sm:text-3xl">
        {problem.closer}
      </p>
    </section>
  );
}
