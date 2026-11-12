
import logo from "@/assets/rojmitra-logo.png";
import { assetUrl } from "@/lib/asset";
import { cn } from "@/lib/utils";

const sizes = {
  sm: "h-7 w-auto sm:h-8",
  md: "h-9 w-auto sm:h-10",
  lg: "h-12 w-auto",
} as const;

export function Logo({
  className,
  href = "/",
  size = "sm",
}: {
  className?: string;
  href?: string;
  size?: keyof typeof sizes;
}) {
  return (
    <a
      href={href}
      className={cn(
        "inline-flex shrink-0 items-center rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className,
      )}
      aria-label="RojMitra home"
    >
      <img
        src={assetUrl(logo)}
        alt="RojMitra, Mapping India's Workforce"
        width={1628}
        height={540}
        className={sizes[size]}
      />
    </a>
  );
}
