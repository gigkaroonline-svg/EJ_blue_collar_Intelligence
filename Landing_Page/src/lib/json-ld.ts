import { absoluteUrl, SITE_ORIGIN } from "@/lib/site-url";

/** Site-wide Organization / Brand / WebSite / Service graph for the homepage head. */
export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_ORIGIN}/#organization`,
      name: "EarlyJobs",
      legalName: "Victa EarlyJobs Technologies Private Limited",
      url: "https://www.earlyjobs.ai/",
      logo: `${SITE_ORIGIN}/logo.png`,
      founder: {
        "@id": `${SITE_ORIGIN}/#founder`,
      },
      brand: {
        "@id": `${SITE_ORIGIN}/#brand`,
      },
      description:
        "EarlyJobs builds hiring execution and workforce infrastructure through technology and distributed networks.",
    },
    {
      "@type": "Brand",
      "@id": `${SITE_ORIGIN}/#brand`,
      name: "RojMitra",
      alternateName: "RojMitra by EarlyJobs",
      url: `${SITE_ORIGIN}/`,
      logo: `${SITE_ORIGIN}/logo.png`,
      slogan: "India's Labour Intelligence Mapping System",
      description:
        "RojMitra is building village-level workforce intelligence infrastructure in India by documenting workers' skills, employment experience, availability and work journeys.",
    },
    {
      "@type": "Person",
      "@id": `${SITE_ORIGIN}/#founder`,
      name: "Saurav Kumar",
      jobTitle: "Founder and CEO",
      url: "https://www.linkedin.com/in/mesauravkumar/",
      sameAs: ["https://www.linkedin.com/in/mesauravkumar/"],
      worksFor: {
        "@id": `${SITE_ORIGIN}/#organization`,
      },
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "SRM University",
      },
      knowsAbout: [
        "Workforce Intelligence",
        "Labour Market Intelligence",
        "Recruitment Infrastructure",
        "Artificial Intelligence",
        "Gig Economy",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_ORIGIN}/#website`,
      url: `${SITE_ORIGIN}/`,
      name: "RojMitra",
      alternateName: "RojMitra by EarlyJobs",
      publisher: {
        "@id": `${SITE_ORIGIN}/#organization`,
      },
      about: {
        "@id": `${SITE_ORIGIN}/#brand`,
      },
      inLanguage: "en-IN",
    },
    {
      "@type": "WebPage",
      "@id": `${SITE_ORIGIN}/#webpage`,
      url: `${SITE_ORIGIN}/`,
      name: "Village-Level Workforce Intelligence India | RojMitra",
      description:
        "RojMitra by EarlyJobs is building India's village-level workforce intelligence system by documenting workers' skills, employment experience, availability and work journeys.",
      isPartOf: {
        "@id": `${SITE_ORIGIN}/#website`,
      },
      publisher: {
        "@id": `${SITE_ORIGIN}/#organization`,
      },
      about: {
        "@id": `${SITE_ORIGIN}/#brand`,
      },
      mainEntity: {
        "@id": `${SITE_ORIGIN}/#brand`,
      },
      inLanguage: "en-IN",
    },
    {
      "@type": "DefinedTerm",
      "@id": `${SITE_ORIGIN}/#workforce-intelligence`,
      name: "Village-Level Workforce Intelligence",
      description:
        "The systematic identification, documentation and verification of workers' skills, experience, employment preferences, availability and work journeys at village and local levels.",
      inDefinedTermSet: {
        "@type": "DefinedTermSet",
        "@id": `${SITE_ORIGIN}/#workforce-intelligence-glossary`,
        name: "Workforce Intelligence",
      },
    },
    {
      "@type": "Service",
      "@id": `${SITE_ORIGIN}/#service`,
      name: "Village-Level Workforce Intelligence",
      serviceType: "Workforce intelligence and local labour market mapping",
      provider: {
        "@id": `${SITE_ORIGIN}/#organization`,
      },
      brand: {
        "@id": `${SITE_ORIGIN}/#brand`,
      },
      description:
        "RojMitra helps employers and institutions understand local workforce availability, skills, employment experience and workforce movement through village-level intelligence mapping.",
      areaServed: {
        "@type": "Country",
        name: "India",
      },
      audience: [
        {
          "@type": "BusinessAudience",
          audienceType:
            "Manufacturing, construction, logistics, healthcare, retail and other employers",
        },
        {
          "@type": "GovernmentAudience",
          audienceType: "Government and livelihood institutions",
        },
      ],
    },
  ],
};

