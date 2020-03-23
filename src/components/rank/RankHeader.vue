<template>
    <div class="container-header">
        <el-row class="header-box">
            <el-col :span="6">
                <el-image class="logo" :src="require('../../assets/img/logo.png')" @click="redirect_home"></el-image>
                <el-image class="rio" :src="require('../../assets/img/rio.png')" @click="redirect_home"></el-image>
            </el-col>

            <el-col :span="10" class="header-middle">

                <el-button class="btn-menu" icon="el-icon-s-grid" @click="drawer=!drawer">Menu</el-button>

                <el-input class="search-input" v-model="queryContent" placeholder="请输入内容">
                    <el-select v-model="limitPick" @change="genreSelectChange" slot="prepend" placeholder="All">
                        <el-option label="All" value="all"></el-option>
                        <el-option label="类型" value="genre"></el-option>
                        <el-option label="演员" value="starring"></el-option>
                        <el-option label="导编" value="directorScreenwriter"></el-option>
                    </el-select>
                    <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                </el-input>

            </el-col>
            <el-col :span="4" class="header-link">
                <el-button class="btn-link" icon="el-icon-s-flag" @click="redirect_home">首页</el-button>

                <el-button class="btn-link" icon="el-icon-s-home" @click="redirect_resource">资源库</el-button>

                <el-button class="btn-link" icon="el-icon-s-marketing" @click="redirect_rank">排行榜</el-button>

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

                <el-button class="btn-login" icon="el-icon-s-promotion" @click="redirect_login">Sign in</el-button>
            </el-col>
        </el-row>

        <el-drawer style="background-color: #000000" :visible.sync="drawer" direction="ttb" size="100%"
                   :with-header="false" :destroy-on-close="true">
            <RioVideoPlayer
                    :video_src="'https://vdept.bdstatic.com/763353534e4b36737475314a6a676c34/78706b4c65586c31/9597d5c78d5fe5981d3353fc83b52128dea46f432d09a10f8447c58bb006dcd6984811f697615db16524e713fd714e33.mp4?auth_key=1584694011-0-0-36b9b5526b7f1fc11db96bbb79525f4b'"
                    :cover_url="'http://img2.imgtn.bdimg.com/it/u=817546300,367511596&fm=26&gp=0.jpg'"></RioVideoPlayer>
        </el-drawer>
    </div>
</template>

<script>
    import {mapState} from "vuex";
    import Login from "../../views/Login";
    import Register from "../../views/Register";
    import Resource from "../../views/Resource";
    import TopRank from "../../views/TopRank";
    import Home from "../../views/Home";
    import RioVideoPlayer from "../Utils/RioVideoPlayer";

    export default {
        name: "RankHeader",
        components: {RioVideoPlayer},
        data() {
            return {
                limitPick: '',
                queryContent: '',
                drawer: false
            }
        },
        computed: mapState({
            loginState: 'loginState',
            username: 'username',
            userIcon: 'userIcon',
        }),
        methods: {
            logout() {
                console.log("********");
                console.log(this.username, " ======> logout");
                this.$store.commit('delUser');
                console.log("logout && redirect");
                console.log("********");
            },
            redirect_home() {
                this.$router.push(Home);
            },
            redirect_login() {
                this.$router.push(Login);
            },
            redirect_register() {
                this.$router.push(Register);
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
            redirect_resource() {
                this.$router.push(Resource);
            },
            redirect_rank() {
                this.$router.push(TopRank);
            },
            search() {
                this.$store.commit('setSearchQuery', {
                    content: this.searchContent,
                    limit: this.limitPick
                });
                this.push(TopRank);
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "src/assets/sass/global";

    ::v-deep .el-drawer__body {
        background-color: $bg_black_global;
    }

    .container-header {
        background-color: $bg_red_black_global;
        background-image: linear-gradient(to bottom, $bg_red_black_global, $bg_black_global, $bg_red_black_global);

        .header-box {

            .header-middle {
                display: flex;
                justify-content: space-around;

                .search-input {
                    margin-top: 20px;
                    width: 600px;
                    margin-right: 30px;
                    margin-left: 40px;

                    ::v-deep .el-input--suffix {
                        .el-input__inner {
                            color: $bg_green_global;
                            padding: 10px;
                            width: 80px;
                        }
                    }

                    ::v-deep .el-input__inner:hover {
                        border-width: 2px;
                        border-color: $bg_green_global;
                        box-shadow: 0 0 10px 2px skyblue;
                    }

                    ::v-deep .el-select-dropdown__wrap {
                        background-color: $bg_black_global;
                    }

                    ::v-deep .el-input-group__append:hover {
                        box-shadow: 0 0 10px 2px skyblue;
                        background-color: $bg_blue_white_global;
                    }
                }

                .btn-menu {
                    padding: 0;
                    margin-top: 1%;
                    font-size: xx-large;
                    color: #decb00;
                    border-color: transparent;
                    background-color: transparent;
                }

                .btn-menu:hover {
                    background-color: rgba($bg_blue_white_global, 0.3);
                    color: $bg_yellow_gold_global;
                }
            }

            .header-link {
                padding-left: 2%;
                margin-top: 0.5%;
                display: flex;
                justify-content: space-around;

                .btn-link {
                    margin-top: 1%;
                    margin-left: -10px;
                    margin-right: -10px;
                    color: deepskyblue;
                    background-color: transparent;
                    border-color: transparent;
                    font-size: x-large;
                }

                .btn-link:hover {
                    border-color: $bg_yellow_gold_global;
                    color: $bg_yellow_gold_global;
                    font-size: xx-large;
                    background-color: rgba($bg_blue_white_global, 0.3);
                    margin-left: -8px;
                    margin-right: -8px;
                    padding: 2px;
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
                    border-color: rgba($bg_blue_white_global, 0.3);
                }

                .btn-login {
                    background-color: transparent;
                    border-color: transparent;
                    font-size: x-large;
                    margin-right: 10%;
                    border-radius: 6px;
                    padding-left: 0;
                    padding-right: 2%;
                    color: $bg_gray_light_global;
                }

                .btn-login:hover {
                    border-color: $bg_yellow_gold_global;
                    color: $bg_yellow_gold_global;
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

</style>