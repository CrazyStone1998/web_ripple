<template>
    <el-container class="home-container">
        <el-header class="home-container-header" style="height: 85px">
            <meta name="referrer" content="no-referrer"/>
            <el-row class="header-box">
                <el-col :span="6">
                    <el-image :src="require('../assets/img/logo.png')" href="/login" class="logo" fit="fill"></el-image>
                    <el-image :src="require('../assets/img/rio.png')" class="rio"></el-image>
                </el-col>
                <el-col :span="14" class="header-middle">
                    <el-image
                            :src="require('../assets/img/menu.png')"
                            class="btn-menu"
                            @click="drawer = !drawer"
                            @mouseover.native="mouseover($event, 'menu-active')"
                            @mouseout.native="mouseout($event, 'menu-active')"
                    >
                    </el-image>
                    <el-input prefix-icon="el-icon-search" placeholder="请输入内容" v-model="query_content"
                              class="search-input">

                        <el-button slot="append" icon="el-icon-search"
                                   @click="search"
                        ></el-button>

                    </el-input>
                    <el-button
                            class="btn-link" @click="resourceLink"
                            @mouseover.native="mouseover($event,'btn-active')"
                            @mouseout.native="mouseout($event, 'btn-active')"
                    >资源库
                    </el-button>
                    <el-button class="btn-link" type="primary" @click="rankLink"
                               @mouseover.native="mouseover($event,'btn-active')"
                               @mouseout.native="mouseout($event, 'btn-active')"
                    >排行榜
                    </el-button>
                </el-col>

                <el-col :span="4" class="header-right-user" v-if="this.loginState">
                    <el-avatar class="home-user-avatar" :src="userIcon"></el-avatar>
                    <el-dropdown class="home-user-dropdown">
                        <span class="el-dropdown-link">
                            <el-tag class="home-user-tag">{{username}}</el-tag>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>系统消息</el-dropdown-item>
                            <el-dropdown-item>私信</el-dropdown-item>
                            <el-dropdown-item>愿望单</el-dropdown-item>
                            <el-dropdown-item @click.native="redirect_userInfo">我的信息</el-dropdown-item>
                            <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-col>
                <el-col :span="4" class="header-right" v-else>
                    <el-divider direction="vertical" style="width: 100px"></el-divider>
                    <el-button class="btn-login"
                               icon="el-icon-s-promotion"
                               @click="redirect_login"
                               @mouseover.native="mouseover($event, 'btn-active')"
                               @mouseout.native="mouseout($event, 'btn-active')">
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
    import {mapState} from "vuex";
    import Rank from "./TopRank";


    export default {

        name: "Home",
        components: {Footer, CoolRecommend, PreferenceRecommend, PopularRecommend},
        data() {
            return {
                select: '',
                drawer: false,
                hasLoading: 3,
                query_content: ''
            };
        },
        computed: mapState({
            loginState: 'loginState',
            username: 'username',
            userIcon: 'userIcon',
            loadingCalculation: "loadingCalculation"
        }),
        watch: {
            loadingCalculation(curVal, oldVal) {

                if (curVal === 0 && oldVal === 1) {
                    const loading = this.$loading();
                    loading.close();
                }
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
                this.$store.commit('delUser');
                console.log("logout && redirect");
                console.log("********");
            },
            redirect_userInfo() {
                this.$router.push(
                    {
                        name: 'UserDetail',
                        params: {
                            username: this.username
                        }
                    }
                );
            },

            resourceLink() {
                this.$router.push(Resource);
            },
            rankLink() {
                this.$router.push(Rank);
            },

            search() {

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
        },
        beforeCreate() {
            if (this.$store.state.loadingCalculation) {
                this.$loading({
                    lock: true,
                    text: '加 载 中',
                    spinner: 'el-icon-loading',
                    background: 'rgba(26, 34, 40, 0.9)'
                });
            }
        },
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
                        width: 45px;
                        height: 45px;
                        cursor: pointer;
                        padding-left: 5px;
                    }

                    .menu-active {
                        border-radius: 6px;
                        box-shadow: 0 0 5px 10px rgba(211, 232, 248, 0.5);
                        width: 50px;
                        padding-left: 0;
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
                        background-color: rgba(211, 232, 248, 0.3);
                        padding: 8px;

                    }
                }

                .header-right {
                    margin-top: 20px;
                    display: flex;
                    justify-content: flex-end;

                    .el-divider--vertical {
                        width: 3px;
                        height: 50px;
                        border-radius: 6px;
                        background-color: $bg_green_global;
                        border-color: rgba(211, 232, 248, 0.3);
                    }

                    .btn-login {
                        background-color: transparent;
                        border-color: rgba(211, 232, 248, 0.3);
                        font-size: x-large;
                        margin-right: 10%;
                        border-radius: 6px;
                        padding-left: 0;
                        padding-right: 2%;
                        color: $bg_gray_light_global;
                    }

                    .btn-active {
                        border-color: $bg_green_global;
                        color: $bg_green_global;
                        font-size: xx-large;
                        margin-top: -5px;
                        margin-right: 0;
                    }
                }

                .header-right-user {
                    margin-top: 20px;
                    display: flex;
                    justify-content: flex-end;

                    .home-user-avatar {
                        cursor: pointer;
                    }

                    .el-dropdown-link {
                    }

                    .home-user-tag {
                        background-color: transparent;
                        border-color: transparent;
                        font-size: x-large;
                        color: $bg_green_global;
                        cursor: pointer;


                    }

                    .home-user-dropdown {
                        margin: 5px 10px 0 10px;

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