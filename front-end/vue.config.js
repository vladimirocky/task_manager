const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      "/api": {
        target: "https://task-manager-devhouse.herokuapp.com/",
        changeOrigin: true,
      }
    }
  }
})
