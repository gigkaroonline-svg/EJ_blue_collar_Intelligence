/**
 * RojMitra by EarlyJobs — official website content.
 * Do not invent partnerships, metrics, or government affiliations.
 */

export const site = {
  name: "RojMitra",
  brandLine: "RojMitra by EarlyJobs",
  tagline: "India's Village-Level Workforce Intelligence Infrastructure.",
  positioning: "Making India's Workforce Visible. Village by Village.",
  brandRelationship: "An EarlyJobs initiative",
  trustLine: "Built by EarlyJobs · Community-led · Consent-first",
  url: "https://ej-blue-collar-intelligence.vercel.app",
  contact: {
    partnerEmail: "partners@earlyjobs.ai",
    investorEmail: "investors@earlyjobs.ai",
    employerEmail: "employers@earlyjobs.ai",
    institutionEmail: "institutions@earlyjobs.ai",
  },
} as const;

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Intelligence", href: "#intelligence" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Network", href: "#network" },
  { label: "Employers", href: "#employers" },
] as const;

export const hero = {
  eyebrow: "An EarlyJobs initiative",
  headline: "Making India's Workforce Visible.",
  headlineAccent: "Village by Village.",
  body: [
    "RojMitra maps, verifies and connects India's workforce at the grassroots. We transform fragmented information about workers, skills, occupations, employment availability and migration into actionable workforce intelligence.",
    "From workers in remote villages to manufacturers seeking skilled talent, RojMitra creates a connected intelligence layer that makes India's distributed workforce more visible and accessible.",
  ],
  ctas: [
    { label: "Explore Workforce Intelligence", href: "#intelligence", variant: "primary" as const },
    { label: "Become a Village Partner", href: "#partner", variant: "secondary" as const },
    { label: "Connect as an Employer", href: "#employers", variant: "ghost" as const },
  ],
  capabilities: [
    "Village-Level Intelligence",
    "Worker Verification",
    "Labour Mobility Intelligence",
    "Employer Workforce Discovery",
  ],
} as const;

export const problem = {
  id: "about",
  eyebrow: "The workforce visibility gap",
  headline: "India's Workforce Is Everywhere. Its Intelligence Is Fragmented.",
  body: [
    "India's workforce is distributed across villages, towns, cities and migration corridors. Millions of people possess valuable skills, practical experience and the willingness to work across industries and geographies.",
    "Yet information about where these workers live, what they can do, when they are available and where they are willing to work remains fragmented across informal networks, disconnected databases and local communities.",
    "This creates a significant visibility gap between workforce supply and employer demand.",
  ],
  cards: [
    {
      step: "01",
      title: "Invisible Workforce",
      body: "Employers often struggle to discover suitable workers beyond their immediate recruitment networks.",
    },
    {
      step: "02",
      title: "Fragmented Skills Information",
      body: "Information about occupational skills, industrial experience and worker capabilities is not organised into a connected local intelligence system.",
    },
    {
      step: "03",
      title: "Changing Workforce Availability",
      body: "Migration, seasonal employment and changing job preferences make workforce availability difficult to understand.",
    },
    {
      step: "04",
      title: "Disconnected Employment Opportunities",
      body: "Workers may not know about suitable employment opportunities beyond their immediate communities.",
    },
  ],
  closer:
    "RojMitra brings these disconnected information layers together, starting at the village level.",
} as const;

