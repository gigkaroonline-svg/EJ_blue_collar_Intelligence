/** Normalize Vite string URLs and Next.js StaticImageData. */
export type AssetSrc = string | { src: string };

export function assetUrl(asset: AssetSrc): string {
  return typeof asset === "string" ? asset : asset.src;
}
