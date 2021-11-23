const path = require('path');
const withImages = require('next-images');
// module.exports = withImages();

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    reactStrictMode: true,
  },
  withImages: withImages(),
};
