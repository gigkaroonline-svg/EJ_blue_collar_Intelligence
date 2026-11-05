import { Logo } from "@/components/Logo";
import { footer, navLinks, site } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-rm-border bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.2fr_1fr_1fr] lg:px-8">
        <div>
          <Logo size="md" />
          <p className="mt-3 text-sm text-rm-muted">{site.brandRelationship}</p>
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
          <p>Mapping India’s Workforce.</p>
        </div>
      </div>
    </footer>
  );
}
