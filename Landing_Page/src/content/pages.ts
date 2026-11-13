export type ContentBlock = { kind: "paragraph" | "cta" | "card" | "list" | "form" | "empty"; text?: string; title?: string; items?: string[]; blocks?: ContentBlock[] };
export type ContentSection = { title: string; blocks?: ContentBlock[]; faq?: { question: string; answer: string }[] };
export type ContentPageData = { path: string; eyebrow: string; headline: string; title: string; description: string; intro: ContentBlock[]; sections: ContentSection[] };
export const pages = {
  "about": {
    "path": "/about",
    "eyebrow": "About RojMitra",
    "headline": "Making India's Workforce Visible, One Village at a Time.",
    "title": "About RojMitra | Village-Level Workforce Intelligence",
    "description": "RojMitra is a village-level workforce intelligence initiative by EarlyJobs, making the skills, experience and availability of India's workers visible.",
    "intro": [
      {
        "kind": "paragraph",
        "text": "India has no shortage of skilled workers. What it lacks is a connected way to understand where they are, what they can do, where they have worked and when they are available."
      },
      {
        "kind": "paragraph",
        "text": "A worker may spend years working in a textile factory, construction site, manufacturing unit or warehouse. They gain experience, learn new skills and move between cities in search of better opportunities. Yet much of that experience remains undocumented and difficult for the next employer to discover."
      },
      {
        "kind": "paragraph",
        "text": "RojMitra is being built to change that."
      }
    ],
    "sections": [
      {
        "title": "Built on Real Recruitment Experience",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "RojMitra is an initiative by EarlyJobs, a company with experience in recruitment and hiring across industries."
          },
          {
            "kind": "paragraph",
            "text": "Through its work in recruitment, EarlyJobs has developed an understanding of the challenges employers face when finding the right people, and the difficulties workers experience when trying to access employment opportunities."
          },
          {
            "kind": "paragraph",
            "text": "The idea behind RojMitra also comes from recognising these challenges firsthand in Bihar, where the gap between the skills people possess and the information available about them became difficult to ignore."
          },
          {
            "kind": "paragraph",
            "text": "We realised that solving this problem requires more than another job platform. It requires a better understanding of India's workforce, beginning where people live and work."
          }
        ]
      },
      {
        "title": "Why We Started RojMitra",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "Most workforce information is viewed at a broad geographical level. But employment realities are local."
          },
          {
            "kind": "paragraph",
            "text": "A district may have thousands of people with manufacturing experience. A village may have workers who have spent years in textile units across different states. A returning migrant may possess valuable skills that employers nearby know nothing about."
          },
          {
            "kind": "paragraph",
            "text": "This information is often scattered across personal networks, contractors, previous employers and communities."
          },
          {
            "kind": "paragraph",
            "text": "RojMitra aims to bring these disconnected pieces together through village-level workforce intelligence."
          }
        ]
      },
      {
        "title": "What We Are Building",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "RojMitra is a village-level workforce intelligence infrastructure designed to map, document and connect workers across India."
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
            "answer": "RojMitra is a village-level workforce intelligence initiative by EarlyJobs. It aims to map, document and connect workers' skills, experience, availability and employment journeys across India."
          },
          {
            "question": "Why was RojMitra started?",
            "answer": "RojMitra was conceived from EarlyJobs' recruitment experience and the recognition that valuable worker skills and employment histories often remain difficult for employers to discover, particularly at the village level."
          },
          {
            "question": "Is RojMitra a recruitment agency or job portal?",
            "answer": "RojMitra is being built as workforce intelligence infrastructure. It focuses on mapping and understanding the workforce, while EarlyJobs' recruitment network can help connect relevant workers with employment opportunities."
          },
          {
            "question": "How does RojMitra collect worker information?",
            "answer": "RojMitra follows a consent-based approach to collecting worker information, supported by local community partners."
          },
          {
            "question": "Who can work with RojMitra?",
            "answer": "Employers, sourcing partners, community organisations, institutions and other relevant ecosystem participants can explore opportunities to collaborate with RojMitra."
          },
          {
            "question": "What makes RojMitra different?",
            "answer": "Its approach starts at the village level and focuses on connecting workers' skills, employment history, availability and migration journeys into a more structured workforce intelligence system."
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
    "headline": "A Worker Should Never Have to Start From Zero.",
    "title": "Our Story: Why We Built RojMitra | EarlyJobs",
    "description": "Why EarlyJobs started RojMitra: a village-first approach so a worker's experience never becomes invisible when they move or return home.",
    "intro": [
      {
        "kind": "paragraph",
        "text": "India's workers travel far to build their lives."
      },
      {
        "kind": "paragraph",
        "text": "A person leaves a village in Bihar, finds work in a textile unit in Tamil Nadu, spends years learning the trade, gains experience and eventually returns home."
      },
      {
        "kind": "paragraph",
        "text": "The journey changes the person. Their skills grow. Their experience grows. Their understanding of work grows."
      },
      {
        "kind": "paragraph",
        "text": "But often, their professional identity does not travel with them."
      },
      {
        "kind": "paragraph",
        "text": "When they return to their village, the next employer may know nothing about the years they have spent working. The skills they have developed remain difficult to discover. And when another opportunity comes along, they may have to explain their experience all over again."
      },
      {
        "kind": "paragraph",
        "text": "This is the gap that made us think differently about India's workforce."
      }
    ],
    "sections": [
      {
        "title": "The Realisation Behind RojMitra",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "Our journey in recruitment through EarlyJobs gave us an understanding of how employers search for talent and how difficult it can be to find the right people."
          },
          {
            "kind": "paragraph",
            "text": "But there was another side to this problem."
          },
          {
            "kind": "paragraph",
            "text": "Through our founder's firsthand experience in Bihar, we recognised something important: the people with valuable skills are not always where employers expect to find them. Many are in villages, small towns and communities that remain outside conventional hiring networks."
          },
          {
            "kind": "paragraph",
            "text": "They may have worked in factories, construction sites, warehouses, textile units and other industries. Yet there is often no connected record of what they have learned, where they have worked or what they can do next."
          },
          {
            "kind": "paragraph",
            "text": "We began asking a different question."
          },
          {
            "kind": "paragraph",
            "text": "What if we started understanding India's workforce from the villages themselves?"
          }
        ]
      },
      {
        "title": "Why the Village Matters",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "A village is more than a place of residence."
          },
          {
            "kind": "paragraph",
            "text": "It is where workers begin their journeys, where families remain connected and where many return between employment opportunities."
          },
          {
            "kind": "paragraph",
            "text": "It can also be the starting point for understanding local skills, work experience and workforce availability."
          },
          {
            "kind": "paragraph",
            "text": "We believe that workforce intelligence should not begin only when an employer raises a requirement. It should begin by understanding the people and communities that already exist."
          },
          {
            "kind": "paragraph",
            "text": "That belief became the foundation of RojMitra."
          }
        ]
      },
      {
        "title": "From Recruitment Experience to Workforce Intelligence",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "EarlyJobs understands recruitment from the employer and hiring perspective."
          },
          {
            "kind": "paragraph",
            "text": "RojMitra takes that understanding further upstream."
          },
          {
            "kind": "paragraph",
            "text": "Instead of looking only at open positions and available candidates, we want to understand the workforce itself:"
          },
          {
            "kind": "list",
            "items": [
              "Who are the workers?",
              "Where do they live?",
              "What industries have they worked in?",
              "What skills and experience have they developed?",
              "Where have they migrated for employment?",
              "When might they be available for new opportunities?"
            ]
          },
          {
            "kind": "paragraph",
            "text": "These questions form the foundation of a more connected view of India's workforce."
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
    "title": "The Problem: India's Invisible Workforce | RojMitra",
    "description": "India has skilled workers everywhere but little connected information about them. See how this affects workers, employers and institutions.",
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
        "title": "Three Sides of the Same Problem",
        "blocks": [
          {
            "kind": "card",
            "title": "1. Workers: Experience That Nobody Can See",
            "blocks": [
              {
                "kind": "paragraph",
                "text": "Consider a worker who has spent eight years working in a textile manufacturing unit in Tiruppur."
              },
              {
                "kind": "paragraph",
                "text": "They understand production processes, operate machinery and have developed practical skills through years of work."
              },
              {
                "kind": "paragraph",
                "text": "When they return to their village in Bihar, how does an employer nearby discover that experience?"
              },
              {
                "kind": "paragraph",
                "text": "Often, there is no easily accessible record of their previous work, skills or employment history."
              },
              {
                "kind": "paragraph",
                "text": "Their experience exists. But it is difficult to find, communicate and recognise beyond the network they already know."
              }
            ]
          },
          {
            "kind": "card",
            "title": "2. Employers: Hiring Without Local Workforce Visibility",
            "blocks": [
              {
                "kind": "paragraph",
                "text": "A manufacturing unit, construction company or warehouse may need hundreds of workers."
              },
              {
                "kind": "paragraph",
                "text": "The employer knows the roles, skills and location required. What is harder is knowing who lives nearby, who has done similar work, who has returned from another city, and who is available now."
              },
              {
                "kind": "paragraph",
                "text": "Without that local picture, employers often fall back on contractors, referrals and repeated sourcing cycles."
              },
              {
                "kind": "paragraph",
                "text": "Better hiring starts with clearer visibility of the workforce already around the workplace."
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
                "text": "District-level numbers can provide a broad understanding of employment and population."
              },
              {
                "kind": "paragraph",
                "text": "But they do not always explain what is happening at the village level."
              },
              {
                "kind": "paragraph",
                "text": "Which occupations are common in a particular area? Where are experienced workers located? Which industries do people migrate to? What happens when they return?"
              },
              {
                "kind": "paragraph",
                "text": "These details matter when planning employment initiatives, skill development programmes and local workforce opportunities."
              },
              {
                "kind": "paragraph",
                "text": "Better decisions need a better understanding of the workforce on the ground."
              }
            ]
          }
        ]
      },
      {
        "title": "The Missing Link: Workforce Intelligence",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "These challenges are connected."
          },
          {
            "kind": "paragraph",
            "text": "Workers need their experience to be recognised. Employers need better visibility into available talent. Institutions need a more detailed understanding of local workforce realities."
          },
          {
            "kind": "paragraph",
            "text": "Yet the information connecting these three groups remains fragmented."
          },
          {
            "kind": "paragraph",
            "text": "A worker's employment history may sit with a previous contractor. Their skills may be known only to people in their village. Their availability may change with seasons, migration and personal circumstances."
          },
          {
            "kind": "paragraph",
            "text": "There is no simple, connected view of this journey."
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
            "answer": "Many workers have valuable skills and years of employment experience, but this information is scattered and difficult for employers to discover, particularly at the village level."
          },
          {
            "question": "Why do employers struggle to find nearby workers?",
            "answer": "Employers may know their hiring requirements but lack structured information about local workers, their skills, past experience and availability."
          },
          {
            "question": "Why is migrant worker experience important?",
            "answer": "Workers often gain valuable experience while working in other cities and states. When they return home, that experience may not be visible to employers in their local area."
          },
          {
            "question": "Why is village-level workforce information needed?",
            "answer": "Village-level information can help create a more detailed understanding of workers, occupations, skills and employment journeys than broad geographical averages alone."
          },
          {
            "question": "How does RojMitra address this problem?",
            "answer": "RojMitra aims to map and organise worker profiles, skills, employment experience and availability, starting at the village level."
          },
          {
            "question": "Does RojMitra collect worker information with consent?",
            "answer": "Yes. RojMitra's approach is based on consent-driven worker information collection through local partners."
          },
          {
            "question": "Who can become a RojMitra Sourcing Partner?",
            "answer": "Individuals and local partners with connections to workers and communities can explore joining the RojMitra sourcing network."
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
    "headline": "India's Workforce Has a Story. We Are Building the Intelligence to Understand It.",
    "title": "Workforce Intelligence for India's Villages | RojMitra",
    "description": "Workforce intelligence organises workers' skills, experience, migration and availability from village to state level, based on consent.",
    "intro": [
      {
        "kind": "paragraph",
        "text": "India's workforce is spread across thousands of villages, towns, districts and industries. People move for work, learn new skills, gain experience and return to their communities."
      },
      {
        "kind": "paragraph",
        "text": "But how much do we really know about this workforce?"
      },
      {
        "kind": "paragraph",
        "text": "Where are experienced workers located? What industries have they worked in? What skills have they developed? Where are they moving for employment? And what workforce is available around a particular business location?"
      },
      {
        "kind": "paragraph",
        "text": "These are the questions RojMitra aims to answer."
      },
      {
        "kind": "paragraph",
        "text": "We are building workforce intelligence that starts at the village level and connects India's workforce to a larger employment ecosystem."
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
            "text": "Workforce intelligence is the organised understanding of people, their skills, work experience, employment history, availability and movement across locations."
          },
          {
            "kind": "paragraph",
            "text": "It goes beyond knowing how many people live in a particular area."
          },
          {
            "kind": "paragraph",
            "text": "It is about understanding the actual workforce:"
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
          },
          {
            "kind": "paragraph",
            "text": "RojMitra aims to bring these different pieces of information together to create a more meaningful picture of India's workforce."
          }
        ]
      },
      {
        "title": "What We Map",
        "blocks": [
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
        "title": "From Village Intelligence to National Understanding",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "We believe workforce intelligence should begin close to the worker."
          },
          {
            "kind": "paragraph",
            "text": "RojMitra follows a village-first approach to organising information across different geographical levels."
          },
          {
            "kind": "paragraph",
            "text": "Village → Gram Panchayat → Block → District → State → India"
          },
          {
            "kind": "paragraph",
            "text": "This structure can help build a more detailed understanding of workforce distribution, skills and employment experience."
          },
          {
            "kind": "paragraph",
            "text": "It also creates an opportunity to understand how local workforce realities connect with regional and national employment requirements."
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
                "text": "Hiring requirements often begin with a simple question: Where can we find the right workers?"
              },
              {
                "kind": "paragraph",
                "text": "Workforce intelligence can help employers better understand the locations, skills and experience of the workforce relevant to their requirements."
              },
              {
                "kind": "paragraph",
                "text": "Instead of looking only at vacancies and applications, employers can begin with a better understanding of the workforce itself."
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
                "text": "A person's professional experience should not become difficult to recognise simply because they change locations or employers."
              },
              {
                "kind": "paragraph",
                "text": "RojMitra aims to make workers' skills and employment journeys more visible through structured, consent-based records."
              }
            ]
          },
          {
            "kind": "card",
            "title": "For Government and Institutions",
            "blocks": [
              {
                "kind": "paragraph",
                "text": "A better understanding of local workforce realities can support more informed discussions around employment, migration, skill development and workforce planning."
              },
              {
                "kind": "paragraph",
                "text": "RojMitra aims to contribute to this understanding through ground-level workforce information."
              }
            ]
          }
        ]
      },
      {
        "title": "Technology Meets Local Understanding",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "Workforce intelligence cannot be built only through technology."
          },
          {
            "kind": "paragraph",
            "text": "It requires people who understand local communities, can communicate with workers and can help capture information responsibly."
          },
          {
            "kind": "paragraph",
            "text": "RojMitra brings together a technology-led approach and a local sourcing partner network."
          },
          {
            "kind": "paragraph",
            "text": "Our approach focuses on:"
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
          },
          {
            "kind": "paragraph",
            "text": "The objective is to build a useful and continuously improving understanding of India's workforce."
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
            "question": "What does workforce intelligence mean?",
            "answer": "Workforce intelligence means understanding the distribution, skills, occupations, employment experience, migration and availability of workers across different locations and industries."
          },
          {
            "question": "What is village-level workforce mapping?",
            "answer": "It is an approach to understanding workers and their employment-related information starting at the village level, with the potential to organise insights across larger geographical areas."
          },
          {
            "question": "What information does RojMitra aim to map?",
            "answer": "RojMitra aims to organise information relating to workers' locations, skills, occupations, employment history, migration journeys and availability, based on information shared with consent."
          },
          {
            "question": "How is workforce intelligence different from a job portal?",
            "answer": "A job portal primarily connects job vacancies with job seekers. Workforce intelligence focuses on understanding the workforce itself, including skills, experience, location and employment patterns."
          },
          {
            "question": "How can employers use RojMitra?",
            "answer": "Employers can share their workforce requirements and explore how RojMitra's workforce intelligence and sourcing network can support their hiring needs."
          },
          {
            "question": "How can someone become a sourcing partner?",
            "answer": "Individuals and local partners interested in connecting with workers in their communities can apply through the Join as a Sourcing Partner page."
          },
          {
            "question": "Does RojMitra cover rural and urban workforces?",
            "answer": "RojMitra's approach starts at the village level and is designed to organise workforce information across villages, towns, districts and states."
          },
          {
            "question": "Is worker information collected with consent?",
            "answer": "RojMitra follows a consent-based approach to worker information collection. Information should be collected and used responsibly, with appropriate privacy safeguards."
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
    "headline": "From Every Village to Every Workforce Requirement.",
    "title": "How RojMitra Works: Village to Workforce Requirement",
    "description": "Six steps from local sourcing partners to employer requirements: how RojMitra builds consent-based workforce intelligence from the village up.",
    "intro": [
      {
        "kind": "paragraph",
        "text": "India's workforce is distributed across villages, towns and cities. Understanding it requires more than a database. It requires local connections, structured information and a system that brings everything together."
      },
      {
        "kind": "paragraph",
        "text": "RojMitra combines local sourcing partners with technology to build a connected view of India's workforce."
      },
      {
        "kind": "paragraph",
        "text": "The process begins with people on the ground and connects their workforce information with relevant employment requirements."
      }
    ],
    "sections": [
      {
        "title": "How the RojMitra Network Works",
        "blocks": [
          {
            "kind": "card",
            "title": "Step 1: Identify the Local Workforce",
            "blocks": [
              {
                "kind": "paragraph",
                "text": "The process begins at the village level."
              },
              {
                "kind": "paragraph",
                "text": "Local sourcing partners help identify workers in their communities and understand the industries, occupations and skills represented in the area."
              },
              {
                "kind": "paragraph",
                "text": "The objective is to build a clearer picture of the workforce that exists locally."
              }
            ]
          },
          {
            "kind": "card",
            "title": "Step 2: Connect With Workers",
            "blocks": [
              {
                "kind": "paragraph",
                "text": "Workers are approached through local connections and introduced to the RojMitra initiative."
              },
              {
                "kind": "paragraph",
                "text": "They learn why their workforce information is being collected, what it may be used for and how they can participate."
              },
              {
                "kind": "paragraph",
                "text": "Participation and information sharing are based on consent."
              }
            ]
          },
          {
            "kind": "card",
            "title": "Step 3: Build Worker Profiles",
            "blocks": [
              {
                "kind": "paragraph",
                "text": "With the worker's consent, relevant information is collected and organised."
              },
              {
                "kind": "paragraph",
                "text": "This may include:"
              },
              {
                "kind": "list",
                "items": [
                  "Basic profile information.",
                  "Village and district details.",
                  "Skills and occupations.",
                  "Previous employment experience.",
                  "Industries and job roles.",
                  "Migration and work-location history.",
                  "Employment preferences and availability."
                ]
              },
              {
                "kind": "paragraph",
                "text": "The purpose is to make a worker's professional experience easier to understand and recognise."
              }
            ]
          },
          {
            "kind": "card",
            "title": "Step 4: Organise Workforce Intelligence",
            "blocks": [
              {
                "kind": "paragraph",
                "text": "The collected information is structured to help build an understanding of the workforce across geographical and industry categories."
              },
              {
                "kind": "paragraph",
                "text": "Information can be organised across:"
              },
              {
                "kind": "paragraph",
                "text": "Village → Gram Panchayat → Block → District → State"
              },
              {
                "kind": "paragraph",
                "text": "This provides a foundation for understanding local workforce distribution, occupational patterns and employment experience."
              }
            ]
          },
          {
            "kind": "card",
            "title": "Step 5: Understand Employer Requirements",
            "blocks": [
              {
                "kind": "paragraph",
                "text": "Employers share their workforce requirements with RojMitra."
              },
              {
                "kind": "paragraph",
                "text": "These requirements may include:"
              },
              {
                "kind": "list",
                "items": [
                  "Type of workers needed.",
                  "Number of workers required.",
                  "Skills and experience.",
                  "Industry and job roles.",
                  "Work location.",
                  "Expected joining timeline."
                ]
              },
              {
                "kind": "paragraph",
                "text": "This helps establish what kind of workforce an employer is looking for."
              }
            ]
          },
          {
            "kind": "card",
            "title": "Step 6: Connect Relevant Workforce With Opportunities",
            "blocks": [
              {
                "kind": "paragraph",
                "text": "Based on the employer's requirements and available workforce information, relevant sourcing and recruitment processes can be initiated."
              },
              {
                "kind": "paragraph",
                "text": "Local sourcing partners and the EarlyJobs recruitment ecosystem can help connect suitable workers with employment opportunities."
              },
              {
                "kind": "paragraph",
                "text": "The objective is to reduce the gap between where workers are and where employment opportunities exist."
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
        "title": "A Network Built From the Ground Up",
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
            "question": "What is the first step in the RojMitra process?",
            "answer": "The process begins with identifying the local workforce through community connections and local sourcing partners."
          },
          {
            "question": "Who collects worker information?",
            "answer": "RojMitra works through local sourcing partners and its workforce intelligence processes to collect relevant information with worker consent."
          },
          {
            "question": "What information is collected from workers?",
            "answer": "Relevant information may include location, skills, occupation, previous work experience, employment preferences and availability."
          },
          {
            "question": "Can workers participate without paying?",
            "answer": "Worker participation terms should be communicated transparently during onboarding. No worker should be promised benefits or charged fees without a clearly defined and disclosed policy."
          },
          {
            "question": "How can employers submit requirements?",
            "answer": "Employers can visit the For Employers page and submit details about their organisation, hiring location, job roles and workforce requirements."
          },
          {
            "question": "How does a sourcing partner join?",
            "answer": "Interested individuals can visit the sourcing partner page and submit their mobile number, location and community connections. The team will review their interest and discuss the next steps."
          },
          {
            "question": "Does submitting a requirement guarantee workers?",
            "answer": "No. Submission of a requirement initiates the enquiry and evaluation process. Actual sourcing depends on the role, location, workforce availability and agreed requirements."
          },
          {
            "question": "Does RojMitra operate only at the village level?",
            "answer": "The approach starts at the village level and aims to organise workforce intelligence across Gram Panchayats, blocks, districts and states."
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
    "headline": "The Workforce You Need May Be Closer Than You Think.",
    "title": "Hire Frontline Workers Across India | RojMitra for Employers",
    "description": "Hiring for factories, warehouses, construction or logistics? Submit your requirement and explore village-level workforce intelligence.",
    "intro": [
      {
        "kind": "paragraph",
        "text": "Finding workers is one challenge. Understanding where the right workforce exists, what experience they bring and how to reach them is another."
      },
      {
        "kind": "paragraph",
        "text": "For businesses operating factories, warehouses, construction sites, manufacturing units and logistics operations, workforce requirements are often location-specific and time-sensitive."
      },
      {
        "kind": "paragraph",
        "text": "Yet information about workers remains scattered across contractors, local networks and communities."
      },
      {
        "kind": "paragraph",
        "text": "RojMitra is building a village-level workforce intelligence and sourcing network to help employers better understand and connect with India's workforce."
      },
      {
        "kind": "paragraph",
        "text": "Looking for workers? Tell us what your business needs."
      },
      {
        "kind": "cta",
        "text": "Submit Your Hiring Requirements"
      }
    ],
    "sections": [
      {
        "title": "The Challenge Employers Face",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "Hiring frontline and operational workers is rarely as simple as publishing a vacancy."
          },
          {
            "kind": "paragraph",
            "text": "Employers often face challenges such as:"
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
        "title": "A Better Way to Understand Your Workforce",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "RojMitra approaches workforce sourcing from the ground up."
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
            "title": "1. Submit Your Requirement",
            "blocks": [
              {
                "kind": "paragraph",
                "text": "Tell us about your organisation, hiring location, job roles and workforce requirements."
              }
            ]
          },
          {
            "kind": "card",
            "title": "2. Requirement Review",
            "blocks": [
              {
                "kind": "paragraph",
                "text": "Our team reviews your requirement to understand the number of workers, skills, experience, location and expected timeline."
              }
            ]
          },
          {
            "kind": "card",
            "title": "3. Workforce Intelligence and Sourcing",
            "blocks": [
              {
                "kind": "paragraph",
                "text": "We evaluate relevant workforce information and local sourcing possibilities for your requirement."
              }
            ]
          },
          {
            "kind": "card",
            "title": "4. Connect With Relevant Workers",
            "blocks": [
              {
                "kind": "paragraph",
                "text": "Where suitable workers can be identified, the relevant sourcing and recruitment process can be initiated."
              }
            ]
          },
          {
            "kind": "card",
            "title": "5. Hiring Coordination",
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
            "question": "What is RojMitra for employers?",
            "answer": "RojMitra is building a village-level workforce intelligence and sourcing network to help employers understand and connect with workers across different locations and industries."
          },
          {
            "question": "Which industries can submit requirements?",
            "answer": "Manufacturing, textiles, construction, logistics, warehousing, retail, infrastructure and other industries with frontline or operational workforce requirements can submit enquiries."
          },
          {
            "question": "Can I submit a bulk hiring requirement?",
            "answer": "Yes. Employers can share requirements for multiple workers, including job roles, locations, quantities and expected joining timelines."
          },
          {
            "question": "Can RojMitra help us find workers in specific districts?",
            "answer": "RojMitra is designed around district-level and village-level workforce intelligence. The ability to support a particular requirement will depend on the relevant location and available workforce information."
          },
          {
            "question": "How does the sourcing process begin?",
            "answer": "It begins when you submit your workforce requirement. The RojMitra team reviews the details and discusses the relevant sourcing approach and next steps."
          },
          {
            "question": "Does submitting a requirement guarantee candidate availability?",
            "answer": "No. Submitting a requirement does not guarantee that suitable workers are immediately available. Feasibility depends on the role, location, skills, quantity and timeline."
          },
          {
            "question": "Is RojMitra connected to EarlyJobs?",
            "answer": "Yes. RojMitra is an initiative by EarlyJobs, drawing on its experience in recruitment and hiring."
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
    "headline": "Your Community. Your Network. A Bigger Opportunity.",
    "title": "Become a RojMitra Sourcing Partner | Village Workforce Mitra",
    "description": "Join RojMitra as a Sourcing Partner and help workers in your village or district create consent-based skill and experience records.",
    "intro": [
      {
        "kind": "paragraph",
        "text": "Every village has people who understand its community."
      },
      {
        "kind": "paragraph",
        "text": "They know who has worked in factories, who has experience in construction, who has migrated to another state for employment and who may be looking for their next opportunity."
      },
      {
        "kind": "paragraph",
        "text": "This local understanding is valuable."
      },
      {
        "kind": "paragraph",
        "text": "RojMitra is building a village-level workforce intelligence and sourcing network, and we are looking for people who can help us connect with workers and communities across India."
      },
      {
        "kind": "paragraph",
        "text": "Become a RojMitra Sourcing Partner and help make India's workforce more visible."
      },
      {
        "kind": "cta",
        "text": "Join as a Sourcing Partner"
      }
    ],
    "sections": [
      {
        "title": "Why Sourcing Partners Matter",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "India's workforce is spread across villages, towns and districts. Understanding it requires people who know these places, understand local communities and can build meaningful connections."
          },
          {
            "kind": "paragraph",
            "text": "A sourcing partner helps bridge the gap between local workers and a larger workforce network."
          },
          {
            "kind": "paragraph",
            "text": "Instead of depending entirely on distant recruitment channels, RojMitra aims to build stronger connections at the local level."
          },
          {
            "kind": "paragraph",
            "text": "Your understanding of your community can become an important part of this network."
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
            "question": "What is a RojMitra Sourcing Partner?",
            "answer": "A RojMitra Sourcing Partner is a local individual or partner who helps connect with workers, understand their employment experience and support workforce information collection and relevant sourcing activities."
          },
          {
            "question": "Do I need recruitment experience?",
            "answer": "Not necessarily. Local community connections, communication skills and an understanding of workers in your area are important. Relevant experience can be an advantage."
          },
          {
            "question": "Can I join from a village or small town?",
            "answer": "Yes. RojMitra follows a village-first approach and welcomes interest from people connected to villages, towns and districts."
          },
          {
            "question": "How do I register?",
            "answer": "Submit your interest through the sourcing partner application, including your mobile number and location. Our team will review your details and discuss the next steps."
          },
          {
            "question": "Will I receive a defined territory?",
            "answer": "Operating areas and partner arrangements depend on the local network and onboarding evaluation. These details should be confirmed with the RojMitra team."
          },
          {
            "question": "Is there a joining fee?",
            "answer": "Any applicable fees or commercial terms, if introduced, will be clearly communicated before onboarding. Do not assume that registration automatically involves a fee."
          },
          {
            "question": "How do sourcing partners earn?",
            "answer": "Any applicable commercial arrangements, sourcing incentives or payment terms will be communicated separately and transparently during partner onboarding. Earnings are not guaranteed by registration alone."
          },
          {
            "question": "Can I work with RojMitra part-time?",
            "answer": "The expected time commitment and working arrangement depend on the partner model and local requirements. Discuss this with the team during onboarding."
          },
          {
            "question": "Is RojMitra associated with EarlyJobs?",
            "answer": "Yes. RojMitra is an initiative by EarlyJobs, drawing on its recruitment and hiring experience."
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
    "headline": "Understanding the Initiatives Shaping India's Workforce",
    "title": "Government Workforce Initiatives & Schemes in India | RojMitra",
    "description": "Explore government initiatives, policies and digital platforms focused on worker registration, workforce mapping, employment and social security across India.",
    "intro": [
      {
        "kind": "paragraph",
        "text": "Across India, governments are introducing policies, registration systems and digital platforms to better understand the workforce and improve access to employment and social security."
      },
      {
        "kind": "paragraph",
        "text": "From gig-worker registration to migrant worker surveys, these initiatives are creating new ways to identify workers, understand their needs and connect them with relevant support."
      },
      {
        "kind": "paragraph",
        "text": "At RojMitra, we believe it is important to understand these developments. This page brings together government initiatives, policies, programmes and platforms that are working towards a more organised and visible workforce ecosystem."
      },
      {
        "kind": "paragraph",
        "text": "Our aim is simple: make relevant information easier to discover, understand and follow."
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
                "text": "The e-Shram portal was launched to create a national database of unorganised workers, including migrant workers and gig and platform workers."
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
                "text": "Press release: http://haryanacmoffice.gov.in/press-release/cmo-haryana-press-release-27-may-2026-0"
              }
            ]
          },
          {
            "kind": "card",
            "title": "3. Telangana Platform-Based Gig Workers Act, 2026",
            "blocks": [
              {
                "kind": "paragraph",
                "text": "Government: Government of Telangana"
              },
              {
                "kind": "paragraph",
                "text": "Focus: Registration, social security and welfare of platform-based gig workers"
              },
              {
                "kind": "paragraph",
                "text": "Telangana has introduced a legal framework focused on the registration and welfare of platform-based gig workers. The Act provides for a system to register workers and establish institutional mechanisms for social security and welfare."
              },
              {
                "kind": "paragraph",
                "text": "Why it matters: The initiative reflects a growing focus on recognising gig workers and creating structured systems for their registration and welfare."
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
        "title": "Where RojMitra Fits In",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "Government initiatives, employment platforms and workforce intelligence systems can address different but connected challenges."
          },
          {
            "kind": "paragraph",
            "text": "RojMitra is being built to improve the visibility of India's workforce at the local level."
          },
          {
            "kind": "paragraph",
            "text": "Our focus is on understanding workers across villages, Gram Panchayats, blocks and districts — including their skills, occupations, work experience and movement between locations."
          },
          {
            "kind": "paragraph",
            "text": "We see value in a workforce ecosystem where worker information is collected responsibly, local networks are strengthened and employers can better understand the workforce around their hiring locations."
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
            "question": "What are government workforce initiatives?",
            "answer": "These are policies, programmes, databases and digital platforms introduced by central or state governments to support worker registration, employment, social security, skill development and labour welfare."
          },
          {
            "question": "What is the e-Shram portal?",
            "answer": "e-Shram is a national database initiative for unorganised workers launched by the Ministry of Labour and Employment. It also includes registration provisions for gig and platform workers."
          },
          {
            "question": "What is Haryana doing for gig workers?",
            "answer": "In May 2026, the Haryana Chief Minister directed a statewide campaign to register gig workers and connect them with social-security schemes. The Labour Department reported more than 21,000 gig workers already registered, with further enrolment underway."
          },
          {
            "question": "What is Telangana doing for gig workers?",
            "answer": "Telangana has brought the Platform-Based Gig Workers (Registration, Social Security and Welfare) Act, 2026 into force, creating a legal framework for registration, social security and welfare of platform-based gig workers."
          },
          {
            "question": "Is RojMitra a government platform?",
            "answer": "No. RojMitra is an independent workforce intelligence initiative by EarlyJobs. Government initiatives featured on this page are listed for public information and awareness."
          },
          {
            "question": "Can I suggest an initiative for this page?",
            "answer": "Yes. You can share the name of a government scheme, policy, registration platform or programme for our team to review. Inclusion is subject to editorial verification."
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
    "headline": "Understanding India's Workforce, Beyond the Numbers",
    "title": "India's Workforce & Labour Market Insights | RojMitra",
    "description": "Explore research, reports and insights on India's workforce, labour markets, migration, gig economy, employment trends and government initiatives.",
    "intro": [
      {
        "kind": "paragraph",
        "text": "India's workforce is constantly changing."
      },
      {
        "kind": "paragraph",
        "text": "People move between villages and cities, learn new skills, enter different industries and adapt to changing employment opportunities. Yet much of this movement and experience remains difficult to understand through conventional employment data."
      },
      {
        "kind": "paragraph",
        "text": "At RojMitra, we explore the people, patterns and developments shaping India's workforce."
      },
      {
        "kind": "paragraph",
        "text": "Through research, reports, explainers and ground-level perspectives, we aim to make workforce information easier to understand and more useful for employers, institutions, policymakers and people working across India's employment ecosystem."
      },
      {
        "kind": "paragraph",
        "text": "Explore our latest research and insights."
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
            "text": "Our first articles are coming soon."
          }
        ]
      },
      {
        "title": "Research Built Around India's Ground Reality",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "Workforce data becomes more useful when it reflects what is happening on the ground."
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
            "question": "What can I read on the RojMitra blog?",
            "answer": "You can explore articles, research reports and explainers covering workforce intelligence, migration, gig employment, industry hiring, government initiatives and regional labour market developments."
          },
          {
            "question": "Does RojMitra publish original research?",
            "answer": "RojMitra aims to publish original research and workforce insights alongside explainers and curated updates. Each publication should identify its sources and distinguish original findings from information collected from external sources."
          },
          {
            "question": "Can I use RojMitra reports for research?",
            "answer": "You may refer to published reports subject to their stated usage and attribution terms. For commercial reuse or reproduction, contact the RojMitra team."
          },
          {
            "question": "Can I submit an article or report?",
            "answer": "Yes. You can share your research, article idea or relevant workforce information for editorial consideration. Publication is subject to review."
          },
          {
            "question": "How frequently is the blog updated?",
            "answer": "New articles and reports will be published as research and relevant developments become available. Publication frequency may vary by topic."
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