/** About page schema: AboutPage + intelligence dimensions + breadcrumbs. */
export const aboutPageJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": `${SITE_ORIGIN}/about#webpage`,
      url: `${SITE_ORIGIN}/about`,
      name: "About RojMitra: Village-Level Workforce Intelligence by EarlyJobs",
      description:
        "Learn about RojMitra, an EarlyJobs initiative building village-level workforce intelligence by documenting workers' skills, employment experience, location and availability with consent.",
      isPartOf: {
        "@id": `${SITE_ORIGIN}/#website`,
      },
      publisher: {
        "@id": `${SITE_ORIGIN}/#organization`,
      },
      about: [
        { "@id": `${SITE_ORIGIN}/#brand` },
        { "@id": `${SITE_ORIGIN}/#workforce-intelligence` },
        { "@id": `${SITE_ORIGIN}/#founder` },
      ],
      mainEntity: {
        "@id": `${SITE_ORIGIN}/#brand`,
      },
      breadcrumb: {
        "@id": `${SITE_ORIGIN}/about#breadcrumb`,
      },
      inLanguage: "en-IN",
      hasPart: {
        "@id": `${SITE_ORIGIN}/about#intelligence-dimensions`,
      },
    },
    {
      "@type": "ItemList",
      "@id": `${SITE_ORIGIN}/about#intelligence-dimensions`,
      name: "Six Dimensions of RojMitra Workforce Intelligence",
      description:
        "The six connected dimensions through which RojMitra organises local workforce information.",
      numberOfItems: 6,
      itemListOrder: "https://schema.org/ItemListUnordered",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Worker Intelligence",
          description:
            "Understanding who workers are, where they live and what work they can perform.",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Experience Intelligence",
          description:
            "Recording employment history, industries, roles and years of experience.",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Skills Intelligence",
          description: "Making workers' existing skills and capabilities more visible.",
        },
        {
          "@type": "ListItem",
          position: 4,
          name: "Availability Intelligence",
          description: "Understanding when workers may be available for employment.",
        },
        {
          "@type": "ListItem",
          position: 5,
          name: "Migration Intelligence",
          description:
            "Understanding workforce movement between villages, cities and industries.",
        },
        {
          "@type": "ListItem",
          position: 6,
          name: "Local Partner Network",
          description:
            "Working with trusted community-level partners to help workers create and maintain their records.",
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${SITE_ORIGIN}/about#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `${SITE_ORIGIN}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "About RojMitra",
          item: `${SITE_ORIGIN}/about`,
        },
      ],
    },
  ],
};

/** Our Story page schema: WebPage + Article + breadcrumbs. */
export const ourStoryPageJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${SITE_ORIGIN}/our-story#webpage`,
      url: `${SITE_ORIGIN}/our-story`,
      name: "Why We Built RojMitra: A Worker's Experience Should Travel With Them",
      description:
        "The story behind RojMitra, an EarlyJobs initiative building village-level workforce intelligence to make workers' skills, employment experience and work journeys more visible.",
      isPartOf: {
        "@id": `${SITE_ORIGIN}/#website`,
      },
      publisher: {
        "@id": `${SITE_ORIGIN}/#organization`,
      },
      about: [
        { "@id": `${SITE_ORIGIN}/#brand` },
        { "@id": `${SITE_ORIGIN}/#workforce-intelligence` },
      ],
      mainEntity: {
        "@id": `${SITE_ORIGIN}/our-story#article`,
      },
      breadcrumb: {
        "@id": `${SITE_ORIGIN}/our-story#breadcrumb`,
      },
      inLanguage: "en-IN",
    },
    {
      "@type": "Article",
      "@id": `${SITE_ORIGIN}/our-story#article`,
      headline: "Why We Built RojMitra: A Worker's Experience Should Travel With Them",
      description:
        "A worker can spend years developing practical skills in factories, warehouses, construction sites and service roles, yet that experience often becomes difficult for the next employer to understand. RojMitra was built to make workers' employment journeys more visible through village-level workforce intelligence.",
      mainEntityOfPage: {
        "@id": `${SITE_ORIGIN}/our-story#webpage`,
      },
      publisher: {
        "@id": `${SITE_ORIGIN}/#organization`,
      },
      copyrightHolder: {
        "@id": `${SITE_ORIGIN}/#organization`,
      },
      about: [
        { "@id": `${SITE_ORIGIN}/#brand` },
        { "@id": `${SITE_ORIGIN}/#workforce-intelligence` },
      ],
      articleSection: [
        "The Realisation Behind RojMitra",
        "Why the Village Matters",
        "From Recruitment to Workforce Intelligence",
        "Building It One Village at a Time",
        "What We Believe",
      ],
      inLanguage: "en-IN",
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${SITE_ORIGIN}/our-story#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `${SITE_ORIGIN}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Our Story",
          item: `${SITE_ORIGIN}/our-story`,
        },
      ],
    },
  ],
};

