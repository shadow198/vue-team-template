'use strict';

import checkVersions from './check-versions'

import ProgressPlugin from 'webpack/lib/ProgressPlugin'

import ora from 'ora';
import path from 'path';
import chalk from 'chalk';
import webpack from 'webpack';
import config from '../config';
import webpackConfig from './webpack.prod.conf';

export default function () {
  checkVersions();
  require('shelljs/global');
  const spinner = ora('building for production...');
  spinner.start();

  const assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory);
  rm('-rf', assetsPath);
  mkdir('-p', assetsPath);
  cp('-R', 'src/assets/*', assetsPath);

  const compiler = webpack(webpackConfig);
  compiler.apply(new ProgressPlugin());

  compiler.run((err, stats) => {
    spinner.stop();
    if (err) throw err;
    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }) + '\n\n');

    console.log(chalk.cyan('  Build complete.\n'));
  });
}
