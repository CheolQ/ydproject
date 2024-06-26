const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
<<<<<<< HEAD
  devServer: {
    proxy: {
      "/api" :{
        target: 'http://localhost:3000',
        ws: false,
        changeOrigin: true,
        pathRewrite: {'^/api': ''}
      }
    }
  }
})
=======
    devServer: {
      proxy: {
        "/api": {
          target: "http://localhost:3000",
        },
      },
    },
  });
>>>>>>> cheol
