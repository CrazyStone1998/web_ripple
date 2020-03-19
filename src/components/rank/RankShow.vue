<template>
    <!--<div v-infinite-scroll="loadShowList" class="container-show">-->
    <div class="rank-show-container">

        <el-divider content-position="center">排行榜</el-divider>

        <el-menu class="rank-show-sort-menu" default-active="1" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1">按热度</el-menu-item>
            <el-menu-item index="2">按评分</el-menu-item>
            <el-menu-item index="3">按逼格</el-menu-item>
        </el-menu>

        <!--<div class="rank-content-list">-->
        <!--    <el-row v-for="(row,index) in rankList" :key="index">-->
        <!--        <el-col :span="12" v-for="(item,index) in row" :key="index">-->
        <!--            <el-card-->
        <!--                    :body-style="{ padding: '0px' }"-->
        <!--                    shadow="hover"-->
        <!--                    @mouseover.native="mouseover($event,' card-active')"-->
        <!--                    @mouseout.native="mouseout($event,' card-active')"-->
        <!--            >-->
        <!--                <el-row>-->
        <!--                    <el-col :span="12">-->
        <!--                        <el-image :src="item.cover_url" fit="fill"-->
        <!--                                  @click="jumpToDetail(item.id, item)"></el-image>-->
        <!--                        <div class="movie-detail">-->
        <!--                            <el-tag class="movie-name">{{item.name}}</el-tag>-->
        <!--                            <div class="movie-rate">-->
        <!--                                <svg class="rate-star" aria-hidden="true">-->
        <!--                                    <use xlink:href="#icon-star"></use>-->
        <!--                                </svg>-->
        <!--                                <i style="color: #f9f031">{{item.rate}}</i>-->
        <!--                            </div>-->
        <!--                        </div>-->
        <!--                        <div class="movie-genre-box">-->
        <!--                            <el-tag class="movie-genre" v-for="(genre, index) in item.genreSet" :key="index"-->
        <!--                                    @click="searchByQuery">-->
        <!--                                {{genre.name}}-->
        <!--                            </el-tag>-->
        <!--                        </div>-->
        <!--                    </el-col>-->
        <!--                    <el-col :span="12">-->
        <!--                        <div>-->
        <!--                            <span class="movie-detail-title">{{item.name}} {{item.foreign_name}}</span>-->
        <!--                        </div>-->
        <!--                        <el-divider></el-divider>-->
        <!--                        <div class="movie-detail-block">-->
        <!--                            <span class="movie-detail-tag">导演 : </span>-->
        <!--                            <span class="movie-detail-tag-content" v-for="(director,index) in item.directorSet"-->
        <!--                                  :key="index">-->
        <!--                        {{director}}-->
        <!--                    </span>-->
        <!--                        </div>-->
        <!--                        <div class="movie-detail-block">-->
        <!--                            <span class="movie-detail-tag">编剧 : </span>-->
        <!--                            <span class="movie-detail-tag-content"-->
        <!--                                  v-for="(screenwriter,index) in item.screenwriterSet"-->
        <!--                                  :key="index">-->
        <!--                        {{screenwriter}}-->
        <!--                    </span>-->
        <!--                        </div>-->
        <!--                        <div class="movie-detail-block">-->
        <!--                            <span class="movie-detail-tag">演员 : </span>-->
        <!--                            <span class="movie-detail-tag-content" v-for="(starring,index) in item.starringSet"-->
        <!--                                  :key="index">-->
        <!--                                {{starring}}-->
        <!--                            </span>-->
        <!--                        </div>-->

        <!--                        <div class="movie-detail-block">-->
        <!--                            <span class="movie-detail-tag">发行 : </span>-->
        <!--                            <span class="movie-detail-tag-content"> {{movieInfo.release_date}}</span>-->
        <!--                            <el-divider direction="vertical"></el-divider>-->
        <!--                            <span class="movie-detail-tag">时长 : </span>-->
        <!--                            <span class="movie-detail-tag-content"> {{movieInfo.length}}</span>-->
        <!--                        </div>-->
        <!--                        <div class="movie-detail-block">-->
        <!--                            <span class="movie-detail-tag">语言 : </span>-->
        <!--                            <span class="movie-detail-tag-content"> {{movieInfo.language}}</span>-->
        <!--                            <el-divider direction="vertical"></el-divider>-->
        <!--                            <span class="movie-detail-tag">地区 : </span>-->
        <!--                            <span class="movie-detail-tag-content"> {{movieInfo.area}}</span>-->
        <!--                        </div>-->
        <!--                        <div class="movie-detail-block">-->
        <!--                            <span class="movie-detail-tag">评分人数 : </span>-->
        <!--                            <span class="movie-detail-tag-content">{{movieInfo.votes}}</span>-->
        <!--                        </div>-->
        <!--                        <div class="movie-detail-block">-->
        <!--                            <el-rate-->
        <!--                                    v-model="movieInfo.rate"-->
        <!--                                    disabled-->
        <!--                                    show-score-->
        <!--                                    :max="10"-->
        <!--                                    text-color="#ff9900"-->
        <!--                                    score-template="{value}">-->
        <!--                            </el-rate>-->
        <!--                        </div>-->
        <!--                    </el-col>-->
        <!--                </el-row>-->

        <!--            </el-card>-->
        <!--        </el-col>-->
        <!--    </el-row>-->
        <!--</div>-->

    </div>
