const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

type SiteverifyResponse = {
  success: boolean;
  action?: string;
  hostname?: string;
  "error-codes"?: string[];
};

export type TurnstileResult =
  | { ok: true }
  | { ok: false; reason: "missing-token" | "misconfigured" | "rejected" | "unreachable" };

/**
 * Server-side check of a Turnstile token. Tokens are single-use and expire
 * after 300 s, so the client must fetch a fresh one for every submission.
 * Fails closed: no secret, no network, or a mismatched action all reject.
 */
export async function verifyTurnstile(
  token: unknown,
  expectedAction: string,
  remoteIp?: string | null,
): Promise<TurnstileResult> {
  if (typeof token !== "string" || !token || token.length > 2048) {
    return { ok: false, reason: "missing-token" };
  }

  const secret = process.env.CF_TURNSTILE_SECRET_KEY;
  if (!secret) {
    console.error("[turnstile] CF_TURNSTILE_SECRET_KEY is not set");
    return { ok: false, reason: "misconfigured" };
  }

  const form = new URLSearchParams({ secret, response: token });
  if (remoteIp) form.set("remoteip", remoteIp);

  let data: SiteverifyResponse;
  try {
    const res = await fetch(VERIFY_URL, {
      method: "POST",
      body: form,
      signal: AbortSignal.timeout(8000),
      cache: "no-store",
    });
    data = (await res.json()) as SiteverifyResponse;
  } catch (error) {
    console.error("[turnstile] siteverify unreachable", error);
    return { ok: false, reason: "unreachable" };
  }

  if (!data.success || data.action !== expectedAction) {
    console.warn("[turnstile] rejected", {
      errors: data["error-codes"],
      action: data.action,
    });
    return { ok: false, reason: "rejected" };
  }

  return { ok: true };
}
