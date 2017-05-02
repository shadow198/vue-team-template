'use strict';

import webpack from 'webpack'
import merge from 'webpack-merge'
import baseWebpackConfig from './webpack.base.conf'
import config from '../config'
import {root_path} from '../config/path'
import utils from './utils'

export default function(){
  const hotMiddlewareScript = 'webpack-hot-middleware/client?noInfo=true&reload=true';
  Object.keys(baseWebpackConfig.entry).forEach(name => {
    baseWebpackConfig.entry[name] = baseWebpackConfig.entry[name].concat([hotMiddlewareScript]);
  });
  return merge(baseWebpackConfig, {

    module: {
      loaders: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
    },
    devtool: '#eval-source-map',
    plugins: [
      new webpack.DefinePlugin({
        'process.env': config.dev.env
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: 'vendor.js'
      })
    ]
  })
}
