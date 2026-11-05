import { SectionLabel } from "@/components/ui/SectionLabel";
import { visionMission } from "@/content/site";

export function VisionMission() {
  return (
    <section
      id="vision"
      aria-labelledby="vision-heading"
      className="px-3 py-8 sm:px-5 lg:px-6"
    >
      <div className="sky-panel-soft mx-auto max-w-[1400px] rounded-[2rem] px-6 py-14 sm:rounded-[2.5rem] sm:px-12 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <SectionLabel>{visionMission.label}</SectionLabel>
          <h2
            id="vision-heading"
            className="sr-only"
          >
            Vision and mission
          </h2>
        </div>

        <div className="mx-auto mt-4 grid max-w-5xl gap-8 lg:grid-cols-2">
          <article className="rounded-[1.75rem] border border-white/70 bg-white/70 p-6 backdrop-blur sm:p-8">
            <p className="mono-label text-rm-blue">{visionMission.vision.title}</p>
            <p className="mt-4 text-2xl font-semibold tracking-tight text-rm-ink sm:text-3xl">
              {visionMission.vision.body}
            </p>
          </article>
          <article className="rounded-[1.75rem] border border-white/70 bg-white/70 p-6 backdrop-blur sm:p-8">
            <p className="mono-label text-rm-orange">{visionMission.mission.title}</p>
            <p className="mt-4 text-2xl font-semibold tracking-tight text-rm-ink sm:text-3xl">
              {visionMission.mission.body}
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
