var LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
var webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  watch: true,
  entry: '/src/index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'index_bundle.js',
    clean: true
  },
  module: {
    rules: [{
    use: 'babel-loader',
      test: /\.js$/,
      exclude: /node_modules/,
      options: {
        plugins: ['lodash'],
        presets: [['env', { modules: false, targets: { node: 4 } }]]
      }
    }]
  },
  'plugins': [
    new LodashModuleReplacementPlugin,
    new webpack.optimize.UglifyJsPlugin,
    new HtmlWebpackPlugin()
  ]
}
