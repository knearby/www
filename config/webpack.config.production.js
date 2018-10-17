const fs = require('fs');
const path = require('path');

const webpack = require('webpack');

const CompressionWebpackPlugin = require('compression-webpack-plugin');
const WebpackBundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const firebaseProject = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, '../.firebaserc')
  ).toString()
).projects.production;

module.exports = (config) => ({
  devtool: 'cheap-source-map',
  entry: {},
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        default: false,
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor_app',
          chunks: 'all',
          minChunks: 2,
        },
      },
    },
  },
  plugins: [
    config.get('analyze') ? new WebpackBundleAnalyzer() : undefined,
    new CompressionWebpackPlugin(),
    new webpack.DefinePlugin({
      // defines the api url endpoint
      'global.url.api': JSON.stringify(`https://us-central1-${firebaseProject}.cloudfunctions.net/`),
      'global.environment': JSON.stringify(config.get('mode')),
    }),
  ].filter((v) => v),
});
