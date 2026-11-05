"use client";

import { useId, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { audiences } from "@/content/site";
import { cn } from "@/lib/cn";

type AudienceId = (typeof audiences.tabs)[number]["id"];

export function AudienceTabs() {
  const [active, setActive] = useState<AudienceId>(audiences.tabs[0].id);
  const baseId = useId();
  const tabRefs = useRef<Partial<Record<AudienceId, HTMLButtonElement | null>>>(
    {},
  );
  const current = audiences.tabs.find((tab) => tab.id === active) ?? audiences.tabs[0];
  const ids = audiences.tabs.map((t) => t.id);

  const selectAt = (index: number, focus = false) => {
    const next = ids[(index + ids.length) % ids.length];
    setActive(next);
    if (focus) {
      requestAnimationFrame(() => tabRefs.current[next]?.focus());
    }
  };

  return (
    <div>
      <div
        role="tablist"
        aria-label="Audiences"
        className="flex gap-2 overflow-x-auto pb-2"
      >
        {audiences.tabs.map((tab, index) => {
          const selected = tab.id === active;
          return (
            <button
              key={tab.id}
              ref={(node) => {
                tabRefs.current[tab.id] = node;
              }}
              id={`${baseId}-tab-${tab.id}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`${baseId}-panel`}
              tabIndex={selected ? 0 : -1}
              className={cn(
                "shrink-0 rounded-full border px-4 py-2 font-mono text-[0.68rem] uppercase tracking-[0.08em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rm-blue focus-visible:ring-offset-2",
                selected
                  ? "border-rm-blue bg-rm-blue text-white"
                  : "border-rm-border bg-white text-rm-muted hover:border-rm-blue/30 hover:text-rm-ink",
              )}
              onClick={() => setActive(tab.id)}
              onKeyDown={(event) => {
                if (event.key === "ArrowRight") {
                  event.preventDefault();
                  selectAt(index + 1, true);
                }
                if (event.key === "ArrowLeft") {
                  event.preventDefault();
                  selectAt(index - 1, true);
                }
                if (event.key === "Home") {
                  event.preventDefault();
                  selectAt(0, true);
                }
                if (event.key === "End") {
                  event.preventDefault();
                  selectAt(ids.length - 1, true);
                }
              }}
            >
              {tab.title}
            </button>
          );
        })}
      </div>

      <div
        id={`${baseId}-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${current.id}`}
        className="mt-6 rounded-[1.75rem] border border-rm-border bg-white p-6 sm:p-8"
      >
        <h3 className="text-2xl font-semibold tracking-tight text-rm-ink sm:text-3xl">
          {current.title}
        </h3>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-rm-muted">
          {current.body}
        </p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-3">
          {current.points.map((point) => (
            <li
              key={point}
              className="rounded-2xl border border-rm-border bg-rm-surface/70 px-4 py-3 text-sm text-rm-ink"
            >
              {point}
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <Button href={current.cta.href} variant="blue" arrow>
            {current.cta.label}
          </Button>
        </div>
      </div>
    </div>
  );
}
