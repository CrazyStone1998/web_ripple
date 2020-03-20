<template>
    <el-container class="detail-container">
        <el-header class="detail-container-header" style="height: 85px">
            <Header></Header>
        </el-header>

        <el-main class="detail-container-main">
            <router-view></router-view>
            <el-divider></el-divider>
            <Footer></Footer>
        </el-main>
    </el-container>
</template>

<script>
    import Login from "./Login";
    import Footer from "../components/home/Footer";
    import Home from "./Home";
    import TopRank from "./TopRank";
    import {mapState} from "vuex";
    import UserDetail from "../components/detail/UserDetail";
    import Header from "../components/home/Header";

    export default {
        name: "Detail",
        components: {Header, Footer},
        data() {
            return {
                select: '',
                drawer: false,
                query_content: ''
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
            rankLink() {
                this.$router.push(TopRank);
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

    .detail-container {
        height: 100%;
        background-color: $bg_black_global;

        .detail-container-header {
            padding: 0;
        }

        .detail-container-main {
            padding: 0;
        }
    }
</style>