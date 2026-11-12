/**
 * Storytelling imagery (AI-generated, India-focused). Alt text lives here so
 * copy stays out of components. Order matches the matching arrays in site.ts.
 */
import audienceEmployers from "@/assets/story/audience-employers.jpg";
import audienceInstitutions from "@/assets/story/audience-institutions.jpg";
import audienceMitra from "@/assets/story/audience-mitra.jpg";
import audienceWorkers from "@/assets/story/audience-workers.jpg";
import migrationBengaluru from "@/assets/story/migration-bengaluru-construction.jpg";
import migrationGujarat from "@/assets/story/migration-gujarat-textile.jpg";
import migrationReturn from "@/assets/story/migration-return-home.jpg";
import migrationTamilNadu from "@/assets/story/migration-tamilnadu-garment.jpg";
import problemEmployers from "@/assets/story/problem-employers.jpg";
import problemPlanners from "@/assets/story/problem-planners.jpg";
import problemWorkers from "@/assets/story/problem-workers.jpg";
import storyWorker from "@/assets/story/story-village-worker.jpg";
import whatWeDoFeatured from "@/assets/story/whatwedo-featured.jpg";
import whatWeDoWage from "@/assets/story/whatwedo-wage.jpg";
import { assetUrl } from "@/lib/asset";

export type StoryImage = { src: string; alt: string; caption?: string };

/** One per impact.tiles entry. */
export const migrationImages: StoryImage[] = [
  {
    src: assetUrl(migrationTamilNadu),
    alt: "A young woman stitching a t-shirt at a sewing line in a Tiruppur knitwear unit",
    caption: "Knitwear unit, Tiruppur",
  },
  {
    src: assetUrl(migrationGujarat),
    alt: "A woman stitching fabric at a sewing machine in a Surat textile unit",
    caption: "Stitching unit, Surat",
  },
  {
    src: assetUrl(migrationBengaluru),
    alt: "A mason in a hard hat laying tiles on a Bengaluru construction site",
    caption: "Construction site, Bengaluru",
  },
  {
    src: assetUrl(migrationReturn),
    alt: "Workers with bags walking along a village railway platform as a train arrives",
    caption: "Festival return, home village",
  },
];

/** One per problem.cards entry. */
export const problemImages: StoryImage[] = [
  {
    src: assetUrl(problemEmployers),
    alt: "A supervisor with a clipboard at a factory gate looking down an empty road",
  },
  {
    src: assetUrl(problemWorkers),
    alt: "A skilled welder sitting outside his village home with his welding mask and tools",
  },
  {
    src: assetUrl(problemPlanners),
    alt: "Two district planners studying a printed district map on an office table",
  },
];

/** Keyed by audiences.tabs id. */
export const audienceImages: Record<string, StoryImage> = {
  workers: {
    src: assetUrl(audienceWorkers),
    alt: "A young woman in her village lane holding up a phone showing her work profile",
  },
  employers: {
    src: assetUrl(audienceEmployers),
    alt: "A plant manager talking with a machine operator on a factory floor",
  },
  institutions: {
    src: assetUrl(audienceInstitutions),
    alt: "A trainer speaking with a group of village workers in a courtyard",
  },
  partners: {
    src: assetUrl(audienceMitra),
    alt: "A local partner showing a village worker his profile on a phone under a banyan tree",
  },
};

export const storyImage: StoryImage = {
  src: assetUrl(storyWorker),
  alt: "A village worker standing at the doorway of his home with paddy fields behind him",
};

/** One per whatWeMap.items entry (featured first). */
export const whatWeMapImages: StoryImage[] = [
  {
    src: assetUrl(whatWeDoFeatured),
    alt: "A group of village workers — a mason, a tailor and a machine operator — in a village lane with paddy fields behind them",
  },
  {
    src: assetUrl(audienceWorkers),
    alt: "A young woman in her village lane holding up a phone showing her work profile",
  },
  {
    src: assetUrl(migrationGujarat),
    alt: "A woman stitching fabric at a sewing machine in a Surat textile unit",
  },
  {
    src: assetUrl(audienceMitra),
    alt: "A local partner showing a village worker his profile on a phone under a banyan tree",
  },
  {
    src: assetUrl(migrationReturn),
    alt: "Workers with bags walking along a village railway platform as a train arrives",
  },
  {
    src: assetUrl(whatWeDoWage),
    alt: "A daily-wage worker's hands counting rupee notes at a village tea stall",
  },
  {
    src: assetUrl(audienceEmployers),
    alt: "A plant manager talking with a machine operator on a factory floor",
  },
];
