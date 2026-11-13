export type ContentBlock = { kind: "paragraph" | "cta" | "card" | "list" | "form" | "empty"; text?: string; title?: string; items?: string[]; blocks?: ContentBlock[] };
export type ContentSection = { title: string; blocks?: ContentBlock[]; faq?: { question: string; answer: string }[] };
export type ContentPageData = { path: string; eyebrow: string; headline: string; title: string; description: string; intro: ContentBlock[]; sections: ContentSection[] };
export const pages = {
  "about": {
    "path": "/about",
    "eyebrow": "About RojMitra",
    "headline": "About RojMitra: Village-Level Workforce Intelligence by EarlyJobs",
    "title": "About RojMitra | Village Workforce Intelligence India",
    "description": "Learn how RojMitra by EarlyJobs is building consent-based, village-level workforce intelligence to make workers' skills, experience and availability visible.",
    "intro": [
      {
        "kind": "paragraph",
        "text": "RojMitra is an EarlyJobs initiative focused on making local workforce information more structured and useful. It starts at the village level and is designed to document workers' skills, employment experience, location and availability with consent."
      },
      {
        "kind": "paragraph",
        "text": "Learn [why RojMitra was built](/our-story) and [how RojMitra works](/how-it-works)."
      },
      {
        "kind": "paragraph",
        "text": "RojMitra focuses on workforce intelligence rather than job-listing discovery — a structured view of local workforce supply from the village upward."
      }
    ],
    "sections": [
      {
        "title": "Built from Recruitment Experience",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "EarlyJobs works in recruitment and hiring, giving the team direct exposure to a recurring information problem: employers may have workforce requirements while experienced workers remain difficult to identify outside familiar sourcing networks."
          },
          {
            "kind": "paragraph",
            "text": "RojMitra emerged from that problem and from on-the-ground observations in Bihar. The aim is not to create another general job-listing platform, but to build a more structured understanding of workforce supply beginning at the village level."
          }
        ]
      },
      {
        "title": "Why RojMitra Was Started",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "Labour-market information is often available at broad geographic levels, while hiring happens at specific factories, warehouses, stores, construction sites and communities. A worker with years of useful experience may live close to an employer yet remain invisible to conventional sourcing channels."
          },
          {
            "kind": "paragraph",
            "text": "RojMitra aims to reduce that information gap by organising worker-level information from the village upward."
          },
          {
            "kind": "paragraph",
            "text": "What makes RojMitra different from a recruitment platform?"
          },
          {
            "kind": "paragraph",
            "text": "RojMitra focuses on workforce intelligence: understanding where workers are located, what experience and skills they have, and when they may be available. Recruitment can be an outcome of that intelligence, but the underlying product is a structured view of workforce supply."
          }
        ]
      },
      {
        "title": "What We Are Building",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "RojMitra is designed to organise workforce information across six connected dimensions: worker identity and location, employment experience, skills, availability, migration and local partner support. Together, these dimensions help create a clearer picture of local workforce supply."
          },
          {
            "kind": "paragraph",
            "text": "Our approach focuses on:"
          },
          {
            "kind": "list",
            "items": [
              "Worker Intelligence: Understanding who workers are, where they live and what work they can perform.",
              "Experience Intelligence: Recording employment history, industries, roles and years of experience.",
              "Skills Intelligence: Making workers' existing skills and capabilities more visible.",
              "Availability Intelligence: Understanding when workers may be available for employment.",
              "Migration Intelligence: Understanding workforce movement between villages, cities and industries.",
              "Local Partner Network: Working with trusted community-level partners to help workers create and maintain their records."
            ]
          },
          {
            "kind": "paragraph",
            "text": "Worker information is collected with consent, with the aim of making that information useful to workers as well as employers."
          }
        ]
      },
      {
        "title": "Starting at the Village. Connecting Across India.",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "We believe the village should be the starting point for understanding India's workforce."
          },
          {
            "kind": "paragraph",
            "text": "RojMitra is designed to organise workforce information from the village level upward, connecting village, Gram Panchayat, block, district, state and national perspectives."
          },
          {
            "kind": "paragraph",
            "text": "This can help employers understand local workforce availability, identify relevant experience and make better-informed hiring plans."
          },
          {
            "kind": "paragraph",
            "text": "Through EarlyJobs' recruitment network, workforce intelligence can also connect with actual employment opportunities."
          }
        ]
      },
      {
        "title": "Our Vision",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "We envision an India where a worker's experience does not become invisible when they change jobs, move to another state or return to their village."
          },
          {
            "kind": "paragraph",
            "text": "Where employers can better understand the workforce around them."
          },
          {
            "kind": "paragraph",
            "text": "Where communities become active participants in connecting people with opportunities."
          },
          {
            "kind": "paragraph",
            "text": "And where every worker has a better chance of being recognised for what they know and what they can do."
          },
          {
            "kind": "paragraph",
            "text": "We are building RojMitra to make India's workforce visible, connected and better understood."
          },
          {
            "kind": "paragraph",
            "text": "One village at a time."
          }
        ]
      },
      {
        "title": "Frequently Asked Questions",
        "faq": [
          {
            "question": "What is RojMitra?",
            "answer": "RojMitra is a village-level workforce intelligence initiative by EarlyJobs. It is designed to organise information about worker location, skills, experience, availability and employment journeys so workforce supply can be understood more clearly."
          },
          {
            "question": "Why was RojMitra started?",
            "answer": "RojMitra was created in response to a recurring information gap: experienced workers can remain difficult for employers to discover when employment history and skills are scattered across employers, contractors, cities and personal networks."
          },
          {
            "question": "Is RojMitra a recruitment agency or job portal?",
            "answer": "RojMitra is positioned primarily as workforce intelligence infrastructure. EarlyJobs provides recruitment capabilities within the wider ecosystem, but RojMitra's focus is documenting and organising workforce information from the village level upward."
          },
          {
            "question": "How does RojMitra collect worker information?",
            "answer": "The platform is designed around consent-based registration supported by local partners. Worker information may include location, roles, industries, work history, skills and availability. Verification should be described according to the evidence available for each field."
          },
          {
            "question": "Who can work with RojMitra?",
            "answer": "Potential collaborators include employers, staffing organisations, government and skill-development bodies, CSR and livelihood programmes, grassroots organisations and local sourcing partners, subject to RojMitra's operating model and partnership review."
          },
          {
            "question": "What makes RojMitra village-first?",
            "answer": "RojMitra uses the village as its starting geographic unit and then organises information upward into Gram Panchayat, block, district, state and national views."
          }
        ]
      },
      {
        "title": "Be Part of a More Connected Workforce",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "Whether you are an employer looking to understand your workforce requirements or a local partner interested in connecting workers with opportunities, there is a place for you in this ecosystem."
          },
          {
            "kind": "cta",
            "text": "Join as a Sourcing Partner"
          },
          {
            "kind": "cta",
            "text": "For Employers"
          }
        ]
      }
    ]
  },
  "our-story": {
    "path": "/our-story",
    "eyebrow": "Our Story",
    "headline": "Why We Built RojMitra: A Worker's Experience Should Travel With Them",
    "title": "Why RojMitra Exists | Village Workforce Story India",
    "description": "Learn why EarlyJobs built RojMitra to preserve workers' employment experience, improve village-level workforce visibility and connect skills with opportunity.",
    "intro": [
      {
        "kind": "paragraph",
        "text": "A worker can spend years developing practical skills in a factory, warehouse, construction site or service role and still return home without a structured record of that experience. The next employer may know little about what that worker has already learned."
      },
      {
        "kind": "paragraph",
        "text": "RojMitra began with a simple question: how can a worker's employment journey remain visible when they change employers, move between states or return to their village?"
      },
      {
        "kind": "paragraph",
        "text": "See [India's workforce visibility gap](/the-problem) and [village-level workforce intelligence](/workforce-intelligence)."
      }
    ],
    "sections": [
      {
        "title": "The Realisation Behind RojMitra",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "Through recruitment work at EarlyJobs and direct experience of workforce challenges in Bihar, one pattern became difficult to ignore: employment experience exists, but the information needed to understand it is often fragmented."
          },
          {
            "kind": "paragraph",
            "text": "RojMitra is an attempt to organise that information more systematically, beginning with the communities where workers live."
          }
        ]
      },
      {
        "title": "Why the Village Matters",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "A village is more than a worker's permanent address. It is often where family, community relationships and periods between jobs are centred. Starting there can provide continuity across employment journeys that otherwise move between cities, employers and industries."
          }
        ]
      },
      {
        "title": "From Recruitment to Workforce Intelligence",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "Recruitment answers an immediate question: who can fill this requirement? Workforce intelligence adds a wider one: what workforce exists around a location, what experience does it have, and how does that supply change over time?"
          },
          {
            "kind": "paragraph",
            "text": "RojMitra is being built around that second question while connecting relevant opportunities back to recruitment execution through EarlyJobs."
          }
        ]
      },
      {
        "title": "Building It One Village at a Time",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "RojMitra operates through a village-first workforce mapping approach, supported by local Village Workforce Mitras."
          },
          {
            "kind": "paragraph",
            "text": "Through local sourcing partners, known as Village Workforce Mitras, we aim to help workers create consent-based records of their skills and employment experience."
          },
          {
            "kind": "paragraph",
            "text": "That information can then be organised across villages, Gram Panchayats, blocks, districts and states."
          },
          {
            "kind": "paragraph",
            "text": "The objective is not simply to collect information. It is to make workforce experience easier to understand and more useful for the people it represents."
          }
        ]
      },
      {
        "title": "What We Believe",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "A worker's experience should not disappear when they change employers."
          },
          {
            "kind": "paragraph",
            "text": "A skill should not become invisible because it was learned outside a formal institution."
          },
          {
            "kind": "paragraph",
            "text": "A village should not remain outside the conversation when employers discuss workforce availability."
          },
          {
            "kind": "paragraph",
            "text": "And the people who keep India's industries running should be easier to recognise, understand and connect with opportunities."
          }
        ]
      },
      {
        "title": "This Is Why We Are Building RojMitra.",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "We are starting with the villages, listening to the workforce and building an intelligence network that can connect local realities with India's wider employment ecosystem."
          },
          {
            "kind": "paragraph",
            "text": "It is a long journey, and we are building it one step at a time."
          },
          {
            "kind": "paragraph",
            "text": "Because India's workforce deserves to be seen, understood and recognised."
          },
          {
            "kind": "paragraph",
            "text": "One village at a time."
          }
        ]
      },
      {
        "title": "Be Part of the Journey",
        "blocks": [
          {
            "kind": "card",
            "title": "For Employers",
            "blocks": [
              {
                "kind": "paragraph",
                "text": "Understand the workforce around your operations and share your hiring requirements with RojMitra."
              },
              {
                "kind": "cta",
                "text": "Submit Your Requirements"
              }
            ]
          },
          {
            "kind": "card",
            "title": "For Sourcing Partners",
            "blocks": [
              {
                "kind": "paragraph",
                "text": "Become a local part of the RojMitra network and help make workers and their experience more visible."
              },
              {
                "kind": "cta",
                "text": "Join as a Sourcing Partner"
              }
            ]
          }
        ]
      }
    ]
  },
  "the-problem": {
    "path": "/the-problem",
    "eyebrow": "The Problem",
    "headline": "India's Workforce Is Everywhere. The Intelligence About It Is Not.",
    "title": "India's Rural Workforce Visibility Problem | RojMitra",
    "description": "See why rural workers' skills and experience remain hard to discover, and how village-level workforce intelligence can improve hiring and planning in India.",
    "intro": [
      {
        "kind": "paragraph",
        "text": "India has millions of workers who have spent years building skills across industries. They work in factories, textile units, construction sites, warehouses, logistics operations and countless other workplaces."
      },
      {
        "kind": "paragraph",
        "text": "Many travel hundreds or thousands of kilometres to find employment. They learn new trades, gain experience, change industries and eventually return to their hometowns and villages."
      },
      {
        "kind": "paragraph",
        "text": "But when they move, an important part of their professional journey often gets left behind."
      },
      {
        "kind": "paragraph",
        "text": "Their experience is rarely organised in a way that the next employer can easily discover."
      },
      {
        "kind": "paragraph",
        "text": "The problem is not that India lacks skilled workers. The problem is that much of this workforce remains invisible."
      },
      {
        "kind": "cta",
        "text": "Submit Your Hiring Requirements"
      },
      {
        "kind": "cta",
        "text": "Join as a Sourcing Partner"
      }
    ],
    "sections": [
      {
        "title": "Three Sides of the Same Workforce Information Gap",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "Workers need their experience to remain visible. Employers need a clearer view of relevant workforce supply. Institutions need sufficiently granular information to understand local employment patterns. The common problem is not simply the absence of people or jobs; it is fragmented information connecting the two."
          },
          {
            "kind": "card",
            "title": "1. Workers: Experience That Nobody Can See",
            "blocks": [
              {
                "kind": "paragraph",
                "text": "Workers may gain valuable experience across locations and industries without maintaining a structured employment record that can be used when they return home or change employers."
              }
            ]
          },
          {
            "kind": "card",
            "title": "2. Employers: Hiring Without Local Workforce Visibility",
            "blocks": [
              {
                "kind": "paragraph",
                "text": "Employers can know how many people they need without knowing which nearby or returning workers have relevant experience, skills and current availability."
              },
              {
                "kind": "cta",
                "text": "Submit Hiring Requirements"
              }
            ]
          },
          {
            "kind": "card",
            "title": "3. Institutions and Planners: Limited Ground-Level Information",
            "blocks": [
              {
                "kind": "paragraph",
                "text": "Aggregate datasets are valuable for planning, but they may not answer operational questions about the skills, experience and availability of workers in a particular community or hiring catchment."
              }
            ]
          }
        ]
      },
      {
        "title": "The Missing Link Is Granular Workforce Intelligence",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "Workforce intelligence connects geography with worker-level information such as occupation, skills, experience, work history and availability. Its purpose is to make local workforce supply easier to understand without replacing official labour-market statistics or formal recruitment processes."
          },
          {
            "kind": "paragraph",
            "text": "Why is village-level workforce information useful?"
          },
          {
            "kind": "paragraph",
            "text": "Village-level information can reveal workforce characteristics hidden by larger geographic averages. For employers, it can improve understanding of local sourcing potential. For institutions, it can add granular evidence to wider employment, skilling or livelihood planning."
          },
          {
            "kind": "paragraph",
            "text": "Explore [workforce intelligence](/workforce-intelligence) and [frontline workforce requirements](/for-employers)."
          }
        ]
      },
      {
        "title": "Why the Village Level Matters",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "The village is where many workers come from, where their families remain and where they often return between employment opportunities."
          },
          {
            "kind": "paragraph",
            "text": "Starting at the village level allows workforce information to be understood closer to its source."
          },
          {
            "kind": "paragraph",
            "text": "From there, information can be organised across Gram Panchayats, blocks, districts, states and the country."
          },
          {
            "kind": "paragraph",
            "text": "This creates an opportunity to understand not just how many workers exist, but what they know, what they have done and where their experience can be useful."
          }
        ]
      },
      {
        "title": "This Is the Gap RojMitra Is Addressing",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "RojMitra by EarlyJobs is being built as village-level workforce intelligence infrastructure."
          },
          {
            "kind": "paragraph",
            "text": "Our aim is to make workers' skills, experience, availability and employment journeys more visible through consent-based workforce records and local partner networks."
          },
          {
            "kind": "paragraph",
            "text": "We want to help employers move beyond repeated searches for unknown talent and build a better understanding of the workforce around them."
          },
          {
            "kind": "paragraph",
            "text": "We also want workers' experience to remain visible even when their employment journey takes them across cities, states and industries."
          },
          {
            "kind": "paragraph",
            "text": "The talent is already there. It is time to make it visible."
          }
        ]
      },
      {
        "title": "Be Part of the Change",
        "blocks": [
          {
            "kind": "card",
            "title": "For Employers",
            "blocks": [
              {
                "kind": "paragraph",
                "text": "Looking to hire workers for your factory, warehouse, construction project or business operations?"
              },
              {
                "kind": "paragraph",
                "text": "Share your workforce requirements with RojMitra. Tell us the roles, locations and number of workers you need."
              },
              {
                "kind": "cta",
                "text": "Submit Your Hiring Requirements"
              }
            ]
          },
          {
            "kind": "card",
            "title": "For Sourcing Partners",
            "blocks": [
              {
                "kind": "paragraph",
                "text": "Are you connected with workers and communities in your district or village?"
              },
              {
                "kind": "paragraph",
                "text": "Become a RojMitra Sourcing Partner and help build a stronger connection between India's workforce and employment opportunities."
              },
              {
                "kind": "cta",
                "text": "Join as a Sourcing Partner"
              }
            ]
          }
        ]
      },
      {
        "title": "Frequently Asked Questions",
        "faq": [
          {
            "question": "What is the workforce visibility problem in India?",
            "answer": "The problem is that worker experience, skills, location and availability can be fragmented across employers, contractors, personal networks and geographies. This can make suitable workers difficult for employers or institutions to identify even when labour exists locally."
          },
          {
            "question": "Why are district-level figures not always enough?",
            "answer": "District-level data is useful for planning but may conceal substantial differences between communities, occupations and local labour pools. Village-level workforce information can provide a more granular operational view."
          },
          {
            "question": "How does migration affect workforce visibility?",
            "answer": "Workers can accumulate experience in several locations and industries before returning home or moving again. Without a portable employment record, each move can make that experience harder for the next employer to understand."
          },
          {
            "question": "Is RojMitra intended to replace government workforce databases?",
            "answer": "No. RojMitra should be positioned as complementary workforce intelligence. Official systems serve statutory, welfare and policy purposes that are distinct from RojMitra's workforce-mapping and employment-use cases."
          },
          {
            "question": "How can employers use village-level information?",
            "answer": "Employers can use it to examine potential workforce supply around a hiring location and understand relevant occupations, previous industries, experience and stated availability before deciding how to source."
          },
          {
            "question": "How can institutions use workforce intelligence?",
            "answer": "Potential institutional uses include workforce research, employment planning, livelihood programmes and skill-development analysis. Any specific institutional use should depend on data quality, consent, programme design and agreed governance arrangements."
          }
        ]
      },
      {
        "title": "India's Workforce Deserves to Be Seen.",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "Help us connect local workforce intelligence with real employment requirements."
          },
          {
            "kind": "cta",
            "text": "Submit Your Hiring Requirements"
          },
          {
            "kind": "cta",
            "text": "Join as a Sourcing Partner"
          }
        ]
      }
    ]
  },
  "workforce-intelligence": {
    "path": "/workforce-intelligence",
    "eyebrow": "Workforce Intelligence",
    "headline": "Village-Level Workforce Intelligence for India",
    "title": "Workforce Intelligence India | Village-Level RojMitra",
    "description": "Understand how RojMitra organises workforce data by village, skill, experience, availability and migration to support employers and institutions in India.",
    "intro": [
      {
        "kind": "paragraph",
        "text": "What is workforce intelligence?"
      },
      {
        "kind": "paragraph",
        "text": "Workforce intelligence is structured information used to understand labour supply, including where workers are located, what occupations and skills they have, where they have worked, and when they may be available. RojMitra applies this approach from the village level upward."
      },
      {
        "kind": "paragraph",
        "text": "See [how workforce mapping works](/how-it-works), [workforce intelligence for employers](/for-employers), and [public workforce initiatives](/government-initiatives)."
      },
      {
        "kind": "cta",
        "text": "Submit Your Hiring Requirements"
      },
      {
        "kind": "cta",
        "text": "Join as a Sourcing Partner"
      }
    ],
    "sections": [
      {
        "title": "What Is Workforce Intelligence?",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "Workforce intelligence is structured information used to understand labour supply, including where workers are located, what occupations and skills they have, where they have worked, and when they may be available. RojMitra applies this approach from the village level upward."
          },
          {
            "kind": "list",
            "items": [
              "What kind of work have people done?",
              "Which industries do they understand?",
              "What practical skills have they developed?",
              "Where have they travelled for employment?",
              "Which locations do they belong to?",
              "Are they interested and available for new opportunities?"
            ]
          }
        ]
      },
      {
        "title": "What RojMitra Organises",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "RojMitra is designed to organise workforce information across geography, occupation, skills, employment experience, availability and migration. Each dimension answers a different workforce-planning question; together they create a more useful picture of potential labour supply."
          },
          {
            "kind": "card",
            "title": "1. Workforce Demographics",
            "blocks": [
              {
                "kind": "paragraph",
                "text": "Understand the workforce across villages, Gram Panchayats, blocks and districts through relevant, consent-based worker information."
              }
            ]
          },
          {
            "kind": "card",
            "title": "2. Skills and Occupations",
            "blocks": [
              {
                "kind": "paragraph",
                "text": "Understand the different occupations, practical skills and work capabilities present within local communities."
              }
            ]
          },
          {
            "kind": "card",
            "title": "3. Employment Experience",
            "blocks": [
              {
                "kind": "paragraph",
                "text": "Document workers' previous industries, job roles and employment experience so their professional journeys are easier to understand."
              }
            ]
          },
          {
            "kind": "card",
            "title": "4. Migration Patterns",
            "blocks": [
              {
                "kind": "paragraph",
                "text": "Understand how workers move between villages, towns, cities and states in search of employment, and how these journeys shape local workforce availability."
              }
            ]
          },
          {
            "kind": "card",
            "title": "5. Workforce Availability",
            "blocks": [
              {
                "kind": "paragraph",
                "text": "Build a better understanding of workers who are interested in employment, their preferred locations and their availability, based on information they choose to share."
              }
            ]
          },
          {
            "kind": "card",
            "title": "6. Industry-Level Workforce Insights",
            "blocks": [
              {
                "kind": "paragraph",
                "text": "Organise workforce information around industries such as manufacturing, textiles, construction, logistics, warehousing, retail and other employment sectors."
              }
            ]
          }
        ]
      },
      {
        "title": "From Village-Level Records to Wider Workforce Views",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "Worker information begins at the village level and can be aggregated into Gram Panchayat, block, district, state and national views. The value of this structure is that broader patterns remain connected to the local records from which they are derived."
          },
          {
            "kind": "paragraph",
            "text": "Village → Gram Panchayat → Block → District → State → India"
          }
        ]
      },
      {
        "title": "How Workforce Intelligence Creates Value",
        "blocks": [
          {
            "kind": "card",
            "title": "For Employers",
            "blocks": [
              {
                "kind": "paragraph",
                "text": "Understand local and returning labour pools before launching a sourcing exercise."
              },
              {
                "kind": "cta",
                "text": "Submit Your Hiring Requirements"
              }
            ]
          },
          {
            "kind": "card",
            "title": "For Workers",
            "blocks": [
              {
                "kind": "paragraph",
                "text": "Make employment experience and skills more visible across job and location changes."
              }
            ]
          },
          {
            "kind": "card",
            "title": "For Government and Institutions",
            "blocks": [
              {
                "kind": "paragraph",
                "text": "Examine workforce patterns at a level that may complement aggregate official data."
              }
            ]
          }
        ]
      },
      {
        "title": "Technology Organises the Data; Local Context Helps Explain It",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "Structured technology can standardise records, occupations and geographic views. Local partners can help workers understand registration, provide relevant information and keep records connected to the communities where workers live."
          },
          {
            "kind": "list",
            "items": [
              "Local workforce identification.",
              "Consent-based information collection.",
              "Structured worker profiles.",
              "Organisation of skills and employment information.",
              "Geographical workforce mapping.",
              "Connecting relevant workforce information with employer requirements."
            ]
          }
        ]
      },
      {
        "title": "Built for a More Visible Workforce",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "RojMitra is an initiative by EarlyJobs, drawing on its experience in recruitment and hiring."
          },
          {
            "kind": "paragraph",
            "text": "We believe the next step in understanding employment is not just to know where the jobs are, but also to understand where the people, skills and experience already exist."
          },
          {
            "kind": "paragraph",
            "text": "Because better hiring begins with better workforce intelligence."
          }
        ]
      },
      {
        "title": "Frequently Asked Questions",
        "faq": [
          {
            "question": "What is workforce intelligence?",
            "answer": "Workforce intelligence is structured information about workforce supply, such as worker location, occupation, skills, employment experience, availability and movement. It helps organisations understand labour pools and make better-informed workforce decisions."
          },
          {
            "question": "What is village-level workforce intelligence?",
            "answer": "It applies the same concept at the village level, using the village as the starting geographic unit before organising information into Gram Panchayat, block, district, state and wider views."
          },
          {
            "question": "How is workforce intelligence different from a job portal?",
            "answer": "A job portal primarily connects vacancies with applications. Workforce intelligence focuses on understanding the characteristics and distribution of labour supply. Recruitment may use that intelligence, but the data has planning value beyond a single job posting."
          },
          {
            "question": "What workforce information does RojMitra aim to organise?",
            "answer": "RojMitra is designed around worker location, employment history, occupations, skills, availability and migration. Any published field should have a clear source, update date and verification status where relevant."
          },
          {
            "question": "Can employers use workforce intelligence for bulk or frontline hiring?",
            "answer": "It can support bulk and frontline hiring by helping an employer understand potential labour pools around a requirement. Actual candidate interest, eligibility and availability still need to be confirmed during recruitment."
          },
          {
            "question": "Can workforce intelligence support government or CSR programmes?",
            "answer": "It may support programme planning, research or livelihood interventions where the data, purpose, consent and governance model are appropriate. It should complement, rather than be represented as replacing, official administrative systems."
          }
        ]
      },
      {
        "title": "Let's Build a Better Understanding of India's Workforce.",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "Whether you are an employer looking for workers or a local partner who understands the workforce in your community, you can be part of the RojMitra ecosystem."
          },
          {
            "kind": "card",
            "title": "For Employers",
            "blocks": [
              {
                "kind": "paragraph",
                "text": "Have a workforce requirement? Tell us what you need."
              },
              {
                "kind": "cta",
                "text": "Submit Your Hiring Requirements"
              }
            ]
          },
          {
            "kind": "card",
            "title": "For Sourcing Partners",
            "blocks": [
              {
                "kind": "paragraph",
                "text": "Help bring local workforce information into the RojMitra network."
              },
              {
                "kind": "cta",
                "text": "Join as a Sourcing Partner"
              }
            ]
          }
        ]
      }
    ]
  },
  "how-it-works": {
    "path": "/how-it-works",
    "eyebrow": "How It Works",
    "headline": "How RojMitra Builds Village-Level Workforce Intelligence",
    "title": "How RojMitra Works | Village Workforce Mapping India",
    "description": "See how RojMitra identifies workers, builds consent-based profiles, organises village workforce intelligence and connects relevant people with opportunities.",
    "intro": [
      {
        "kind": "paragraph",
        "text": "RojMitra combines local workforce engagement, structured information and technology. The process begins by understanding workers within communities, then organising relevant skills, experience, location and availability so the information can support workforce planning and appropriate employment opportunities."
      },
      {
        "kind": "paragraph",
        "text": "How does RojMitra build workforce intelligence?"
      },
      {
        "kind": "paragraph",
        "text": "RojMitra combines village-level worker engagement with structured records of location, skills, employment history and availability. The information is organised into geographic and occupational views that can support employer requirements and institutional workforce analysis."
      },
      {
        "kind": "paragraph",
        "text": "Employers can [submit a workforce requirement](/for-employers) or [become a sourcing partner](/become-a-sourcing-partner)."
      }
    ],
    "sections": [
      {
        "title": "How the RojMitra Network Works",
        "blocks": [
          {
            "kind": "card",
            "title": "Step 1: Identify Local Workforce",
            "blocks": [
              {
                "kind": "paragraph",
                "text": "Local partners help identify workers and workforce clusters within the communities they serve."
              }
            ]
          },
          {
            "kind": "card",
            "title": "Step 2: Connect With Workers",
            "blocks": [
              {
                "kind": "paragraph",
                "text": "Workers are introduced to the purpose of the registration process and can provide relevant information through the applicable consent and notice process."
              }
            ]
          },
          {
            "kind": "card",
            "title": "Step 3: Build Worker Profiles",
            "blocks": [
              {
                "kind": "paragraph",
                "text": "Records can include location, occupation, skills, past roles, industries, employment locations, duration and stated availability."
              }
            ]
          },
          {
            "kind": "card",
            "title": "Step 4: Organise Workforce Intelligence",
            "blocks": [
              {
                "kind": "paragraph",
                "text": "Information is structured by geography, occupation, skills, experience and other relevant workforce dimensions."
              },
              {
                "kind": "paragraph",
                "text": "Village → Gram Panchayat → Block → District → State"
              }
            ]
          },
          {
            "kind": "card",
            "title": "Step 5: Understand Employer Requirements",
            "blocks": [
              {
                "kind": "paragraph",
                "text": "Employer requirements are captured by role, hiring location, industry, workforce volume and relevant job criteria."
              }
            ]
          },
          {
            "kind": "card",
            "title": "Step 6: Connect Relevant Workforce With Opportunities",
            "blocks": [
              {
                "kind": "paragraph",
                "text": "Potentially relevant workers may be approached about appropriate opportunities. Interest, eligibility and availability must still be confirmed during recruitment."
              }
            ]
          }
        ]
      },
      {
        "title": "Two Ways to Become Part of RojMitra",
        "blocks": [
          {
            "kind": "card",
            "title": "For Employers",
            "blocks": [
              {
                "kind": "paragraph",
                "text": "If your business needs workers, RojMitra provides an entry point to explore a village-level workforce intelligence and sourcing network."
              },
              {
                "kind": "paragraph",
                "text": "Share your requirements, explain your hiring needs and connect with our team to understand the next steps."
              },
              {
                "kind": "paragraph",
                "text": "What you need to share:"
              },
              {
                "kind": "list",
                "items": [
                  "Company or organisation details.",
                  "Hiring location.",
                  "Worker categories and job roles.",
                  "Number of workers required.",
                  "Skills or experience needed.",
                  "Expected hiring timeline."
                ]
              },
              {
                "kind": "cta",
                "text": "Submit Your Hiring Requirements"
              }
            ]
          },
          {
            "kind": "card",
            "title": "For Sourcing Partners",
            "blocks": [
              {
                "kind": "paragraph",
                "text": "If you understand your local community and have connections with workers, you can explore becoming a RojMitra Sourcing Partner."
              },
              {
                "kind": "paragraph",
                "text": "Sourcing partners help connect with workers, support consent-based information collection and contribute to building local workforce intelligence."
              },
              {
                "kind": "paragraph",
                "text": "What you can do:"
              },
              {
                "kind": "list",
                "items": [
                  "Identify workers in your village or district.",
                  "Connect with local communities.",
                  "Help workers understand RojMitra.",
                  "Support workforce information collection with consent.",
                  "Help connect relevant workers with employment opportunities."
                ]
              },
              {
                "kind": "cta",
                "text": "Join as a Sourcing Partner"
              }
            ]
          }
        ]
      },
      {
        "title": "Local Relationships Support Better Workforce Records",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "RojMitra brings together three important elements."
          },
          {
            "kind": "card",
            "title": "People",
            "blocks": [
              {
                "kind": "paragraph",
                "text": "Local sourcing partners and communities who understand the workforce on the ground."
              }
            ]
          },
          {
            "kind": "card",
            "title": "Information",
            "blocks": [
              {
                "kind": "paragraph",
                "text": "Structured worker profiles, skills, employment experience and geographical workforce information."
              }
            ]
          },
          {
            "kind": "card",
            "title": "Technology",
            "blocks": [
              {
                "kind": "paragraph",
                "text": "A system designed to organise workforce information and make it more useful for employers and the wider employment ecosystem."
              }
            ]
          },
          {
            "kind": "paragraph",
            "text": "Together, these elements form the foundation of RojMitra's workforce intelligence model."
          }
        ]
      },
      {
        "title": "Frequently Asked Questions",
        "faq": [
          {
            "question": "How are workers identified?",
            "answer": "RojMitra is designed to work through local workforce networks and community-level partners who can introduce the initiative to workers and support the registration process."
          },
          {
            "question": "What information may be included in a worker profile?",
            "answer": "Depending on the use case, a record may include geography, occupation, skills, previous roles, industries, employment locations, duration and availability. Only information necessary for a defined purpose should be collected."
          },
          {
            "question": "Is every piece of worker information independently verified?",
            "answer": "No blanket claim should be made. Verification depends on the field, available evidence and method. A strong implementation should distinguish worker-provided information from evidence-checked information."
          },
          {
            "question": "How is worker consent handled?",
            "answer": "The platform describes its model as consent-based. Operationally, workers should receive clear information about what data is being collected, why, how it may be used and how to contact the responsible organisation."
          },
          {
            "question": "How are employer requirements matched?",
            "answer": "Relevant workforce information can be compared with the location, role, industry and other criteria in an employer requirement. Matching does not itself establish worker interest, eligibility or final hiring."
          },
          {
            "question": "What role does EarlyJobs play?",
            "answer": "RojMitra provides the workforce-intelligence layer, while relevant recruitment execution can be supported through the EarlyJobs ecosystem."
          }
        ]
      },
      {
        "title": "Start With Your Workforce Requirement.",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "Whether you are an employer looking for workers or a local individual interested in becoming part of the RojMitra network, getting started is simple."
          },
          {
            "kind": "card",
            "title": "For Employers",
            "blocks": [
              {
                "kind": "paragraph",
                "text": "Tell us about your hiring requirements."
              },
              {
                "kind": "cta",
                "text": "Submit Your Hiring Requirements"
              }
            ]
          },
          {
            "kind": "card",
            "title": "For Sourcing Partners",
            "blocks": [
              {
                "kind": "paragraph",
                "text": "Become part of a network connecting local workers with opportunities."
              },
              {
                "kind": "cta",
                "text": "Join as a Sourcing Partner"
              }
            ]
          }
        ]
      }
    ]
  },
  "for-employers": {
    "path": "/for-employers",
    "eyebrow": "For Employers",
    "headline": "Understand the Frontline Workforce Around Your Hiring Locations",
    "title": "Frontline Workforce Intelligence for Employers | RojMitra",
    "description": "Use village-level workforce intelligence to understand local and returning talent for manufacturing, garments, logistics, retail and frontline hiring.",
    "intro": [
      {
        "kind": "paragraph",
        "text": "RojMitra helps employers examine potential local and returning workforce by location, occupation, skills, employment experience and availability. Where requirements are suitable, the EarlyJobs ecosystem can support the recruitment process from workforce discovery to hiring execution."
      },
      {
        "kind": "paragraph",
        "text": "Workforce Visibility for Labour-Intensive Employers"
      },
      {
        "kind": "paragraph",
        "text": "Factories, warehouses, logistics operations, retail networks, construction projects and other frontline employers frequently need people in specific locations and at specific times. RojMitra is designed to improve visibility into the workforce that may already exist in and around those hiring catchments."
      },
      {
        "kind": "paragraph",
        "text": "Explore [village-level workforce intelligence](/workforce-intelligence) and the [RojMitra workforce process](/how-it-works)."
      },
      {
        "kind": "paragraph",
        "text": "Looking for workers across manufacturing, garments, logistics, retail or construction? Tell us what your business needs."
      },
      {
        "kind": "cta",
        "text": "Submit Your Hiring Requirements"
      }
    ],
    "sections": [
      {
        "title": "The Employer Challenge",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "Hiring teams often know the number and type of workers required but have limited visibility into who has relevant experience nearby, who has returned from another employment location, or who may currently be available."
          },
          {
            "kind": "paragraph",
            "text": "Conventional sourcing channels remain useful. RojMitra adds a workforce-intelligence layer that can help employers understand labour supply before and during sourcing. Employers often face challenges such as:"
          },
          {
            "kind": "list",
            "items": [
              "Finding workers with relevant industry experience.",
              "Reaching workers in locations beyond established sourcing networks.",
              "Understanding the workforce available around a project or facility.",
              "Managing recurring and high-volume workforce requirements.",
              "Identifying workers who have migrated for employment and returned to their home districts.",
              "Depending heavily on contractors and informal referrals for sourcing."
            ]
          },
          {
            "kind": "paragraph",
            "text": "The challenge is not always a shortage of workers. Sometimes, it is a lack of visibility into where the workforce exists and what capabilities it brings."
          }
        ]
      },
      {
        "title": "A More Structured View of Workforce Supply",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "RojMitra can organise potential workforce by hiring geography, occupation, skills, prior industries, employment experience and stated availability. This can help an employer determine where relevant talent may exist and where additional sourcing is required."
          },
          {
            "kind": "paragraph",
            "text": "We aim to build structured workforce information starting at the village level and organise it across Gram Panchayats, blocks, districts and states."
          },
          {
            "kind": "paragraph",
            "text": "This can help employers explore:"
          },
          {
            "kind": "card",
            "title": "Location-Based Workforce Intelligence",
            "blocks": [
              {
                "kind": "paragraph",
                "text": "Understand workforce information across relevant villages, districts and hiring locations."
              }
            ]
          },
          {
            "kind": "card",
            "title": "Skills and Experience Visibility",
            "blocks": [
              {
                "kind": "paragraph",
                "text": "Explore information about workers' occupations, previous industries, job roles and employment experience."
              }
            ]
          },
          {
            "kind": "card",
            "title": "Local Sourcing Connections",
            "blocks": [
              {
                "kind": "paragraph",
                "text": "Access a network of local sourcing partners who understand their communities and can help connect with workers."
              }
            ]
          },
          {
            "kind": "card",
            "title": "Migration and Workforce Understanding",
            "blocks": [
              {
                "kind": "paragraph",
                "text": "Build a better understanding of workers' employment journeys across cities and states."
              }
            ]
          },
          {
            "kind": "card",
            "title": "Requirement-Based Sourcing",
            "blocks": [
              {
                "kind": "paragraph",
                "text": "Share your actual workforce requirements so that the relevant sourcing approach can be evaluated."
              }
            ]
          }
        ]
      },
      {
        "title": "Who Can Work With RojMitra?",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "Our employer proposition is relevant to organisations that hire frontline, operational and industrial workers, including:"
          },
          {
            "kind": "list",
            "items": [
              "Manufacturing companies and industrial units.",
              "Warehouses and distribution centres.",
              "Logistics and supply chain businesses.",
              "Construction and infrastructure companies.",
              "Textile and garment manufacturers.",
              "Retail and facility management businesses.",
              "Staffing companies and workforce service providers.",
              "Businesses with recurring or large-scale workforce requirements."
            ]
          },
          {
            "kind": "paragraph",
            "text": "Whether you need a small team or are planning a larger workforce expansion, share your requirement with us."
          }
        ]
      },
      {
        "title": "How the Employer Process Works",
        "blocks": [
          {
            "kind": "card",
            "title": "1. Submit requirement",
            "blocks": [
              {
                "kind": "paragraph",
                "text": "Tell us about your organisation, hiring location, job roles and workforce requirements."
              }
            ]
          },
          {
            "kind": "card",
            "title": "2. Define location and roles",
            "blocks": [
              {
                "kind": "paragraph",
                "text": "Our team reviews your requirement to understand the number of workers, skills, experience, location and expected timeline."
              }
            ]
          },
          {
            "kind": "card",
            "title": "3. Examine relevant workforce information",
            "blocks": [
              {
                "kind": "paragraph",
                "text": "We evaluate relevant workforce information and local sourcing possibilities for your requirement."
              }
            ]
          },
          {
            "kind": "card",
            "title": "4. Confirm worker interest and availability",
            "blocks": [
              {
                "kind": "paragraph",
                "text": "Where suitable workers can be identified, the relevant sourcing and recruitment process can be initiated."
              }
            ]
          },
          {
            "kind": "card",
            "title": "5. Run recruitment and complete hiring",
            "blocks": [
              {
                "kind": "paragraph",
                "text": "Candidate coordination, selection and joining are discussed based on the agreed hiring requirement."
              }
            ]
          }
        ]
      },
      {
        "title": "Submit Your Workforce Requirement",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "Looking for workers for your next project, facility or business operation?"
          },
          {
            "kind": "paragraph",
            "text": "Share your details below. Our team can understand your requirement and discuss the next steps."
          },
          {
            "kind": "form"
          }
        ]
      },
      {
        "title": "Why RojMitra?",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "RojMitra is an initiative by EarlyJobs, bringing recruitment experience into a broader approach to workforce intelligence."
          },
          {
            "kind": "paragraph",
            "text": "We believe employers should be able to understand more than just the number of people available for work. They should have better visibility into the skills, experience and geographical distribution of the workforce."
          },
          {
            "kind": "paragraph",
            "text": "Our approach starts at the village level, combines local connections with technology and aims to make workforce information more accessible and useful."
          },
          {
            "kind": "paragraph",
            "text": "Better workforce understanding. More informed hiring decisions. Stronger local connections."
          }
        ]
      },
      {
        "title": "Frequently Asked Questions",
        "faq": [
          {
            "question": "What types of employers can use RojMitra?",
            "answer": "The current site positions RojMitra for labour-intensive sectors including manufacturing, textiles and apparel, construction, warehousing, logistics, retail and other frontline-workforce environments. Actual support depends on geography, roles and available workforce information."
          },
          {
            "question": "Can RojMitra guarantee worker availability?",
            "answer": "No. Availability is time-sensitive and should be confirmed with a worker for each requirement. Workforce intelligence can improve visibility, but it should not be represented as a guarantee that every listed person is currently available or eligible."
          },
          {
            "question": "Does RojMitra replace an ATS or staffing provider?",
            "answer": "No. RojMitra's differentiated role is workforce intelligence. It can inform sourcing and, where relevant, work alongside recruitment execution through EarlyJobs or an employer's existing processes."
          },
          {
            "question": "What information can employers use for workforce planning?",
            "answer": "Depending on available records and permissions, useful dimensions may include geography, occupations, skills, prior industries, work locations, experience and stated availability."
          },
          {
            "question": "How are workers verified?",
            "answer": "Verification should be field-specific. Employers should be told what information was worker-provided, what evidence was reviewed and which checks—if any—were completed for a particular requirement."
          },
          {
            "question": "How do I submit a workforce requirement?",
            "answer": "Use the existing employer form to provide your organisation and contact details, industry, expected worker requirement and hiring location. The team can then assess whether relevant workforce intelligence and recruitment support are available."
          }
        ]
      },
      {
        "title": "Tell Us What Your Workforce Needs.",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "Whether you are setting up a new facility, expanding operations or managing recurring workforce requirements, start by sharing what you need."
          },
          {
            "kind": "cta",
            "text": "Submit Your Hiring Requirements"
          },
          {
            "kind": "paragraph",
            "text": "Looking to become part of the local sourcing network instead?"
          },
          {
            "kind": "cta",
            "text": "Join as a Sourcing Partner"
          }
        ]
      }
    ]
  },
  "become-a-sourcing-partner": {
    "path": "/become-a-sourcing-partner",
    "eyebrow": "Become a RojMitra Sourcing Partner",
    "headline": "Become a RojMitra Village Workforce Sourcing Partner",
    "title": "Become a Village Workforce Sourcing Partner | RojMitra",
    "description": "Join RojMitra as a local sourcing partner to document worker experience, build consent-based workforce records and connect communities with opportunities.",
    "intro": [
      {
        "kind": "paragraph",
        "text": "A trusted local face for village workforce records."
      },
      {
        "kind": "paragraph",
        "text": "Local partners can help workers understand RojMitra, document relevant employment experience and stay connected with suitable opportunities."
      },
      {
        "kind": "paragraph",
        "text": "Workforce information is most useful when it reflects local context and stays current. Community-level partners can help introduce the registration process, explain its purpose, support accurate worker records and provide a reliable local connection between workers and the wider RojMitra network."
      },
      {
        "kind": "paragraph",
        "text": "Learn [how the RojMitra network works](/how-it-works) and [about RojMitra](/about)."
      },
      {
        "kind": "paragraph",
        "text": "The role depends on trust, accurate information and responsible handling of worker data."
      },
      {
        "kind": "cta",
        "text": "Join as a Sourcing Partner"
      }
    ],
    "sections": [
      {
        "title": "Why Local Sourcing Partners Matter",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "Workforce information is most useful when it reflects local context and stays current. Community-level partners can help introduce the registration process, explain its purpose, support accurate worker records and provide a reliable local connection between workers and the wider RojMitra network."
          }
        ]
      },
      {
        "title": "What Does a RojMitra Sourcing Partner Do?",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "As a sourcing partner, you can contribute to building workforce intelligence and connecting workers with relevant opportunities."
          },
          {
            "kind": "card",
            "title": "1. Connect With Local Workers",
            "blocks": [
              {
                "kind": "paragraph",
                "text": "Build relationships with workers in your village, town or district across different industries and occupations."
              }
            ]
          },
          {
            "kind": "card",
            "title": "2. Understand Their Work Experience",
            "blocks": [
              {
                "kind": "paragraph",
                "text": "Help workers share information about their previous employment, skills, occupations and work preferences."
              }
            ]
          },
          {
            "kind": "card",
            "title": "3. Support Workforce Registration",
            "blocks": [
              {
                "kind": "paragraph",
                "text": "Introduce workers to RojMitra and assist with the consent-based collection of relevant workforce information."
              }
            ]
          },
          {
            "kind": "card",
            "title": "4. Build Local Workforce Connections",
            "blocks": [
              {
                "kind": "paragraph",
                "text": "Develop a better understanding of the workers and occupational groups present in your local area."
              }
            ]
          },
          {
            "kind": "card",
            "title": "5. Support Relevant Hiring Requirements",
            "blocks": [
              {
                "kind": "paragraph",
                "text": "Where relevant opportunities arise, help connect suitable workers with the sourcing and recruitment process."
              }
            ]
          }
        ]
      },
      {
        "title": "Who Can Become a Sourcing Partner?",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "You do not need to come from a traditional recruitment background to explore this opportunity."
          },
          {
            "kind": "paragraph",
            "text": "We welcome interest from:"
          },
          {
            "kind": "list",
            "items": [
              "Local entrepreneurs and business owners.",
              "Individuals with strong village and community connections.",
              "Freelance recruiters and independent sourcing professionals.",
              "People with experience in staffing or workforce sourcing.",
              "Local service providers and community representatives.",
              "Individuals interested in employment and workforce development."
            ]
          },
          {
            "kind": "paragraph",
            "text": "What matters is your ability to connect with people, understand local workforce realities and work responsibly with communities."
          }
        ]
      },
      {
        "title": "Where Can You Operate?",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "RojMitra follows a local-first approach."
          },
          {
            "kind": "paragraph",
            "text": "Sourcing partners can express interest in building connections across:"
          },
          {
            "kind": "list",
            "items": [
              "Villages.",
              "Gram Panchayats.",
              "Blocks and tehsils.",
              "Districts.",
              "Towns and surrounding regions."
            ]
          },
          {
            "kind": "paragraph",
            "text": "The actual operating area, partner availability and onboarding process will be discussed during evaluation."
          }
        ]
      },
      {
        "title": "How to Join RojMitra",
        "blocks": [
          {
            "kind": "card",
            "title": "Step 1: Register Your Interest",
            "blocks": [
              {
                "kind": "paragraph",
                "text": "Share your name, mobile number, location and community connections through the sourcing partner application."
              }
            ]
          },
          {
            "kind": "card",
            "title": "Step 2: Requirement Review",
            "blocks": [
              {
                "kind": "paragraph",
                "text": "Our team will review your interest based on your location and suitability for the network."
              }
            ]
          },
          {
            "kind": "card",
            "title": "Step 3: Understand the Partner Model",
            "blocks": [
              {
                "kind": "paragraph",
                "text": "Review the information about the role, responsibilities, operating expectations and onboarding process."
              }
            ]
          },
          {
            "kind": "card",
            "title": "Step 4: Connect With Our Team",
            "blocks": [
              {
                "kind": "paragraph",
                "text": "Our team can guide you through the next steps based on your location and suitability for the network."
              }
            ]
          }
        ]
      },
      {
        "title": "What Makes a Good Sourcing Partner?",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "A strong sourcing partner understands that workforce sourcing is about people, not just numbers."
          },
          {
            "kind": "paragraph",
            "text": "We value individuals who demonstrate:"
          },
          {
            "kind": "list",
            "items": [
              "Strong local community connections.",
              "Clear communication skills.",
              "Understanding of local employment patterns.",
              "Willingness to work with workers respectfully.",
              "Responsible handling of personal information.",
              "Consistency and commitment.",
              "Interest in building long-term local relationships."
            ]
          }
        ]
      },
      {
        "title": "Be Part of a Larger Workforce Network",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "RojMitra is an initiative by EarlyJobs, bringing recruitment experience into a village-level workforce intelligence model."
          },
          {
            "kind": "paragraph",
            "text": "As a sourcing partner, you can contribute to a network that aims to connect local workforce knowledge with broader employment opportunities."
          },
          {
            "kind": "paragraph",
            "text": "The objective is to create a more connected understanding of workers, their experience and their employment journeys."
          }
        ]
      },
      {
        "title": "Frequently Asked Questions",
        "faq": [
          {
            "question": "What does a RojMitra sourcing partner do?",
            "answer": "A sourcing partner supports local worker engagement, registration and workforce information. The role may include introducing the initiative, helping workers document experience and supporting appropriate hiring requirements."
          },
          {
            "question": "Is a sourcing partner an employee of RojMitra or EarlyJobs?",
            "answer": "The commercial and legal relationship must be stated according to the actual partner agreement. The website should not imply employment, agency or guaranteed earnings unless that is formally the relationship."
          },
          {
            "question": "Do sourcing partners verify workers?",
            "answer": "Partners may support information collection or evidence gathering, but the website should distinguish this from a formal verification result. Verification status should depend on the defined process and available evidence."
          },
          {
            "question": "Can anyone become a sourcing partner?",
            "answer": "Applicants can express interest through the existing form. Acceptance should depend on RojMitra's review criteria, geography, operating requirements and any necessary onboarding."
          },
          {
            "question": "How should partners handle worker data?",
            "answer": "Worker information should be handled only through authorised processes for clearly explained purposes. Partners should not independently retain, reuse or distribute data outside those purposes."
          },
          {
            "question": "Does joining guarantee recruitment business or earnings?",
            "answer": "No guarantee should be made unless the commercial model expressly provides one. The page should describe actual compensation or opportunity terms only after they have been formally defined."
          }
        ]
      },
      {
        "title": "Your Local Network Can Make a Difference.",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "India's workforce is built on the strength of its people and communities."
          },
          {
            "kind": "paragraph",
            "text": "If you understand your local area and want to contribute to a more connected workforce ecosystem, we invite you to explore becoming a RojMitra Sourcing Partner."
          },
          {
            "kind": "cta",
            "text": "Join as a Sourcing Partner"
          },
          {
            "kind": "paragraph",
            "text": "Know an employer looking for workers?"
          },
          {
            "kind": "cta",
            "text": "Submit Your Hiring Requirements"
          }
        ]
      },
      {
        "title": "Join as a Sourcing Partner",
        "blocks": [
          {
            "kind": "form"
          }
        ]
      }
    ]
  },
  "government-initiatives": {
    "path": "/government-initiatives",
    "eyebrow": "Government Initiatives",
    "headline": "Public Initiatives Shaping Workforce Registration and Visibility in India",
    "title": "Government Workforce & Labour Initiatives India | RojMitra",
    "description": "Track verified public workforce initiatives in India and understand how village-level workforce intelligence can complement employment and skill programmes.",
    "intro": [
      {
        "kind": "paragraph",
        "text": "Central and state governments are developing systems and policies for unorganised, migrant, gig and platform workers. This page tracks selected official initiatives relevant to workforce registration, social security and labour-market visibility. RojMitra is an independent EarlyJobs initiative and is not presented as a government programme or integration."
      },
      {
        "kind": "paragraph",
        "text": "Learn about [RojMitra workforce intelligence](/workforce-intelligence) and [about RojMitra](/about)."
      },
      {
        "kind": "cta",
        "text": "Explore Workforce Intelligence"
      },
      {
        "kind": "cta",
        "text": "Submit Your Hiring Requirements"
      }
    ],
    "sections": [
      {
        "title": "Government Initiatives We Are Tracking",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "This section covers selected national and state-level initiatives related to workforce registration, worker welfare, employment access, skill development and labour intelligence."
          },
          {
            "kind": "card",
            "title": "1. e-Shram Portal",
            "blocks": [
              {
                "kind": "paragraph",
                "text": "Government: Ministry of Labour and Employment, Government of India"
              },
              {
                "kind": "paragraph",
                "text": "Focus: Registration of unorganised workers"
              },
              {
                "kind": "paragraph",
                "text": "The e-Shram portal was launched in 2021 to create a national database of unorganised workers, including migrant workers and gig and platform workers, seeded with Aadhaar. Official reporting stated more than 30.95 crore registrations as of 22 July 2025."
              },
              {
                "kind": "paragraph",
                "text": "Registered workers receive a Universal Account Number (UAN). The platform is intended to help bring workers into a more organised system of identification and support."
              },
              {
                "kind": "paragraph",
                "text": "Why it matters: A national worker database can help improve the visibility of workers who are often outside formal employment records."
              },
              {
                "kind": "paragraph",
                "text": "Source: Ministry of Labour and Employment · Source date: 22 July 2025 · Last checked: 13 November 2026"
              },
              {
                "kind": "paragraph",
                "text": "Official platform: https://eshram.gov.in"
              }
            ]
          },
          {
            "kind": "card",
            "title": "2. Haryana Gig Worker Registration Drive",
            "blocks": [
              {
                "kind": "paragraph",
                "text": "Government: Government of Haryana"
              },
              {
                "kind": "paragraph",
                "text": "Focus: Statewide registration and social security for gig workers"
              },
              {
                "kind": "paragraph",
                "text": "On 27 May 2026, Haryana Chief Minister Nayab Singh Saini directed a statewide special campaign to register gig and platform workers so they can access upcoming central and state social-security schemes under Haryana Vision 2047."
              },
              {
                "kind": "paragraph",
                "text": "The Labour Department reported 21,777 gig workers already registered, with further enrolment underway through platform outreach, special camps and awareness programmes across the state."
              },
              {
                "kind": "paragraph",
                "text": "Why it matters: State-level registration drives show how governments are trying to make platform and unorganised workers visible enough to receive welfare and workforce support."
              },
              {
                "kind": "paragraph",
                "text": "Source: Haryana Chief Minister's Office press release · Source date: 27 May 2026 · Last checked: 13 November 2026"
              },
              {
                "kind": "paragraph",
                "text": "Press release: http://haryanacmoffice.gov.in/press-release/cmo-haryana-press-release-27-may-2026-0"
              }
            ]
          },
          {
            "kind": "card",
            "title": "3. Telangana Gig and Platform Worker Policy & Draft Legislation",
            "blocks": [
              {
                "kind": "paragraph",
                "text": "Government: Government of Telangana"
              },
              {
                "kind": "paragraph",
                "text": "Focus: Draft registration, social security and welfare framework for platform-based gig workers"
              },
              {
                "kind": "paragraph",
                "text": "Telangana published a draft gig and platform worker bill in 2025 and subsequently continued work on a proposed welfare framework. The initiative has included proposals concerning worker registration, welfare structures, insurance and digital records. RojMitra should update this section only when an official state source confirms a subsequent enactment or material policy change."
              },
              {
                "kind": "paragraph",
                "text": "Why it matters: The initiative reflects a growing focus on recognising gig workers and creating structured systems for their registration and welfare."
              },
              {
                "kind": "paragraph",
                "text": "Source: Telangana Labour Department / Draft Bill materials · Status: draft / proposed · Last checked: 13 November 2026"
              },
              {
                "kind": "paragraph",
                "text": "Official platform: https://labour.telangana.gov.in/"
              }
            ]
          }
        ]
      },
      {
        "title": "Why These Initiatives Matter",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "India's workforce is spread across villages, towns, industrial clusters and cities. Workers move between occupations, employers and locations. Their skills and work experience are not always captured in one accessible system."
          },
          {
            "kind": "paragraph",
            "text": "Government initiatives are addressing different parts of this challenge:"
          },
          {
            "kind": "list",
            "items": [
              "Worker registration: Creating records that help identify workers.",
              "Social security: Building systems for welfare and worker protection.",
              "Migration information: Understanding where workers come from and where they work.",
              "Employment access: Making job opportunities easier to find.",
              "Workforce planning: Improving the information available to institutions and decision-makers."
            ]
          },
          {
            "kind": "paragraph",
            "text": "These efforts are important steps towards a better-understood workforce ecosystem."
          }
        ]
      },
      {
        "title": "How RojMitra Relates to Public Workforce Initiatives",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "Government systems such as e-Shram serve statutory, social-security and public-policy functions. RojMitra has a different purpose: organising consent-based workforce information for employment and workforce-intelligence use cases. The two should be described as complementary only where that distinction is explicit."
          },
          {
            "kind": "paragraph",
            "text": "RojMitra is an independent initiative by EarlyJobs. We are not presenting the government programmes listed on this page as our partners, integrations or endorsements."
          }
        ]
      },
      {
        "title": "Follow Developments in India's Workforce Ecosystem",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "Government policies and programmes continue to evolve. We will keep updating this page as new initiatives are announced, official guidelines are released and registration platforms become available."
          },
          {
            "kind": "paragraph",
            "text": "If you know of a government initiative related to worker registration, labour welfare, migration, employment or workforce mapping, you can share it with us for editorial review."
          },
          {
            "kind": "cta",
            "text": "Suggest a Government Initiative"
          }
        ]
      },
      {
        "title": "Frequently Asked Questions",
        "faq": [
          {
            "question": "Is RojMitra a government programme?",
            "answer": "No. RojMitra is an independent EarlyJobs initiative. The government programmes discussed on this page are presented for informational context and should not be interpreted as partnerships, integrations or endorsements unless expressly confirmed."
          },
          {
            "question": "What is e-Shram?",
            "answer": "e-Shram is a Ministry of Labour and Employment system created as a national database of unorganised workers. Official reporting stated more than 30.95 crore registered workers as of 22 July 2025."
          },
          {
            "question": "Does RojMitra replace e-Shram?",
            "answer": "No. e-Shram is a government system associated with registration and social-security access. RojMitra's stated purpose is village-level workforce intelligence and employment visibility."
          },
          {
            "question": "Why track gig-worker policies?",
            "answer": "Gig and platform-worker policies can affect registration, welfare and workforce-data structures. Tracking them helps employers and institutions understand how the wider workforce-information environment is evolving."
          },
          {
            "question": "How does RojMitra verify policy information?",
            "answer": "Every policy item should be linked to a primary government source and display the source date and date last checked. Drafts, announcements and enacted laws must be labelled differently."
          },
          {
            "question": "Can government institutions collaborate with RojMitra?",
            "answer": "RojMitra can invite institutional discussions, but no public body should be described as a partner until there is verifiable authorisation or a formal relationship."
          }
        ]
      },
      {
        "title": "Build a More Visible Workforce Ecosystem",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "India's workforce deserves to be understood beyond basic numbers. Better information about workers, their skills and their locations can help create stronger connections between people, employers and institutions."
          },
          {
            "kind": "paragraph",
            "text": "RojMitra is working towards that goal, one village at a time."
          },
          {
            "kind": "cta",
            "text": "Explore Workforce Intelligence"
          },
          {
            "kind": "cta",
            "text": "Join as a Sourcing Partner"
          }
        ]
      }
    ]
  },
  "blog": {
    "path": "/blog",
    "eyebrow": "Blog — RojMitra",
    "headline": "Research Themes Shaping India's Workforce",
    "title": "India Workforce Research & Labour Insights | RojMitra",
    "description": "Explore RojMitra research on workforce intelligence, migration, gig work, hiring and public initiatives shaping India's changing labour market and skills.",
    "intro": [
      {
        "kind": "paragraph",
        "text": "RojMitra studies questions around workforce intelligence, migration, frontline hiring, gig work and public employment initiatives. This page sets out the themes the team is examining; published research should be listed here only when supporting methodology and sources are available."
      },
      {
        "kind": "paragraph",
        "text": "Read about [government workforce initiatives](/government-initiatives) and [workforce intelligence](/workforce-intelligence)."
      }
    ],
    "sections": [
      {
        "title": "Explore by Topic",
        "blocks": [
          {
            "kind": "card",
            "title": "Workforce Intelligence",
            "blocks": [
              {
                "kind": "paragraph",
                "text": "Research on India's workforce distribution, occupations, skills, employment patterns and local workforce availability."
              }
            ]
          },
          {
            "kind": "card",
            "title": "Migration & Mobility",
            "blocks": [
              {
                "kind": "paragraph",
                "text": "Insights into internal migration, seasonal movement, interstate workers and the relationship between migration and employment."
              }
            ]
          },
          {
            "kind": "card",
            "title": "Gig Economy",
            "blocks": [
              {
                "kind": "paragraph",
                "text": "Developments in platform-based work, delivery employment, gig-worker registration, worker welfare and the changing nature of work."
              }
            ]
          },
          {
            "kind": "card",
            "title": "Industry & Hiring",
            "blocks": [
              {
                "kind": "paragraph",
                "text": "Workforce trends across manufacturing, logistics, warehousing, construction, textiles and other employment-intensive industries."
              }
            ]
          },
          {
            "kind": "card",
            "title": "Government Initiatives",
            "blocks": [
              {
                "kind": "paragraph",
                "text": "Updates and explainers covering government policies, worker registration platforms, labour welfare programmes and employment initiatives."
              }
            ]
          },
          {
            "kind": "card",
            "title": "State & District Reports",
            "blocks": [
              {
                "kind": "paragraph",
                "text": "Regional perspectives on workforce distribution, industrial activity, employment opportunities and labour market developments."
              }
            ]
          }
        ]
      },
      {
        "title": "Latest Research & Insights",
        "blocks": [
          {
            "kind": "empty",
            "text": "RojMitra has not yet published a full research series on this page. Future publications will identify their source data, methodology, geographic scope, period covered and relevant limitations so findings can be independently understood and cited."
          }
        ]
      },
      {
        "title": "Research Should Be Traceable to Evidence",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "Useful workforce research needs more than headline numbers. Each RojMitra analysis should distinguish primary data from public datasets, explain how records were collected, state the sample and geography, identify the measurement period and note limitations."
          },
          {
            "kind": "paragraph",
            "text": "Our research approach focuses on understanding:"
          },
          {
            "kind": "list",
            "items": [
              "Where workers live and where they travel for work.",
              "Which occupations and skills are present across regions.",
              "How industries influence local employment.",
              "How migration changes workforce availability.",
              "What employers need when hiring at scale.",
              "How policies and technology are changing worker registration and employment access."
            ]
          },
          {
            "kind": "paragraph",
            "text": "Our long-term goal is to build a deeper understanding of India's workforce, starting at the village level."
          }
        ]
      },
      {
        "title": "Who Is This Research For?",
        "blocks": [
          {
            "kind": "card",
            "title": "Employers and Businesses",
            "blocks": [
              {
                "kind": "paragraph",
                "text": "Understand workforce trends, hiring environments and the labour markets surrounding your business locations."
              }
            ]
          },
          {
            "kind": "card",
            "title": "Recruitment and Staffing Professionals",
            "blocks": [
              {
                "kind": "paragraph",
                "text": "Follow industry developments, changing skill requirements and regional workforce patterns."
              }
            ]
          },
          {
            "kind": "card",
            "title": "Policymakers and Institutions",
            "blocks": [
              {
                "kind": "paragraph",
                "text": "Explore research and information relevant to labour markets, migration, employment and workforce planning."
              }
            ]
          },
          {
            "kind": "card",
            "title": "Researchers and Students",
            "blocks": [
              {
                "kind": "paragraph",
                "text": "Discover useful perspectives on India's employment ecosystem and the changing nature of work."
              }
            ]
          }
        ]
      },
      {
        "title": "Contribute to the Conversation",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "Have research, a workforce report, a government initiative or an important development that deserves attention?"
          },
          {
            "kind": "paragraph",
            "text": "We welcome relevant information and perspectives from people working across India's employment ecosystem."
          },
          {
            "kind": "cta",
            "text": "Share an Insight With RojMitra"
          }
        ]
      },
      {
        "title": "Frequently Asked Questions",
        "faq": [
          {
            "question": "What topics will RojMitra research cover?",
            "answer": "The existing page identifies workforce intelligence, migration and mobility, the gig economy, industry hiring, government initiatives and state or district workforce themes."
          },
          {
            "question": "Has RojMitra published original research yet?",
            "answer": "The current page states that its first articles are still coming. Until publications are live, it should not imply an existing research archive."
          },
          {
            "question": "What should a RojMitra research report disclose?",
            "answer": "It should disclose data sources, collection period, geography, sample or record counts, methodology, definitions and limitations, as well as clearly separating observed data from interpretation."
          },
          {
            "question": "Can employers use this research for hiring decisions?",
            "answer": "Research can provide context, but operational hiring decisions should rely on current requirement-specific information and direct worker confirmation rather than broad research findings alone."
          },
          {
            "question": "Can policymakers or researchers cite RojMitra?",
            "answer": "They should be able to do so when a publication provides a stable title, date, methodology, source attribution and clearly defined findings."
          }
        ]
      },
      {
        "title": "Stay Connected With India's Workforce Story",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "From village-level occupations to national employment trends, there is much more to understand about the people who power India's economy."
          },
          {
            "kind": "paragraph",
            "text": "Explore the research. Follow the developments. Understand the workforce."
          },
          {
            "kind": "cta",
            "text": "Explore Workforce Intelligence"
          },
          {
            "kind": "cta",
            "text": "Submit Your Hiring Requirements"
          }
        ]
      }
    ]
  }
} satisfies Record<string, ContentPageData>;
