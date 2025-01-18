import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable transpilation of the assets package
  transpilePackages: ["@repo/assets"],

  webpack: (config) => {
    // Configure asset modules for various file types
    config.module.rules.push({
      test: /\.(mp3|wav|ogg)$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: "file-loader",
          options: {
            publicPath: "/_next/static/media/",
            outputPath: "static/media/",
            name: "[name].[hash].[ext]",
          },
        },
      ],
    });

    return config;
  },
};

export default nextConfig;
