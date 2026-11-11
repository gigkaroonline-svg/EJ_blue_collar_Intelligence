import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { finalCta } from "@/content/site";

export function FinalCTA() {
  return (
    <section id={finalCta.id} className="section-pad bg-rm-navy-deep text-white">
      <Container>
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-rm-navy to-[#07131f] px-6 py-12 sm:px-10 sm:py-16">
          <div className="pointer-events-none absolute -right-16 top-0 h-48 w-48 rounded-full bg-rm-green/20 blur-3xl" />
          <div className="relative max-w-3xl">
            <p className="mono-label text-white/55">{finalCta.eyebrow}</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              {finalCta.headline}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/75 sm:text-lg">{finalCta.body}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {finalCta.routes.map((route, index) => (
                <Button
                  key={route.href}
                  href={route.href}
                  variant={index === 0 ? "primary" : "ghost"}
                  arrow={index === 0}
                >
                  {route.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
