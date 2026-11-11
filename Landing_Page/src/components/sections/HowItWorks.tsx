import { Section } from "@/components/ui/Section";
import { howItWorks } from "@/content/site";

export function HowItWorks() {
  return (
    <Section
      id={howItWorks.id}
      label={howItWorks.eyebrow}
      headline={howItWorks.headline}
      body={howItWorks.intro}
      tone="surface"
    >
      <ol className="relative mt-12 space-y-4 before:absolute before:left-[1.15rem] before:top-3 before:bottom-3 before:w-px before:bg-rm-border sm:before:left-6">
        {howItWorks.steps.map((step) => (
          <li
            key={step.step}
            className="relative grid gap-3 rounded-2xl border border-rm-border bg-white p-5 sm:grid-cols-[auto_1fr] sm:items-start sm:gap-5 sm:p-6"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rm-green text-sm font-semibold text-white sm:h-12 sm:w-12">
              {step.step}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-rm-navy">{step.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-rm-muted sm:text-base">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
