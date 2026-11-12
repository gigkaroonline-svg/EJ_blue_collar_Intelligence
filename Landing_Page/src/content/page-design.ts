import sharedEcosystem from "@/assets/india-shared-ecosystem.jpg";
import blogHeader from "@/assets/blog-header.jpg";
import employersHero from "@/assets/employers-hero.jpg";
import partnerHero from "@/assets/partner-hero.jpg";
import recruitmentOffice from "@/assets/recruitment-office.jpg";
import sectorConstruction from "@/assets/sector-construction.jpg";
import sectorLogistics from "@/assets/sector-logistics.jpg";
import sectorManufacturing from "@/assets/sector-manufacturing.jpg";
import sectorRetailFacility from "@/assets/sector-retail-facility.jpg";
import sectorTextile from "@/assets/sector-textile.jpg";
import sectorWarehouse from "@/assets/sector-warehouse.jpg";
import type { pages } from "@/content/pages";
import { assetUrl } from "@/lib/asset";
import connectedLandscape from "@/assets/india-connected-landscape.jpg";
import villageSky from "@/assets/village-sky.jpg";
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
import storyWorkforceQuestions from "@/assets/story/story-workforce-questions.jpg";

/** Photo heroes use the final photography; motif heroes are built from type, icons and diagrams only. */
export type PageHeroConfig =
  | { kind: "photo"; src: string; alt: string; position?: string; align?: "left" | "right" }
  | { kind: "journey" | "chain" | "tracker" | "audiences" | "steps" };

export type SectionLayout =
  | "image"
  | "icon-list"
  | "icon-grid"
  | "stepper"
  | "tabs"
  | "tracker"
  | "statements"
  | "scene-cards"
  | "diagram"
  | "profile"
  | "chain"
  | "topic-cards"
  | "sectors"
  | "entry-cards"
  | "empty-illustration";

export type SectorTile = { src: string; alt: string; label: string; position?: string };

/** Final sector photography for the industry grid (4:3, label over a light bottom gradient). */
export const sectorTiles: SectorTile[] = [
  {
    src: assetUrl(sectorManufacturing),
    alt: "A machine operator in safety glasses working a metal press on a factory line",
    label: "Manufacturing",
  },
  {
    src: assetUrl(sectorWarehouse),
    alt: "Two warehouse workers moving cardboard boxes between tall racking shelves",
    label: "Warehouse & Logistics",
  },
  {
    src: assetUrl(sectorLogistics),
    alt: "Two workers unloading cardboard boxes from the back of a truck at a logistics yard",
    label: "Transport / Delivery",
  },
  {
    src: assetUrl(sectorConstruction),
    alt: "Two masons laying a brick wall on a construction site with scaffolding",
    label: "Construction",
  },
  {
    src: assetUrl(sectorTextile),
    alt: "A row of women operating industrial sewing machines on a garment factory floor",
    label: "Textile & Garments",
  },
  {
    src: assetUrl(sectorRetailFacility),
    alt: "A shop worker stocking shelves with packaged goods in a small retail store",
    label: "Retail & Facility staff",
    position: "70% center",
  },
];

/** Scene crops for The Problem's three sides — people-first, no landscape fillers. */
export const problemScenes: ({ src: string; alt: string; position?: string } | null)[] = [
  {
    src: assetUrl(problemWorkers),
    alt: "A skilled worker whose experience is hard for nearby employers to discover",
    position: "center 25%",
  },
  {
    src: assetUrl(problemEmployers),
    alt: "An employer with a clipboard at a factory gate reviewing hiring needs",
    position: "center",
  },
  {
    src: assetUrl(audienceInstitutions),
    alt: "A field worker speaking with villagers while reviewing local workforce notes",
    position: "center",
  },
];

/** Entry-point imagery for How It Works (employers and sourcing partners). */
export const entryScenes = [
  {
    src: assetUrl(sectorManufacturing),
    alt: "A machine operator at a metal press, the kind of workforce employers need to reach",
    position: "center",
  },
  {
    src: assetUrl(partnerHero),
    alt: "Villagers gathered around a banyan tree with a local partner holding a phone",
    position: "center 30%",
  },
];