export const intelligence = {
  id: "intelligence",
  eyebrow: "Our intelligence framework",
  headline: "Understanding the Workforce Beyond Job Listings.",
  intro:
    "RojMitra goes beyond conventional recruitment databases. We organise workforce intelligence around people, their skills, their locations, their employment preferences and their movement across industries and geographies.",
  cards: [
    {
      step: "01",
      title: "Worker Intelligence",
      body: "Understand who workers are, where they come from, what work they have done and what employment opportunities they prefer.",
      tags: ["Occupation", "Experience", "Education", "Skills", "Certifications"],
    },
    {
      step: "02",
      title: "Skills Intelligence",
      body: "Build a structured understanding of skills available across villages and communities.",
      tags: ["Manufacturing", "Construction", "Technical", "Logistics", "Frontline"],
    },
    {
      step: "03",
      title: "Availability Intelligence",
      body: "Understand when workers are available and what employment opportunities they are looking for.",
      tags: ["Employment status", "Joining timelines", "Relocation preferences"],
    },
    {
      step: "04",
      title: "Migration Intelligence",
      body: "Understand how workers move between villages, cities, states and industries.",
      tags: ["Native location", "Seasonal migration", "Return migration", "Industry movement"],
    },
    {
      step: "05",
      title: "Wage Intelligence",
      body: "Understand compensation expectations and location-based wage patterns.",
      tags: ["Current wages", "Expected wages", "Industry-wise wages"],
      building: true,
    },
    {
      step: "06",
      title: "Employer Demand Intelligence",
      body: "Connect workforce information with actual employer requirements.",
      tags: [
        "Required skills",
        "Occupations",
        "Locations",
        "Workforce quantity",
        "Hiring timelines",
      ],
      building: true,
    },
  ],
  closer:
    "From understanding individual worker capabilities to identifying regional workforce supply, RojMitra creates a structured view of India's workforce.",
} as const;

export const architecture = {
  id: "architecture",
  eyebrow: "Built from the grassroots",
  headline: "Every Village Is a Workforce Intelligence Point.",
  body: "The foundation of RojMitra is the village. We place the village at the centre of workforce discovery, registration, verification and intelligence. Information can then be organised and aggregated across larger administrative geographies to build a connected understanding of workforce availability.",
  hierarchy: [
    { level: "Village", detail: "Worker discovery, registration, skills and availability", dominant: true },
    { level: "Gram Panchayat", detail: "Local workforce consolidation", dominant: false },
    { level: "Block", detail: "Regional workforce aggregation", dominant: false },
    { level: "District", detail: "District-wide workforce intelligence", dominant: false },
    { level: "State", detail: "Regional workforce distribution", dominant: false },
    { level: "India", detail: "National workforce intelligence", dominant: false },
  ],
  closer:
    "One village may have hundreds of workers with different occupations, skills and employment preferences. Connecting this information across villages can create a clearer picture of India's workforce.",
} as const;

export const dashboard = {
  id: "dashboard",
  eyebrow: "See the workforce differently",
  headline: "From Village-Level Information to Actionable Intelligence.",
  body: "RojMitra organises workforce information geographically, occupationally and by employment availability. Explore how a village-level workforce profile can help employers and institutions understand local workforce supply.",
  demoNotice:
    "Demonstration data only. All figures below are illustrative and must not be read as live RojMitra results.",
  tabs: ["Geography", "Occupations", "Skills", "Availability", "Migration", "Employer Demand"],
  path: ["India", "Bihar", "Gaya", "Sample Block", "Sample Village"],
  profile: {
    title: "Village Workforce Profile",
    rows: [
      { label: "Registered workers", value: "450" },
      { label: "Profile-verified workers", value: "320" },
      { label: "Manufacturing workers", value: "85" },
      { label: "Construction workers", value: "110" },
      { label: "Logistics workers", value: "45" },
      { label: "Currently available", value: "120" },
      { label: "Open to relocation", value: "75" },
    ],
  },
  charts: [
    {
      title: "Occupation-wise distribution",
      bars: [
        { label: "Construction", value: 34 },
        { label: "Manufacturing", value: 26 },
        { label: "Logistics", value: 18 },
        { label: "Retail", value: 12 },
        { label: "Other", value: 10 },
      ],
    },
    {
      title: "Skills distribution",
      bars: [
        { label: "Technical", value: 28 },
        { label: "Frontline", value: 32 },
        { label: "Machine ops", value: 22 },
        { label: "Driving", value: 18 },
      ],
    },
    {
      title: "Employment availability",
      bars: [
        { label: "Available now", value: 38 },
        { label: "30 days", value: 27 },
        { label: "Seasonal", value: 20 },
        { label: "Not seeking", value: 15 },
      ],
    },
  ],
} as const;

