'use strict';

import path from 'path';
import config from '../config';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const assetsPath = _path => {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory;
  return path.posix.join(assetsSubDirectory, _path)
};
const cssLoaders = options => {
  options = options || {};
  const generateLoaders = loaders => {
    const sourceLoader = loaders.map(loader => {
      let extraParamChar;
      if (/\?/.test(loader)) {
        loader = loader.replace(/\?/, '-loader?');
        extraParamChar = '&'
      } else {
        loader = loader + '-loader';
        extraParamChar = '?'
      }
      return loader + (options.sourceMap ? extraParamChar + 'sourceMap' : '')
    }).join('!');
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: sourceLoader,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader', sourceLoader].join('!')
    }
  };
  return {
    css: generateLoaders(['css']),
    stylus: generateLoaders(['css','stylus']),
    styl: generateLoaders(['css', 'stylus'])
  }
};
const styleLoaders = options => {
  const output = [];
  const loaders = cssLoaders(options);
  for (const extension of Object.keys(loaders)) {
    const loader = loaders[extension];
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      loader: loader
    })
  }
  return output
};
export default {assetsPath,cssLoaders,styleLoaders}
