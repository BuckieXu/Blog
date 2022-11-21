const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  // 避免Eslint报错
  lintOnSave: false,
  transpileDependencies: true,
  assetsDir: 'static',
  parallel: false,
  publicPath: './',
})
