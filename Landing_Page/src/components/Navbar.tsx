"use client";

import { useEffect, useId, useState } from "react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/Button";
import { navLinks, site } from "@/content/site";
import { cn } from "@/lib/cn";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-rm-border/80 bg-white/90 shadow-sm backdrop-blur-xl"
          : "border-b border-transparent bg-white/70 backdrop-blur-md",
      )}
    >
      <div className="container-rm flex items-center justify-between gap-4 py-3">
        <Logo />

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-rm-muted transition hover:bg-rm-surface hover:text-rm-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rm-green focus-visible:ring-offset-2"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button href="#partner" variant="primary" arrow className="!hidden sm:!inline-flex">
            Partner With Us
          </Button>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-rm-border bg-white text-rm-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rm-green focus-visible:ring-offset-2 lg:hidden"
            aria-expanded={open}
            aria-controls={open ? menuId : undefined}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              {open ? (
                <path
                  d="M4 4l10 10M14 4L4 14"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
              ) : (
                <>
                  <path d="M3 5h12" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                  <path d="M3 9h12" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                  <path d="M3 13h12" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {open ? (
        <div id={menuId} className="border-t border-rm-border bg-white lg:hidden">
          <nav aria-label="Mobile" className="container-rm flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-xl px-3 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-rm-navy hover:bg-rm-surface"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Button
              href="#partner"
              variant="primary"
              arrow
              className="mt-2 w-full"
              onClick={() => setOpen(false)}
            >
              Partner With Us
            </Button>
            <p className="mt-3 px-3 text-xs text-rm-muted">{site.brandRelationship}</p>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
