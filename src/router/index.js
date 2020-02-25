import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../components/Login";
import Register from "../components/Register";
import Home from "../components/Home";


Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        redirect: Login
    },
    {
        path: "/login",
        name: "Login",
        component: Login
    },
    {
        path: "/register",
        name: "Register",
        component: Register
    },
    {
        path: "/home",
        name: "Home",
        component: Home
    }
];

const router = new VueRouter({
    routes
});

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  /**
   * to: 将要访问的路径
   * from: 代表从那个路径跳转而来
   * next: 是那个函数，代表放行
   *      next() 放行， next("/login") 强制跳转
   */
  if (to.path === "/login") {

    return next();
  }
  const authorization = window.sessionStorage.getItem("Authorization");
  if (!authorization) {
    return next("/login");
  }
  next();



});


export default router;
