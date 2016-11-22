var webpack = require('webpack');

module.exports = {
  entry: ["babel-polyfill", "./src/main.js"],
  output: {
    path: __dirname + "/public/build/",
    publicPath: "/build/",
    filename: "bundle.js",
    library: "app"
  },
  module:{
    loaders: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: [/node_modules/,/public/]
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        exclude: [/node_modules/,/public/]
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader!autoprefixer-loader",
        exclude: [/node_modules/,/public/]
      },
      {
        test: /\.scss$/,
        loader: "style-loader!css-loader!autoprefixer-loader!sass-loader",
        exclude: [/node_modules/,/public/]
      },
      {
        test: /\.gif$/,
        exclude: "url-loader?limit=10000&mimetype=image/gif"
      },
      {
        test: /\.jpg$/,
        exclude: "url-loader?limit=10000&mimetype=image/jpg"
      },
      {
        test: /\.png$/,
        exclude: "url-loader?limit=10000&mimetype=image/png"
      },
      {
        test: /\.svg$/,
        exclude: "url-loader?limit=26000&mimetype=image/svg"
      },
      {
        test: /\.json$/,
        loader: "json-loader"
      }
    ]
  }
}
