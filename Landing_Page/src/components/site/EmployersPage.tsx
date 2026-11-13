"use client";

import {
  BriefcaseBusiness, ClipboardCheck, Database, Handshake, Layers, MapPin, Network,
  Repeat, Route, Search, Send, ShieldCheck, Sparkles, UserCheck, Users, type LucideIcon,
} from "lucide-react";
import { SubmissionForm, FormCTA } from "@/components/site/Forms";
import { IconBadge, Reveal } from "@/components/site/primitives";
import { SectorTiles } from "@/components/site/ContentPage";
import { CtaBanner } from "@/components/site/CtaBanner";
import { Copy, Crumb, FaqBlock, Label, Photo, Shell, cards, ctas, list, noNumber, paras, section, wrap } from "@/components/site/StoryPages";
import { pages } from "@/content/pages";
import { employerPageImages as img } from "@/content/page-design";
import { cn } from "@/lib/utils";

const challengeIcons: LucideIcon[] = [Search, MapPin, Users, Repeat, Route, Handshake];
const serviceIcons: LucideIcon[] = [MapPin, Layers, Network, Route, ClipboardCheck];
const stepIcons: LucideIcon[] = [Send, Search, Database, UserCheck, BriefcaseBusiness];

export function EmployersPage() {
  const page = pages["for-employers"];
  const intro = paras(page.intro);
  const heroCta = ctas(page.intro)[0] ?? "Submit Your Hiring Requirements";
  const challenge = section(page, "The Employer Challenge");
  const better = section(page, "A More Structured View of Workforce Supply");
  const who = section(page, "Who Can Work With RojMitra?");
  const process = section(page, "How the Employer Process Works");
  const submit = section(page, "Submit Your Workforce Requirement");
  const why = section(page, "Why RojMitra?");
  const cp = paras(challenge.blocks);
  const bp = paras(better.blocks);
  const wp = paras(who.blocks);
  const yp = paras(why.blocks);
  const sp = paras(submit.blocks);

  return (
    <Shell>
      {/* Hero: soft photo fading into the page, centred headline */}
      <section className="relative overflow-hidden bg-card">
        <div className={cn(wrap, "relative z-10 pb-10 pt-10 text-center sm:pt-16")}>
          <div className="flex justify-center"><Crumb label={page.eyebrow} /></div>
          <Label>{page.eyebrow}</Label>
          <h1 className="display-type mx-auto max-w-4xl text-4xl sm:text-6xl">{page.headline}</h1>
          <Copy text={intro[0]} className="page-copy mx-auto mt-6 max-w-2xl text-lg" />
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <FormCTA label={heroCta} />
            <a href="#process" className="text-sm font-medium text-brand underline-offset-4 hover:underline">{process.title}</a>
          </div>
        </div>
        <div className="relative mx-auto max-w-[1440px] px-2 sm:px-3">
          <div className="relative overflow-hidden rounded-2xl">
            <Photo image={img.hero} eager className="aspect-[4/3] rounded-2xl sm:aspect-[21/8]" />
            <div aria-hidden className="employer-hero-fade absolute inset-0" />
          </div>
        </div>
      </section>

      {/* Intro split: sticky statement + photo card */}
      <section className="py-16 sm:py-24">
        <div className={cn(wrap, "grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start")}>
          <Reveal className="lg:sticky lg:top-28">
            <h2 className="display-type text-3xl sm:text-4xl">{intro[1]}</h2>
            <div className="mt-5 space-y-4">{intro.slice(2, 4).map((t) => <Copy key={t} text={t} className="page-copy" />)}</div>
            <div className="mt-8 h-1 w-40 overflow-hidden rounded-full bg-sky-pale"><div className="h-full w-1/2 rounded-full bg-brand" /></div>
          </Reveal>
          <Reveal delay={0.08} className="rounded-2xl border border-border bg-surface p-3 shadow-soft">
            <Photo image={img.intro} className="aspect-[4/3]" />
          </Reveal>
        </div>
      </section>

      {/* Challenge: dark band with icon grid */}
      <section className="px-2 sm:px-3">
        <div className="mx-auto max-w-[1440px] rounded-2xl bg-gradient-navy py-16 text-on-dark sm:py-24">
          <div className={cn(wrap, "grid gap-10 lg:grid-cols-[0.8fr_1.2fr]")}>
            <Reveal>
              <Label dark>Challenge</Label>
              <h2 className="display-type text-3xl sm:text-4xl">{challenge.title}</h2>
              <p className="mt-5 text-on-dark/80">{cp[0]}</p>
              <p className="mt-6 border-l-2 border-signal pl-4 text-lg font-medium text-on-dark">{cp[2]}</p>
            </Reveal>
            <ul className="grid gap-4 sm:grid-cols-2">
              {list(challenge.blocks).map((item, i) => {
                const Icon = challengeIcons[i % challengeIcons.length]!;
                return (
                  <Reveal as="li" key={item} delay={i * 0.04} className="glass-dark flex gap-4 rounded-2xl p-5">
                    <IconBadge icon={Icon} tone="on-dark" />
                    <span className="text-sm leading-6 text-on-dark/90">{item}</span>
                  </Reveal>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* Better way: all service cards visible */}
      <section className="py-16 sm:py-24">
        <div className={wrap}>
          <Reveal className="max-w-3xl">
            <Label>Our approach</Label>
            <h2 className="display-type text-3xl sm:text-4xl">{better.title}</h2>
            <div className="mt-5 space-y-3">{bp.map((t) => <p key={t} className="page-copy">{t}</p>)}</div>
          </Reveal>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cards(better.blocks).map((card, i) => {
              const Icon = serviceIcons[i % serviceIcons.length]!;
              return (
                <Reveal
                  as="li"
                  key={card.title}
                  delay={(i % 3) * 0.05}
                  className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-soft transition-colors duration-300 hover:border-brand/30 hover:bg-sky-pale/40"
                >
                  <IconBadge icon={Icon} tone="brand" />
                  <h3 className="mt-6 text-lg font-semibold text-foreground">{card.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{paras(card.blocks)[0]}</p>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Mid-page CTA band */}
      <section className="px-2 sm:px-3">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-6 rounded-2xl bg-navy px-6 py-12 text-on-dark sm:px-12 lg:flex-row lg:items-center lg:justify-between">
          <h2 className="display-type max-w-2xl text-2xl sm:text-3xl">{intro[4]}</h2>
          <FormCTA label={heroCta} light />
        </div>
      </section>

      {/* Who: sectors */}
      <section className="py-16 sm:py-24">
        <div className={wrap}>
          <Reveal className="mx-auto mb-10 max-w-3xl text-center">
            <Label>Industries</Label>
            <h2 className="display-type text-3xl sm:text-4xl">{who.title}</h2>
            <p className="page-copy mt-4">{wp[0]}</p>
          </Reveal>
          <SectorTiles />
          <p className="page-copy mx-auto mt-8 max-w-2xl text-center">{wp[1]}</p>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="scroll-mt-24 bg-surface py-16 sm:py-24">
        <div className={wrap}>
          <Reveal className="mb-10 max-w-2xl">
            <Label>Process</Label>
            <h2 className="display-type text-3xl sm:text-4xl">{process.title}</h2>
          </Reveal>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {cards(process.blocks).map((card, i) => {
              const Icon = stepIcons[i % stepIcons.length]!;
              return (
                <Reveal as="li" key={card.title} delay={i * 0.05} className="card-surface card-lift flex flex-col p-6 sm:last:odd:col-span-2 lg:last:odd:col-span-1">
                  <IconBadge icon={Icon} tone="sky" />
                  <h3 className="mt-5 font-semibold">{noNumber(card.title)}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{paras(card.blocks)[0]}</p>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Form */}
      <section className="py-16 sm:py-24">
        <div className={cn(wrap, "grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start")}>
          <Reveal className="lg:sticky lg:top-28">
            <Label>Get started</Label>
            <h2 className="display-type text-3xl sm:text-4xl">{submit.title}</h2>
            <div className="mt-5 space-y-3">{sp.map((t) => <p key={t} className="page-copy">{t}</p>)}</div>
            <Photo image={img.form} className="mt-8 hidden aspect-[4/3] lg:block" />
          </Reveal>
          <div id="requirement-form" className="scroll-mt-24 rounded-2xl border border-border bg-card p-6 shadow-lift sm:p-10">
            <SubmissionForm formType="employer_requirement" />
          </div>
        </div>
      </section>

      {/* Why RojMitra */}
      <section className="px-2 sm:px-3">
        <div className="mx-auto grid max-w-[1440px] gap-10 overflow-hidden rounded-2xl bg-sky-pale p-6 sm:p-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <Label>EarlyJobs</Label>
            <h2 className="display-type text-3xl sm:text-4xl">{why.title}</h2>
            <div className="mt-5 space-y-3">{yp.slice(0, 3).map((t) => <p key={t} className="page-copy">{t}</p>)}</div>
          </Reveal>
          <Reveal delay={0.08} className="space-y-3">
            {(yp[3] ?? "").split(". ").filter(Boolean).map((t, i) => (
              <div key={t} className={cn("flex items-center gap-4 rounded-2xl p-5 shadow-soft", i === 0 ? "bg-gradient-brand text-on-dark" : "bg-card")}>
                {i === 0 ? <Sparkles className="h-5 w-5 shrink-0" aria-hidden /> : <ShieldCheck className="h-5 w-5 shrink-0 text-brand" aria-hidden />}
                <span className="text-lg font-semibold">{t.replace(/\.$/, "")}.</span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <FaqBlock page={page} />
      <CtaBanner next={{ label: pages["workforce-intelligence"].eyebrow, href: "/workforce-intelligence" }} />
    </Shell>
  );
}
