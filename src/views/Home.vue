<template>
    <el-container class="home-container">
        <el-header class="home-container-header" style="height: 85px">
            <meta name="referrer" content="no-referrer"/>
            <el-row class="header-box">
                <el-col :span="6">
                    <el-image :src="require('../assets/img/logo.png')" class="logo" fit="fill"></el-image>
                    <el-image :src="require('../assets/img/rio.png')" class="rio"></el-image>
                </el-col>
                <el-col :span="15" class="header-middle">
                    <el-image
                            :src="require('../assets/img/menu.png')"
                            class="btn-menu"
                            @click="drawer = !drawer">
                    </el-image>
                    <el-input prefix-icon="el-icon-search" placeholder="请输入内容" v-model="query_content"
                              class="search-input">

                        <el-button slot="append" icon="el-icon-search"
                                   @click="search"
                        ></el-button>

                    </el-input>
                    <el-button
                            class="btn-link" @click="resourceLink"
                            @mouseover.native="mouseover($event,'el-button btn-link')"
                            @mouseout.native="mouseout($event, 'el-button btn-link')"
                    >资源库
                    </el-button>
                    <el-button class="btn-link" type="primary" @click="rankLink"
                               @mouseover.native="mouseover($event,'el-button btn-link')"
                               @mouseout.native="mouseout($event, 'el-button btn-link')"
                    >排行榜
                    </el-button>

                </el-col>
                <el-col :span="3" class="header-right">
                    <el-divider direction="vertical" style="width: 100px"></el-divider>
                    <el-button class="btn-login"
                               icon="el-icon-s-promotion"
                               @click="redirect_login"
                               @mouseover.native="mouseover($event, 'btn-login')"
                               @mouseout.native="mouseout($event, 'btn-login')">
                        Sign in
                    </el-button>
                </el-col>
            </el-row>
        </el-header>

        <el-main class="home-container-main">
            <PopularRecommend></PopularRecommend>
            <PreferenceRecommend></PreferenceRecommend>
            <CoolRecommend></CoolRecommend>
            <Footer></Footer>

        </el-main>

        <el-drawer
                title="菜单"
                :visible.sync="drawer"
                direction="ttb"
                size="20%">
            <span>this is Rio</span>
        </el-drawer>

    </el-container>
</template>

<script>
    import PopularRecommend from "../components/home/PopularRecommend";
    import PreferenceRecommend from "../components/home/PreferenceRecommend";
    import CoolRecommend from "../components/home/ColdRecommend";
    import Login from "./Login";
    import Footer from "../components/home/Footer";
    import Resource from "./Resource";
    import Register from "./Register";

    export default {
        name: "Home",
        components: {Footer, CoolRecommend, PreferenceRecommend, PopularRecommend},
        props: ["icon", "username"],
        data() {
            return {
                select: '',
                drawer: false,
                query_content: ''
            }
        },
        methods: {
            redirect_login() {
                this.$router.push(Login);
            },
            redirect_register() {
                this.$router.push(Register);
            },
            logout() {
                console.log("********");
                console.log(this.username, " ======> logout");
                window.sessionStorage.clear();
                this.username = null;
                this.icon = null;
                console.log("logout && redirect")
                console.log("********");
            },
            resourceLink() {
                this.$router.push(Resource);
            },
            rankLink() {

            },

            search() {


            },

            mouseover($event, name) {
                $event.currentTarget.className = name + " btn-active";
            },
            mouseout($event, name) {
                $event.currentTarget.className = name;
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "src/assets/sass/global";

    .home-container {
        height: 100%;
        background-color: $bg_black_global;
        background-image: linear-gradient(to right, $bg_black_global, $bg_red_global, $bg_black_global);

        .home-container-header {
            background-color: $bg_red_global;
            height: 80px;
            background-image: linear-gradient(to bottom, $bg_red_global, $bg_black_global, $bg_red_global);
            padding: 0;

            .header-box {
                .logo {
                    margin-left: 20%;
                    margin-right: 3%;
                    width: 75px;
                    height: 75px;
                    cursor: pointer;
                }

                .rio {
                    width: 125px;
                    height: 70px;
                    cursor: pointer;
                }

                .header-middle {
                    display: flex;
                    justify-content: space-around;

                    .search-input {
                        margin-top: 20px;
                        width: 550px;
                        margin-right: 30px;
                        margin-left: 40px;
                    }

                    .btn-menu {
                        margin-top: 1%;
                        width: 50px;
                        height: 50px;
                        cursor: pointer;
                    }

                    .btn-link {
                        margin-top: 1%;
                        background-color: transparent;
                        border-color: transparent;
                        font-size: x-large;
                        margin-left: -50px;
                        margin-right: -30px;
                        color: $bg_blue_global;
                    }

                    .btn-active {
                        border-color: $bg_green_global;
                        color: $bg_green_global;
                        font-size: xx-large;
                        padding: 8px;

                    }
                }

                .header-right {
                    margin-top: 20px;
                    display: flex;
                    justify-content: flex-end;

                    .btn-login {
                        background-color: transparent;
                        border-color: transparent;
                        font-size: x-large;
                        margin-right: 10%;
                        border-radius: 6px;
                        padding: 2px;
                        color: $bg_gray_light_global;
                    }

                    .btn-active {
                        border-color: $bg_green_global;
                        color: $bg_green_global;
                        font-size: xx-large;
                        margin-top: -5px;
                    }
                }
            }
        }

        .home-container-main {
            padding-top: 3%;
            padding-bottom: 0;
        }

    }
</style>