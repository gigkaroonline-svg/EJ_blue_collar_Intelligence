import { BuildingBadge } from "@/components/ui/BuildingBadge";
import { Card } from "@/components/ui/Card";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { bento } from "@/content/site";

export function BentoGrid() {
  return (
    <section
      aria-labelledby="bento-heading"
      className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8"
    >
      <div className="mb-8 max-w-2xl">
        <SectionLabel>At a glance</SectionLabel>
        <h2
          id="bento-heading"
          className="text-3xl font-semibold tracking-tight text-rm-ink sm:text-4xl"
        >
          Infrastructure you can see taking shape.
        </h2>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card as="article" className="flex h-full flex-col">
          <SectionLabel>{bento.districtCoverage.label}</SectionLabel>
          <h3 className="mt-3 text-3xl font-semibold tracking-tight text-rm-blue sm:text-4xl">
            {bento.districtCoverage.title}
          </h3>
          <p className="mt-4 max-w-md text-base leading-relaxed text-rm-muted">
            {bento.districtCoverage.body}
          </p>

          <ul className="mt-8 space-y-4 border-t border-rm-border pt-6">
            {bento.districtCoverage.points.map((point) => (
              <li key={point.title} className="flex gap-3">
                <span
                  aria-hidden
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-rm-orange"
                />
                <div>
                  <p className="text-sm font-semibold text-rm-ink">{point.title}</p>
                  <p className="text-sm text-rm-muted">{point.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </Card>

        <Card
          as="article"
          className="flex h-full flex-col border-transparent bg-rm-sky-pale"
        >
          <SectionLabel>{bento.systemLayers.label}</SectionLabel>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight text-rm-blue sm:text-3xl">
            {bento.systemLayers.title}
          </h3>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-rm-muted sm:text-base">
            {bento.systemLayers.body}
          </p>
          <ol className="mt-6 grid flex-1 gap-3 sm:grid-cols-2">
            {bento.systemLayers.points.map((point) => (
              <li
                key={point.step}
                className="flex flex-col justify-between rounded-2xl border border-white/80 bg-white p-4 shadow-sm"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="font-mono text-[0.7rem] text-rm-blue">
                    {point.step}
                  </span>
                  {point.status === "building" ? <BuildingBadge /> : null}
                </div>
                <p className="mt-3 text-sm font-semibold text-rm-ink">
                  {point.title}
                </p>
              </li>
            ))}
          </ol>
        </Card>
      </div>
    </section>
  );
}
