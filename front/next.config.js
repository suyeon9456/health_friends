const path = require('path');
const withImages = require('next-images');
// module.exports = withImages();

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    reactStrictMode: true,
  },
  withImages: withImages(),
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};
