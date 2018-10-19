const fs = require('fs');
const path = require('path');

const convict = require('convict');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const config = convict({
  analyze: {
    doc: 'Specify if we should analyze the application',
    default: false,
    env: 'WEBPACK_ANALYZE'
  },
  context: path.join(__dirname, '../'),
  mode: {
    doc: 'The Webpack mode we should be running in',
    format: ['development', 'production'],
    default: 'development',
    env: 'WEBPACK_MODE',
  },
  outputPath: {
    doc: 'Path to send webpack artifacts to',
    format: (val) => {
      const webpackArtifactPath = path.join(process.cwd(), val);
      if (!fs.existsSync(webpackArtifactPath)) {
        throw new Error(`${webpackArtifactPath} does not exist`);
      }
    },
    default: './dist',
    env: 'WEBPACK_OUTPUT_PATH',
  },
  port: {
    doc: 'The port which the application should be available on',
    format: 'port',
    default: 3000,
    env: 'WEBPACK_PORT',
  },
});

const webpackConfigBase = require(`./webpack.config.${config.get('mode')}`)(config);

const webpackConfig = {
  ...webpackConfigBase,
  entry: {
    app: path.join(__dirname, '../src/entrypoint.js'),
    ...webpackConfigBase.entry,
  },
  mode: config.get('mode'),
  module: {
    rules: [
      {
        test: /.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/env',
            '@babel/react',
          ],
          plugins: [
            // allows for `fnName = (arg) => {}` in classes
            '@babel/proposal-class-properties',
            // removes console logging
            (config.get('mode') === 'production') ? [
              'babel-plugin-transform-remove-console',
              {
                exclude: ['error'],
              },
            ] : null,
          ].filter((v) => v),
        },
      },
      {
        test: /.(png|jpg)$/,
        loader: 'file-loader',
        options: {
          name: 'images/[name].[ext]',
        },
      },
    ]
  },
  output: {
    path: path.join(process.cwd(), config.get('outputPath')),
    filename: 'bundle.js',
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      meta: {
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
      },
      template: path.join(__dirname, '../src/assets/index.html'),
      minify: true,
      hash: true,
      info: {
        author: 'Knearby',
        description: 'Know what\'s nearby? We do - give us a try!',
        // facebook: {
        //   appId: '200218806997138',
        //   pageId: '1197388153674991',
        //   profile: {
        //     firstName: 'Joseph',
        //     gender: 'male',
        //     lastName: 'Matthias',
        //   }
        // },
        google: {
          propertyId: 'UA-75287781-3'
        },
        imageUrl:
          'https://knearby.org/images/logo.light.png',
        keywords: [
          'nearby',
        ],
        title: 'Knearby - Know What\'s Nearby',
        twitterHandle: '@zephinzer',
        url: 'https://knearby.org'
      }
    }),
    new FaviconsWebpackPlugin(path.join(__dirname, '../src/assets/icon.light.png')),
  ].concat(webpackConfigBase.plugins),
};

console.info(webpackConfig);

module.exports = webpackConfig;
