<template>
    <el-container class="container-movie-detail">
        <el-header class="container-movie-detail-header">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="homeLink">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="resourceLink">资源库</el-breadcrumb-item>
                <el-breadcrumb-item>{{movieInfo.name}}</el-breadcrumb-item>
            </el-breadcrumb>
            <el-divider></el-divider>
        </el-header>

        <el-container class="inner-container-movie-detail">
            <el-main class="inner-container-movie-detail-main">
                <el-row class="movie-detail-description">
                    <el-col :span="4">
                        <el-image :src="movieInfo.cover_url" fit="fill" class="movie-detail-cover"></el-image>
                        <div class="movie-detail-share">
                            <svg aria-hidden="true" class="movie-detail-icon-share">
                                <use xlink:href="#icon-CatFootprint"></use>
                            </svg>
                            <span>分享到</span>
                            <svg aria-hidden="true" class="movie-detail-icon-share">
                                <use xlink:href="#icon-Facebook"></use>
                            </svg>
                            <svg aria-hidden="true" class="movie-detail-icon-share">
                                <use xlink:href="#icon-youtube"></use>
                            </svg>
                            <svg aria-hidden="true" class="movie-detail-icon-share">
                                <use xlink:href="#icon-twitter"></use>
                            </svg>
                        </div>

                    </el-col>
                    <el-col :span="18" class="movie-detail-info">
                        <div>
                            <span class="movie-detail-title">{{movieInfo.name}} {{movieInfo.foreign_name}}</span>
                        </div>
                        <el-divider></el-divider>
                        <div class="movie-detail-block">
                            <span class="movie-detail-tag">导演 : </span>
                            <span class="movie-detail-tag-content"
                                  v-for="(item,index) in movieInfo.directorSet"
                                  :key="index"
                                  @click="jumpToCelebrityDetail(item.id,item,'导演')">
                                {{item.name}}
                            </span>
                        </div>
                        <div class="movie-detail-block">
                            <span class="movie-detail-tag">编剧 : </span>
                            <span class="movie-detail-tag-content"
                                  v-for="(item,index) in movieInfo.screenwriterSet"
                                  :key="index"
                                  @click="jumpToCelebrityDetail(item.id,item,'编剧')">
                                {{item.name}}
                            </span>
                        </div>
                        <div class="movie-detail-block">
                            <span class="movie-detail-tag">演员 : </span>
                            <span class="movie-detail-tag-content"
                                  v-for="(item,index) in movieInfo.starringSet.slice(0,5)"
                                  :key="index"
                                  @click="jumpToCelebrityDetail(item.id,item,'演员')">
                                {{item.name}}
                            </span>
                        </div>
                        <div class="movie-detail-block">
                            <span class="movie-detail-tag">类型 : </span>
                            <span class="movie-detail-tag-content"
                                  v-for="(item,index) in movieInfo.genreSet"
                                  :key="index">
                                {{item.name}}
                            </span>
                        </div>
                        <div class="movie-detail-block">
                            <span class="movie-detail-tag">发行 : </span>
                            <span class="movie-detail-tag-content"> {{movieInfo.release_date}}</span>
                            <el-divider direction="vertical"></el-divider>
                            <span class="movie-detail-tag">时长 : </span>
                            <span class="movie-detail-tag-content"> {{movieInfo.length}}</span>
                        </div>
                        <div class="movie-detail-block">
                            <span class="movie-detail-tag">语言 : </span>
                            <span class="movie-detail-tag-content"> {{movieInfo.language}}</span>
                            <el-divider direction="vertical"></el-divider>
                            <span class="movie-detail-tag">地区 : </span>
                            <span class="movie-detail-tag-content"> {{movieInfo.area}}</span>
                        </div>
                        <div class="movie-detail-block">
                            <span class="movie-detail-tag">评分人数 : </span>
                            <span class="movie-detail-tag-content">{{movieInfo.votes}}</span>
                        </div>
                        <div class="movie-detail-block">
                            <el-rate
                                    v-model="movieInfo.rate"
                                    disabled
                                    show-score
                                    :max="10"
                                    text-color="#ff9900"
                                    score-template="{value}">
                            </el-rate>
                        </div>
                    </el-col>
                </el-row>

                <el-divider content-position="left" class="movie-detail-divider">简介</el-divider>

                <el-row>
                    <span class="movie-detail-introduction">{{movieInfo.profile}}"</span>
                </el-row>

                <el-divider content-position="left">资源</el-divider>
                <el-row class="movie-detail-resource">
                    <el-col :span="16" class="movie-detail-mp4">

                        <RioVideoPlayer :video_src="movieInfo.trailer" :cover_url="movieInfo.cover_url"></RioVideoPlayer>
                    </el-col>
                    <el-col :span="8">
                        <el-image :src="movieInfo.cover_url"></el-image>
                    </el-col>
                </el-row>

                <el-divider content-position="left">获奖</el-divider>
                <el-row class="movie-detail-awards"></el-row>
                <el-divider content-position="left">缔造者</el-divider>
                <el-row class="movie-detail-celebrity"></el-row>

                <el-divider content-position="center">评论</el-divider>
                <el-menu default-active="1" class="comment-sort-menu" mode="horizontal" @select="commentSortSelect">
                    <el-menu-item index="1">热 门</el-menu-item>
                    <el-menu-item index="2">最 新</el-menu-item>
                    <el-menu-item index="3">好 友</el-menu-item>
                </el-menu>

                <el-row class="movie-detail-comment">
                    <el-card class="comment-card" v-for="item in commentList" :key="item.id">
                        <el-row class="comment-card-header">
                            <el-col :span="2">
                                <el-avatar :src="item.user.icon"
                                           class="comment-user-avatar"
                                           @click.native="jumpToUserDetail(item.user.id,item.user)"
                                ></el-avatar>
                            </el-col>
                            <el-col :span="2">
                                <el-tag class="comment-user-name"
                                        @click.native="jumpToUserDetail(item.user.id,item.user)">
                                    {{item.user.username}}
                                </el-tag>
                            </el-col>
                            <el-col :span="6">

                                <el-rate
                                        v-model="item.rate"
                                        disabled
                                        show-score
                                        :colors="['#99A9BF', '#cc9866','#ff6700']"
                                        :max="5"
                                        text-color="#ff9900"
                                        score-template="{value}">
                                </el-rate>
                            </el-col>
                            <el-col :span="3">
                                <span>{{item.date}}</span>
                            </el-col>
                            <el-col :span="9">
                                <el-badge class="comment-vote" :value="item.votes" style="float: right">
                                    <svg aria-hidden="true" style="width:20px;height: 20px; cursor: pointer">
                                        <use xlink:href="#icon-vote"></use>
                                    </svg>
                                </el-badge>
                            </el-col>
                        </el-row>
                        <el-row class="commend-card-content">
                            <div>
                                <p>{{item.content}}</p>
                            </div>


                        </el-row>
                    </el-card>
                    <el-button>加 载 更 多 >>></el-button>
                </el-row>

                <el-divider content-position="center">影评</el-divider>
                <el-menu default-active="1" class="comment-sort-menu" mode="horizontal" @select="reviewSortSelect">
                    <el-menu-item index="1">热 门</el-menu-item>
                    <el-menu-item index="2">最 新</el-menu-item>
                    <el-menu-item index="3">好 友</el-menu-item>
                </el-menu>

                <el-row class="movie-detail-review">
                    <el-card class="review-card" v-for="item in reviewList" :key="item.id">
                        <el-row class="review-card-header">
                            <el-col :span="2">
                                <el-avatar :src="item.user.icon"
                                           class="review-user-avatar"
                                           @click.native="jumpToUserDetail(item.user.id,item.user)">
                                </el-avatar>
                            </el-col>
                            <el-col :span="2">
                                <el-tag class="review-user-name"
                                        @click.native="jumpToUserDetail(item.user.id,item.user)">
                                    {{item.user.username}}
                                </el-tag>
                            </el-col>
                            <el-col :span="6">
                                <el-rate
                                        v-model="item.rate"
                                        disabled
                                        show-score
                                        :colors="['#99A9BF', '#cc9866','#ff6700']"
                                        :max="5"
                                        text-color="#ff9900"
                                        score-template="{value}">
                                </el-rate>
                            </el-col>
                            <el-col :span="3">
                                <span>{{item.date}}</span>
                            </el-col>
                            <el-col :span="9">
                                <el-badge class="review-vote" :value="item.votes" style="float: right">
                                    <svg aria-hidden="true" style="width:20px;height: 20px; cursor: pointer">
                                        <use xlink:href="#icon-vote"></use>
                                    </svg>
                                </el-badge>
                            </el-col>
                        </el-row>
                        <el-row class="review-card-content">
                            <div class="review-card-content-text" v-html="item.content"
                                 :style="{height : showMore ? 'auto': '200px'}"></div>
                            <el-button class="review-card-content-btn" v-if="!showMore" @click="showMore=!showMore">\ 全部内容 /</el-button>
                            <el-button class="review-card-content-back" v-else @click="showMore=!showMore">
                                <svg aria-hidden="true" style="width: 30px;height: 30px">
                                    <use xlink:href="#icon-backTop"></use>
                                </svg>
                            </el-button>
                        </el-row>
                    </el-card>
                    <el-button>加 载 更 多 >>></el-button>
                </el-row>
                <el-divider></el-divider>
                <Editor style="margin-bottom: 70px"></Editor>

            </el-main>
            <el-aside width="350px" class="inner-container-movie-detail-aside">
                <div class="rate-detail">
                    <div class="rate-chart-topic">
                        <span>评分分布</span>
                        <svg aria-hidden="true"
                             style="width: 25px; height: 25px;margin-left: 20px;margin-right: 10px">
                            <use xlink:href="#icon-star" ></use>
                        </svg>
                        <span>{{movieInfo.rate}}</span>
                    </div>
                    <el-divider></el-divider>
                    <div id="rate-chart"></div>
                </div>
                <el-divider></el-divider>
                <div style="font-size: x-large">类似电影推荐>>></div>
                <el-divider></el-divider>
                <el-row v-for="(row,index) in relatedMovieList" :key="index" class="movie-detail-related-movie">
                    <el-col :span="12" v-for="(item,index) in row" :key="index">
                        <el-card
                                :body-style="{ padding: '0px' }"
                                shadow="hover"
                        >
                            <el-image :src="item.cover_url" fit="fill" @click="jumpToMovieDetail(item.id, item)"></el-image>
                            <div class="movie-detail">
                                <el-tag class="movie-name" >{{item.name}}</el-tag>
                                <div class="movie-rate">
                                    <svg class="rate-star" aria-hidden="true">
                                        <use xlink:href="#icon-star"></use>
                                    </svg>
                                    <i style="color: #f9f031">{{item.rate}}</i>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                <Aside></Aside>
            </el-aside>
        </el-container>
    </el-container>
