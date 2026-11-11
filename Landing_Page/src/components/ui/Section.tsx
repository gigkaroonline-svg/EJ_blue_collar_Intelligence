import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function Section({
  id,
  label,
  headline,
  body,
  children,
  className,
  tone = "default",
  align = "left",
}: {
  id?: string;
  label?: string;
  headline?: string;
  body?: string | readonly string[];
  children?: React.ReactNode;
  className?: string;
  tone?: "default" | "surface" | "navy";
  align?: "left" | "center";
}) {
  const toneClass =
    tone === "surface"
      ? "bg-rm-surface"
      : tone === "navy"
        ? "bg-rm-navy-deep text-white"
        : "bg-white";

  const bodies = Array.isArray(body) ? body : body ? [body] : [];

  return (
    <section id={id} className={cn("section-pad", toneClass, className)}>
      <Container>
        {(label || headline || bodies.length > 0) && (
          <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
            {label ? (
              <SectionLabel tone={tone === "navy" ? "on-dark" : "default"}>
                {label}
              </SectionLabel>
            ) : null}
            {headline ? (
              <h2
                className={cn(
                  "text-3xl font-semibold tracking-tight sm:text-4xl",
                  tone === "navy" ? "text-white" : "text-rm-navy",
                )}
              >
                {headline}
              </h2>
            ) : null}
            {bodies.map((paragraph) => (
              <p
                key={paragraph.slice(0, 48)}
                className={cn(
                  "mt-4 text-base leading-relaxed sm:text-lg",
                  tone === "navy" ? "text-white/75" : "text-rm-muted",
                )}
              >
                {paragraph}
              </p>
            ))}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}
