const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")?.[1];
const isGithubPages = process.env.GITHUB_PAGES === "true";

const resolvedBasePath =
  process.env.NEXT_PUBLIC_BASE_PATH ||
  (isGithubPages && repositoryName ? `/${repositoryName}` : "");

const resolvedAssetPrefix =
  process.env.NEXT_PUBLIC_ASSET_PREFIX ||
  (resolvedBasePath ? `${resolvedBasePath}/` : undefined);

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), geolocation=(), microphone=()",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  {
    key: "Content-Security-Policy",
    value:
      "default-src 'self'; base-uri 'self'; connect-src 'self'; font-src 'self' data:; form-action 'self'; frame-ancestors 'none'; img-src 'self' data: blob: https:; object-src 'none'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: resolvedBasePath,
  assetPrefix: resolvedAssetPrefix,
  env: {
    NEXT_PUBLIC_BASE_PATH: resolvedBasePath,
  },
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  async headers() {
    if (process.env.NODE_ENV !== "production") {
      return [];
    }

    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

module.exports = nextConfig;
