import type { NextConfig } from "next";

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
};

export default nextConfig;
