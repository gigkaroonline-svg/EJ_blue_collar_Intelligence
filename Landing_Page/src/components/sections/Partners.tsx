import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { partner } from "@/content/site";

export function Partners() {
  return (
    <Section
      id={partner.id}
      label={partner.eyebrow}
      headline={partner.headline}
      body={partner.intro}
      tone="default"
    >
      <div className="mt-12 grid gap-10 lg:grid-cols-2">
        <div>
          <p className="mono-label text-rm-muted">Who can become a partner?</p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {partner.who.map((item) => (
              <li
                key={item}
                className="rounded-xl border border-rm-border bg-rm-surface px-3 py-2.5 text-sm text-rm-navy"
              >
                {item}
              </li>
            ))}
          </ul>

          <p className="mono-label mt-8 text-rm-muted">
            What does a Village Workforce Mitra do?
          </p>
          <ul className="mt-4 space-y-2">
            {partner.what.map((item) => (
              <li key={item} className="flex gap-3 text-sm text-rm-muted">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-rm-green" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 rounded-2xl border border-rm-green/20 bg-rm-green-soft p-5">
            <h3 className="text-lg font-semibold text-rm-navy">{partner.ctaHeadline}</h3>
            <p className="mt-2 text-sm text-rm-muted">{partner.ctaBody}</p>
            <div className="mt-4">
              <Button href="#partner-form" variant="primary" arrow>
                {partner.ctaLabel}
              </Button>
            </div>
          </div>
        </div>

        <div id="partner-form">
          <EnquiryForm kind="partner" consent={partner.consent} />
        </div>
      </div>
    </Section>
  );
}
