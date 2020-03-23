<template>
    <el-container class="resource-container">
        <el-header class="resource-container-header" style="height: 85px">
            <LibraryHeader></LibraryHeader>
        </el-header>

        <el-main class="resource-container-main">
            <Query></Query>

            <Footer></Footer>
        </el-main>
    </el-container>
</template>

<script>
    import Login from "./Login";
    import Footer from "../components/home/Footer";
    import Query from "../components/library/Category";
    import Home from "./Home";
    import {mapState} from "vuex";
    import UserDetail from "../components/detail/UserDetail";
    import LibraryHeader from "../components/library/LibraryHeader";

    export default {
        name: "Resource",
        components: {LibraryHeader, Query, Footer},
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
                this.$router.push(
                    {name: ""}
                );
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

    .resource-container {
        height: 100%;
        background-color: $bg_black_global;

        .resource-container-header {
            padding: 0;
        }

        .resource-container-main {
            padding: 0;
        }
    }
</style>