/** The Problem page schema: WebPage + DefinedTerm + FAQ + breadcrumbs. */
export const theProblemPageJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${SITE_ORIGIN}/the-problem#webpage`,
      url: `${SITE_ORIGIN}/the-problem`,
      name: "India's Workforce Is Everywhere. The Intelligence About It Is Not.",
      description:
        "An explanation of India's workforce visibility problem: workers' skills, employment experience, location and availability are often fragmented across employers, contractors and geographies.",
      isPartOf: {
        "@id": `${SITE_ORIGIN}/#website`,
      },
      publisher: {
        "@id": `${SITE_ORIGIN}/#organization`,
      },
      about: [
        { "@id": `${SITE_ORIGIN}/#brand` },
        { "@id": `${SITE_ORIGIN}/#workforce-intelligence` },
      ],
      mainEntity: {
        "@id": `${SITE_ORIGIN}/the-problem#workforce-visibility-problem`,
      },
      breadcrumb: {
        "@id": `${SITE_ORIGIN}/the-problem#breadcrumb`,
      },
      hasPart: {
        "@id": `${SITE_ORIGIN}/the-problem#faq`,
      },
      inLanguage: "en-IN",
    },
    {
      "@type": "DefinedTerm",
      "@id": `${SITE_ORIGIN}/the-problem#workforce-visibility-problem`,
      name: "Workforce Visibility Problem",
      description:
        "The difficulty of identifying and understanding workers' skills, employment experience, location, occupation and availability because workforce information is fragmented across employers, contractors, personal networks and geographical locations.",
      inDefinedTermSet: {
        "@id": `${SITE_ORIGIN}/#workforce-intelligence-glossary`,
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_ORIGIN}/the-problem#faq`,
      url: `${SITE_ORIGIN}/the-problem`,
      name: "Frequently Asked Questions About India's Workforce Visibility Problem",
      isPartOf: {
        "@id": `${SITE_ORIGIN}/the-problem#webpage`,
      },
      mainEntity: [
        {
          "@type": "Question",
          name: "What is the workforce visibility problem in India?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The problem is that worker experience, skills, location and availability can be fragmented across employers, contractors, personal networks and geographies. This can make suitable workers difficult for employers or institutions to identify even when labour exists locally.",
          },
        },
        {
          "@type": "Question",
          name: "Why are district-level figures not always enough?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "District-level data is useful for planning but may conceal substantial differences between communities, occupations and local labour pools. Village-level workforce information can provide a more granular operational view.",
          },
        },
        {
          "@type": "Question",
          name: "How does migration affect workforce visibility?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Workers can accumulate experience in several locations and industries before returning home or moving again. Without a portable employment record, each move can make that experience harder for the next employer to understand.",
          },
        },
        {
          "@type": "Question",
          name: "Is RojMitra intended to replace government workforce databases?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. RojMitra should be positioned as complementary workforce intelligence. Official systems serve statutory, welfare and policy purposes that are distinct from RojMitra's workforce-mapping and employment-use cases.",
          },
        },
        {
          "@type": "Question",
          name: "How can employers use village-level information?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Employers can use it to examine potential workforce supply around a hiring location and understand relevant occupations, previous industries, experience and stated availability before deciding how to source.",
          },
        },
        {
          "@type": "Question",
          name: "How can institutions use workforce intelligence?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Potential institutional uses include workforce research, employment planning, livelihood programmes and skill-development analysis. Any specific institutional use should depend on data quality, consent, programme design and agreed governance arrangements.",
          },
        },
      ],
      inLanguage: "en-IN",
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${SITE_ORIGIN}/the-problem#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `${SITE_ORIGIN}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "The Problem",
          item: `${SITE_ORIGIN}/the-problem`,
        },
      ],
    },
  ],
};

