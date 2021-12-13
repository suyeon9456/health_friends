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
    console.log('config: ', { ...config.module });
    // config.module.rules.push({
    //   test: /\.svg$/,
    //   use: ['@svgr/webpack'],
    // });

    // return config;
    return {
      ...config,
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
    };
  },
};
