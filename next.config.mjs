const isGithubPages = process.env.GITHUB_PAGES === "true";
const repoName = "Garcia-Brothers-Heating-and-Air-Conditioning";

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(isGithubPages ? { output: "export" } : {}),
  outputFileTracingRoot: process.cwd(),
  trailingSlash: true,
  basePath: isGithubPages ? `/${repoName}` : "",
  assetPrefix: isGithubPages ? `/${repoName}/` : "",
  env: {
    NEXT_PUBLIC_SITE_BASE_PATH: isGithubPages ? `/${repoName}` : "",
  },
  images: {
    unoptimized: true,
  },
  transpilePackages: [
    "@your-builder/content",
    "@your-builder/core",
    "@your-builder/editor",
    "@your-builder/entitlements",
    "@your-builder/feature-registry",
    "@your-builder/growth-core",
    "@your-builder/growth-customers",
    "@your-builder/growth-dashboard",
    "@your-builder/growth-leads",
    "@your-builder/next",
  ],
  webpack(config) {
    config.resolve.extensionAlias = {
      ...(config.resolve.extensionAlias || {}),
      ".js": [".js", ".ts", ".tsx"],
      ".mjs": [".mjs", ".mts"],
    };
    return config;
  },
};

export default nextConfig;
