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
import MovieDetail from "../components/detail/MovieDetail";
import TopRank from "../views/TopRank";
import CelebrityDetail from "../components/detail/CelebrityDetail";
import Demo from "../views/Demo";
import NotFound from "../views/NotFound";


Vue.use(VueRouter);

const routes = [
    {
        path: "/demo", component: Demo
    },

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
        path: "/top", name: "TopRank", component: TopRank
    },

    {
        path: "/mine", name: "Mine", component: Mine
    },

    {
        path: "/detail", name: "Detail", component: Detail,
        children: [
            {
                path: "movie/:movieId",
                name: "MovieDetail",
                component: MovieDetail,
                props: route => ({movieId: route.params.movieId, movieInfo: route.params.movieInfo})
            },
            {
                path: "user/:userId",
                name: "UserDetail",
                component: UserDetail,
                props: route => ({userId: route.params.userId, user: route.params.user})
            },
            {
                path: "celebrity/:celebrityId",
                name: "CelebrityDetail",
                component: CelebrityDetail,
                props: route => ({
                    celebrityId: route.params.celebrityId,
                    celebrityInfo: route.params.celebrityInfo,
                    celebrityGenre: route.params.celebrityGenre
                })
            },
        ]
    },
    {
        path: "/404",
        name: "NotFound",
        component: NotFound
    },
    {
        path: "*", // 此处需特别注意置于最底部
        redirect: "/404"
    }

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
