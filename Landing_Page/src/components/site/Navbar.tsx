"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useId, useState } from "react";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/site/Logo";
import { Pill } from "@/components/site/primitives";
import { Button } from "@/components/ui/button";
import { navLinks, site } from "@/content/site";
import { cn } from "@/lib/utils";

/** Primary nav: About is a single link; Our Story and The Problem live in the footer and in-page links. */
const primaryLinks = navLinks.filter(
  (link) =>
    link.href !== "/our-story" &&
    link.href !== "/the-problem" &&
    link.href !== "/government-initiatives",
);

export function Navbar() {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const pathname = usePathname() || "/";
  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  const linkClass = (href: string) =>
    cn(
      "rounded-md px-3 py-2 font-mono text-[0.75rem] uppercase tracking-[0.06em] transition-colors",
      pathname === href ? "bg-sky-pale text-brand" : "text-muted-foreground hover:bg-muted hover:text-foreground",
    );
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur-sm supports-[backdrop-filter]:bg-card/90">
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center gap-3 px-4 sm:h-20 sm:px-6 lg:px-8">
        <Logo size="sm" className="[&_img]:h-9 sm:[&_img]:h-10" />
        <nav aria-label="Primary" className="hidden min-w-0 flex-1 items-center justify-center gap-1 lg:flex">
          {primaryLinks.map((link) => (
            <a key={link.href} href={link.href} className={linkClass(link.href)} aria-current={pathname === link.href ? "page" : undefined}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <Pill href="/become-a-sourcing-partner" arrow className="hidden lg:inline-flex">
            Join as a Sourcing Partner
          </Pill>
          <Button
            variant="ghost"
            size="icon"
            className="h-11 w-11 rounded-md bg-muted lg:hidden"
            aria-expanded={open}
            aria-controls={open ? menuId : undefined}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      {open && (
        <div id={menuId} className="border-t border-border bg-card lg:hidden">
          <nav aria-label="Mobile" className="mx-auto flex max-h-[calc(100dvh-5rem)] max-w-7xl flex-col gap-0.5 overflow-y-auto px-4 py-3 sm:px-6">
            {primaryLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
                className={cn(
                  "rounded-md px-3 py-3 font-mono text-xs uppercase tracking-[0.06em]",
                  pathname === link.href ? "bg-sky-pale text-brand" : "text-foreground hover:bg-muted",
                )}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Pill href="/become-a-sourcing-partner" arrow className="mt-2 w-full justify-between" onClick={() => setOpen(false)}>
              Join as a Sourcing Partner
            </Pill>
            <p className="mt-3 px-3 pb-1 text-xs text-muted-foreground">{site.brandRelationship}</p>
          </nav>
        </div>
      )}
    </header>
  );
}
