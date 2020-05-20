<template>
    <div class="show-block">
        <el-menu default-active="popular" mode="horizontal" @select="tagPickChange">
            <el-menu-item index="popular">按热度</el-menu-item>
            <el-menu-item index="rate">按评分</el-menu-item>
            <el-menu-item index="preference">按逼格</el-menu-item>
        </el-menu>

        <div class="top-series-content"
             v-infinite-scroll="loadRankList"
             :infinite-scroll-disabled="disabled">
            <div v-for="(row,index) in rankList" :key="index">
                <div v-for="(movieInfo,index) in row" :key="index">
                    <el-card class="item-card"
                             :body-style="{ padding: '0px' }"
                             shadow="hover"
                             @click.native="jumpToDetail(movieInfo)"
                    >
                        <el-row>
                            <el-col :span="10">
                                <el-image class="item-cover" :src="movieInfo.cover_url"></el-image>
                            </el-col>
                            <el-col :span="14" class="item-detail">
                                <div>
                                    <span class="item-name">{{movieInfo.name}} {{movieInfo.foreign_name}}</span>
                                    <div class="item-rate">
                                        <svg aria-hidden="true"
                                             style="width: 25px; height: 25px;margin-right: 10px">
                                            <use xlink:href="#icon-star"></use>
                                        </svg>
                                        <span>{{movieInfo.rate}}</span>
                                    </div>
                                </div>
                                <el-divider></el-divider>
                                <div class="detail-block">
                                    <span class="movie-detail-tag">导演 : </span>
                                    <span class="movie-detail-tag-content"
                                          v-for="(item,index) in movieInfo.directorSet"
                                          :key="index">
                                             {{item.name}}
                                            </span>
                                </div>
                                <div class="detail-block">
                                    <span class="movie-detail-tag">编剧 : </span>
                                    <span class="movie-detail-tag-content"
                                          v-for="(item,index) in movieInfo.screenwriterSet.slice(0,1)"
                                          :key="index">
                                                {{item.name}}
                                            </span>
                                </div>
                                <div class="detail-block">
                                    <span class="movie-detail-tag">演员 : </span>
                                    <span class="movie-detail-tag-content"
                                          v-for="(item,index) in movieInfo.starringSet.slice(0,1)"
                                          :key="index">
                                                {{item.name}}
                                            </span>
                                </div>
                                <div class="detail-block">
                                    <span class="movie-detail-tag">类型 : </span>
                                    <span class="movie-detail-tag-content"
                                          v-for="(item,index) in movieInfo.genreSet"
                                          :key="index">
                                                {{item.name}}
                                            </span>
                                </div>
                                <div class="detail-block">
                                    <span class="movie-detail-tag">发行 : </span>
                                    <span class="movie-detail-tag-content"> {{movieInfo.release_date}}</span>
                                </div>
                                <div class="detail-block">
                                    <span class="movie-detail-tag">语言 : </span>
                                    <span class="movie-detail-tag-content"> {{movieInfo.language}}</span>
                                </div>
                            </el-col>
                        </el-row>

                    </el-card>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "MRank",
        data() {
            return {
                tagPick: 'popular',
                pageNum: 1,
                pageSize: 20,

                loadingDisabled: false,
                endOfTheResource: false,

                rankList: []
            }
        },
        computed: {
            disabled() {
                return this.loadingDisabled || this.endOfTheResource;
            }
        },
        methods: {
            async getRankList() {
                console.log("排序 rank");

                this.pageNum = 1;
                const {data: result} = await this.$http.get(
                    '/movie/es/_rank',
                    {
                        params: {
                            sortKernel: this.tagPick,
                            pageNum: this.pageNum,
                            pageSize: this.pageSize
                        }
                    }
                );
                if (result.status === 200) {
                    this.$message.success(result.message);
                    this.rankList = [];
                    for (let i = 0; i < this.pageSize / 2; i++) {
                        this.rankList.push(result.data['resultList'].slice(i * 2, i * 2 + 2));
                    }
                } else {
                    this.$message.error(result.message);
                }
            },

            async loadRankList() {
                console.log("加载 资源");

                this.loadingDisabled = true;
                const {data: result} = await this.$http.get(
                    '/movie/es/_rank',
                    {
                        params: {
                            pageNum: this.pageNum,
                            pageSize: this.pageSize,
                            sortKernel: this.tagPick
                        }
                    }
                );
                if (result.status === 200) {
                    if (result.data['resultList'].length === 0) {
                        this.$message.warning("到头了");
                        this.endOfTheResource = true;
                    } else {
                        this.$message.success(result.message);
                        this.pageNum++;
                        for (let i = 0; i < this.pageSize / 2; i++) {
                            this.rankList.push(result.data['resultList'].slice(i * 2, i * 2 + 2));
                        }
                    }
                } else {
                    this.$message.error(result.message);
                }
                this.loadingDisabled = false;
            },

            tagPickChange(index) {
                console.log("event ======> tagPick change");
                this.tagPick = index;
                this.getRankList();
            },

            jumpToDetail(movieInfo) {
                this.$router.push(
                    {
                        name: "MDetail",
                        params:{
                            movieId: movieInfo.id,
                            movieInfo: movieInfo
                        }
                    }
                )
            }
        },

    }
</script>

<style lang="scss" scoped>
    @import "src/assets/sass/global";

    .show-block {
        margin-bottom: 5%;
        background-color: $bg_gray_white_global;
        border-radius: 30px;
        box-shadow: 0 0 50px 20px rgba(235, 242, 242, 0.5);

        .el-menu {
            margin-bottom: 20px;
        }

        .el-divider--horizontal {
            margin-top: 0;

            .el-divider__text {
                font-size: x-large;
                color: $bg-black_global;
                background-color: transparent;
            }
        }

        .el-menu {
            border-radius: 6px;
        }

        .top-series-content {
            margin-right: 5px;
            margin-left: 5px;

            .item-card {
                padding: 5px;
                margin: 5px;
                border-color: transparent;
                cursor: pointer;


                .item-cover {
                    padding: 5px;
                }

                .item-detail {
                    text-align: left;
                    padding-top: 10px;

                    .item-name {
                        color: deepskyblue;
                        font-size: 25px;
                        margin-left: 10px;
                    }

                    .item-rate {
                        float: right;
                        margin-right: 10px;
                    }

                    .el-divider--horizontal {
                        margin: 10px;
                    }

                    .detail-block {
                        margin-bottom: 5px;

                        .movie-detail-tag {
                            font-weight: bold;
                            cursor: default;
                        }

                        .movie-detail-tag-content {
                            color: $bg_blue_global;
                            cursor: pointer;
                        }

                        .movie-introduction {
                            text-overflow: ellipsis;
                            overflow: hidden;
                            height: 130px;
                        }

                        .el-divider--vertical {
                            border-top: 1px dashed $bg_blue_white_global
                        }
                    }
                }
            }

            .item-card:hover {
                box-shadow: -3px 3px 10px 3px rgba(0, 0, 0, 0.5);
                background-color: $bg_green_white_global;
            }
        }
    }
</style>