/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ["src"],
  },

  reactStrictMode: true,
  swcMinify: true,

  // Uncoment to add domain whitelist
  images: {
    unoptimized: true,
    domains: ["picsum.photos"],
  },

  // SVGR
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            typescript: true,
            icon: true,
          },
        },
      ],
    });

    return config;
  },
  env: {
    NEXT_PUBLIC_apiKey: process.env.NEXT_PUBLIC_apiKey,
  },
};

module.exports = nextConfig;
