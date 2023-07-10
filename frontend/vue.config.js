const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    devServer: {
        proxy: {
            '/assets': {
                target: 'http://localhost:3000', // Replace with your backend server URL
                changeOrigin: true,
                pathRewrite: {
                    '^/assets': '', // Replace with the appropriate backend route for serving images
                },
            },
        },
    }
})
