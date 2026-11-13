"use client";

import { useId, useState, type ReactNode } from "react";
import {
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  CalendarCheck,
  Check,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  ClipboardList,
  Cpu,
  Database,
  ExternalLink,
  Factory,
  FileText,
  HardHat,
  Landmark,
  Layers,
  Map,
  MapPin,
  Network,
  Phone,
  Route,
  Search,
  ShieldCheck,
  Users,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { CtaBanner } from "@/components/site/CtaBanner";
import { IconBadge, SectionLabel } from "@/components/site/primitives";
import { IndiaMap } from "@/components/site/IndiaMap";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { InlineCopy } from "@/lib/inline-copy";
import { FormCTA, SubmissionForm } from "@/components/site/Forms";
import { footer, hero as homeHero } from "@/content/site";
import {
  blogEmptyStateImage,
  entryScenes,
  pageDesign,
  pageNavigationLabel,
  problemScenes,
  sectorTiles,
} from "@/content/page-design";
import { pages, type ContentBlock, type ContentPageData, type ContentSection } from "@/content/pages";
import { cn } from "@/lib/utils";
import { assetUrl } from "@/lib/asset";
import googlePlayLogo from "@/assets/store/google-play.svg";

type PageKey = keyof typeof pages;

const stripNumber = (title: string) => title.replace(/^(?:Step\s+)?\d+[.:]\s*/, "");

/* ---------- Section shell (no numeric markers; sticky headings on text layouts) ---------- */

type SectionImage = { src: string; alt: string; position?: string; side?: "left" | "right" };

function SectionPhoto({ image, className }: { image: SectionImage; className?: string }) {
  return (
    <img
      src={image.src}
      alt={image.alt}
      loading="lazy"
      width={1200}
      height={900}
      className={cn("aspect-[4/3] w-full rounded-2xl object-cover shadow-soft", className)}
      style={image.position ? { objectPosition: image.position } : undefined}
    />
  );
}

export function Section({ title, children, id, cta = false, index = 0, wide = false, image }: { title: string; children: ReactNode; id?: string; cta?: boolean; index?: number; wide?: boolean; image?: SectionImage | undefined }) {
  const left = image && image.side !== "right";
  return (
    <section id={id} className={cn("scroll-mt-24 border-t border-border py-14 sm:py-20", cta ? "page-cta-band bg-navy text-on-dark" : index % 2 === 0 ? "bg-card" : "bg-surface")}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={cn("gap-10 lg:gap-16", !wide && "lg:grid lg:grid-cols-[0.8fr_1.6fr]")}>
          <header className={cn(wide ? "mb-9 max-w-3xl" : "mb-8 lg:mb-0", !wide && !image && "lg:sticky lg:top-24 lg:self-start")}>
            <h2 className="text-3xl font-semibold leading-tight sm:text-4xl">{title}</h2>
            {left && <SectionPhoto image={image} className="mt-8 hidden lg:block" />}
          </header>
          <div className="min-w-0">
            {children}
            {image && <SectionPhoto image={image} className={cn("mt-8", left && "lg:hidden")} />}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Generic blocks ---------- */

function Paragraph({ text, pullQuotes }: { text: string; pullQuotes?: string[] | undefined }) {
  const link = text.match(/^(Official platform|App listing|Press release): (https?:\/\/\S+)$/);
  if (link) {
    return (
      <p className="page-copy">
        {link[1]}:{" "}
        <a href={link[2]} target="_blank" rel="noopener noreferrer" className="break-all text-brand underline underline-offset-4">
          {link[2]}
        </a>
      </p>
    );
  }
  if (text.startsWith("RojMitra is an independent initiative")) {
    return (
      <div className="flex gap-4 rounded-lg border border-flame/30 bg-flame-pale p-5 sm:p-6" role="note">
        <ShieldCheck aria-hidden className="mt-1 h-6 w-6 shrink-0 text-flame" strokeWidth={1.6} />
        <p className="page-copy font-medium text-foreground">{text}</p>
      </div>
    );
  }
  if (pullQuotes?.includes(text)) {
    return (
      <blockquote className="border-l-4 border-flame py-1 pl-6">
        <p className="text-2xl font-semibold leading-snug text-foreground sm:text-3xl">{text}</p>
      </blockquote>
    );
  }
  if (text.startsWith("Village →")) {
    return (
      <ul aria-label={text} className="grid gap-3 sm:grid-cols-3">
        {text.split(" → ").map((place) => (
          <li key={place} className="flex min-h-20 items-center gap-3 rounded-lg border border-border bg-sky-pale p-4 text-foreground">
            <MapPin aria-hidden className="h-5 w-5 shrink-0 text-brand" />
            <div>
              <span className="text-sm font-semibold">{place}</span>
            </div>
          </li>
        ))}
      </ul>
    );
  }
  return (
    <p className="page-copy">
      <InlineCopy text={text} />
    </p>
  );
}

const listCardIcons = [Search, MapPin, Factory, Users, Route, Network, Landmark, Zap];

function BlockList({ block, asCards = false }: { block: ContentBlock; asCards?: boolean }) {
  const structured = block.items?.every((item) => item.includes(":"));
  if (asCards && !structured) {
    return (
      <ul className="grid gap-3 sm:grid-cols-2">
        {block.items?.map((item, i) => {
          const Icon = listCardIcons[i % listCardIcons.length] ?? Check;
          return (
            <li key={item} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4 shadow-soft">
              <span aria-hidden className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky-pale text-brand">
                <Icon className="h-4 w-4" strokeWidth={1.7} />
              </span>
              <span className="page-copy text-foreground">{item}</span>
            </li>
          );
        })}
      </ul>
    );
  }
  return (
    <ul className={cn("gap-4", structured ? "grid sm:grid-cols-2 sm:[&>*:last-child:nth-child(odd)]:col-span-2" : "grid")}>
      {block.items?.map((item) => (
        <li key={item} className={cn("page-list-item flex gap-3 text-muted-foreground", structured && "rounded-lg border border-border bg-sky-pale p-5")}>
          <Check className="mt-1 h-4 w-4 shrink-0 text-brand" aria-hidden />
          <span>
            {structured ? (
              <>
                <strong className="block font-semibold text-foreground">{item.split(":")[0]}</strong>
                {item.slice(item.indexOf(":") + 1).trim()}
              </>
            ) : (
              item
            )}
          </span>
        </li>
      ))}
    </ul>
  );
}

function Blocks({ blocks, slug, insideCard = false, pullQuotes }: { blocks: ContentBlock[]; slug: string; insideCard?: boolean; pullQuotes?: string[] | undefined }) {
  const output: ReactNode[] = [];
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    if (!block) continue;
    if (block.kind === "card") {
      const cards = [block];
      while (blocks[i + 1]?.kind === "card") {
        i++;
        const next = blocks[i];
        if (next) cards.push(next);
      }
      const children = cards.map((card, j) =>
        insideCard ? (
          <div key={j}>
            <h4 className="mb-3 font-semibold">{card.title}</h4>
            <Blocks blocks={card.blocks ?? []} slug={slug} insideCard pullQuotes={pullQuotes} />
          </div>
        ) : (
          <IconCard key={j} card={card} index={j} slug={slug} />
        ),
      );
      output.push(insideCard ? <div key={i} className="space-y-5">{children}</div> : <CardGrid key={i}>{children}</CardGrid>);
    } else if (block.kind === "list") {
      output.push(<BlockList key={i} block={block} asCards={!insideCard && slug === "for-employers" && (block.items?.length ?? 0) >= 5} />);
    } else if (block.kind === "cta") {
      const ctas = [block];
      while (blocks[i + 1]?.kind === "cta") {
        i++;
        const next = blocks[i];
        if (next) ctas.push(next);
      }
      output.push(
        <div key={i} className="flex flex-col items-start gap-3 pt-3 sm:flex-row sm:flex-wrap sm:items-center">
          {ctas.map((cta, j) =>
            cta.text ? (
              <FormCTA
                key={j}
                label={cta.text}
                partnerPage={slug === "become-a-sourcing-partner"}
                outline={j > 0}
              />
            ) : null,
          )}
        </div>,
      );
    } else if (block.kind === "form") {
      output.push(
        <div key={i} id={slug === "for-employers" ? "requirement-form" : "partner-form"} className="scroll-mt-24 rounded-2xl border border-border bg-card p-6 text-foreground shadow-lift sm:p-10">
          <SubmissionForm formType={slug === "for-employers" ? "employer_requirement" : "sourcing_partner_application"} />
          {slug === "become-a-sourcing-partner" && <GooglePlayButton />}
        </div>,
      );
    } else if (block.kind === "empty") {
      output.push(<EmptyState key={i} text={block.text ?? ""} />);
    } else {
      output.push(<Paragraph key={i} text={block.text ?? ""} pullQuotes={pullQuotes} />);
    }
  }
  return <div className="space-y-5">{output}</div>;
}

/* ---------- Cards ---------- */

const cardIcons = [Users, MapPin, BriefcaseBusiness, Network, ShieldCheck, FileText];

function IconCard({ card, index, slug, icons = cardIcons }: { card: ContentBlock; index: number; slug: string; icons?: LucideIcon[] }) {
  const Icon = icons[index % icons.length] ?? Users;
  return (
    <article className="page-content-card relative flex h-full min-w-0 flex-col rounded-lg border border-border bg-card p-6 text-foreground shadow-soft transition-shadow hover:shadow-float sm:p-7">
      <div className="mb-5">
        <IconBadge icon={Icon} />
      </div>
      <h3 className="mb-3 text-xl font-semibold leading-snug">{stripNumber(card.title ?? "")}</h3>
      <Blocks blocks={card.blocks ?? []} slug={slug} insideCard />
    </article>
  );
}

export function CardGrid({ children }: { children: ReactNode }) {
  return <div className="grid auto-rows-fr gap-5 md:grid-cols-2 md:[&>*:last-child:nth-child(odd)]:col-span-2">{children}</div>;
}

/** Structured "Title: description" lists rendered as icon tiles (e.g. About → What We Are Building). */
function IconTileList({ block, icons = cardIcons }: { block: ContentBlock; icons?: LucideIcon[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {block.items?.map((item, i) => {
        const Icon = icons[i % icons.length] ?? Users;
        const [lead, ...rest] = item.split(":");
        return (
          <li key={item} className="page-content-card flex h-full flex-col rounded-lg border border-border bg-card p-5 shadow-soft sm:p-6">
            <IconBadge icon={Icon} />
            <h3 className="mt-4 text-base font-semibold text-foreground">{lead}</h3>
            <p className="page-copy mt-2">{rest.join(":").trim()}</p>
          </li>
        );
      })}
    </ul>
  );
}

/* ---------- Stepper (true sequences only) ---------- */

const stepperIcons = [Search, Users, FileText, Layers, ClipboardList, Network];

function Stepper({ cards, slug, icons = stepperIcons }: { cards: ContentBlock[]; slug: string; icons?: LucideIcon[] }) {
  return (
    <div className={cn("grid auto-rows-fr gap-5", cards.length % 3 === 0 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2 sm:[&>*:last-child:nth-child(odd)]:col-span-2")}>
      {cards.map((card, i) => (
        <IconCard key={card.title} card={card} index={i} slug={slug} icons={icons} />
      ))}
    </div>
  );
}

/* ---------- The Problem: three scene cards + missing-link diagram ---------- */

function SceneCardCopy({ blocks, slug }: { blocks: ContentBlock[]; slug: string }) {
  const paragraphs = blocks.filter((block) => block.kind === "paragraph");
  const rest = blocks.filter((block) => block.kind !== "paragraph");
  const [open, setOpen] = useState(false);
  const lead = paragraphs[0];
  const more = paragraphs.slice(1);
  return (
    <div className="flex min-w-0 flex-1 flex-col">
      {lead?.text && <p className="page-copy text-foreground/85">{lead.text}</p>}
      {more.length > 0 && (
        <>
          <div className={cn("mt-4 space-y-4", open ? "block" : "hidden")}>
            {more.map((block) => (
              <p key={block.text} className="page-copy text-foreground/85">
                {block.text}
              </p>
            ))}
          </div>
          <button
            type="button"
            className="mt-4 self-start font-mono text-[0.7rem] font-medium uppercase tracking-[0.12em] text-brand underline-offset-4 hover:underline"
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? "Show less" : "Read more"}
          </button>
        </>
      )}
      {rest.length > 0 && (
        <div className="mt-auto pt-5">
          <Blocks blocks={rest} slug={slug} insideCard />
        </div>
      )}
    </div>
  );
}

function SceneCards({ cards, slug }: { cards: ContentBlock[]; slug: string }) {
  return (
    <div className="grid items-stretch gap-5 md:grid-cols-3">
      {cards.map((card, i) => {
        const scene = problemScenes[i];
        return (
          <article key={card.title} className="page-content-card flex h-full min-w-0 flex-col overflow-hidden rounded-lg border border-border bg-card text-foreground shadow-soft">
            {scene ? (
              <img src={scene.src} alt={scene.alt} loading="lazy" width={1200} height={896} className="aspect-[4/3] w-full object-cover" style={scene.position ? { objectPosition: scene.position } : undefined} />
            ) : (
              <div className="flex aspect-[4/3] items-center justify-center bg-gradient-sky-soft">
                <IconBadge icon={Landmark} tone="navy" className="h-16 w-16 [&_svg]:h-7 [&_svg]:w-7" />
              </div>
            )}
            <div className="flex min-w-0 flex-1 flex-col p-5 sm:p-6">
              <h3 className="mb-3 text-lg font-semibold leading-snug">{stripNumber(card.title ?? "")}</h3>
              <SceneCardCopy blocks={card.blocks ?? []} slug={slug} />
            </div>
          </article>
        );
      })}
    </div>
  );
}

function MissingLinkDiagram() {
  const nodes = [
    { label: "Workers", x: 110 },
    { label: "Employers", x: 320 },
    { label: "Institutions", x: 530 },
  ];
  return (
    <figure className="rounded-lg border border-border bg-sky-pale p-4 sm:p-8">
      <svg viewBox="0 0 640 360" className="h-auto w-full" role="img" aria-label="Workers, Employers and Institutions each joined by a broken dotted line to a central Workforce Intelligence node">
        {nodes.map((node) => (
          <g key={node.label}>
            <line x1={node.x} y1={92} x2={320} y2={252} stroke="var(--brand)" strokeWidth="2.5" strokeDasharray="7 8" opacity="0.65" />
            <g transform={`translate(${(node.x + 320) / 2}, ${(92 + 252) / 2})`}>
              <circle r="11" fill="var(--card)" stroke="var(--flame)" strokeWidth="2" />
              <path d="M-4 -4 L4 4 M4 -4 L-4 4" stroke="var(--flame)" strokeWidth="2" strokeLinecap="round" />
            </g>
            <rect x={node.x - 78} y={52} width={156} height={40} rx={20} fill="var(--card)" stroke="var(--border)" />
            <text x={node.x} y={77} textAnchor="middle" fontSize="15" fontWeight={600} fill="var(--foreground)">{node.label}</text>
          </g>
        ))}
        <rect x={195} y={252} width={250} height={52} rx={26} fill="none" stroke="var(--brand)" strokeWidth="2.5" strokeDasharray="8 7" />
        <text x={320} y={284} textAnchor="middle" fontSize="16" fontWeight={700} fill="var(--brand)">Workforce Intelligence</text>
      </svg>
      <figcaption className="mono-label mt-3 text-center text-muted-foreground">The missing connection</figcaption>
    </figure>
  );
}

/* ---------- Workforce Intelligence: profile card, geography chain, value tabs ---------- */

function WorkerProfileCard() {
  const profile = homeHero.cards.profile;
  const name = profile.fields.find((field) => field.label === "Name")?.value;
  return (
    <figure className="card-surface m-0 overflow-hidden">
      <div className="flex items-center justify-between gap-3 bg-gradient-navy px-5 py-3.5 text-on-dark">
        <p className="font-mono text-xs uppercase tracking-[0.14em]">{profile.label}</p>
        <span className="rounded-full border border-on-dark/30 px-2.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-[0.1em]">Illustrative</span>
      </div>
      <div className="px-5 pb-4 pt-4">
        <p className="font-mono text-xs uppercase tracking-[0.12em] text-brand">Name</p>
        <h3 className="mt-1 text-2xl font-semibold tracking-tight text-foreground">{name}</h3>
        <dl className="mt-4 divide-y divide-border border-y border-border">
          {profile.fields
            .filter((field) => field.label !== "Name")
            .map((field) => (
              <div key={field.label} className="grid grid-cols-[8rem_minmax(0,1fr)] gap-3 py-2.5">
                <dt className="font-mono text-xs uppercase leading-5 tracking-[0.08em] text-muted-foreground">{field.label}</dt>
                <dd className="text-sm font-medium leading-5 text-foreground">{field.value}</dd>
              </div>
            ))}
        </dl>
        <figcaption className="mt-3.5 text-xs leading-relaxed text-muted-foreground">{profile.disclaimer} — illustrative, not a real worker record.</figcaption>
      </div>
    </figure>
  );
}

const geoChain = ["Village", "Gram Panchayat", "Block", "District", "State", "India"];

function GeoChain() {
  return (
    <ul aria-label={geoChain.join(", ")} className="flex flex-wrap items-center gap-3">
      {geoChain.map((place, i) => (
        <li key={place} className="flex items-center gap-1">
          <span
            className={cn(
              "rounded-full border px-3.5 py-2 font-mono text-xs uppercase tracking-[0.08em] sm:px-4",
              i === 0 ? "border-transparent bg-gradient-brand text-on-dark shadow-soft" : "border-border bg-sky-pale text-brand",
            )}
          >
            {place}
          </span>
        </li>
      ))}
    </ul>
  );
}

function ValueTabs({ cards, slug }: { cards: ContentBlock[]; slug: string }) {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const current = cards[active] ?? cards[0];
  if (!current) return null;
  return (
    <div>
      <div role="tablist" aria-label="Who benefits" className="no-scrollbar flex w-fit max-w-full gap-1 overflow-x-auto rounded-full border border-border bg-card p-1 shadow-soft">
        {cards.map((card, index) => {
          const selected = index === active;
          return (
            <button
              key={card.title}
              id={`${baseId}-tab-${index}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`${baseId}-panel`}
              tabIndex={selected ? 0 : -1}
              className={cn(
                "shrink-0 rounded-full px-4 py-2.5 font-mono text-xs uppercase tracking-[0.1em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                selected ? "bg-navy text-on-dark" : "text-muted-foreground hover:text-foreground",
              )}
              onClick={() => setActive(index)}
              onKeyDown={(event) => {
                const last = cards.length - 1;
                const next = event.key === "ArrowRight" ? (index + 1) % cards.length : event.key === "ArrowLeft" ? (index - 1 + cards.length) % cards.length : event.key === "Home" ? 0 : event.key === "End" ? last : null;
                if (next !== null) {
                  event.preventDefault();
                  setActive(next);
                  requestAnimationFrame(() => document.getElementById(`${baseId}-tab-${next}`)?.focus());
                }
              }}
            >
              {stripNumber(card.title ?? "")}
            </button>
          );
        })}
      </div>
      <div id={`${baseId}-panel`} role="tabpanel" aria-labelledby={`${baseId}-tab-${active}`} className="card-surface mt-6 p-6 sm:p-8">
        <h3 className="mb-4 text-xl font-semibold text-foreground">{stripNumber(current.title ?? "")}</h3>
        <Blocks blocks={current.blocks ?? []} slug={slug} insideCard />
      </div>
    </div>
  );
}

/* ---------- How It Works: entry cards ---------- */

function EntryCards({ cards, slug }: { cards: ContentBlock[]; slug: string }) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {cards.map((card, i) => {
        const scene = entryScenes[i];
        return (
          <article key={card.title} className="page-content-card flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-border bg-card text-foreground shadow-soft">
            {scene && <img src={scene.src} alt={scene.alt} loading="lazy" width={1200} height={896} className="aspect-[21/9] w-full object-cover" style={{ objectPosition: scene.position }} />}
            <div className="flex min-w-0 flex-1 flex-col p-6 sm:p-8">
              <h3 className="mb-4 text-2xl font-semibold">{card.title}</h3>
              <Blocks blocks={card.blocks ?? []} slug={slug} insideCard />
            </div>
          </article>
        );
      })}
    </div>
  );
}

/* ---------- Government Initiatives: tracker cards ---------- */

function TrackerCards({ cards }: { cards: ContentBlock[] }) {
  return (
    <div className="grid auto-rows-fr gap-5 md:grid-cols-2 md:[&>*:last-child:nth-child(odd)]:col-span-2">
      {cards.map((card) => {
        const paragraphs = (card.blocks ?? []).filter((block) => block.kind === "paragraph").map((block) => block.text ?? "");
        const government = paragraphs.find((text) => text.startsWith("Government: "))?.slice(12) ?? "";
        const level = /Government of India|Ministry/i.test(government) ? "Central" : "State";
        const focus = paragraphs.find((text) => text.startsWith("Focus: "))?.slice(7) ?? "";
        const link = paragraphs.find((text) => /^(Official platform|App listing|Press release): https?:\/\//.test(text));
        const linkMatch = link?.match(/^(Official platform|App listing|Press release): (https?:\/\/\S+)$/);
        const rest = paragraphs.filter((text) => text !== `Government: ${government}` && text !== `Focus: ${focus}` && text !== link && !text.startsWith("Technology partner:"));
        return (
          <article key={card.title} className="page-content-card flex h-full min-w-0 flex-col rounded-lg border border-border bg-card p-6 text-foreground shadow-soft sm:p-7">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className={cn("rounded-full px-3 py-1 font-mono text-xs uppercase tracking-[0.1em]", level === "Central" ? "bg-navy text-on-dark" : "bg-sky-pale text-brand")}>{level}</span>
              {focus && <span className="rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs uppercase tracking-[0.08em] text-foreground/70">{focus}</span>}
            </div>
            <h3 className="mb-4 text-xl font-semibold leading-snug">{stripNumber(card.title ?? "")}</h3>
            <div className="flex-1 space-y-4">
              <p className="page-copy text-foreground/85"><strong className="font-semibold text-foreground">Government:</strong> {government}</p>
              {rest.map((text) =>
                text.startsWith("Why it matters:") ? (
                  <p key={text} className="page-copy rounded-lg border-l-4 border-signal bg-signal-pale p-4 text-foreground">{text}</p>
                ) : (
                  <p key={text} className="page-copy text-foreground/85">{text}</p>
                ),
              )}
            </div>
            {linkMatch && (
              <p className="mt-auto pt-5">
                <a href={linkMatch[2]} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-sky-pale px-4 py-2 font-mono text-xs uppercase tracking-[0.1em] text-brand transition hover:bg-sky-soft">
                  {linkMatch[1]}
                  <ExternalLink aria-hidden className="h-3.5 w-3.5" />
                </a>
              </p>
            )}
          </article>
        );
      })}
    </div>
  );
}

/* ---------- Blog: topic cards + illustrated empty state ---------- */

const topicIcons = [Network, Route, Zap, Factory, Landmark, Map];
const topicTones = [
  "bg-sky-pale text-brand",
  "bg-signal-pale text-signal",
  "bg-flame-pale text-flame",
  "bg-navy text-on-dark",
  "bg-sky-soft text-navy",
  "bg-signal-pale text-signal",
];

function TopicCards({ cards }: { cards: ContentBlock[] }) {
  return (
    <div className="grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((card, i) => {
        const Icon = topicIcons[i % topicIcons.length] ?? Network;
        return (
          <article key={card.title} className="page-content-card flex h-full flex-col rounded-lg border border-border bg-card p-6 shadow-soft transition-shadow hover:shadow-float sm:p-7">
            <span aria-hidden className={cn("inline-flex h-11 w-11 items-center justify-center rounded-full", topicTones[i % topicTones.length])}>
              <Icon className="h-5 w-5" strokeWidth={1.6} />
            </span>
            <h3 className="mt-4 text-lg font-semibold text-foreground">{card.title}</h3>
            <p className="page-copy mt-2">{card.blocks?.find((block) => block.kind === "paragraph")?.text}</p>
          </article>
        );
      })}
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="grid overflow-hidden rounded-2xl border border-border bg-card shadow-soft sm:grid-cols-2">
      <img src={blogEmptyStateImage.src} alt={blogEmptyStateImage.alt} loading="lazy" width={1920} height={1434} className="aspect-[4/3] h-full w-full object-cover" style={{ objectPosition: blogEmptyStateImage.position }} />
      <div className="flex flex-col items-start justify-center gap-4 p-8 sm:p-10">
        <IconBadge icon={FileText} />
        <p className="text-xl font-semibold text-foreground sm:text-2xl">{text}</p>
      </div>
    </div>
  );
}

export function GooglePlayButton() {
  const store = footer.app.stores.find((entry) => entry.id === "google-play");
  if (!store?.href) return null;
  return (
    <div className="mt-8 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm font-medium text-muted-foreground">{footer.app.audience}</p>
      <a href={store.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-3 self-start rounded-lg bg-navy px-4 py-2 text-on-dark shadow-soft transition hover:opacity-90">
        <img src={assetUrl(googlePlayLogo)} alt="" width={22} height={24} className="h-6 w-6 shrink-0 object-contain invert" />
        <span className="leading-tight">
          <span className="block text-[0.6rem] uppercase tracking-[0.1em] opacity-80">Get it on</span>
          <span className="block text-sm font-semibold">{store.label}</span>
        </span>
      </a>
    </div>
  );
}

/* ---------- Hero ---------- */

function JourneyMap() {
  return (
    <figure className="relative m-0 overflow-hidden rounded-2xl border border-on-dark/20 bg-sky-pale p-4 text-foreground shadow-float">
      <IndiaMap className="pointer-events-none absolute -right-3 -top-3 h-28 w-28 opacity-15" />
      <svg viewBox="0 0 360 210" className="h-auto w-full" role="img" aria-label="Dotted route from a village in Bihar to a textile town in Tamil Nadu and back">
        <path d="M252 48 C 230 96, 176 128, 118 168" fill="none" stroke="var(--brand)" strokeWidth="2.5" strokeDasharray="8 7" strokeLinecap="round" />
        <path d="M118 168 C 176 128, 230 96, 252 48" fill="none" stroke="var(--flame)" strokeWidth="2" strokeDasharray="3 8" strokeLinecap="round" opacity="0.8" />
        <circle cx={252} cy={48} r={9} fill="var(--flame)" />
        <circle cx={252} cy={48} r={15} fill="none" stroke="var(--flame)" strokeWidth="1.5" opacity="0.5" />
        <circle cx={118} cy={168} r={9} fill="var(--brand)" />
        <circle cx={118} cy={168} r={15} fill="none" stroke="var(--brand)" strokeWidth="1.5" opacity="0.5" />
        <text x={252} y={30} textAnchor="middle" fontSize="12.5" fontWeight={600} fill="var(--foreground)">Village, Bihar</text>
        <text x={118} y={196} textAnchor="middle" fontSize="12.5" fontWeight={600} fill="var(--foreground)">Textile town, Tamil Nadu</text>
      </svg>
      <figcaption className="mono-label mt-2 text-muted-foreground">Illustrative journey</figcaption>
    </figure>
  );
}

function HeroMotif({ kind }: { kind: "journey" | "chain" | "tracker" | "audiences" | "steps" }) {
  if (kind === "journey") return <JourneyMap />;
  if (kind === "chain") {
    return (
      <div className="rounded-2xl border border-on-dark/20 bg-on-dark/10 p-5">
        <p className="mono-label mb-4 text-on-dark/70">Village-first structure</p>
        <ul className="flex flex-wrap gap-2">
          {geoChain.map((place, i) => (
            <li key={place} className="flex items-center">
              <span className={cn("rounded-full px-3 py-1.5 font-mono text-xs uppercase tracking-[0.08em]", i === 0 ? "bg-signal text-on-dark" : "bg-on-dark/15 text-on-dark")}>{place}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  if (kind === "tracker") {
    return (
      <div className="space-y-3 rounded-2xl border border-on-dark/20 bg-on-dark/10 p-5">
        {[
          { level: "Central", label: "Worker registration" },
          { level: "State", label: "Gig-worker welfare" },
          { level: "State", label: "Migrant worker survey" },
        ].map((row) => (
          <div key={row.label} className="flex items-center gap-3 rounded-xl bg-card px-4 py-3 text-foreground shadow-soft">
            <span className={cn("rounded-full px-2.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-[0.1em]", row.level === "Central" ? "bg-navy text-on-dark" : "bg-sky-pale text-brand")}>{row.level}</span>
            <span className="text-sm font-medium">{row.label}</span>
          </div>
        ))}
      </div>
    );
  }
  if (kind === "audiences") {
    const items = [
      { icon: HardHat, label: "Workers" },
      { icon: Factory, label: "Employers" },
      { icon: Landmark, label: "Institutions" },
    ];
    return (
      <div className="grid gap-3">
        {items.map((item) => (
          <div key={item.label} className="flex items-center gap-3 rounded-xl border border-on-dark/20 bg-on-dark/10 px-4 py-3">
            <IconBadge icon={item.icon} tone="on-dark" className="h-9 w-9" />
            <span className="font-mono text-xs uppercase tracking-[0.12em] text-on-dark">{item.label}</span>
          </div>
        ))}
      </div>
    );
  }
  return (
    <ul className="flex flex-wrap items-center gap-2 rounded-2xl border border-on-dark/20 bg-on-dark/10 p-5">
      {["Identify", "Connect", "Profile", "Organise", "Understand", "Match"].map((step) => (
        <li key={step} className="flex items-center gap-2">
          <span className="flex items-center gap-2 rounded-full bg-on-dark/15 px-3 py-1.5 font-mono text-xs uppercase tracking-[0.08em] text-on-dark">
            {step}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function PageHero({ page, slug }: { page: ContentPageData; slug: PageKey }) {
  const lead = page.intro.find((block) => block.kind === "paragraph");
  const rest = page.intro.filter((block) => block !== lead);
  const hero = pageDesign[slug].hero;
  const photo = hero.kind === "photo" ? hero : null;
  return (
    <>
      <section className="px-2 pt-2 sm:px-3 sm:pt-3">
        <div className="relative mx-auto max-w-[1440px] overflow-hidden rounded-2xl bg-navy text-on-dark">
          {photo && (
            <>
              <img
                src={photo.src}
                alt={photo.alt}
                width={1920}
                height={1080}
                fetchPriority="high"
                className="relative h-72 w-full object-cover sm:absolute sm:inset-0 sm:h-full"
                style={photo.position ? { objectPosition: photo.position } : undefined}
              />
              <div aria-hidden className={cn("page-hero-scrim pointer-events-none absolute inset-0 hidden sm:block", photo.align === "right" && "page-hero-scrim-right")} />
            </>
          )}
          <div className={cn("relative grid gap-10 px-5 pb-10 pt-8 sm:px-10 sm:py-16 lg:px-16", !photo && "lg:grid-cols-[1.2fr_0.8fr] lg:items-center")}>
            <div className={cn(photo && "sm:max-w-2xl", photo?.align === "right" && "sm:ml-auto")}>
              <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 text-xs text-on-dark/75">
                <a href="/" className="hover:text-on-dark">Home</a>
                <ChevronRight className="h-3 w-3" aria-hidden />
                <span aria-current="page">{page.eyebrow}</span>
              </nav>
              <SectionLabel tone="on-dark">{page.eyebrow}</SectionLabel>
              <h1 className="mb-6 max-w-4xl text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">{page.headline}</h1>
              {lead && <p className="max-w-2xl text-lg leading-8 text-on-dark/85">{lead.text}</p>}
            </div>
            {hero.kind !== "photo" && <HeroMotif kind={hero.kind} />}
          </div>
        </div>
      </section>
      <div className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <Blocks blocks={rest} slug={slug} />
          </div>
        </div>
      </div>
    </>
  );
}

/* ---------- Sector tiles (For Employers) ---------- */

export function SectorTiles() {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {sectorTiles.map((tile) => (
        <li key={tile.label} className="relative aspect-[4/3] overflow-hidden rounded-lg bg-muted shadow-soft">
          <img src={tile.src} alt={tile.alt} loading="lazy" width={1200} height={896} className="absolute inset-0 h-full w-full object-cover" style={tile.position ? { objectPosition: tile.position } : undefined} />
          <div aria-hidden className="sector-tile-scrim absolute inset-0" />
          <span className="absolute bottom-3 left-4 right-4 text-base font-semibold text-on-dark">{tile.label}</span>
        </li>
      ))}
    </ul>
  );
}

/* ---------- Page ---------- */

export function FAQAccordion({ items }: { items: { question: string; answer: string }[] }) {
  return (
    <Accordion type="single" collapsible>
      {items.map((item, i) => (
        <AccordionItem key={item.question} value={String(i)}>
          <AccordionTrigger className="py-6 text-base sm:text-lg">{item.question}</AccordionTrigger>
          {/* forceMount keeps answers in the DOM for crawlers while collapsed */}
          <AccordionContent forceMount className="page-copy max-w-3xl">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

const ctaTitles = /Be Part of|Start With|Let's Build|Build a More Visible|Stay Connected|Your Local Network|Tell Us What|Workforce Deserves|Contribute to the Conversation/;

const whatWeMapIcons = [Users, Wrench, BriefcaseBusiness, Route, CalendarCheck, Factory];
const partnerDutyIcons = [Users, ClipboardList, ShieldCheck, Network, BriefcaseBusiness];
const networkElementIcons = [Users, Database, Cpu];
const employerStepIcons = [FileText, ClipboardCheck, MapPin, Users, CheckCircle2];
const partnerJoinIcons = [FileText, Search, BookOpen, Phone];

function SectionBody({ slug, section }: { slug: PageKey; section: ContentSection }) {
  const design = pageDesign[slug];
  const layout = design.layouts?.[section.title];
  const blocks = section.blocks ?? [];
  const cards = blocks.filter((block) => block.kind === "card");
  const pullQuotes = design.pullQuotes;

  switch (layout) {
    case "image": {
      const image = design.images?.[section.title];
      const content = <Blocks blocks={blocks} slug={slug} pullQuotes={pullQuotes} />;
      if (!image) return content;
      return (
        <div className="grid items-start gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <figure className="m-0 overflow-hidden rounded-lg bg-muted shadow-soft">
            <img src={image.src} alt={image.alt} loading="lazy" width={1200} height={896} className="aspect-[4/3] w-full object-cover" style={image.position ? { objectPosition: image.position } : undefined} />
          </figure>
          {content}
        </div>
      );
    }
    case "icon-list":
      return (
        <div className="space-y-8">
          {blocks.map((block, i) =>
            block.kind === "list" ? <IconTileList key={i} block={block} icons={whatWeMapIcons} /> : <Paragraph key={i} text={block.text ?? ""} pullQuotes={pullQuotes} />,
          )}
        </div>
      );
    case "icon-grid": {
      const icons = section.title === "What RojMitra Organises" || section.title === "What We Map" ? whatWeMapIcons : section.title.startsWith("What Does") ? partnerDutyIcons : networkElementIcons;
      return (
        <div className="space-y-8">
          {blocks.map((block, i) => (block.kind === "card" ? null : <Paragraph key={i} text={block.text ?? ""} pullQuotes={pullQuotes} />))}
          <div className={cn("grid auto-rows-fr gap-5", cards.length % 3 === 0 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2 sm:[&>*:last-child:nth-child(odd)]:col-span-2")}>
            {cards.map((card, i) => (
              <IconCard key={card.title} card={card} index={i} slug={slug} icons={icons} />
            ))}
          </div>
        </div>
      );
    }
    case "stepper": {
      const icons = slug === "for-employers" ? employerStepIcons : slug === "become-a-sourcing-partner" ? partnerJoinIcons : stepperIcons;
      return <Stepper cards={cards} slug={slug} icons={icons} />;
    }
    case "scene-cards":
      return <SceneCards cards={cards} slug={slug} />;
    case "diagram":
      return (
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Blocks blocks={blocks} slug={slug} pullQuotes={pullQuotes} />
          <MissingLinkDiagram />
        </div>
      );
    case "profile":
      return (
        <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <Blocks blocks={blocks} slug={slug} pullQuotes={pullQuotes} />
          <WorkerProfileCard />
        </div>
      );
    case "chain":
      return (
        <div className="space-y-10">
          <GeoChain />
          <Blocks blocks={blocks.filter((block) => !(block.kind === "paragraph" && block.text?.startsWith("Village →")))} slug={slug} pullQuotes={pullQuotes} />
        </div>
      );
    case "tabs":
      return <ValueTabs cards={cards} slug={slug} />;
    case "entry-cards":
      return <EntryCards cards={cards} slug={slug} />;
    case "tracker": {
      const intro = blocks.find((block) => block.kind === "paragraph");
      return (
        <div className="space-y-8">
          {intro && <Paragraph text={intro.text ?? ""} />}
          <TrackerCards cards={cards} />
        </div>
      );
    }
    case "topic-cards":
      return <TopicCards cards={cards} />;
    case "empty-illustration":
      return <Blocks blocks={blocks} slug={slug} />;
    case "statements":
      return (
        <div className="grid gap-5 sm:grid-cols-2">
          {blocks.map((block, i) => (
            <blockquote key={i} className="flex h-full flex-col justify-between rounded-lg border border-border bg-sky-pale p-6 sm:p-8">
              <p className="text-xl font-semibold leading-snug text-foreground sm:text-2xl">{block.text}</p>
            </blockquote>
          ))}
        </div>
      );
    case "sectors":
      return (
        <div className="space-y-8">
          <SectorTiles />
          <Blocks blocks={blocks} slug={slug} />
        </div>
      );
    default:
      return <Blocks blocks={blocks} slug={slug} pullQuotes={pullQuotes} />;
  }
}

export function ContentPage({ slug }: { slug: PageKey }) {
  const page: ContentPageData = pages[slug];
  const design = pageDesign[slug];
  const next: ContentPageData = pages[design.next as PageKey];
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-brand focus:px-4 focus:py-2 focus:text-primary-foreground">
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <PageHero page={page} slug={slug} />
        {page.sections.map((section, i) => {
          const cta = ctaTitles.test(section.title);
          const layout = design.layouts?.[section.title];
          const wide = Boolean(layout) || Boolean(section.blocks?.some((block) => block.kind === "card"));
          return (
            <Section key={i} title={section.title} cta={cta} index={i} wide={wide} image={wide ? undefined : design.images?.[section.title]}>
              {section.faq ? <FAQAccordion items={section.faq} /> : <SectionBody slug={slug} section={section} />}
            </Section>
          );
        })}
        <CtaBanner next={{ label: next.eyebrow, href: next.path }} />
      </main>
      <Footer />
    </>
  );
}
