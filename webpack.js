const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const nodeExternals = require("webpack-node-externals");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");

const server = {
  name: "server",
  entry: "./server/server.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "server.js",
    clean: true,
    libraryTarget: "commonjs2", // change
  },
  watch: true,
  target: "node",
  externals: [nodeExternals()],
  plugins: [
    new MiniCssExtractPlugin({
      linkType: "text/css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js|\.jsx$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.css$/i,
        use: [{loader: MiniCssExtractPlugin.loader}, "css-loader"],
      },
    ],
  },
  optimization: {
    moduleIds: "named",
    chunkIds: "named",
  },
};
const client = {
  name: "client",
  entry: "./client/client.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    publicPath: "",
  },
  target: "web",
  plugins: [
    new WebpackManifestPlugin(),
    new MiniCssExtractPlugin({
      linkType: "text/css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js|\.jsx$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.css$/,
        use: [{ loader: MiniCssExtractPlugin.loader }, "css-loader"],
      },
    ],
  },

  optimization: {
    moduleIds: "named",
    chunkIds: "named",
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: "vendors",
          test: /[\\/]node_modules[\\/]/,
          chunks: "all",
        },
      },
    },
  },
};
module.exports = [server, client];
