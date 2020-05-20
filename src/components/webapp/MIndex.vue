<template>
    <div>
        <div class="popular-block">
            <el-carousel :interval="4000" type="card" indicator-position="none">
                <el-carousel-item v-for="(item,index) in popularRecommendList" :key="index">
                    <el-image :src="item.cover_url" fit="fill" style="width: 100%; height: 100%"
                              @click="jumpToDetail(item.id,item)"></el-image>
                </el-carousel-item>
            </el-carousel>

        </div>
        <div class="prefer-block">
            <el-image :src="require('../../assets/img/topic-prefer.png')" class="prefer-topic"></el-image>
            <el-row v-for="(row,index) in preferenceRecommendList" :key="index">
                <el-col :span="12" v-for="(item,index) in row" :key="index">
                    <el-card
                            :body-style="{ padding: '0px' }"
                            shadow="hover"
                    >
                        <el-image class="item-cover" :src="item.cover_url" fit="fill" @click="jumpToDetail(item.id, item)"></el-image>
                        <div class="movie-detail">
                            <el-tag class="movie-name">{{item.name}}</el-tag>
                            <div class="movie-rate">
                                <svg class="rate-star" aria-hidden="true">
                                    <use xlink:href="#icon-star"></use>
                                </svg>
                                <i style="color: #f9f031">{{item.rate}}</i>
                            </div>
                        </div>
                        <div class="movie-genre-box">
                            <el-tag class="movie-genre" v-for="(genre, index) in item.genreSet" :key="index">
                                {{genre.name}}
                            </el-tag>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>

    </div>
</template>

<script>
    import {mapState} from "vuex";

    export default {
        name: "MIndex",
        data() {
            return {
                repeatInitTimes: 3,


            };
        },
        computed: mapState({
            popularRecommendList: "popularRecommendList",
            preferenceRecommendList: "preferenceRecommendList"

        }),
        methods: {
            async getPreferenceRecommendList() {
                if (this.$store.state.preferenceRecommendList.length) {
                    return;
                }
                console.log("初始化 偏好推荐");
                const {data: result} = await this.$http.get("movie/es/prefer");
                if (result.status === 200) {
                    this.$message.success(result.message);
                    this.$store.commit('setPreferenceRecommendList', {
                        totalPreferenceRecommendList: result.data['resultList']
                    })
                } else {
                    if (this.repeatInitTimes > 0) {
                        this.repeatInitTimes -= 1;
                        console.log("尝试第", this.repeatInitTimes, "次");
                        setTimeout(this.getPreferenceRecommendList(), 500);
                    } else {
                        this.$message.error("Network failed");
                    }
                }
            },
            async getPopularRecommendList() {
                if (this.$store.state.popularRecommendList.length) {
                    return;
                }
                console.log('初始化 流行度推荐');
                const {data: result} = await this.$http.get("movie/es/popular");
                if (result.status === 200) {
                    this.$message.success(result.message);
                    console.log(result);
                    this.$store.commit('setPopularRecommendList', {
                        popularRecommendList: result.data["resultList"]
                    });
                } else {
                    if (this.repeatInitTimes > 0) {
                        this.repeatInitTimes -= 1;
                        console.log("尝试第", this.repeatInitTimes, "次");
                        setTimeout(this.getPopularRecommendList(), 500);
                    } else {
                        this.$message.error("Network failed");
                    }
                }
            },
            jumpToDetail(movieId, movieInfo) {
                this.$router.push(
                    {
                        name: "MDetail",
                        params: {
                            movieId: movieId,
                            movieInfo: movieInfo
                        }
                    }
                )
            }
        },
        created() {
            this.getPreferenceRecommendList();
            this.getPopularRecommendList();
        }
    }
</script>

<style lang="scss" scoped>
    @import "src/assets/sass/global";
    .popular-block {
        .el-carousel {
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
    .prefer-block {
        .prefer-topic {
            height: 40px;
            width: 180px;
        }
        .el-card {
            background-color: $bg_black_global;
            border-color: transparent;
            margin-right: 8px;
            margin-left: 8px;
            margin-bottom: 5%;
            cursor: pointer;

            .el-image {
                height: 150px;
                width: 100%;
            }

            .movie-detail {
                display: flex;
                justify-content: space-around;
                border: transparent;
                background-color: transparent;
                cursor: pointer;

                .movie-name {
                    border-color: transparent;
                    background-color: transparent;
                    font-size: x-large;
                }

                .movie-rate {
                    margin-top: 3%;
                }

                .rate-star {
                    width: 15px;
                    height: 15px;
                    margin-right: 5px;
                }
            }

            .movie-genre-box {
                display: flex;

                .movie-genre {
                    margin-left: 5px;
                    color: #eeeeee;
                    border-color: transparent;
                    background-color: $bg_green_global;
                    font-size: small;
                }
            }

        }
        .el-card:hover {
            border-color: #eeeeee;
            background-color: #536f85;
            margin-right: 0;
            margin-left: 0;
            margin-bottom: 0;
        }
    }


</style>