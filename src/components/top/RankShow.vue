<template>
    <div class="show-block">
        <el-divider content-position="left">排行榜</el-divider>

        <el-menu default-active="1" mode="horizontal">
            <el-menu-item index="1">按热度</el-menu-item>
            <el-menu-item index="2">按评分</el-menu-item>
            <el-menu-item index="3">按逼格</el-menu-item>
        </el-menu>

        <div class="top-series-content">
            <el-row v-for="(row,index) in rankList" :key="index">
                <el-col :span="12" v-for="(movieInfo,index) in row" :key="index">
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
                                             {{item}}
                                            </span>
                                </div>
                                <div class="detail-block">
                                    <span class="movie-detail-tag">编剧 : </span>
                                    <span class="movie-detail-tag-content"
                                          v-for="(item,index) in movieInfo.screenwriterSet"
                                          :key="index">
                                                {{item}}
                                            </span>
                                </div>
                                <div class="detail-block">
                                    <span class="movie-detail-tag">演员 : </span>
                                    <span class="movie-detail-tag-content"
                                          v-for="(item,index) in movieInfo.starringSet"
                                          :key="index">
                                                {{item}}
                                            </span>
                                </div>
                                <div class="detail-block">
                                    <span class="movie-detail-tag">类型 : </span>
                                    <span class="movie-detail-tag-content"
                                          v-for="(item,index) in movieInfo.genreSet"
                                          :key="index">
                                                {{item}}
                                            </span>
                                </div>
                                <div class="detail-block">
                                    <span class="movie-detail-tag">发行 : </span>
                                    <span class="movie-detail-tag-content"> {{movieInfo.release_date}}</span>
                                    <el-divider direction="vertical"></el-divider>
                                    <span class="movie-detail-tag">时长 : </span>
                                    <span class="movie-detail-tag-content"> {{movieInfo.length}}</span>
                                </div>
                                <div class="detail-block">
                                    <span class="movie-detail-tag">语言 : </span>
                                    <span class="movie-detail-tag-content"> {{movieInfo.language}}</span>
                                    <el-divider direction="vertical"></el-divider>
                                    <span class="movie-detail-tag">地区 : </span>
                                    <span class="movie-detail-tag-content"> {{movieInfo.area}}</span>
                                </div>
                                <div class="detail-block">
                                    <span class="movie-detail-tag">简介 : </span>
                                </div>
                                <div class="detail-block">
                                    <div class="movie-introduction" v-html="movieInfo.introduction"></div>
                                </div>

                            </el-col>
                        </el-row>

                    </el-card>
                </el-col>
            </el-row>
        </div>

    </div>