export const pageDesign: Record<
  keyof typeof pages,
  {
    hero: PageHeroConfig;
    layouts?: Record<string, SectionLayout>;
    /** On two-column text sections, `side` sets which column the photo sits in (zigzag). */
    images?: Record<string, { src: string; alt: string; position?: string; side?: "left" | "right" }>;
    pullQuotes?: string[];
    next: string;
  }
> = {
  about: {
    hero: {
      kind: "photo",
      // Reuses the Home closing-banner photo with a different crop so it does not look duplicated.
      src: assetUrl(sharedEcosystem),
      alt: "Indian villagers walking and cycling between village homes, green fields and a nearby textile factory",
      position: "right center",
    },
    layouts: {
      "Built on Real Recruitment Experience": "image",
      "What We Are Building": "icon-list",
    },
    images: {
      "Built on Real Recruitment Experience": {
        src: assetUrl(recruitmentOffice),
        alt: "Four people seated around an office table with a laptop and papers during a recruitment discussion",
        position: "center 40%",
      },
    },
    next: "workforce-intelligence",
  },
  "our-story": {
    hero: { kind: "journey" },
    layouts: { "What We Believe": "statements" },
    pullQuotes: [
      "But often, their professional identity does not travel with them.",
      "What if we started understanding India's workforce from the villages themselves?",
    ],
    next: "the-problem",
  },
  "the-problem": {
    hero: { kind: "audiences" },
    layouts: {
      "Three Sides of the Same Problem": "scene-cards",
      "The Missing Link: Workforce Intelligence": "diagram",
    },
    next: "how-it-works",
  },
  "workforce-intelligence": {
    hero: {
      kind: "photo",
      src: assetUrl(sectorWarehouse),
      alt: "Two warehouse workers moving cardboard boxes between tall racking shelves",
      position: "center",
    },
    layouts: {
      "What Is Workforce Intelligence?": "profile",
      "What We Map": "icon-grid",
      "From Village Intelligence to National Understanding": "chain",
      "How Workforce Intelligence Creates Value": "tabs",
    },
    images: {
      "Technology Meets Local Understanding": {
        src: assetUrl(partnerHero),
        alt: "Villagers gathered under a banyan tree looking at a phone held by a local partner",
        position: "center 40%",
        side: "left",
      },
      "Built for a More Visible Workforce": {
        src: assetUrl(employersHero),
        alt: "Workers walking toward a factory gate where a manager with a clipboard checks them in",
        position: "right center",
        side: "right",
      },
    },
    next: "for-employers",
  },
  "how-it-works": {
    hero: { kind: "steps" },
    layouts: {
      "How the RojMitra Network Works": "stepper",
      "Two Ways to Become Part of RojMitra": "entry-cards",
      "A Network Built From the Ground Up": "icon-grid",
    },
    next: "become-a-sourcing-partner",
  },
  "for-employers": {
    hero: {
      kind: "photo",
      src: assetUrl(employersHero),
      alt: "Workers walking along a rural road toward a factory gate where a manager with a clipboard checks them in",
      position: "center",
    },
    layouts: {
      "Who Can Work With RojMitra?": "sectors",
      "How the Employer Process Works": "stepper",
    },
    next: "workforce-intelligence",
  },
  "become-a-sourcing-partner": {
    hero: {
      kind: "photo",
      src: assetUrl(partnerHero),
      alt: "Villagers seated around a large banyan tree near a tea stall with rice fields and huts behind them",
      position: "center",
      align: "right",
    },
    layouts: {
      "What Does a RojMitra Sourcing Partner Do?": "icon-grid",
      "How to Join RojMitra": "stepper",
    },
    next: "how-it-works",
  },
  "government-initiatives": {
    hero: {
      kind: "photo",
      src: assetUrl(recruitmentOffice),
      alt: "Four people seated around an office table with a laptop and papers during a discussion",
      position: "center 40%",
    },
    layouts: { "Government Initiatives We Are Tracking": "tracker" },
    next: "workforce-intelligence",
  },
  blog: {
    hero: {
      kind: "photo",
      src: assetUrl(blogHeader),
      alt: "Illustration of a village with a banyan tree and fields, a winding road leading to a distant factory and city skyline",
      position: "center",
    },
    layouts: {
      "Explore by Topic": "topic-cards",
      "Latest Research & Insights": "empty-illustration",
    },
    next: "government-initiatives",
  },
};

