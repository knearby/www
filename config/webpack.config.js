const path = require('path');

const convict = require('convict');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = convict({
  mode: {
    doc: 'The Webpack mode we should be running in',
    format: ['development', 'production'],
    default: 'development',
    env: 'WEBPACK_MODE',
  },
  port: {
    doc: 'The port which the application should be available on',
    format: 'port',
    default: 3000,
    env: 'WEBPACK_PORT',
  },
});


module.exports = {
  devtool: config.get('mode') === 'development' ?
    'cheap-module-source-map'
    : 'cheap-source-map',
  devServer: {
    historyApiFallback: true,
    hot: true,
    port: config.get('port'),
  },
  entry: [
    path.join(__dirname, '../src/entrypoint.js'),
    config.get('mode') === 'development' ? 'webpack/hot/dev-server' : null,
    config.get('mode') === 'development' ?
      `webpack-dev-server/client?http://localhost:${config.get('port')}/`
      : null,
  ].filter((v) => v),
  mode: config.get('mode'),
  module: {
    rules: [
      {
        test: /.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/env', '@babel/react']
        }
      }
    ]
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      meta: {
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'
      },
      template: path.join(__dirname, '../src/assets/index.html'),
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  watch: config.get('mode') === 'development',
};
