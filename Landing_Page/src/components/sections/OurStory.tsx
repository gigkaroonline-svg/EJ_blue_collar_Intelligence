import { SectionLabel } from "@/components/ui/SectionLabel";
import { story } from "@/content/site";

export function OurStory() {
  return (
    <section
      id="story"
      aria-labelledby="story-heading"
      className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <SectionLabel>{story.label}</SectionLabel>
          <h2
            id="story-heading"
            className="text-3xl font-semibold tracking-tight text-rm-ink sm:text-4xl"
          >
            {story.headline}
          </h2>
        </div>
        <div className="space-y-5 text-base leading-relaxed text-rm-muted sm:text-lg">
          {story.body.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
          {story.pullQuote ? (
            <blockquote className="mt-8 border-l-4 border-rm-orange pl-5">
              <p className="text-xl font-medium text-rm-ink">
                “{story.pullQuote.quote}”
              </p>
              <footer className="mt-3 font-mono text-xs uppercase tracking-[0.08em] text-rm-muted">
                {story.pullQuote.attribution}
              </footer>
            </blockquote>
          ) : null}
        </div>
      </div>
    </section>
  );
}