</template>
<script>
    export default {
        name: "RankShow",
        data() {
            return {
                tag: '',
                rankList: [
                    [
                        {
                            id: 1,
                            name: "冰雪奇缘",
                            foreign_name: "Frozen",
                            length: 181,
                            language: "英语 / 冰岛语",
                            area: "美国",
                            release_date: "2013-12-21",
                            box_office: 2000000.05,
                            cover_url: "https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2166640945.jpg",
                            rate: 9.5,
                            votes: 50000000,
                            weight: "14%,25%,52%,25%,12%",
                            imdb_link: "",
                            douban_link: "https://movie.douban.com/subject/4202982/",
                            rottenTomatoes_link: "",
                            directorSet: ["Lee", "Buck"],
                            screenwriterSet: ["Lee", "Buce"],
                            starringSet: ["门泽尔", "安娜"],
                            genreSet: ["动画", "音乐", "家庭"],
                            introduction: "在四面环海、风景如画的阿伦黛尔王国，生活着两位可爱美丽的小公主，艾莎和安娜。艾莎天生具有制造冰雪的能力，随着年龄的增长，她的能力越来越强，甚至险些夺走妹妹的生命。为此国王紧闭宫门，也中断了两姐妹的联系。悲哀的海难过后，艾莎（伊迪娜·门泽尔 Idina Menzel 配音 ）终于到了加冕的年龄，各国王公齐来祝贺。艾莎战战兢兢，唯恐被人识破隐藏了多年的秘密。然而当听说安娜（克里斯汀·贝尔 Kristen Bell 配音）将要和初次见面的南埃尔斯王子汉斯（圣蒂诺·方塔纳 Santino Fontana 配音）结婚时，依然情绪失控露出了马脚。在此之后她逃到山中，构建了属于自己的冰雪王国，而阿伦黛尔也陷入可怕的寒冷之中。",
                            trailer: "http://vt1.doubanio.com/202003021544/fe4f0ca7a20ced73c8fad9d40561ec1a/view/movie/M/301490453.mp4"
                        },
                        {
                            id: 1,
                            name: "冰雪奇缘",
                            foreign_name: "Frozen",
                            length: 181,
                            language: "英语 / 冰岛语",
                            area: "美国",
                            release_date: "2013-12-21",
                            box_office: 2000000.05,
                            cover_url: "https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2166640945.jpg",
                            rate: 9.5,
                            votes: 50000000,
                            weight: "14%,25%,52%,25%,12%",
                            imdb_link: "",
                            douban_link: "https://movie.douban.com/subject/4202982/",
                            rottenTomatoes_link: "",
                            directorSet: ["Lee", "Buck"],
                            screenwriterSet: ["Lee", "Buce"],
                            starringSet: ["门泽尔", "安娜"],
                            genreSet: ["动画", "音乐", "家庭"],
                            introduction: "在四面环海、风景如画的阿伦黛尔王国，生活着两位可爱美丽的小公主，艾莎和安娜。艾莎天生具有制造冰雪的能力，随着年龄的增长，她的能力越来越强，甚至险些夺走妹妹的生命。为此国王紧闭宫门，也中断了两姐妹的联系。悲哀的海难过后，艾莎（伊迪娜·门泽尔 Idina Menzel 配音 ）终于到了加冕的年龄，各国王公齐来祝贺。艾莎战战兢兢，唯恐被人识破隐藏了多年的秘密。然而当听说安娜（克里斯汀·贝尔 Kristen Bell 配音）将要和初次见面的南埃尔斯王子汉斯（圣蒂诺·方塔纳 Santino Fontana 配音）结婚时，依然情绪失控露出了马脚。在此之后她逃到山中，构建了属于自己的冰雪王国，而阿伦黛尔也陷入可怕的寒冷之中。",
                            trailer: "http://vt1.doubanio.com/202003021544/fe4f0ca7a20ced73c8fad9d40561ec1a/view/movie/M/301490453.mp4"
                        }
                    ],
                    [
                        {
                            id: 1,
                            name: "冰雪奇缘",
                            foreign_name: "Frozen",
                            length: 181,
                            language: "英语 / 冰岛语",
                            area: "美国",
                            release_date: "2013-12-21",
                            box_office: 2000000.05,
                            cover_url: "https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2166640945.jpg",
                            rate: 9.5,
                            votes: 50000000,
                            weight: "14%,25%,52%,25%,12%",
                            imdb_link: "",
                            douban_link: "https://movie.douban.com/subject/4202982/",
                            rottenTomatoes_link: "",
                            directorSet: ["Lee", "Buck"],
                            screenwriterSet: ["Lee", "Buce"],
                            starringSet: ["门泽尔", "安娜"],
                            genreSet: ["动画", "音乐", "家庭"],
                            introduction: "在四面环海、风景如画的阿伦黛尔王国，生活着两位可爱美丽的小公主，艾莎和安娜。艾莎天生具有制造冰雪的能力，随着年龄的增长，她的能力越来越强，甚至险些夺走妹妹的生命。为此国王紧闭宫门，也中断了两姐妹的联系。悲哀的海难过后，艾莎（伊迪娜·门泽尔 Idina Menzel 配音 ）终于到了加冕的年龄，各国王公齐来祝贺。艾莎战战兢兢，唯恐被人识破隐藏了多年的秘密。然而当听说安娜（克里斯汀·贝尔 Kristen Bell 配音）将要和初次见面的南埃尔斯王子汉斯（圣蒂诺·方塔纳 Santino Fontana 配音）结婚时，依然情绪失控露出了马脚。在此之后她逃到山中，构建了属于自己的冰雪王国，而阿伦黛尔也陷入可怕的寒冷之中。",
                            trailer: "http://vt1.doubanio.com/202003021544/fe4f0ca7a20ced73c8fad9d40561ec1a/view/movie/M/301490453.mp4"
                        },
                        {
                            id: 1,
                            name: "冰雪奇缘",
                            foreign_name: "Frozen",
                            length: 181,
                            language: "英语 / 冰岛语",
                            area: "美国",
                            release_date: "2013-12-21",
                            box_office: 2000000.05,
                            cover_url: "https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2166640945.jpg",
                            rate: 9.5,
                            votes: 50000000,
                            weight: "14%,25%,52%,25%,12%",
                            imdb_link: "",
                            douban_link: "https://movie.douban.com/subject/4202982/",
                            rottenTomatoes_link: "",
                            directorSet: ["Lee", "Buck"],
                            screenwriterSet: ["Lee", "Buce"],
                            starringSet: ["门泽尔", "安娜"],
                            genreSet: ["动画", "音乐", "家庭"],
                            introduction: "在四面环海、风景如画的阿伦黛尔王国，生活着两位可爱美丽的小公主，艾莎和安娜。艾莎天生具有制造冰雪的能力，随着年龄的增长，她的能力越来越强，甚至险些夺走妹妹的生命。为此国王紧闭宫门，也中断了两姐妹的联系。悲哀的海难过后，艾莎（伊迪娜·门泽尔 Idina Menzel 配音 ）终于到了加冕的年龄，各国王公齐来祝贺。艾莎战战兢兢，唯恐被人识破隐藏了多年的秘密。然而当听说安娜（克里斯汀·贝尔 Kristen Bell 配音）将要和初次见面的南埃尔斯王子汉斯（圣蒂诺·方塔纳 Santino Fontana 配音）结婚时，依然情绪失控露出了马脚。在此之后她逃到山中，构建了属于自己的冰雪王国，而阿伦黛尔也陷入可怕的寒冷之中。",
                            trailer: "http://vt1.doubanio.com/202003021544/fe4f0ca7a20ced73c8fad9d40561ec1a/view/movie/M/301490453.mp4"
                        }
                    ],
                    [
                        {
                            id: 1,
                            name: "冰雪奇缘",
                            foreign_name: "Frozen",
                            length: 181,
                            language: "英语 / 冰岛语",
                            area: "美国",
                            release_date: "2013-12-21",
                            box_office: 2000000.05,
                            cover_url: "https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2166640945.jpg",
                            rate: 9.5,
                            votes: 50000000,
                            weight: "14%,25%,52%,25%,12%",
                            imdb_link: "",
                            douban_link: "https://movie.douban.com/subject/4202982/",
                            rottenTomatoes_link: "",
                            directorSet: ["Lee", "Buck"],
                            screenwriterSet: ["Lee", "Buce"],
                            starringSet: ["门泽尔", "安娜"],
                            genreSet: ["动画", "音乐", "家庭"],
                            introduction: "在四面环海、风景如画的阿伦黛尔王国，生活着两位可爱美丽的小公主，艾莎和安娜。艾莎天生具有制造冰雪的能力，随着年龄的增长，她的能力越来越强，甚至险些夺走妹妹的生命。为此国王紧闭宫门，也中断了两姐妹的联系。悲哀的海难过后，艾莎（伊迪娜·门泽尔 Idina Menzel 配音 ）终于到了加冕的年龄，各国王公齐来祝贺。艾莎战战兢兢，唯恐被人识破隐藏了多年的秘密。然而当听说安娜（克里斯汀·贝尔 Kristen Bell 配音）将要和初次见面的南埃尔斯王子汉斯（圣蒂诺·方塔纳 Santino Fontana 配音）结婚时，依然情绪失控露出了马脚。在此之后她逃到山中，构建了属于自己的冰雪王国，而阿伦黛尔也陷入可怕的寒冷之中。",
                            trailer: "http://vt1.doubanio.com/202003021544/fe4f0ca7a20ced73c8fad9d40561ec1a/view/movie/M/301490453.mp4"
                        },
                        {
                            id: 1,
                            name: "冰雪奇缘",
                            foreign_name: "Frozen",
                            length: 181,
                            language: "英语 / 冰岛语",
                            area: "美国",
                            release_date: "2013-12-21",
                            box_office: 2000000.05,
                            cover_url: "https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2166640945.jpg",
                            rate: 9.5,
                            votes: 50000000,
                            weight: "14%,25%,52%,25%,12%",
                            imdb_link: "",
                            douban_link: "https://movie.douban.com/subject/4202982/",
                            rottenTomatoes_link: "",
                            directorSet: ["Lee", "Buck"],
                            screenwriterSet: ["Lee", "Buce"],
                            starringSet: ["门泽尔", "安娜"],
                            genreSet: ["动画", "音乐", "家庭"],
                            introduction: "在四面环海、风景如画的阿伦黛尔王国，生活着两位可爱美丽的小公主，艾莎和安娜。艾莎天生具有制造冰雪的能力，随着年龄的增长，她的能力越来越强，甚至险些夺走妹妹的生命。为此国王紧闭宫门，也中断了两姐妹的联系。悲哀的海难过后，艾莎（伊迪娜·门泽尔 Idina Menzel 配音 ）终于到了加冕的年龄，各国王公齐来祝贺。艾莎战战兢兢，唯恐被人识破隐藏了多年的秘密。然而当听说安娜（克里斯汀·贝尔 Kristen Bell 配音）将要和初次见面的南埃尔斯王子汉斯（圣蒂诺·方塔纳 Santino Fontana 配音）结婚时，依然情绪失控露出了马脚。在此之后她逃到山中，构建了属于自己的冰雪王国，而阿伦黛尔也陷入可怕的寒冷之中。",
                            trailer: "http://vt1.doubanio.com/202003021544/fe4f0ca7a20ced73c8fad9d40561ec1a/view/movie/M/301490453.mp4"
                        }
                    ],
                    [
                        {
                            id: 1,
                            name: "冰雪奇缘",
                            foreign_name: "Frozen",
                            length: 181,
                            language: "英语 / 冰岛语",
                            area: "美国",
                            release_date: "2013-12-21",
                            box_office: 2000000.05,
                            cover_url: "https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2166640945.jpg",
                            rate: 9.5,
                            votes: 50000000,
                            weight: "14%,25%,52%,25%,12%",
                            imdb_link: "",
                            douban_link: "https://movie.douban.com/subject/4202982/",
                            rottenTomatoes_link: "",
                            directorSet: ["Lee", "Buck"],
                            screenwriterSet: ["Lee", "Buce"],
                            starringSet: ["门泽尔", "安娜"],
                            genreSet: ["动画", "音乐", "家庭"],
                            introduction: "在四面环海、风景如画的阿伦黛尔王国，生活着两位可爱美丽的小公主，艾莎和安娜。艾莎天生具有制造冰雪的能力，随着年龄的增长，她的能力越来越强，甚至险些夺走妹妹的生命。为此国王紧闭宫门，也中断了两姐妹的联系。悲哀的海难过后，艾莎（伊迪娜·门泽尔 Idina Menzel 配音 ）终于到了加冕的年龄，各国王公齐来祝贺。艾莎战战兢兢，唯恐被人识破隐藏了多年的秘密。然而当听说安娜（克里斯汀·贝尔 Kristen Bell 配音）将要和初次见面的南埃尔斯王子汉斯（圣蒂诺·方塔纳 Santino Fontana 配音）结婚时，依然情绪失控露出了马脚。在此之后她逃到山中，构建了属于自己的冰雪王国，而阿伦黛尔也陷入可怕的寒冷之中。",
                            trailer: "http://vt1.doubanio.com/202003021544/fe4f0ca7a20ced73c8fad9d40561ec1a/view/movie/M/301490453.mp4"
                        },
                        {
                            id: 1,
                            name: "冰雪奇缘",
                            foreign_name: "Frozen",
                            length: 181,
                            language: "英语 / 冰岛语",
                            area: "美国",
                            release_date: "2013-12-21",
                            box_office: 2000000.05,
                            cover_url: "https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2166640945.jpg",
                            rate: 9.5,
                            votes: 50000000,
                            weight: "14%,25%,52%,25%,12%",
                            imdb_link: "",
                            douban_link: "https://movie.douban.com/subject/4202982/",
                            rottenTomatoes_link: "",
                            directorSet: ["Lee", "Buck"],
                            screenwriterSet: ["Lee", "Buce"],
                            starringSet: ["门泽尔", "安娜"],
                            genreSet: ["动画", "音乐", "家庭"],
                            introduction: "在四面环海、风景如画的阿伦黛尔王国，生活着两位可爱美丽的小公主，艾莎和安娜。艾莎天生具有制造冰雪的能力，随着年龄的增长，她的能力越来越强，甚至险些夺走妹妹的生命。为此国王紧闭宫门，也中断了两姐妹的联系。悲哀的海难过后，艾莎（伊迪娜·门泽尔 Idina Menzel 配音 ）终于到了加冕的年龄，各国王公齐来祝贺。艾莎战战兢兢，唯恐被人识破隐藏了多年的秘密。然而当听说安娜（克里斯汀·贝尔 Kristen Bell 配音）将要和初次见面的南埃尔斯王子汉斯（圣蒂诺·方塔纳 Santino Fontana 配音）结婚时，依然情绪失控露出了马脚。在此之后她逃到山中，构建了属于自己的冰雪王国，而阿伦黛尔也陷入可怕的寒冷之中。",
                            trailer: "http://vt1.doubanio.com/202003021544/fe4f0ca7a20ced73c8fad9d40561ec1a/view/movie/M/301490453.mp4"
                        }
                    ]
                ]
            }
        },
        methods: {
            async getRankList() {
                const {data: result} = this.$http.get(
                    '/movie/rank/' + this.tag,
                    {
                        params: {
                            pageNum: 1,
                            pageSize: 50
                        }
                    }
                );
                if (result.state === 200) {
                    this.$message.success(result.message);
                    this.rankList = result.data['resultList'];
                } else {
                    this.$message.error(result.message);
                }
            },
            jumpToDetail(movieInfo) {
                this.$router.push(
                    {
                        name: "MovieDetail",
                        params:{
                            movieId: movieInfo.id,
                            movieInfo: movieInfo
                        }
                    }
                )
            }
        },
        created() {
            this.getRankList();
        }
    }
</script>
<style lang="scss" scoped>
    @import "src/assets/sass/global";

    .show-block {
        margin-left: 15%;
        margin-right: 15%;
        margin-bottom: 5%;
        padding-top: 1.5%;
        padding-bottom: 1%;
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