import { hero } from "@/content/site";

export function HeroCards() {
  const { profile, map, intelligence, trust, sectors, network } = hero.cards;

  return (
    <div className="-mx-4 mt-10 flex gap-4 overflow-x-auto px-4 pb-4 pt-2 sm:mx-0 sm:mt-14 sm:grid sm:grid-cols-12 sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0">
      {/* Profiles + grassroots network */}
      <div className="flex w-[240px] shrink-0 flex-col gap-3 self-start sm:col-span-3 sm:w-auto sm:-translate-y-8">
        <article className="hero-float glass-card relative rounded-3xl p-5">
          <p className="mono-label text-rm-muted">{profile.label}</p>
          <h3 className="mt-2 text-base font-semibold tracking-tight text-rm-ink">
            {profile.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-rm-muted">{profile.body}</p>
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {profile.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full bg-white/90 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-wider text-rm-blue"
              >
                {tag}
              </li>
            ))}
          </ul>
        </article>

        <article className="hero-float relative overflow-hidden rounded-3xl border border-white/60 bg-gradient-to-br from-rm-blue to-rm-blue-deep p-4 text-white shadow-md">
          <p className="font-mono text-[0.58rem] uppercase tracking-[0.08em] text-white/70">
            {network.label}
          </p>
          <h3 className="mt-1 text-sm font-semibold">{network.title}</h3>
          <p className="mt-2 text-xs leading-relaxed text-white/85">{network.body}</p>
        </article>
      </div>

      {/* District map layers */}
      <article className="hero-float-slow relative w-[240px] shrink-0 self-start rounded-3xl border border-white/40 bg-white p-5 shadow-[0_20px_40px_-24px_rgb(11_71_166/0.5)] sm:col-span-3 sm:w-auto sm:-translate-y-2">
        <p className="mono-label text-rm-muted">{map.label}</p>
        <h3 className="mt-2 text-base font-semibold tracking-tight text-rm-ink">
          {map.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-rm-muted">{map.body}</p>
        <ul className="mt-4 grid grid-cols-2 gap-2">
          {map.layers.map((layer, index) => (
            <li
              key={layer}
              className="rounded-2xl px-3 py-2 font-mono text-[0.62rem] uppercase tracking-wider text-white"
              style={{
                backgroundColor:
                  index === 0
                    ? "#0B47A6"
                    : index === 1
                      ? "#FF7A00"
                      : index === 2
                        ? "#3B82F6"
                        : "#93C5FD",
              }}
            >
              {layer}
            </li>
          ))}
        </ul>
      </article>

      {/* Labour intelligence */}
      <article className="hero-float relative w-[250px] shrink-0 self-start rounded-3xl bg-rm-blue p-5 text-white shadow-[0_24px_40px_-20px_rgb(11_71_166/0.7)] sm:col-span-3 sm:mt-8 sm:w-auto">
        <p className="font-mono text-[0.62rem] uppercase tracking-[0.08em] text-white/70">
          {intelligence.label}
        </p>
        <h3 className="mt-2 text-lg font-semibold leading-snug tracking-tight">
          {intelligence.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-white/80">
          {intelligence.body}
        </p>
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {intelligence.tags.map((item) => (
            <li
              key={item}
              className="rounded-full border border-white/25 bg-white/10 px-2.5 py-1 font-mono text-[0.58rem] uppercase tracking-wider text-white/90"
            >
              {item}
            </li>
          ))}
        </ul>
      </article>

      {/* Trust + sectors */}
      <div className="flex w-[240px] shrink-0 flex-col gap-3 sm:col-span-3 sm:w-auto">
        <article className="hero-float-slow glass-card rounded-3xl px-4 py-4">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-rm-blue" aria-hidden="true" />
            <h3 className="text-sm font-semibold text-rm-ink">{trust.title}</h3>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-rm-muted">{trust.body}</p>
        </article>

        <article className="hero-float rounded-3xl border border-white/50 bg-white p-4 shadow-lg">
          <p className="mono-label text-rm-muted">{sectors.label}</p>
          <h3 className="mt-1 text-sm font-semibold text-rm-ink">{sectors.title}</h3>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {sectors.items.map((item) => (
              <li
                key={item}
                className="rounded-full bg-rm-sky-pale px-2.5 py-1 font-mono text-[0.58rem] uppercase tracking-wider text-rm-blue"
              >
                {item}
              </li>
            ))}
          </ul>
        </article>
      </div>
    </div>
  );
}
