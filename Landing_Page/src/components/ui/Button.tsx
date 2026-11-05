import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "lime" | "ghost" | "outline" | "dark" | "blue";

const variants: Record<Variant, string> = {
  /** @deprecated Use "blue", kept as alias so call sites stay brand-safe */
  lime: "bg-rm-blue text-white hover:bg-rm-blue-deep shadow-sm",
  ghost:
    "bg-white/15 text-white border border-white/35 backdrop-blur-md hover:bg-white/25",
  outline:
    "bg-white text-rm-ink border border-rm-border hover:border-rm-blue/40 hover:bg-rm-sky-pale/40",
  dark: "bg-rm-ink text-white hover:bg-black",
  blue: "bg-rm-blue text-white hover:bg-rm-blue-deep shadow-sm",
};

type Common = {
  children: React.ReactNode;
  className?: string;
  variant?: Variant;
  arrow?: boolean;
};

type ButtonAsButton = Common &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = Common & { href: string; onClick?: () => void };

export function Button({
  children,
  className,
  variant = "blue",
  arrow = false,
  ...props
}: ButtonAsButton | ButtonAsLink) {
  const classes = cn(
    "group inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 font-mono text-[0.7rem] uppercase tracking-[0.08em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rm-blue focus-visible:ring-offset-2",
    variants[variant],
    className,
  );

  const content = (
    <>
      <span>{children}</span>
      {arrow ? (
        <span
          aria-hidden
          className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-rm-blue transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path
              d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      ) : null}
    </>
  );

  if ("href" in props && props.href) {
    const { href, onClick } = props;
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {content}
      </Link>
    );
  }

  const buttonProps = props as ButtonAsButton;
  return (
    <button type={buttonProps.type ?? "button"} className={classes} {...buttonProps}>
      {content}
    </button>
  );
}
