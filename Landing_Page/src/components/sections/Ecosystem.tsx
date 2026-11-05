import { SectionLabel } from "@/components/ui/SectionLabel";
import { ecosystem } from "@/content/site";
import { cn } from "@/lib/cn";

export function Ecosystem() {
  return (
    <section
      id="ecosystem"
      aria-labelledby="ecosystem-heading"
      className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-3xl text-center">
        <SectionLabel>{ecosystem.label}</SectionLabel>
        <h2
          id="ecosystem-heading"
          className="text-3xl font-semibold tracking-tight text-rm-ink sm:text-4xl"
        >
          {ecosystem.headline}
        </h2>
      </div>

      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {ecosystem.products.map((product) => (
          <li
            key={product.name}
            className={cn(
              "rounded-[1.75rem] border p-6 transition",
              product.highlight
                ? "border-rm-blue bg-rm-blue text-white shadow-[0_24px_50px_-28px_rgb(11_71_166/0.85)]"
                : "border-rm-border bg-white",
            )}
          >
            {product.highlight ? (
              <p className="mono-label text-white/70">Featured</p>
            ) : (
              <p className="mono-label text-rm-muted">Product</p>
            )}
            <h3
              className={cn(
                "mt-3 text-xl font-semibold tracking-tight",
                product.highlight ? "text-white" : "text-rm-ink",
              )}
            >
              {product.name}
            </h3>
            <p
              className={cn(
                "mt-3 text-sm leading-relaxed",
                product.highlight ? "text-white/80" : "text-rm-muted",
              )}
            >
              {product.role}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
