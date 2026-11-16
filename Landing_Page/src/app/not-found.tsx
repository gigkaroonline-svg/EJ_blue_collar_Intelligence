import Link from "next/link";
import { Footer } from "@/components/site/Footer";
import { Navbar } from "@/components/site/Navbar";
import { navLinks } from "@/content/site";

export default function NotFound() {
  const links = [...navLinks, { label: "Become a Sourcing Partner", href: "/become-a-sourcing-partner" }];
  return (
    <>
      <Navbar />
      <main id="main" className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
        <p className="mono-label text-brand">404</p>
        <h1 className="mt-4 text-4xl font-semibold">Page not found</h1>
        <p className="mt-5 text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-primary px-6 py-3 text-primary-foreground"
        >
          Return to Home
        </Link>
        <nav aria-label="Find a page" className="mt-10 grid gap-4 sm:grid-cols-2">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-brand underline underline-offset-4">
              {link.label}
            </Link>
          ))}
        </nav>
      </main>
      <Footer />
    </>
  );
}
