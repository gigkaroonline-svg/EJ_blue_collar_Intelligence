import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { finalCta } from "@/content/site";

export function FinalCTA() {
  return (
    <section
      id="partner"
      aria-labelledby="final-cta-heading"
      className="px-3 pb-10 pt-4 sm:px-5 lg:px-6"
    >
      <div className="sky-panel relative mx-auto max-w-[1400px] overflow-hidden rounded-[2rem] px-6 py-16 text-center sm:rounded-[2.5rem] sm:px-12 sm:py-20">
        <Image
          src="/images/sky-clouds.svg"
          alt=""
          width={1440}
          height={320}
          className="pointer-events-none absolute inset-x-0 bottom-0 h-36 w-full object-cover object-bottom opacity-75"
        />

        <div className="relative z-10 mx-auto max-w-3xl">
          <h2
            id="final-cta-heading"
            className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-5xl"
          >
            {finalCta.headline}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
            {finalCta.body}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {finalCta.routes.map((route, index) => (
              <Button
                key={route.label}
                href={route.href}
                variant={index === 0 ? "blue" : "ghost"}
                arrow={index === 0}
              >
                {route.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
