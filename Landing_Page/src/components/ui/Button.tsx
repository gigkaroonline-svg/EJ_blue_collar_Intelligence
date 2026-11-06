import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "outline" | "lime" | "blue" | "dark";

const variants: Record<Variant, string> = {
  primary: "bg-rm-green text-white hover:bg-rm-green-accent shadow-sm",
  secondary:
    "bg-white text-rm-navy border border-rm-border hover:border-rm-green/40 hover:bg-rm-green-soft/50",
  ghost:
    "bg-white/10 text-white border border-white/30 backdrop-blur-md hover:bg-white/20",
  outline:
    "bg-transparent text-rm-navy border border-rm-border hover:border-rm-green/40 hover:bg-rm-green-soft/40",
  dark: "bg-rm-navy-deep text-white hover:bg-rm-navy",
  lime: "bg-rm-green text-white hover:bg-rm-green-accent shadow-sm",
  blue: "bg-rm-green text-white hover:bg-rm-green-accent shadow-sm",
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
  variant = "primary",
  arrow = false,
  ...props
}: ButtonAsButton | ButtonAsLink) {
  const classes = cn(
    "group inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-[0.72rem] font-semibold uppercase tracking-[0.08em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rm-green focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60",
    variants[variant],
    className,
  );

  const content = (
    <>
      <span>{children}</span>
      {arrow ? (
        <span
          aria-hidden
          className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-rm-green transition-transform group-hover:translate-x-0.5"
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
