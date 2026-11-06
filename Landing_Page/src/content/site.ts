/**
 * RojMitra site content, edit this file to update copy, placeholders, and CTAs.
 * Keep [X] figures as editable placeholders until verified. Do not invent metrics.
 */

export const site = {
  name: "RojMitra",
  tagline: "India's Village-Level Workforce Intelligence Infrastructure",
  positioning: "RojMitra by EarlyJobs · India's Village-Level Workforce Intelligence Infrastructure",
  brandRelationship: "RojMitra by EarlyJobs · Village-Level Workforce Intelligence",
  trustLine: "Consent-based · Village-first · Built by EarlyJobs",
  contact: {
    partnerEmail: "partners@earlyjobs.ai",
    investorEmail: "investors@earlyjobs.ai",
    employerEmail: "employers@earlyjobs.ai",
    institutionEmail: "institutions@earlyjobs.ai",
  },
  /** Replace [X] values once verified. Keep them clearly editable. */
  stats: {
    districtsMapped: "[X]",
    workerProfiles: "[X]",
    communityPartners: "[X]",
    skillsCatalogued: "[X]",
  },
} as const;

export const navLinks = [
  { label: "Problem", href: "#problem" },
  { label: "What We Do", href: "#what-we-map" },
  { label: "Architecture", href: "#architecture" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Partners", href: "#partners" },
  { label: "Employers", href: "#business" },
] as const;

export const hero = {
  headline: "A worker spends ten years building a skill. The next employer never knows.",
  headlineAccent: "",
  subhead: "RojMitra gives every village worker a verified record of what they can do.",
  primaryCta: { label: "Partner With Us", href: "#partner" },
  secondaryCta: { label: "Explore the Platform", href: "#what-we-map" },
  cards: {
    profile: {
      label: "Demo data",
      title: "Demo profile",
      body: "10 yrs experience. Rubber manufacturing, Kerala. Returned home. Available.",
      tags: ["10 yrs", "Kerala", "Available"],
    },
    map: {
      label: "Village",
      title: "One village record",
      body: "The same data, from a single village up to India.",
      layers: ["Village", "Block", "District", "India"],
    },
    intelligence: {
      label: "Experience",
      title: "A verified record of what they can do.",
      body: "What a worker has done, where, for how long and what they learned.",
      tags: ["Roles", "Industries", "Tenure", "Skills"],
    },
    trust: {
      title: "Returned home · Available",
      body: "Demonstration data. Not live coverage.",
    },
    sectors: {
      label: "Industries",
      title: "Where the work is",
      items: ["Manufacturing", "Rubber", "Textile", "Construction", "Logistics", "Retail"],
    },
    network: {
      label: "Partner network",
      title: "Village Workforce Mitra",
      body: "A local partner who helps workers become visible, on the worker's terms.",
    },
  },
} as const;

export const networkStrip = [
  "Common Services Centres",
  "Community institutions",
  "Self-help groups",
  "Community mobilisers",
  "Village-level entrepreneurs",
  "Local employment coordinators",
  "Training institutions",
  "Grassroots organisations",
] as const;

export const aboutStatement = {
  lead: "Every village worker",
  visible: "seen",
  middle: ", every skill",
  informed: "recorded",
  and: ", every employer",
  accessible: "connected",
  period: ".",
  support: "The talent is already nearby. It just isn't visible.",
} as const;

export const bento = {
  districtCoverage: {
    label: "Where we start",
    title: "Where workers actually live",
    body: "Most workforce data starts at the state or the district and stays there. We start where workers actually live, then build upward.",
    points: [
      { title: "Village", detail: "The unit. Everything else is a view." },
      { title: "Gram Panchayat", detail: "The next view up from the village." },
      { title: "Block", detail: "Then district, state and India." },
    ],
  },
  systemLayers: {
    label: "One record",
    title: "Six levels of insight",
    body: "Village → Gram Panchayat → Block → District → State → India. The same data, whether you are hiring for a plant or planning for a district.",
    points: [
      { step: "01", title: "Village", status: "live" as "live" | "building" },
      { step: "02", title: "Gram Panchayat", status: "live" as "live" | "building" },
      { step: "03", title: "Block", status: "live" as "live" | "building" },
      { step: "04", title: "District", status: "live" as "live" | "building" },
      { step: "05", title: "State", status: "live" as "live" | "building" },
      { step: "06", title: "India", status: "live" as "live" | "building" },
    ],
  },
  workerProfiles: {
    label: "Demo data",
    title: "Demo profile",
    body: "10 yrs experience. Rubber manufacturing, Kerala. Returned home. Available.",
    points: ["10 yrs experience", "Rubber manufacturing, Kerala", "Returned home · Available"],
  },
  consentFirst: {
    label: "Trust",
    title: "Workforce intelligence with consent",
    body: "Worker information is collected with the worker's consent. Data should open doors for the worker, not just be sold on.",
    pillars: ["Consent", "Open doors", "Responsible practice"],
  },
} as const;

export const story = {
  label: "The problem",
  headline: "India's workforce is everywhere. The intelligence about it is not.",
  body: [
    "Millions of skilled people live in villages across India. Their skills, their experience and their availability are rarely recorded anywhere an employer can find them.",
    "Employers keep searching for new, nearby talent, and keep coming up short. The workers are often a few kilometres away, but there is no visibility into who they are and no access to reach them.",
    "So employers guess. Workers go unseen. Planners work from estimates that are months or years old.",
    "The workforce is distributed. The intelligence is fragmented. That gap is what we are building to close.",
  ],
  /** Omit or replace attribution only when confirmed. */
  pullQuote: null as null | { quote: string; attribution: string },
} as const;

export const problem = {
  label: "The problem",
  headline: "Employers guess. Workers go unseen.",
  cards: [
    {
      audience: "Employers",
      title: "No visibility, no way to reach them",
      body: "Keep hunting for fresh, nearby talent with no visibility into who is around and no way to reach them.",
    },
    {
      audience: "Workers",
      title: "Years of skill stay invisible",
      body: "Years of skill and experience stay invisible beyond the village or the contractor they know.",
    },
    {
      audience: "Planners",
      title: "Averages, not village evidence",
      body: "Decide on district averages, not village-level evidence.",
    },
    ],
  closer: "The talent is already nearby. It just isn't visible.",
} as const;

export const whatItIs = {
  label: "Experience",
  headline: "Years of experience shouldn't end at the village boundary.",
  body: "Most workers have more experience than any record shows. A stitching operator in Surat. A tiling mason on a Bengaluru site. A machine helper in a Kerala plant. When they go home, that experience goes unrecorded, and the next employer starts from zero.",
  comparison: {
    portal: {
      title: "When the record stops",
      points: [
        "Experience goes unrecorded once a worker goes home",
        "The next employer starts from zero",
        "A skill learned over years never leaves the last workplace",
        "Hiring searches for new talent a few kilometres away",
      ],
    },
    rojmitra: {
      title: "A record that travels",
      points: [
        "Past roles, industries, places and years, in the worker's own words",
        "Experience checked, not just claimed",
        "Match returning and local workers to roles that fit what they have already done",
        "A verified work history that travels with them",
      ],
    },
  },
} as const;

export const howItWorks = {
  label: "How it works",
  headline: "From discovery to a worker at work.",
  layers: [
    {
      step: "01",
      title: "Discovery",
      body: "Identify workers and workforce clusters in a village.",
      status: "live" as "live" | "building",
    },
    {
      step: "02",
      title: "Registration",
      body: "Consent-based profile creation, including full work history.",
      status: "live" as "live" | "building",
    },
    {
      step: "03",
      title: "Verification",
      body: "Skills and past experience checked, not just claimed.",
      status: "live" as "live" | "building",
    },
    {
      step: "04",
      title: "Hiring execution",
      body: "Profiles standardised and mapped to village, block and district. Employers find nearby workers by place, skill, experience and availability. Matched workers move into jobs through the EarlyJobs network.",
      status: "live" as "live" | "building",
    },
  ],
} as const;

export const whatWeMap = {
  label: "What we do",
  headline: "Seven layers of workforce intelligence, starting with what workers already know.",
  items: [
    {
      title: "Experience intelligence",
      body: "What a worker has done, where, for how long and what they learned. A verified work history that travels with them.",
      building: false,
    },
    {
      title: "Worker intelligence",
      body: "Verified, consent-based worker profiles.",
      building: false,
    },
    {
      title: "Skills intelligence",
      body: "What workers can actually do, and at what level.",
      building: false,
    },
    {
      title: "Availability intelligence",
      body: "Who is available, from when and for how long.",
      building: false,
    },
    {
      title: "Migration intelligence",
      body: "Where workers have moved for work, who would move, and when they return.",
      building: false,
    },
    {
      title: "Wage intelligence",
      body: "What work pays and what workers expect.",
      building: true,
    },
    {
      title: "Employer demand intelligence",
      body: "What employers need, by geography and occupation, and which nearby workers fit.",
      building: true,
    },
  ],
} as const;

export const audiences = {
  label: "Partner network",
  headline: "Every village needs a trusted local face.",
  tabs: [
    {
      id: "workers",
      title: "Workers",
      body: "RojMitra gives every village worker a verified record of what they can do. Worker information is collected with the worker's consent.",
      points: [
        "Past roles, industries, places and years",
        "Experience checked, not just claimed",
        "A verified work history that travels with them",
      ],
      cta: { label: "Partner With Us", href: "#partner" },
    },
    {
      id: "employers",
      title: "Employers",
      body: "Hiring for a plant, a site, a mill or a store? The talent you need is probably within a few kilometres. You just can't see it, and you can't reach it.",
      points: [
        "Who is nearby, with what skills and experience",
        "Workers who are available and open to the role",
        "Hiring around real local supply, season by season",
      ],
      cta: {
        label: "Talk to Us",
        href: `mailto:${site.contact.employerEmail}?subject=Employer%20enquiry`,
      },
    },
    {
      id: "institutions",
      title: "Institutions",
      body: "Collaborate with us. Planning works from village-level evidence, not district averages that are months or years old.",
      points: [
        "One village record, read at district and state level",
        "Consent-based workforce intelligence",
        "Community and institutional collaboration",
      ],
      cta: {
        label: "Get in Touch",
        href: `mailto:${site.contact.institutionEmail}?subject=Institution%20collaboration`,
      },
    },
    {
      id: "partners",
      title: "Village Workforce Mitras",
      body: "A Village Workforce Mitra is a local partner who helps workers become visible, on the worker's terms.",
      points: [
        "Identify workers in the village",
        "Record past experience and where they have worked",
        "Connect workers with suitable opportunities",
      ],
      cta: { label: "Become a Village Workforce Mitra", href: "#partner" },
    },
  ],
} as const;

export const trust = {
  label: "Trust",
  headline: "Workforce intelligence with consent.",
  body: "Worker information is collected with the worker's consent. We design our data practices around the principle that data should open doors for the worker, not just be sold on. We are building responsible practices into the platform from the start.",
  pillars: [
    {
      title: "Consent",
      body: "Worker information is collected with the worker's consent, through local partners called Village Workforce Mitras.",
    },
    {
      title: "Open doors",
      body: "Data should open doors for the worker, not just be sold on.",
    },
    {
      title: "Responsible practice",
      body: "Responsible practices are being built into the platform from the start. Read Privacy and Terms for details.",
    },
  ],
} as const;

export const impact = {
  label: "Migration",
  headline: "Workers move. Their experience moves with them, and the data should too.",
  tiles: [
    {
      title: "Bihar → Kerala",
      body: "Illustrative example. A worker spends months in a rubber plant in Kerala, then travels home for Diwali or Holi. Then he goes back again.",
    },
    {
      title: "Odisha → Gujarat",
      body: "Illustrative example. A worker joins a stitching or finishing unit, learns a trade over several years, and returns to a village with no record of that skill.",
    },
    {
      title: "Uttar Pradesh → NCR or Bengaluru",
      body: "Illustrative example. A mason or finishing worker moves between real estate and construction sites, building experience that no single employer ever sees.",
    },
    {
      title: "What we map",
      body: "Corridors, from source village to destination cluster. Seasonality, from festivals to harvests. Skills gained on the road. Return and redeploy, closer to home.",
    },
  ],
} as const;

export const businessModel = {
  label: "For employers",
  headline: "Find the right workforce. Starting at the village level.",
  body: "Hiring for a plant, a site, a mill or a store? The talent you need is probably within a few kilometres. You just can't see it, and you can't reach it. RojMitra gives employers visibility into nearby workers and a direct path to them. Search by geography, occupation, skills, past experience, availability, salary expectation and migration preference.",
  cards: [
    {
      title: "See",
      body: "Who is nearby, with what skills and experience.",
    },
    {
      title: "Reach",
      body: "Workers who are available and open to the role.",
    },
    {
      title: "Plan",
      body: "Hiring around real local supply, season by season.",
    },
    {
      title: "Industries",
      body: "Manufacturing, automotive, rubber, textile and apparel, real estate, construction, warehousing, logistics, retail, healthcare, hospitality and agriculture.",
    },
  ],
  cta: {
    label: "Talk to Us",
    href: `mailto:${site.contact.employerEmail}?subject=Employer%20enquiry`,
  },
} as const;

export const ecosystem = {
  label: "Ecosystem",
  headline: "Intelligence, recruitment, AI and gig hiring, in one system.",
  products: [
    {
      name: "RojMitra",
      role: "Village-level workforce intelligence and community mobilisation.",
      highlight: true,
    },
    {
      name: "EarlyJobs",
      role: "Distributed recruitment network and hiring execution.",
      highlight: false,
    },
    {
      name: "Huntlo",
      role: "AI-powered hiring infrastructure.",
      highlight: false,
    },
    {
      name: "GigKaro",
      role: "Pincode-level gig and frontline hiring network.",
      highlight: false,
    },
  ],
} as const;

export const visionMission = {
  label: "Experience",
  vision: {
    title: "Experience",
    body: "Years of experience shouldn't end at the village boundary.",
  },
  mission: {
    title: "Verify",
    body: "Experience checked, not just claimed. A verified work history that travels with the worker.",
  },
} as const;

export const faq = {
  label: "FAQ",
  headline: "Questions, answered clearly.",
  items: [
    {
      question: "What is RojMitra?",
      answer:
        "India's village-level workforce intelligence infrastructure. It maps, verifies and connects workers at the grassroots.",
    },
    {
      question: "Is RojMitra a job portal?",
      answer:
        "No. It is workforce intelligence infrastructure. Hiring is one outcome.",
    },
    {
      question: "Why start at the village?",
      answer:
        "Because that is where workers live. District and state views are built up from village data.",
    },
    {
      question: "How can employers find nearby talent?",
      answer:
        "RojMitra maps workers by village, skills, experience and availability, so employers can see who is nearby and reach them through the EarlyJobs network.",
    },
    {
      question: "How does RojMitra use a worker's past experience?",
      answer:
        "Each profile records verified roles, industries, places and years, so employers can match workers to what they have actually done.",
    },
    {
      question: "Does RojMitra track worker migration?",
      answer:
        "Yes, by design. It maps where workers go for work, what they do there and when they return, with consent.",
    },
    {
      question: "Which industries does RojMitra cover?",
      answer:
        "Manufacturing, automotive, rubber, textile and apparel, real estate, construction, warehousing, logistics, retail, healthcare, hospitality and agriculture.",
    },
    {
      question: "How is worker data collected?",
      answer:
        "With the worker's consent, through local partners called Village Workforce Mitras.",
    },
    {
      question: "Is the dashboard showing live data?",
      answer:
        "The dashboard on this page uses demonstration data and is labelled as such.",
    },
    {
      question: "How can I partner or hire?",
      answer: "Use the partner or employer form on this page.",
    },
  ],
} as const;

export const finalCta = {
  headline: "One village at a time. One connected workforce intelligence network for India.",
  body: "Employers, find nearby talent you can finally see. Partners, become a Village Workforce Mitra. Institutions and collaborators, collaborate with us.",
  routes: [
    {
      label: "Talk to Us",
      href: `mailto:${site.contact.employerEmail}?subject=Employer%20enquiry`,
    },
    {
      label: "Partner With Us",
      href: `mailto:${site.contact.partnerEmail}?subject=Partner%20with%20RojMitra`,
    },
    {
      label: "Get in Touch",
      href: `mailto:${site.contact.institutionEmail}?subject=Institution%20collaboration`,
    },
  ],
} as const;

export const footer = {
  blurb:
    "RojMitra maps, verifies and connects India's workforce at the grassroots, so employers can finally see and reach nearby talent.",
  getInTouch: [
    {
      label: "Employers",
      href: `mailto:${site.contact.employerEmail}?subject=Employer%20enquiry`,
      detail: site.contact.employerEmail,
    },
    {
      label: "Institutions",
      href: `mailto:${site.contact.institutionEmail}?subject=Institution%20collaboration`,
      detail: site.contact.institutionEmail,
    },
    {
      label: "Partners",
      href: `mailto:${site.contact.partnerEmail}?subject=Partner%20with%20RojMitra`,
      detail: site.contact.partnerEmail,
    },
  ],
  explore: [
    { label: "What We Do", href: "#what-we-map" },
    { label: "Architecture", href: "#architecture" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "FAQ", href: "#faq" },
    { label: "Partner With Us", href: "#partner" },
  ],
  legal: [
    { label: "Privacy", href: "#privacy" },
    { label: "Terms", href: "#terms" },
    { label: "Contact", href: `mailto:${site.contact.partnerEmail}` },
  ],
  copyright: `© ${new Date().getFullYear()} RojMitra by EarlyJobs`,
} as const;
