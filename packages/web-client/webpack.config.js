const path = require('path');
// eslint-disable-next-line node/no-unpublished-require
const HtmlWebpackPlugin = require('html-webpack-plugin');

const prod = process.env.NODE_ENV === 'production';

module.exports = {
  mode: prod ? 'production' : 'development',
  entry: path.resolve(__dirname, './src/index.tsx'),
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [{ test: /\.(ts|js)x?$/, exclude: /node_modules/, use: [{ loader: 'babel-loader' }] }],
  },
  output: {
    path: path.resolve(__dirname, '/dist'),
    filename: 'index.bundle.js',
  },
  plugins: [new HtmlWebpackPlugin({ template: path.resolve(__dirname, './src/index.html') })],
};
