// entry -> output
// make a path for outputs
const path = require('path');

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },

  module: { // to convers es6 via babel
    rules: [{
      loader: 'babel-loader', // how
      test: /\.js$/, // what
      exclude: /node_modules/ // not
    }, {
      test: /\.s?css$/, // CSS and SCSS
      use: [
        'style-loader',
        'css-loader',
        'sass-loader'
      ]
    }]
  },

  devtool: 'cheap-module-eval-source-map', // to detect errors inside modeles
  devServer: {
    contentBase: path.join(__dirname, 'public')
  }
};
