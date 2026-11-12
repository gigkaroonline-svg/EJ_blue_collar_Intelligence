// Form submit target. Prefer a Cloudflare Worker URL in production.
// Example: https://rojmitra-forms-mail.<your-subdomain>.workers.dev
export const FORMS_API_URL =
  process.env.NEXT_PUBLIC_FORMS_API_URL?.trim() || "/api/forms";
