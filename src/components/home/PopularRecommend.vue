<template>
    <el-container class="popular-container">
        <el-main>
            <el-carousel :interval="4000" type="card" height="500px">
                <el-carousel-item v-for="(item,index) in popularList" :key="index">
                    <el-image :src="item.cover_url" fit="fill" style="width: 100%; height: 100%"
                              @click="jumpToDetail(item.id,item)"></el-image>
                </el-carousel-item>
            </el-carousel>
        </el-main>
    </el-container>
</template>

<script>

    export default {
        name: "PopularRecommend",
        data() {
            return {
                popularList: []
            };
        },
        methods: {
            async getPopularRecommendList() {
                console.log('初始化 流行度推荐');
                const {data: result} = await this.$http.get("movie/es/popular");
                if (result.status === 200) {
                    this.$message.success(result.message);
                    this.popularList = result.data["resultList"];
                } else {
                    this.$message.error(result.message);
                }
            },
            jumpToDetail(movieId, movieInfo) {
                this.$router.push(
                    {
                        name: "MovieDetail",
                        params: {
                            id: movieId,
                            movie: movieInfo
                        }
                    }
                )
            }
        },
        created() {
            this.getPopularRecommendList();
        }
    }
</script>

<style lang="scss" scoped>

    @import "src/assets/sass/global";

    .popular-container {
        padding-left: 3%;
        padding-right: 3%;

        .el-main {
            padding: 0;
            .el-carousel {
                margin-left: 150px;
                margin-right: 150px;
                border-radius: 6px;
            }

            .el-carousel__item h3 {
                color: #eeeeee;
                font-size: 14px;
                opacity: 0.75;
                line-height: 200px;
                margin: 0;
            }

            .el-carousel__item:nth-child(2n) {
                background-color: #b2ebff;
                cursor: pointer;
            }

            .el-carousel__item:nth-child(2n+1) {
                background-color: #8ce4ec;
                cursor: pointer;
            }
        }
    }
</style>