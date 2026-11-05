"use client";

import { useId, useState } from "react";
import { faq } from "@/content/site";
import { cn } from "@/lib/cn";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();

  return (
    <div className="space-y-3">
      {faq.items.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-button-${index}`;

        return (
          <div
            key={item.question}
            className="overflow-hidden rounded-[1.5rem] border border-rm-border bg-white"
          >
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-medium text-rm-ink transition hover:bg-rm-surface/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-rm-blue sm:px-6 sm:text-lg"
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <span>{item.question}</span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-rm-border text-rm-blue transition",
                    isOpen && "rotate-45 bg-rm-sky-pale",
                  )}
                >
                  +
                </span>
              </button>
            </h3>
            {isOpen ? (
              <div
                id={panelId}
                role="region"
                aria-label={item.question}
                className="border-t border-rm-border px-5 py-4 sm:px-6"
              >
                <p className="text-sm leading-relaxed text-rm-muted sm:text-base">
                  {item.answer}
                </p>
              </div>
            ) : (
              <div id={panelId} hidden />
            )}
          </div>
        );
      })}
    </div>
  );
}
