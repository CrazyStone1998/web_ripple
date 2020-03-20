<template>
    <el-container class="top-rank-container">
        <el-header class="top-rank-container-header" style="height: 85px">
            <Header></Header>
        </el-header>

        <el-main class="top-rank-container-main">
            <RankShow></RankShow>
            <Footer></Footer>
        </el-main>
    </el-container>
</template>

<script>
    import Login from "./Login";
    import Footer from "../components/home/Footer";
    import Home from "./Home";
    import {mapState} from "vuex";
    import UserDetail from "../components/detail/UserDetail";
    import Resource from "./Resource";
    import RankShow from "../components/top/RankShow";
    import Header from "../components/home/Header";

    export default {
        name: "TopRank",
        components: {Header, RankShow, Footer},
        data() {
            return {
                select: '',
                drawer: false,
                query_content: '',

            }
        },
        computed: mapState({
            loginState: "loginState",
            username: "username",
            userIcon: "userIcon"
        }),
        methods: {

            search() {

            },
            logout() {
                console.log("user ======> logout");
                this.$store.commit('delUser');
                this.$router.push(Login);
                console.log("logout && redirect")
            },
            redirect_login() {
                this.$router.push(Login);
            },
            redirect_userInfo() {
                this.$router.push(UserDetail);
            },

            homeLink() {
                this.$router.push(Home);
            },
            resourceLink() {
                this.$router.push(Resource);
            },

            // 监听方法
            mouseover($event, activeClassName) {
                $event.currentTarget.className += " " + activeClassName;
            },
            mouseout($event, activeClassName) {
                $event.currentTarget.className =
                    $event.currentTarget.className.slice(
                        0,
                        $event.currentTarget.className.indexOf(" " + activeClassName)
                    )
            }

        }
    }
</script>

<style lang="scss" scoped>
    @import "src/assets/sass/global";

    .top-rank-container {
        height: 100%;
        background-color: $bg_black_global;

        .top-rank-container-header {
            padding: 0;
        }

    }
</style>