import { FAQ } from "@/components/FAQ";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { faq } from "@/content/site";

export function FAQSection() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="text-center">
        <SectionLabel>{faq.label}</SectionLabel>
        <h2
          id="faq-heading"
          className="text-3xl font-semibold tracking-tight text-rm-ink sm:text-4xl"
        >
          {faq.headline}
        </h2>
      </div>
      <div className="mt-10">
        <FAQ />
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faq.items.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: { "@type": "Answer", text: item.answer },
            })),
          }),
        }}
      />
    </section>
  );
}
