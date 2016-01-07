/* global __dirname: true */
import webpack from 'webpack';

export default {
  entry: './index.js',
  output: {
    path: __dirname + '/static',
    filename: 'bundle.js',
    publicPath: '/static/',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
      },
      {
        test: /\.(png|jpg|jpeg|mp3)$/,
        exclude: /node_modules/,
        loader: 'file',
      },
    ],
  },
  devtool: 'inline-source-map',
  plugins: [
    new webpack.ProvidePlugin({
    }),
  ],
};
