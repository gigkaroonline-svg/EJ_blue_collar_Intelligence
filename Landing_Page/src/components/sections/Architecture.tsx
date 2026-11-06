import { Section } from "@/components/ui/Section";
import { architecture } from "@/content/site";

export function Architecture() {
  return (
    <Section
      id={architecture.id}
      label={architecture.eyebrow}
      headline={architecture.headline}
      body={architecture.body}
      tone="navy"
    >
      <div className="mt-12 space-y-3">
        {architecture.hierarchy.map((layer, index) => (
          <div
            key={layer.level}
            className="hierarchy-step overflow-hidden rounded-2xl border border-white/10"
            style={{ animationDelay: `${index * 90}ms` }}
          >
            <div
              className={
                layer.dominant
                  ? "bg-rm-green px-5 py-5 sm:px-6 sm:py-6"
                  : "bg-white/5 px-5 py-4 sm:px-6"
              }
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p
                    className={
                      layer.dominant
                        ? "mono-label text-white/80"
                        : "mono-label text-white/45"
                    }
                  >
                    {layer.dominant ? "Foundation" : `Layer ${index + 1}`}
                  </p>
                  <p
                    className={
                      layer.dominant
                        ? "mt-1 text-2xl font-semibold text-white"
                        : "mt-1 text-lg font-semibold text-white"
                    }
                  >
                    {layer.level}
                  </p>
                </div>
                <p
                  className={
                    layer.dominant
                      ? "max-w-md text-sm text-white/90 sm:text-right"
                      : "max-w-md text-sm text-white/65 sm:text-right"
                  }
                >
                  {layer.detail}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-10 max-w-3xl text-base text-white/80 sm:text-lg">
        {architecture.closer}
      </p>
    </Section>
  );
}
