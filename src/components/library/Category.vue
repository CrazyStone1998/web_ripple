<template>
    <div class="category-show-container">

        <div class="container-category">
            <el-row class="query-category" v-for="(item,index) in categoryList" :key="index">
                <el-col :span="6" class="query-topic-col">
                    <svg aria-hidden="true" class="icon-topic">
                        <use :xlink:href="item.icon"></use>
                    </svg>
                    <el-tag class="query-topic">{{item.topic}}>>></el-tag>
                </el-col>
                <el-col :span="2" class="allPick-col">
                    <el-checkbox-button v-model="item.allPick" @change="topicChange(item)">
                        <span>全部</span>
                    </el-checkbox-button>
                </el-col>
                <el-col :span="18" class="category-list-col">
                    <el-checkbox-group class="category-checkbox" @change="categoryChange(item, $event)"
                                       v-model="item.picks" :max="3">
                        <el-checkbox-button class="btn-category-tag" v-for="(sub_item,index) in item.tags"
                                            :label="sub_item" :key="index">
                            <span class="span-category-tag">{{sub_item}}</span>
                        </el-checkbox-button>
                    </el-checkbox-group>
                </el-col>
            </el-row>
            <el-row class="query-rate">
                <el-col :span="6" class="query-rate-col">
                    <svg aria-hidden="true" class="icon-topic">
                        <use xlink:href="#icon-good"></use>
                    </svg>
                    <el-tag class="query-topic">评分>>></el-tag>
                </el-col>
                <el-col :span="10" class="rate-slide-col">
                    <div class="block">
                        <el-slider
                                v-model="ratePick"
                                range
                                :marks="marks"
                                :max="10">
                        </el-slider>
                    </div>
                </el-col>
            </el-row>
        </div>

        <el-menu class="content-sort-menu" :default-active="tagPick" mode="horizontal" @select="tagPickChange">
            <el-menu-item index="popular">按热度</el-menu-item>
            <el-menu-item index="date">按时间</el-menu-item>
            <el-menu-item index="preference">按喜好</el-menu-item>
        </el-menu>

        <el-divider class="category-divider-show"></el-divider>

        <div class="container-show"
             v-infinite-scroll="loadShowList"
             :infinite-scroll-disabled="disabled">

            <el-row v-for="(row,index) in showList" :key="index" class="row-show-movie">
                <el-col :span="6" v-for="(item,index) in row" :key="index" class="col-show-movie">
                    <el-card
                            :body-style="{ padding: '0px' }"
                            shadow="hover">
                        <el-image :src="item.cover_url" fit="fill" @click="jumpToDetail(item.id, item)"></el-image>
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
                            <el-tag class="movie-genre" v-for="(genre, index) in item.genreSet" :key="index"
                                    @click="searchByGenre">
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

        name: "Category",
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
                        name: "MovieDetail",
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

    .category-show-container {
        margin: 1% 15% 2% 15%;
        padding: 0 0 1% 0;
        border-radius: 30px;
        background-color: $bg_gray_white_global;
        box-shadow: 0 0 50px 20px rgba(235, 242, 242, 0.5);

        .container-category {
            padding: 20px 0 20px 0;
            background-color: rgba(179, 179, 179, 0.3);
            border-radius: 30px;

            .icon-topic {
                width: 20px;
                height: 20px;
            }

            .query-topic {
                margin-top: 5px;
                border-color: transparent;
                background-color: transparent;
                font-size: x-large;
                color: $bg_black_global;
            }

            .query-category {
                display: flex;
                margin-bottom: 15px;

                .query-topic-col {
                    margin-right: -5%;
                }

                .allPick-col {
                    margin-top: 3px;
                    display: flex;
                    justify-content: flex-start;

                }

                .category-list-col {
                    display: flex;
                    justify-content: flex-start;
                    margin-left: 1%;

                    .category-checkbox {
                        margin-right: 40px;

                        .btn-category-tag {
                            margin: 3px;
                        }

                        .span-category-tag {
                            margin-left: 2px;
                            margin-right: 2px;
                        }
                    }
                }
            }

            .query-rate {
                margin-left: -5px;

                .rate-slide-col {
                    margin-left: -5%;
                }
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


        .container-show {
            padding-left: 3%;
            padding-right: 3%;

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

            .el-card:hover {
                border-color: #eeeeee;
                background-color: #536f85;
                margin-right: 0;
                margin-left: 0;
                margin-bottom: 0;
            }
        }


    }
</style>