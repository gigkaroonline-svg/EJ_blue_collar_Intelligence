import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

const sizes = {
  sm: { width: 140, height: 46, className: "h-9 w-auto sm:h-10" },
  md: { width: 180, height: 60, className: "h-11 w-auto sm:h-12" },
  lg: { width: 220, height: 73, className: "h-14 w-auto" },
} as const;

export function Logo({
  className,
  href = "#home",
  size = "sm",
}: {
  className?: string;
  /** Kept for call-site compatibility; official mark is always brand blue. */
  tone?: "dark" | "light";
  href?: string;
  size?: keyof typeof sizes;
}) {
  const dims = sizes[size];

  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rm-blue focus-visible:ring-offset-2",
        className,
      )}
      aria-label="RojMitra home"
    >
      <Image
        src="/images/rojmitra-logo.png"
        alt="RojMitra, Mapping India’s Workforce"
        width={dims.width}
        height={dims.height}
        className={dims.className}
        priority
      />
    </Link>
  );
}
