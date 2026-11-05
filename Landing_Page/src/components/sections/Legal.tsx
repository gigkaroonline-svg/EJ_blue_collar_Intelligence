import { site } from "@/content/site";

export function Legal() {
  return (
    <section
      aria-label="Legal"
      className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <article
          id="privacy"
          className="rounded-[1.5rem] border border-rm-border bg-white p-6 sm:p-8"
        >
          <h2 className="text-xl font-semibold tracking-tight text-rm-ink">
            Privacy
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-rm-muted">
            RojMitra collects and processes workforce information with consent
            through community partners. A full privacy policy will be published
            here. For privacy questions, contact{" "}
            <a
              className="text-rm-blue underline-offset-2 hover:underline"
              href={`mailto:${site.contact.partnerEmail}?subject=Privacy%20enquiry`}
            >
              {site.contact.partnerEmail}
            </a>
            .
          </p>
        </article>

        <article
          id="terms"
          className="rounded-[1.5rem] border border-rm-border bg-white p-6 sm:p-8"
        >
          <h2 className="text-xl font-semibold tracking-tight text-rm-ink">
            Terms
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-rm-muted">
            This website describes RojMitra as an EarlyJobs initiative. Formal
            terms of use will be published here. Until then, reach out via{" "}
            <a
              className="text-rm-blue underline-offset-2 hover:underline"
              href={`mailto:${site.contact.partnerEmail}?subject=Terms%20enquiry`}
            >
              {site.contact.partnerEmail}
            </a>{" "}
            for partnership or usage questions.
          </p>
        </article>
      </div>
    </section>
  );
}