export const howItWorks = {
  id: "how-it-works",
  eyebrow: "The operating framework",
  headline: "From Local Workforce Discovery to Employment Opportunities.",
  intro:
    "RojMitra brings together community-level workforce discovery, structured information, verification and employer connections through an integrated operating framework.",
  steps: [
    {
      step: "01",
      title: "Discover",
      body: "Identify workers across villages through local community networks and institutional channels.",
    },
    {
      step: "02",
      title: "Register",
      body: "Facilitate consent-based worker registration and create structured profiles.",
    },
    {
      step: "03",
      title: "Verify",
      body: "Establish worker identity, occupational information, skills and experience verification status.",
    },
    {
      step: "04",
      title: "Map",
      body: "Organise workforce information by village, occupation, skill, availability and geography.",
    },
    {
      step: "05",
      title: "Update",
      body: "Maintain workforce information as employment status, mobility and preferences change.",
    },
    {
      step: "06",
      title: "Connect",
      body: "Help employers discover relevant workforce supply based on their requirements.",
    },
    {
      step: "07",
      title: "Execute",
      body: "Connect workforce intelligence with recruitment and hiring execution through EarlyJobs.",
    },
  ],
} as const;

export const mobility = {
  id: "mobility",
  eyebrow: "Understanding India's migrating workforce",
  headline: "Workers Move. Workforce Intelligence Should Move With Them.",
  intro:
    "India's workforce is constantly moving between villages, cities, states and industries. A worker's employment journey does not always follow a straight line.",
  story: {
    title: "A real-world workforce journey",
    body: [
      "Consider a worker from Bihar who works in the rubber manufacturing industry in Kerala.",
      "During Diwali or Holi, the worker returns to their native village to spend time with family.",
      "Sometimes the worker does not return to the same employer. They may join another factory, move into another industry or explore employment closer to home.",
      "Without updated workforce information, employers may struggle to understand worker availability and plan their recruitment requirements.",
    ],
    route: ["Bihar", "Kerala", "Bihar", "New opportunity"],
  },
  helps: [
    {
      title: "Native Location Intelligence",
      body: "Understand the worker's home village and preferred employment geography.",
    },
    {
      title: "Migration Intelligence",
      body: "Understand workforce movement between locations and industries.",
    },
    {
      title: "Availability Intelligence",
      body: "Capture updated employment preferences and potential availability.",
    },
    {
      title: "Workforce Continuity",
      body: "Help employers understand changing workforce patterns and plan hiring requirements.",
    },
    {
      title: "Employment Discovery",
      body: "Make suitable employment opportunities more accessible when workers return to their communities.",
    },
  ],
  closer:
    "RojMitra looks beyond where a worker is employed today. It helps create a broader understanding of where the workforce comes from, where it moves and where employment opportunities may exist.",
} as const;

