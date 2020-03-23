<template>
    <div class="container-aside">
        <div class="partOne">

            <div class="title">
                <span class="pre-title">今日推荐</span>
                <span class="more">换一批>>></span>
            </div>
            <el-divider></el-divider>
            <div class="flash-point">

            </div>
        </div>
        <div class="partTwo">
            <span class="title">传送门</span>
            <el-divider></el-divider>
            <div class="related-movie">

            </div>
        </div>
        <div class="partThree">
            <div class="title">
                <span class="pre-title">正在上映</span>
                <span class="more">换一批>>></span>
            </div>
            <el-divider></el-divider>
            <div class="rank-list">
            </div>
        </div>
        <div class="partFour">
            <!--    广告-->
        </div>
        <div class="partFive">
            <div class="title">热点报道</div>
            <el-divider></el-divider>
            <!--    热点报道-->
        </div>
    </div>
</template>

<script>
    export default {
        name: "Aside",
        props: ['movieInfo'],
        data() {
            return {
                adsList: [],
                related_movie_list: [],
                rank_movie_list: [],
            }
        },
        methods: {
            async getRelatedMovieList() {

            },
            async getRankMovieList() {

            }
        },
        created() {
            this.getRelatedMovieList();
            this.getRankMovieList();
        }
    }
</script>

<style lang="scss" scoped>
    @import "src/assets/sass/global";

    .container-aside {
        margin-top: 5%;

        .title {
            margin-left: 10%;
            display: flex;
            justify-content: space-between;

        }
    }

</style>