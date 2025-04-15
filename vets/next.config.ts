import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverComponentsExternalPackages: ['@adobe/pdfservices-node-sdk', 'log4js'],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Mark the Adobe SDK as external on the server
      config.externals.push('@adobe/pdfservices-node-sdk');
    }
    return config;
  },
};

export default nextConfig;
