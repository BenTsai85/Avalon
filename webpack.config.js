const path = require( 'path' );
const webpack = require( 'webpack' );

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: './src/index',
  output: {
    path: path.join( __dirname, 'dist' ),
    filename: 'bundle.js',
    publicPath: '/static/',
  },
  plugins: [
    new webpack.DefinePlugin( {
      'process.env': {
        NODE_ENV: JSON.stringify( 'development' ),
      },
    } ),
  ],
  module: {
    loaders: [ {
      test: /\.js$/,
      loaders: [ 'babel' ],
      exclude: /node_modules/,
    },
    {
      test: /\.css$/,  // target: css files
      loaders: [ 'style', 'css' ], // use both loaders
      exclude: /node_modules/,   // 不要處理 3rd party 的 code
    } ],
  },
};
