// entry -> output
// make a path for outputs
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CSSExtract = new ExtractTextPlugin('styles.css'); //extract css in styles.css
const webpack = require('webpack');

process.env.NODE_ENV = prosses.env.NODE_ENV || 'development';

if (process.env.NODE_ENV === 'test') {
  require('dotenv').config({ path: '.ent.test' });
} else if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({ path: '.ent.development' });
}

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
      CSSExtract,
      new webpack.DefinePlugin({
        'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
        'process.env.FIREBASE_AUTO_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTO_DOMAIN),
        'process.env.FIREBASE_DATABASE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL),
        'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
        'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
        'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID)

      })
    ],

    devtool: isProduction ? 'source-map' : 'inline-source-map', // to detect errors inside modeles
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      historyApiFallback: true, // tell server that we are going to tout via a client side
      publicPath: '/dist/'
    }
  }
};
