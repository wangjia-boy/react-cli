const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const baseWebpackConfig = require('./webpack.config.base')

const smp = new SpeedMeasurePlugin()

const config = webpackMerge.merge(baseWebpackConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    // new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    hot: true,
    port: 3000,
    open: true,
    quiet: false,
    inline: true,
    stats: 'errors-only',
    overlay: false,
    clientLogLevel: 'silent',
    compress: true,
    proxy: {
      '/': {
        bypass: function(req, res, proxyOptions) {
          return `/index.html`
        }
      },
      '/api': {
        target: 'https://api.exchangerate-api.com/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
})

module.exports = config
// module.exports = smp.wrap(config)
