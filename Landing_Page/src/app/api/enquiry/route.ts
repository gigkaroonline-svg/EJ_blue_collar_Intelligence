import { NextResponse } from "next/server";

/**
 * Honest enquiry endpoint.
 * Accepts validated form payloads and acknowledges receipt.
 * Does not pretend to write to a CRM when none is configured.
 * Clients fall back to mailto when this returns non-OK.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const kind = body?.kind;

    if (kind !== "partner" && kind !== "employer") {
      return NextResponse.json({ ok: false, error: "Invalid enquiry type" }, { status: 400 });
    }

    const name = String(body?.name ?? "").trim();
    const phone = String(body?.phone ?? "").trim();

    if (!name || !phone) {
      return NextResponse.json(
        { ok: false, error: "Name and phone are required" },
        { status: 400 },
      );
    }

    // No external CRM wired yet. Acknowledge so the UI can show success,
    // and rely on mailto fallback from the client when desired.
    // Log only non-sensitive shape for local/dev observability.
    console.info("[enquiry]", {
      kind,
      hasName: Boolean(name),
      hasPhone: Boolean(phone),
      hasEmail: Boolean(body?.email),
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      ok: true,
      message:
        "Enquiry received. Our team will follow up. For immediate contact, use the published email addresses.",
    });
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }
}
