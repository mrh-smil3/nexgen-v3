import { NextResponse, type NextRequest } from "next/server";
import { LOCALE_COOKIE } from "@/lib/i18n/config";
import { resolveLocale } from "@/lib/i18n/geo";

/**
 * The visitor's URL stays "/". We *rewrite* rather than redirect, so the
 * address bar never changes while Next still serves the prerendered page for
 * the resolved locale — no dynamic rendering, no redirect hop.
 *
 * /en and /id remain directly reachable. Nothing links to them, but they give
 * crawlers and shared links a stable per-language URL, which a single "/"
 * serving two languages otherwise would not have.
 */
export function middleware(request: NextRequest) {
  const { locale } = resolveLocale(
    request.headers,
    request.cookies.get(LOCALE_COOKIE)?.value,
  );

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}`;

  const response = NextResponse.rewrite(url);

  // Same URL, different body per visitor — caches must key on what decided it.
  response.headers.set("Vary", "Cookie, Accept-Language");
  // Lets the client read which locale was served without re-running detection.
  response.headers.set("x-nexgen-locale", locale);

  return response;
}

export const config = {
  // Only the bare root is negotiated; /en and /id are served as-is.
  matcher: "/",
};
