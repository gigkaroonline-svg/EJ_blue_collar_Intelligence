import { NextResponse } from "next/server";
import { z } from "zod";
import { deliverFormMail } from "@/lib/form-mail";

const attachmentSchema = z.object({
  name: z.string().trim().min(1).max(200),
  type: z.string().trim().max(120).optional(),
  /** Reserved; EmailJS Contact template is text-only so we only forward the filename. */
  data: z.string().max(3_000_000).optional(),
});

const payloadSchema = z.object({
  formType: z.enum([
    "employer_requirement",
    "sourcing_partner_application",
    "government_initiative_suggestion",
    "blog_insight",
    "contact",
  ]),
  data: z.record(z.unknown()),
  consent: z.literal(true),
  pageUrl: z.string().optional(),
  submittedAt: z.string().optional(),
  attachment: attachmentSchema.optional(),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = payloadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid form payload.", issues: parsed.error.issues }, { status: 400 });
  }

  try {
    const result = await deliverFormMail({
      ...parsed.data,
      submittedAt: parsed.data.submittedAt ?? new Date().toISOString(),
    });
    return NextResponse.json({ success: true, ...result });
  } catch (error) {
    console.error("[forms] delivery failed", error);
    return NextResponse.json({ error: "Could not deliver form submission." }, { status: 502 });
  }
}
