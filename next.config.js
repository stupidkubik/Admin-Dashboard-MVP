const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")?.[1];
const isGithubPages = process.env.GITHUB_PAGES === "true";

const resolvedBasePath =
  process.env.NEXT_PUBLIC_BASE_PATH ||
  (isGithubPages && repositoryName ? `/${repositoryName}` : "");

const resolvedAssetPrefix =
  process.env.NEXT_PUBLIC_ASSET_PREFIX ||
  (resolvedBasePath ? `${resolvedBasePath}/` : undefined);

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: resolvedBasePath,
  assetPrefix: resolvedAssetPrefix,
  env: {
    NEXT_PUBLIC_BASE_PATH: resolvedBasePath,
  },
};

module.exports = nextConfig;
