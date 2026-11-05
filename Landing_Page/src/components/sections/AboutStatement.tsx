import { aboutStatement } from "@/content/site";

function IconChip({
  children,
  tone,
}: {
  children: React.ReactNode;
  tone: "blue" | "orange" | "sky";
}) {
  const tones = {
    blue: "bg-rm-blue text-white",
    orange: "bg-rm-orange text-white",
    sky: "bg-rm-sky text-white",
  };

  return (
    <span
      className={`mx-1 inline-flex h-8 w-8 translate-y-[-2px] items-center justify-center rounded-full align-middle sm:h-9 sm:w-9 ${tones[tone]}`}
      aria-hidden="true"
    >
      {children}
    </span>
  );
}

export function AboutStatement() {
  return (
    <section
      aria-labelledby="about-heading"
      className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8"
    >
      <h2
        id="about-heading"
        className="text-balance text-3xl font-semibold tracking-tight text-rm-ink sm:text-4xl lg:text-5xl"
        aria-label="We make workers visible, employers informed, and work accessible."
      >
        {aboutStatement.lead}{" "}
        <IconChip tone="blue">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M7 1.5C4.5 1.5 2.5 3.4 2.5 5.7c0 3.1 4.5 8.3 4.5 8.3s4.5-5.2 4.5-8.3C11.5 3.4 9.5 1.5 7 1.5z"
              fill="currentColor"
            />
            <circle cx="7" cy="5.5" r="1.5" fill="#0B47A6" />
          </svg>
        </IconChip>
        <span className="text-rm-blue">{aboutStatement.visible}</span>
        {aboutStatement.middle}
        <IconChip tone="orange">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <rect x="2" y="8" width="2.5" height="4" rx="0.5" fill="currentColor" />
            <rect x="5.75" y="5" width="2.5" height="7" rx="0.5" fill="currentColor" />
            <rect x="9.5" y="3" width="2.5" height="9" rx="0.5" fill="currentColor" />
          </svg>
        </IconChip>
        <span className="text-rm-orange">{aboutStatement.informed}</span>
        {aboutStatement.and}
        <IconChip tone="sky">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M7 1.2l1.2 3.4h3.6l-2.9 2.1 1.1 3.5L7 8.3 3.9 10.2l1.1-3.5-2.9-2.1h3.6L7 1.2z"
              fill="currentColor"
            />
          </svg>
        </IconChip>
        <span className="text-rm-blue">{aboutStatement.accessible}</span>
        {aboutStatement.period}
      </h2>
      <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-rm-muted sm:text-lg">
        {aboutStatement.support}
      </p>
    </section>
  );
}
