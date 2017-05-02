'use strict';
import checkVersions from './check-versions'

import path from 'path';
import webpack from 'webpack';
import config from '../config';
import proxyMiddleware from 'http-proxy-middleware';
import devConf from './webpack.dev.conf';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import connectHistoryApiFallback from 'connect-history-api-fallback';
import browserSync from 'browser-sync';
import {root_path} from '../config/path';

/*代理没有设置*/
export default ()=>{
  //checkVersions();
  const webpackConfig = devConf();
  const port = process.env.PORT || config.dev.port;
  const proxyTable = config.dev.proxyTable;
  const compiler = webpack(webpackConfig);
  const devMiddleware = webpackDevMiddleware(compiler, {
    contentBase: path.join(__dirname,'../'),
    index: 'index.html',
    publicPath: webpackConfig.output.publicPath,
    stats: {
      colors: true,
      chunks: false
    }
  });
  const hotMiddleware = webpackHotMiddleware(compiler);

  compiler.plugin("after-emit", function(compilation, callback) {
    browserSync.reload();
    callback();
  });


  let proxy = [];
  Object.keys(proxyTable).forEach(context => {
    let options = proxyTable[context];
    if (typeof options === 'string') {
      options = { target: options }
    }
    proxy.push(proxyMiddleware(options.filter || context, options))
  });
  return {
    serveConfig:{
      port:port,
      server: {
        baseDir: root_path,
        routes: {
          "/node_modules": "node_modules",
          "/assets": "src/assets"
        },
        middleware: [
          connectHistoryApiFallback(),
          devMiddleware,
          hotMiddleware,
          ...proxy
        ]
      }
    }
  }
}
