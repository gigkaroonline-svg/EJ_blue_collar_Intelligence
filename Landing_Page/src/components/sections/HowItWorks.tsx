import { BuildingBadge } from "@/components/ui/BuildingBadge";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { howItWorks } from "@/content/site";

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-heading"
      className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-3xl text-center">
        <SectionLabel>{howItWorks.label}</SectionLabel>
        <h2
          id="how-heading"
          className="text-3xl font-semibold tracking-tight text-rm-ink sm:text-4xl"
        >
          {howItWorks.headline}
        </h2>
      </div>

      <ol className="relative mt-12 grid gap-4 lg:grid-cols-4">
        <div
          aria-hidden
          className="pointer-events-none absolute left-0 right-0 top-10 hidden h-px bg-gradient-to-r from-transparent via-rm-border to-transparent lg:block"
        />
        {howItWorks.layers.map((layer) => (
          <li
            key={layer.step}
            className="relative rounded-[1.75rem] border border-rm-border bg-white p-6"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-rm-sky-pale font-mono text-xs text-rm-blue">
                {layer.step}
              </span>
              {layer.status === "building" ? <BuildingBadge /> : null}
            </div>
            <h3 className="mt-5 text-xl font-semibold tracking-tight text-rm-ink">
              {layer.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-rm-muted">{layer.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
