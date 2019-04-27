const { src, dest } = require('gulp');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');
exports.default =  function() {
  return src(['src/linker.js'])
    .pipe(webpackStream(webpackConfig), webpack)
    .pipe(dest('./output'));
}