/** Workforce Intelligence page schema: WebPage + ItemLists + FAQ + breadcrumbs. */
export const workforceIntelligencePageJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${SITE_ORIGIN}/workforce-intelligence#webpage`,
      url: `${SITE_ORIGIN}/workforce-intelligence`,
      name: "Village-Level Workforce Intelligence for India",
      description:
        "An explanation of workforce intelligence and how RojMitra organises consent-based information about workers' locations, occupations, skills, employment experience, migration and availability, starting at the village level.",
      isPartOf: {
        "@id": `${SITE_ORIGIN}/#website`,
      },
      publisher: {
        "@id": `${SITE_ORIGIN}/#organization`,
      },
      about: [
        { "@id": `${SITE_ORIGIN}/#brand` },
        { "@id": `${SITE_ORIGIN}/#workforce-intelligence` },
      ],
      mainEntity: {
        "@id": `${SITE_ORIGIN}/#workforce-intelligence`,
      },
      hasPart: [
        { "@id": `${SITE_ORIGIN}/workforce-intelligence#intelligence-areas` },
        { "@id": `${SITE_ORIGIN}/workforce-intelligence#geographic-hierarchy` },
        { "@id": `${SITE_ORIGIN}/workforce-intelligence#faq` },
      ],
      breadcrumb: {
        "@id": `${SITE_ORIGIN}/workforce-intelligence#breadcrumb`,
      },
      inLanguage: "en-IN",
    },
    {
      "@type": "ItemList",
      "@id": `${SITE_ORIGIN}/workforce-intelligence#intelligence-areas`,
      name: "Six Areas of Workforce Intelligence Organised by RojMitra",
      description: "The workforce information areas described on the RojMitra platform.",
      numberOfItems: 6,
      itemListOrder: "https://schema.org/ItemListUnordered",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Workforce Demographics",
          description:
            "Understanding workforce distribution across villages, Gram Panchayats, blocks and districts using relevant, consent-based worker information.",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Skills and Occupations",
          description:
            "Understanding the occupations, practical skills and work capabilities present within local communities.",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Employment Experience",
          description:
            "Documenting workers' previous industries, job roles and employment experience.",
        },
        {
          "@type": "ListItem",
          position: 4,
          name: "Migration Patterns",
          description:
            "Understanding workforce movement between villages, towns, cities and states for employment.",
        },
        {
          "@type": "ListItem",
          position: 5,
          name: "Workforce Availability",
          description:
            "Understanding workers' stated interest in employment, preferred locations and availability.",
        },
        {
          "@type": "ListItem",
          position: 6,
          name: "Industry-Level Workforce Insights",
          description:
            "Organising workforce information around industries including manufacturing, textiles, construction, logistics, warehousing and retail.",
        },
      ],
    },
    {
      "@type": "ItemList",
      "@id": `${SITE_ORIGIN}/workforce-intelligence#geographic-hierarchy`,
      name: "RojMitra Geographic Workforce Mapping Hierarchy",
      description:
        "The geographic structure through which village-level workforce information can be organised into wider views.",
      numberOfItems: 6,
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Village" },
        { "@type": "ListItem", position: 2, name: "Gram Panchayat" },
        { "@type": "ListItem", position: 3, name: "Block" },
        { "@type": "ListItem", position: 4, name: "District" },
        { "@type": "ListItem", position: 5, name: "State" },
        { "@type": "ListItem", position: 6, name: "India" },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_ORIGIN}/workforce-intelligence#faq`,
      name: "Workforce Intelligence Frequently Asked Questions",
      isPartOf: {
        "@id": `${SITE_ORIGIN}/workforce-intelligence#webpage`,
      },
      mainEntity: [
        {
          "@type": "Question",
          name: "What is workforce intelligence?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Workforce intelligence is structured information about workforce supply, such as worker location, occupation, skills, employment experience, availability and movement. It helps organisations understand labour pools and make better-informed workforce decisions.",
          },
        },
        {
          "@type": "Question",
          name: "What is village-level workforce intelligence?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "It applies the same concept at the village level, using the village as the starting geographic unit before organising information into Gram Panchayat, block, district, state and wider views.",
          },
        },
        {
          "@type": "Question",
          name: "How is workforce intelligence different from a job portal?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A job portal primarily connects vacancies with applications. Workforce intelligence focuses on understanding the characteristics and distribution of labour supply. Recruitment may use that intelligence, but the data has planning value beyond a single job posting.",
          },
        },
        {
          "@type": "Question",
          name: "What workforce information does RojMitra aim to organise?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "RojMitra is designed around worker location, employment history, occupations, skills, availability and migration. Any published field should have a clear source, update date and verification status where relevant.",
          },
        },
        {
          "@type": "Question",
          name: "Can employers use workforce intelligence for bulk or frontline hiring?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "It can support bulk and frontline hiring by helping an employer understand potential labour pools around a requirement. Actual candidate interest, eligibility and availability still need to be confirmed during recruitment.",
          },
        },
        {
          "@type": "Question",
          name: "Can workforce intelligence support government or CSR programmes?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "It may support programme planning, research or livelihood interventions where the data, purpose, consent and governance model are appropriate. It should complement, rather than be represented as replacing, official administrative systems.",
          },
        },
      ],
      inLanguage: "en-IN",
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${SITE_ORIGIN}/workforce-intelligence#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `${SITE_ORIGIN}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Workforce Intelligence",
          item: `${SITE_ORIGIN}/workforce-intelligence`,
        },
      ],
    },
  ],
};

