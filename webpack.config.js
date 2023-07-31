const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    bundle: path.resolve(__dirname, "src/index.js"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js", // Will be name bundle due to the property's name used in entry object
    clean: true, // Keep only one version of bundle.js
    assetModuleFilename: "[name][ext]", // Avoid images getting renamed when sent to dist folder
  },
  devtool: "source-map", // Track the right file if error found inside bundle.js
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    port: 3000,
    open: true, // Open browser on dev command
    hot: true, // Hot reloading
    compress: true, // Enable gzip
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.js$/,
        exclude: /\node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "assets/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "React App",
      filename: "index.html",
      template: "src/template.html",
    }),
  ],
};
