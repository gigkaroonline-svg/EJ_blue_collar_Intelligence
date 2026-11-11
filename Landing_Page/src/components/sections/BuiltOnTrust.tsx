import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { trust } from "@/content/site";

export function BuiltOnTrust() {
  return (
    <Section
      id={trust.id}
      label={trust.eyebrow}
      headline={trust.headline}
      body={trust.intro}
      tone="surface"
    >
      <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {trust.principles.map((item, index) => (
          <Card key={item.title} as="article">
            <p className="mono-label text-rm-green">0{index + 1}</p>
            <h3 className="mt-3 text-lg font-semibold text-rm-navy">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-rm-muted">{item.body}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