/** How It Works page schema: WebPage + HowTo + foundations ItemList + FAQ + breadcrumbs. */
export const howItWorksPageJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${SITE_ORIGIN}/how-it-works#webpage`,
      url: `${SITE_ORIGIN}/how-it-works`,
      name: "How RojMitra Builds Village-Level Workforce Intelligence",
      description:
        "Learn how RojMitra combines local workforce engagement, consent-based worker information collection and technology to organise village-level workforce intelligence.",
      isPartOf: {
        "@id": `${SITE_ORIGIN}/#website`,
      },
      publisher: {
        "@id": `${SITE_ORIGIN}/#organization`,
      },
      about: [
        { "@id": `${SITE_ORIGIN}/#brand` },
        { "@id": `${SITE_ORIGIN}/#workforce-intelligence` },
      ],
      mainEntity: {
        "@id": `${SITE_ORIGIN}/how-it-works#process`,
      },
      hasPart: [
        { "@id": `${SITE_ORIGIN}/how-it-works#foundations` },
        { "@id": `${SITE_ORIGIN}/how-it-works#faq` },
      ],
      breadcrumb: {
        "@id": `${SITE_ORIGIN}/how-it-works#breadcrumb`,
      },
      inLanguage: "en-IN",
    },
    {
      "@type": "HowTo",
      "@id": `${SITE_ORIGIN}/how-it-works#process`,
      name: "How RojMitra Builds Village-Level Workforce Intelligence",
      description:
        "RojMitra combines local workforce networks, consent-based worker information and technology to organise workforce intelligence and connect relevant workers with employment opportunities.",
      inLanguage: "en-IN",
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Identify Local Workforce",
          text: "Local sourcing partners help identify workers and workforce clusters within the communities they serve.",
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "Connect With Workers",
          text: "Workers are introduced to RojMitra and its registration process. Relevant information is collected through the applicable consent and notice process.",
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "Build Worker Profiles",
          text: "Worker records may include location, occupation, skills, previous roles, industries, employment locations, duration and stated availability.",
        },
        {
          "@type": "HowToStep",
          position: 4,
          name: "Organise Workforce Intelligence",
          text: "Workforce information is structured by geography, occupation, skills, experience and other relevant dimensions, from village and Gram Panchayat to block, district and state.",
        },
        {
          "@type": "HowToStep",
          position: 5,
          name: "Understand Employer Requirements",
          text: "Employer requirements are captured by role, hiring location, industry, workforce volume and relevant job criteria.",
        },
        {
          "@type": "HowToStep",
          position: 6,
          name: "Connect Relevant Workforce With Opportunities",
          text: "Potentially relevant workers may be approached about suitable opportunities. Their interest, eligibility and availability are confirmed during recruitment.",
        },
      ],
    },
    {
      "@type": "ItemList",
      "@id": `${SITE_ORIGIN}/how-it-works#foundations`,
      name: "Three Foundations of RojMitra",
      description:
        "The three foundational elements of the RojMitra workforce intelligence model.",
      numberOfItems: 3,
      itemListOrder: "https://schema.org/ItemListUnordered",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "People",
          description:
            "Local sourcing partners and communities who understand the workforce on the ground.",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Information",
          description:
            "Structured worker profiles, skills, employment experience and geographical workforce information.",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Technology",
          description:
            "Technology designed to organise workforce information and make it useful for employers and the wider employment ecosystem.",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_ORIGIN}/how-it-works#faq`,
      name: "How RojMitra Works: Frequently Asked Questions",
      isPartOf: {
        "@id": `${SITE_ORIGIN}/how-it-works#webpage`,
      },
      mainEntity: [
        {
          "@type": "Question",
          name: "How are workers identified?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "RojMitra works through local workforce networks and community-level partners who can introduce the initiative to workers and support the registration process.",
          },
        },
        {
          "@type": "Question",
          name: "What information may be included in a worker profile?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Depending on the use case, a worker record may include geography, occupation, skills, previous roles, industries, employment locations, duration and availability. Only information necessary for a defined purpose should be collected.",
          },
        },
        {
          "@type": "Question",
          name: "Is every piece of worker information independently verified?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No blanket verification claim is made. Verification depends on the information field, available evidence and verification method. Worker-provided information should be distinguished from evidence-checked information.",
          },
        },
        {
          "@type": "Question",
          name: "How is worker consent handled?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Workers should receive clear information about what data is collected, why it is collected, how it may be used and how to contact the responsible organisation before providing their information.",
          },
        },
        {
          "@type": "Question",
          name: "How are employer requirements matched?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Relevant workforce information can be compared with the location, role, industry and other criteria in an employer requirement. Matching does not itself establish worker interest, eligibility or final hiring.",
          },
        },
        {
          "@type": "Question",
          name: "What role does EarlyJobs play?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "RojMitra provides the workforce intelligence layer, while relevant recruitment execution can be supported through the EarlyJobs ecosystem.",
          },
        },
      ],
      inLanguage: "en-IN",
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${SITE_ORIGIN}/how-it-works#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `${SITE_ORIGIN}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "How It Works",
          item: `${SITE_ORIGIN}/how-it-works`,
        },
      ],
    },
  ],
};

