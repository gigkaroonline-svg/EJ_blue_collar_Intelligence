"use client";

import {
  ArrowUpRight, BarChart3, BriefcaseBusiness, Building2, Check, Cpu, Database, ExternalLink, Factory, Landmark, MapPin,
  Network, Route, Search, ShieldCheck, Sparkles, UserPlus, Users, type LucideIcon,
} from "lucide-react";
import { FormCTA } from "@/components/site/Forms";
import { IconBadge, Reveal } from "@/components/site/primitives";
import { CtaBanner } from "@/components/site/CtaBanner";
import { Copy, Crumb, FaqBlock, Label, Photo, Shell, cards, ctas, list, noNumber, paras, section, wrap, type Img } from "@/components/site/StoryPages";
import { pages, type ContentBlock, type ContentPageData } from "@/content/pages";
import { insightPageImages as img, pageDesign } from "@/content/page-design";
import { InlineCopy } from "@/lib/inline-copy";
import { cn } from "@/lib/utils";

type Slug = "how-it-works" | "workforce-intelligence" | "government-initiatives";

function closing(slug: Slug) {
  const next = pages[pageDesign[slug].next as keyof typeof pages] as ContentPageData;
  return <CtaBanner next={{ label: next.eyebrow, href: next.path }} />;
}

/** Two audience cards (employers / partners) used to close each page before the shared banner. */
function AudiencePair({ items, dark = false }: { items: ContentBlock[]; dark?: boolean }) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {items.map((card, i) => {
        const Icon = i === 0 ? BriefcaseBusiness : UserPlus;
        const label = ctas(card.blocks)[0];
        return (
          <Reveal key={card.title} delay={i * 0.06} className={cn("flex h-full min-w-0 flex-col rounded-2xl p-6 sm:p-8", dark ? "glass-dark text-on-dark" : i === 0 ? "border border-border bg-card shadow-soft" : "bg-brand text-primary-foreground shadow-lift")}>
            <IconBadge icon={Icon} tone={dark || i === 1 ? "on-dark" : "brand"} />
            <h3 className="mt-5 text-xl font-semibold">{card.title}</h3>
            <div className="mt-3 flex-1 space-y-3">
              {paras(card.blocks).map((t) => <p key={t} className={cn("text-sm leading-6", dark || i === 1 ? "text-on-dark/85" : "text-muted-foreground")}>{t}</p>)}
            </div>
            {list(card.blocks).length > 0 && (
              <ul className="mt-5 space-y-2">
                {list(card.blocks).map((it) => (
                  <li key={it} className="flex gap-2 text-sm leading-6"><Check aria-hidden className={cn("mt-1 h-4 w-4 shrink-0", dark || i === 1 ? "text-on-dark" : "text-signal")} />{it}</li>
                ))}
              </ul>
            )}
            {label && <div className="mt-6"><FormCTA label={label} light={dark || i === 1} partnerPage={i === 1} /></div>}
          </Reveal>
        );
      })}
    </div>
  );
}

/* ================= How It Works — arched-photo, warm editorial (Galieo reference) ================= */

const stepIcons: LucideIcon[] = [MapPin, Users, Database, Network, Search, Route];

