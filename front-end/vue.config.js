const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      "api": {
        target: "http://localhost:1337",
        changeOrigin: true,
      }
    }
  }
})
