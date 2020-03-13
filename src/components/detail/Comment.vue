<template>
    <el-container>
        <el-header>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="homeLink">首页</el-breadcrumb-item>
                <el-breadcrumb-item>详细信息</el-breadcrumb-item>
                <el-breadcrumb-item></el-breadcrumb-item>
            </el-breadcrumb>
        </el-header>

        <el-main>

        </el-main>
    </el-container>
</template>

<script>
    import Home from "../../views/Home";

    export default {
        name: "Comment",
        data() {
            return{
                homeLink: Home
            }
        }
    }
</script>

<style scoped>

</style>