/** For Employers page schema: WebPage + Service + industries + HowTo + FAQ + breadcrumbs. */
export const forEmployersPageJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${SITE_ORIGIN}/for-employers#webpage`,
      url: `${SITE_ORIGIN}/for-employers`,
      name: "Frontline Workforce Intelligence for Employers",
      description:
        "RojMitra helps employers examine potential local and returning workforce by location, occupation, skills, employment experience and stated availability.",
      isPartOf: {
        "@id": `${SITE_ORIGIN}/#website`,
      },
      about: {
        "@id": `${SITE_ORIGIN}/#brand`,
      },
      publisher: {
        "@id": `${SITE_ORIGIN}/#organization`,
      },
      mainEntity: {
        "@id": `${SITE_ORIGIN}/for-employers#service`,
      },
      breadcrumb: {
        "@id": `${SITE_ORIGIN}/for-employers#breadcrumb`,
      },
      hasPart: [
        { "@id": `${SITE_ORIGIN}/for-employers#industries` },
        { "@id": `${SITE_ORIGIN}/for-employers#employer-process` },
        { "@id": `${SITE_ORIGIN}/for-employers#faq` },
      ],
    },
    {
      "@type": "Service",
      "@id": `${SITE_ORIGIN}/for-employers#service`,
      name: "Frontline Workforce Intelligence for Employers",
      serviceType: "Village-level workforce intelligence and workforce discovery",
      description:
        "RojMitra helps employers understand potential local and returning workforce by hiring geography, occupation, skills, previous industries, employment experience and stated availability. Recruitment execution may be supported through the EarlyJobs ecosystem where suitable.",
      provider: {
        "@id": `${SITE_ORIGIN}/#organization`,
      },
      brand: {
        "@id": `${SITE_ORIGIN}/#brand`,
      },
      areaServed: {
        "@type": "Country",
        name: "India",
      },
      audience: {
        "@type": "BusinessAudience",
        audienceType: "Employers hiring frontline, operational and industrial workers",
      },
      category: [
        "Workforce Intelligence",
        "Frontline Workforce Planning",
        "Local Workforce Discovery",
        "Skills and Experience Intelligence",
      ],
    },
    {
      "@type": "ItemList",
      "@id": `${SITE_ORIGIN}/for-employers#industries`,
      name: "Industries Served by RojMitra",
      description: "Industries with frontline, operational and industrial workforce requirements.",
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      numberOfItems: 6,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Manufacturing" },
        { "@type": "ListItem", position: 2, name: "Warehouse and Logistics" },
        { "@type": "ListItem", position: 3, name: "Transport and Delivery" },
        { "@type": "ListItem", position: 4, name: "Construction" },
        { "@type": "ListItem", position: 5, name: "Textile and Garments" },
        { "@type": "ListItem", position: 6, name: "Retail and Facility Staff" },
      ],
    },
    {
      "@type": "HowTo",
      "@id": `${SITE_ORIGIN}/for-employers#employer-process`,
      name: "How Employers Can Submit Workforce Requirements to RojMitra",
      description:
        "The process through which employers share hiring requirements and RojMitra evaluates relevant workforce information and sourcing possibilities.",
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Submit your requirement",
          text: "Share your organisation details, hiring location, job roles and workforce requirements.",
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "Define location and roles",
          text: "Specify the number of workers, required skills, experience, hiring location and expected timeline.",
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "Examine relevant workforce information",
          text: "RojMitra evaluates relevant workforce information and local sourcing possibilities for the requirement.",
        },
        {
          "@type": "HowToStep",
          position: 4,
          name: "Confirm worker interest and availability",
          text: "Where suitable workers can be identified, their interest and availability are confirmed before proceeding.",
        },
        {
          "@type": "HowToStep",
          position: 5,
          name: "Run recruitment and complete hiring",
          text: "Candidate coordination, selection and joining are handled based on the agreed hiring requirement.",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_ORIGIN}/for-employers#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "What types of employers can use RojMitra?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "RojMitra is positioned for labour-intensive sectors including manufacturing, textiles and apparel, construction, warehousing, logistics, retail and other frontline-workforce environments. Actual support depends on geography, roles and available workforce information.",
          },
        },
        {
          "@type": "Question",
          name: "Can RojMitra guarantee worker availability?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Worker availability is time-sensitive and must be confirmed for each requirement. Workforce intelligence improves visibility but does not guarantee that every worker is currently available or eligible.",
          },
        },
        {
          "@type": "Question",
          name: "Does RojMitra replace an ATS or staffing provider?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. RojMitra focuses on workforce intelligence. It can inform sourcing and, where relevant, work alongside recruitment execution through EarlyJobs or an employer's existing processes.",
          },
        },
        {
          "@type": "Question",
          name: "What information can employers use for workforce planning?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Depending on available records and permissions, useful information may include geography, occupations, skills, prior industries, work locations, employment experience and stated availability.",
          },
        },
        {
          "@type": "Question",
          name: "How are workers verified?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Verification is field-specific. Employers should be informed which details are worker-provided, what evidence was reviewed and which checks, if any, were completed for a particular requirement.",
          },
        },
        {
          "@type": "Question",
          name: "How do I submit a workforce requirement?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Use the employer form to provide your organisation and contact details, industry, expected number of workers and hiring location. The team can then assess whether relevant workforce intelligence and recruitment support are available.",
          },
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${SITE_ORIGIN}/for-employers#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `${SITE_ORIGIN}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "For Employers",
          item: `${SITE_ORIGIN}/for-employers`,
        },
      ],
    },
  ],
};

