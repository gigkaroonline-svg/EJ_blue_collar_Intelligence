import { AudienceTabs } from "@/components/AudienceTabs";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { audiences } from "@/content/site";

export function WhoItServes() {
  return (
    <section
      id="partners"
      aria-labelledby="audiences-heading"
      className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-3xl text-center">
        <SectionLabel>{audiences.label}</SectionLabel>
        <h2
          id="audiences-heading"
          className="text-3xl font-semibold tracking-tight text-rm-ink sm:text-4xl"
        >
          {audiences.headline}
        </h2>
      </div>
      <div className="mt-10">
        <AudienceTabs />
      </div>
    </section>
  );
}
