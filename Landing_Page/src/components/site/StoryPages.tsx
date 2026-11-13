"use client";

import type { ReactNode } from "react";
import {
  BookOpen,
  BriefcaseBusiness,
  CalendarCheck,
  Check,
  ChevronRight,
  ClipboardList,
  FileText,
  HeartHandshake,
  Lightbulb,
  MapPin,
  MessageCircle,
  Network,
  Phone,
  Route,
  Search,
  ShieldCheck,
  Sprout,
  Users,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { FAQAccordion, GooglePlayButton } from "@/components/site/ContentPage";
import { FormCTA, SubmissionForm } from "@/components/site/Forms";
import { IconBadge, Reveal, SectionLabel } from "@/components/site/primitives";
import { InlineCopy } from "@/lib/inline-copy";
import { pages, type ContentBlock, type ContentPageData } from "@/content/pages";
import { storyPageImages as img } from "@/content/page-design";
import { cn } from "@/lib/utils";

type Slug = "about" | "our-story" | "become-a-sourcing-partner";

/* ---------- content helpers (copy stays in pages.ts) ---------- */

export function section(page: ContentPageData, title: string) {
  const found = page.sections.find((s) => s.title === title);
  if (!found) throw new Error(`Missing section: ${title}`);
  return found;
}
export const paras = (blocks: ContentBlock[] = []) => blocks.filter((b) => b.kind === "paragraph").map((b) => b.text ?? "");
export const list = (blocks: ContentBlock[] = []) => blocks.find((b) => b.kind === "list")?.items ?? [];
export const ctas = (blocks: ContentBlock[] = []) => blocks.filter((b) => b.kind === "cta").map((b) => b.text ?? "");
export const cards = (blocks: ContentBlock[] = []) => blocks.filter((b) => b.kind === "card");
export const noNumber = (t = "") => t.replace(/^(?:Step\s+)?\d+[.:]\s*/, "");

/** Paragraph with optional markdown-style internal links from content. */
export function Copy({ text, className }: { text?: string | null; className?: string }) {
  if (!text) return null;
  return (
    <p className={className}>
      <InlineCopy text={text} />
    </p>
  );
}

export type Img = { src: string; alt: string; position?: string };

export function Photo({ image, className, eager = false }: { image: Img; className?: string; eager?: boolean }) {
  return (
    <img
      src={image.src}
      alt={image.alt}
      loading={eager ? "eager" : "lazy"}
      width={1200}
      height={900}
      className={cn("h-full w-full rounded-2xl object-cover shadow-soft", className)}
      style={image.position ? { objectPosition: image.position } : undefined}
    />
  );
}

export function Shell({ children }: { children: ReactNode }) {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-brand focus:px-4 focus:py-2 focus:text-primary-foreground">
        Skip to content
      </a>
      <Navbar />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}

export function Crumb({ label, dark = false }: { label: string; dark?: boolean }) {
  return (
    <nav aria-label="Breadcrumb" className={cn("mb-6 flex flex-wrap items-center gap-2 text-xs", dark ? "text-on-dark/75" : "text-muted-foreground")}>
      <a href="/" className={dark ? "hover:text-on-dark" : "hover:text-foreground"}>Home</a>
      <ChevronRight className="h-3 w-3" aria-hidden />
      <span aria-current="page">{label}</span>
    </nav>
  );
}

export const wrap = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8";

export function Label({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return <SectionLabel tone={dark ? "on-dark" : "default"}>{children}</SectionLabel>;
}

export function FaqBlock({ page, intro }: { page: ContentPageData; intro?: string | undefined }) {
  const faq = page.sections.find((s) => s.faq)?.faq ?? [];
  return (
    <section className="py-16 sm:py-24">
      <div className={cn(wrap, "grid gap-10 lg:grid-cols-[0.8fr_1.2fr]")}>
        <Reveal>
          <Label>FAQ</Label>
          <h2 className="display-type text-3xl sm:text-4xl">Frequently Asked Questions</h2>
          {intro && <p className="page-copy mt-4 max-w-sm">{intro}</p>}
        </Reveal>
        <Reveal delay={0.08} className="rounded-2xl border border-border bg-card px-5 shadow-soft sm:px-8">
          <FAQAccordion items={faq} />
        </Reveal>
      </div>
    </section>
  );
}

/* =====================================================================
   ABOUT  — full-bleed photo hero, split "about" intro, photo cards,
   tinted band, image-led impact block, FAQ split, image CTA
   ===================================================================== */

const buildingIcons: LucideIcon[] = [Users, BriefcaseBusiness, Wrench, CalendarCheck, Route, HeartHandshake];

export function AboutPage() {
  const page = pages.about as ContentPageData;
  const intro = paras(page.intro);
  const built = section(page, "Built from Recruitment Experience");
  const why = section(page, "Why RojMitra Was Started");
  const building = section(page, "What We Are Building");
  const village = section(page, "Starting at the Village. Connecting Across India.");
  const vision = paras(section(page, "Our Vision").blocks);
  const closing = section(page, "Be Part of a More Connected Workforce");
  const buildingParas = paras(building.blocks);
  return (
    <Shell>
      {/* Hero */}
      <section className="px-2 pt-2 sm:px-3 sm:pt-3">
        <div className="relative mx-auto flex min-h-[34rem] max-w-[1440px] items-end overflow-hidden rounded-2xl bg-navy sm:min-h-[40rem]">
          <img src={img.aboutHero.src} alt={img.aboutHero.alt} fetchPriority="high" width={1920} height={1080} className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: img.aboutHero.position }} />
          <div aria-hidden className="page-hero-scrim pointer-events-none absolute inset-0" />
          <div className="relative w-full p-4 sm:p-10 lg:p-14">
            <div className="glass-dark max-w-xl rounded-2xl p-6 text-on-dark sm:p-8">
              <Crumb label={page.eyebrow} dark />
              <h1 className="display-type text-4xl leading-[1.05] sm:text-5xl">{page.headline}</h1>
              <Copy text={intro[0]} className="mt-4 text-base leading-7 text-on-dark/85" />
              <div className="mt-6"><FormCTA label={ctas(closing.blocks)[0] ?? "Join as a Sourcing Partner"} /></div>
            </div>
          </div>
        </div>
      </section>

      {/* About split */}
      <section className="py-16 sm:py-24">
        <div className={cn(wrap, "grid gap-10 lg:grid-cols-[0.8fr_1.2fr]")}>
          <Reveal>
            <Label>{page.eyebrow}</Label>
            <h2 className="display-type text-3xl sm:text-4xl">{built.title}</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <Copy text={intro[1]} className="text-xl leading-relaxed text-foreground sm:text-2xl" />
            <Copy text={intro[2]} className="mt-4 text-xl font-semibold text-brand sm:text-2xl" />
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {["Initiative by EarlyJobs", "Started in Bihar", "Consent-based records"].map((fact, i) => (
                <div key={fact} className="rounded-xl border border-border bg-card p-4 shadow-soft">
                  {(() => { const I = [BriefcaseBusiness, MapPin, ShieldCheck][i] ?? Check; return <I className="h-5 w-5 text-brand" aria-hidden strokeWidth={1.7} />; })()}
                  <p className="mt-3 text-sm font-semibold text-foreground">{fact}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
        <div className={cn(wrap, "mt-14")}>
          <div className="grid gap-6 overflow-hidden rounded-2xl bg-surface lg:grid-cols-2">
            <Photo image={img.aboutOffice} className="aspect-[4/3] rounded-none shadow-none lg:aspect-auto" />
            <div className="space-y-4 p-6 sm:p-10">
              {paras(built.blocks).map((t) => <p key={t} className="page-copy">{t}</p>)}
            </div>
          </div>
        </div>
      </section>

      {/* What we are building — photo cards */}
      <section className="bg-surface py-16 sm:py-24">
        <div className={wrap}>
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <Reveal className="max-w-2xl">
              <Label>What we are building</Label>
              <h2 className="display-type text-3xl sm:text-4xl">{building.title}</h2>
            </Reveal>
            <p className="page-copy max-w-md">{buildingParas[0]}</p>
          </div>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {list(building.blocks).map((item, i) => {
              const [lead, ...rest] = item.split(":");
              const photo = img.aboutBuilding[i];
              const Icon = buildingIcons[i] ?? Users;
              return (
                <Reveal as="li" key={item} delay={(i % 3) * 0.06} className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-navy shadow-soft sm:aspect-[4/4.4]">
                  {photo && <img src={photo.src} alt={photo.alt} loading="lazy" width={900} height={1100} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" style={{ objectPosition: photo.position }} />}
                  <div aria-hidden className="sector-tile-scrim absolute inset-0" />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-on-dark">
                    <IconBadge icon={Icon} tone="on-dark" className="mb-3 h-9 w-9" />
                    <h3 className="text-lg font-semibold">{lead}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-on-dark/85">{rest.join(":").trim()}</p>
                  </div>
                </Reveal>
              );
            })}
          </ul>
          {buildingParas[2] && <p className="mt-8 flex items-center gap-2 text-sm text-muted-foreground"><ShieldCheck className="h-4 w-4 text-signal" aria-hidden />{buildingParas[2]}</p>}
        </div>
      </section>

      {/* Why we started — tinted band */}
      <section className="px-2 py-10 sm:px-3">
        <div className="mx-auto max-w-[1440px] rounded-2xl bg-gradient-brand px-5 py-14 text-on-dark sm:px-10 sm:py-20 lg:px-16">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <Label dark>Why we started</Label>
              <h2 className="display-type text-3xl sm:text-4xl">{why.title}</h2>
            </div>
            <p className="text-lg leading-relaxed text-on-dark/85">{paras(why.blocks)[0]}</p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {paras(why.blocks).slice(1).map((t, i) => (
              <Reveal key={t} delay={i * 0.06} className="rounded-2xl border border-on-dark/15 bg-on-dark/10 p-6">
                {(() => { const I = [MapPin, Network, Lightbulb][i] ?? Check; return <I className="h-5 w-5 text-sky-soft" aria-hidden strokeWidth={1.7} />; })()}
                <p className="mt-4 text-base leading-relaxed text-on-dark/90">{t}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Village → India */}
      <section className="py-16 sm:py-24">
        <div className={cn(wrap, "grid items-center gap-10 lg:grid-cols-2")}>
          <Reveal><Photo image={img.aboutVillage} className="aspect-[4/3]" /></Reveal>
          <Reveal delay={0.08}>
            <Label>Our approach</Label>
            <h2 className="display-type text-3xl sm:text-4xl">{village.title}</h2>
            <div className="mt-6 space-y-4">{paras(village.blocks).map((t) => <p key={t} className="page-copy">{t}</p>)}</div>
            <ul className="mt-6 flex flex-wrap gap-2">
              {["Village", "Gram Panchayat", "Block", "District", "State", "India"].map((p, i) => (
                <li key={p} className={cn("rounded-full px-3.5 py-1.5 font-mono text-xs uppercase tracking-[0.08em]", i === 0 ? "bg-gradient-brand text-on-dark" : "bg-sky-pale text-brand")}>{p}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Vision */}
      <section className="border-y border-border bg-sky-pale py-16 sm:py-24">
        <div className={cn(wrap, "max-w-4xl text-center")}>
          <Label>Our vision</Label>
          <p className="display-type text-2xl leading-snug text-foreground sm:text-4xl">{vision[0]}</p>
          <div className="mx-auto mt-8 max-w-2xl space-y-2 text-lg text-muted-foreground">{vision.slice(1, 4).map((t) => <p key={t}>{t}</p>)}</div>
          <p className="mt-8 text-lg font-semibold text-foreground">{vision[4]}</p>
          <p className="mt-2 font-mono text-sm uppercase tracking-[0.14em] text-brand">{vision[5]}</p>
        </div>
      </section>

      <FaqBlock page={page} />

      {/* Closing */}
      <section className="px-2 pb-10 sm:px-3">
        <div className="mx-auto grid max-w-[1440px] overflow-hidden rounded-2xl bg-navy text-on-dark lg:grid-cols-[1.1fr_0.9fr]">
          <div className="p-6 sm:p-12 lg:p-16">
            <h2 className="display-type text-3xl sm:text-4xl">{closing.title}</h2>
            <p className="mt-4 max-w-xl text-on-dark/80">{paras(closing.blocks)[0]}</p>
            <div className="mt-8 flex flex-wrap gap-3">{ctas(closing.blocks).map((c, i) => <FormCTA key={c} label={c} outline={i > 0} />)}</div>
          </div>
          <Photo image={img.aboutClosing} className="aspect-[4/3] rounded-none shadow-none lg:aspect-auto" />
        </div>
      </section>
    </Shell>
  );
}

/* =====================================================================
   OUR STORY — centred title, wide cinematic photo + three cards,
   split realisation block with collage, dark bento, culture grid,
   belief cards, journey cards
   ===================================================================== */

export function OurStoryPage() {
  const page = pages["our-story"] as ContentPageData;
  const intro = paras(page.intro);
  const real = section(page, "The Realisation Behind RojMitra");
  const villageM = section(page, "Why the Village Matters");
  const recruit = section(page, "From Recruitment to Workforce Intelligence");
  const oneVillage = section(page, "Building It One Village at a Time");
  const beliefs = paras(section(page, "What We Believe").blocks);
  const why = section(page, "This Is Why We Are Building RojMitra.");
  const journey = section(page, "Be Part of the Journey");
  const realP = paras(real.blocks);
  const recruitP = paras(recruit.blocks);
  const questionIcons: LucideIcon[] = [Users, MapPin, BriefcaseBusiness, Wrench, Route, CalendarCheck];
  return (
    <Shell>
      {/* Hero */}
      <section className="pt-10 sm:pt-16">
        <div className={cn(wrap, "text-center")}>
          <div className="flex justify-center"><Crumb label={page.eyebrow} /></div>
          <Label>{page.eyebrow}</Label>
          <h1 className="display-type mx-auto max-w-4xl text-4xl leading-[1.05] text-foreground sm:text-6xl">{page.headline}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
            <InlineCopy text={`${intro[0] ?? ""} ${intro[1] ?? ""}`.trim()} />
          </p>
        </div>
        <div className={cn(wrap, "mt-10")}>
          <div className="overflow-hidden rounded-2xl shadow-soft">
            <Photo image={img.storyHero} eager className="aspect-[4/3] rounded-none shadow-none sm:aspect-[16/10]" />
          </div>
          <div className="relative z-10 -mt-10 grid gap-4 px-2 sm:-mt-14 sm:px-8 md:grid-cols-3">
            {[intro[2], intro[3], intro[5]].map((t, i) => (
              <Reveal key={t} delay={i * 0.06} className="rounded-2xl border border-border bg-card p-6 shadow-lift">
                <IconBadge icon={[Sprout, Route, Lightbulb][i] ?? Sprout} />
                <p className={cn("mt-4 leading-relaxed", i === 1 ? "text-lg font-semibold text-foreground" : "page-copy")}>{t}</p>
              </Reveal>
            ))}
          </div>
          <p className="page-copy mx-auto mt-10 max-w-3xl text-center">{intro[4]}</p>
        </div>
      </section>

      {/* Realisation split with collage */}
      <section className="py-16 sm:py-24">
        <div className={cn(wrap, "grid items-center gap-12 lg:grid-cols-2")}>
          <Reveal>
            <Label>The realisation</Label>
            <h2 className="display-type text-3xl sm:text-5xl">{real.title}</h2>
            <div className="mt-6 space-y-4">{realP.slice(0, 4).map((t) => <p key={t} className="page-copy">{t}</p>)}</div>
            <blockquote className="mt-8 border-l-4 border-flame pl-5">
              <p className="text-sm text-muted-foreground">{realP[4]}</p>
              <p className="mt-1 text-xl font-semibold leading-snug text-foreground sm:text-2xl">{realP[5]}</p>
            </blockquote>
          </Reveal>
          <Reveal delay={0.08} className="grid grid-cols-2 gap-4">
            <Photo image={img.storyCollage[0]!} className="row-span-2 aspect-[3/4.4]" />
            <Photo image={img.storyCollage[1]!} className="aspect-square" />
            <div className="flex aspect-square flex-col justify-end rounded-2xl bg-gradient-navy p-5 text-on-dark shadow-soft">
              <MapPin className="h-6 w-6 text-signal" aria-hidden />
              <p className="mt-3 text-lg font-semibold leading-snug">Bihar · Tamil Nadu · home</p>
              <p className="mt-1 text-xs text-on-dark/70">Illustrative journey</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Why the village matters */}
      <section className="bg-surface py-16 sm:py-24">
        <div className={wrap}>
          <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
            <h2 className="display-type text-3xl sm:text-5xl">{villageM.title}</h2>
            <p className="page-copy">{paras(villageM.blocks)[0]} {paras(villageM.blocks)[1]}</p>
          </div>
          <div className="mt-10 grid items-stretch gap-5 md:grid-cols-3">
            {paras(villageM.blocks).slice(2).map((t, i) => (
              <Reveal as="article" key={t} delay={i * 0.06} className="card-surface card-lift flex h-full flex-col overflow-hidden p-2">
                {img.storyVillage[i] && <Photo image={img.storyVillage[i]!} className="aspect-[4/3] rounded-xl shadow-none" />}
                <p className={cn("flex-1 p-4 leading-relaxed", i === 2 ? "font-semibold text-foreground" : "page-copy")}>{t}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Dark bento */}
      <section className="px-2 py-10 sm:px-3">
        <div className="mx-auto max-w-[1440px] rounded-2xl bg-navy px-5 py-14 text-on-dark sm:px-10 sm:py-20 lg:px-16">
          <div className="mx-auto max-w-3xl text-center">
            <Label dark>From recruitment to intelligence</Label>
            <h2 className="display-type text-3xl sm:text-5xl">{recruit.title}</h2>
            <p className="mt-5 text-on-dark/80">{recruitP[0]} {recruitP[1]}</p>
          </div>
          <div className="mt-12 grid gap-4 lg:grid-cols-[1.3fr_1fr]">
            <Photo image={img.storyRecruit} className="aspect-[16/10] shadow-none" />
            <div className="flex flex-col rounded-2xl border border-on-dark/15 bg-on-dark/5 p-5 sm:p-6">
              <p className="text-lg leading-relaxed text-on-dark/90">{recruitP[2]}</p>
              <Photo image={img.storyRecruitAside} className="mt-5 aspect-[16/10] shadow-none" />
              <p className="mt-5 text-sm text-on-dark/70">{recruitP[3]}</p>
            </div>
          </div>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {list(recruit.blocks).map((q, i) => {
              const I = questionIcons[i] ?? Search;
              return (
                <li key={q} className="flex items-center gap-4 rounded-2xl border border-on-dark/15 bg-on-dark/5 p-5 transition hover:bg-on-dark/10">
                  <IconBadge icon={I} tone="on-dark" className="h-10 w-10" />
                  <span className="font-medium">{q}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* One village at a time — photo grid */}
      <section className="py-16 sm:py-24">
        <div className={cn(wrap, "text-center")}>
          <Label>On the ground</Label>
          <h2 className="display-type text-3xl sm:text-5xl">{oneVillage.title}</h2>
          <p className="page-copy mx-auto mt-4 max-w-2xl">{paras(oneVillage.blocks)[0]} {paras(oneVillage.blocks)[1]}</p>
        </div>
        <div className={cn(wrap, "mt-10 grid grid-cols-2 gap-4 md:grid-cols-4")}>
          {img.storyGrid.map((g, i) => (
            <Photo key={g.src} image={g} className={cn("aspect-square", i === 0 && "md:col-span-2 md:row-span-2 md:aspect-auto", i === 3 && "md:col-span-2 md:aspect-[2/1]")} />
          ))}
        </div>
        <div className={cn(wrap, "mt-8 grid gap-4 md:grid-cols-2")}>
          {paras(oneVillage.blocks).slice(2).map((t) => <p key={t} className="page-copy rounded-2xl bg-sky-pale p-6">{t}</p>)}
        </div>
      </section>

      {/* Beliefs */}
      <section className="bg-surface py-16 sm:py-24">
        <div className={wrap}>
          <div className="mx-auto max-w-3xl text-center">
            <Label>What we believe</Label>
            <h2 className="display-type text-3xl sm:text-5xl">What We Believe</h2>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {beliefs.map((b, i) => (
              <Reveal key={b} delay={(i % 2) * 0.06} className={cn("rounded-2xl p-7 sm:p-9", i === 0 ? "bg-gradient-brand text-on-dark" : "border border-border bg-card shadow-soft")}>
                <ShieldCheck className={cn("h-6 w-6", i === 0 ? "text-sky-soft" : "text-brand")} aria-hidden strokeWidth={1.6} />
                <p className={cn("mt-5 text-xl font-semibold leading-snug sm:text-2xl", i !== 0 && "text-foreground")}>{b}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why we're building + journey */}
      <section className="py-16 sm:py-24">
        <div className={cn(wrap, "grid gap-10 lg:grid-cols-2")}>
          <div>
            <h2 className="display-type text-3xl sm:text-4xl">{why.title}</h2>
            <div className="mt-6 space-y-3">{paras(why.blocks).slice(0, 3).map((t) => <p key={t} className="page-copy">{t}</p>)}</div>
            <p className="mt-6 font-mono text-sm uppercase tracking-[0.14em] text-brand">{paras(why.blocks)[3]}</p>
          </div>
          <div>
            <h3 className="mb-5 text-xl font-semibold text-foreground">{journey.title}</h3>
            <div className="grid gap-4">
              {cards(journey.blocks).map((c, i) => (
                <article key={c.title} className={cn("rounded-2xl p-6 sm:p-7", i === 0 ? "bg-navy text-on-dark" : "border border-border bg-sky-pale")}>
                  <h4 className={cn("text-lg font-semibold", i !== 0 && "text-foreground")}>{c.title}</h4>
                  <p className={cn("mt-2 text-sm leading-relaxed", i === 0 ? "text-on-dark/80" : "text-muted-foreground")}>{paras(c.blocks)[0]}</p>
                  <div className="mt-5">{ctas(c.blocks).map((t) => <FormCTA key={t} label={t} />)}</div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Shell>
  );
}

/* =====================================================================
   PARTNER — wave hero with person photo, floating intro card,
   illustrated role cards, dark "get started" band, chips, FAQ, form
   ===================================================================== */

const dutyIcons: LucideIcon[] = [Users, ClipboardList, ShieldCheck, Network, BriefcaseBusiness];
const joinIcons: LucideIcon[] = [FileText, Search, BookOpen, Phone];

function Wave({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 1440 320" preserveAspectRatio="none" className={cn("pointer-events-none absolute inset-x-0 w-full", className)} fill="none">
      <path d="M-20 220 C 260 60, 520 300, 820 170 S 1300 40, 1460 140" className="stroke-sky-soft" strokeWidth="70" strokeLinecap="round" />
      <path d="M-20 220 C 260 60, 520 300, 820 170 S 1300 40, 1460 140" className="stroke-brand" strokeWidth="3" strokeDasharray="2 14" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

export function PartnerPage() {
  const page = pages["become-a-sourcing-partner"] as ContentPageData;
  const intro = paras(page.intro);
  const why = section(page, "Why Local Sourcing Partners Matter");
  const duties = section(page, "What Does a RojMitra Sourcing Partner Do?");
  const who = section(page, "Who Can Become a Sourcing Partner?");
  const where = section(page, "Where Can You Operate?");
  const join = section(page, "How to Join RojMitra");
  const good = section(page, "What Makes a Good Sourcing Partner?");
  const larger = section(page, "Be Part of a Larger Workforce Network");
  const closing = section(page, "Your Local Network Can Make a Difference.");
  const formSection = section(page, "Join as a Sourcing Partner");
  return (
    <Shell>
      {/* Hero */}
      <section className="relative overflow-hidden bg-sky-pale">
        <Wave className="top-1/3 h-56 sm:h-72" />
        <div className={cn(wrap, "relative grid items-end gap-8 pt-10 sm:pt-14 lg:grid-cols-[1.1fr_0.9fr]")}>
          <div className="pb-12 lg:pb-24">
            <Crumb label="Sourcing Partner" />
            <Copy text={intro[0]} className="text-lg font-medium text-muted-foreground" />
            <h1 className="display-type mt-3 text-4xl leading-[1.05] text-foreground sm:text-6xl">{page.headline}</h1>
            <Copy text={intro[4]} className="mt-5 max-w-xl text-lg text-muted-foreground" />
            <div className="mt-8 flex flex-wrap gap-3">
              <FormCTA label="Join as a Sourcing Partner" partnerPage />
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-md">
            <img src={img.partnerHero.src} alt={img.partnerHero.alt} fetchPriority="high" width={900} height={1100} className="aspect-[4/5] w-full rounded-t-[2.5rem] object-cover shadow-lift" style={{ objectPosition: img.partnerHero.position }} />
            <div className="absolute -left-4 top-10 hidden rounded-2xl bg-card p-4 shadow-lift sm:block">
              <p className="flex items-center gap-2 text-sm font-semibold text-foreground"><MapPin className="h-4 w-4 text-flame" aria-hidden />Village-level network</p>
            </div>
            <div className="absolute -right-3 bottom-10 hidden rounded-2xl bg-card p-4 shadow-lift sm:block">
              <p className="flex items-center gap-2 text-sm font-semibold text-foreground"><ShieldCheck className="h-4 w-4 text-signal" aria-hidden />Consent-based</p>
            </div>
          </div>
        </div>
      </section>

      {/* Floating intro card */}
      <section className="relative z-10 -mt-6 px-4 sm:px-6">
        <Reveal className="mx-auto max-w-4xl rounded-2xl border border-border bg-card p-6 text-center shadow-lift sm:p-12">
          <h2 className="display-type text-3xl sm:text-4xl">{why.title}</h2>
          <div className="mt-5 space-y-3">{[intro[1], intro[2], intro[3]].map((t) => <Copy key={t} text={t} className="page-copy" />)}</div>
        </Reveal>
      </section>

      {/* Why + duties */}
      <section className="py-16 sm:py-24">
        <div className={cn(wrap, "grid gap-10 lg:grid-cols-2 lg:items-center")}>
          <div className="space-y-4">{paras(why.blocks).map((t, i) => <p key={t} className={i === 3 ? "text-xl font-semibold text-foreground" : "page-copy"}>{t}</p>)}</div>
          <Photo image={img.partnerWhy} className="aspect-[4/3]" />
        </div>
        <div className={cn(wrap, "mt-20")}>
          <div className="text-center">
            <Label>Your role</Label>
            <h2 className="display-type text-3xl sm:text-4xl">{duties.title}</h2>
            <p className="page-copy mx-auto mt-4 max-w-2xl">{paras(duties.blocks)[0]}</p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {cards(duties.blocks).map((c, i) => {
              const I = dutyIcons[i] ?? Users;
              return (
                <Reveal as="article" key={c.title} delay={i * 0.05} className={cn("card-lift rounded-2xl border p-6 text-center", i === 2 ? "border-brand bg-sky-pale shadow-soft" : "border-border bg-card shadow-soft")}>
                  <span aria-hidden className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-sky-soft text-brand"><I className="h-7 w-7" strokeWidth={1.5} /></span>
                  <h3 className="mt-5 text-base font-semibold text-foreground">{noNumber(c.title)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{paras(c.blocks)[0]}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Dark get-started band */}
      <section className="px-4 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 rounded-2xl bg-navy p-6 text-on-dark sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div>
            <h2 className="display-type text-2xl sm:text-3xl">{closing.title}</h2>
            <p className="mt-2 max-w-2xl text-sm text-on-dark/75">{paras(closing.blocks)[1]}</p>
          </div>
          <FormCTA label="Join as a Sourcing Partner" partnerPage />
        </div>
      </section>

      {/* Who + where */}
      <section className="relative overflow-hidden py-16 sm:py-24">
        <Wave className="bottom-0 h-40 opacity-60" />
        <div className={cn(wrap, "relative grid gap-6 lg:grid-cols-2")}>
          {[who, where].map((s, si) => {
            const p = paras(s.blocks);
            return (
              <Reveal key={s.title} delay={si * 0.06} className="rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-10">
                <IconBadge icon={si === 0 ? Users : MapPin} />
                <h2 className="mt-5 text-2xl font-semibold text-foreground sm:text-3xl">{s.title}</h2>
                <p className="page-copy mt-3">{p[0]} {p[1]}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {list(s.blocks).map((it) => (
                    <li key={it} className="inline-flex items-center gap-2 rounded-full bg-sky-pale px-3.5 py-2 text-sm text-foreground"><Check className="h-3.5 w-3.5 text-brand" aria-hidden />{it.replace(/\.$/, "")}</li>
                  ))}
                </ul>
                <p className="mt-6 text-sm text-muted-foreground">{p[2]}</p>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Join + good partner */}
      <section className="bg-surface py-16 sm:py-24">
        <div className={wrap}>
          <div className="text-center">
            <Label>Joining</Label>
            <h2 className="display-type text-3xl sm:text-4xl">{join.title}</h2>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {cards(join.blocks).map((c, i) => {
              const I = joinIcons[i] ?? FileText;
              return (
                <article key={c.title} className="card-surface card-lift p-6">
                  <IconBadge icon={I} />
                  <h3 className="mt-4 text-lg font-semibold text-foreground">{noNumber(c.title)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{paras(c.blocks)[0]}</p>
                </article>
              );
            })}
          </div>
          <div className="mt-16 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <h2 className="display-type text-3xl sm:text-4xl">{good.title}</h2>
              <p className="page-copy mt-4">{paras(good.blocks).join(" ")}</p>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {list(good.blocks).map((it, i) => (
                <li key={it} className={cn("flex items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-soft", list(good.blocks).length % 2 === 1 && i === list(good.blocks).length - 1 && "sm:col-span-2")}>
                  <HeartHandshake className="h-5 w-5 shrink-0 text-brand" aria-hidden strokeWidth={1.6} />
                  <span className="text-sm font-medium text-foreground">{it}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Larger network */}
      <section className="py-16 sm:py-24">
        <div className={cn(wrap, "grid gap-10 lg:grid-cols-2 lg:items-center")}>
          <Photo image={img.partnerNetwork} className="aspect-[4/3]" />
          <div>
            <Label>EarlyJobs</Label>
            <h2 className="display-type text-3xl sm:text-4xl">{larger.title}</h2>
            <div className="mt-5 space-y-4">{paras(larger.blocks).map((t) => <p key={t} className="page-copy">{t}</p>)}</div>
          </div>
        </div>
      </section>

      <FaqBlock page={page} intro={paras(closing.blocks)[0]} />

      {/* Form */}
      <section id="partner-form" className="scroll-mt-24 bg-sky-pale py-16 sm:py-24">
        <div className={cn(wrap, "grid gap-10 lg:grid-cols-[0.8fr_1.2fr]")}>
          <div>
            <h2 className="display-type text-3xl sm:text-4xl">{formSection.title}</h2>
            <p className="page-copy mt-4">{cards(join.blocks)[0] ? paras(cards(join.blocks)[0]!.blocks)[0] : null}</p>
            <div className="mt-8 rounded-2xl border border-border bg-card p-5">
              <p className="flex items-center gap-2 text-sm font-medium text-foreground"><MessageCircle className="h-4 w-4 text-brand" aria-hidden />{paras(closing.blocks)[2]}</p>
              <div className="mt-4"><FormCTA label="Submit Your Hiring Requirements" /></div>
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 text-foreground shadow-lift sm:p-10">
            <SubmissionForm formType="sourcing_partner_application" />
            <GooglePlayButton />
          </div>
        </div>
      </section>
    </Shell>
  );
}

export type { Slug };
