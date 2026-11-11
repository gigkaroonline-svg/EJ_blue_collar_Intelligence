import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { employers } from "@/content/site";

export function Employers() {
  return (
    <Section
      id={employers.id}
      label={employers.eyebrow}
      headline={employers.headline}
      body={employers.intro}
      tone="surface"
    >
      <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {employers.capabilities.map((item) => (
          <Card key={item.title} as="article">
            <h3 className="text-lg font-semibold text-rm-navy">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-rm-muted">{item.body}</p>
          </Card>
        ))}
      </div>

      <div className="mt-10">
        <p className="mono-label text-rm-muted">Industries served</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {employers.industries.map((industry) => (
            <span
              key={industry}
              className="rounded-full border border-rm-border bg-white px-3 py-1.5 text-sm text-rm-navy"
            >
              {industry}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="rounded-2xl border border-rm-border bg-white p-6">
          <h3 className="text-xl font-semibold text-rm-navy">{employers.ctaHeadline}</h3>
          <p className="mt-3 text-sm leading-relaxed text-rm-muted">
            Share your workforce requirements and our team will follow up. An enquiry
            does not create a commercial agreement.
          </p>
          <div className="mt-5">
            <Button href="#employer-form" variant="primary" arrow>
              {employers.ctaLabel}
            </Button>
          </div>
        </div>
        <div id="employer-form">
          <EnquiryForm kind="employer" />
        </div>
      </div>
    </Section>
  );
}
