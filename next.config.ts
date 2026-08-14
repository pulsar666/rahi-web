import type { NextConfig } from "next";

/**
 * Static export — GitHub Pages serves plain files, so there is no Node
 * process at runtime: no API routes, no server actions, no middleware, no ISR.
 * Everything here is client-rendered.
 *
 * `images.unoptimized` is REQUIRED: next/image's optimizer is a server
 * feature, and `next build` fails the export without it.
 *
 * No basePath — the site is served from the APEX domain (drivewithrahi.com)
 * via a CNAME file, not from a /repo-name subpath. If this ever moves to a
 * project-pages URL (pulsar666.github.io/rahi-web), basePath + assetPrefix
 * must be set to "/rahi-web" or every asset 404s.
 */
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  // Emit /privacy/index.html instead of /privacy.html so the static host
  // resolves the bare /privacy path without a redirect.
  trailingSlash: true,
};

export default nextConfig;
