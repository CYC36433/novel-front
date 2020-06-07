'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    // 代理配置
    proxyTable: {
      '/api': {
        target: 'http://192.168.43.117:9000', // 代理的目标IP地址
        changeOrigin: true, // 是否将主机头的源更改为目标URL
        ws: true, // 是否代理websocket
        secure: false, // 是否验证SSL证书
        pathRewrite: {
          '^/api': ''
        }
      },
      '/resource': {
        target: 'http://10.124.131.79/resource', // 代理的目标IP地址
        changeOrigin: true, // 是否将主机头的源更改为目标URL
        ws: true, // 是否代理websocket
        secure: false, // 是否验证SSL证书
        pathRewrite: {
          '^/resource': ''
        }
      }
    },

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
    autoOpenBrowser: true, // 自动打开浏览器
    useEslint: true, // 使用eslint规范代码
    showEslintErrorsInOverlay: true, // 展示eslint的错误提示

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './', // 修改打包路径为相对路径，以便项目分离

    /**
     * Source Maps
     */

    productionSourceMap: false,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
