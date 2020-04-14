'use strict';

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const AssetsWebpackPlugin = require('assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const {
  PROJECT_PATH,
  TARGET_DIR,
  PUBLIC_PATH,
  CSS_MODULES,
} = require('./config.js');

const BASE_CONFIG = require('./webpack.config.base');

module.exports = merge(BASE_CONFIG, {
  mode: 'production',
  output: {
    filename: '[name]-[chunkhash:8].js',
    path: path.resolve(PROJECT_PATH, TARGET_DIR, 'rsrc/dist'),
    publicPath: PUBLIC_PATH,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.(css|scss)$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: CSS_MODULES
                ? {
                    mode: CSS_MODULES,
                    localIdentName: '[name]__[local]--[hash:base64:5]',
                  }
                : false,
              importLoaders: 1,
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 5120,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name]-[contenthash:8].css',
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
    }),
    new AssetsWebpackPlugin({
      processOutput: (assets) =>
        JSON.stringify(assets).replace(new RegExp(PUBLIC_PATH, 'ig'), ''),
    }),
  ],
});
