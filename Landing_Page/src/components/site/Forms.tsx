"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Pill } from "@/components/site/primitives";
import { PhoneField } from "@/components/site/PhoneField";
import { formContent, type Field, type FormType } from "@/content/forms";
import { formSchema, submitForm } from "@/lib/forms";

const inputClasses =
  "mt-2 w-full rounded-md border border-input bg-card px-3 py-2.5 text-sm text-foreground transition-colors focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/30";

export function FormField({ field, prefix, error }: { field: Field; prefix: string; error?: string | undefined }) {
  const id = `${prefix}-${field.name}`;
  const describedBy = [error ? `${id}-error` : null, field.hint ? `${id}-hint` : null].filter(Boolean).join(" ") || undefined;
  const props = { id, name: field.name, className: inputClasses, "aria-invalid": Boolean(error), "aria-describedby": describedBy, required: !field.optional };

  if (field.type === "phone") {
    return <PhoneField field={field} prefix={prefix} error={error} />;
  }

  return <div className={field.type === "textarea" || field.type === "file" ? "sm:col-span-2" : ""}>
    <label htmlFor={id} className="text-sm font-medium">{field.label}</label>
    {field.type === "textarea" ? (
      <textarea {...props} rows={4} />
    ) : field.type === "file" ? (
      <input {...props} type="file" accept={field.accept} className={`${inputClasses} file:mr-3 file:rounded-full file:border-0 file:bg-sky-pale file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-brand`} />
    ) : (
      <input
        {...props}
        type={field.type ?? "text"}
        inputMode={field.type === "tel" ? "numeric" : undefined}
        min={field.type === "number" ? 1 : undefined}
        autoComplete={
          field.type === "email"
            ? "email"
            : field.type === "tel"
              ? "tel-national"
              : field.name === "name" || field.name === "contactPerson"
                ? "name"
                : undefined
        }
      />
    )}
    {field.hint && !error ? <p id={`${id}-hint`} className="mt-1 text-xs text-muted-foreground">{field.hint}</p> : null}
    {error && <p id={`${id}-error`} className="mt-1 text-sm text-destructive">{error}</p>}
  </div>;
}
export function SubmissionForm({ formType }: { formType: FormType }) {
  const prefix = useId(); const busy = useRef(false);
  const [sending, setSending] = useState(false); const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({}); const [failure, setFailure] = useState("");
  const content = formContent[formType];
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (busy.current) return;
    const form = event.currentTarget;
    const raw = new FormData(form);
    const data: Record<string, unknown> = {};
    for (const [key, value] of raw.entries()) {
      if (value instanceof File) {
        data[key] = value.size > 0 ? value : "";
      } else {
        data[key] = value;
      }
    }
    data["consent"] = data["consent"] === "on";
    const result = formSchema(formType).safeParse(data);
    if (!data["honeypot"] && !result.success) {
      const next: Record<string, string> = {};
      for (const issue of result.error.issues) next[String(issue.path[0])] = issue.message;
      setErrors(next); setFailure("");
      const firstName = Object.keys(next)[0];
      const first = firstName ? form.elements.namedItem(firstName) : null;
      if (first instanceof HTMLElement) first.focus();
      return;
    }
    busy.current = true; setSending(true); setErrors({}); setFailure("");
    try { await submitForm(formType, data); setSuccess(true); }
    catch { setFailure("We couldn't submit this right now. Please try again in a few minutes."); }
    finally { busy.current = false; setSending(false); }
  }
  if (success) return <div role="status" className="flex items-start gap-3 rounded-lg border border-signal/30 bg-signal-pale p-6"><CheckCircle2 className="h-6 w-6 shrink-0 text-brand" /><p className="leading-relaxed">{content.success}</p></div>;
  return <form noValidate onSubmit={handleSubmit} aria-label={content.title} className="space-y-6">
    <fieldset disabled={sending} className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
      {content.fields.map((field) => <div key={field.name} className={field.group || field.type === "textarea" || field.type === "file" || field.type === "phone" ? "sm:col-span-2" : ""}>
        {field.group && <h3 className="mb-5 border-b border-border pb-3 text-lg font-semibold">{field.group}</h3>}
        <FormField field={field} prefix={prefix} error={errors[field.name]} />
      </div>)}
      <div className="hidden" aria-hidden="true"><label htmlFor={`${prefix}-honeypot`}>Leave blank</label><input id={`${prefix}-honeypot`} name="honeypot" tabIndex={-1} autoComplete="off" /></div>
      <div className="sm:col-span-2"><label className="flex items-start gap-3 text-sm leading-relaxed"><input name="consent" type="checkbox" required className="mt-1 h-4 w-4 shrink-0 accent-primary" aria-invalid={Boolean(errors["consent"])} aria-describedby={errors["consent"] ? `${prefix}-consent-error` : undefined} /><span>{content.consent}</span></label>{errors["consent"] && <p id={`${prefix}-consent-error`} className="mt-2 text-sm text-destructive">{errors["consent"]}</p>}</div>
    </fieldset>
    {failure && <p role="alert" className="text-sm text-destructive">{failure}</p>}
    <Button type="submit" disabled={sending} className="h-auto min-h-11 max-w-full whitespace-normal rounded-full px-6 py-3 font-mono text-xs uppercase">{sending ? <Loader2 className="animate-spin" /> : <Send />}{content.button}</Button>
  </form>;
}
export function FormModal({ formType, label }: { formType: "government_initiative_suggestion" | "blog_insight"; label: string }) {
  return <Dialog><DialogTrigger asChild><Button className="h-auto min-h-11 whitespace-normal rounded-full px-6 py-3 font-mono text-xs uppercase">{label}</Button></DialogTrigger>
    <DialogContent className="max-h-[90dvh] w-[calc(100%-2rem)] overflow-y-auto"><DialogTitle>{formContent[formType].title}</DialogTitle><DialogDescription className="sr-only">{formContent[formType].consent}</DialogDescription><SubmissionForm formType={formType} /></DialogContent>
  </Dialog>;
}
export function FormCTA({
  label,
  partnerPage = false,
  light = false,
  ghost = false,
  outline = false,
}: {
  label: string;
  partnerPage?: boolean;
  light?: boolean;
  ghost?: boolean;
  outline?: boolean;
}) {
  if (label === "Suggest a Government Initiative") return <FormModal formType="government_initiative_suggestion" label={label} />;
  if (label === "Share an Insight With RojMitra") return <FormModal formType="blog_insight" label={label} />;
  const href = /Submit .*Requirement|Looking for Workers|Hiring Requirements/.test(label)
    ? "/for-employers#requirement-form"
    : label === "Explore Workforce Intelligence"
      ? "/workforce-intelligence"
      : label === "For Employers"
        ? "/for-employers"
        : partnerPage
          ? "/become-a-sourcing-partner#partner-form"
          : "/become-a-sourcing-partner";
  const variant = light ? ("light" as const) : ghost ? ("ghost" as const) : outline ? ("outline" as const) : undefined;
  const compact = label.length > 28;
  return (
    <Pill
      href={href}
      arrow={!compact}
      {...(variant ? { variant } : {})}
      className={
        compact
          ? "h-auto min-h-9 max-w-full min-w-0 whitespace-normal px-4 py-2 text-[0.62rem] leading-snug tracking-[0.06em]"
          : "max-w-full shrink-0 whitespace-nowrap"
      }
    >
      {label}
    </Pill>
  );
}
