<template>
    <el-container class="top-rank-container">
        <el-header class="top-rank-container-header" style="height: 85px">
            <RankHeader>
            </RankHeader>
        </el-header>
        <el-main class="top-rank-container-main">
            <el-backtop target=".top-rank-container-main" :bottom="100" :right="100"
                        style="background-color: transparent;width: 50px;height: 50px">
                <svg aria-hidden="true">
                    <use xlink:href="#icon-top"></use>
                </svg>
            </el-backtop>
            <RankShow></RankShow>
            <Footer></Footer>
        </el-main>
    </el-container>
</template>

<script>
    import Footer from "../components/home/Footer";
    import RankHeader from "../components/rank/RankHeader";
    import RankShow from "../components/rank/RankShow";

    export default {
        name: "TopRank",
        components: {RankHeader, RankShow, Footer},
    }
</script>

<style lang="scss" scoped>
    @import "src/assets/sass/global";

    .top-rank-container {
        height: 100%;
        background-color: $bg_black_global;

        .top-rank-container-header {
            padding: 0;
        }

    }
</style>