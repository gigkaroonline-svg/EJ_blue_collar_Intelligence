import { isValidPhoneNumber } from "libphonenumber-js";
import { z } from "zod";
import { formContent, type FormType } from "@/content/forms";

export class FormSubmissionError extends Error {
  constructor(public code: "network" | "timeout" | "response") {
    super("We couldn't submit this right now. Please try again in a few minutes.");
    this.name = "FormSubmissionError";
  }
}

const MAX_ATTACHMENT_BYTES = 2 * 1024 * 1024;

function fileRule(optional: boolean) {
  const base = z.union([z.instanceof(File), z.literal("")]).superRefine((value, ctx) => {
    if (!(value instanceof File)) {
      if (!optional) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Please attach a file." });
      }
      return;
    }
    if (value.size <= 0) {
      if (!optional) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Please attach a file." });
      }
      return;
    }
    if (value.size > MAX_ATTACHMENT_BYTES) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Attachment must be 2 MB or smaller." });
    }
  });
  return optional ? base.optional() : base;
}

export function formSchema(formType: FormType) {
  const shape: Record<string, z.ZodTypeAny> = {
    consent: z.literal(true, { errorMap: () => ({ message: "Please confirm your consent." }) }),
  };

  for (const field of formContent[formType].fields) {
    if (field.type === "file") {
      shape[field.name] = fileRule(Boolean(field.optional));
      continue;
    }
    if (field.type === "phone") {
      const phoneRule = z
        .string()
        .trim()
        .min(1, "This field is required.")
        .refine((value) => isValidPhoneNumber(value), {
          message: "Enter a valid phone number for the selected country.",
        });
      shape[field.name] = field.optional
        ? z.union([
            z.literal(""),
            z
              .string()
              .trim()
              .refine((value) => !value || isValidPhoneNumber(value), {
                message: "Enter a valid phone number for the selected country.",
              }),
          ])
        : phoneRule;
      continue;
    }
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

  const payloadFields: Record<string, unknown> = {};
  let attachmentName: string | undefined;

  for (const [key, value] of Object.entries(fields)) {
    if (value instanceof File) {
      if (value.size > 0) {
        attachmentName = value.name;
        payloadFields[key] = value.name;
      }
      continue;
    }
    payloadFields[key] = value;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15_000);
  try {
    const response = await fetch("/api/forms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify({
        formType,
        data: payloadFields,
        consent: true,
        pageUrl: window.location.href,
        submittedAt: new Date().toISOString(),
        ...(attachmentName ? { attachment: { name: attachmentName } } : {}),
      }),
    });
    if (!response.ok) throw new FormSubmissionError("response");
    return { success: true };
  } catch (error) {
    if (error instanceof FormSubmissionError) throw error;
    throw new FormSubmissionError(controller.signal.aborted ? "timeout" : "network");
  } finally {
    clearTimeout(timeout);
  }
}
