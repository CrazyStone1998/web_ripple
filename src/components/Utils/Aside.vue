<template>
    <div class="container-aside">
        <div class="partOne">
            <div class="title">{{movieInfo.name}}的看点</div>
            <el-divider></el-divider>
            <div class="flash-point">

            </div>
        </div>
        <div class="partTwo">
            <div class="title">
                <span class="pre-title">类似推荐</span>
                <span class="more">换一批>>></span>
            </div>
            <el-divider></el-divider>
            <div class="related-movie">

            </div>
        </div>
        <div class="partThree">
            <div class="title">正在热映</div>
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
            return{
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


</style>