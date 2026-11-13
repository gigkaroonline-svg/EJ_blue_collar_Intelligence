"use client";

import { ArrowRight } from "lucide-react";
import { FormCTA } from "@/components/site/Forms";
import { Reveal } from "@/components/site/primitives";
import { closingCta } from "@/content/cta";
import logo from "@/assets/rojmitra-logo.png";
import { assetUrl } from "@/lib/asset";

/** Shared closing call-to-action for inner pages: brand card with rings, both audiences, and a next-page link. */
export function CtaBanner({ next, actions = closingCta.actions }: { next?: { label: string; href: string } | undefined; actions?: string[] }) {
  return (
    <section className="px-3 py-14 sm:px-6 sm:py-20">
      <Reveal className="cta-rings relative mx-auto max-w-6xl overflow-hidden rounded-2xl bg-gradient-brand px-6 py-12 text-center text-on-dark shadow-lift sm:px-12 sm:py-16">
        <div className="relative">
          <span className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-card shadow-soft">
            <img src={assetUrl(logo)} alt="" width={40} height={40} className="h-9 w-9 object-contain" />
          </span>
          <h2 className="display-type mx-auto max-w-2xl text-3xl sm:text-5xl">{closingCta.title}</h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-on-dark/85 sm:text-lg">{closingCta.text}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            {actions.map((a, i) => <FormCTA key={a} label={a} light={i === 0} ghost={i > 0} />)}
          </div>
          {next && (
            <a href={next.href} className="group mt-8 inline-flex items-center gap-2 text-sm font-medium text-on-dark/85 hover:text-on-dark">
              {closingCta.nextLabel}: {next.label}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </a>
          )}
        </div>
      </Reveal>
    </section>
  );
}
