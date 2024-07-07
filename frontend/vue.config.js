const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      "/api" :{
        target: 'http://localhost:3000',
        ws: false,
        changeOrigin: true,
        pathRewrite: {'^/api': ''}
      },
      "/v1" :{
        target: 'https://api.iamport.kr',
        ws: false,
        changeOrigin: true,
        pathRewrite: {'^/v1': ''}
      },
    }
    
    }
  })
