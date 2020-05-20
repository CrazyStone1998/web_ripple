<template>
    <el-container class="mobile-container">
        <el-header style="height: 100px">
            <div style="display: flex">
                <el-image style="width: 60px;height: 60px" :src="require('../assets/img/logo.png')"></el-image>
                <el-image style="width: 80px;height: 60px" :src="require('../assets/img/rio.png')"></el-image>
            </div>
            <div>
                <el-input placeholder="请输入内容" v-model="search_content">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </div>
        </el-header>
        <el-main>
            <router-view></router-view>
        </el-main>
        <el-footer>
            <el-menu
                    default-active="1"
                    :router="true"
                    mode="horizontal"
                    background-color="#E1F4D7"
                    text-color="#000000"
                    active-text-color="#C72E2E">
                <el-menu-item index="1" route="/mobile/index">首页</el-menu-item>
                <el-menu-item index="2" route="/mobile/resource">资源库</el-menu-item>
                <el-menu-item index="3" route="/mobile/rank">排行榜</el-menu-item>
                <el-menu-item index="4" route="/mobile/mine">我的</el-menu-item>
            </el-menu>
        </el-footer>
    </el-container>
</template>

<script>
    export default {
        name: "Mobile",
        data() {
            return {
                search_content: '',
                searchVisible: false,
            };
        },
        methods: {}
    }
</script>

<style lang="scss" scoped>
    @import "src/assets/sass/global";

    .el-container {
        padding: 0;
        margin: 0;
        height: 100%;

        .el-header {
            padding: 0;
            margin: 0;
            background-color: $bg_green_white_global;

        }

        .el-main {
            padding: 0;
            margin: 0;
        }

        .el-footer {
            margin: 0;
            padding: 0;

            .el-menu {
                display: flex;
                justify-content: space-around;
            }

            .el-menu-item {
                width: 25%;
            }
        }
    }


</style>