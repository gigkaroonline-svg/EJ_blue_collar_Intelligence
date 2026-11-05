import { networkStrip } from "@/content/site";

export function NetworkStrip() {
  return (
    <section
      aria-label="Grassroots network"
      className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8"
    >
      <p className="mono-label mb-4 text-center text-rm-muted">
        Powered by a grassroots network
      </p>
      <ul className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        {networkStrip.map((item) => (
          <li
            key={item}
            className="rounded-full border border-rm-border bg-white px-4 py-2 font-mono text-[0.68rem] uppercase tracking-[0.08em] text-rm-ink shadow-sm"
          >
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
