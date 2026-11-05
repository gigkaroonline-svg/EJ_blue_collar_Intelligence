import Image from "next/image";
import { HeroCards } from "@/components/sections/HeroCards";
import { Button } from "@/components/ui/Button";
import { hero, site } from "@/content/site";

export function Hero() {
  return (
    <section id="home" aria-labelledby="hero-heading" className="px-3 pt-3 sm:px-5 lg:px-6">
      <div className="sky-panel relative mx-auto max-w-[1400px] overflow-hidden rounded-[2rem] px-5 pb-10 pt-16 text-center sm:rounded-[2.5rem] sm:px-10 sm:pb-14 sm:pt-20 lg:px-16">
        <Image
          src="/images/sky-clouds.svg"
          alt=""
          width={1440}
          height={320}
          className="pointer-events-none absolute inset-x-0 bottom-0 h-40 w-full object-cover object-bottom opacity-80 sm:h-56"
          priority
        />

        <div className="relative z-10 mx-auto max-w-4xl">
          <p className="mono-label mb-5 text-white/75">{site.brandRelationship}</p>
          <h1
            id="hero-heading"
            className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            {hero.headline}{" "}
            <span className="text-[#cfe8fb]">{hero.headlineAccent}</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-white/85 sm:text-lg">
            {hero.subhead}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button href={hero.secondaryCta.href} variant="ghost">
              {hero.secondaryCta.label}
            </Button>
            <Button href={hero.primaryCta.href} variant="blue" arrow>
              {hero.primaryCta.label}
            </Button>
          </div>

          <p className="mt-6 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-white/75">
            {site.trustLine}
          </p>
        </div>

        <div className="relative z-10">
          <HeroCards />
        </div>
      </div>
    </section>
  );
}
