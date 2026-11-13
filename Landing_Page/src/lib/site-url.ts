/** Canonical site origin — keep www consistent across meta, sitemap, schema. */
export const SITE_ORIGIN = "https://www.rojmitra.in";

export function absoluteUrl(path = "/"): string {
  if (!path || path === "/") return `${SITE_ORIGIN}/`;
  return `${SITE_ORIGIN}${path.startsWith("/") ? path : `/${path}`}`;
}
