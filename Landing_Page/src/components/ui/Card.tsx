import { cn } from "@/lib/cn";

export function Card({
  children,
  className,
  hover = true,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  as?: "div" | "article" | "li";
}) {
  return (
    <Tag
      className={cn(
        "rounded-2xl border border-rm-border bg-white p-6",
        hover &&
          "transition duration-300 hover:-translate-y-0.5 hover:border-rm-green/30 hover:shadow-[0_18px_40px_-28px_rgb(16_36_58/0.28)]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