</template>

<script>
    import Home from "../../views/Home";
    import Resource from "../../views/Resource";
    import echarts from 'echarts';
    import RioVideoPlayer from "../Utils/RioVideoPlayer";
    import Aside from "../Utils/Aside";
    import Editor from "../Utils/Editor";

    export default {
        name: "MovieDetail",
        components: {Editor, Aside, RioVideoPlayer},
        props: ['movieId', 'movieInfo'],
        data() {
            return {
                homeLink: Home,
                resourceLink: Resource,
                commentList: [],
                reviewList: [],
                relatedMovieList: [],

                showMore: false,
                activeNames: 1,
                commentSortSelect: 1,
                reviewSortSelect: 1,

            }
        },
        watch: {
            movieInfo() {
                this.getAllCommentList();
                this.getAllReviewList();
                this.getRelatedMovieList();
            }
        },
        computed: {

        },
        methods: {

            async getAllCommentList() {
                const {data: result} = await this.$http.get(
                    "/comment/" + this.movieInfo.id,
                    {
                        params: {
                            pageNum: 1,
                            pageSize: 10
                        }
                    }
                );
                if (result.status === 200) {
                    this.$message.success(result.message);
                    this.commentList = result.data["resultList"];

                } else {
                    this.$message.error(result.message);
                }
            },

            async getAllReviewList() {
                const {data: result} = await this.$http.get(
                    "/review/" + this.movieInfo.id,
                    {
                        params: {
                            pageNum: 1,
                            pageSize: 10
                        }
                    }
                );
                if (result.status === 200) {
                    this.$message.success(result.message);
                    this.reviewList = result.data["resultList"];

                } else {
                    this.$message.error(result.message);
                }
            },

            async getRelatedMovieList() {
                const {data: result} = await this.$http.get(
                    "/movie/es/popular",
                    {
                        params: {
                            pageNum: 1,
                            pageSize: 4
                        }
                    }
                );
                if (result.status === 200) {
                    this.$message.success(result.message);
                    this.relatedMovieList.push(result.data["resultList"].slice(0, 2));
                    this.relatedMovieList.push(result.data["resultList"].slice(2, 4));
                } else {
                    this.$message.error(result.message);
                }
            },

            jumpToMovieDetail(movieId, movieInfo) {
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

            jumpToCelebrityDetail(celebrityId, celebrityInfo, celebrityGenre) {
                this.$router.push(
                    {
                        name: "CelebrityDetail",
                        params: {
                            celebrityId: celebrityId,
                            celebrityInfo: celebrityInfo,
                            celebrityGenre: celebrityGenre
                        }
                    }
                )
            },

            jumpToUserDetail(userId, user) {
                this.$router.push(
                    {
                        name: "UserDetail",
                        params: {
                            userId: userId,
                            user: user
                        }
                    }
                )
            },

            rateChart(dom_id) {
                let dom = document.getElementById(dom_id);
                let rate_data = [];
                let rate_list = this.movieInfo.rate_weight.split(",");
                for (let i = 0; i < 5; i++) {
                    rate_data.push({name: (5-i) +'星', value: parseFloat(rate_list[i].slice(0, -1))});
                }
                let myChart = echarts.init(dom);
                let option = {
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c}%'
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'right',
                        data: ['五星', '四星', '三星', '二星', '一星']
                    },
                    series: [
                        {
                            name: '评分',
                            type: 'funnel',
                            width: '90%',
                            height: '100%',
                            left: '1%',
                            top: '0%',
                            funnelAlign: 'left',
                            data: rate_data
                        }
                    ]
                };
                if (option && typeof option === "object") {
                    myChart.setOption(option, true);
                }
            }
        },
        created() {
            this.getAllCommentList();
            this.getAllReviewList();
            this.getRelatedMovieList();
        },
        mounted() {
            this.rateChart('rate-chart');
        }
    }