export function HowItWorksPage() {
  const page = pages["how-it-works"] as ContentPageData;
  const intro = paras(page.intro);
  const steps = cards(section(page, "How the RojMitra Network Works").blocks);
  const ways = section(page, "Two Ways to Become Part of RojMitra");
  const ground = section(page, "Local Relationships Support Better Workforce Records");
  const start = section(page, "Start With Your Workforce Requirement.");
  const gp = paras(ground.blocks);
  return (
    <Shell>
      {/* Hero: centred headline flanked by arched photos */}
      <section className="px-2 pt-2 sm:px-3 sm:pt-3">
        <div className="relative mx-auto max-w-[1440px] overflow-hidden rounded-2xl bg-navy px-5 pb-0 pt-10 text-on-dark sm:px-10 sm:pt-14 lg:px-16 lg:pb-16">
          <div aria-hidden className="cta-rings pointer-events-none absolute inset-0 opacity-60" />
          <div className="relative grid items-end gap-8 lg:grid-cols-[0.8fr_1.4fr_0.8fr]">
            <div className="hidden lg:block"><ArchPhoto image={img.howArchLeft} className="h-80" /></div>
            <Reveal className="text-center lg:pb-10">
              <div className="flex justify-center"><Crumb label={page.eyebrow} dark /></div>
              <Label dark>{page.eyebrow}</Label>
              <h1 className="display-type mx-auto max-w-2xl text-4xl leading-tight sm:text-5xl lg:text-6xl">{page.headline}</h1>
              <Copy text={intro[0]} className="mx-auto mt-6 max-w-xl text-base leading-7 text-on-dark/80 sm:text-lg" />
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <FormCTA label={ctas(cards(start.blocks)[0]?.blocks)[0] ?? "Submit Your Hiring Requirements"} light />
                <FormCTA label={ctas(cards(start.blocks)[1]?.blocks)[0] ?? "Join as a Sourcing Partner"} ghost />
              </div>
            </Reveal>
            <div className="grid grid-cols-2 gap-4 lg:block">
              <div className="lg:hidden"><ArchPhoto image={img.howArchLeft} className="h-56 sm:h-72" /></div>
              <ArchPhoto image={img.howArchRight} className="h-56 sm:h-72 lg:h-96 lg:translate-y-16" />
            </div>
          </div>
        </div>
      </section>

      {/* Split intro with floating chip */}
      <section className="py-16 sm:py-24">
        <div className={cn(wrap, "grid gap-12 lg:grid-cols-2 lg:items-center")}>
          <Reveal className="relative">
            <Photo image={img.howIntro} className="aspect-[4/5] max-h-[560px] rounded-2xl" />
            <div className="absolute -bottom-5 left-4 flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 shadow-lift sm:-left-6">
              <IconBadge icon={MapPin} tone="signal" />
              <span className="text-sm font-semibold text-foreground">{cards(ground.blocks)[0]?.title} · {cards(ground.blocks)[1]?.title} · {cards(ground.blocks)[2]?.title}</span>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <Label>{page.eyebrow}</Label>
            <h2 className="display-type text-3xl sm:text-4xl">{ground.title}</h2>
            <div className="mt-6 space-y-4">{intro.slice(1).map((t) => <Copy key={t} text={t} className="page-copy" />)}</div>
            <p className="mt-6 text-sm font-medium leading-6 text-foreground">{gp[0]}</p>
            <ul className="mt-4 space-y-3">
              {cards(ground.blocks).map((card, i) => {
                const Icon = [Users, Database, Cpu][i] ?? ShieldCheck;
                return (
                  <li key={card.title} className="flex gap-3 rounded-xl border border-border bg-card p-4 shadow-soft">
                    <IconBadge icon={Icon} tone="brand" className="h-9 w-9 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground">{card.title}</p>
                      {paras(card.blocks).map((t) => (
                        <p key={t} className="mt-1 text-sm leading-6 text-muted-foreground">
                          {t}
                        </p>
                      ))}
                    </div>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Process cards (unnumbered) */}
      <section className="bg-surface py-16 sm:py-24">
        <div className={wrap}>
          <Reveal className="mx-auto mb-12 max-w-2xl text-center">
            <Label>Process</Label>
            <h2 className="display-type text-3xl sm:text-4xl">{section(page, "How the RojMitra Network Works").title}</h2>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {steps.map((card, i) => {
              const Icon = stepIcons[i % stepIcons.length]!;
              const ps = paras(card.blocks);
              const items = list(card.blocks);
              return (
                <Reveal key={card.title} delay={(i % 3) * 0.05} className="group flex h-full min-w-0 flex-col rounded-2xl border border-border bg-card p-6 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-lift sm:p-7">
                  <IconBadge icon={Icon} tone={i % 2 ? "signal" : "brand"} />
                  <h3 className="mt-5 text-xl font-semibold leading-snug">{noNumber(card.title)}</h3>
                  <div className="mt-3 space-y-3">{ps.map((t) => <p key={t} className="text-sm leading-6 text-muted-foreground">{t}</p>)}</div>
                  {items.length > 0 && (
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {items.map((it) => <li key={it} className="rounded-full bg-sky-pale px-3 py-1 text-xs font-medium text-brand">{it}</li>)}
                    </ul>
                  )}
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Two ways: dark split band */}
      <section className="px-2 py-16 sm:px-3 sm:py-24">
        <div className="mx-auto grid max-w-[1440px] overflow-hidden rounded-2xl bg-navy text-on-dark lg:grid-cols-[0.8fr_1.2fr]">
          <div className="relative min-h-72">
            <img src={img.howBand.src} alt={img.howBand.alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
            <div aria-hidden className="employer-hero-fade absolute inset-0 opacity-90" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10">
              <Label dark>Get involved</Label>
              <h2 className="display-type text-3xl sm:text-4xl">{ways.title}</h2>
            </div>
          </div>
          <div className="p-5 sm:p-10"><AudiencePair items={cards(ways.blocks)} dark /></div>
        </div>
      </section>

      {/* Pillars: photo cards */}
      <section className="pb-16 sm:pb-24">
        <div className={wrap}>
          <Reveal className="mx-auto mb-12 max-w-2xl text-center">
            <Label>Foundation</Label>
            <h2 className="display-type text-3xl sm:text-4xl">{ground.title}</h2>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {cards(ground.blocks).map((card, i) => (
              <Reveal key={card.title} delay={i * 0.06} className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
                <Photo image={img.howPillars[i]!} className="aspect-[4/3] rounded-none shadow-none" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold">{card.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{paras(card.blocks)[0]}</p>
                </div>
              </Reveal>
            ))}
          </div>
          {gp[1] && <p className="page-copy mx-auto mt-10 max-w-3xl text-center text-lg">{gp[1]}</p>}
        </div>
      </section>

      <FaqBlock page={page} />

      <section className="py-16 sm:py-20">
        <div className={wrap}>
          <Reveal className="mb-8 max-w-2xl">
            <h2 className="display-type text-3xl sm:text-4xl">{start.title}</h2>
            {paras(start.blocks).map((t) => <p key={t} className="page-copy mt-4">{t}</p>)}
          </Reveal>
          <AudiencePair items={cards(start.blocks)} />
        </div>
      </section>
      {closing("how-it-works")}
    </Shell>
  );
}

function ArchPhoto({ image, className }: { image: Img; className?: string }) {
  return <img src={image.src} alt={image.alt} loading="eager" className={cn("w-full rounded-t-full rounded-b-3xl object-cover shadow-lift", className)} style={image.position ? { objectPosition: image.position } : undefined} />;
}

/* ================= Workforce Intelligence — bright card magazine (blog-grid reference) ================= */

const mapIcons: LucideIcon[] = [Users, Sparkles, BriefcaseBusiness, Route, BarChart3, Factory];

export function WorkforceIntelligencePage() {
  const page = pages["workforce-intelligence"] as ContentPageData;
  const intro = paras(page.intro);
  const heroCtas = ctas(page.intro);
  const what = section(page, "What Is Workforce Intelligence?");
  const map = section(page, "What RojMitra Organises");
  const village = section(page, "From Village-Level Records to Wider Workforce Views");
  const value = section(page, "How Workforce Intelligence Creates Value");
  const tech = section(page, "Technology Organises the Data; Local Context Helps Explain It");
  const built = section(page, "Built for a More Visible Workforce");
  const last = section(page, "Let's Build a Better Understanding of India's Workforce.");
  const wp = paras(what.blocks);
  const vp = paras(village.blocks);
  const tp = paras(tech.blocks);
  return (
    <Shell>
      {/* Centered title over soft rings */}
      <section className="relative overflow-hidden pb-10 pt-12 sm:pt-16">
        <div aria-hidden className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-sky-pale blur-2xl" />
        <div aria-hidden className="pointer-events-none absolute -right-20 top-32 h-56 w-56 rounded-full bg-signal-pale blur-2xl" />
        <div className={cn(wrap, "relative text-center")}>
          <div className="flex justify-center"><Crumb label={page.eyebrow} /></div>
          <Label>{page.eyebrow}</Label>
          <h1 className="display-type mx-auto max-w-4xl text-4xl leading-tight sm:text-5xl lg:text-6xl">{page.headline}</h1>
          <Copy text={intro[0]} className="page-copy mx-auto mt-6 max-w-2xl text-lg" />
        </div>
      </section>

      {/* Featured split card */}
      <section className="pb-16 sm:pb-24">
        <div className={cn(wrap)}>
          <Reveal className="grid gap-8 rounded-2xl border border-border bg-card p-4 shadow-lift sm:p-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:p-8">
            <div className="relative">
              <Photo image={img.wiFeature} eager className="aspect-[16/11] rounded-2xl" />
              <span className="absolute left-4 top-4 rounded-full bg-brand px-3 py-1 font-mono text-xs uppercase tracking-[0.1em] text-primary-foreground">Intelligence</span>
            </div>
            <div className="px-1 pb-2 lg:px-2">
              <div className="space-y-4">{intro.slice(1).map((t) => <Copy key={t} text={t} className="page-copy" />)}</div>
              <div className="mt-8 flex flex-wrap gap-3">{heroCtas.map((c, i) => <FormCTA key={c} label={c} light={i === 0} outline={i > 0} />)}</div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* What is WI: text + tag cloud */}
      <section className="bg-surface py-16 sm:py-24">
        <div className={cn(wrap, "grid gap-10 lg:grid-cols-2")}>
          <Reveal>
            <Label>Definition</Label>
            <h2 className="display-type text-3xl sm:text-4xl">{what.title}</h2>
            <div className="mt-6 space-y-4">{wp.slice(0, 3).map((t) => <p key={t} className="page-copy">{t}</p>)}</div>
          </Reveal>
          <Reveal delay={0.05} className="self-center rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8">
            <ul className="grid gap-3 sm:grid-cols-2">
              {list(what.blocks).map((it, i) => {
                const Icon = mapIcons[i % mapIcons.length]!;
                return <li key={it} className="flex items-start gap-3 rounded-2xl bg-sky-pale p-4 text-sm leading-6 text-foreground"><Icon aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-brand" />{it}</li>;
              })}
            </ul>
            {wp[3] && <p className="mt-5 border-l-2 border-signal pl-4 text-sm font-medium leading-6 text-foreground">{wp[3]}</p>}
          </Reveal>
        </div>
      </section>

      {/* What we map: photo card grid */}
      <section className="py-16 sm:py-24">
        <div className={wrap}>
          <Reveal className="mx-auto mb-12 max-w-2xl text-center">
            <Label>Coverage</Label>
            <h2 className="display-type text-3xl sm:text-4xl">{map.title}</h2>
          </Reveal>
          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {cards(map.blocks).map((card, i) => {
              const Icon = mapIcons[i % mapIcons.length]!;
              return (
                <Reveal key={card.title} delay={(i % 3) * 0.05} className="group min-w-0">
                  <div className="relative overflow-hidden rounded-2xl">
                    <Photo image={img.wiMap[i]!} className="aspect-[4/3] rounded-2xl transition duration-500 group-hover:scale-105" />
                    <span className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-card text-brand shadow-soft"><Icon aria-hidden className="h-4 w-4" /></span>
                  </div>
                  <h3 className="mt-5 text-xl font-semibold leading-snug">{noNumber(card.title)}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{paras(card.blocks)[0]}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Village to national: editorial band */}
      <section className="px-2 sm:px-3">
        <div className="mx-auto max-w-[1440px] rounded-2xl bg-navy py-16 text-on-dark sm:py-20">
          <div className={cn(wrap, "grid gap-10 lg:grid-cols-[0.9fr_1.1fr]")}>
            <Reveal>
              <Label dark>Scale</Label>
              <h2 className="display-type text-3xl sm:text-4xl">{village.title}</h2>
              <p className="mt-6 text-lg leading-8 text-on-dark/85">{vp[0]}</p>
            </Reveal>
            <div className="grid gap-4 sm:grid-cols-2">
              {vp.slice(1).map((t, i) => (
                <Reveal key={t} delay={i * 0.04} className="glass-dark rounded-2xl p-5 text-sm leading-6 text-on-dark/90">{t}</Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Value: three promo cards */}
      <section className="py-16 sm:py-24">
        <div className={wrap}>
          <Reveal className="mb-12 max-w-2xl">
            <Label>Value</Label>
            <h2 className="display-type text-3xl sm:text-4xl">{value.title}</h2>
          </Reveal>
          <div className="grid gap-5 lg:grid-cols-3">
            {cards(value.blocks).map((card, i) => {
              const tone = ["border border-border bg-card", "bg-brand text-primary-foreground", "bg-sky-pale text-foreground"][i % 3];
              const Icon = [Building2, Users, Landmark][i % 3]!;
              const label = ctas(card.blocks)[0];
              return (
                <Reveal key={card.title} delay={i * 0.06} className={cn("flex h-full flex-col rounded-2xl p-7 shadow-soft", tone)}>
                  <IconBadge icon={Icon} tone={i === 1 ? "on-dark" : "brand"} />
                  <h3 className="mt-5 text-xl font-semibold">{card.title}</h3>
                  <div className="mt-3 flex-1 space-y-3">{paras(card.blocks).map((t) => <p key={t} className={cn("text-sm leading-6", i === 1 ? "text-on-dark/85" : "text-muted-foreground")}>{t}</p>)}</div>
                  {label && <div className="mt-6"><FormCTA label={label} light={i === 1} /></div>}
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Technology + tags */}
      <section className="bg-surface py-16 sm:py-24">
        <div className={cn(wrap, "grid gap-12 lg:grid-cols-2 lg:items-center")}>
          <Reveal>
            <Label>Approach</Label>
            <h2 className="display-type text-3xl sm:text-4xl">{tech.title}</h2>
            <div className="mt-6 space-y-4">{tp.slice(0, 4).map((t) => <p key={t} className="page-copy">{t}</p>)}</div>
            <ul className="mt-6 flex flex-wrap gap-2">
              {list(tech.blocks).map((it) => <li key={it} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground"><Cpu aria-hidden className="h-3.5 w-3.5 text-brand" />{it}</li>)}
            </ul>
            {tp[4] && <p className="page-copy mt-6">{tp[4]}</p>}
          </Reveal>
          <Reveal delay={0.05}><Photo image={img.wiTech} className="aspect-[4/5] max-h-[620px] rounded-2xl" /></Reveal>
        </div>
      </section>

      {/* Built for */}
      <section className="py-16 sm:py-24">
        <div className={cn(wrap, "grid gap-12 lg:grid-cols-2 lg:items-center")}>
          <Reveal className="order-last lg:order-first"><Photo image={img.wiBuilt} className="aspect-[16/11] rounded-2xl" /></Reveal>
          <Reveal delay={0.05}>
            <Label>Vision</Label>
            <h2 className="display-type text-3xl sm:text-4xl">{built.title}</h2>
            <div className="mt-6 space-y-4">{paras(built.blocks).map((t) => <p key={t} className="page-copy">{t}</p>)}</div>
          </Reveal>
        </div>
      </section>

      <FaqBlock page={page} />
      <section className="py-16 sm:py-20">
        <div className={wrap}>
          <Reveal className="mb-8 max-w-2xl">
            <h2 className="display-type text-3xl sm:text-4xl">{last.title}</h2>
            {paras(last.blocks).map((t) => <p key={t} className="page-copy mt-4">{t}</p>)}
          </Reveal>
          <AudiencePair items={cards(last.blocks)} />
        </div>
      </section>
      {closing("workforce-intelligence")}
    </Shell>
  );
}

/* ================= Government Initiatives — editorial newsroom (magazine reference) ================= */

function parseTracker(card: ContentBlock) {
  const ps = paras(card.blocks);
  const government = ps.find((t) => t.startsWith("Government: "))?.slice(12) ?? "";
  const focus = ps.find((t) => t.startsWith("Focus: "))?.slice(7) ?? "";
  const linkText = ps.find((t) => /^(Official platform|App listing|Press release): https?:\/\//.test(t));
  const m = linkText?.match(/^(Official platform|App listing|Press release): (https?:\/\/\S+)$/);
  const rest = ps.filter((t) => t !== `Government: ${government}` && t !== `Focus: ${focus}` && t !== linkText && !t.startsWith("Technology partner:"));
  return { government, focus, level: /Government of India|Ministry/i.test(government) ? "Central" : "State", link: m ? { label: m[1]!, href: m[2]! } : null, rest };
}

function TrackerArticle({ card, image }: { card: ContentBlock; image?: Img | undefined }) {
  const t = parseTracker(card);
  return (
    <article className="flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
      {image && <Photo image={image} className="aspect-[16/10] rounded-none shadow-none" />}
      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <div className="mb-4 flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-[0.1em]">
          <span className={cn("rounded-full px-3 py-1", t.level === "Central" ? "bg-navy text-on-dark" : "bg-sky-pale text-brand")}>{t.level}</span>
          {t.focus && <span className="text-muted-foreground">{t.focus}</span>}
        </div>
        <h3 className="display-type text-xl leading-tight sm:text-2xl">{noNumber(card.title)}</h3>
        <p className="mt-3 text-sm leading-6 text-foreground"><strong className="font-semibold">Government:</strong> {t.government}</p>
        <div className="mt-4 flex-1 space-y-3">
          {t.rest.map((x) => x.startsWith("Why it matters:")
            ? <p key={x} className="rounded-xl border-l-4 border-signal bg-signal-pale p-4 text-sm leading-6 text-foreground">{x}</p>
            : <p key={x} className="text-sm leading-6 text-foreground/90">{x}</p>)}
        </div>
        {t.link && (
          <a href={t.link.href} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-navy px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-on-dark transition hover:bg-brand">
            {t.link.label}<ExternalLink aria-hidden className="h-3.5 w-3.5" />
          </a>
        )}
      </div>
    </article>
  );
}

export function GovernmentPage() {
  const page = pages["government-initiatives"] as ContentPageData;
  const intro = paras(page.intro);
  const heroCtas = ctas(page.intro);
  const tracking = section(page, "Government Initiatives We Are Tracking");
  const why = section(page, "Why These Initiatives Matter");
  const fits = section(page, "How RojMitra Relates to Public Workforce Initiatives");
  const follow = section(page, "Follow Developments in India's Workforce Ecosystem");
  const build = section(page, "Build a More Visible Workforce Ecosystem");
  const tc = cards(tracking.blocks);
  const levels = Array.from(new Set(tc.map((c) => parseTracker(c).level)));
  const fp = paras(fits.blocks);
  const yp = paras(why.blocks);
  const trackerImages = [img.govFeature, img.govHaryana, img.govMigrant];
  return (
    <Shell>
      {/* Photo hero with overlaid headline */}
      <section className="px-2 pt-2 sm:px-3 sm:pt-3">
        <div className="relative mx-auto max-w-[1440px] overflow-hidden rounded-2xl bg-navy text-on-dark">
          <img src={img.govHero.src} alt={img.govHero.alt} fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: img.govHero.position }} />
          <div aria-hidden className="employer-hero-fade absolute inset-0" />
          <div className="relative flex min-h-[460px] flex-col justify-end px-5 pb-10 pt-24 sm:min-h-[560px] sm:px-10 lg:px-16 lg:pb-14">
            <Crumb label={page.eyebrow} dark />
            <h1 className="display-type max-w-4xl text-4xl leading-tight sm:text-5xl lg:text-6xl">{page.headline}</h1>
            <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_auto] lg:items-end">
              <Copy text={intro[0]} className="max-w-2xl text-base leading-7 text-on-dark/90 sm:text-lg" />
              <div className="flex flex-wrap gap-3">{heroCtas.map((c, i) => <FormCTA key={c} label={c} light={i === 0} outline={i > 0} />)}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Intro lines as an editorial strip */}
      <section className="border-b border-border py-12">
        <div className={cn(wrap, "grid gap-6 md:grid-cols-3")}>
          {intro.slice(1).map((t, i) => (
            <Reveal key={t} delay={i * 0.04} className="border-t-2 border-foreground pt-4 text-sm leading-6 text-foreground/80">
              <InlineCopy text={t} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Tracker: equal three-card grid */}
      <section className="py-16 sm:py-24">
        <div className={wrap}>
          <Reveal className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="display-type text-4xl sm:text-5xl lg:text-6xl">{tracking.title}</h2>
            <p className="page-copy mx-auto mt-5">{paras(tracking.blocks)[0]}</p>
            <div className="mt-6 flex flex-wrap justify-center gap-2 font-mono text-xs uppercase tracking-[0.1em]">
              {levels.map((l) => <span key={l} className="rounded-full border border-border px-3 py-1 text-foreground/70">{l}</span>)}
              <span className="rounded-full border border-border px-3 py-1 text-foreground/70">{tc.length} initiatives</span>
            </div>
          </Reveal>
          <div className="grid items-stretch gap-6 md:grid-cols-2 xl:grid-cols-3">
            {tc.map((card, i) => (
              <Reveal key={card.title} delay={(i % 3) * 0.05} className="h-full">
                <TrackerArticle card={card} image={trackerImages[i]} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why: split with photo + divider list */}
      <section className="bg-surface py-16 sm:py-24">
        <div className={cn(wrap, "grid gap-12 lg:grid-cols-2 lg:items-start")}>
          <Reveal>
            <Label>Context</Label>
            <h2 className="display-type text-3xl sm:text-4xl">{why.title}</h2>
            <div className="mt-6 space-y-4">{yp.slice(0, 2).map((t) => <p key={t} className="page-copy">{t}</p>)}</div>
            <Photo image={img.govWhy} className="mt-8 aspect-[16/10] rounded-2xl" />
          </Reveal>
          <Reveal delay={0.05}>
            <ul className="divide-y divide-border rounded-2xl border border-border bg-card px-6 shadow-soft">
              {list(why.blocks).map((it) => <li key={it} className="flex items-start gap-3 py-5 text-base leading-7 text-foreground"><ArrowUpRight aria-hidden className="mt-1 h-4 w-4 shrink-0 text-signal" />{it}</li>)}
            </ul>
            {yp[2] && <p className="page-copy mt-6">{yp[2]}</p>}
          </Reveal>
        </div>
      </section>

      {/* Where we fit: stacked editorial, no orphan column */}
      <section className="py-16 sm:py-24">
        <div className={wrap}>
          <Reveal className="max-w-3xl">
            <Label>Our role</Label>
            <h2 className="display-type text-3xl sm:text-4xl">{fits.title}</h2>
            <p className="mt-6 text-xl font-semibold leading-snug text-foreground sm:text-2xl">{fp[0]}</p>
          </Reveal>
          <Reveal delay={0.05} className="mt-10 grid gap-5 sm:grid-cols-2">
            {fp.slice(1).map((t) => (
              <p key={t} className="rounded-2xl border border-border bg-card p-5 text-base leading-7 text-foreground/85 shadow-soft sm:p-6">
                {t}
              </p>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Follow: dark strip */}
      <section className="px-2 sm:px-3">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-6 rounded-2xl bg-navy px-6 py-12 text-on-dark sm:px-12 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="display-type text-2xl sm:text-3xl">{follow.title}</h2>
            {paras(follow.blocks).map((t) => <p key={t} className="mt-3 text-sm leading-6 text-on-dark/85">{t}</p>)}
          </div>
          <div className="shrink-0">{ctas(follow.blocks).map((c) => <FormCTA key={c} label={c} light />)}</div>
        </div>
      </section>

      <div className="pt-8"><FaqBlock page={page} /></div>
      <section className="py-12">
        <div className={cn(wrap, "max-w-3xl text-center")}>
          <h2 className="display-type text-3xl sm:text-4xl">{build.title}</h2>
          {paras(build.blocks).map((t) => <p key={t} className="page-copy mx-auto mt-4">{t}</p>)}
          <div className="mt-8 flex flex-wrap justify-center gap-3">{ctas(build.blocks).map((c, i) => <FormCTA key={c} label={c} outline={i > 0} />)}</div>
        </div>
      </section>
      {closing("government-initiatives")}
    </Shell>
  );
}
