import { NextResponse } from "next/server";

type Lead = {
  name?: string;
  company?: string;
  position?: string;
  email?: string;
  phone?: string;
  industry?: string;
  systems?: string;
  challenge?: string;
  scope?: string;
};

const REQUIRED: (keyof Lead)[] = ["name", "company", "email", "challenge"];

export async function POST(request: Request) {
  let body: Lead;

  try {
    body = (await request.json()) as Lead;
  } catch {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const missing = REQUIRED.filter((key) => !String(body[key] ?? "").trim());
  if (missing.length > 0) {
    return NextResponse.json(
      { error: "Missing required fields", fields: missing },
      { status: 422 },
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(body.email))) {
    return NextResponse.json({ error: "Invalid email" }, { status: 422 });
  }

  // TODO: wire to the actual delivery channel before launch — transactional
  // email (Resend/SES), a CRM webhook, or an internal inbox. Until then the
  // lead is only recorded in the server log, so submissions are NOT reaching
  // anyone.
  console.info("[lead]", {
    receivedAt: new Date().toISOString(),
    company: body.company,
    industry: body.industry,
    scope: body.scope,
  });

  return NextResponse.json({ ok: true });
}
