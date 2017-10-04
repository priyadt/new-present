var webpack = require('webpack');
var path = require('path');
require('babel-polyfill');

var DIST_DIR = path.resolve(__dirname,'dist');
var SRC_DIR = path.resolve(__dirname,'src');

var config = {
    entry:['babel-polyfill',SRC_DIR+'/js/index.js'],
    output:{
        path:DIST_DIR,
        filename:"bundle.js",
        publicPath:"/"
    },
    devtool: 'source-map',
    plugins: [
    // new webpack.DefinePlugin({
    //   __APP_CONFIG__: JSON.stringify(composeConfig(ENV))
    // })
  ],
  devServer: {
    host: 'localhost',
    port: 6357,
  },
  module:{
        loaders:[
            {
                test:/\.jsx?/,
                include:SRC_DIR,
                exclude:/node_modules/,
                loader:'babel-loader'
            },
            {
                test: /\.css/,
                loader: 'style-loader!css-loader'
            }
        ]
    }
}

module.exports= config;
