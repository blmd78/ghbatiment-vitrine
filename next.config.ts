import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/webp'],
    minimumCacheTTL: 2592000,
    remotePatterns: [
      { protocol: 'http', hostname: 'localhost', port: '3000' },
      { protocol: 'https', hostname: '**.r2.cloudflarestorage.com' },
      { protocol: 'https', hostname: '**.io.cloud.ovh.net' },
      { protocol: 'https', hostname: 'ghbat.fr' },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default withPayload(nextConfig);
