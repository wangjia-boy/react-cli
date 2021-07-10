const webpack = require('webpack')
const path = require('path')
const webpackMerge = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const baseWebpackConfig = require('./webpack.config.base')

const smp = new SpeedMeasurePlugin()

const config = webpackMerge.merge(baseWebpackConfig, {
  mode: 'production',
  // devtool: 'cheap-module-source-map',
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*', '!/dll', '!dll/**']
    }),
    new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, '../dist', 'dll', 'manifest.json')
    }),
    new OptimizeCssPlugin(),
    new BundleAnalyzerPlugin.BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
      reportFilename: path.join(__dirname, '../analyzer/index.html')
    })
  ]
})

module.exports = config
// module.exports = smp.wrap(config)
