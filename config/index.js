'use strict';
import path from 'path';
import prodEnv from './prod.env';
import devEnv from './dev.env';
import {root_path} from './path';
export default {
  build: {
    env: prodEnv,
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'assets',
    assetsPublicPath: root_path+'', /*相对目录*/
    productionSourceMap: true
  },
  dev: {
    env: devEnv,
    port: process.env.DEV_PORT || 8080,
    autoOpenBrowser: true,
    assetsSubDirectory: 'assets',
    assetsPublicPath: '/',
    proxyTable: {
      /*'/api': {
        target: 'http://www.baidu.com',
        changeOrigin: true,
        pathRewrite: {
          '^/api' : ''
        }
      }*/
    },
    cssSourceMap: false
  }
}
