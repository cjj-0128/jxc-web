const path = require('path');
const {
  override,
  addWebpackAlias,
  addWebpackModuleRule,
  addWebpackResolve
} = require('customize-cra');
const addLessLoader = require('customize-cra-less-loader');

module.exports = {
  webpack: override(
    // addWebpackResolve({
    //   fallback: {
    //     buffer: require.resolve('buffer/'),
    //   }
    // }),
    addLessLoader({
      lessLoaderOptions: {
        lessOptions: {
          javascriptEnabled: true,
        },
      },
    }),
    addWebpackAlias({
      '@': path.resolve(__dirname, 'src'),
    }),
    addWebpackModuleRule({
      test: /\.svg$/,
      use: [{ loader: 'svg-sprite-loader', options: {} }],
    })
  ),
};
