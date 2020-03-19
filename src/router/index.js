import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login";
import Home from "../views/Home";
import AdminHome from "../views/AdminHome";
import AdminIndex from "../components/admin/AdminIndex";
import AdminUser from "../components/admin/AdminUser";
import AdminRole from "../components/admin/AdminRole";
import AdminPermission from "../components/admin/AdminPermission";
import AdminMovie from "../components/admin/AdminMovie";
import AdminGenre from "../components/admin/AdminGenre";
import AdminStarring from "../components/admin/AdminStarring";
import AdminDirectorScreenwriter from "../components/admin/AdminDirectorScreenwriter";
import AdminDataStatistic from "../components/admin/AdminDataStatistic";
import Resource from "../views/Resource";
import Register from "../views/Register";
import Mine from "../views/Mine";
import Detail from "../views/Detail";
import UserDetail from "../components/detail/UserDetail";
import StarringDetail from "../components/detail/StarringDetail";
import DirectorScreenwriterDetail from "../components/detail/DirectorScreenwriterDetail";
import MovieDetail from "../components/detail/MovieDetail";
import TopRank from "../views/TopRank";


Vue.use(VueRouter);

const routes = [

    // 基础路由
    {
        path: "/", redirect: Home
    },

    {
        path: "/login", name: "Login", component: Login
    },

    {
        path: "/register", name: "Register", component: Register
    },

    {
        path: "/admin", name: "Admin", redirect: AdminIndex, component: AdminHome, children: [
            {path: "index", name: "AdminIndex", component: AdminIndex},
            {path: "user", name: "AdminUser", component: AdminUser},
            {path: "role", name: "AdminRole", component: AdminRole},
            {path: "permission", name: "AdminPermission", component: AdminPermission},
            {path: "movie", name: "AdminMovie", component: AdminMovie},
            {path: "genre", name: "AdminGenre", component: AdminGenre},
            {path: "starring", name: "AdminStarring", component: AdminStarring},
            {path: "directorAndScreenwriter", name: "AdminDirectorScreenwriter", component: AdminDirectorScreenwriter},
            {path: "dataStatistic", name: "AdminDataStatistic", component: AdminDataStatistic}
        ]
    },

    {
        path: "/home", name: "Home", component: Home,
        props: route => ({icon: route.params.icon, username: route.params.username})
    },

    {
        path: "/resource", name: "Resource", component: Resource
    },

    {
        path: "/topRank", name: "topRank", component: TopRank
    },

    {
        path: "/mine", name: "Mine", component: Mine,
    },

    {
        path: "/detail", name: "Detail", component: Detail,
        children: [
            {
                path: "movie/:id",
                name: "MovieDetail",
                component: MovieDetail,
                props: route => ({id: route.params.id, movie: route.params.movie})
            },
            {
                path: "user/:id",
                name: "UserDetail",
                component: UserDetail,
                props: route => ({id: route.params.id, movie: route.params.user})
            },

            {
                path: "starring/:id",
                name: "StarringDetail",
                component: StarringDetail,
                props: route => ({id: route.params.id, starring: route.params.starring})
            },
            {
                path: "directorScreenwriter/:id",
                name: "DirectorScreenwriterDetail",
                component: DirectorScreenwriterDetail,
                props: route => ({id: route.params.id, directorScreenwriter: route.params.directorScreenwriter})
            }
        ]
    },

];

const router = new VueRouter({
    routes
});

// 挂载路由导航守卫
// router.beforeEach((to, from, next) => {
//   /**
//    * to: 将要访问的路径
//    * from: 代表从那个路径跳转而来
//    * next: 是那个函数，代表放行
//    *      next() 放行， next("/login") 强制跳转
//    */
//   if (to.path === "/home") {
//
//     return next();
//   }
//   const authorization = window.sessionStorage.getItem("Authorization");
//   if (!authorization) {
//     return next(Login);
//   }
//   next();
// });


export default router;
