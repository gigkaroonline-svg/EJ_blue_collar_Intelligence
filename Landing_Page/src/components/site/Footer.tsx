"use client";

import { Logo } from "@/components/site/Logo";
import { Pill } from "@/components/site/primitives";
import appleLogo from "@/assets/store/apple.svg";
import googlePlayLogo from "@/assets/store/google-play.svg";
import { footer, navLinks, site } from "@/content/site";
import { assetUrl } from "@/lib/asset";
import { cn } from "@/lib/utils";

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
          <div className="mt-3 rounded-xl border border-border bg-sky-pale p-3.5">
            <div className="mb-3 flex items-center gap-3">
              <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-brand text-on-dark shadow-soft">
                <svg aria-hidden viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                  <path
                    fillRule="evenodd"
                    d="M8.5 1h7A2.5 2.5 0 0 1 18 3.5v17a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 6 20.5v-17A2.5 2.5 0 0 1 8.5 1zM7.8 3.2h8.4a.8.8 0 0 1 .8.8v14.5a.8.8 0 0 1-.8.8H7.8a.8.8 0 0 1-.8-.8V4a.8.8 0 0 1 .8-.8zM10.25 1.75h3.5a.25.25 0 0 1 0 .5h-3.5a.25.25 0 0 1 0-.5zM12 20.2a1 1 0 1 1 0 2a1 1 0 1 1 0-2z"
                  />
                </svg>
                <span aria-hidden className="absolute -right-0.5 -top-0.5 flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-3 w-3 rounded-full border-2 border-sky-pale bg-emerald-500" />
                </span>
              </span>
              <span className="text-sm font-semibold leading-tight text-brand-deep">{footer.app.audience}</span>
            </div>
            <div className="space-y-2">
              {footer.app.stores.map((store) => {
                const content = (
                  <>
                    <img
                      src={assetUrl(store.id === "app-store" ? appleLogo : googlePlayLogo)}
                      alt=""
                      width={24}
                      height={24}
                      className="h-6 w-6 shrink-0 object-contain"
                    />
                    <span className="min-w-0">
                      {!store.href && <span className="block text-[0.6rem] text-muted-foreground">{footer.app.status}</span>}
                      <span className="block text-sm font-semibold text-foreground">{store.label}</span>
                    </span>
                  </>
                );
                const classes = cn(
                  "flex min-h-12 items-center gap-3 rounded-lg border border-border bg-card px-3 py-2",
                  store.href && "transition hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-soft",
                );
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
