/**
 * RojMitra site content, edit this file to update copy, placeholders, and CTAs.
 * Keep [X] figures as editable placeholders until verified. Do not invent metrics.
 */

export const site = {
  name: "RojMitra",
  tagline: "Mapping India’s Workforce.",
  positioning: "Mapping India’s workforce, one district at a time.",
  brandRelationship: "An EarlyJobs initiative",
  trustLine: "Built by EarlyJobs · Community-led · Consent-first",
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
  { label: "Home", href: "#home" },
  { label: "The Problem", href: "#problem" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Intelligence", href: "#what-we-map" },
  { label: "Impact", href: "#impact" },
  { label: "Partners", href: "#partners" },
] as const;

export const hero = {
  headline: "Mapping India’s workforce,",
  headlineAccent: "one district at a time.",
  subhead:
    "RojMitra maps, verifies and connects workers across districts, skills and industries, so employers can plan better, workers can be seen, and institutions can act on real labour intelligence.",
  primaryCta: { label: "Partner With Us", href: "#partner" },
  secondaryCta: { label: "View the Vision", href: "#vision" },
  cards: {
    profile: {
      label: "Worker profiles",
      title: "Consent-first by design",
      body: "Skills, availability and location captured with clear consent, so workers stay visible and in control.",
      tags: ["Skills", "Availability", "Location"],
    },
    map: {
      label: "District map",
      title: "Mapped from the ground up",
      body: "Village, block and district coverage through a grassroots collection network.",
      layers: ["Village", "Block", "District", "Cluster"],
    },
    intelligence: {
      label: "Labour intelligence",
      title: "Skills, availability and wages, mapped.",
      body: "District-level visibility of who can work, where they are, and when they are ready, so hiring starts from ground truth.",
      tags: ["Skills", "Geography", "Availability", "Wages"],
    },
    trust: {
      title: "Verified · Consent given",
      body: "Community partners verify profiles. Workers choose what is shared.",
    },
    sectors: {
      label: "Sectors we map",
      title: "Across India’s workforce",
      items: ["Delivery", "Warehouse", "Construction", "Retail", "Field work", "Manufacturing"],
    },
    network: {
      label: "Grassroots network",
      title: "Built with communities",
      body: "CSC centres, mobilizers and institutional partners collect and update labour intelligence at source.",
    },
  },
} as const;

export const networkStrip = [
  "CSC centres",
  "Community partners",
  "Mobilizers",
  "Institutional networks",
  "Employers",
] as const;

export const aboutStatement = {
  lead: "We make workers",
  visible: "visible",
  middle: ", employers",
  informed: "informed",
  and: ", and work",
  accessible: "accessible",
  period: ".",
  support:
    "District by district, RojMitra turns scattered labour information into shared workforce intelligence.",
} as const;

export const bento = {
  districtCoverage: {
    label: "District coverage",
    title: "One district at a time",
    body: "Grassroots mapping across villages and urban clusters, building living workforce maps where labour actually lives and moves.",
    points: [
      { title: "Village & block", detail: "Collected at source through local partners" },
      { title: "Urban clusters", detail: "Mapped where demand and supply meet" },
      { title: "Expandable model", detail: "Designed to scale district by district" },
    ],
  },
  systemLayers: {
    label: "System layers",
    title: "Four connected layers",
    body: "From field collection to employment outcomes, one continuous intelligence stack.",
    points: [
      { step: "01", title: "Grassroots collection", status: "live" as const },
      { step: "02", title: "Labour intelligence", status: "live" as const },
      { step: "03", title: "Intelligence products", status: "building" as const },
      { step: "04", title: "Employment outcomes", status: "building" as const },
    ],
  },
  workerProfiles: {
    label: "Worker profiles",
    title: "Built for trust",
    body: "Consent-backed profiles with skills, availability and location, updated through community partners.",
    points: ["Skills & experience", "Availability signals", "Local geography"],
  },
  consentFirst: {
    label: "Practice",
    title: "Consent-first",
    body: "Workers control what is shared. Verification and updates keep intelligence reliable.",
    pillars: ["Consent", "Verification", "Updates"],
  },
} as const;

export const story = {
  label: "Our story",
  headline: "Labour information is scattered. Opportunity should not be.",
  body: [
    "Employer demand and worker availability still live across villages, districts, WhatsApp groups and word of mouth. The result is friction: employers struggle to plan hiring, workers remain invisible, and institutions lack a clear picture of the labour market.",
    "RojMitra treats this as an infrastructure problem, building the workforce intelligence layer that maps, verifies and connects India’s labour force at the district level.",
  ],
  /** Omit or replace attribution only when confirmed. */
  pullQuote: null as null | { quote: string; attribution: string },
} as const;

export const problem = {
  label: "The problem",
  headline: "India’s labour market is fragmented by design, not by choice.",
  cards: [
    {
      audience: "Employers",
      title: "Hiring without a clear map",
      body: "Demand exists, but verified local supply is hard to see. Planning hinges on informal networks instead of reliable workforce intelligence.",
    },
    {
      audience: "Workers",
      title: "Skills without visibility",
      body: "Capable workers remain uncounted and unmatched. Without a trusted profile and path, opportunity stays out of reach, even nearby.",
    },
    {
      audience: "Planners",
      title: "Policy without ground truth",
      body: "Institutions need district-level labour visibility to design skilling, placement and mobility programmes that actually fit the ground.",
    },
  ],
  closer: "More job posts won’t fix this. Better visibility will.",
} as const;

export const whatItIs = {
  label: "What RojMitra is",
  headline: "Workforce intelligence infrastructure, not another job portal.",
  body: "RojMitra maps who can work, where they are, what they can do, and when they are available. That intelligence powers better hiring, fairer access and clearer planning, without reducing workers to listings.",
  comparison: {
    portal: {
      title: "A typical job portal",
      points: [
        "Lists openings and resumes",
        "Optimises for clicks and applications",
        "Thin context on local supply",
        "Worker visibility ends at a profile page",
      ],
    },
    rojmitra: {
      title: "RojMitra",
      points: [
        "Maps workforce at district scale",
        "Built for verified, consent-first profiles",
        "Skills, availability, wages and mobility in one view",
        "Intelligence for employers, institutions and partners",
      ],
    },
  },
} as const;

export const howItWorks = {
  label: "How it works",
  headline: "Four connected layers, from the ground up.",
  layers: [
    {
      step: "01",
      title: "Grassroots data collection",
      body: "Community mobilizers, CSC centres and partners gather consent-backed worker information at the source, villages, blocks and urban clusters.",
      status: "live" as const,
    },
    {
      step: "02",
      title: "Labour intelligence platform",
      body: "Profiles, skills, geography and availability are structured into a living district-level workforce map that teams can trust and update.",
      status: "live" as const,
    },
    {
      step: "03",
      title: "Intelligence products",
      body: "Dashboards, workforce reports and demand–supply views that help employers and institutions plan with clarity.",
      status: "building" as const,
    },
    {
      step: "04",
      title: "Employment outcomes",
      body: "Connecting verified workers to real opportunities through the EarlyJobs ecosystem, measured by access, not just listings.",
      status: "building" as const,
    },
  ],
} as const;

export const whatWeMap = {
  label: "Intelligence",
  headline: "What we map",
  items: [
    {
      title: "Skills",
      body: "What workers can do, trades, certifications and practical experience captured in plain language.",
      building: false,
    },
    {
      title: "Geography",
      body: "Where workers live and can work, village, block and district context that hiring actually needs.",
      building: false,
    },
    {
      title: "Availability",
      body: "Who is ready now, seasonally, or for specific shifts, so demand meets real supply.",
      building: false,
    },
    {
      title: "Wages",
      body: "Expected and prevailing wage bands that keep conversations fair and grounded.",
      building: true,
    },
    {
      title: "Mobility",
      body: "Willingness and patterns of movement across districts, critical for planning and placement.",
      building: true,
    },
    {
      title: "Demand",
      body: "Where employers need people, in which roles, and at what scale, closing the loop.",
      building: true,
    },
  ],
} as const;

export const audiences = {
  label: "Who it serves",
  headline: "Built for every side of the labour market.",
  tabs: [
    {
      id: "workers",
      title: "Workers",
      body: "Be seen for your skills, stay in control of your data, and get connected to opportunities through a trusted local network, not cold listings.",
      points: [
        "Consent-first profile ownership",
        "Skills and availability that employers can trust",
        "Local mobilisation through community partners",
      ],
      cta: { label: "Join the network", href: `mailto:${site.contact.partnerEmail}?subject=Worker%20network` },
    },
    {
      id: "employers",
      title: "Employers",
      body: "Plan hiring with district-level workforce visibility. Access verified labour intelligence instead of guessing from informal channels.",
      points: [
        "District workforce maps",
        "Skills and availability signals",
        "Pathways into EarlyJobs recruitment",
      ],
      cta: { label: "Talk to our team", href: `mailto:${site.contact.employerEmail}?subject=Employer%20enquiry` },
    },
    {
      id: "institutions",
      title: "Institutions & Government",
      body: "Ground programmes in real labour visibility, skills, mobility and local supply that inform skilling, placement and planning.",
      points: [
        "District-level labour intelligence",
        "Consent-backed, community-sourced data",
        "Partnership models for scale",
      ],
      cta: {
        label: "Explore partnership",
        href: `mailto:${site.contact.institutionEmail}?subject=Institution%20partnership`,
      },
    },
    {
      id: "partners",
      title: "Partners",
      body: "CSCs, mobilizers, NGOs and institutional networks, plug into a shared infrastructure that makes grassroots effort countable and useful.",
      points: [
        "Field tools for collection and verification",
        "Shared district coverage goals",
        "Recognition inside the EarlyJobs ecosystem",
      ],
      cta: { label: "Partner With Us", href: "#partner" },
    },
  ],
} as const;

export const trust = {
  label: "Built on trust",
  headline: "Consent. Verification. Living profiles.",
  body: "RojMitra is designed so workers stay in control. Data is collected with consent, verified through grassroots partners, and kept useful through profile updates, because stale information helps no one.",
  pillars: [
    {
      title: "Consent",
      body: "Workers choose what is shared. Collection happens with clear purpose through trusted local partners.",
    },
    {
      title: "Verification",
      body: "Community networks and partner checks help keep profiles credible, not anonymous scrapes.",
    },
    {
      title: "Profile updates",
      body: "Availability and skills change. RojMitra is built for updates so intelligence stays current.",
    },
  ],
} as const;

export const impact = {
  label: "Impact",
  headline: "What better visibility unlocks.",
  tiles: [
    {
      title: "Access",
      body: "Workers who were invisible get a path into opportunity through mapped skills and local networks.",
    },
    {
      title: "Inclusion",
      body: "Community-led collection reaches people that digital-only platforms miss.",
    },
    {
      title: "Mobility",
      body: "Clearer signals on where people can and will work, reducing wasteful migration and missed local matches.",
    },
    {
      title: "Planning",
      body: "Employers and institutions plan with district truth instead of anecdotes.",
    },
  ],
} as const;

export const businessModel = {
  label: "Business model",
  headline: "For-profit. Impact-led.",
  body: "RojMitra sustains itself by creating value for employers and institutions, while keeping worker trust at the centre. Revenue follows usefulness, not extraction.",
  cards: [
    {
      title: "Recruitment revenue",
      body: "Placement and hiring pathways through the EarlyJobs ecosystem, informed by RojMitra intelligence.",
    },
    {
      title: "Workforce intelligence subscriptions",
      body: "Ongoing access to district maps, skills views and availability signals for planning teams.",
    },
    {
      title: "Analytics",
      body: "Reports and insights on supply, demand and mobility for organisations that need deeper clarity.",
    },
    {
      title: "Enterprise integrations",
      body: "Connecting workforce intelligence into partner systems and hiring workflows at scale.",
    },
  ],
  cta: {
    label: "Request the Investor Brief",
    href: `mailto:${site.contact.investorEmail}?subject=Investor%20Brief%20Request`,
  },
} as const;

export const ecosystem = {
  label: "EarlyJobs ecosystem",
  headline: "One family. Distinct roles.",
  products: [
    {
      name: "EarlyJobs",
      role: "Recruiter-led hiring and franchise network connecting talent to employers.",
      highlight: false,
    },
    {
      name: "Huntlo AI",
      role: "AI recruiting infrastructure that accelerates sourcing and screening.",
      highlight: false,
    },
    {
      name: "GigKaro",
      role: "Gig and flexible-work pathways for on-demand labour needs.",
      highlight: false,
    },
    {
      name: "RojMitra",
      role: "Workforce intelligence and labour mapping, the visibility layer beneath opportunity.",
      highlight: true,
    },
  ],
} as const;

export const visionMission = {
  label: "Vision & mission",
  vision: {
    title: "Vision",
    body: "An India where every worker is visible, every employer can plan with confidence, and every district has a living map of its workforce.",
  },
  mission: {
    title: "Mission",
    body: "To map, verify and connect India’s labour force, district by district, through community-led, consent-first workforce intelligence.",
  },
} as const;

export const faq = {
  label: "FAQ",
  headline: "Questions, answered clearly.",
  items: [
    {
      question: "What is RojMitra?",
      answer:
        "RojMitra is India’s workforce intelligence and labour mapping infrastructure, an EarlyJobs initiative that maps, verifies and connects workers across districts, skills and industries.",
    },
    {
      question: "Is RojMitra a job portal?",
      answer:
        "No. Job portals list openings. RojMitra builds the underlying map of who can work, where, and with which skills, so hiring and planning start from visibility, not guesswork.",
    },
    {
      question: "Is RojMitra an NGO or a government project?",
      answer:
        "No. RojMitra is a for-profit, impact-led product within the EarlyJobs ecosystem. It partners with community networks and institutions, but it is not an NGO or a government project.",
    },
    {
      question: "How is data collected?",
      answer:
        "Through a grassroots network, CSC centres, community partners, mobilizers and institutional networks, with worker consent at the point of collection.",
    },
    {
      question: "Who uses the intelligence?",
      answer:
        "Employers planning hiring, institutions designing programmes, partners expanding coverage, and the EarlyJobs ecosystem connecting workers to outcomes.",
    },
    {
      question: "How does the business make money?",
      answer:
        "Through recruitment pathways, workforce intelligence subscriptions, analytics and enterprise integrations, value created for organisations that need reliable labour visibility.",
    },
    {
      question: "How can we partner?",
      answer:
        "Employers, institutions, community partners and investors can reach us directly. Use Partner With Us or write to our partnership team to start a conversation.",
    },
  ],
} as const;

export const finalCta = {
  headline: "Help us map India’s workforce.",
  body: "Whether you hire, plan, mobilise or invest, there is a clear way to build this with us.",
  routes: [
    { label: "Employers", href: `mailto:${site.contact.employerEmail}?subject=Employer%20enquiry` },
    {
      label: "Institutions",
      href: `mailto:${site.contact.institutionEmail}?subject=Institution%20partnership`,
    },
    { label: "Partners", href: `mailto:${site.contact.partnerEmail}?subject=Partner%20with%20RojMitra` },
    { label: "Investors", href: `mailto:${site.contact.investorEmail}?subject=Investor%20Brief%20Request` },
  ],
} as const;

export const footer = {
  legal: [
    { label: "Privacy", href: "#privacy" },
    { label: "Terms", href: "#terms" },
    { label: "Contact", href: `mailto:${site.contact.partnerEmail}` },
  ],
  copyright: `© ${new Date().getFullYear()} RojMitra · An EarlyJobs initiative`,
} as const;
