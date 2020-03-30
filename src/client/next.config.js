const withImages = require('next-images');
const withCSS = require('@zeit/next-css');

module.exports = withImages(
  withCSS({
    cssModules: true,
    cssLoaderOptions: {
      importLoaders: 1,
      localIdentName: '[local]___[hash:base64:5]',
    },
    webpack(cfg) {
      const originalEntry = cfg.entry;
      // eslint-disable-next-line no-param-reassign
      cfg.entry = async () => {
        const entries = await originalEntry();

        if (entries['main.js'] && !entries['main.js'].includes('./client/polyfills.js')) {
          entries['main.js'].unshift('./client/polyfills.js');
        }

        return entries;
      };

      return cfg;
    },
  }),
);
