import { whatItIs } from "@/content/site";

export function ComparisonTable() {
  const { portal, rojmitra } = whatItIs.comparison;

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <article className="rounded-[1.75rem] border border-rm-border bg-rm-surface/80 p-6 sm:p-8">
        <p className="mono-label text-rm-muted">{portal.title}</p>
        <ul className="mt-5 space-y-3">
          {portal.points.map((point) => (
            <li key={point} className="flex gap-3 text-sm text-rm-muted sm:text-base">
              <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-rm-muted/50" />
              {point}
            </li>
          ))}
        </ul>
      </article>

      <article className="rounded-[1.75rem] border border-rm-blue/20 bg-rm-blue p-6 text-white shadow-[0_24px_50px_-30px_rgb(11_71_166/0.8)] sm:p-8">
        <p className="mono-label text-white/70">{rojmitra.title}</p>
        <ul className="mt-5 space-y-3">
          {rojmitra.points.map((point) => (
            <li key={point} className="flex gap-3 text-sm sm:text-base">
              <span
                aria-hidden
                className="mt-1.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white text-[0.65rem] font-bold text-rm-blue"
              >
                ✓
              </span>
              {point}
            </li>
          ))}
        </ul>
      </article>
    </div>
  );
}
