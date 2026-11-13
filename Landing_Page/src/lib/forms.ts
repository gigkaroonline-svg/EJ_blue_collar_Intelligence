import { z } from "zod";
import { formContent, type FormType } from "@/content/forms";

export class FormSubmissionError extends Error {
  constructor(public code: "network" | "timeout" | "response") {
    super("We couldn't submit this right now. Please try again in a few minutes.");
    this.name = "FormSubmissionError";
  }
}
export function formSchema(formType: FormType) {
  const shape: Record<string, z.ZodTypeAny> = { consent: z.literal(true, { errorMap: () => ({ message: "Please confirm your consent." }) }) };
  for (const field of formContent[formType].fields) {
    let rule = z.string().trim().min(1, "This field is required.");
    if (field.type === "email") rule = rule.email("Enter a valid email address.");
    if (field.type === "tel") rule = rule.regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number.");
    if (field.type === "url") rule = rule.url("Enter a valid website URL.");
    if (field.type === "number") rule = rule.regex(/^[1-9]\d*$/, "Enter a positive whole number.");
    shape[field.name] = field.optional ? z.union([rule, z.literal("")]) : rule;
  }
  return z.object(shape);
}
export async function submitForm(formType: FormType, data: Record<string, unknown>): Promise<{ success: true }> {
  if (data["honeypot"]) return { success: true };
  const parsed = formSchema(formType).parse(data);
  const { consent: _consent, ...fields } = parsed;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15_000);
  try {
    const response = await fetch("/api/forms", {
      method: "POST", headers: { "Content-Type": "application/json" }, signal: controller.signal,
      body: JSON.stringify({ formType, data: fields, consent: true, pageUrl: window.location.href, submittedAt: new Date().toISOString() })
    });
    if (!response.ok) throw new FormSubmissionError("response");
    return { success: true };
  } catch (error) {
    if (error instanceof FormSubmissionError) throw error;
    throw new FormSubmissionError(controller.signal.aborted ? "timeout" : "network");
  } finally { clearTimeout(timeout); }
}
