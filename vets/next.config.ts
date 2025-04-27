import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverComponentsExternalPackages: ['@adobe/pdfservices-node-sdk', 'log4js','pdf2json'],

  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'xyjhjcgojsrwopmwxmiy.supabase.co',
        pathname: '/storage/v1/object/public/images/**',
      },
      {
        protocol: 'https',
        hostname: 'xyjhjcgojsrwopmwxmiy.supabase.co',
        pathname: '/storage/v1/object/public/files/**',
      },
    ],
    dangerouslyAllowSVG: true,

  },

  webpack: (config, { isServer }) => {
    if (isServer) {
      // Mark the Adobe SDK as external on the server
      config.externals.push('@adobe/pdfservices-node-sdk');
    }
    return config;
  },
  env: {
    PDF_SERVICES_CLIENT_ID: process.env.PDF_SERVICES_CLIENT_ID,
    PDF_SERVICES_CLIENT_SECRET: process.env.PDF_SERVICES_CLIENT_SECRET,
  },
};

export default nextConfig;
