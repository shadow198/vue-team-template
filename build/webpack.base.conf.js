'use strict';

import path from 'path';
import config from '../config';
import utils from './utils';
import {root_path,back_root} from '../config/path';
import vueLoaderConf from './vue-loader.conf';
const projectRoot = path.resolve(__dirname, '../');

module.exports = {
  entry: {
    app: [root_path+'src/index.js'],
    vendor: [
      'vue',
      'vue-router',
      'vuex',
      'vuex-router-sync'
    ]
  },
  externals:{
    $:'window.$'
  },
  output: {
    path: config.build.assetsRoot,
    publicPath: config.dev.assetsPublicPath,
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.css', '.json'],
    alias: {
      package: path.resolve(__dirname, back_root+'package.json'),
      src: path.resolve(__dirname, '../src'),
      assets: path.resolve(__dirname, '../src/assets'),
      components: path.resolve(__dirname, '../src/components'),
      directives: path.resolve(__dirname, '../src/directives'),
      filters: path.resolve(__dirname, '../src/filters'),
      serves: path.resolve(__dirname, '../src/serves'),
      styles: path.resolve(__dirname, '../src/styles'),
      utils: path.resolve(__dirname, '../src/utils'),
      views: path.resolve(__dirname, '../src/views'),
      store: path.resolve(__dirname, '../src/store')
    }
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConf
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: projectRoot,
        exclude: [new RegExp(`node_modules\\${path.sep}(?!vue-bulma-.*)`)]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 4000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.html$/,
        use: [ "html-loader" ]
      }
    ]
  },
  performance: {
    hints: false
  }
};
