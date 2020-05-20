module.exports = {
    chainWebpack: config => {
        // 发布模式
        config.when(process.env.NODE_ENV === 'production', config => {
            config.entry('app').clear().add('./src/main-prod.js');
            // config.set('externals',{
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
    },
    pwa: {
        name: 'Rio',
        themeColor: '#4DBA87',
        msTileColor: '#000000',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'black',

        // 配置 workbox 插件
        workboxPluginMode: 'InjectManifest',
        workboxOptions: {
            // InjectManifest 模式下 swSrc 是必填的。
            swSrc: './public/sw.js', // 本地sw.js相对路径
            importWorkboxFrom: 'disabled', // 决定是否引入workbox
            exclude: [/\.html$/, /\.css.map$/, /sw.js$/] // 缓存列表排除的文件，可以是文件名或正则
        }
    }
};