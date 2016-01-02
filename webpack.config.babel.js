/* global __dirname: true */
export default {
  entry: './index.js',
  output: {
    path: __dirname + '/static',
    filename: 'bundle.js',
    publicPath: '/static',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
      },
    ],
  },
  devtool: 'inline-source-map',
};
