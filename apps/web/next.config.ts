import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  outputFileTracingRoot: new URL("../../", import.meta.url).pathname,
  transpilePackages: [
    "@meistrai/db",
    "@meistrai/auth",
    "@meistrai/types",
    "@meistrai/services",
    "@meistrai/ui",
  ],
  serverExternalPackages: ["sharp", "bcryptjs", "@prisma/client"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "handymanservices.com" },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
};

export default withNextIntl(nextConfig);
