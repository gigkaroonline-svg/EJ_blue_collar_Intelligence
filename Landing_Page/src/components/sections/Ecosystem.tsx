import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { ecosystem } from "@/content/site";

export function Ecosystem() {
  return (
    <Section
      id={ecosystem.id}
      label={ecosystem.eyebrow}
      headline={ecosystem.headline}
      body={ecosystem.intro}
      tone="default"
    >
      <div className="mt-12 grid gap-4 lg:grid-cols-3">
        {ecosystem.products.map((product, index) => (
          <Card
            key={product.name}
            as="article"
            className={product.highlight ? "border-rm-green/30 bg-rm-green-soft" : undefined}
          >
            <p className="mono-label text-rm-green">0{index + 1}</p>
            <h3 className="mt-3 text-xl font-semibold text-rm-navy">{product.name}</h3>
            <p className="mt-1 text-sm font-medium text-rm-navy/80">{product.role}</p>
            <p className="mt-3 text-sm leading-relaxed text-rm-muted">{product.body}</p>
          </Card>
        ))}
      </div>

      <div className="mt-10 overflow-hidden rounded-2xl border border-rm-border bg-rm-navy-deep p-6 text-white sm:p-8">
        <p className="mono-label text-white/50">Unified ecosystem</p>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          {ecosystem.products.map((product, index) => (
            <div key={product.name} className="inline-flex items-center gap-3">
              <span className="rounded-full bg-rm-green px-4 py-2 text-sm font-semibold">
                {product.name}
              </span>
              {index < ecosystem.products.length - 1 ? (
                <span className="text-white/40" aria-hidden>
                  →
                </span>
              ) : null}
            </div>
          ))}
        </div>
        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-white/75 sm:text-base">
          {ecosystem.closer}
        </p>
      </div>
    </Section>
  );
}
