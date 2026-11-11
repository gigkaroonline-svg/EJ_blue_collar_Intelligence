import { cn } from "@/lib/cn";

export function SectionLabel({
  children,
  className,
  tone = "default",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "default" | "on-dark" | "on-sky";
}) {
  const toneClass =
    tone === "on-dark"
      ? "text-white/70"
      : tone === "on-sky"
        ? "text-white/80"
        : "text-rm-muted";

  return (
    <p className={cn("mono-label mb-3", toneClass, className)}>{children}</p>
  );
}
