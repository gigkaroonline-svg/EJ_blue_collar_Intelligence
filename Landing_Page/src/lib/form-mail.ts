export type FormMailAttachment = {
  name: string;
  type?: string;
  data: string;
};

export type FormMailPayload = {
  formType: string;
  data: Record<string, unknown>;
  consent: boolean;
  pageUrl?: string;
  submittedAt?: string;
  attachment?: FormMailAttachment;
};

const titles: Record<string, string> = {
  employer_requirement: "Employer hiring requirement",
  sourcing_partner_application: "Sourcing partner application",
  government_initiative_suggestion: "Government initiative suggestion",
  blog_insight: "Blog insight submission",
  contact: "Contact form",
};

/** All form submissions go to EarlyJobs info inbox. */
export const FORMS_TO_EMAIL = "info@earlyjobs.in";

/** EmailJS Gmail account used as the sending identity. */
export const FORMS_FROM_EMAIL = "rojmitraonline@gmail.com";

export function mailSubject(formType: string): string {
  return `RojMitra form · ${titles[formType] ?? formType}`;
}

function str(value: unknown): string {
  return String(value ?? "").trim();
}

/** Maps form payload → EmailJS "Contact Us" template vars: title, name, email, time, message. */
export function templateParams(payload: FormMailPayload): Record<string, string> {
  const data = payload.data;
  const submittedAt = payload.submittedAt ?? new Date().toISOString();
  const name =
    str(data.name) ||
    str(data.contactPerson) ||
    str(data.company) ||
    "RojMitra form";
  const email = str(data.email) || FORMS_FROM_EMAIL;

  const lines = [
    `Form: ${mailSubject(payload.formType)}`,
    `Page: ${payload.pageUrl ?? "—"}`,
    `Submitted: ${submittedAt}`,
    "",
    ...Object.entries(data).map(([key, value]) => `${key}: ${str(value)}`),
  ];
  if (payload.attachment?.name) {
    lines.push(
      "",
      `attachment: ${payload.attachment.name}`,
      "(Filename noted only — EmailJS Contact template is text-only and cannot receive binary files.)",
    );
  }

  return {
    to_email: process.env.FORMS_TO_EMAIL?.trim() || FORMS_TO_EMAIL,
    from_email: process.env.FORMS_FROM_EMAIL?.trim() || FORMS_FROM_EMAIL,
    title: mailSubject(payload.formType),
    name,
    email,
    time: submittedAt,
    message: lines.join("\n"),
    form_type: payload.formType,
    reply_to: email,
    subject: mailSubject(payload.formType),
  };
}

function emailJsConfigured(): boolean {
  return Boolean(
    process.env.EMAILJS_SERVICE_ID?.trim() &&
      process.env.EMAILJS_TEMPLATE_ID?.trim() &&
      process.env.EMAILJS_PUBLIC_KEY?.trim(),
  );
}

/** Delivers via EmailJS (rojmitraonline@gmail.com → info@earlyjobs.in). */
export async function deliverFormMail(
  payload: FormMailPayload,
): Promise<{ delivered: boolean; mode: "emailjs" | "log" }> {
  const params = templateParams(payload);

  if (!emailJsConfigured()) {
    console.info("[forms] EmailJS not configured — logging submission instead of emailing", {
      to: params.to_email,
      subject: params.title,
      payload,
    });
    return { delivered: false, mode: "log" };
  }

  // Same path as other forms: Contact Us template vars only (no EmailJS attachments —
  // that API rejects our text template with 400 "parameters are invalid").
  const body: Record<string, unknown> = {
    service_id: process.env.EMAILJS_SERVICE_ID!.trim(),
    template_id: process.env.EMAILJS_TEMPLATE_ID!.trim(),
    user_id: process.env.EMAILJS_PUBLIC_KEY!.trim(),
    template_params: params,
  };

  const privateKey = process.env.EMAILJS_PRIVATE_KEY?.trim();
  if (privateKey) body.accessToken = privateKey;

  const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`EmailJS failed (${response.status}): ${detail || response.statusText}`);
  }

  return { delivered: true, mode: "emailjs" };
}
