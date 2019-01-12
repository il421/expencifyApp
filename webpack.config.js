// entry -> output
// make a path for outputs
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CSSExtract = new ExtractTextPlugin('styles.css'); //extract css in styles.css

module.exports = (env) => {
  console.log('env', env);
  const isProduction = env === 'production';

  return {
    entry: './src/app.js',
    output: {
      path: path.join(__dirname, 'public', 'dist'),
      filename: 'bundle.js'
    },
  
    module: { // to convers es6 via babel
      rules: [{
        loader: 'babel-loader', // how
        test: /\.js$/, // what
        exclude: /node_modules/ // not
      }, {
        test: /\.s?css$/, // CSS and SCSS 
        use: CSSExtract.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        })
      }]
    },
    
    plugins: [
      CSSExtract
    ],

    devtool: isProduction ? 'source-map' : 'inline-source-map', // to detect errors inside modeles
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      historyApiFallback: true, // tell server that we are going to tout via a client side
      publicPath: '/dist/'
    }
  }
};
