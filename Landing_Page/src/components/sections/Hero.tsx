import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { hero } from "@/content/site";

function IndiaMapVisual() {
  const nodes = [
    { cx: 148, cy: 72, r: 5 },
    { cx: 168, cy: 98, r: 4.5 },
    { cx: 132, cy: 118, r: 5.5 },
    { cx: 112, cy: 150, r: 4 },
    { cx: 150, cy: 165, r: 5 },
    { cx: 98, cy: 188, r: 4.5 },
    { cx: 128, cy: 210, r: 4 },
    { cx: 108, cy: 238, r: 5 },
  ];

  return (
    <div
      className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-rm-navy via-rm-navy-deep to-[#07131f] p-6 sm:p-8"
      role="img"
      aria-label="Stylised India map with connected village-level intelligence nodes"
    >
      <div className="pointer-events-none absolute -right-10 top-8 h-40 w-40 rounded-full bg-rm-green/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-8 bottom-6 h-32 w-32 rounded-full bg-rm-green-accent/10 blur-3xl" />

      <svg viewBox="0 0 260 300" className="mx-auto h-auto w-full max-w-md" aria-hidden="true">
        <path
          d="M130 28 C162 36 188 52 198 78 C214 112 220 140 212 176 C204 214 184 242 160 262 C146 274 134 286 130 292 C126 286 114 274 100 262 C76 242 56 214 48 176 C40 140 46 112 62 78 C72 52 98 36 130 28 Z"
          fill="url(#indiaFill)"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="1.5"
        />
        <defs>
          <linearGradient id="indiaFill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#163552" />
            <stop offset="100%" stopColor="#0d2438" />
          </linearGradient>
        </defs>

        <path
          d="M148 72 L168 98 L132 118 L112 150 L150 165 L98 188 L128 210 L108 238"
          fill="none"
          stroke="#22a06b"
          strokeOpacity="0.45"
          strokeWidth="1.4"
          className="route-line"
        />

        {nodes.map((node, index) => (
          <g key={`${node.cx}-${node.cy}`} className="map-node">
            <circle cx={node.cx} cy={node.cy} r={node.r + 6} fill="#22a06b" fillOpacity="0.15" />
            <circle
              cx={node.cx}
              cy={node.cy}
              r={node.r}
              fill={index === 0 ? "#22a06b" : "#16834a"}
              stroke="white"
              strokeOpacity="0.35"
              strokeWidth="1"
            />
          </g>
        ))}
      </svg>

      <div className="mt-4 grid grid-cols-2 gap-2">
        {hero.capabilities.map((item) => (
          <div
            key={item}
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-[0.7rem] font-medium text-white/80"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="overflow-hidden bg-gradient-to-b from-rm-surface via-white to-white"
    >
      <Container className="grid items-center gap-10 py-14 lg:grid-cols-2 lg:gap-14 lg:py-20">
        <div>
          <p className="mono-label text-rm-green">{hero.eyebrow}</p>
          <h1
            id="hero-heading"
            className="mt-4 text-balance text-4xl font-semibold tracking-tight text-rm-navy sm:text-5xl lg:text-[3.4rem] lg:leading-[1.08]"
          >
            {hero.headline} <span className="text-rm-green">{hero.headlineAccent}</span>
          </h1>

          <div className="mt-5 max-w-xl space-y-4 text-base leading-relaxed text-rm-muted sm:text-lg">
            {hero.body.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {hero.ctas.map((cta) => (
              <Button
                key={cta.href}
                href={cta.href}
                variant={
                  cta.variant === "primary"
                    ? "primary"
                    : cta.variant === "secondary"
                      ? "secondary"
                      : "outline"
                }
                arrow={cta.variant === "primary"}
              >
                {cta.label}
              </Button>
            ))}
          </div>
        </div>

        <IndiaMapVisual />
      </Container>
    </section>
  );
}
