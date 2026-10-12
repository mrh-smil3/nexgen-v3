import { NextResponse } from "next/server";
import { verifyTurnstile } from "@/lib/turnstile";
import { TURNSTILE_ACTION_CONTACT } from "@/lib/turnstile-config";
import { sendTelegramMessage } from "@/lib/telegram";
import {
  formatLead,
  MAX_LENGTH,
  REQUIRED,
  type Lead,
  type LeadFields,
} from "@/lib/lead";

export async function POST(request: Request) {
  let body: Lead;

  try {
    body = (await request.json()) as Lead;
  } catch {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  // Bot check before anything else: a request without a valid, single-use
  // Turnstile token never reaches validation or delivery.
  const captcha = await verifyTurnstile(
    body.turnstileToken,
    TURNSTILE_ACTION_CONTACT,
    request.headers.get("cf-connecting-ip") ??
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim(),
  );
  if (!captcha.ok) {
    return captcha.reason === "misconfigured" ||
      captcha.reason === "unreachable"
      ? NextResponse.json(
          { error: "Verification unavailable" },
          { status: 503 },
        )
      : NextResponse.json(
          { error: "Verification failed", code: "captcha" },
          { status: 403 },
        );
  }

  const lead = Object.fromEntries(
    Object.keys(MAX_LENGTH).map((key) => [
      key,
      typeof body[key as keyof Lead] === "string"
        ? String(body[key as keyof Lead]).trim()
        : "",
    ]),
  ) as LeadFields;

  const missing = REQUIRED.filter((key) => !lead[key as keyof typeof lead]);
  if (missing.length > 0) {
    return NextResponse.json(
      { error: "Missing required fields", fields: missing },
      { status: 422 },
    );
  }

  const tooLong = (
    Object.keys(MAX_LENGTH) as (keyof typeof MAX_LENGTH)[]
  ).filter((key) => lead[key].length > MAX_LENGTH[key]);
  if (tooLong.length > 0) {
    return NextResponse.json(
      { error: "Field too long", fields: tooLong },
      { status: 422 },
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(lead.email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 422 });
  }

  const delivered = await sendTelegramMessage(formatLead(lead));
  if (!delivered) {
    // Surface the failure so the visitor retries or emails directly, rather
    // than believing a lead that went nowhere was received.
    return NextResponse.json({ error: "Delivery failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
