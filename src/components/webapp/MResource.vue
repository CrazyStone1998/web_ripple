<template>
    <div class="resource-container">

        <div class="container-category">
            <el-row>
                <el-col :span="8" v-for="(item,index) in categoryList" :key="index">
                    <el-select v-model="item.picks" :placeholder="item.topic" >
                        <el-option
                                v-for="(tag,index) in item.tags"
                                :key="index"
                                :label="tag"
                                :value="tag">
                        </el-option>
                    </el-select>
                </el-col>
            </el-row>

            <div :span="24" class="rate-slide-col">
                <div class="block">
                    <el-slider
                            v-model="ratePick"
                            range
                            :marks="marks"
                            :max="10">
                    </el-slider>
                </div>
            </div>
        </div>


        <el-menu class="content-sort-menu" :default-active="tagPick" mode="horizontal" @select="tagPickChange">
            <el-menu-item index="popular">按热度</el-menu-item>
            <el-menu-item index="date">按时间</el-menu-item>
            <el-menu-item index="preference">按喜好</el-menu-item>
        </el-menu>

        <el-divider class="category-divider-show"></el-divider>

        <div class="top-series-content"
             v-infinite-scroll="loadShowList"
             :infinite-scroll-disabled="disabled">
            <div v-for="(row,index) in showList" :key="index">
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
    import {mapState} from "vuex";

    export default {

        name: "MResource",
        data() {
            return {
                categoryList: [
                    {
                        icon: '#icon-fenlei-copy',
                        topic: '类型',
                        allPick: true,
                        tags: [
                            '剧情', '爱情', '犯罪', '奇幻', '动作', '冒险', '家庭', '音乐', '科幻', '记录',
                            '短片', '色情', '戏剧', '惊悚', '恐怖', '历史', '运动', '战争'
                        ],
                        picks: []
                    },
                    {
                        icon: '#icon-date',
                        topic: '地区',
                        allPick: true,
                        tags: ['中国', '美国', '韩国', '日本', '印度', '法国', '德国', '泰国', '英国'],
                        picks: []
                    },
                    {
                        icon: '#icon-area_fill',
                        topic: '日期',
                        allPick: true,
                        tags: ['2020', '2019', '2018', '2017', '2016', '2015', '2014', '2013', '>'],
                        picks: []
                    }
                ],
                marks: {
                    0: '0',
                    1: '1',
                    2: '2',
                    3: '3',
                    4: '4',
                    5: '5',
                    6: '6',
                    7: '7',
                    8: '8',
                    9: '9',
                    10: '10',
                },

                loadingDisabled: false,
                endOfTheResource: false,

                pageNum: 1,
                pageSize: 20,

                showList: [],

                tagPick: 'popular',
                ratePick: [5, 10],

            };
        },


        computed: mapState({

            disabled() {
                return this.loadingDisabled || this.endOfTheResource;
            },

            searchQuery: "searchQuery",

            searchEventWatcher: "searchEventWatcher",

            searchContent() {
                return {
                    content: this.searchQuery.content,
                    limit: this.searchQuery.limit,
                    genrePick: this.categoryList[0].picks,
                    areaPick: this.categoryList[1].picks,
                    datePick: this.categoryList[2].picks,
                    ratePick: this.ratePick,
                    tagPick: this.tagPick
                }
            }

        }),

        methods: {
            searchByGenre() {

            },

            topicChange(item) {
                console.log("event ======> category allPick change");

                if (item.picks.length === 0) {
                    item.allPick = true;
                } else if (item.allPick === true) {
                    item.picks = [];
                }
            },

            categoryChange(item, val) {
                console.log("event ======> category picks change");
                item.allPick = val.length === 0;
            },

            tagPickChange(index) {
                console.log("event ======> tagPick change");
                this.tagPick = index;
                this.searchShowList();
            },

            async searchShowList() {
                console.log("搜索 资源库列表");
                this.pageNum = 1;
                this.pageSize = 20;
                this.loadingDisabled = true;
                const {data: result} = await this.$http.post(
                    "movie/es/_search", this.searchContent,
                    {
                        params: {
                            pageNum: this.pageNum,
                            pageSize: this.pageSize
                        }
                    }
                );
                if (result.status === 200) {
                    console.log(result.data);
                    this.$message.success(result.message);
                    this.showList = [];
                    for (let i = 0; i < 5; i++) {
                        this.showList.push(result.data["resultList"].slice(i * 4, i * 4 + 4));
                    }
                } else {
                    this.$message.error(result.message);
                }
                this.loadingDisabled = false;
            },

            async loadShowList() {
                this.$message.info("加载 资源列表");
                console.log(this.pageNum, this.pageSize);

                this.loadingDisabled = true;
                const {data: result} = await this.$http.post(
                    "movie/es/_search",
                    this.searchContent,
                    {
                        params: {
                            pageNum: this.pageNum,
                            pageSize: this.pageSize
                        }
                    }
                );
                if (result.status === 200) {
                    console.log(result.data);
                    if (result.data["resultList"].length === 0) {
                        this.$message.warning("没有更多了");
                        this.endOfTheResource = true;
                    } else {
                        this.$message.success(result.message);
                        this.pageNum++;
                        for (let i = 0; i < 5; i++) {
                            this.showList.push(result.data["resultList"].slice(i * 4, i * 4 + 4));
                        }
                    }

                } else {
                    this.$message.error(result.message);
                }
                this.loadingDisabled = false;
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
            },

        },

        watch: {
            searchEventWatcher(curVal, oldVal) {
                if (curVal !== oldVal) {
                    this.searchShowList();
                }
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import "src/assets/sass/global";

    .resource-container {
        border-radius: 30px;
        background-color: $bg_gray_white_global;
        box-shadow: 0 0 50px 20px rgba(235, 242, 242, 0.5);

        .container-category {
            padding: 20px 0 20px 0;
            background-color: rgba(179, 179, 179, 0.3);
            border-radius: 6px;
            .rate-slide-col {
                padding-left: 10px;
                padding-right: 10px;
            }
        }

        .content-sort-menu {
            padding-left: 3%;
            margin-top: 1%;
            border-radius: 6px;
        }

        .el-divider--horizontal {
            margin-top: 5px;
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