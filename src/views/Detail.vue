<template>
    <el-container>

        <el-header height="80px">
            <el-row>
                <el-col :span="6">
                    <img class="img-logo" src="../assets/img/logo.png" alt=""/>
                </el-col>
                <el-col :span="14" class="header-middle">
                    <el-button class="btn-link" @click="drawer = !drawer" type="primary" round>菜单</el-button>
                    <el-input prefix-icon="el-icon-search" placeholder="请输入内容" v-model="query" class="search-input">
                        <el-select v-model="select" slot="prepend" placeholder="All">
                            <el-option label="All" value="1"></el-option>
                            <el-option label="订单号" value="2"></el-option>
                            <el-option label="用户电话" value="3"></el-option>
                        </el-select>
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                    <el-button class="btn-link" type="primary" round @click="homeLink">首页</el-button>
                    <el-button class="btn-link" type="success" round @click="resourceLink">资源库</el-button>
                </el-col>
                <el-col :span="1">
                    <el-button class="btn-login" type="primary" round @click="login">Login</el-button>
                </el-col>

            </el-row>
        </el-header>

        <el-main>
            <router-view></router-view>
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
    import Footer from "../components/home/Footer";
    import Home from "./Home";
    import Resource from "./Resource";
    export default {
        name: "Detail",
        components: {Footer},
        data() {
            return {
                select: '',
                drawer: false
            }
        },
        methods: {
            homeLink() {
                this.$router.push(Home);
            },
            resourceLink() {
                this.$router.push(Resource);
            }
        },
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
            .search-input {
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
        padding: 0;
        background-color: #F5F5FA;
    }
</style>