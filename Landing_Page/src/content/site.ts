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
    partnerEmail: "info@earlyjobs.in",
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
  { label: "About", href: "/about" },
  { label: "Our Story", href: "/our-story" },
  { label: "The Problem", href: "/the-problem" },
  { label: "Workforce Intelligence", href: "/workforce-intelligence" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "For Employers", href: "/for-employers" },
  { label: "Government Initiatives", href: "/government-initiatives" },
  { label: "Blog", href: "/blog" },
] as const;

export const hero = {
  headline: "Village-Level Workforce Intelligence for India",
  headlineAccent: "",
  subhead:
    "RojMitra by EarlyJobs is building a village-first workforce intelligence system that documents workers' skills, employment experience, availability and work journeys so employers and institutions can better understand local workforce supply.",
  trustLine: "Village-first · Consent-based · Built by EarlyJobs",
  primaryCta: { label: "Explore Workforce Intelligence", href: "/workforce-intelligence" },
  secondaryCta: { label: "Partner With RojMitra", href: "/become-a-sourcing-partner" },
  cards: {
    profile: {
      label: "Illustrative worker profile",
      disclaimer: "Illustrative profile – not a real worker record",
      fields: [
        { label: "Name", value: "Ramesh Kumar" },
        { label: "Home village", value: "Gaya, Bihar" },
        { label: "Industry experience", value: "Knitwear manufacturing" },
        { label: "Work location", value: "Tiruppur, Tamil Nadu" },
        { label: "Experience", value: "10 years" },
        { label: "Current status", value: "Returned home" },
        { label: "Availability", value: "Demonstration status" },
      ],
    },
    map: {
      label: "Village",
      title: "Village-first Intelligence",
      body: "Workforce information organised from the village level upward to Gram Panchayat, block, district, state and India.",
      layers: ["Village", "Block", "District", "India"],
    },
    intelligence: {
      label: "Experience",
      title: "Experience Intelligence",
      body: "Past roles, industries, work locations, experience and skills – captured in a record designed to travel with the worker.",
      tags: ["Roles", "Industries", "Tenure", "Skills"],
    },
    sectors: {
      label: "Industries",
      title: "Where the work is",
      items: ["Manufacturing", "Garments", "Textile", "Construction", "Logistics", "Retail"],
    },
    network: {
      label: "Partner network",
      title: "Village Workforce Mitra",
      body: "A trusted local partner who helps workers create and maintain their experience records with their consent.",
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
  headline: "Make Local Workforce Skills and Experience Visible",
  support:
    "Workers build valuable skills across factories, construction sites, warehouses, retail operations and other workplaces. RojMitra is designed to organise that experience into consent-based workforce records that can be understood beyond a worker's immediate local network.",
} as const;

export const bento = {
  districtCoverage: {
    label: "Where we start",
    title: "The Village Is the Starting Unit of Workforce Intelligence",
    body: [
      "RojMitra starts where workers live. Workforce information is organised from the village level upward to Gram Panchayat, block, district, state and national views. This creates a common structure for understanding local labour supply without losing the worker-level context behind the data.",
      "Explore [village-level workforce intelligence](/workforce-intelligence), [workforce intelligence for employers](/for-employers), and [workforce initiatives in India](/government-initiatives).",
    ],
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
    label: "Worker profile",
    title: "Ramesh Kumar · Gaya, Bihar",
    body: "10 yrs experience. Knitwear manufacturing, Tiruppur, Tamil Nadu. Returned home. Available.",
    points: ["10 yrs experience", "Knitwear manufacturing, Tiruppur", "Returned home · Available"],
  },
  consentFirst: {
    label: "Trust",
    title: "Workforce Intelligence Built Around Worker Consent",
    body: "RojMitra is designed to collect worker information with the worker's knowledge and consent through local workforce partners. Worker data should be used only for clearly explained purposes.",
    pillars: ["Consent", "Open doors", "Responsible practice"],
  },
} as const;

export const story = {
  label: "The problem",
  headline: "India's Workforce Is Distributed. Its Information Is Fragmented.",
  body: [
    "Workers often build skills across different employers, cities and states, yet their employment experience can remain scattered across personal networks, contractors and previous workplaces. Employers may therefore struggle to understand which workers with relevant experience are available in and around a hiring location.",
    "RojMitra is designed to organise worker information by location, occupation, skills, experience and availability so workforce supply can be understood at a more granular level.",
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
  statsLabel: "What public data can tell us",
  /** Source-led block replaces weakly sourced headline statistics. */
  statsNote:
    "Census data provides village-, sub-district- and district-level population and work-status indicators, while national labour surveys provide broader labour-market measures. RojMitra's role is different: it aims to build worker-level, consent-based workforce intelligence that can complement these aggregate datasets.",
  stats: [] as { value: string; label: string; source: string }[],
  closer: "The talent is already nearby. It just isn't visible.",
} as const;

export const whatItIs = {
  label: "Experience",
  headline: "A Worker's Employment Experience Should Not Disappear When They Move",
  body: [
    "A worker may spend years learning a role in Tiruppur, Surat, Bengaluru or another employment centre and later return to their home village. RojMitra is designed to document roles, industries, work locations, duration and skills in a record that remains useful as the worker changes jobs or locations.",
    "Where evidence is available, relevant employment or skill information can be checked using appropriate verification methods. The level of verification should always be stated accurately rather than treating every field as independently verified.",
  ],
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
      title: "Documented and Checked Where Evidence Is Available",
      points: [
        "Past roles, industries, locations and duration recorded with the worker",
        "Relevant information checked using available evidence and appropriate methods",
        "Workforce records organised to support more informed matching",
        "Verification status shown according to what has actually been checked",
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
      body: "Identify workers and workforce clusters at the village level.",
      status: "live" as "live" | "building",
    },
    {
      step: "02",
      title: "Registration",
      body: "Create consent-based worker profiles and capture past employment history.",
      status: "live" as "live" | "building",
    },
    {
      step: "03",
      title: "Verification",
      body: "Check relevant experience, skills and employment information using appropriate verification methods.",
      status: "live" as "live" | "building",
    },
    {
      step: "04",
      title: "Intelligence mapping",
      body: "Organise workforce information by occupation, skill, experience and geography.",
      status: "live" as "live" | "building",
    },
    {
      step: "05",
      title: "Employer discovery",
      body: "Enable employers to identify suitable local and returning workers using relevant workforce information.",
      status: "live" as "live" | "building",
    },
    {
      step: "06",
      title: "Hiring execution",
      body: "Connect suitable workers to employment opportunities through the EarlyJobs recruitment network.",
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
      body: "What a worker has done, where they have worked, for how long and what they have learned. A connected employment history designed to travel with them.",
      building: false,
    },
    {
      title: "Worker intelligence",
      body: "Consent-based worker profiles organised by location, occupation and employment history.",
      building: false,
    },
    {
      title: "Skills intelligence",
      body: "Understand the skills workers possess, their experience levels and the occupations they can perform.",
      building: false,
    },
    {
      title: "Availability intelligence",
      body: "Understand who may be available, from when and for how long, based on updated worker information.",
      building: false,
    },
    {
      title: "Migration intelligence",
      body: "Understand where workers move for employment, which industries they work in and when they return.",
      building: false,
    },
    {
      title: "Wage intelligence",
      body: "Understand wage expectations, prevailing compensation patterns and differences across locations and occupations.",
      building: true,
    },
    {
      title: "Employer demand intelligence",
      body: "Map employer requirements by geography, industry, occupation and workforce demand.",
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
      body: "RojMitra is designed to document worker skills, experience and availability with the worker's consent, so employment journeys remain useful beyond a single workplace.",
      points: [
        "Past roles, industries, locations and duration recorded with the worker",
        "Relevant information checked using available evidence and appropriate methods",
        "Verification status shown according to what has actually been checked",
      ],
      cta: { label: "Join as a Sourcing Partner", href: "/become-a-sourcing-partner" },
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
      cta: { label: "Become a Village Workforce Mitra", href: "/become-a-sourcing-partner" },
    },
  ],
} as const;

export const trust = {
  label: "Trust",
  headline: "Workforce Intelligence Built Around Worker Consent",
  body: "RojMitra is designed to collect worker information with the worker's knowledge and consent through local workforce partners. Worker data should be used only for clearly explained purposes, with appropriate safeguards, access controls and processes for updating or withdrawing information as applicable.",
  pillars: [
    {
      title: "Consent",
      body: "Worker information is collected with the worker's knowledge and consent, supported by local partners called Village Workforce Mitras.",
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
      title: "Bihar → Tamil Nadu",
      body: "Example, A worker spends months stitching in a knitwear unit in Tiruppur, then travels home for Diwali or Chhath. Then he goes back again.",
    },
    {
      title: "Odisha → Gujarat",
      body: "Example, A worker joins a stitching or finishing unit, learns a trade over several years, and returns to a village with no record of that skill.",
    },
    {
      title: "Uttar Pradesh → NCR or Bengaluru",
      body: "Example, A mason or finishing worker moves between real estate and construction sites, building experience that no single employer ever sees.",
    },
    {
      title: "What we map",
      body: "Corridors, from source village to destination cluster. Seasonality, from festivals to harvests. Skills gained on the road. Return and redeploy, closer to home.",
    },
  ],
} as const;

export const businessModel = {
  label: "For employers",
  headline: "Understand Local and Returning Workforce Before You Hire",
  body: [
    "Manufacturers, garment units, warehouses, logistics operators, retailers and other frontline employers often need better visibility into workforce supply around a location. RojMitra organises workforce information by geography, occupation, skills, experience and availability to support better sourcing and hiring decisions.",
    "Where a requirement is suitable, recruitment execution can be supported through the EarlyJobs ecosystem.",
  ],
  cards: [
    {
      title: "See",
      body: "Understand who is in the surrounding workforce, what skills they possess and where they have worked.",
    },
    {
      title: "Reach",
      body: "Connect with suitable workers who are interested and available for relevant opportunities.",
    },
    {
      title: "Plan",
      body: "Understand local workforce supply and plan hiring around industry and seasonal requirements.",
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
  closing:
    "Together, these platforms connect workforce intelligence, talent discovery, recruitment execution and employment outcomes.",
} as const;

export const aeo = {
  question: "What is village-level workforce intelligence?",
  answer:
    "Village-level workforce intelligence is structured information about workers' locations, occupations, skills, experience, availability and employment journeys, organised from the village upward. It helps employers and institutions understand local workforce supply at a more granular level than state- or district-level averages.",
} as const;

export const faq = {
  label: "FAQ",
  headline: "Questions, answered clearly.",
  items: [
    {
      question: "What is RojMitra?",
      answer:
        "RojMitra is a village-level workforce intelligence initiative by EarlyJobs. It is designed to document and organise worker skills, employment experience, location, availability and work journeys so employers and institutions can better understand local workforce supply.",
    },
    {
      question: "Is RojMitra a job portal?",
      answer:
        "No. RojMitra's core purpose is workforce intelligence rather than job-listing discovery. Employment is an important outcome, but the platform focuses first on making workforce information more structured and visible. Relevant hiring requirements may then be supported through the EarlyJobs recruitment ecosystem.",
    },
    {
      question: "How does RojMitra collect worker information?",
      answer:
        "RojMitra is designed to collect information with the worker's knowledge and consent, supported by local partners. Records may include location, occupation, skills, employment history and availability. Any verification status should reflect the evidence and process used for the specific information being checked.",
    },
    {
      question: "Does RojMitra verify every worker record?",
      answer:
        "Verification should not be treated as a single blanket status. Different information may require different evidence. RojMitra should state which fields have been checked, what method was used and which information remains worker-provided rather than describing every record as fully verified.",
    },
    {
      question: "How can employers use RojMitra?",
      answer:
        "Employers can use village-level workforce information to better understand potential labour pools around hiring locations, including occupations, skills, prior experience and availability. A relevant requirement may also be connected with recruitment execution through EarlyJobs.",
    },
    {
      question: "Can government and livelihood institutions work with RojMitra?",
      answer:
        "RojMitra welcomes discussions with government bodies, skill missions, industry associations, CSR programmes, NGOs and other institutions interested in workforce visibility, employment infrastructure and livelihood initiatives. Any partnership should be described publicly only after it is formally established.",
    },
    {
      question: "Does the website show live national workforce coverage?",
      answer:
        "No. The current website explicitly states that demonstration worker profiles and dashboards are illustrative rather than evidence of live nationwide coverage. Any future coverage figures should include a measurement date, geographic scope and methodology.",
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
      label: "Join as a Sourcing Partner",
      href: "/become-a-sourcing-partner",
    },
    {
      label: "Get in Touch",
      href: `mailto:${site.contact.institutionEmail}?subject=Institution%20collaboration`,
    },
  ],
} as const;

export const footer = {
  partnerCta: {
    label: "Join as Sourcing Partner",
    href: "/become-a-sourcing-partner",
  },
  app: {
    title: "Get the app",
    audience: "For Sourcing Partners",
    status: "Coming soon",
    stores: [
      {
        id: "google-play",
        label: "Google Play",
        href: "https://play.google.com/store/apps/details?id=com.earlyjobs.rojmitra&hl=en_IN" as string | null,
      },
      {
        id: "app-store",
        label: "App Store",
        href: null as string | null,
      },
    ],
  },
  blurb:
    "RojMitra by EarlyJobs builds village-level workforce intelligence by documenting worker skills, experience, availability and employment journeys with consent.",
  explore: [
    { label: "What We Do", href: "/workforce-intelligence" },
    { label: "Architecture", href: "/workforce-intelligence" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "FAQ", href: "#faq" },
    { label: "Join as a Sourcing Partner", href: "/become-a-sourcing-partner" },
  ],
  legal: [
    { label: "Privacy", href: "/#privacy" },
    { label: "Terms", href: "/#terms" },
    { label: "Contact", href: `mailto:${site.contact.partnerEmail}` },
  ],
  copyright: "©Victa EarlyJobs technologies Pvt. Ltd.",
} as const;
