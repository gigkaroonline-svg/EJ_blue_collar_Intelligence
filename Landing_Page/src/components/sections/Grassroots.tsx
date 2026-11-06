import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { network } from "@/content/site";

export function Grassroots() {
  return (
    <Section
      id={network.id}
      label={network.eyebrow}
      headline={network.headline}
      body={network.intro}
      tone="surface"
    >
      <div className="mt-6 rounded-xl border border-rm-border bg-white px-4 py-3 text-sm text-rm-muted">
        {network.disclaimer}
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {network.categories.map((item) => (
          <Card key={item.step} as="article">
            <p className="mono-label text-rm-green">{item.step}</p>
            <h3 className="mt-3 text-lg font-semibold text-rm-navy">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-rm-muted">{item.body}</p>
          </Card>
        ))}
      </div>
      <p className="mt-10 max-w-3xl text-base font-medium text-rm-navy sm:text-lg">
        {network.closer}
      </p>
    </Section>
  );
}
