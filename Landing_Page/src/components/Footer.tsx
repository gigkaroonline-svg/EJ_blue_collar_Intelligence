import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/Button";
import { footer, site } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-rm-border bg-rm-navy-deep text-white">
      <div className="container-rm grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr]">
        <div>
          <Logo size="md" />
          <p className="mt-4 text-sm font-medium text-white">{site.brandLine}</p>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-white/70">{footer.blurb}</p>
          <p className="mt-2 text-sm text-white/55">{footer.positioning}</p>
          <div className="mt-6">
            <Button href="#partner" variant="primary" arrow>
              Partner With Us
            </Button>
          </div>
        </div>

        <div>
          <p className="mono-label text-white/50">Navigate</p>
          <ul className="mt-3 space-y-2">
            {footer.nav.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-sm text-white/80 transition hover:text-white">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mono-label text-white/50">Legal</p>
          <ul className="mt-3 space-y-2">
            {footer.legal.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  {...("external" in link && link.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="text-sm text-white/80 transition hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-rm flex flex-col gap-2 py-5 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>{footer.copyright}</p>
          <p>{site.trustLine}</p>
        </div>
      </div>
    </footer>
  );
}
