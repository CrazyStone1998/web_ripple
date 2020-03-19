import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import base from "./assets/js/base";
import "./plugins/element.js";
import "./assets/js/globalArgs";

import "./assets/sass/global.scss";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import "./assets/js/iconfont";
import "./assets/sass/fonts.scss";
import globalArgs from "./assets/js/globalArgs";


// 简单配置
NProgress.inc(0.2);
NProgress.configure({easing: 'ease', speed: 500, showSpinner: false});

// 请求 baseURL
axios.defaults.baseURL = "http://127.0.0.1:8000/";

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


Vue.use(base);
Vue.prototype.$http = axios;
Vue.prototype.$global = globalArgs;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
