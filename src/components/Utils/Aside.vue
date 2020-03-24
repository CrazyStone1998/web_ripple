<template>
    <div class="container-aside">

        <div class="partOne">
            <div class="title">
                <span class="pre-title">流行推荐</span>
                <span class="more">换一批>>></span>
            </div>
            <el-divider></el-divider>
            <el-row class="popular-movie-row" v-for="(row, index) in this.recentMovieList" :key="index">
                <el-col :span="8" v-for="(movie,index) in row" :key="index">
                    <el-image @click="jumpToDetail(movie.id, movie)" class="popular-movie-display" :src="movie.cover_url"></el-image>
                </el-col>
            </el-row>
        </div>
        <el-divider></el-divider>
        <div class="partTwo">
            <!--    广告-->
            <el-image
                    src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1585055733357&di=c7e793e438f4b89c96dec074df4e9ed3&imgtype=0&src=http%3A%2F%2Fwww.17qq.com%2Fimg_biaoqing%2F21764681.jpeg"></el-image>
        </div>
        <el-divider></el-divider>
        <div class="partThree">
            <div class="title">
                <span class="pre-title">正在热映</span>
                <span class="more">换一批>>></span>
            </div>
            <el-divider></el-divider>
            <el-row class="recent-movie-row" v-for="(movie,index) in this.popularMovieList" :key="index">
                <el-col :span="6">
                    <svg aria-hidden="true" style="width: 25px;height: 25px">
                        <use xlink:href="#icon-CatFootprint-copy"></use>
                    </svg>
                </el-col>
                <el-col :span="12">{{movie.name}}</el-col>
                <el-col :span="6">>>></el-col>
            </el-row>
        </div>
        <el-divider></el-divider>
        <div>
            <div class="title">
                <span class="pre-title">热门标签</span>
                <span class="more">换一批>>></span>
            </div>
            <el-divider></el-divider>
            <el-row v-for="(row,index) in genreList" :key="index">
                <el-col style="cursor: pointer" :span="6" v-for="(genre,index) in row" :key="index">
                    <el-tag>{{genre}}</el-tag>
                </el-col>
            </el-row>
        </div>
        <el-divider></el-divider>
        <div class="partFour">
            <div class="title" style="font-size: x-large">影视热点</div>
            <el-divider></el-divider>
            <!--    热点报道-->
            <el-row class="recent-movie-row" v-for="(info,index) in this.informationList" :key="index">
                <el-col :span="6">
                    <svg aria-hidden="true" style="width: 25px;height: 25px">
                        <use xlink:href="#icon-share1"></use>
                    </svg>
                </el-col>
                <el-col :span="18">{{info}}</el-col>
            </el-row>
        </div>
        <div class="partFive">
            <div class="title">关注我们</div>
            <el-divider></el-divider>
            <div>
                <svg class="icon" aria-hidden="true" v-for="(item,index) in this.linkList" :key="index">
                    <use :xlink:href="item.icon"></use>
                </svg>
            </div>
        </div>
        <el-divider></el-divider>
        <div style="margin-bottom: 50%"></div>
    </div>
</template>

<script>
    export default {
        name: "Aside",
        props: ['movieInfo'],
        data() {
            return {
                recentParams: {
                    pageNum: 1,
                    pageSize: 6,
                    repeatTimes: 5
                },
                popularParams: {
                    pageNum: 1,
                    pageSize: 10,
                    repeatTimes: 5
                },
                adsList: [],
                recentMovieList: [],
                popularMovieList: [],
                linkList: [
                    {
                        icon: '#icon-youtube',
                        link: ''
                    },
                    {
                        icon: '#icon-twitter',
                        link: ''
                    },
                    {
                        icon: '#icon-wechat',
                        link: ''
                    },
                    {
                        icon: '#icon-qq',
                        link: ''
                    },
                    {
                        icon: '#icon-Facebook',
                        link: ''
                    }
                ],
                informationList: [
                    '比利怀德十佳影片 Billy ',
                    '用“BILLY WILDER”解读比利怀',
                    '再谈几部电影的简单随想',
                    '人生如梦，梦如人生 --- 浅评',
                    'Yesterday,不仅仅是一段往事',
                    '一个男人与一段回忆——',
                    '盗梦空间：岂止王道，更是霸'

                ],
                genreList: [
                    ['人性', '儿童', '社会', '难民'],
                    ['成长', '家庭', '童话', '剧情']
                ]

            }
        },
        methods: {
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
            async getRecentMovieList() {
                const {data: result} = await this.$http.get(
                    'movie/es/popular',
                    {
                        params: {
                            pageNum: this.recentParams.pageNum,
                            pageSize: this.recentParams.pageSize
                        }
                    }
                );
                if (result.status === 200) {
                    this.$message.success(result.message);
                    console.log(result.data);
                    this.recentMovieList.push(result.data['resultList'].slice(0, 3));
                    this.recentMovieList.push(result.data['resultList'].slice(3, 6));

                } else {
                    if (this.recentParams.repeatTimes > 0) {
                        this.recentParams.repeatTimes--;
                        console.log("尝试获取最近热门 第", this.recentParams.repeatTimes, "次");
                        setTimeout(this.getRecentMovieList(), 500);
                    } else {
                        this.$message.error(result.message);
                    }
                }
            },
            async getPopularMovieList() {
                const {data: result} = await this.$http.get(
                    "movie/es/popular",
                    {
                        params: {
                            pageNum: this.popularParams.pageNum,
                            pageSize: this.popularParams.pageSize
                        }
                    });

                if (result.status === 200) {
                    this.$message.success(result.message);
                    this.popularMovieList = result.data['resultList'];
                } else {
                    if (this.popularParams.repeatTimes > 0) {
                        this.popularParams.repeatTimes -= 1;
                        console.log("尝试获取流行 第", this.popularParams.repeatTimes, "次");
                        setTimeout(this.getPopularMovieList(), 500);
                    } else {
                        this.$message.error(result.message);
                    }
                }
            },
        },
        created() {
            this.getRecentMovieList();
            this.getPopularMovieList();
        }
    }
</script>

<style lang="scss" scoped>
    @import "src/assets/sass/global";

    .container-aside {
        padding-right: 10px;
        margin-top: 5%;

        .el-divider--horizontal {
            margin-top: 5px;
            margin-bottom: 5px;

        }

        .popular-movie-row {
            .popular-movie-display {
                height: 85%;
                width: 85%;
                padding: 5px;
                margin-bottom: 10px;
            }

            .popular-movie-display:hover {
                padding: 0;
                height: 90%;
                width: 90%;
                box-shadow: -5px 5px 5px 2px rgba($bg_black_global, 0.5);
            }
        }

        .title {
            margin-left: 10%;
            display: flex;
            justify-content: space-between;

            .pre-title {
                font-size: x-large;
                cursor: pointer;
            }

            .more {
                font-size: large;
                cursor: pointer;
            }
        }

        .recent-movie-row {
            padding-left: 10px;
            padding-right: 10px;
            margin-top: 5px;
            margin-bottom: 5px;
            border-bottom: 1px dashed skyblue;
            cursor: pointer;

        }

        .recent-movie-row:hover {
            background-color: $bg_blue_white_global;


        }


        .icon {
            width: 50px;
            height: 50px;
            cursor: pointer;
            margin: auto 5px auto 5px;
        }
    }

</style>