/** Blog empty state uses a village crop of the partner photo. */
export const blogEmptyStateImage = {
  src: assetUrl(partnerHero),
  alt: "Village huts and rice fields around a large banyan tree",
  position: "left center",
};

export const pageNavigationLabel = "Continue exploring";

type StoryImg = { src: string; alt: string; position?: string };

/** Imagery for the bespoke About, Our Story and Sourcing Partner layouts. */
export const storyPageImages = {
  aboutHero: { src: assetUrl(sharedEcosystem), alt: "Villagers walking and cycling between village homes, green fields and a nearby textile factory", position: "center" },
  aboutOffice: { src: assetUrl(recruitmentOffice), alt: "Four people around an office table with a laptop and papers during a recruitment discussion", position: "center 40%" },
  aboutBuilding: [
    { src: assetUrl(audienceWorkers), alt: "Workers from an Indian village standing together", position: "center" },
    { src: assetUrl(sectorConstruction), alt: "Two masons laying a brick wall on a construction site", position: "center" },
    { src: assetUrl(sectorTextile), alt: "Women operating industrial sewing machines on a garment floor", position: "center" },
    { src: assetUrl(migrationReturn), alt: "A worker returning home to his village", position: "center" },
    { src: assetUrl(migrationBengaluru), alt: "Construction workers at a city building site", position: "center" },
    { src: assetUrl(audienceMitra), alt: "A local partner speaking with villagers", position: "center" },
  ] as StoryImg[],
  aboutVillage: { src: assetUrl(connectedLandscape), alt: "Indian villages, roads and towns connected across a landscape", position: "center" },
  aboutClosing: { src: assetUrl(partnerHero), alt: "Villagers gathered around a banyan tree with a local partner holding a phone", position: "center 40%" },
  storyHero: { src: assetUrl(storyWorker), alt: "A worker standing in his home village", position: "center 20%" },
  storyCollage: [
    { src: assetUrl(migrationTamilNadu), alt: "A young woman stitching at a knitwear unit in Tamil Nadu", position: "center" },
    { src: assetUrl(migrationReturn), alt: "A worker returning to his village", position: "center" },
  ] as StoryImg[],
  storyVillage: [
    { src: assetUrl(problemWorkers), alt: "A skilled worker at home between employment journeys", position: "center 20%" },
    { src: assetUrl(migrationGujarat), alt: "Textile workers whose skills grew away from home", position: "center" },
    { src: assetUrl(audienceMitra), alt: "A local partner helping a villager understand workforce opportunities", position: "center 30%" },
  ] as StoryImg[],
  storyRecruit: { src: assetUrl(recruitmentOffice), alt: "A recruitment discussion around an office table", position: "center 40%" },
  storyRecruitAside: {
    src: assetUrl(storyWorkforceQuestions),
    alt: "A local partner and workers reviewing village workforce details on a phone near fields and a factory",
    position: "center",
  },
  storyGrid: [
    { src: assetUrl(partnerHero), alt: "Villagers gathered under a banyan tree with a local partner", position: "center 40%" },
    { src: assetUrl(sectorTextile), alt: "Women at sewing machines in a garment unit", position: "center" },
    { src: assetUrl(sectorManufacturing), alt: "A machine operator at a metal press", position: "center" },
    { src: assetUrl(sectorWarehouse), alt: "Warehouse workers moving boxes between racks", position: "center" },
  ] as StoryImg[],
  partnerHero: { src: assetUrl(audienceMitra), alt: "A RojMitra local partner in a village", position: "center" },
  partnerWhy: { src: assetUrl(partnerHero), alt: "Villagers gathered around a banyan tree with a local partner holding a phone", position: "center 40%" },
  partnerNetwork: { src: assetUrl(employersHero), alt: "Workers walking toward a factory gate where a manager checks them in", position: "right center" },
};

