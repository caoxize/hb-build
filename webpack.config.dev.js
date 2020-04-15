'use strict';

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const StylelintWebpackPlugin = require('stylelint-webpack-plugin');

const BASE_CONFIG = require('./webpack.config.base');

const { DEV_HOST, DEV_PORT, CSS_MODULES } = require('./config');

module.exports = merge(BASE_CONFIG, {
  mode: 'development',
  output: {
    filename: '[name]-stamp4hash.js',
    publicPath: 'http://' + DEV_HOST + ':' + DEV_PORT + '/static/js/',
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'eslint-loader',
            options: {
              emitError: true,
            },
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.(css|scss)$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
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
              limit: 51200,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new StylelintWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    hot: true,
    host: DEV_HOST,
    port: DEV_PORT,
  },
  devtool: 'cheap-module-eval-source-map',
});
