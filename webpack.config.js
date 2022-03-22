'use strict';

const webpack = require('webpack');
const fs = require('fs');
const path = require('path');
const paths = require('./config/paths');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const createEnvironmentHash = require('./config/persistentCache/createEnvironmentHash');
const getClientEnvironment = require('./config/env');
const env = getClientEnvironment(paths.publicUrlOrPath.slice(0, -1));

const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';

const pluginsDevOptions = require('./config/webpack.dev.config');
const pluginsProdOptions = require('./config/webpack.prod.config');

module.exports = (envehe, argv) => {
  const isEnvProduction = argv.mode === 'production' ? true : false;
  const isEnvDevelopment = argv.mode === 'development' ? true : false;

  return {
    mode: process.env.NODE_ENV,
    bail: true,
    target: 'browserslist',
    cache: {
      type: 'filesystem',
      version: createEnvironmentHash(env.raw),
      cacheDirectory: paths.appWebpackCache,
      store: 'pack',
      buildDependencies: {
        defaultWebpack: ['webpack/lib/'],
        config: [__filename],
        tsconfig: [paths.appTsConfig, paths.appJsConfig].filter(f =>
          fs.existsSync(f)
        ),
      },
    },
    entry: [
      './src/index.tsx'
    ],
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isEnvProduction
        ? 'static/js/[name].[contenthash:8].js'
        : isEnvDevelopment && '[name].[hash].js',
      chunkFilename: isEnvProduction
        ? 'static/js/[name].[contenthash:8].chunk.js'
        : isEnvDevelopment && '[name].[hash].js',
      assetModuleFilename: 'static/media/[name].[hash][ext]',
      publicPath: paths.publicUrlOrPath,
      clean: isEnvProduction
    },
    devtool: isEnvProduction
    ? shouldUseSourceMap
      ? 'source-map'
      : false
    : isEnvDevelopment && 'cheap-module-source-map',
    devServer: {
      static: {
        directory: path.join(__dirname, 'public'),
      },
      compress: true,
      historyApiFallback: true,
      port: 3000,
      hot: true,
      liveReload: false,
      // open: true,
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          use: [
            { loader: 'react-hot-loader/webpack' },
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true,
                cacheCompression: false,
                compact: isEnvProduction,
              }
            }
          ],
          exclude: /node_modules/
        },
        {
          test: /\.(s[ac]|c)ss$/i,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.svg$/,
          use: [
            {
              loader: '@svgr/webpack',
              options: {
                prettier: false,
                svgo: false,
                svgoConfig: {
                  plugins: [{ removeViewBox: false }],
                },
                titleProp: true,
                ref: true,
              },
            },
            {
              loader: 'file-loader',
              options: {
                name: 'static/media/[name].[hash].[ext]',
              },
            },
          ],
          issuer: {
            and: [/\.(ts|tsx|js|jsx|md|mdx)$/],
          },
        },
        {
          test: /\.(png|jpg|jpeg|gif|webp)$/i,
          type: 'asset',
        },
        {
          test: /\.ts(x)?$/,
          loader: 'ts-loader',
          exclude: /node_modules/
        }
      ]
    },
    resolve: {
        extensions: [
          '.js',
          '.jsx',
          '.ts',
          '.tsx'
        ]
    },
    optimization: {
      runtimeChunk: 'single',
      minimize: isEnvProduction,
      minimizer: [
        // This is only used in production mode
        new TerserPlugin({
          terserOptions: {
            parse: {
              ecma: 8,
            },
            compress: {
              ecma: 5,
              warnings: false,
              comparisons: false,
              inline: 2,
            },
            mangle: {
              safari10: true,
            },
            output: {
              ecma: 5,
              comments: false,
              ascii_only: true,
            },
          }
        }),
        // This is only used in production mode
        new CssMinimizerPlugin(),
      ],
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all'
          }
        }
      }
    },
    plugins: process.env.NODE_ENV === 'production' ? pluginsProdOptions : pluginsDevOptions
  };
};