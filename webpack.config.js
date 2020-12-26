const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const CopyPlugin = require("copy-webpack-plugin");
const HtmlMinimizerPlugin = require('html-minimizer-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/js/app.js',
    users: './src/js/users.js',
  },
  output: {
    filename: '[name].[contenthash].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      chunks: ['main']
    }),
    new HtmlWebpackPlugin({
      filename: 'users.html',
      template: './src/users.html',
      chunks: ['users']
    }),
    new CleanWebpackPlugin.CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css'
    }),
    new webpack.SourceMapDevToolPlugin(),
    new CopyPlugin({
      patterns: [
        { from: "src/manifest", to: "" },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      }, {
        test: /\.(png|jpe?g|gif|svg)$/i,
        loader: 'file-loader',
        options: {
          name: '[name].[hash].[ext]',
          outputPath: 'images',
          publicPath: 'images',
        },
      }, {
        test: /\.html$/i,
        loader: 'html-loader',
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
      '...',
      new HtmlMinimizerPlugin(),
      new CssMinimizerPlugin(),
    ],
  },
};