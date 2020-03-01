<template>
    <el-container>

        <el-header height="80px">
            <el-row>
                <el-col :span="6">
                    <img class="img-logo" src="../assets/img/logo.png" alt=""/>
                </el-col>
                <el-col :span="14" class="header-middle">
                    <el-button class="btn-link" @click="drawer = !drawer" type="primary" round>菜单</el-button>
                    <el-input prefix-icon="el-icon-search" placeholder="请输入内容" v-model="query" class="input">
                        <el-select v-model="select" slot="prepend" placeholder="All">
                            <el-option label="All" value="1"></el-option>
                            <el-option label="订单号" value="2"></el-option>
                            <el-option label="用户电话" value="3"></el-option>
                        </el-select>
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                    <el-button class="btn-link" type="primary" round @click="resourceLink">资源库</el-button>
                    <el-button class="btn-link" type="primary" round @click="rankLink">排行榜</el-button>

                </el-col>
                <el-col :span="1">
                    <el-button class="btn-login" type="primary" round @click="login">Login</el-button>
                </el-col>
                <el-col :span="3">
                    <img class="icon-link" src="../assets/img/google_logo.svg" alt=""/>
                    <img class="icon-link" src="../assets/img/twitter_logo.svg" alt=""/>
                    <img class="icon-link" src="../assets/img/facebook_logo.svg" alt=""/>
                </el-col>
            </el-row>
        </el-header>

        <el-main>
            <PopularRecommend></PopularRecommend>
            <el-divider></el-divider>
            <PreferenceRecommend></PreferenceRecommend>
            <el-divider></el-divider>
            <CoolRecommend></CoolRecommend>
            <el-divider></el-divider>
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
    import CoolRecommend from "../components/home/CoolRecommend";
    import Login from "./Login";
    import Footer from "../components/home/Footer";
    import Resource from "./Resource";
    export default {
        name: "Home",
        components: {Footer, CoolRecommend, PreferenceRecommend, PopularRecommend},
        data() {
            return {
                select: '',
                drawer: false
            }
        },
        methods: {
            login() {
                this.$router.push(Login);
            },
            logout() {
                console.log("user ======> logout");
                window.sessionStorage.clear();
                this.$router.push(Login);
                console.log("logout && redirect")
            },
            resourceLink() {
                this.$router.push(Resource)
            },
            rankLink() {
            }
        }
    }
</script>

<style lang="scss" scoped>
    $bg_color: #303134;
    $fg_color: #535457;
    .el-container {
        height: 100%;
        background-color: $bg_color;
    }
    .el-header {
        background-color: $fg_color;

        .img-logo {
            width: 75px;
            height: 75px;
        }
        .header-middle {
            display: flex;
            .input {
                margin-top: 20px;
                width: 550px;
                margin-right: 30px;
                margin-left: 40px;
            }
            .btn-link {
                margin-top: 15px;

            }
        }

        .btn-login {
            margin-top: 15px;
        }
        .icon-link {
            width: 45px;
            height: 45px;
            margin-top: 10px;
            margin-left: 5px;
            margin-right: 5px;
            cursor: pointer;
        }
    }
    .el-main {
        margin-top: 15px;
    }
</style>