/** Become a Sourcing Partner page schema: WebPage + HowTo + profiles + FAQ + breadcrumbs. */
export const becomeSourcingPartnerPageJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${SITE_ORIGIN}/become-a-sourcing-partner#webpage`,
      url: `${SITE_ORIGIN}/become-a-sourcing-partner`,
      name: "Become a Village Workforce Sourcing Partner",
      description:
        "Explore becoming a RojMitra sourcing partner and help connect with local workers, document workforce information and build village-level workforce intelligence.",
      isPartOf: {
        "@id": `${SITE_ORIGIN}/#website`,
      },
      about: {
        "@id": `${SITE_ORIGIN}/#brand`,
      },
      publisher: {
        "@id": `${SITE_ORIGIN}/#organization`,
      },
      mainEntity: {
        "@id": `${SITE_ORIGIN}/become-a-sourcing-partner#joining-process`,
      },
      breadcrumb: {
        "@id": `${SITE_ORIGIN}/become-a-sourcing-partner#breadcrumb`,
      },
      hasPart: [
        { "@id": `${SITE_ORIGIN}/become-a-sourcing-partner#partner-profiles` },
        { "@id": `${SITE_ORIGIN}/become-a-sourcing-partner#faq` },
      ],
    },
    {
      "@type": "HowTo",
      "@id": `${SITE_ORIGIN}/become-a-sourcing-partner#joining-process`,
      name: "How to Become a RojMitra Sourcing Partner",
      description:
        "The process for expressing interest in joining the RojMitra village workforce sourcing partner network.",
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Register Your Interest",
          text: "Submit your name, mobile number, village, Gram Panchayat, block, district, state and details about your community or industry connections.",
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "Requirement Review",
          text: "The RojMitra team reviews your interest based on your location and suitability for the network.",
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "Understand the Partner Model",
          text: "Review the role, responsibilities, operating expectations and onboarding process.",
        },
        {
          "@type": "HowToStep",
          position: 4,
          name: "Connect With the RojMitra Team",
          text: "The team guides suitable applicants through the next steps based on their location and network requirements.",
        },
      ],
    },
    {
      "@type": "ItemList",
      "@id": `${SITE_ORIGIN}/become-a-sourcing-partner#partner-profiles`,
      name: "Who Can Become a RojMitra Sourcing Partner",
      description:
        "Individuals and professionals who may be suitable for the RojMitra sourcing partner network.",
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      numberOfItems: 6,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Local entrepreneurs and business owners",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Individuals with village and community connections",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Freelance recruiters and independent sourcing professionals",
        },
        {
          "@type": "ListItem",
          position: 4,
          name: "People with staffing or workforce sourcing experience",
        },
        {
          "@type": "ListItem",
          position: 5,
          name: "Local service providers and community representatives",
        },
        {
          "@type": "ListItem",
          position: 6,
          name: "Individuals interested in employment and workforce development",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_ORIGIN}/become-a-sourcing-partner#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "What does a RojMitra sourcing partner do?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A RojMitra sourcing partner helps engage with local workers, introduce them to the initiative, support consent-based workforce registration and document relevant skills and employment experience. Partners may also help connect suitable workers with relevant hiring opportunities.",
          },
        },
        {
          "@type": "Question",
          name: "Is a sourcing partner an employee of RojMitra or EarlyJobs?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Becoming a sourcing partner does not automatically make someone an employee of RojMitra or EarlyJobs. The legal and commercial relationship, responsibilities and applicable terms will be explained through the relevant partner agreement.",
          },
        },
        {
          "@type": "Question",
          name: "Do sourcing partners verify workers?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Sourcing partners may support worker information collection and evidence gathering. Formal verification depends on the specific information, evidence available and the verification process applied.",
          },
        },
        {
          "@type": "Question",
          name: "Can anyone become a sourcing partner?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Individuals can express interest through the application form. Selection depends on location, community connections, suitability and RojMitra's operating requirements. Submitting an application does not guarantee acceptance.",
          },
        },
        {
          "@type": "Question",
          name: "How should partners handle worker data?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Worker information must be collected and handled only through authorised processes, for clearly explained purposes and with the applicable consent. Partners must not independently retain, reuse or distribute worker information outside authorised purposes.",
          },
        },
        {
          "@type": "Question",
          name: "Does joining guarantee recruitment business or earnings?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Joining the sourcing partner network does not guarantee recruitment assignments, business volume or earnings. Any commercial terms or compensation arrangements will be communicated separately where applicable.",
          },
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${SITE_ORIGIN}/become-a-sourcing-partner#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `${SITE_ORIGIN}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Become a Sourcing Partner",
          item: `${SITE_ORIGIN}/become-a-sourcing-partner`,
        },
      ],
    },
  ],
};

