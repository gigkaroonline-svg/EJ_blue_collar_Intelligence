import { Card } from "@/components/ui/Card";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { impact } from "@/content/site";

export function Impact() {
  return (
    <section
      id="impact"
      aria-labelledby="impact-heading"
      className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-3xl text-center">
        <SectionLabel>{impact.label}</SectionLabel>
        <h2
          id="impact-heading"
          className="text-3xl font-semibold tracking-tight text-rm-ink sm:text-4xl"
        >
          {impact.headline}
        </h2>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {impact.tiles.map((tile, index) => (
          <Card
            key={tile.title}
            as="article"
            className={
              index === 0
                ? "!border-transparent !bg-rm-blue !text-white"
                : index === 2
                  ? "!border-transparent !bg-rm-sky-pale"
                  : undefined
            }
          >
            <p
              className={`font-mono text-[0.7rem] uppercase tracking-normal ${
                index === 0 ? "text-white/70" : "text-rm-muted"
              }`}
            >
              {String(index + 1).padStart(2, "0")}
            </p>
            <h3
              className={`mt-3 text-xl font-semibold tracking-tight ${
                index === 0 ? "text-white" : "text-rm-ink"
              }`}
            >
              {tile.title}
            </h3>
            <p
              className={`mt-3 text-sm leading-relaxed ${
                index === 0 ? "text-white/80" : "text-rm-muted"
              }`}
            >
              {tile.body}
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
}
