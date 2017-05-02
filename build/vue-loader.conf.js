'use strict';

import utils from './utils';
import config from '../config';
import autoprefixer from 'autoprefixer';
const isProduction = process.env.NODE_ENV === 'production';

export default {
  loaders: {
      ...utils.cssLoaders({
        sourceMap: isProduction ? config.build.productionSourceMap : config.dev.cssSourceMap,
        extract: isProduction
      }),
      
  },
  postcss: [
    autoprefixer({
      browsers: ['last 3 versions']
    })
  ]
}
