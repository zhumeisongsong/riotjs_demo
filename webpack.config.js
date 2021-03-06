const path = require('path')
const webpack = require('webpack')
const WebpackMd5Hash = require('webpack-md5-hash');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const PUBLIC_PATH = 'https://pmcalabrese.github.io/riotjs-webpack/';
const SERVICE_WORKER_FILENAME = 'service-worker.js';

const extractSass = new ExtractTextPlugin({
  filename: "[name].[contenthash].css",
  disable: process.env.NODE_ENV === "development"
});

module.exports = {
  resolveLoader: {
    "modules": [
      "./node_modules"
    ]
  },

  entry: {
    app: [
      "./app/main.js"
    ],
    styles: [
      "./app/styles.scss"
    ]
  },
  output: {
    path: path.resolve(__dirname, './public'),
    publicPath: '',
    filename: '[name].bundle.js',
    chunkFilename: "[chunkhash].[name].chunk.js"
  },
  plugins: [
    //sass
    extractSass,

    //service worker
    new SWPrecacheWebpackPlugin(
      {
        cacheId: 'riotjs',
        dontCacheBustUrlsMatching: /\.\w{8}\./,
        filename: 'service-worker.js',
        minify: true,
        navigateFallback: PUBLIC_PATH + 'index.html',
        staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/]
      }
    ),

    //uglify
    new UglifyJSPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: (module) => module.resource && module.resource.startsWith(nodeModules),
      filename: 'vendor.bundle.js',
      "chunks": [
        "main"
      ]
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new HtmlWebpackPlugin({
      template: "./app/index.html",
      filename: "./index.html",
      hash: true,
      inject: true,
      compile: true,
      favicon: false,
      minify: false,
      cache: true,
      showErrors: true,
      chunks: "all",
      excludeChunks: [],
      serviceWorker: `/${SERVICE_WORKER_FILENAME}`,
    }),
    new PreloadWebpackPlugin({
      rel: 'preload',
      include: ['navigationtag', 'apptag']
    }),
    // new ScriptExtHtmlWebpackPlugin({
    //   defer: './app/styles.css'
    // }),
    new CopyWebpackPlugin([
      { from: 'app/manifest.json' },
      { from: 'app/assets', to:'assets' }
    ]),
    new webpack.ProvidePlugin({ riot: 'riot' }),
  ],
  module: {
    loaders: [
      {
        test: /\.tag\.html$/,
        exclude: /node_modules/,
        loader: 'riot-tag-loader',
        options: {
          type: 'es6', // transpile the riot tags using babel
          hot: true,
          debug: true
        }
      },
      {
        test: /\.tag\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ["stage-3", "stage-2", "stage-1", "es2015"],
          plugins: ["autobind-class-methods", "babel-plugin-transform-class-properties"]
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ["stage-3", "stage-2", "stage-1", "es2015"],
          plugins: ["autobind-class-methods", "babel-plugin-transform-class-properties"]
        },
      },
      {
        test: /\.css$/i,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.scss$/,
        use: extractSass.extract({
            use: [{
                loader: "css-loader", options:{
                  minimize: true,
                  sourceMap: true
                }
            }, {
                loader: "sass-loader", options: {
                  minimize: true,
                  sourceMap: true
                }
            }],
            // use style-loader in development
            fallback: "style-loader"
        })
      }
    ]
  }
}
