import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  // Note: "/" serves a different language per visitor, but a `Vary:
  // Cookie, Accept-Language` header cannot be set from here — Next owns that
  // header and overwrites whatever middleware or `headers()` produces (only
  // the RSC values survive). A shared cache in front of this app must key on
  // the cookie itself instead; see "Caching behind nginx" in the README.
};

export default nextConfig;
