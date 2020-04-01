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
    import Footer from "../components/home/Footer";
    import Header from "../components/home/Header";

    export default {
        name: "Detail",
        components: {Header, Footer},
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