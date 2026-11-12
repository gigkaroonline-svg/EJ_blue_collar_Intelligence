import { site } from "@/content/site";

export type FormMailPayload = {
  formType: string;
  data: Record<string, unknown>;
  consent: boolean;
  pageUrl?: string;
  submittedAt?: string;
};

const titles: Record<string, string> = {
  employer_requirement: "Employer hiring requirement",
  sourcing_partner_application: "Sourcing partner application",
  government_initiative_suggestion: "Government initiative suggestion",
  blog_insight: "Blog insight submission",
};

export function inboxFor(formType: string): string {
  if (formType === "employer_requirement") return site.contact.employerEmail;
  if (formType === "sourcing_partner_application") return site.contact.partnerEmail;
  return site.contact.partnerEmail;
}

export function mailSubject(formType: string): string {
  return `RojMitra form · ${titles[formType] ?? formType}`;
}

export function mailBodies(payload: FormMailPayload): { text: string; html: string } {
  const json = JSON.stringify(payload, null, 2);
  const rows = Object.entries(payload.data)
    .map(([key, value]) => `<tr><td style="padding:6px 12px 6px 0;vertical-align:top;font-weight:600">${escapeHtml(key)}</td><td style="padding:6px 0;vertical-align:top">${escapeHtml(String(value ?? ""))}</td></tr>`)
    .join("");
  return {
    text: `${mailSubject(payload.formType)}\n\n${json}\n`,
    html: `
      <div style="font-family:ui-sans-serif,system-ui,sans-serif;line-height:1.5;color:#0f172a">
        <h2 style="margin:0 0 12px">${escapeHtml(mailSubject(payload.formType))}</h2>
        <p style="margin:0 0 8px"><strong>Page:</strong> ${escapeHtml(payload.pageUrl ?? "—")}</p>
        <p style="margin:0 0 16px"><strong>Submitted:</strong> ${escapeHtml(payload.submittedAt ?? new Date().toISOString())}</p>
        <table style="border-collapse:collapse;margin-bottom:20px">${rows}</table>
        <p style="margin:0 0 8px;font-weight:600">JSON payload</p>
        <pre style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:12px;overflow:auto;font-size:12px">${escapeHtml(json)}</pre>
      </div>
    `,
  };
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

/** Delivers the submission as an email with a JSON body. Uses Resend when configured. */
export async function deliverFormMail(payload: FormMailPayload): Promise<{ delivered: boolean; mode: "resend" | "log" }> {
  const to = process.env.FORMS_TO_EMAIL?.trim() || inboxFor(payload.formType);
  const from = process.env.FORMS_FROM_EMAIL?.trim() || "RojMitra Forms <onboarding@resend.dev>";
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const { text, html } = mailBodies(payload);

  if (!apiKey) {
    console.info("[forms] RESEND_API_KEY missing — logging submission instead of emailing", {
      to,
      subject: mailSubject(payload.formType),
      payload,
    });
    return { delivered: false, mode: "log" };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: mailSubject(payload.formType),
      text,
      html,
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`Resend failed (${response.status}): ${detail || response.statusText}`);
  }

  return { delivered: true, mode: "resend" };
}
