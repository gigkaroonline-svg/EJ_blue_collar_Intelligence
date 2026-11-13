"use client";

import { Logo } from "@/components/site/Logo";
import { Pill } from "@/components/site/primitives";
import googlePlayLogo from "@/assets/store/google-play.svg";
import { Smartphone } from "lucide-react";
import { footer, navLinks, site } from "@/content/site";
import { assetUrl } from "@/lib/asset";

const companyLinks = [
  { label: "Home", href: "/" },
  ...navLinks.filter((link) =>
    ["/about", "/our-story", "/the-problem"].includes(link.href),
  ),
] as const;

const platformLinks = navLinks.filter((link) =>
  ["/workforce-intelligence", "/how-it-works", "/for-employers", "/government-initiatives", "/blog"].includes(
    link.href,
  ),
);

const connectLinks = [
  { label: "Become a Sourcing Partner", href: "/become-a-sourcing-partner" },
  ...footer.legal,
] as const;

function LinkColumn({ title, links }: { title: string; links: readonly { label: string; href: string }[] }) {
  return (
    <div>
      <p className="mono-label text-muted-foreground">{title}</p>
      <ul className="mt-3 space-y-2">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="text-sm text-foreground/90 transition-colors hover:text-brand"
              {...(link.href.startsWith("mailto:")
                ? {}
                : link.href.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="overflow-hidden border-t border-border bg-card">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-8 px-4 pt-10 sm:px-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-[1.35fr_0.7fr_0.85fr_0.85fr_1.1fr] lg:px-8 lg:pt-12">
        <div className="col-span-2 md:col-span-3 xl:col-span-1">
          <Logo size="md" />
          <p className="mt-3 text-sm font-medium text-foreground">{site.tagline}</p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">{footer.blurb}</p>
          <div className="mt-5">
            <Pill href={footer.partnerCta.href} variant="navy" arrow className="max-w-full font-sans text-xs normal-case tracking-normal">
              {footer.partnerCta.label}
            </Pill>
          </div>
        </div>

        <LinkColumn title="Company" links={companyLinks} />
        <LinkColumn title="Platform" links={platformLinks} />
        <LinkColumn title="Connect" links={connectLinks} />

        <div className="col-span-2 min-w-0 sm:col-span-1 md:col-span-1 xl:col-span-1">
          <p className="mono-label text-muted-foreground">{footer.app.title}</p>
          <div className="mt-3 rounded-lg border border-border bg-sky-pale p-3.5">
            <div className="mb-3 flex items-center gap-2 text-brand">
              <Smartphone aria-hidden className="h-4 w-4" strokeWidth={1.6} />
              <span className="text-sm font-semibold">{footer.app.audience}</span>
            </div>
            <div className="space-y-2">
              {footer.app.stores.map((store) => {
                const content = (
                  <>
                    {store.id === "app-store" ? (
                      <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5 shrink-0 fill-current text-foreground">
                        <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-1.04.017-2.865.652-3.58 1.956-1.534 2.685-.394 6.75 1.06 8.966.72 1.102 1.433 2.205 2.573 2.166 1.14-.04 1.57-.74 2.94-.74 1.356 0 1.77.74 2.948.72 1.108-.017 1.776-1.022 2.496-2.13.78-1.14 1.103-2.24 1.118-2.3-.01-.005-2.146-.822-2.166-3.266-.017-2.43 1.985-3.59 2.016-3.656-.023-.033-1.686-2.476-4.256-2.476zM15.072 4.902c.88-.99 1.44-2.39 1.296-3.902-1.203.033-2.736.84-3.66 1.902-.84.948-1.5 2.46-1.32 3.93 1.404.05 2.82-.732 3.684-1.93z" />
                      </svg>
                    ) : (
                      <img src={assetUrl(googlePlayLogo)} alt="" width={22} height={24} className="h-5 w-5 shrink-0 object-contain" />
                    )}
                    <span className="min-w-0">
                      {!store.href && <span className="block text-[0.6rem] text-muted-foreground">{footer.app.status}</span>}
                      <span className="block text-sm font-semibold text-foreground">{store.label}</span>
                    </span>
                  </>
                );
                const classes = "flex min-h-12 items-center gap-3 rounded-md border border-border bg-card px-3 py-2";
                return store.href ? (
                  <a key={store.id} href={store.href} target="_blank" rel="noopener noreferrer" className={classes}>
                    {content}
                  </a>
                ) : (
                  <div key={store.id} className={classes}>
                    {content}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none mx-auto mt-8 max-w-[1440px] select-none px-2 text-center">
        <p
          aria-hidden
          className="wordmark-outline whitespace-nowrap pb-[0.06em] text-[16vw] font-semibold leading-[1] tracking-[-0.05em] xl:text-[14rem]"
        >
          RojMitra
        </p>
        <p className="mono-label -mt-1 text-muted-foreground sm:-mt-3">by EarlyJobs</p>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 text-center text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:text-left lg:px-8">
          <p>{site.trustLine}</p>
          <p>
            {footer.copyright.split(/(EarlyJobs)/).map((part, index) =>
              part === "EarlyJobs" ? (
                <a
                  key={index}
                  href="https://www.earlyjobs.ai/"
                  className="text-brand underline-offset-2 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  EarlyJobs
                </a>
              ) : (
                <span key={index}>{part}</span>
              ),
            )}
          </p>
          <p>{site.positioning}</p>
        </div>
      </div>
    </footer>
  );
}