</template>

<script>
    export default {
        name: "RankShow",
        data() {
            return {
                pageNum: 3,
                pageSize: 4,
                rankList: [
                    [{
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
                    }, {
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
                    }],
                    [{
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
                    }, {
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
                    }],
                    [{
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
                    }, {
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
                    }],
                    [{
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
                    }, {
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
                    }]
                ]
            }
        },
        methods: {
            async getRankList() {
                console.log("初始化 排行榜列表");
                const {data: result} = await this.$http.get(
                    "movie/es/_search",
                    {
                        params: {
                            pageNum: 1,
                            pageSize: 8
                        }
                    }
                );
                if (result.status === 200) {
                    this.$message.success(result.message);
                    this.showList.push(result.data["resultList"].slice(0, 4));
                    this.showList.push(result.data["resultList"].slice(4, 8));
                } else {
                    this.$message.error(result.message);
                }
            },
            loadRankList() {
                this.$message.info("滚动更新");
                console.log(this.pageNum, this.pageSize);

                setTimeout(async () => {
                    const {data: result} = await this.$http.get(
                        "movie/es/_search",
                        {
                            params: {
                                pageNum: this.pageNum,
                                pageSize: this.pageSize
                            }
                        }
                    );
                    if (result.status === 200) {
                        this.$message.success(result.message);
                        console.log(result.data);
                        this.showList.push(result.data["resultList"]);
                        this.pageNum += 1;
                    } else {
                        this.$message.error(result.message);
                    }
                }, 5000);
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
            handleSelect() {

            },

            // 监听方法
            mouseover($event, activeClassName) {
                $event.currentTarget.className += activeClassName;
            },
            mouseout($event, activeClassName) {
                $event.currentTarget.className =
                    $event.currentTarget.className.slice(
                        0,
                        $event.currentTarget.className.indexOf(activeClassName)
                    )
            },
        },
        created() {

        },
        mounted() {

        }
    }
</script>

<style lang="scss" scoped>
    @import "src/assets/sass/global";

    .rank-show-container {

        .el-divider--horizontal {
            margin-top: 20px;
        }

        .rank-show-sort-menu {
            padding-left: 5%;
            margin-bottom: 2%;
            border-radius: 6px;
        }

        .rank-content-list {
            margin-left: 5%;
            margin-right: 5%;

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

    }

</style>