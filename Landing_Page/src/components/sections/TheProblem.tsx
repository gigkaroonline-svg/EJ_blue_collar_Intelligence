import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { problem } from "@/content/site";

export function TheProblem() {
  return (
    <Section
      id={problem.id}
      label={problem.eyebrow}
      headline={problem.headline}
      body={problem.body}
      tone="default"
    >
      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {problem.cards.map((card) => (
          <Card key={card.step} as="article">
            <p className="mono-label text-rm-green">{card.step}</p>
            <h3 className="mt-3 text-xl font-semibold text-rm-navy">{card.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-rm-muted sm:text-base">{card.body}</p>
          </Card>
        ))}
      </div>
      <p className="mt-10 max-w-3xl text-base font-medium text-rm-navy sm:text-lg">{problem.closer}</p>
    </Section>
  );
}