export const network = {
  id: "network",
  eyebrow: "Connecting India at the grassroots",
  headline: "Taking Workforce Intelligence Closer to Every Village.",
  intro:
    "India already has a wide network of digital service points, community institutions and local mobilisation ecosystems. RojMitra's distribution architecture is designed to connect with these existing grassroots ecosystems to make workforce discovery and intelligence more accessible.",
  disclaimer:
    "These categories describe the kinds of local ecosystems RojMitra seeks to work with. They do not imply signed partnerships, government endorsement, or authorised database access.",
  categories: [
    {
      step: "01",
      title: "Digital Service Centres",
      body: "Common Service Centre (CSC) ecosystem. Village-level digital access and assisted worker registration.",
    },
    {
      step: "02",
      title: "Community Institutions",
      body: "Anganwadi and other community institutions. Community-level connections and local outreach, subject to institutional mandates and permissions.",
    },
    {
      step: "03",
      title: "Self-Help Groups",
      body: "Local women-led community networks that can support awareness and community engagement.",
    },
    {
      step: "04",
      title: "Community Mobilisers",
      body: "Grassroots individuals and organisations who understand local communities and can facilitate workforce discovery.",
    },
    {
      step: "05",
      title: "Village-Level Entrepreneurs",
      body: "Local entrepreneurs who can support workforce registration, information updates and community coordination.",
    },
    {
      step: "06",
      title: "Training and Skill Institutions",
      body: "Institutions that can contribute to understanding worker skills, certifications and training requirements.",
    },
  ],
  closer:
    "Our approach is to build a connected village-level workforce intelligence ecosystem by working with relevant local, community and institutional stakeholders.",
} as const;

export const partner = {
  id: "partner",
  eyebrow: "Join the grassroots network",
  headline: "Become a Village Workforce Mitra.",
  intro:
    "India's workforce is distributed across thousands of communities. Local knowledge and community connections are essential to understanding this workforce. RojMitra welcomes individuals, local entrepreneurs, community organisations and institutions interested in contributing to village-level workforce intelligence.",
  who: [
    "CSC operators",
    "Village-level entrepreneurs",
    "Self-help group members",
    "Community organisations",
    "Local employment coordinators",
    "Training institutions",
    "Grassroots mobilisers",
    "Local institutions",
  ],
  what: [
    "Identify workers in local communities",
    "Facilitate worker registration",
    "Help capture occupational information",
    "Support skills and experience verification",
    "Update employment availability",
    "Capture workforce mobility information",
    "Connect workers with suitable opportunities",
  ],
  ctaHeadline: "Be Part of India's Village Workforce Intelligence Network.",
  ctaBody: "Help make local workforce information more visible and accessible.",
  ctaLabel: "Become a Village Partner",
  consent:
    "By submitting this form, you agree to be contacted by the RojMitra team regarding your partnership enquiry. Your information will be handled in accordance with the applicable privacy policy. This enquiry does not guarantee income or employment.",
} as const;

export const employers = {
  id: "employers",
  eyebrow: "For employers and industries",
  headline: "Discover Workforce Beyond Conventional Recruitment Networks.",
  intro: [
    "Finding the right workforce often requires more than posting a job or searching an existing database.",
    "Employers need to understand where suitable workers are located, what skills they possess and when they may be available.",
    "RojMitra connects village-level workforce intelligence with employer demand.",
  ],
  capabilities: [
    {
      title: "Geographical Workforce Discovery",
      body: "Understand workforce availability across villages, blocks, districts and states.",
    },
    {
      title: "Occupation-Based Discovery",
      body: "Identify workforce supply by job role and occupation.",
    },
    {
      title: "Skills-Based Discovery",
      body: "Understand relevant skills, industrial experience and certifications.",
    },
    {
      title: "Availability Intelligence",
      body: "Explore workforce availability and joining preferences.",
    },
    {
      title: "Migration Intelligence",
      body: "Understand workforce mobility and regional employment patterns.",
    },
    {
      title: "Hiring Execution",
      body: "Connect workforce intelligence with recruitment and hiring execution through EarlyJobs.",
    },
  ],
  industries: [
    "Manufacturing",
    "Automotive",
    "Rubber and industrial manufacturing",
    "Construction",
    "Warehousing",
    "Logistics",
    "Retail",
    "Healthcare",
    "Hospitality",
    "Agriculture and allied sectors",
  ],
  ctaHeadline: "Tell Us Your Workforce Requirements.",
  ctaLabel: "Connect With RojMitra",
} as const;

