const path = require('path');
const withImages = require('next-images');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    reactStrictMode: true,
  },
  compress: true,
  withImages: withImages(),
  images: {
    domains: ['img.health-friends.com'],
  },
  experimental: {
    reactMode: "concurrent",
  },
  webpack(config) {
    const prod = process.env.NODE_ENV === 'production';
    const plugins = [...config.plugins];
    return {
      ...config,
      mode: prod ? 'production' : 'development',
      devtool: prod ? 'hidden-source-map' : 'eval',
      module: {
        ...config.module,
        rules: [
          ...config.module.rules,
          {
            test: /\.svg$/,
            use: ['@svgr/webpack'],
          },
        ],
      },
      plugins,
    };
  },
});