import audienceEmployers from "@/assets/story/audience-employers.jpg";

/** Imagery for the bespoke For Employers page. */
export const employerPageImages = {
  hero: { src: assetUrl(employersHero), alt: "Workers walking along a rural road toward a factory gate where a manager with a clipboard checks them in", position: "center 60%" },
  intro: { src: assetUrl(recruitmentOffice), alt: "A small team discussing hiring requirements around an office table", position: "center" },
  form: { src: assetUrl(audienceEmployers), alt: "An employer reviewing workforce needs on a factory floor", position: "center" },
};

/** Bespoke How It Works / Workforce Intelligence / Government Initiatives imagery — no photo repeats within a page. */
export const insightPageImages = {
  howArchLeft: { src: assetUrl(audienceWorkers), alt: "Workers from an Indian village standing together", position: "center" },
  howArchRight: { src: assetUrl(audienceMitra), alt: "A RojMitra local partner speaking with villagers", position: "center" },
  howIntro: { src: assetUrl(storyWorker), alt: "A worker standing in his home village", position: "center 35%" },
  howBand: { src: assetUrl(sectorConstruction), alt: "Two masons laying a brick wall on a construction site", position: "center" },
  howPillars: [
    { src: assetUrl(migrationReturn), alt: "A worker returning home to his village", position: "center" },
    { src: assetUrl(problemWorkers), alt: "Workers whose skills and experience need to be recorded", position: "center" },
    { src: assetUrl(connectedLandscape), alt: "Villages and towns connected by roads across a landscape", position: "center" },
  ],
  wiFeature: { src: assetUrl(sectorWarehouse), alt: "Two warehouse workers moving cardboard boxes between tall racking shelves", position: "center" },
  wiMap: [
    { src: assetUrl(audienceWorkers), alt: "Workers from an Indian village standing together", position: "center" },
    { src: assetUrl(sectorTextile), alt: "Women operating industrial sewing machines on a garment floor", position: "center" },
    { src: assetUrl(sectorManufacturing), alt: "A machine operator working a metal press on a factory line", position: "center" },
    { src: assetUrl(migrationBengaluru), alt: "Construction workers at a city building site", position: "center" },
    { src: assetUrl(sectorLogistics), alt: "Logistics workers loading parcels", position: "center" },
    { src: assetUrl(sectorConstruction), alt: "Masons laying a brick wall on a construction site", position: "center" },
  ],
  wiTech: { src: assetUrl(partnerHero), alt: "Villagers gathered around a banyan tree with a local partner holding a phone", position: "center 40%" },
  wiBuilt: { src: assetUrl(employersHero), alt: "Workers walking toward a factory gate where a manager checks them in", position: "right center" },
  govHero: { src: assetUrl(recruitmentOffice), alt: "Four people around an office table with a laptop and papers", position: "center 40%" },
  /** e-Shram — national worker identity / registration */
  govFeature: { src: assetUrl(audienceWorkers), alt: "A worker with a digital profile card representing organised worker records", position: "center" },
  /** Haryana — gig worker registration / labour outreach */
  govHaryana: { src: assetUrl(problemEmployers), alt: "An official reviewing workforce registration needs at a workplace gate", position: "center" },
  /** Telangana — platform / gig worker policy */
  govMigrant: { src: assetUrl(audienceInstitutions), alt: "A field facilitator meeting workers about registration and welfare", position: "center" },
  /** Why these initiatives matter — distinct from tracker cards */
  govWhy: { src: assetUrl(partnerHero), alt: "Villagers and a local partner reviewing opportunities together under a banyan tree", position: "center 35%" },
};
