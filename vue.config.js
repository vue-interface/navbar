module.exports = {
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    require('tailwindcss')
                ]
            }
        }
    },
    chainWebpack: config =>  {
        config.plugins.delete('optimize-css')
    }
};