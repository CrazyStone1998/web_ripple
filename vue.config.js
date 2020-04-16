module.exports = {
    chainWebpack: config => {
        // 发布模式
        config.when(process.env.NODE_ENV === 'production', config => {
            config.entry('app').clear().add('./src/main-prod.js');
            // config.set('externals',{t
            //     vue: 'Vue',
            //     'vue-router': 'VueRouter',
            //     axios: 'axios',
            //     nprogress: 'NProgress'
            // })
        });
        //开发模式
        config.when(process.env.NODE_ENV === 'development', config => {
            config.entry('app').clear().add('./src/main-dev.js');
        });
    }
};