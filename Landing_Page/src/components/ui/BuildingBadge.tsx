import { cn } from "@/lib/cn";

export function BuildingBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-rm-orange/30 bg-orange-50 px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-rm-orange",
        className,
      )}
    >
      Building
    </span>
  );
}
