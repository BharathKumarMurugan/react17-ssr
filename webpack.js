const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const nodeExternals = require('webpack-node-externals');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

const server = {
   name: 'server',
   entry: './server.js',
   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'server.js',
      clean: true,
      libraryTarget: 'commonjs2'
   },
   watch: true,
   target: 'node', // in order to ignore built-in modules like path, fs, etc.
   externals: [nodeExternals()],
   plugins: [
      new MiniCssExtractPlugin()
   ],
   module: {
      rules: [
         {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: ['babel-loader']
         },
         {
            test: /\.css$/i,
            use: [MiniCssExtractPlugin.loader, "css-loader"]
         }
      ]
   },
   optimization: {
      moduleIds: 'named',
      chunkIds: 'named',
   },
}
const client = {
   name: 'client',
   entry: './client.js',
   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js',
      publicPath: ""
   },
   target: 'web',
   module: {
      rules: [
         {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: ['babel-loader']
         },
         {
            test: /\.css$/i,
            use: [MiniCssExtractPlugin.loader, "css-loader"]
         }
      ]
   },
   plugins: [
      new WebpackManifestPlugin(),
      new MiniCssExtractPlugin()
   ],
   optimization: {
      moduleIds: 'named',
      chunkIds: 'named',
      splitChunks: {
         cacheGroups: {
            vendor: {
               name: "vendors",
               test: /[\\/]node_modules[\\/]/,
               chunks: "all",
            },
         },
      },
   }
}

module.exports = [server, client];