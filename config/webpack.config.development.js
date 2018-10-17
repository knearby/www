const fs = require('fs');
const path = require('path');

const webpack = require('webpack');

const WebpackDashboard = require('webpack-dashboard/plugin');

const firebaseProject = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, '../.firebaserc')
  ).toString()
).projects.development;

module.exports = (config) => ({
  devtool: 'cheap-module-source-map',
  devServer: {
    historyApiFallback: true,
    hot: true,
    port: config.get('port'),
  },
  entry: {
    // provides hot reloading capabilities
    hotDevServer: 'webpack/hot/dev-server',
    // provides hot reloading capabilities
    hotDevServerClient: `webpack-dev-server/client?http://localhost:${config.get('port')}/`,
  },
  plugins: [
    // gives the nice dashboard on npm start
    new WebpackDashboard(),
    // defines the api url endpoint
    new webpack.DefinePlugin({
      'global.url.api': JSON.stringify(`http://localhost:5000/${firebaseProject}/us-central1/`),
      'global.environment': JSON.stringify(config.get('mode')),
    }),
    // provides hot reloading capabilities
    new webpack.HotModuleReplacementPlugin(),
  ],
  watch: true,
});
