import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/Button";
import { footer, navLinks, site } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-rm-border bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:px-8">
        <div className="md:col-span-2 lg:col-span-1">
          <Logo size="md" />
          <p className="mt-3 text-sm font-medium text-rm-ink">{site.tagline}</p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-rm-muted">
            {footer.blurb}
          </p>
          <p className="mt-4 font-mono text-[0.65rem] uppercase tracking-[0.08em] text-rm-muted">
            {site.trustLine}
          </p>
          <div className="mt-6">
            <Button href="#partner" variant="blue" arrow>
              Partner With Us
            </Button>
          </div>
        </div>

        <div>
          <p className="mono-label text-rm-muted">Navigate</p>
          <ul className="mt-3 space-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-rm-ink transition hover:text-rm-blue"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mono-label text-rm-muted">Explore</p>
          <ul className="mt-3 space-y-2">
            {footer.explore.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-rm-ink transition hover:text-rm-blue"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mono-label text-rm-muted">Legal</p>
          <ul className="mt-3 space-y-2">
            {footer.legal.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-sm text-rm-ink transition hover:text-rm-blue"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-rm-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-rm-muted sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>{footer.copyright}</p>
          <p>{site.positioning}</p>
        </div>
      </div>
    </footer>
  );
}
