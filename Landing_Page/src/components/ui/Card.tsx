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
        "rounded-[1.75rem] border border-rm-border bg-white p-6 shadow-[0_1px_0_rgb(17_24_39/0.03)]",
        hover &&
          "transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-28px_rgb(11_71_166/0.35)]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