/** Government Initiatives page schema: CollectionPage + initiatives ItemList + FAQ + breadcrumbs. */
export const governmentInitiativesPageJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${SITE_ORIGIN}/government-initiatives#webpage`,
      url: `${SITE_ORIGIN}/government-initiatives`,
      name: "Public Initiatives Shaping Workforce Registration and Visibility in India",
      description:
        "An informational resource tracking selected central and state government initiatives related to unorganised worker registration, gig worker welfare, social security and labour-market visibility in India.",
      isPartOf: {
        "@id": `${SITE_ORIGIN}/#website`,
      },
      about: {
        "@id": `${SITE_ORIGIN}/#brand`,
      },
      publisher: {
        "@id": `${SITE_ORIGIN}/#organization`,
      },
      mainEntity: {
        "@id": `${SITE_ORIGIN}/government-initiatives#initiatives`,
      },
      breadcrumb: {
        "@id": `${SITE_ORIGIN}/government-initiatives#breadcrumb`,
      },
      hasPart: [
        { "@id": `${SITE_ORIGIN}/government-initiatives#initiatives` },
        { "@id": `${SITE_ORIGIN}/government-initiatives#faq` },
      ],
    },
    {
      "@type": "ItemList",
      "@id": `${SITE_ORIGIN}/government-initiatives#initiatives`,
      name: "Government Workforce and Labour Initiatives in India",
      description:
        "Selected central and state initiatives related to worker registration, social security and gig and platform worker welfare.",
      numberOfItems: 3,
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          item: {
            "@type": "GovernmentService",
            name: "e-Shram Portal",
            description:
              "The Government of India's national database initiative for unorganised workers, including migrant workers and gig and platform workers.",
            provider: {
              "@type": "GovernmentOrganization",
              name: "Ministry of Labour and Employment, Government of India",
            },
            url: "https://eshram.gov.in/",
          },
        },
        {
          "@type": "ListItem",
          position: 2,
          item: {
            "@type": "Thing",
            name: "Haryana Gig Worker Registration Drive",
            description:
              "A Haryana state initiative announced in May 2026 to register gig and platform workers through outreach, registration camps and awareness programmes.",
            organizer: {
              "@type": "GovernmentOrganization",
              name: "Government of Haryana",
            },
          },
        },
        {
          "@type": "ListItem",
          position: 3,
          item: {
            "@type": "CreativeWork",
            name: "Telangana Gig and Platform Worker Policy and Draft Legislation",
            description:
              "A proposed policy and draft legislative framework concerning registration, welfare and social security for gig and platform workers in Telangana.",
            publisher: {
              "@type": "GovernmentOrganization",
              name: "Government of Telangana",
            },
            url: "https://labour.telangana.gov.in/",
          },
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_ORIGIN}/government-initiatives#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "Is RojMitra a government programme?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. RojMitra is an independent initiative by EarlyJobs. Government programmes discussed on this page are presented for informational context and should not be interpreted as partnerships, integrations or endorsements unless expressly confirmed.",
          },
        },
        {
          "@type": "Question",
          name: "What is e-Shram?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "e-Shram is a Ministry of Labour and Employment system created as a national database of unorganised workers. Official reporting stated more than 30.95 crore registered workers as of 22 July 2025.",
          },
        },
        {
          "@type": "Question",
          name: "Does RojMitra replace e-Shram?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. e-Shram is a government system associated with worker registration and social-security access. RojMitra's stated purpose is village-level workforce intelligence and employment visibility.",
          },
        },
        {
          "@type": "Question",
          name: "Why track gig-worker policies?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Gig and platform-worker policies can affect registration, welfare and workforce-data structures. Tracking them helps employers and institutions understand how the wider workforce-information environment is evolving.",
          },
        },
        {
          "@type": "Question",
          name: "How does RojMitra verify policy information?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Every policy item should be linked to a primary government source and display the source date and date last checked. Drafts, announcements and enacted laws must be labelled differently.",
          },
        },
        {
          "@type": "Question",
          name: "Can government institutions collaborate with RojMitra?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "RojMitra can invite institutional discussions, but no public body should be described as a partner until there is verifiable authorisation or a formal relationship.",
          },
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${SITE_ORIGIN}/government-initiatives#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `${SITE_ORIGIN}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Government Initiatives",
          item: `${SITE_ORIGIN}/government-initiatives`,
        },
      ],
    },
  ],
};

/** Blog index schema: CollectionPage + Blog + breadcrumbs. */
export const blogPageJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${SITE_ORIGIN}/blog#webpage`,
      url: `${SITE_ORIGIN}/blog`,
      name: "India Workforce Research and Labour Insights",
      description:
        "Stories, research and insights on workforce intelligence, labour migration, hiring, gig work and public employment initiatives across India.",
      isPartOf: {
        "@id": `${SITE_ORIGIN}/#website`,
      },
      about: {
        "@id": `${SITE_ORIGIN}/#brand`,
      },
      publisher: {
        "@id": `${SITE_ORIGIN}/#organization`,
      },
      mainEntity: {
        "@id": `${SITE_ORIGIN}/blog#blog`,
      },
      breadcrumb: {
        "@id": `${SITE_ORIGIN}/blog#breadcrumb`,
      },
      inLanguage: "en-IN",
    },
    {
      "@type": "Blog",
      "@id": `${SITE_ORIGIN}/blog#blog`,
      name: "RojMitra Stories and Research",
      description:
        "Research, stories and perspectives on India's workforce, labour migration, employment, skills, gig economy and village-level workforce intelligence.",
      url: `${SITE_ORIGIN}/blog`,
      publisher: {
        "@id": `${SITE_ORIGIN}/#organization`,
      },
      about: [
        { "@id": `${SITE_ORIGIN}/#workforce-intelligence` },
        { "@type": "Thing", name: "Labour Migration in India" },
        { "@type": "Thing", name: "Gig and Platform Work" },
        { "@type": "Thing", name: "Employment and Workforce Trends" },
        { "@type": "Thing", name: "Unorganised Workforce" },
      ],
      inLanguage: "en-IN",
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${SITE_ORIGIN}/blog#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `${SITE_ORIGIN}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Blog",
          item: `${SITE_ORIGIN}/blog`,
        },
      ],
    },
  ],
};

export function webPageJsonLd(input: {
  path: string;
  name: string;
  description: string;
}) {
  const url = absoluteUrl(input.path);
  return {
    "@type": "WebPage",
    "@id": `${url.replace(/\/$/, "")}#webpage`,
    url,
    name: input.name,
    description: input.description,
    isPartOf: {
      "@id": `${SITE_ORIGIN}/#website`,
    },
    publisher: {
      "@id": `${SITE_ORIGIN}/#organization`,
    },
    about: {
      "@id": `${SITE_ORIGIN}/#brand`,
    },
    inLanguage: "en-IN",
  };
}
