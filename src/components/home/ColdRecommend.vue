<template>
    <el-container class="cold-container">
        <el-header>
            <el-image :src="require('../../assets/img/topic-cold.png')" class="topic"></el-image>
        </el-header>
        <el-container>
            <el-main>
                <el-row v-for="(row,index) in coldRecommendList" :key="index">
                    <el-col :span="6" v-for="(item,index) in row" :key="index">
                        <el-card
                                :body-style="{ padding: '0px' }"
                                shadow="hover"
                                @mouseover.native="mouseover($event,' card-active')"
                                @mouseout.native="mouseout($event,' card-active')"
                        >
                            <el-image :src="item.cover_url" fit="fill" @click="jumpToDetail(item.id, item)"></el-image>
                            <div class="movie-detail">
                                <el-tag class="movie-name" >{{item.name}}</el-tag>
                                <div class="movie-rate">
                                    <svg class="rate-star" aria-hidden="true">
                                        <use xlink:href="#icon-star"></use>
                                    </svg>
                                    <i style="color: #f9f031">{{item.rate}}</i>
                                </div>
                            </div>
                            <div class="movie-genre-box">
                                <el-tag class="movie-genre" v-for="(genre, index) in item.genreSet" :key="index" @click="searchByQuery">
                                    {{genre.name}}
                                </el-tag>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </el-main>
            <el-aside width="22%">
                <el-card :body-style="{paddingBottom: '0'}"
                         class="prefer-rank">
                    <div slot="header">
                        <el-image class="tag-recommend" :src="require('../../assets/img/tag-proposal.png')" fit="fill"></el-image>
                    </div>
                    <div v-for="(row,index) in coldRecommendList" :key="index">
                        <el-row
                                v-for="(item,index) in row" :key="index"
                                class="prefer-row"
                                @mouseover.native="mouseover($event,' row-active')"
                                @mouseout.native="mouseout($event,' row-active')"
                                @click="jumpToDetail(item.id, item)">
                            <div style="margin-top: 30px">
                                <el-col :span="3">
                                    <svg class="icon-prefix">
                                        <use xlink:href="#icon-CatFootprint-copy"></use>
                                    </svg>
                                </el-col>
                                <el-col :span="15">
                                    <span style="cursor: pointer;"
                                          @click="jumpToDetail(item.id, item)">
                                        {{item.name}}
                                    </span>
                                </el-col>
                                <el-col :span="6" class="">
                                    <svg class="rate-star" aria-hidden="true">
                                        <use xlink:href="#icon-star"></use>
                                    </svg>
                                    <i style="color: #f9f031">{{item.rate}}</i>
                                </el-col>
                            </div>
                            <el-divider></el-divider>

                        </el-row>
                    </div>
                </el-card>
            </el-aside>
        </el-container>
    </el-container>

</template>

<script>
    import {mapState} from "vuex";
    export default {
        name: "ColdRecommend",
        data() {
            return {
            };
        },
        computed: mapState({
            coldRecommendList: "coldRecommendList"
        }),
        methods: {
            async getColdRecommendList() {
                if (this.$store.state.coldRecommendList.length) {
                    return;
                }
                console.log('初始化 冷门推荐');
                const {data: result} = await this.$http.get("movie/es/cold");
                if (result.status === 200) {
                    this.$message.success(result.message);
                    this.$store.commit('setColdRecommendList', {
                        totalColdRecommendList: result.data['resultList']
                    });
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
            },
            searchByQuery() {

            },

            // 监听方法
            mouseover($event,activeClassName) {
                $event.currentTarget.className += activeClassName;
            },
            mouseout($event,activeClassName) {
                $event.currentTarget.className =
                    $event.currentTarget.className.slice(
                        0,
                        $event.currentTarget.className.indexOf(activeClassName)
                    )
            }
        },
        created() {
            this.getColdRecommendList();
        }
    }
</script>

<style lang="scss" scoped>
    @import "src/assets/sass/global";

    .cold-container {
        padding-left: 11%;
        padding-right: 12%;
        padding-top: 1%;
        height: 120%;

        .el-header {
            display: flex;
            margin-bottom: 3%;
            .topic {
                height: 80px;
            }
        }

        .el-main {
            padding: 0;
            .el-card {
                background-color: $bg_black_global;
                border-color: transparent;
                margin-right: 8px;
                margin-left: 8px;
                margin-bottom: 5%;
                cursor: pointer;

                .el-image {
                    height: 300px;
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
            .card-active {
                border-color: #eeeeee;
                background-color: #536f85;
                margin-right: 0;
                margin-left: 0;
                margin-bottom: 0;
            }
        }

        .el-aside {
            margin-left: 10px;
            background-color: transparent;
            border-radius: 6px;
            border:1px dashed skyblue;
            height: 750px;

            .tag-recommend {
                width: 100%;
                height: 75px;
            }
            .prefer-rank {
                background-color: transparent;
                border-color: transparent;
                color: #eeeeee;

            }
            .icon-prefix {
                width: 100%;
                height: 30px;
            }

            .prefer-row {
                cursor: pointer;
                color: $bg_young_global;
                font-size: large;
                .rate-star {
                    width: 15px;
                    height: 15px;
                    margin-right: 5px;
                }
                /* el-divider 修改高度&虚线效果 */
                .el-divider--horizontal{
                    margin-top: 70px;
                    margin-bottom: 0;
                    padding-bottom: 0;
                    background: 0 0;
                    border-top: 1px dashed $bg_young_global;
                }
            }
            .row-active {
                background-color: rgba(255,255,255,0.2);
                border-radius: 10px;
                color: $bg_blue_global;
                font-size: x-large;
            }
        }
    }

</style>