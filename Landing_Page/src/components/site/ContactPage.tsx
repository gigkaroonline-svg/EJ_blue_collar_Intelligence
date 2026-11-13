"use client";

import { Mail, Phone } from "lucide-react";
import { SubmissionForm } from "@/components/site/Forms";
import { Reveal } from "@/components/site/primitives";
import { Crumb, Label, Shell, wrap } from "@/components/site/StoryPages";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

export function ContactPage() {
  return (
    <Shell>
      <section className="bg-card py-10 sm:py-16">
        <div className={cn(wrap, "text-center")}>
          <div className="flex justify-center">
            <Crumb label="Contact" />
          </div>
          <Label>Contact</Label>
          <h1 className="display-type mx-auto max-w-3xl text-4xl sm:text-5xl">
            Get in touch with RojMitra
          </h1>
          <p className="page-copy mx-auto mt-5 max-w-2xl text-lg">
            Share your enquiry and our team will follow up.
          </p>
        </div>
      </section>

      <section className="bg-sky-pale py-16 sm:py-24">
        <div className={cn(wrap, "grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start")}>
          <Reveal className="lg:sticky lg:top-28">
            <Label>Reach us</Label>
            <h2 className="display-type text-3xl sm:text-4xl">We read every message</h2>
            <p className="page-copy mt-4">
              Use the form for partnerships, employer enquiries, press, or general questions. Prefer
              email? Write to us directly.
            </p>
            <ul className="mt-8 space-y-4">
              <li>
                <a
                  href={`mailto:${site.contact.partnerEmail}`}
                  className="flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 text-sm font-medium text-foreground transition hover:border-brand/40 hover:text-brand"
                >
                  <Mail className="h-4 w-4 shrink-0 text-brand" aria-hidden />
                  {site.contact.partnerEmail}
                </a>
              </li>
              <li className="flex items-start gap-3 rounded-2xl border border-border bg-card px-4 py-3 text-sm text-muted-foreground">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden />
                <span>
                  Add a reachable phone with the right country code so we can follow up when needed.
                </span>
              </li>
            </ul>
          </Reveal>

          <div
            id="contact-form"
            className="scroll-mt-24 rounded-2xl border border-border bg-card p-6 shadow-lift sm:p-10"
          >
            <SubmissionForm formType="contact" />
          </div>
        </div>
      </section>
    </Shell>
  );
}