</script>

<style lang="scss" scoped>
    @import "src/assets/sass/global";

    .container-movie-detail {
        border-radius: 30px;
        margin-left: 12%;
        margin-right: 12%;
        background-color: $bg_gray_light_global;
        padding-top: 20px;

        .container-movie-detail-header {
            font-size: x-large;

            .el-breadcrumb__item {
                font-size: x-large;
            }
        }

        .inner-container-movie-detail {

            margin-left: 20px;

            .inner-container-movie-detail-main {
                border-radius: 30px;
                background-color: $bg_white_global;

                .movie-detail-description {

                    .movie-detail-share {
                        display: flex;
                        justify-content: space-evenly;

                        .movie-detail-icon-share {
                            height: 25px;
                            width: 25px;
                            cursor: pointer;
                        }
                    }

                    .movie-detail-info {
                        margin-left: 20px;
                        text-align: left;

                        .movie-detail-title {
                            font-size: xx-large;

                        }

                        .el-divider--horizontal {
                            margin: 10px;
                        }

                        .movie-detail-block {
                            margin-bottom: 5px;

                            .movie-detail-tag {
                                font-weight: bold;
                                font-size: 22px;
                                cursor: default;
                            }

                            .movie-detail-tag-content {
                                font-size: 20px;
                                color: $bg_blue_global;
                                cursor: pointer;
                            }

                            .el-divider--vertical {
                                margin-left: 100px;
                                border-top: 1px dashed $bg_blue_white_global
                            }
                        }


                    }

                }

                .movie-detail-introduction {
                    margin-left: 5px;
                    color: $bg_black_global;
                    font-size: 15px;
                }

                .movie-detail-resource {
                    .movie-detail-mp4 {
                        margin-left: 5%;
                        width: 60%;
                    }
                    .el-image {
                        border-radius: 6px;
                        height: 340px;
                    }
                }
                .movie-detail-awards {
                    margin-bottom: 10%;
                }
                .movie-detail-celebrity {
                    margin-bottom: 10%;
                }

                .comment-sort-menu {
                    margin-bottom: 20px;
                    background-color: transparent;
                }

                .movie-detail-comment {
                    background-color: transparent;
                    margin-bottom: 10%;

                    .comment-card {
                        background-color: $bg_gray_light_global;
                        margin-bottom: 20px;

                        ::v-deep .el-card__body {
                            padding: 0;
                        }

                        .comment-card-header {
                            padding-top: 10px;

                            .comment-user-name {
                                background-color: transparent;
                                border-color: transparent;
                                color: $bg_red_black_global;
                                font-size: large;
                                cursor: pointer;
                            }

                            .comment-user-avatar {
                                cursor: pointer;
                            }

                            .comment-user-name:hover {
                                color: $bg_red_black_global;
                                font-weight: bold;
                            }

                            .comment-rate-text {
                                margin-left: 10px;
                                font-weight: bold;

                            }
                        }

                        .commend-card-content {
                            div {
                                display: flex;
                                margin-left: 30px;
                                margin-right: 60px;
                            }
                        }


                    }

                    .comment-card:hover {
                        background-color: #e1f4d7;
                    }

                    .el-button {
                        width: 100%;
                        color: $bg_black_global;
                        border-color: transparent;
                        background-color: transparent;
                    }

                    .el-button:hover {
                        border-color: transparent;
                        background-color: $bg_gray_light_global;
                    }
                }

                .movie-detail-review {
                    background-color: transparent;
                    margin-bottom: 10%;

                    .review-card {
                        background-color: $bg_gray_light_global;
                        margin-bottom: 20px;

                        ::v-deep .el-card__body {
                            padding: 0;
                        }

                        .review-card-header {
                            padding-top: 10px;

                            .comment-user-name {
                                background-color: transparent;
                                border-color: transparent;
                                color: $bg_red_black_global;
                                font-size: large;
                                cursor: pointer;
                            }

                            .comment-user-avatar {
                                cursor: pointer;
                            }

                            .comment-user-name:hover {
                                color: $bg_red_black_global;
                                font-weight: bold;
                            }

                            .comment-rate-text {
                                margin-left: 10px;
                                font-weight: bold;

                            }
                        }

                        .review-card-content {
                            .review-card-content-text {
                                margin-left: 30px;
                                margin-right: 60px;
                                display: flex;
                                justify-content: flex-start;
                            }
                            .review-card-content-btn {
                                color: #409EFF;
                                font-weight: bold;
                                font-size: large;
                                background-color: rgba(235, 242, 242, 0.8);
                            }
                            .review-card-content-back {
                                width: 80px;
                                height: 80px;
                                position: fixed;
                                right: 30%;
                                bottom: 10%;
                                border-radius: 50%;
                                background-color: $bg_blue_white_global;
                                font-size: x-large;
                            }
                            .review-card-content-back:hover {
                                background-color: #daf8e0;
                            }
                        }


                    }

                    .review-card:hover {
                        background-color: #e1f4d7;
                    }

                    .el-button {
                        width: 100%;
                        color: $bg_black_global;
                        border-color: transparent;
                        background-color: transparent;
                    }

                    .el-button:hover {
                        border-color: transparent;
                        background-color: $bg_gray_light_global;
                    }
                }

                .el-divider--horizontal {
                    background-color: $bg_gray_light_global;
                }

                .el-divider__text {
                    border-color: transparent;
                    background-color: transparent;
                    font-weight: bold;
                    font-size: 20px;
                    color: skyblue;
                }

            }

            .inner-container-movie-detail-aside {
                margin-left: 5px;
                border-radius: 30px;
                background-color: $bg_white_global;

                .rate-detail {
                    padding-top: 20px;
                    padding-bottom: 20px;
                    border-radius: 30px;
                    .rate-chart-topic {
                        font-size: x-large;
                        color: $bg_red_black_global;
                    }

                    #rate-chart {
                        height: 200px;
                        width: 100%;
                    }
                }
                .rate-detail:hover {
                    background-color: $bg_green_white_global;

                }
                .el-divider--horizontal {
                    margin: 10px 0 20px 0;
                }

                .movie-detail-related-movie {
                    .el-card {
                        background-color: $bg_black_global;
                        border-color: transparent;
                        margin-right: 8px;
                        margin-left: 8px;
                        margin-bottom: 5%;
                        cursor: pointer;

                        .el-image {
                            height: 200px;
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
                                font-size: large;
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
        }

    }

</style>