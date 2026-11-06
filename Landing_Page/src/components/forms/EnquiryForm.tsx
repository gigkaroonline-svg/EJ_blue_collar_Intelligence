"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

type FormKind = "partner" | "employer";

type Field = {
  name: string;
  label: string;
  type: "text" | "tel" | "email" | "textarea" | "select";
  required?: boolean;
  placeholder?: string;
  options?: string[];
  wide?: boolean;
};

const partnerFields: Field[] = [
  { name: "name", label: "Full name", type: "text", required: true },
  { name: "phone", label: "Mobile number", type: "tel", required: true },
  { name: "email", label: "Email address", type: "email", required: true },
  {
    name: "state",
    label: "State",
    type: "select",
    required: true,
    options: [
      "Andhra Pradesh",
      "Bihar",
      "Gujarat",
      "Karnataka",
      "Kerala",
      "Maharashtra",
      "Odisha",
      "Rajasthan",
      "Tamil Nadu",
      "Uttar Pradesh",
      "West Bengal",
      "Other",
    ],
  },
  { name: "district", label: "District", type: "text", required: true },
  { name: "block", label: "Block", type: "text" },
  { name: "village", label: "Village", type: "text", required: true },
  {
    name: "organisationType",
    label: "Organisation type",
    type: "select",
    required: true,
    options: [
      "CSC operator",
      "Village-level entrepreneur",
      "Self-help group",
      "Community organisation",
      "Training institution",
      "Local institution",
      "Grassroots mobiliser",
      "Other",
    ],
  },
  { name: "occupation", label: "Current occupation", type: "text" },
  {
    name: "experience",
    label: "Experience",
    type: "select",
    options: ["Less than 1 year", "1–3 years", "3–5 years", "5+ years"],
  },
  {
    name: "message",
    label: "Message",
    type: "textarea",
    wide: true,
    placeholder: "Tell us about your community and interest in partnering",
  },
];

const employerFields: Field[] = [
  { name: "company", label: "Company name", type: "text", required: true },
  { name: "name", label: "Contact person", type: "text", required: true },
  { name: "designation", label: "Designation", type: "text", required: true },
  { name: "email", label: "Official email", type: "email", required: true },
  { name: "phone", label: "Mobile number", type: "tel", required: true },
  { name: "industry", label: "Industry", type: "text", required: true },
  { name: "locations", label: "Hiring location", type: "text", required: true },
  {
    name: "requirement",
    label: "Workforce requirement",
    type: "textarea",
    required: true,
    wide: true,
  },
  { name: "headcount", label: "Number of workers required", type: "text", required: true },
  {
    name: "skills",
    label: "Skills or occupations required",
    type: "textarea",
    required: true,
    wide: true,
  },
  { name: "timeline", label: "Expected joining timeline", type: "text", required: true },
  {
    name: "additional",
    label: "Additional requirements",
    type: "textarea",
    wide: true,
  },
];

function validatePhone(value: string) {
  return /^[+\d][\d\s-]{8,15}$/.test(value.trim());
}

function validateEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function EnquiryForm({
  kind,
  consent,
}: {
  kind: FormKind;
  consent?: string;
}) {
  const fields = kind === "partner" ? partnerFields : employerFields;
  const [values, setValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "mailto" | "error">(
    "idle",
  );

  const to = kind === "partner" ? site.contact.partnerEmail : site.contact.employerEmail;
  const subject =
    kind === "partner"
      ? "Village Workforce Mitra enquiry"
      : "Employer workforce enquiry";

  function onChange(name: string, value: string) {
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }

  function validate() {
    const next: Record<string, string> = {};
    for (const field of fields) {
      const value = (values[field.name] ?? "").trim();
      if (field.required && !value) {
        next[field.name] = "Required";
        continue;
      }
      if (field.name === "phone" && value && !validatePhone(value)) {
        next[field.name] = "Enter a valid phone number";
      }
      if (field.name === "email" && value && !validateEmail(value)) {
        next[field.name] = "Enter a valid email";
      }
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!validate()) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, ...values }),
      });

      if (res.ok) {
        setStatus("sent");
        setValues({});
        return;
      }

      const body = fields
        .map((f) => `${f.label}: ${(values[f.name] ?? "").trim() || "-"}`)
        .join("\n");
      window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus("mailto");
      setValues({});
    } catch {
      const body = fields
        .map((f) => `${f.label}: ${(values[f.name] ?? "").trim() || "-"}`)
        .join("\n");
      window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus("mailto");
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="enterprise-panel rounded-2xl p-5 sm:p-6"
      aria-label={kind === "partner" ? "Partner enquiry form" : "Employer enquiry form"}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map((field) => {
          const id = `${kind}-${field.name}`;
          const error = errors[field.name];
          const sharedClass = cn(
            "mt-1.5 w-full rounded-xl border bg-white px-3 py-2.5 text-sm text-rm-navy outline-none transition placeholder:text-rm-muted/60 focus:border-rm-green focus:ring-2 focus:ring-rm-green/20",
            error ? "border-red-400" : "border-rm-border",
          );

          return (
            <label
              key={field.name}
              htmlFor={id}
              className={cn(
                "block text-sm font-medium text-rm-navy",
                (field.wide || field.type === "textarea") && "sm:col-span-2",
              )}
            >
              {field.label}
              {field.required ? (
                <span className="text-rm-green" aria-hidden>
                  {" "}
                  *
                </span>
              ) : null}
              {field.type === "textarea" ? (
                <textarea
                  id={id}
                  name={field.name}
                  rows={3}
                  value={values[field.name] ?? ""}
                  onChange={(e) => onChange(field.name, e.target.value)}
                  required={field.required}
                  placeholder={field.placeholder}
                  aria-invalid={Boolean(error) || undefined}
                  aria-describedby={error ? `${id}-error` : undefined}
                  className={sharedClass}
                />
              ) : field.type === "select" ? (
                <select
                  id={id}
                  name={field.name}
                  value={values[field.name] ?? ""}
                  onChange={(e) => onChange(field.name, e.target.value)}
                  required={field.required}
                  aria-invalid={Boolean(error) || undefined}
                  aria-describedby={error ? `${id}-error` : undefined}
                  className={sharedClass}
                >
                  <option value="">Select</option>
                  {field.options?.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  id={id}
                  name={field.name}
                  type={field.type}
                  value={values[field.name] ?? ""}
                  onChange={(e) => onChange(field.name, e.target.value)}
                  required={field.required}
                  placeholder={field.placeholder}
                  aria-invalid={Boolean(error) || undefined}
                  aria-describedby={error ? `${id}-error` : undefined}
                  className={sharedClass}
                />
              )}
              {error ? (
                <span id={`${id}-error`} className="mt-1 block text-xs text-red-600">
                  {error}
                </span>
              ) : null}
            </label>
          );
        })}
      </div>

      {consent ? (
        <p className="mt-4 text-xs leading-relaxed text-rm-muted">{consent}</p>
      ) : (
        <p className="mt-4 text-xs leading-relaxed text-rm-muted">
          By submitting this form, you agree to be contacted by the RojMitra team regarding
          this enquiry. Your information will be handled in accordance with the applicable
          privacy policy.
        </p>
      )}

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-rm-muted">
          Submissions are sent to {to}.
        </p>
        <Button type="submit" variant="primary" arrow disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Submit enquiry"}
        </Button>
      </div>

      {status === "sent" ? (
        <p
          className="mt-4 rounded-xl border border-rm-green/20 bg-rm-green-soft px-4 py-3 text-sm text-rm-navy"
          role="status"
        >
          Thank you. Your enquiry has been received. Our team will follow up. For urgent
          requests, email {to}.
        </p>
      ) : null}
      {status === "mailto" ? (
        <p
          className="mt-4 rounded-xl border border-rm-green/20 bg-rm-green-soft px-4 py-3 text-sm text-rm-navy"
          role="status"
        >
          Opening your email client to send this enquiry. If it did not open, write to {to}.
        </p>
      ) : null}
      {status === "error" ? (
        <p className="mt-4 text-sm text-red-600" role="alert">
          Something went wrong. Please email {to} directly.
        </p>
      ) : null}
    </form>
  );
}
