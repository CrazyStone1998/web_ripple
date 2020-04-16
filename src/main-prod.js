import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import router from "./router";
import store from "./store";
import axios from "axios";
import "./plugins/element.js";
import "./plugins/videoPlayer"
import "./assets/js/globalArgs";

import "./assets/sass/global.scss";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import "./assets/js/iconfont";
import "./assets/sass/fonts.scss";



// 简单配置
NProgress.inc(0.2);
NProgress.configure({easing: 'ease', speed: 500, showSpinner: false});

// 请求 baseURL
axios.defaults.baseURL = "http://172.0.0.3:8000/";

// 请求头拦截器，添加Header
// 在request拦截器中,展示进度条 NProgress.start()
axios.interceptors.request.use(config => {
//   // console.log(config);
//   // 添加Header
//   config.headers.Authorization = window.sessionStorage.getItem("Authorization");
    // 添加进度条
    NProgress.start();
    return config;
});

// 在response 拦截器中,隐藏进度条 NProgress.done()
axios.interceptors.response.use(config => {
    NProgress.done();
    return config
});


Vue.prototype.$http = axios;
Vue.config.productionTip = false;

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject);
    return originalPush.call(this, location).catch(err => err)
};


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
