<template>
    <el-container class="container-movie-detail">
        <el-header style="height: 30px">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="homeLink">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="resourceLink">资源库</el-breadcrumb-item>
                <el-breadcrumb-item>{{movieInfo.name}}</el-breadcrumb-item>
            </el-breadcrumb>
        </el-header>
        <el-container>
            <el-main style="background-color: #FFFFFF">
                <el-row>
                    <el-col :span="4">
                        <el-image :src="movieInfo.cover_url" fit="fill"></el-image>
                        <span>分享到</span>
                        <span>qq,weChat</span>
                    </el-col>
                    <el-col :span="18" style="margin-left: 20px; text-align: left;font-size: x-large">
                        <div>
                            <span style="font-size: xx-large;">{{movieInfo.name}} {{movieInfo.foreign_name}}</span>
                        </div>
                        <el-divider></el-divider>
                        <div>
                            <span>导演</span>
                            <span v-for="(item,index) in movieInfo.directorSet" :key="index">
                                {{item}}
                            </span>
                        </div>
                        <div>
                            <span>编剧</span>
                            <span v-for="(item,index) in movieInfo.screenwriterSet" :key="index">
                                {{item}}
                            </span>
                        </div>
                        <div>
                            <span>演员</span>
                            <span v-for="(item,index) in movieInfo.starringSet" :key="index">
                                {{item}}
                            </span>
                        </div>
                        <div>
                            <span>类型</span>
                            <span v-for="(item,index) in movieInfo.genreSet" :key="index">
                                {{item}}
                            </span>
                        </div>
                        <div>
                            <span> 时长:</span>
                            <span> {{movieInfo.length}}</span>
                            <span> 地区:</span>
                            <span> {{movieInfo.area}}</span>
                            <span> 语言:</span>
                            <span> {{movieInfo.language}}</span>
                            <span> 发行:</span>
                            <span> {{movieInfo.release_date}}</span>
                        </div>
                        <div>
                            <span>评分人数: </span>{{movieInfo.votes}}
                            <el-rate
                                    v-model="movieInfo.rate"
                                    disabled
                                    show-score
                                    :max="score"
                                    text-color="#ff9900"
                                    score-template="{value}">
                            </el-rate>
                        </div>
                    </el-col>

                </el-row>
                <el-divider content-position="left">简介</el-divider>
                <el-row>
                    <span>{{movieInfo.introduction}}"</span>
                </el-row>
                <el-divider content-position="left">资源</el-divider>
                <el-collapse v-model="activeNames" @change="handleChange">
                    <el-collapse-item title="评论" name="1">
                    </el-collapse-item>
                </el-collapse>
                <el-collapse v-model="activeNames" @change="handleChange">
                    <el-collapse-item title="影评" name="2">
                    </el-collapse-item>
                </el-collapse>
            </el-main>
            <el-aside width="300px" style="background-color: #2c3e50; margin-left: 20px">

            </el-aside>
        </el-container>
    </el-container>
</template>

<script>
    import Home from "../../views/Home";
    import Resource from "../../views/Resource";

    export default {
        name: "MovieDetail",
        props: ['id','movie'],
        data() {
            return{
                homeLink: Home,
                resourceLink: Resource,
                score: 10,
                movieInfo: {
                    id:1,
                    name: "冰雪奇缘",
                    foreign_name: "Frozen",
                    length: 181,
                    language: "英语 / 冰岛语",
                    area: "美国",
                    release_date:"2013-12-21",
                    box_office: 2000000.05,
                    cover_url: "https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2166640945.jpg",
                    rate: 9.5,
                    votes: 50000000,
                    weight: "14%,25%,52%,25%,12%",
                    imdb_link:"",
                    douban_link:"https://movie.douban.com/subject/4202982/",
                    rottenTomatoes_link:"",
                    directorSet: ["Lee","Buck"],
                    screenwriterSet: ["Lee","Buce"],
                    starringSet: ["门泽尔","安娜"],
                    genreSet: ["动画", "音乐", "家庭"],
                    introduction: "在四面环海、风景如画的阿伦黛尔王国，生活着两位可爱美丽的小公主，艾莎和安娜。艾莎天生具有制造冰雪的能力，随着年龄的增长，她的能力越来越强，甚至险些夺走妹妹的生命。为此国王紧闭宫门，也中断了两姐妹的联系。悲哀的海难过后，艾莎（伊迪娜·门泽尔 Idina Menzel 配音 ）终于到了加冕的年龄，各国王公齐来祝贺。艾莎战战兢兢，唯恐被人识破隐藏了多年的秘密。然而当听说安娜（克里斯汀·贝尔 Kristen Bell 配音）将要和初次见面的南埃尔斯王子汉斯（圣蒂诺·方塔纳 Santino Fontana 配音）结婚时，依然情绪失控露出了马脚。在此之后她逃到山中，构建了属于自己的冰雪王国，而阿伦黛尔也陷入可怕的寒冷之中。",
                    trailer: "http://vt1.doubanio.com/202003021544/fe4f0ca7a20ced73c8fad9d40561ec1a/view/movie/M/301490453.mp4"
                }
            }
        },
        created() {
            console.log(this.id);
            console.log(this.movie);
            console.log(this.$route.params)
        }
    }
</script>

<style lang="scss" scoped>
    @import "src/assets/sass/global";


    .container-movie-detail {
        padding: 0;
        background-color: #8ce4ec;

        .el-header {
            margin-top: 20px;

        }
    }

</style>