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
  plugins: [
    new HtmlWebpackPlugin()
  ]
}