export const ecosystem = {
  id: "ecosystem",
  eyebrow: "Connecting intelligence with execution",
  headline: "Workforce Intelligence Meets Hiring Infrastructure.",
  intro:
    "RojMitra is part of the broader EarlyJobs workforce technology ecosystem. Three complementary capabilities work together.",
  products: [
    {
      name: "RojMitra",
      role: "Village-Level Workforce Intelligence",
      body: "Maps and organises workforce information at the grassroots, including skills, occupations, availability and migration.",
      highlight: true,
    },
    {
      name: "EarlyJobs",
      role: "Distributed Recruitment and Hiring Execution",
      body: "Connects employers with a distributed network of recruiters and workforce mobilisation capabilities.",
      highlight: false,
    },
    {
      name: "Huntlo",
      role: "AI-Powered Hiring Infrastructure",
      body: "Supports intelligent sourcing, candidate screening, outreach, scheduling and hiring workflows.",
      highlight: false,
    },
  ],
  closer:
    "Together, RojMitra, EarlyJobs and Huntlo connect workforce discovery, intelligence and employment execution through a unified ecosystem.",
} as const;

export const trust = {
  id: "trust",
  eyebrow: "Trust by design",
  headline: "Workforce Intelligence Must Begin With Trust.",
  intro:
    "Workers are not just data points. Their information represents their identity, experience, livelihood and employment preferences. RojMitra's approach to workforce intelligence is built around responsible information collection and use.",
  principles: [
    {
      title: "Informed Consent",
      body: "Worker information should be collected with appropriate consent and transparency.",
    },
    {
      title: "Purpose-Specific Collection",
      body: "Collect only information relevant to defined workforce intelligence and employment purposes.",
    },
    {
      title: "Verification Transparency",
      body: "Clearly distinguish registered, identity-verified, skill-verified and availability-confirmed profiles.",
    },
    {
      title: "Responsible Access",
      body: "Information access should follow appropriate authorisation and access controls.",
    },
    {
      title: "Worker Dignity",
      body: "Respect worker privacy, preferences and control over their employment information.",
    },
  ],
} as const;

export const finalCta = {
  id: "final-cta",
  eyebrow: "Building a connected workforce future",
  headline: "India's Workforce Is Everywhere. Its Intelligence Can Be Connected.",
  body: "From a village worker to a national manufacturer, RojMitra is building a more connected way to understand India's workforce. Join the network as a village partner, employer or institutional collaborator.",
  routes: [
    { label: "Become a Village Partner", href: "#partner" },
    { label: "Connect as an Employer", href: "#employers" },
    {
      label: "Institutional Collaboration",
      href: `mailto:institutions@earlyjobs.ai?subject=Institutional%20collaboration`,
    },
  ],
} as const;

export const footer = {
  blurb: "India's Village-Level Workforce Intelligence Infrastructure.",
  positioning: "Making India's Workforce Visible. Village by Village.",
  nav: [
    { label: "About", href: "#about" },
    { label: "Intelligence", href: "#intelligence" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Partner Network", href: "#network" },
    { label: "Employers", href: "#employers" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#privacy" },
    { label: "Terms of Use", href: "#terms" },
    { label: "Contact", href: "mailto:partners@earlyjobs.ai" },
    { label: "About EarlyJobs", href: "https://www.earlyjobs.ai", external: true },
  ],
  copyright: `© ${new Date().getFullYear()} RojMitra by EarlyJobs. All rights reserved.`,
} as const;

export const legal = {
  privacy: {
    title: "Privacy Policy",
    body: "RojMitra collects and processes workforce and partnership enquiry information with consent for defined workforce intelligence and employment purposes. A complete privacy policy will be published here after legal review. For privacy questions, contact partners@earlyjobs.ai.",
  },
  terms: {
    title: "Terms of Use",
    body: "This website describes RojMitra by EarlyJobs. Formal terms of use will be published here after legal review. Enquiry submissions do not create a partnership, employment, or commercial agreement.",
  },
} as const;
