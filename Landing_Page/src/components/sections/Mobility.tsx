import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { mobility } from "@/content/site";

export function Mobility() {
  return (
    <Section
      id={mobility.id}
      label={mobility.eyebrow}
      headline={mobility.headline}
      body={mobility.intro}
      tone="default"
    >
      <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl border border-rm-border bg-rm-surface p-6 sm:p-8">
          <p className="mono-label text-rm-green">{mobility.story.title}</p>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-rm-muted sm:text-base">
            {mobility.story.body.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-8 overflow-hidden rounded-xl border border-rm-border bg-rm-navy-deep p-5">
            <p className="mono-label text-white/50">Animated mobility route</p>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {mobility.story.route.map((stop, index) => (
                <div key={`${stop}-${index}`} className="inline-flex items-center gap-2">
                  <span className="rounded-full bg-rm-green px-3 py-1.5 text-xs font-semibold text-white">
                    {stop}
                  </span>
                  {index < mobility.story.route.length - 1 ? (
                    <svg width="28" height="12" viewBox="0 0 28 12" aria-hidden="true">
                      <path
                        d="M1 6 H22"
                        stroke="#22a06b"
                        strokeWidth="2"
                        className="route-line"
                      />
                      <path d="M20 2 L26 6 L20 10" fill="#22a06b" />
                    </svg>
                  ) : null}
                </div>
              ))}
            </div>
            <svg
              viewBox="0 0 360 120"
              className="mt-5 h-auto w-full"
              aria-hidden="true"
            >
              <path
                d="M30 80 C80 20, 140 20, 180 60 C220 100, 280 100, 330 40"
                fill="none"
                stroke="#22a06b"
                strokeWidth="2"
                strokeOpacity="0.7"
                className="route-line"
              />
              <circle cx="30" cy="80" r="6" fill="#16834a" />
              <circle cx="180" cy="60" r="6" fill="#22a06b" />
              <circle cx="330" cy="40" r="6" fill="#16834a" />
              <text x="20" y="104" fill="white" fontSize="10" opacity="0.7">
                Bihar
              </text>
              <text x="160" y="88" fill="white" fontSize="10" opacity="0.7">
                Kerala
              </text>
              <text x="280" y="30" fill="white" fontSize="10" opacity="0.7">
                New opportunity
              </text>
            </svg>
          </div>
        </div>

        <div className="space-y-3">
          <p className="mono-label text-rm-muted">How RojMitra helps</p>
          {mobility.helps.map((item) => (
            <Card key={item.title} as="article" className="p-5">
              <h3 className="text-base font-semibold text-rm-navy">{item.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-rm-muted">{item.body}</p>
            </Card>
          ))}
        </div>
      </div>

      <p className="mt-10 max-w-3xl text-base font-medium text-rm-navy sm:text-lg">
        {mobility.closer}
      </p>
    </Section>
  );
}
