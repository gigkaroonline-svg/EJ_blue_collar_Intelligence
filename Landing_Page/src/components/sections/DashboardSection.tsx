import { WorkforceDashboard } from "@/components/dashboard/WorkforceDashboard";
import { Section } from "@/components/ui/Section";
import { dashboard } from "@/content/site";

export function DashboardSection() {
  return (
    <Section
      id={dashboard.id}
      label={dashboard.eyebrow}
      headline={dashboard.headline}
      body={dashboard.body}
      tone="default"
    >
      <div className="mt-6 rounded-xl border border-rm-orange/20 bg-orange-50 px-4 py-3 text-sm text-rm-navy">
        {dashboard.demoNotice}
      </div>
      <div className="mt-8">
        <WorkforceDashboard />
      </div>
    </Section>
  );
}
