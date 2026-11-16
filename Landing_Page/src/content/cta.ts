import { pages } from "@/content/pages";

/** Closing call-to-action shown at the end of inner pages. Copy is reused from existing page content. */
const source = pages.about.sections.find((s) => s.title === "Be Part of a More Connected Workforce");

export const closingCta = {
  title: source?.title ?? "Be Part of a More Connected Workforce",
  text: source?.blocks?.find((b) => b.kind === "paragraph")?.text ?? "",
  actions: ["Submit Your Hiring Requirements", "Join as a Sourcing Partner"],
  nextLabel: "Next",
};
