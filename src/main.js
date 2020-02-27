import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import "./plugins/element.js";
import "./assets/sass/global.scss";

// 请求 baseURL
axios.defaults.baseURL = "http://127.0.0.1:8000/";
// 请求头拦截器，添加Header
// axios.interceptors.request.use(config => {
//   // console.log(config);
//   // 添加Header
//   config.headers.Authorization = window.sessionStorage.getItem("Authorization");
//   return config;
// });
Vue.prototype.$http = axios;


Vue.config.productionTip = false;


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
